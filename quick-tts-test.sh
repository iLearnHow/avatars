#!/bin/bash

echo "🎤 Testing Railway TTS with actual speech generation..."
echo ""

# Test Kelly voice
echo "Testing Kelly's voice..."
curl -X POST https://mynextlesson-synthesis-production.up.railway.app/api/tts \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello! I am Kelly, and I am so excited to teach you today!",
    "speaker": "kelly"
  }' \
  -o kelly_test.wav.json

# Extract and play
python3 -c "
import json
import base64
with open('kelly_test.wav.json') as f:
    data = json.load(f)
    audio_data = base64.b64decode(data['audio'])
    with open('kelly_test.wav', 'wb') as out:
        out.write(audio_data)
print('✅ Audio saved to kelly_test.wav')
print(f'Duration: {data.get(\"duration\", 0):.2f} seconds')
"

# Play the audio (macOS)
afplay kelly_test.wav 2>/dev/null || echo "Audio saved but couldn't auto-play"

echo ""
echo "✅ Test complete! Check kelly_test.wav"
rm -f kelly_test.wav.json
