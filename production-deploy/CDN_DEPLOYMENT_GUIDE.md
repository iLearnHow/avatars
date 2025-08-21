# 🌟 CDN Deployment Guide for Full Lip-Sync Experience

## 🎯 Overview

This guide will help you set up CDN storage for your avatar frames to enable the complete lip-sync experience. The system supports multiple CDN providers including Cloudflare R2, AWS S3, and generic HTTP CDNs.

## 🚀 Quick Start

### 1. **Choose Your CDN Provider**

#### Option A: Cloudflare R2 (Recommended)
- **Pros**: Fast, global, cost-effective, S3-compatible API
- **Setup**: Create R2 bucket and get API credentials
- **Cost**: ~$0.015 per GB stored + $0.40 per million requests

#### Option B: AWS S3
- **Pros**: Reliable, mature, extensive features
- **Setup**: Create S3 bucket and IAM user
- **Cost**: ~$0.023 per GB stored + $0.0004 per request

#### Option C: Generic HTTP CDN
- **Pros**: Works with any CDN provider
- **Setup**: Configure HTTP upload endpoint
- **Cost**: Varies by provider

### 2. **Set Environment Variables**

```bash
# For Cloudflare R2
export R2_ACCESS_KEY_ID="your-r2-access-key"
export R2_SECRET_ACCESS_KEY="your-r2-secret-key"

# For AWS S3
export AWS_ACCESS_KEY_ID="your-aws-access-key"
export AWS_SECRET_ACCESS_KEY="your-aws-secret-key"

# For Generic HTTP CDN
export CDN_API_KEY="your-cdn-api-key"
```

### 3. **Update Configuration**

Edit `production-deploy/cdn-config.js` and update the URLs:

```javascript
// Example for Cloudflare R2
baseUrl: 'https://your-bucket.your-subdomain.r2.cloudflarestorage.com/avatars',

// Example for AWS S3
baseUrl: 'https://your-bucket.s3.amazonaws.com/avatars',

// Example for custom domain
baseUrl: 'https://cdn.yourdomain.com/avatars',
```

### 4. **Run the Upload Script**

```bash
cd /Users/nicolette/ilearn_how
node scripts/upload-to-cdn.js
```

## 🔧 Detailed Setup

### Cloudflare R2 Setup

1. **Create R2 Bucket**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to R2 Object Storage
   - Create new bucket: `avatar-frames`
   - Set public access if needed

2. **Create API Token**
   - Go to API Tokens
   - Create custom token with R2 permissions
   - Copy Access Key ID and Secret Access Key

3. **Configure CORS** (if needed)
   ```json
   [
     {
       "AllowedOrigins": ["*"],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedHeaders": ["*"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```

### AWS S3 Setup

