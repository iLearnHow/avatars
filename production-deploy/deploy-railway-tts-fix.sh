#!/bin/bash

# Deploy Railway TTS Fix Script
# This script deploys the Railway TTS integration fix to production

echo "🚀 Deploying Railway TTS Fix..."
echo "================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "railway-tts-integration.js" ]; then
    echo -e "${RED}❌ Error: railway-tts-integration.js not found in current directory${NC}"
    echo "Please run this script from the production-deploy directory"
    exit 1
fi

echo -e "${GREEN}✅ Found Railway TTS integration files${NC}"

# Test Railway TTS server
echo -e "\n${YELLOW}🔍 Testing Railway TTS server...${NC}"
HEALTH_CHECK=$(curl -s https://mynextlesson-synthesis-production.up.railway.app/health)
if [[ $HEALTH_CHECK == *"healthy"* ]]; then
    echo -e "${GREEN}✅ Railway TTS server is healthy${NC}"
    echo "Server response: $HEALTH_CHECK"
else
    echo -e "${RED}❌ Railway TTS server may be down${NC}"
    echo "Response: $HEALTH_CHECK"
fi

# Show what files will be deployed
echo -e "\n${YELLOW}📦 Files to deploy:${NC}"
echo "- lesson-player-deploy/index.html (updated with Railway TTS scripts)"
echo "- railway-tts-integration.js"
echo "- audio-service.js"
echo "- test-railway-voices.html (for testing)"

# Deployment steps
echo -e "\n${YELLOW}📋 Deployment Steps:${NC}"
echo "1. The production index.html has been updated to include Railway TTS scripts"
echo "2. Test locally first: open lesson-player-deploy/index.html in browser"
echo "3. Check browser console for '✅ Railway TTS integration ready'"
echo "4. Test voices using test-railway-voices.html"
echo "5. Deploy to production using your normal deployment process"

# Quick test option
echo -e "\n${YELLOW}🧪 Would you like to run a quick local test? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Opening test page in browser...${NC}"
    open test-railway-voices.html || xdg-open test-railway-voices.html || echo "Please open test-railway-voices.html manually"
fi

echo -e "\n${GREEN}✅ Railway TTS fix is ready for deployment!${NC}"
echo -e "${YELLOW}Remember to:${NC}"
echo "1. Test locally before deploying"
echo "2. Clear browser cache after deployment"
echo "3. Test both Ken and Kelly voices on production"

echo -e "\n${GREEN}🎉 Your students will soon hear natural Ken & Kelly voices again!${NC}"
