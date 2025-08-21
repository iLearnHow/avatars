# Alternative TTS Deployment Options

Since Railway has limitations with heavy models, here are alternative deployment strategies:

## Option 1: Piper TTS on Railway (Recommended) ✅
**Status: Ready to deploy**
- Lightweight TTS engine that works well on Railway
- Good quality voices
- Fast generation
- Low memory usage (~500MB)
- Files created: `railway-piper-server.py`, `Dockerfile.piper`
- Deploy with: `./deploy-piper-railway.sh`

## Option 2: Cloudflare Workers + R2 (Serverless) 🚀
**Best for: Scalability and cost efficiency**

```javascript
// Pre-generate all lesson audio variants
// Store in Cloudflare R2
// Serve via Workers with edge caching

Pros:
- Instant response (pre-generated)
- Global edge network
- Pay per request
- No server management

Cons:
- Need to pre-generate content
- Storage costs for audio files
```

## Option 3: Use Eleven Labs API 🎙️
**Best for: Premium quality without infrastructure**

```python
# Simple API integration
import requests

def generate_speech(text, voice_id):
    response = requests.post(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
        headers={"xi-api-key": ELEVEN_LABS_KEY},
        json={"text": text}
    )
    return response.content
```

Pros:
- Best quality voices
- No infrastructure
- Simple integration

Cons:
- Cost per generation (~$0.15/1000 chars)
- API rate limits

## Option 4: Digital Ocean App Platform 🌊
**Best for: Simple deployment with more resources**

```yaml
# app.yaml
name: ilearnhow-tts
services:
- name: tts-server
  github:
    repo: your-repo/ilearnhow
    branch: main
  dockerfile_path: Dockerfile.piper
  instance_size_slug: basic-m  # 2GB RAM
  http_port: 5002
```

Pros:
- More RAM than Railway hobby
- Simple deployment
- Good pricing ($12/month)

Cons:
- Still limited for heavy models

## Option 5: Hybrid Approach (Recommended for Production) 🎯

```
1. Use Piper on Railway for real-time generation
2. Cache generated audio in Cloudflare R2
3. Serve cached audio when available
4. Fall back to generation for new content
```

### Implementation:
```javascript
class HybridTTS {
  async getAudio(text, voice) {
    // Check cache first
    const cached = await checkR2Cache(text, voice);
    if (cached) return cached;
    
    // Generate new
    const audio = await callPiperAPI(text, voice);
    
    // Cache for next time
    await saveToR2(text, voice, audio);
    
    return audio;
  }
}
```

## Quick Decision Matrix

| Solution | Quality | Cost | Setup Time | Scalability |
|----------|---------|------|------------|-------------|
| Piper/Railway | Good | $5-20/mo | 30 min | Medium |
| Cloudflare R2 | Depends | $0.015/GB | 2 hours | Excellent |
| Eleven Labs | Excellent | Variable | 10 min | Excellent |
| Digital Ocean | Good | $12+/mo | 1 hour | Good |
| Hybrid | Good | $20-30/mo | 3 hours | Excellent |

## Immediate Action (Piper on Railway)

```bash
cd /Users/nicolette/ilearn_how
./deploy-piper-railway.sh
railway up
```

This gets you running TODAY with real TTS!
