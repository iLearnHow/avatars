#!/bin/bash

# Ken Image Processing Script
# Checks dependencies and processes Ken images for production

echo "🎯 Ken Image Processing Setup"
echo "=============================="

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found!"
    echo "Please install ImageMagick:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  CentOS: sudo yum install ImageMagick"
    exit 1
fi

echo "✅ ImageMagick found: $(convert --version | head -n1)"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found!"
    echo "Please install Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if source directory exists
if [ ! -d "lesson-player-deploy/assets/avatars" ]; then
    echo "❌ Source directory not found: lesson-player-deploy/assets/avatars"
    echo "Please ensure the Ken images are in the correct location"
    exit 1
fi

echo "✅ Source directory found"

# Count source images
source_count=$(find lesson-player-deploy/assets/avatars -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | wc -l)
echo "📊 Found $source_count source images"

# Run the image processor
echo ""
echo "🔄 Starting Ken image processing..."
echo "This will create responsive WebP and PNG versions for all devices"
echo ""

node ken-image-processor.js

# Check if processing was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Processing complete!"
    echo ""
    echo "📁 Output directory: lesson-player-deploy/assets/avatars/ken/"
    echo "📋 Asset manifest: lesson-player-deploy/assets/avatars/ken/asset-manifest.json"
    echo "📄 HTML example: lesson-player-deploy/assets/avatars/ken/html-example.html"
    echo ""
    echo "Next steps:"
    echo "1. Review the processed images"
    echo "2. Update the Ken wallpaper system to use the new paths"
    echo "3. Test loading performance across devices"
    echo "4. Deploy to production"
else
    echo "❌ Processing failed!"
    exit 1
fi 