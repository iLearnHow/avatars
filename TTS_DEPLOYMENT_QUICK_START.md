# 🚀 TTS Deployment Quick Start

## Current Situation
- Local TTS server is not running
- Railway deployment exists but uses dummy audio (no real speech)
- Need real TTS for production on ilearnhow.com

## ✅ Recommended Solution: Piper TTS on Railway

### Why Piper?
- Lightweight (~500MB RAM vs 4GB+ for Coqui)
- Fast generation
- Good quality voices
- Works within Railway's resource limits
- Real speech output (not dummy audio)

### Files Created
1. `railway-piper-server.py` - The TTS server using Piper
2. `Dockerfile.piper` - Docker configuration for Railway
3. `requirements-piper.txt` - Python dependencies
4. `deploy-piper-railway.sh` - Deployment script
5. `test-tts-deployment.sh` - Testing script

### Deploy in 3 Steps

```bash
# Step 1: Navigate to project
cd /Users/nicolette/ilearn_how

# Step 2: Run deployment script
./deploy-piper-railway.sh

# Step 3: Deploy to Railway
railway up
```

### After Deployment

1. Get your URL:
```bash
railway domain
```

2. Test the deployment:
```bash
./test-tts-deployment.sh https://your-app.up.railway.app
```

3. Update frontend to use new URL:
- Either add CNAME: `api.ilearnhow.com` → `your-app.up.railway.app`
- Or temporarily update the code to use Railway URL directly

## 🎯 Alternative Options

If Railway doesn't work out, see `ALTERNATIVE_TTS_DEPLOYMENT_PLAN.md` for:
- Cloudflare Workers + R2 (serverless)
- Eleven Labs API (premium quality)
- Digital Ocean App Platform
- Hybrid caching approach

## 🆘 Troubleshooting

If deployment fails:
```bash
# Check logs
railway logs

# Check Railway dashboard
railway open
```

## 💡 Pro Tips

1. Piper is much lighter than Coqui/XTTS
2. Voice quality is good for educational content
3. Generation is fast (~100ms for short phrases)
4. Can handle multiple concurrent requests
5. Includes phoneme data for avatar sync

Ready to deploy? Just run:
```bash
cd /Users/nicolette/ilearn_how && ./deploy-piper-railway.sh
```
