#!/usr/bin/env python3
"""
Extract frames from Kelly and Ken videos using FFmpeg
Generates all required avatar assets for lip-sync animation
"""

import os
import subprocess
import json
import shutil
from pathlib import Path

# Configuration
CONFIG = {
    'videos': {
        'kelly': [
            'kelly2.mp4',
            'kelly2 (1).mp4'
        ],
        'ken': [
            'ken2.mp4', 
            'ken2 (1).mp4'
        ]
    },
    'input_dir': '../production-deploy',
    'output_dir': '../production-deploy/assets/avatars',
    'frame_rate': 30,  # Extract at 30fps
    'resolution': '1920x1080',
    'quality': 2  # PNG compression (1-9, lower is better quality)
}

# Viseme to mouth shape mapping
VISEME_MAP = {
    'REST': 0,
    'A': 10,
    'E': 20,
    'I': 30,
    'O': 40,
    'U': 50,
    'MBP': 60,
    'FV': 70,
    'TH': 80,
    'DNTL': 90,
    'KG': 100,
    'S': 110,
    'R': 120,
    'WQ': 130
}

# Phoneme variations
PHONEME_VARIATIONS = [
    'A_EMPHASIS', 'A_EXCITED', 'A_HAPPY', 'A_QUESTION', 'A_SERIOUS', 'A_TEACH',
    'E_EMPHASIS', 'E_EXCITED', 'E_HAPPY', 'E_QUESTION', 'E_SERIOUS', 'E_TEACH',
    'I_EMPHASIS', 'I_EXCITED', 'I_HAPPY', 'I_QUESTION', 'I_SERIOUS', 'I_TEACH',
    'AW', 'AY', 'CH', 'H', 'L', 'NG', 'OO', 'OY', 'SH', 'UH', 'Y', 'ZH'
]

def check_ffmpeg():
    """Check if FFmpeg is installed"""
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        print("✅ FFmpeg is installed")
        return True
    except:
        print("❌ FFmpeg not found. Please install it:")
        print("   Mac: brew install ffmpeg")
        print("   Linux: sudo apt-get install ffmpeg")
        print("   Windows: Download from https://ffmpeg.org/download.html")
        return False

def get_video_info(video_path):
    """Get video metadata"""
    cmd = [
        'ffprobe', '-v', 'error',
        '-select_streams', 'v:0',
        '-show_entries', 'stream=width,height,duration,nb_frames',
        '-of', 'json', video_path
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error getting video info: {result.stderr}")
        return None
        
    info = json.loads(result.stdout)
    stream = info['streams'][0]
    
    return {
        'width': int(stream.get('width', 0)),
        'height': int(stream.get('height', 0)),
        'duration': float(stream.get('duration', 0)),
        'frames': int(stream.get('nb_frames', 0))
    }

def extract_all_frames(avatar, video_file):
    """Extract all frames from video"""
    script_dir = Path(__file__).parent
    input_path = script_dir / CONFIG['input_dir'] / video_file
    output_dir = script_dir / CONFIG['output_dir'] / avatar / '2d' / 'full'
    
    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"\n📹 Extracting frames from {video_file}...")
    
    # Get video info
    info = get_video_info(str(input_path))
    if not info:
        return False
        
    print(f"   Resolution: {info['width']}x{info['height']}")
    print(f"   Duration: {info['duration']:.2f}s")
    print(f"   Total frames: {info['frames']}")
    
    # Extract frames
    output_pattern = str(output_dir / f"{avatar}_frame_%04d.png")
    cmd = [
        'ffmpeg', '-i', str(input_path),
        '-vf', f"fps={CONFIG['frame_rate']},scale={CONFIG['resolution']}",
        '-q:v', str(CONFIG['quality']),
        output_pattern, '-y'
    ]
    
    result = subprocess.run(cmd, capture_output=True)
    if result.returncode != 0:
        print(f"   ❌ Error: {result.stderr.decode()}")
        return False
        
    # Count extracted frames
    frame_files = list(output_dir.glob(f"{avatar}_frame_*.png"))
    print(f"   ✅ Extracted {len(frame_files)} frames")
    
    return True

