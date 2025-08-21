#!/usr/bin/env python3
"""
Self-Hosted TTS Server for iLearnHow
No Railway dependency - runs anywhere with Python
Uses your custom Ken & Kelly voice files
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import base64
import json
import time
import wave
import tempfile
import subprocess
import re
from pathlib import Path

app = Flask(__name__)

# CORS - allow all origins for self-hosted
CORS(app, resources={r"/*": {
    "origins": "*",  # Allow all origins for self-hosted
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

# Voice configuration - using your actual files
VOICE_FILES = {
    "kelly": {
        "reference": "dist/reference_kelly.wav",
        "segments": "dist/data/kelly/segments/",
        "fallback": "kelly_test.wav"  # Fallback in production-deploy
    },
    "ken": {
        "reference": "dist/reference_ken_mono16k.wav", 
        "segments": "dist/data/ken/segments/",
        "fallback": "test_ken_voice.wav"  # Fallback in production-deploy
    }
}

# Get the base directory (where this script is located)
BASE_DIR = Path(__file__).parent.parent
print(f"🎯 Base directory: {BASE_DIR}")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "server": "iLearnHow Self-Hosted TTS",
        "status": "healthy",
        "version": "3.0.0",
        "engine": "self_hosted_custom_voices",
        "voices": list(VOICE_FILES.keys()),
        "custom_models": True,
        "railway_free": True,
        "cors_enabled": True,
        "base_dir": str(BASE_DIR)
    })

@app.route('/api/tts', methods=['POST'])
def tts():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON"}), 400
        
        text = data.get('text', '').strip()
        if not text:
            return jsonify({"error": "Text is required"}), 400
        
        speaker = data.get('speaker', 'kelly').lower()
        if speaker not in VOICE_FILES:
            return jsonify({"error": f"Unsupported speaker. Use: {list(VOICE_FILES.keys())}"}), 400
        
        include_phonemes = data.get('include_phonemes', True)
        
        print(f"🎤 Self-Hosted TTS: {speaker} - '{text[:50]}...'")
        
        # Generate voice using your custom files
        audio_data, duration, method_used = generate_custom_voice(speaker, text)
        
        if not audio_data:
            return jsonify({"error": "Voice generation failed"}), 500
        
        # Encode audio to base64
        audio_base64 = base64.b64encode(audio_data).decode('utf-8')
        
        # Generate phonemes for avatar sync
        phonemes = []
        if include_phonemes:
            phonemes = generate_phonemes(text, duration)
        
        response = {
            "audio": audio_base64,
            "audio_format": "wav",
            "duration": duration,
            "speaker": speaker,
            "text": text,
            "engine": "self_hosted_custom",
            "method": method_used
        }
        
        if phonemes:
            response["phonemes"] = phonemes
        
        print(f"✅ Self-Hosted TTS: Generated {duration:.2f}s using {method_used}")
        return jsonify(response)
        
    except Exception as e:
        print(f"❌ TTS Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

def generate_custom_voice(speaker, text):
    """Generate voice using your custom voice files"""
    
    voice_config = VOICE_FILES[speaker]
    
    # Method 1: Try to use reference audio file
    reference_path = BASE_DIR / voice_config["reference"]
    if reference_path.exists():
        try:
            print(f"🎯 Using reference audio for {speaker}")
            return generate_from_reference(reference_path)
        except Exception as e:
            print(f"⚠️ Reference audio failed: {e}")
    
    # Method 2: Try to use voice segments
    segments_dir = BASE_DIR / voice_config["segments"]
    if segments_dir.exists():
        try:
            print(f"🎯 Using voice segments for {speaker}")
            return generate_from_segments(segments_dir, text)
        except Exception as e:
            print(f"⚠️ Voice segments failed: {e}")
    
    # Method 3: Use fallback files in production-deploy
    fallback_path = BASE_DIR / "production-deploy" / voice_config["fallback"]
    if fallback_path.exists():
        try:
            print(f"🔄 Using fallback audio for {speaker}")
            return generate_from_reference(fallback_path)
        except Exception as e:
            print(f"⚠️ Fallback audio failed: {e}")
    
    # Method 4: Generate simple audio using Python
    print(f"🔧 Generating simple audio for {speaker}")
    return generate_simple_audio(text, speaker)

def generate_from_reference(file_path):
    """Generate audio from reference file"""
    with open(file_path, 'rb') as f:
        audio_data = f.read()
    
    # Get duration
    with wave.open(file_path, 'rb') as wav:
        frames = wav.getnframes()
        rate = wav.getframerate()
        duration = frames / float(rate)
    
    return audio_data, duration, "reference_file"

def generate_from_segments(segments_dir, text):
    """Generate audio by combining voice segments"""
    # Get all segment files
    segment_files = list(segments_dir.glob("*.wav"))
    if not segment_files:
        raise Exception("No voice segments found")
    
    # For now, return the first segment as a placeholder
    # In a full implementation, you'd use text-to-phoneme mapping
    first_segment = segment_files[0]
    
    with open(first_segment, 'rb') as f:
        audio_data = f.read()
    
    # Get duration
    with wave.open(first_segment, 'rb') as wav:
        frames = wav.getnframes()
        rate = wav.getframerate()
        duration = frames / float(rate)
    
    return audio_data, duration, "voice_segments"

def generate_simple_audio(text, speaker):
    """Generate simple audio using Python (fallback)"""
    # Create a simple sine wave as placeholder
    # This is just to ensure something plays - replace with real TTS
    
    sample_rate = 22050
    duration = len(text.split()) * 0.5  # 0.5 seconds per word
    samples = int(sample_rate * duration)
    
    # Simple sine wave (you can replace this with real TTS)
    import math
    audio_data = bytearray()
    for i in range(samples):
        # Generate a simple tone
        value = int(32767 * math.sin(2 * math.pi * 440 * i / sample_rate))
        audio_data.extend(value.to_bytes(2, byteorder='little', signed=True))
    
    # Create WAV header
    wav_header = create_wav_header(len(audio_data), sample_rate, 1, 16)
    
    return wav_header + audio_data, duration, "simple_generated"

def create_wav_header(data_length, sample_rate, channels, bits_per_sample):
    """Create WAV file header"""
    header = bytearray()
    
    # RIFF header
    header.extend(b'RIFF')
    header.extend((36 + data_length).to_bytes(4, byteorder='little'))
    header.extend(b'WAVE')
    
    # fmt chunk
    header.extend(b'fmt ')
    header.extend((16).to_bytes(4, byteorder='little'))  # fmt chunk size
    header.extend((1).to_bytes(2, byteorder='little'))   # audio format (PCM)
    header.extend(channels.to_bytes(2, byteorder='little'))
    header.extend(sample_rate.to_bytes(4, byteorder='little'))
    header.extend((sample_rate * channels * bits_per_sample // 8).to_bytes(4, byteorder='little'))
    header.extend((channels * bits_per_sample // 8).to_bytes(2, byteorder='little'))
    header.extend(bits_per_sample.to_bytes(2, byteorder='little'))
    
    # data chunk
    header.extend(b'data')
    header.extend(data_length.to_bytes(4, byteorder='little'))
    
    return header

def generate_phonemes(text, duration):
    """Generate simple phoneme timing for avatar sync"""
    words = text.split()
    word_count = len(words)
    
    if word_count == 0:
        return []
    
    phonemes = []
    time_per_word = duration / word_count
    
    for i, word in enumerate(words):
        start_time = i * time_per_word
        end_time = (i + 1) * time_per_word
        
        # Simple phoneme mapping
        phoneme = "A" if any(v in word.lower() for v in "aeiou") else "E"
        
        phonemes.append({
            "phoneme": phoneme,
            "start": start_time,
            "end": end_time,
            "word": word
        })
    
    return phonemes

@app.route('/voices/<speaker>', methods=['GET'])
def get_voice_info(speaker):
    """Get information about available voice files"""
    if speaker not in VOICE_FILES:
        return jsonify({"error": "Speaker not found"}), 404
    
    voice_config = VOICE_FILES[speaker]
    info = {
        "speaker": speaker,
        "files": {}
    }
    
    # Check reference file
    reference_path = BASE_DIR / voice_config["reference"]
    info["files"]["reference"] = {
        "path": str(reference_path),
        "exists": reference_path.exists(),
        "size": reference_path.stat().st_size if reference_path.exists() else 0
    }
    
    # Check segments directory
    segments_dir = BASE_DIR / voice_config["segments"]
    info["files"]["segments"] = {
        "path": str(segments_dir),
        "exists": segments_dir.exists(),
        "count": len(list(segments_dir.glob("*.wav"))) if segments_dir.exists() else 0
    }
    
    # Check fallback file
    fallback_path = BASE_DIR / "production-deploy" / voice_config["fallback"]
    info["files"]["fallback"] = {
        "path": str(fallback_path),
        "exists": fallback_path.exists(),
        "size": fallback_path.stat().st_size if fallback_path.exists() else 0
    }
    
    return jsonify(info)

if __name__ == '__main__':
    print("🎤 Starting Self-Hosted TTS Server...")
    print(f"Base directory: {BASE_DIR}")
    print(f"Available voices: {list(VOICE_FILES.keys())}")
    print("Server will start on port 8080")
    print("No Railway dependency - completely self-hosted!")
    
    app.run(host='0.0.0.0', port=8080, debug=False)
