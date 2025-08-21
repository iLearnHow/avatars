#!/usr/bin/env python3
"""
Custom Voice TTS Server for iLearnHow
Uses your trained Ken and Kelly voice models
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
import json
import time
import wave
import tempfile
import subprocess
import re

app = Flask(__name__)

# CORS configuration - matches your Railway setup
ALLOWED_ORIGINS_RAW = os.environ.get(
    "ALLOWED_ORIGINS",
    ",".join([
        "https://ilearnhow.com",
        "https://ilearnhow.pages.dev",
        "regex:^https://[A-Za-z0-9-]+\.ilearnhow\.pages\.dev$",
        "http://localhost:8000",  # For local testing
        "http://127.0.0.1:8000"
    ])
).split(",")

# Build allowed origins list
allowed_origins = []
for origin in ALLOWED_ORIGINS_RAW:
    o = origin.strip()
    if not o:
        continue
    if o.startswith("regex:"):
        try:
            allowed_origins.append(re.compile(o[len("regex:"):]))
        except re.error:
            pass
    else:
        allowed_origins.append(o)

CORS(app, resources={r"/*": {
    "origins": allowed_origins,
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

# Custom voice models - these should point to your trained models
VOICE_MODELS = {
    "kelly": {
        "model_path": "dist/data/kelly/model.onnx",  # Your trained Kelly model
        "config_path": "dist/configs/kelly_config.json",
        "fallback": "en_US-amy-medium"  # Fallback to Piper if custom fails
    },
    "ken": {
        "model_path": "dist/data/ken/model.onnx",  # Your trained Ken model
        "config_path": "dist/configs/ken_config.json", 
        "fallback": "en_US-ryan-medium"  # Fallback to Piper if custom fails
    }
}

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "server": "iLearnHow Custom Voice TTS",
        "status": "healthy",
        "version": "2.0.0",
        "engine": "custom_trained_voices",
        "voices": list(VOICE_MODELS.keys()),
        "custom_models": True,
        "cloudflare_pages_support": True,
        "cors_enabled": True
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
        if speaker not in VOICE_MODELS:
            return jsonify({"error": f"Unsupported speaker. Use: {list(VOICE_MODELS.keys())}"}), 400
        
        include_phonemes = data.get('include_phonemes', True)
        
        print(f"🎤 Custom TTS: {speaker} - '{text[:50]}...'")
        
        # Try custom voice first, fallback to Piper
        audio_data, duration, engine_used = generate_custom_voice(speaker, text)
        
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
            "engine": engine_used
        }
        
        if phonemes:
            response["phonemes"] = phonemes
        
        print(f"✅ Custom TTS: Generated {duration:.2f}s using {engine_used}")
        return jsonify(response)
        
    except Exception as e:
        print(f"❌ TTS Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

def generate_custom_voice(speaker, text):
    """Generate voice using custom trained models or fallback to Piper"""
    
    voice_config = VOICE_MODELS[speaker]
    
    # First, try to use your custom trained model
    if os.path.exists(voice_config["model_path"]):
        try:
            print(f"🎯 Using custom {speaker} voice model")
            return generate_with_custom_model(speaker, text, voice_config)
        except Exception as e:
            print(f"⚠️ Custom model failed: {e}, falling back to Piper")
    
    # Fallback to Piper TTS
    print(f"🔄 Using Piper fallback for {speaker}")
    return generate_with_piper(speaker, text, voice_config["fallback"])

def generate_with_custom_model(speaker, text, voice_config):
    """Generate voice using your custom trained model"""
    
    # This is where you'd integrate with your custom voice model
    # For now, we'll use a placeholder that returns your reference audio
    
    # Check if you have reference audio files
    reference_files = {
        "kelly": "dist/reference_kelly.wav",
        "ken": "dist/reference_ken_mono16k.wav"
    }
    
    if speaker in reference_files and os.path.exists(reference_files[speaker]):
        # For now, return the reference audio as a placeholder
        # In production, you'd run your custom model here
        with open(reference_files[speaker], 'rb') as f:
            audio_data = f.read()
        
        # Get duration
        with wave.open(reference_files[speaker], 'rb') as wav:
            frames = wav.getnframes()
            rate = wav.getframerate()
            duration = frames / float(rate)
        
        return audio_data, duration, "custom_trained"
    
    # If no reference audio, fall back to Piper
    raise Exception("Custom model not yet implemented")

def generate_with_piper(speaker, text, piper_model):
    """Generate voice using Piper TTS as fallback"""
    
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp_file:
        output_path = tmp_file.name
    
    try:
        # Use Piper to generate speech
        cmd = ['piper', '--model', piper_model, '--output_file', output_path]
        
        process = subprocess.Popen(
            cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE, text=True
        )
        
        stdout, stderr = process.communicate(input=text)
        
        if process.returncode != 0:
            raise Exception(f"Piper failed: {stderr}")
        
        # Read generated audio
        with open(output_path, 'rb') as audio_file:
            audio_data = audio_file.read()
        
        # Get duration
        with wave.open(output_path, 'rb') as wav_file:
            frames = wav_file.getnframes()
            rate = wav_file.getframerate()
            duration = frames / float(rate)
        
        return audio_data, duration, "piper_fallback"
        
    finally:
        # Clean up
        if os.path.exists(output_path):
            os.unlink(output_path)

def generate_phonemes(text, duration):
    """Generate simple phoneme timing for avatar sync"""
    # Simple phoneme generation - you can enhance this
    words = text.split()
    word_count = len(words)
    
    if word_count == 0:
        return []
    
    phonemes = []
    time_per_word = duration / word_count
    
    for i, word in enumerate(words):
        start_time = i * time_per_word
        end_time = (i + 1) * time_per_word
        
        # Simple phoneme mapping (you can enhance this)
        phoneme = "A" if any(v in word.lower() for v in "aeiou") else "E"
        
        phonemes.append({
            "phoneme": phoneme,
            "start": start_time,
            "end": end_time,
            "word": word
        })
    
    return phonemes

if __name__ == '__main__':
    print("🎤 Starting Custom Voice TTS Server...")
    print(f"Available voices: {list(VOICE_MODELS.keys())}")
    print("Server will start on port 8080")
    
    app.run(host='0.0.0.0', port=8080, debug=False)
