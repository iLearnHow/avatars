# Railway Deployment Checklist for iLearn How

## ✅ Pre-Deployment Verification

### Assets Ready
- [x] **Kelly Avatar**: 414 files (453 MB)
  - [x] 366 animation frames
  - [x] 13 viseme frames
  - [x] 30 mouth phonemes
  - [x] 5 expression states
  
- [x] **Ken Avatar**: 396 files (520 MB)
  - [x] 348 animation frames
  - [x] 13 viseme frames
  - [x] 30 mouth phonemes
  - [x] 5 expression states

### Core Files
- [x] `index.html` - Avatar selection screen (Kelly default in 16:9)
- [x] `inventory.html` - Asset inventory viewer
- [x] `complete-lesson-player.html` - Main lesson player
- [x] `sw.js` - Service worker for offline support
- [x] `_headers` - Cloudflare caching rules
- [x] `asset-manifest.json` - Complete asset inventory

### Server Configuration
- [x] `server.js` - Express server with compression
- [x] `package.json` - Dependencies and scripts
- [x] `railway.json` - Railway configuration

## 🚀 Railway Deployment Steps

### 1. Initial Setup
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login
```

### 2. Create New Project
```bash
# Initialize Railway project
railway init

# Link to GitHub repository (recommended)
railway link
```

### 3. Environment Variables
Set these in Railway dashboard:
```
NODE_ENV=production
PORT=3000
CDN_BASE_URL=https://your-app.railway.app/assets/avatars
```

### 4. Deploy
```bash
# Deploy to Railway
railway up

# Or use GitHub auto-deploy
git push origin main
```

### 5. Custom Domain (Optional)
In Railway dashboard:
1. Go to Settings → Domains
2. Add custom domain: `ilearnhow.com`
3. Update DNS records as instructed

## 📱 Mobile Optimization Verification

### Critical Performance Metrics
- [x] First avatar loads immediately (Kelly by default)
- [x] 16:9 aspect ratio maintained on all devices
- [x] Touch gestures disabled (no pinch zoom)
- [x] Service worker caches critical assets
- [x] Preload links for fast switching

### Browser Compatibility
Test on:
- [ ] Chrome (Desktop & Mobile)
- [ ] Safari (iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet

## 🔍 Post-Deployment Verification

### 1. Check Core Functionality
```bash
# Visit these URLs after deployment
https://your-app.railway.app/              # Avatar selection
https://your-app.railway.app/inventory      # Asset inventory
https://your-app.railway.app/health         # Health check
```

### 2. Performance Testing
- [ ] Lighthouse score > 90
- [ ] First contentful paint < 1.5s
- [ ] Time to interactive < 3s
- [ ] Avatar switching < 0.5s

### 3. Asset Loading
- [ ] Kelly avatar loads by default
- [ ] Ken avatar loads on selection
- [ ] All visemes accessible
- [ ] Frame animation smooth

## 🎯 Future Enhancements (After Basic Deploy)

### Tone Variations
- [ ] Fun tone video processing
- [ ] Warm tone video processing
- [ ] Tone-specific asset generation

### Advanced Features
- [ ] Real-time lip-sync with TTS
- [ ] Phoneme mapping optimization
- [ ] WebGL acceleration
- [ ] Progressive frame loading

## 📊 Current Asset Summary

```
Total Assets: 848 files (1.09 GB)
- Kelly: 414 files (453 MB)
- Ken: 396 files (520 MB)
- UI/Other: 38 files (116 MB)

Critical Preloaded Assets: 17
- kelly_neutral_default.png
- ken_neutral_default.png
- Teaching expressions (2)
- Question expressions (2)
- Happy expressions (2)
- Concerned expressions (2)
- Base visemes (6)
```

## 🚨 Troubleshooting

### If avatars don't load:
1. Check browser console for 404 errors
2. Verify `/assets/avatars/` path is correct
3. Check service worker registration
4. Clear browser cache and retry

### If performance is slow:
1. Enable Railway's CDN
2. Check compression is working
3. Verify cache headers are set
4. Consider using Cloudflare in front

### If mobile layout breaks:
1. Check viewport meta tag
2. Test in Chrome DevTools mobile mode
3. Verify aspect ratio calculations
4. Check touch event handlers

## ✅ Final Checklist

- [ ] All assets verified locally
- [ ] `railway up` runs without errors
- [ ] Health check endpoint responds
- [ ] Avatar selection works
- [ ] Mobile devices tested
- [ ] Performance acceptable
- [ ] DNS configured (if custom domain)
- [ ] SSL certificate active
- [ ] Monitoring enabled

## 🎉 Launch!

Once all checks pass:
1. Share the URL: `https://ilearnhow.up.railway.app`
2. Monitor logs: `railway logs`
3. Check metrics: Railway dashboard
4. Celebrate! 🚀

---

**Note**: After deployment, run the inventory page (`/inventory`) to verify all assets are accessible from the production URL.
