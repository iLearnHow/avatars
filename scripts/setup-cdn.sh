#!/bin/bash

# Quick CDN Setup Script for Full Lip-Sync Experience
# This script helps you set up your CDN credentials quickly

echo "🌟 Setting up CDN for Full Lip-Sync Experience"
echo "================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "production-deploy/cdn-config.js" ]; then
    echo "❌ Error: Please run this script from the ilearn_how directory"
    exit 1
fi

echo "📋 Available CDN Options:"
echo "1. Cloudflare R2 (Recommended - Fast, Global, Cost-Effective)"
echo "2. AWS S3 (Reliable, Mature)"
echo "3. Generic HTTP CDN (Any provider with HTTP API)"
echo ""

read -p "Choose your CDN provider (1-3): " cdn_choice

case $cdn_choice in
    1)
        echo ""
        echo "🌐 Setting up Cloudflare R2..."
        echo ""
        read -p "Enter your R2 Access Key ID: " r2_access_key
        read -p "Enter your R2 Secret Access Key: " r2_secret_key
        read -p "Enter your R2 Bucket Name: " r2_bucket
        read -p "Enter your R2 Endpoint URL: " r2_endpoint
        
        # Set environment variables
        export R2_ACCESS_KEY_ID="$r2_access_key"
        export R2_SECRET_ACCESS_KEY="$r2_secret_key"
        export R2_BUCKET_NAME="$r2_bucket"
        export R2_ENDPOINT="$r2_endpoint"
        
        echo ""
        echo "✅ Cloudflare R2 credentials set!"
        echo "   Access Key ID: $r2_access_key"
        echo "   Bucket: $r2_bucket"
        echo "   Endpoint: $r2_endpoint"
        ;;
        
    2)
        echo ""
        echo "☁️ Setting up AWS S3..."
        echo ""
        read -p "Enter your AWS Access Key ID: " aws_access_key
        read -p "Enter your AWS Secret Access Key: " aws_secret_key
        read -p "Enter your S3 Bucket Name: " aws_bucket
        read -p "Enter your AWS Region (default: us-east-1): " aws_region
        
        # Set defaults
        aws_region=${aws_region:-us-east-1}
        
        # Set environment variables
        export AWS_ACCESS_KEY_ID="$aws_access_key"
        export AWS_SECRET_ACCESS_KEY="$aws_secret_key"
        export AWS_BUCKET_NAME="$aws_bucket"
        export AWS_REGION="$aws_region"
        
        echo ""
        echo "✅ AWS S3 credentials set!"
        echo "   Access Key ID: $aws_access_key"
        echo "   Bucket: $aws_bucket"
        echo "   Region: $aws_region"
        ;;
        
    3)
        echo ""
        echo "🌍 Setting up Generic HTTP CDN..."
        echo ""
        read -p "Enter your CDN API Key: " cdn_api_key
        read -p "Enter your CDN Base URL: " cdn_base_url
        read -p "Enter your CDN Upload Endpoint: " cdn_upload_endpoint
        
        # Set environment variables
        export CDN_API_KEY="$cdn_api_key"
        export CDN_BASE_URL="$cdn_base_url"
        export CDN_UPLOAD_ENDPOINT="$cdn_upload_endpoint"
        
        echo ""
        echo "✅ Generic HTTP CDN credentials set!"
        echo "   API Key: $cdn_api_key"
        echo "   Base URL: $cdn_base_url"
        echo "   Upload Endpoint: $cdn_upload_endpoint"
        ;;
        
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🔧 Installing required dependencies..."

# Install AWS SDK if not already installed
if ! npm list aws-sdk >/dev/null 2>&1; then
    echo "📦 Installing AWS SDK..."
    npm install aws-sdk
else
    echo "✅ AWS SDK already installed"
fi

echo ""
echo "🧪 Testing CDN connectivity..."

# Test the connection
if node scripts/upload-to-cdn.js --test; then
    echo ""
    echo "🎉 CDN setup complete! You can now:"
    echo ""
    echo "1. Upload your avatar frames:"
    echo "   node scripts/upload-to-cdn.js"
    echo ""
    echo "2. Test the lip-sync system:"
    echo "   open production-deploy/sun-lesson-system.html"
    echo ""
    echo "3. Deploy to Railway:"
    echo "   git push origin main"
    echo ""
    echo "🌟 Your full lip-sync experience is ready!"
    
else
    echo ""
    echo "⚠️  CDN test failed. Please check your credentials and try again."
    echo "   You can still test locally without CDN."
fi

echo ""
echo "📚 For detailed setup instructions, see: production-deploy/CDN_DEPLOYMENT_GUIDE.md"