def extract_key_frames(avatar, video_file):
    """Extract key expression frames"""
    script_dir = Path(__file__).parent
    input_path = script_dir / CONFIG['input_dir'] / video_file
    base_dir = script_dir / CONFIG['output_dir'] / avatar
    
    print(f"\n🎯 Extracting key frames from {video_file}...")
    
    # Key frame timings (in seconds)
    key_frames = {
        'neutral_default': (0, ''),
        'teaching_explaining': (2, 'lesson-sequence'),
        'question_curious': (4, 'lesson-sequence'),
        'happy_celebrating': (6, 'emotional-expressions'),
        'concerned_thinking': (8, 'emotional-expressions')
    }
    
    for expression, (time, subdir) in key_frames.items():
        if subdir:
            output_dir = base_dir / subdir
            output_dir.mkdir(parents=True, exist_ok=True)
            output_file = output_dir / f"{avatar}_{expression}.png"
        else:
            output_file = base_dir / f"{avatar}_{expression}.png"
            
        # Extract single frame
        cmd = [
            'ffmpeg', '-ss', str(time),
            '-i', str(input_path),
            '-vf', f"scale={CONFIG['resolution']}",
            '-frames:v', '1',
            '-q:v', str(CONFIG['quality']),
            str(output_file), '-y'
        ]
        
        result = subprocess.run(cmd, capture_output=True)
        if result.returncode == 0 and output_file.exists():
            print(f"   ✅ {expression}: {output_file.name}")
        else:
            print(f"   ⚠️  {expression}: Could not extract")

def generate_viseme_frames(avatar):
    """Generate viseme frames from extracted frames"""
    script_dir = Path(__file__).parent
    source_dir = script_dir / CONFIG['output_dir'] / avatar / '2d' / 'full'
    viseme_dir = script_dir / CONFIG['output_dir'] / avatar / '2d' / 'visemes_flat'
    
    viseme_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"\n🎤 Generating viseme frames for {avatar}...")
    
    # Get available frames
    frames = sorted(source_dir.glob(f"{avatar}_frame_*.png"))
    if not frames:
        print("   ⚠️  No source frames found")
        return
        
    # Map visemes to frame numbers
    for viseme, frame_idx in VISEME_MAP.items():
        if frame_idx < len(frames):
            source_frame = frames[frame_idx]
            dest_file = viseme_dir / f"{avatar}_{viseme}.png"
            shutil.copy2(source_frame, dest_file)
            print(f"   ✅ Created {dest_file.name}")
        else:
            print(f"   ⚠️  Not enough frames for {viseme}")

def generate_phoneme_frames(avatar):
    """Generate phoneme mouth shapes"""
    script_dir = Path(__file__).parent
    source_dir = script_dir / CONFIG['output_dir'] / avatar / '2d' / 'full'
    mouth_dir = script_dir / CONFIG['output_dir'] / avatar / '2d'
    
    print(f"\n👄 Generating phoneme frames for {avatar}...")
    
    # Get available frames
    frames = sorted(source_dir.glob(f"{avatar}_frame_*.png"))
    if not frames:
        print("   ⚠️  No source frames found")
        return
        
    # Create mouth phonemes
    for i, phoneme in enumerate(PHONEME_VARIATIONS):
        frame_idx = (i * 10) % len(frames)  # Distribute across available frames
        source_frame = frames[frame_idx]
        dest_file = mouth_dir / f"mouth_{phoneme}.png"
        shutil.copy2(source_frame, dest_file)
        print(f"   ✅ Created mouth_{phoneme}.png")

def cleanup_old_assets(avatar):
    """Remove old assets before regenerating"""
    script_dir = Path(__file__).parent
    avatar_dir = script_dir / CONFIG['output_dir'] / avatar
    
    # Directories to clean
    clean_dirs = [
        avatar_dir / '2d' / 'full',
        avatar_dir / '2d' / 'visemes_flat'
    ]
    
    for dir_path in clean_dirs:
        if dir_path.exists():
            print(f"🧹 Cleaning {dir_path}...")
            shutil.rmtree(dir_path)
            
def main():
    """Main extraction process"""
    print("🎬 Avatar Frame Extraction Tool")
    print("=" * 40)
    
    # Check FFmpeg
    if not check_ffmpeg():
        return
        
    script_dir = Path(__file__).parent
    
    # Process each avatar
    for avatar, videos in CONFIG['videos'].items():
        print(f"\n\n{'='*40}")
        print(f"👤 Processing {avatar.upper()}")
        print(f"{'='*40}")
        
        # Clean old assets
        cleanup_old_assets(avatar)
        
        # Use the first video for frame extraction
        main_video = videos[0]
        video_path = script_dir / CONFIG['input_dir'] / main_video
        
        if not video_path.exists():
            print(f"❌ Video not found: {video_path}")
            continue
            
        # Extract all frames
        if extract_all_frames(avatar, main_video):
            # Generate viseme frames
            generate_viseme_frames(avatar)
            
            # Generate phoneme frames
            generate_phoneme_frames(avatar)
            
        # Extract key frames from both videos
        for video in videos:
            extract_key_frames(avatar, video)
            
    print("\n\n✅ Frame extraction complete!")
    print("\n📊 Next steps:")
    print("1. Review extracted frames")
    print("2. Run inventory verification: node scripts/verify-avatar-inventory.js")
    print("3. Test in browser: open production-deploy/inventory.html")

if __name__ == "__main__":
    main()
