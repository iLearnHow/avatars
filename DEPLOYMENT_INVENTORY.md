# Deploying the Avatar Inventory to ilearnhow.com/inventory

## Quick Deploy Steps

1. **Ensure all files are in production-deploy/**
   - `inventory.html` - The main gallery page
   - `assets/avatars/` - All avatar assets
   - `_redirects` - URL routing configuration

2. **Deploy to Cloudflare Pages**
   ```bash
   # From the project root
   cd production-deploy
   
   # If using Wrangler CLI
   wrangler pages publish . --project-name=ilearnhow
   ```

3. **Verify Deployment**
   - Visit: https://ilearnhow.com/inventory
   - Check that images load correctly
   - Verify R2 connection status shows green

## Manual Upload to R2 (if needed)

If assets need to be uploaded to R2 separately:

```bash
# Example using AWS CLI (works with R2)
aws s3 sync ./production-deploy/assets/avatars/ s3://your-r2-bucket/assets/avatars/ \
  --endpoint-url https://YOUR-ACCOUNT-ID.r2.cloudflarestorage.com
```

## Testing Locally

1. **Start a local server**
   ```bash
   cd production-deploy
   python -m http.server 8000
   # or
   npx serve .
   ```

2. **Visit**
   - http://localhost:8000/inventory.html

## Features Available at /inventory

- **Visual Gallery**: See all Ken & Kelly avatar frames
- **Frame Names**: Each asset shows its filename
- **Status Indicators**: Green (available) or Red (missing)
- **Statistics**: Total assets, sizes, and availability
- **Filters**: Show all, available only, or missing only
- **R2 Status**: Real-time connection check

## Troubleshooting

1. **Images not loading**: Check browser console for 404 errors
2. **R2 status shows error**: Verify CORS settings on R2 bucket
3. **Missing assets**: Run `node scripts/verify-avatar-inventory.js`

## Asset Counts

- **Kelly**: 413 total assets
- **Ken**: 395 total assets
- **Total**: 808 files (~955 MB)

The inventory page automatically checks for all expected assets and reports any missing files.
