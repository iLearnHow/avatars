#!/usr/bin/env python3
"""
Railway TTS Server using Custom Trained Ken & Kelly Voices
Real voice synthesis with YOUR actual trained voice models
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import re
import subprocess
import tempfile
import os
import base64
import json
import time
import wave
import struct
from pathlib import Path

app = Flask(__name__)

# Configurable CORS and limits
# Supports literal origins and regex origins via prefix "regex:"
ALLOWED_ORIGINS_RAW = os.environ.get(
    "ALLOWED_ORIGINS",
    ",".join([
        # Production domains
        "https://ilearnhow.com",
        "https://www.ilearnhow.com",
        # Cloudflare Pages custom and preview domains
        "https://ilearnhow.pages.dev",
        "regex:^https://[A-Za-z0-9-]+\.ilearnhow\.pages\.dev$",
        "regex:^https://[A-Za-z0-9-]+\.pages\.dev$",
        # Local development
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5501",
        "http://127.0.0.1:5501",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ])
).split(",")
MAX_TTS_TEXT_CHARS = int(os.environ.get("MAX_TTS_TEXT_CHARS", "2000"))

# Build allowed origins list supporting regex patterns
allowed_origins: list = []
for origin in ALLOWED_ORIGINS_RAW:
    o = origin.strip()
    if not o:
        continue
    if o.startswith("regex:"):
        try:
            allowed_origins.append(re.compile(o[len("regex:"):]))
        except re.error:
            # Fallback: ignore invalid regex
            pass
    else:
        allowed_origins.append(o)

# Allow CORS and ensure preflight responses include headers
CORS(
    app,
    resources={r"/*": {
        "origins": allowed_origins,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "max_age": 86400
    }}
)

# 🎯 CUSTOM VOICE MODELS - Your actual trained Ken & Kelly voices!
VOICE_MODELS = {
    "kelly": {
        "model_path": "dist/configs/kelly_model.onnx",
        "config_path": "dist/configs/kelly_config.json",
        "fallback": "en_US-amy-medium"  # Fallback if custom model fails
    },
    "ken": {
        "model_path": "dist/configs/ken_model.onnx", 
        "config_path": "dist/configs/ken_config.json",
        "fallback": "en_US-ryan-medium"  # Fallback if custom model fails
    }
}

def get_voice_paths():
    """Get absolute paths to voice models and configs"""
    base_dir = Path(__file__).parent
    voice_paths = {}
    
    for speaker, voice_info in VOICE_MODELS.items():
        model_path = base_dir / voice_info["model_path"]
        config_path = base_dir / voice_info["config_path"]
        
        voice_paths[speaker] = {
            "model_path": str(model_path),
            "config_path": str(config_path),
            "fallback": voice_info["fallback"],
            "custom_available": model_path.exists() and config_path.exists()
        }
    
    return voice_paths

@app.route('/health', methods=['GET'])
def health():
    voice_paths = get_voice_paths()
    custom_voices = {k: v["custom_available"] for k, v in voice_paths.items()}
    
    return jsonify({
        "server": "iLearnHow Custom Voice TTS",
        "status": "healthy",
        "version": "2.0.0",
        "engine": "piper_tts_custom",
        "message": "Custom Ken & Kelly Voice TTS Server Running",
        "timestamp": int(time.time()),
        "voices": list(VOICE_MODELS.keys()),
        "custom_voices_available": custom_voices,
        "voice_details": voice_paths
    })

@app.route('/api/tts', methods=['OPTIONS'])
def tts_options():
    # Flask-CORS will attach appropriate headers
    return ("", 204)

@app.route('/api/tts', methods=['POST'])
def tts():
    try:
        # Content-Type validation
        content_type = request.headers.get('Content-Type', '')
        if 'application/json' not in content_type:
            return jsonify({
                "error": "Unsupported Media Type: Content-Type must be application/json"
            }), 415

        # JSON body parsing
        data = request.get_json(silent=True)
        if not isinstance(data, dict):
            return jsonify({"error": "Invalid JSON body"}), 400

        # Required fields and constraints
        text = data.get('text')
        if not isinstance(text, str) or not text.strip():
            return jsonify({
                "error": "Field 'text' is required and must be a non-empty string"
            }), 422
        if len(text) > MAX_TTS_TEXT_CHARS:
            return jsonify({
                "error": f"Text exceeds maximum allowed length of {MAX_TTS_TEXT_CHARS} characters"
            }), 413

        speaker = str(data.get('speaker', 'kelly')).lower()
        if speaker not in VOICE_MODELS:
            return jsonify({
                "error": "Unsupported speaker",
                "allowed": list(VOICE_MODELS.keys())
            }), 422

        requested_format = str(data.get('format', 'wav')).lower()
        if requested_format != 'wav':
            return jsonify({
                "error": "Unsupported format",
                "allowed": ["wav"],
            }), 415

        include_phonemes = bool(data.get('include_phonemes', False))
        
        # Get voice paths and check availability
        voice_paths = get_voice_paths()
        voice_info = voice_paths[speaker]
        
        # Determine which voice model to use
        if voice_info["custom_available"]:
            voice_model = voice_info["model_path"]
            voice_config = voice_info["config_path"]
            voice_type = "custom_trained"
            print(f"🎤 Custom Voice TTS: {speaker} using TRAINED model - '{text[:50]}...'")
        else:
            voice_model = voice_info["fallback"]
            voice_config = None
            voice_type = "fallback_generic"
            print(f"⚠️ Fallback TTS: {speaker} using generic {voice_model} - '{text[:50]}...'")
        
        # Create temporary file for output
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp_file:
            output_path = tmp_file.name
        
        try:
            # Use Piper to generate speech
            if voice_type == "custom_trained":
                # Use custom trained model with config
                cmd = [
                    'piper',
                    '--model', voice_model,
                    '--config', voice_config,
                    '--output_file', output_path
                ]
            else:
                # Use fallback generic model
                cmd = [
                    'piper',
                    '--model', voice_model,
                    '--output_file', output_path
                ]
            
            # Run Piper
            process = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            stdout, stderr = process.communicate(input=text)
            
            if process.returncode != 0:
                raise Exception(f"Piper failed: {stderr}")
            
            # Read the generated audio
            with open(output_path, 'rb') as audio_file:
                audio_data = audio_file.read()
            
            # Get audio duration
            with wave.open(output_path, 'rb') as wav_file:
                frames = wav_file.getnframes()
                rate = wav_file.getframerate()
                duration = frames / float(rate)
            
            # Encode to base64
            audio_base64 = base64.b64encode(audio_data).decode('utf-8')
            
            # Generate simple phonemes for avatar sync
            phonemes = []
            if include_phonemes:
                phonemes = generate_phonemes(text, duration)
            
            response_data = {
                "audio": audio_base64,
                "audio_format": "wav",
                "duration": duration,
                "speaker": speaker,
                "text": text,
                "engine": "piper_custom",
                "voice_type": voice_type,
                "model_used": voice_model
            }
            
            if include_phonemes:
                response_data["phonemes"] = phonemes
            
            print(f"✅ Custom Voice TTS: Generated {duration:.2f}s of audio using {voice_type}")
            return jsonify(response_data)
            
        finally:
            # Clean up temporary file
            if os.path.exists(output_path):
                os.unlink(output_path)
        
    except Exception as e:
        print(f"❌ Custom Voice TTS Error: {e}")
        return jsonify({"error": str(e)}), 500

def generate_phonemes(text, duration):
    """Generate simple phoneme timing for avatar sync"""
    words = text.split()
    phonemes = []
    
    if not words:
        return phonemes
    
    time_per_word = duration / len(words)
    current_time = 0.0
    
    # Simple phoneme patterns
    for i, word in enumerate(words):
        word_lower = word.lower().strip('.,!?')
        
        # Opening mouth movement
        if word_lower[0] in 'aeiou':
            phonemes.append({
                "phoneme": "A",
                "start": round(current_time, 3),
                "end": round(current_time + time_per_word * 0.3, 3)
            })
        elif word_lower[0] in 'bpm':
            phonemes.append({
                "phoneme": "MBP",
                "start": round(current_time, 3),
                "end": round(current_time + time_per_word * 0.2, 3)
            })
        else:
            phonemes.append({
                "phoneme": "REST",
                "start": round(current_time, 3),
                "end": round(current_time + time_per_word * 0.1, 3)
            })
        
        # Mid-word movement
        phonemes.append({
            "phoneme": "E",
            "start": round(current_time + time_per_word * 0.3, 3),
            "end": round(current_time + time_per_word * 0.7, 3)
        })
        
        # Closing/rest
        phonemes.append({
            "phoneme": "REST",
            "start": round(current_time + time_per_word * 0.7, 3),
            "end": round(current_time + time_per_word, 3)
        })
        
        current_time += time_per_word
    
    return phonemes

@app.route('/', methods=['GET'])
def root():
    voice_paths = get_voice_paths()
    custom_voices = {k: v["custom_available"] for k, v in voice_paths.items()}
    
    return jsonify({
        "service": "Custom Ken & Kelly Voice TTS Server",
        "status": "running",
        "voices": list(VOICE_MODELS.keys()),
        "custom_voices_available": custom_voices,
        "endpoints": {
            "health": "/health",
            "tts": "/api/tts"
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5002))
    voice_paths = get_voice_paths()
    
    print("=" * 70)
    print("🚀 Custom Ken & Kelly Voice TTS Server Starting")
    print("=" * 70)
    print(f"✅ Port: {port}")
    print(f"✅ Voices: {list(VOICE_MODELS.keys())}")
    
    for speaker, info in voice_paths.items():
        status = "✅ AVAILABLE" if info["custom_available"] else "❌ NOT FOUND"
        print(f"   {speaker}: {status}")
        if info["custom_available"]:
            print(f"      Model: {info['model_path']}")
            print(f"      Config: {info['config_path']}")
        else:
            print(f"      Fallback: {info['fallback']}")
    
    print(f"✅ CORS enabled for ilearnhow.com")
    print("=" * 70)
    
    app.run(host='0.0.0.0', port=port, debug=False)
