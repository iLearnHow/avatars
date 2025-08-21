#!/usr/bin/env python3
"""
Local TTS Test Script - Test Railway TTS without browser CORS issues
"""

import requests
import json
import base64
import tempfile
import os
from pathlib import Path

# Railway TTS Server URL
RAILWAY_URL = "https://mynextlesson-synthesis-production.up.railway.app"

def test_server_health():
    """Test if the Railway TTS server is healthy"""
    try:
        response = requests.get(f"{RAILWAY_URL}/health", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print("✅ Server Health Check:")
            print(f"   Server: {data.get('server', 'Unknown')}")
            print(f"   Status: {data.get('status', 'Unknown')}")
            print(f"   Version: {data.get('version', 'Unknown')}")
            print(f"   Voices: {', '.join(data.get('voices', []))}")
            return True
        else:
            print(f"❌ Server health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Server health check error: {e}")
        return False

def test_voice_generation(speaker, text):
    """Test voice generation for a specific speaker"""
    try:
        print(f"\n🎤 Testing {speaker} voice...")
        print(f"   Text: {text[:50]}{'...' if len(text) > 50 else ''}")
        
        response = requests.post(
            f"{RAILWAY_URL}/api/tts",
            headers={"Content-Type": "application/json"},
            json={
                "text": text,
                "speaker": speaker,
                "include_phonemes": True
            },
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ Success! Duration: {data.get('duration', 'Unknown'):.2f}s")
            print(f"   Audio format: {data.get('audio_format', 'Unknown')}")
            print(f"   Phonemes: {len(data.get('phonemes', []))} phoneme entries")
            
            # Save audio to file
            if data.get('audio'):
                audio_data = base64.b64decode(data['audio'])
                filename = f"test_{speaker}_voice.wav"
                with open(filename, 'wb') as f:
                    f.write(audio_data)
                print(f"   💾 Audio saved to: {filename}")
                
                # Try to play audio (macOS)
                try:
                    os.system(f"afplay {filename}")
                    print(f"   🔊 Playing audio...")
                except:
                    print(f"   📁 Audio file saved, but couldn't auto-play")
            
            return True
        else:
            print(f"   ❌ Voice generation failed: {response.status_code}")
            try:
                error_data = response.json()
                print(f"   Error: {error_data.get('error', 'Unknown error')}")
            except:
                print(f"   Response: {response.text[:200]}")
            return False
            
    except Exception as e:
        print(f"   ❌ Voice generation error: {e}")
        return False

def main():
    print("🚂 Railway TTS Local Test")
    print("=" * 50)
    
    # Test server health
    if not test_server_health():
        print("\n❌ Cannot proceed - server is not healthy")
        return
    
    # Test voices
    test_cases = [
        ("kelly", "Hello! I am Kelly, your friendly teacher. Welcome to today's lesson about the Sun!"),
        ("ken", "Hi there! I'm Ken, and I'm excited to explore the fascinating world of science with you today!"),
        ("kelly", "The Sun is a star at the center of our solar system. It provides light and heat to Earth."),
        ("ken", "That's correct! The Sun creates energy through nuclear fusion, where hydrogen atoms combine to form helium.")
    ]
    
    success_count = 0
    for speaker, text in test_cases:
        if test_voice_generation(speaker, text):
            success_count += 1
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {success_count}/{len(test_cases)} successful")
    
    if success_count == len(test_cases):
        print("🎉 All tests passed! Your Railway TTS is working perfectly!")
    else:
        print("⚠️ Some tests failed. Check the error messages above.")
    
    print("\n💡 If you want to test in the browser:")
    print("   1. Deploy the updated server to Railway")
    print("   2. Or use the local test server: python3 serve-test-page.py")

if __name__ == "__main__":
    main()
