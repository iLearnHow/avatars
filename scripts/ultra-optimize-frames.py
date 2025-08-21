#!/usr/bin/env python3
"""
Ultra optimization - Keep only essential frames
Target: 365 frames for Kelly, 347 for Ken
"""

import os
import shutil
from pathlib import Path

# Configuration
TARGET_FRAMES = {
    'kelly': 365,
    'ken': 347
}

def optimize_avatar_frames(avatar):
    script_dir = Path(__file__).parent
    full_dir = script_dir / '..' / 'production-deploy' / 'assets' / 'avatars' / avatar / '2d' / 'full'
    
    print(f"\n🚀 Ultra-optimizing {avatar} frames...")
    
    # Get all frame files
    frames = sorted([f for f in full_dir.glob('*_frame_*.png')])
    total_frames = len(frames)
    
    if total_frames == 0:
        print(f"   ❌ No frames found in {full_dir}")
        return
    
    print(f"   Found {total_frames} frames")
    
    target = TARGET_FRAMES[avatar]
    
    # Calculate which frames to keep
    if total_frames <= target:
        print(f"   ✅ Already at or below target ({target} frames)")
        return
    
    # Calculate step size to evenly distribute frames
    step = total_frames / target
    keep_indices = [int(i * step) for i in range(target)]
    
    # Always keep first and last frame
    keep_indices[0] = 0
    keep_indices[-1] = total_frames - 1
    
    # Create temporary directory
    temp_dir = full_dir.parent / f'temp_{avatar}_frames'
    temp_dir.mkdir(exist_ok=True)
    
    # Copy frames to keep
    print(f"   Copying {len(keep_indices)} frames to temp directory...")
    for new_idx, old_idx in enumerate(keep_indices):
        if old_idx < len(frames):
            old_file = frames[old_idx]
            new_name = f"{avatar}_frame_{new_idx:04d}.png"
            new_file = temp_dir / new_name
            shutil.copy2(old_file, new_file)
    
    # Remove all old frames
    print(f"   Removing {total_frames} old frames...")
    for frame in frames:
        frame.unlink()
    
    # Move optimized frames back
    print(f"   Moving optimized frames back...")
    for frame in temp_dir.glob('*.png'):
        shutil.move(str(frame), str(full_dir / frame.name))
    
    # Clean up temp directory
    temp_dir.rmdir()
    
    # Verify final count
    final_frames = list(full_dir.glob('*_frame_*.png'))
    print(f"   ✅ Final frame count: {len(final_frames)}")
    
    # Calculate total size
    total_size = sum(f.stat().st_size for f in final_frames)
    print(f"   📊 Total size: {total_size / 1024 / 1024:.2f} MB")
    
    # Ensure special frames exist
    special_frames = [f'{avatar}_O.png', f'{avatar}_frame_0000.png']
    for special in special_frames:
        special_path = full_dir / special
        if not special_path.exists() and final_frames:
            # Copy from first frame
            shutil.copy2(final_frames[0], special_path)
            print(f"   ✅ Created {special}")

def main():
    print("🎯 Ultra Frame Optimization")
    print("=" * 40)
    
    for avatar in ['kelly', 'ken']:
        optimize_avatar_frames(avatar)
    
    print("\n✅ Ultra optimization complete!")
    print(f"   Kelly: {TARGET_FRAMES['kelly']} frames")
    print(f"   Ken: {TARGET_FRAMES['ken']} frames")
    print("\n🚀 Assets are now deployment-ready!")

if __name__ == "__main__":
    main()
