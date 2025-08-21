# 🚀 Deploy Piper TTS Right Now - Web Dashboard

Your code is pushed to GitHub! Here's how to deploy in 5 minutes:

## Step 1: Go to Railway
👉 https://railway.app

## Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **iLearnHow/mynextlesson-synthesis**
4. Select branch: **tts-server**

## Step 3: Configure Build
After import, go to Settings:
1. Click on your service
2. Go to **Settings** tab
3. Under **Build Configuration**:
   - Dockerfile Path: `Dockerfile.piper`
4. Click **Save**

## Step 4: Add Domain
1. In Settings, find **Networking**
2. Click **Generate Domain**
3. Copy your URL (like: `your-app.up.railway.app`)

## Step 5: Watch it Build
- Railway will automatically start building
- Takes about 5-10 minutes
- Watch the logs for progress

## Step 6: Test Your Deployment
Once it's running, test it:

```bash
cd /Users/nicolette/ilearn_how
./test-tts-deployment.sh https://your-app.up.railway.app
```

## What You'll Get
✅ Real voice synthesis (Ken & Kelly)
✅ Fast response times
✅ Phoneme data for avatar sync
✅ Low memory usage
✅ Production-ready TTS

## Update Your Frontend
Add this to your DNS:
```
CNAME: api.ilearnhow.com → your-app.up.railway.app
```

Or temporarily update the code.

---

**That's it! Your TTS will be live in ~10 minutes! 🎉**
