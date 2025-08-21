# 🚂 Railway Manual Deployment Guide

Since the CLI login is having issues, here are alternative ways to deploy:

## Option 1: Railway Web Dashboard (Easiest)

1. **Go to Railway Dashboard**
   - Visit https://railway.app
   - Log in with your account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account if needed
   - Select your repository

3. **Configure the Build**
   - In Settings → Build Configuration
   - Set Docker Path to: `Dockerfile.piper`
   - Save changes

4. **Deploy**
   - Railway will automatically start building
   - Watch the logs in the dashboard
   - Get your URL from Settings → Domains

## Option 2: Direct Railway Link

Try this direct login link in your browser:
```
https://railway.com/cli-login
```

Then run:
```bash
railway login --browserless
```

## Option 3: Deploy via Git Push

1. **Push to GitHub first**:
```bash
git push origin tts-server
```

2. **In Railway Dashboard**:
   - Import from GitHub
   - Select the `tts-server` branch
   - Railway will auto-deploy

## Option 4: Use Railway's Deploy Button

Add this to your README and click it:
```markdown
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/deploy?repo=https://github.com/YOUR_USERNAME/YOUR_REPO)
```

## Quick Test After Deployment

Once deployed, test with:
```bash
# Replace with your Railway URL
./test-tts-deployment.sh https://your-app.up.railway.app
```

## If Railway Continues to Have Issues

Consider these immediate alternatives:

### A. Deploy to Render.com (Similar to Railway)
```yaml
# render.yaml
services:
  - type: web
    name: ilearnhow-tts
    env: docker
    dockerfilePath: ./Dockerfile.piper
    envVars:
      - key: PORT
        value: 5002
```

### B. Deploy to Fly.io
```bash
fly launch --dockerfile Dockerfile.piper
fly deploy
```

### C. Quick Local Test
```bash
# Test locally first
docker build -f Dockerfile.piper -t piper-tts .
docker run -p 5002:5002 piper-tts
```

---

**Most likely solution**: Use the Railway web dashboard to import from GitHub!
