#!/usr/bin/env python3
"""
iLearn How Production TTS Server
The ONE server that handles everything correctly
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import io
import os

app = Flask(__name__)

# Enable CORS for production with Cloudflare Pages support
CORS(app, origins=[
    "https://ilearnhow.com",
    "https://*.ilearnhow.com",
    "https://*.ilearnhow.pages.dev",  # Cloudflare Pages domains
    "https://d965e938.ilearnhow.pages.dev",
            "https://a03e3ecb.ilearnhow.pages.dev",  # Your specific domain
    "http://localhost:*",
    "http://127.0.0.1:*"
])

print("🚀 iLearn How TTS Server Starting...")
print("✅ This is the ONLY server we need")
print("✅ Returns mock audio with phoneme timing")
print("✅ Ken & Kelly voices only")
print("✅ CORS enabled for Cloudflare Pages")

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "server": "iLearnHow Production TTS",
        "version": "1.0.0",
        "voices": ["ken", "kelly"],
        "cors_enabled": True,
        "cloudflare_pages_support": True
    })

@app.route('/debug/cors', methods=['GET'])
def debug_cors():
    """Debug endpoint to troubleshoot CORS issues"""
    origin = request.headers.get('Origin', 'No Origin Header')
    return jsonify({
        "request_origin": origin,
        "cors_enabled": True,
        "cloudflare_pages_support": True,
        "allowed_origins": [
            "https://ilearnhow.com",
            "https://*.ilearnhow.com", 
            "https://*.ilearnhow.pages.dev",
            "https://d965e938.ilearnhow.pages.dev",
            "https://a03e3ecb.ilearnhow.pages.dev"
        ],
        "is_cloudflare_pages": 'ilearnhow.pages.dev' in origin,
        "message": "CORS debug endpoint working"
    })

@app.route('/api/tts', methods=['POST'])
def generate_speech():
    """Generate speech with phoneme timing"""
    try:
        data = request.json
        text = data.get('text', '')
        speaker = data.get('speaker', 'kelly').lower()
        
        # Validate speaker
        if speaker not in ['ken', 'kelly']:
            speaker = 'kelly'
            
        print(f"🎤 Generating speech for {speaker}: '{text[:50]}...'")
        
        # Calculate duration (roughly 150 words per minute)
        words = len(text.split())
        duration = max(1.0, (words / 150) * 60)
        
        # Generate silent audio (we care about timing, not actual audio yet)
        sample_rate = 16000
        samples = int(sample_rate * duration)
        audio = np.zeros(samples, dtype=np.int16)
        
        # Create WAV file
        wav_io = io.BytesIO()
        # WAV header
        wav_io.write(b'RIFF')
        wav_io.write((36 + len(audio) * 2).to_bytes(4, 'little'))
        wav_io.write(b'WAVE')
        wav_io.write(b'fmt ')
        wav_io.write((16).to_bytes(4, 'little'))
        wav_io.write((1).to_bytes(2, 'little'))  # PCM
        wav_io.write((1).to_bytes(2, 'little'))  # Mono
        wav_io.write(sample_rate.to_bytes(4, 'little'))
        wav_io.write((sample_rate * 2).to_bytes(4, 'little'))
        wav_io.write((2).to_bytes(2, 'little'))
        wav_io.write((16).to_bytes(2, 'little'))  # 16-bit
        wav_io.write(b'data')
        wav_io.write((len(audio) * 2).to_bytes(4, 'little'))
        wav_io.write(audio.tobytes())
        
        # Generate phoneme timing
        phonemes = []
        if text:
            # Simple phoneme generation - one phoneme per syllable estimate
            syllables = max(1, int(words * 1.5))  # Rough estimate
            time_per_phoneme = duration / syllables
            
            visemes = ['REST', 'A', 'E', 'I', 'O', 'U', 'MBP', 'FV', 'TH', 
                      'DNTL', 'KG', 'S', 'WQ', 'R']
            
            current_time = 0
            for i in range(syllables):
                viseme = visemes[i % len(visemes)]
                phonemes.append({
                    "phoneme": viseme,
                    "start": round(current_time, 3),
                    "end": round(current_time + time_per_phoneme * 0.8, 3)
                })
                current_time += time_per_phoneme
                
        # Return response
        response = {
            "audio": base64.b64encode(wav_io.getvalue()).decode('utf-8'),
            "audio_format": "wav",
            "speaker": speaker,
            "duration": duration,
            "phonemes": phonemes
        }
        
        print(f"✅ Generated {len(phonemes)} phonemes, {duration:.1f}s duration")
        return jsonify(response)
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    """Root endpoint"""
    return jsonify({
        "service": "iLearn How TTS Server",
        "endpoints": {
            "health": "/health",
            "tts": "/api/tts"
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5002))
    print(f"🚀 Starting server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
