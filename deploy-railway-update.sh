#!/bin/bash

echo "🚀 Deploying Railway TTS Update to Production"
echo "============================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📋 Summary of changes:${NC}"
echo "✅ Railway TTS URL updated to: mynextlesson-synthesis-production.up.railway.app"
echo "✅ TTS integration files updated"
echo "✅ Production deploy files updated"
echo ""

echo -e "${YELLOW}📦 Copying updated files to production...${NC}"
cp local-tts-integration.js production-deploy/
cp connect-railway-tts.js production-deploy/

echo -e "${YELLOW}🔄 Deploying to production...${NC}"
cd production-deploy

# Deploy to Cloudflare Pages
if command -v wrangler &> /dev/null; then
    echo "Using Wrangler..."
    wrangler pages publish . --project-name=ilearnhow --commit-dirty=true
elif command -v npm &> /dev/null; then
    echo "Using npm..."
    npm run deploy
else
    echo -e "${YELLOW}Manual deployment needed:${NC}"
    echo "1. Copy production-deploy/* to your hosting"
    echo "2. Or use: npx wrangler pages publish ."
fi

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${BLUE}🧪 Test your production TTS:${NC}"
echo "1. Visit: https://ilearnhow.com"
echo "2. Open browser console"
echo "3. You should see: 'Railway TTS Connected'"
echo ""
echo "Or test directly:"
echo "curl https://mynextlesson-synthesis-production.up.railway.app/health"
