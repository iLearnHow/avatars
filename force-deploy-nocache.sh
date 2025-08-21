#!/bin/bash

echo "🚀 Force Deploy with Cache Busting"
echo "================================="
echo ""

# Add timestamp to force cache refresh
TIMESTAMP=$(date +%s)

echo "📝 Adding cache buster to local-tts-integration.js..."
cd production-deploy

# Add a comment with timestamp to force file change
sed -i '' "1s/^/\/\/ Cache bust: $TIMESTAMP\n/" local-tts-integration.js

echo "🔄 Deploying with wrangler..."
wrangler pages deploy . --project-name=ilearnhow --commit-dirty=true

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Wait 30 seconds for propagation"
echo "2. Visit: https://ilearnhow.com/?cachebust=$TIMESTAMP"
echo "3. Hard refresh (Cmd+Shift+R) if needed"
echo ""
echo "Or manually purge Cloudflare cache:"
echo "- Go to Cloudflare Dashboard"
echo "- Select ilearnhow.com"
echo "- Caching → Configuration → Purge Everything"
