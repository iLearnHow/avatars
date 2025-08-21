#!/bin/bash

echo "🚀 Emergency Deploy: Blocking macOS Placeholder Voices"
echo "====================================================="
echo ""

cd production-deploy

# Add timestamp to force cache refresh
TIMESTAMP=$(date +%s)

echo "📝 Changes made:"
echo "1. Added block-placeholder-tts.js to prevent macOS voices"
echo "2. Disabled HomegrownTTSSystem initialization"
echo "3. Railway TTS will handle all voice synthesis"
echo ""

echo "🔄 Deploying to production..."
wrangler pages deploy . --project-name=ilearnhow --commit-dirty=true

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🧪 Test the fix:"
echo "1. Visit: https://ilearnhow.com/?v=$TIMESTAMP"
echo "2. You should NOT hear 'lesson orientation' anymore"
echo "3. Only Railway TTS voices (Ken/Kelly) should speak"
echo ""
echo "If you still hear macOS voices:"
echo "- Clear browser cache (Cmd+Shift+R)"
echo "- Or wait 1-2 minutes for CDN to update"
