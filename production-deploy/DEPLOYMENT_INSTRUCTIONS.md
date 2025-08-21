# 🚀 Deploy to ilearnhow.com

## Universal Lesson Player Deployment

### Files Ready for Upload:
All files are prepared in the `production-deploy/` directory.

### Method 1: cPanel File Manager
1. Log into your hosting cPanel
2. Open File Manager
3. Navigate to public_html/ (or www/)
4. Upload all files from production-deploy/ directory
5. Ensure index.html is in the root directory

### Method 2: FTP/SFTP
```bash
# Connect to your hosting provider
sftp username@your-hosting-provider.com
cd public_html/

# Upload core files
put production-deploy/index.html
put production-deploy/*.js

# Upload assets
put -r production-deploy/lesson-player-deploy/
put -r production-deploy/data/
put -r production-deploy/dna_files/
```

### Method 3: Cloudflare Pages
1. Go to Cloudflare Dashboard
2. Navigate to Pages
3. Create new project
4. Upload files from production-deploy/ directory

### Post-Deployment Verification:
1. Visit https://ilearnhow.com
2. Test https://ilearnhow.com/working-test.html
3. Check browser console for any errors
4. Test all icons and overlays
5. Configure ElevenLabs API keys for voice synthesis

### Universal Features Deployed:
- 🌍 366 daily lessons for 2025
- 👶 10 age groups (2-102 years)
- 🎨 3 tones (grandmother, fun, neutral)
- 🌍 12 languages
- 🎭 2 avatars (Kelly, Ken)
- 🎲 3x3x3x3 variants (81 per lesson)
- 🎵 ElevenLabs voice synthesis
- 📅 Complete calendar system
- 🧠 Universal learning for humanity

### Configuration Required:
1. Set up ElevenLabs API keys for voice synthesis
2. Configure hosting for proper file serving
3. Test all variant combinations
4. Monitor for any issues

🎯 **Mission:** Universal learning accessible to everyone on Earth