1. **Create S3 Bucket**
   - Go to [AWS S3 Console](https://s3.console.aws.amazon.com)
   - Create bucket: `your-avatar-frames`
   - Choose region close to your users

2. **Create IAM User**
   - Go to IAM Console
   - Create user with S3 access
   - Attach policy: `AmazonS3FullAccess` (or custom policy)

3. **Configure Bucket Policy**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-avatar-frames/*"
       }
     ]
   }
   ```

## 📁 File Structure

After upload, your CDN will have this structure:

```
avatars/
├── kelly/
│   ├── frames/
│   │   ├── kelly_frame_0000.png
│   │   ├── kelly_frame_0001.png
│   │   └── ... (365 total)
│   ├── visemes/
│   │   ├── A.png
│   │   ├── E.png
│   │   └── ... (27 phonemes)
│   └── expressions/
│       ├── kelly_neutral.png
│       ├── kelly_happy.png
│       └── ... (7 states)
└── ken/
    ├── frames/
    │   ├── ken_frame_0000.png
    │   ├── ken_frame_0001.png
    │   └── ... (347 total)
    ├── visemes/
    └── expressions/
```

## 🎬 Lip-Sync Configuration

### Frame Rate Settings

```javascript
// In cdn-config.js
frameSelection: {
    strategy: 'phoneme_based', // or 'time_based'
    fallbackFrames: 30,        // fps if phoneme detection fails
    interpolation: true,        // smooth transitions
    preloadFrames: 10          // frames to preload ahead
}
```

### Performance Optimization

```javascript
performance: {
    lazyLoading: true,         // load frames on demand
    progressiveLoading: true,  // load in background
    frameCacheSize: 100,       // frames to keep in memory
    preloadThreshold: 0.8      // preload at 80% completion
}
```

## 🧪 Testing

### 1. **Test CDN Connectivity**

```bash
# Test R2
curl -I "https://your-bucket.your-subdomain.r2.cloudflarestorage.com/avatars/kelly/frames/kelly_frame_0000.png"

# Test S3
curl -I "https://your-bucket.s3.amazonaws.com/avatars/kelly/frames/kelly_frame_0000.png"
```

### 2. **Test Frame Loading**

Open your browser console and test:

```javascript
// Test frame loading
const frameUrl = CDN_HELPERS.getFrameUrl('kelly', 0);
console.log('Frame URL:', frameUrl);

// Test viseme loading
const visemeUrl = CDN_HELPERS.getVisemeUrl('kelly', 'A');
console.log('Viseme URL:', visemeUrl);
```

### 3. **Performance Monitoring**

```javascript
// Check CDN health
const isHealthy = await CDN_HELPERS.checkCDNHealth();
console.log('CDN Health:', isHealthy);

// Get optimal frame rate
const frameRate = CDN_HELPERS.getOptimalFrameRate();
console.log('Optimal Frame Rate:', frameRate);
```

## 📊 Monitoring & Analytics

### Cloudflare R2 Analytics

- **Dashboard**: R2 Object Storage > Analytics
- **Metrics**: Requests, bandwidth, errors
- **Logs**: Access logs for debugging

### AWS S3 Analytics

- **Dashboard**: S3 > Management > Analytics
- **Metrics**: Requests, latency, errors
- **CloudWatch**: Detailed monitoring

### Custom Monitoring

```javascript
// Add to your application
setInterval(async () => {
    const health = await CDN_HELPERS.checkCDNHealth();
    if (!health) {
        console.warn('CDN health check failed');
        // Implement fallback logic
    }
}, 60000); // Check every minute
```

## 🔄 Maintenance

### Regular Tasks

1. **Monitor Storage Usage**
   - Check bucket size monthly
   - Optimize compression settings
   - Archive old frames if needed

2. **Performance Optimization**
   - Monitor frame load times
   - Adjust preload settings
   - Update compression quality

3. **Backup Strategy**
   - Keep local copies of frames
   - Use versioning if supported
   - Test restoration process

### Troubleshooting

#### Common Issues

1. **Frames Not Loading**
   - Check CORS settings
   - Verify bucket permissions
   - Test with curl/Postman

2. **Slow Performance**
   - Check CDN region
   - Optimize compression
   - Reduce frame quality

3. **Upload Failures**
   - Verify credentials
   - Check network connectivity
   - Review error logs

## 💰 Cost Optimization

### Storage Optimization

- **Compression**: Use WebP format (85% quality)
- **Frame Reduction**: Consider 24fps instead of 30fps
- **Archiving**: Move old frames to cheaper storage

### Request Optimization

- **Caching**: Set appropriate cache headers
- **Preloading**: Load frames in background
- **Lazy Loading**: Only load visible frames

### CDN Selection

| Provider | Storage Cost | Request Cost | Best For |
|----------|--------------|--------------|----------|
| Cloudflare R2 | $0.015/GB | $0.40/M | Global, cost-effective |
| AWS S3 | $0.023/GB | $0.0004/req | High reliability |
| Backblaze B2 | $0.005/GB | $0.004/req | Budget storage |

## 🎯 Next Steps

1. **Choose your CDN provider** and set up credentials
2. **Update the configuration** with your actual URLs
3. **Run the upload script** to populate your CDN
4. **Test the lip-sync system** with uploaded frames
5. **Monitor performance** and optimize as needed
6. **Deploy to production** and enjoy smooth avatar animations!

## 📞 Support

- **Cloudflare R2**: [Documentation](https://developers.cloudflare.com/r2/)
- **AWS S3**: [Documentation](https://docs.aws.amazon.com/s3/)
- **Backblaze B2**: [Documentation](https://www.backblaze.com/b2/docs/)

---

**Happy Lip-Syncing! 🎭✨**
