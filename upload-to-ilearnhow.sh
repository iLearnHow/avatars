#!/bin/bash
# iLearn How - Upload Script
# Run this script to upload files to ilearnhow.com

echo "🚀 Uploading iLearn How to ilearnhow.com..."

# Check if production-deploy directory exists
if [ ! -d "production-deploy" ]; then
    echo "❌ production-deploy directory not found!"
    echo "Run: node deploy-to-production.js first"
    exit 1
fi

# List files to be uploaded
echo "📁 Files to upload:"
ls -la production-deploy/

echo ""
echo "📋 Next steps:"
echo "1. Upload all files from production-deploy/ to your hosting provider"
echo "2. Ensure files are in the root directory of ilearnhow.com"
echo "3. Test the live site at https://ilearnhow.com"
echo "4. Test the working test at https://ilearnhow.com/working-test.html"
echo ""
echo "🎯 Deployment commands saved to DEPLOYMENT_COMMANDS.md"
