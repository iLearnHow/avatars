#!/bin/bash
# Cloudflare Pages Deployment Script for ilearnhow.com

echo "🚀 Deploying iLearn How to Cloudflare Pages..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check if we're logged into Cloudflare
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Please log into Cloudflare:"
    wrangler login
fi

# Deploy to Cloudflare Pages
echo "📤 Deploying to Cloudflare Pages..."
wrangler pages deploy production-deploy --project-name=ilearnhow

echo "✅ Deployment complete!"
echo "🌐 Your site should be available at: https://ilearnhow.com"
echo "📊 Monitor deployment at: https://dash.cloudflare.com/pages"
