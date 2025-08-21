# Cloud Deployment Guide

Generated: 2025-08-21T14:42:24.892Z

## Asset Statistics
- Total Files: 848
- Total Size: 1092.55 MB
- Kelly Assets: 422 files (501.43 MB)
- Ken Assets: 426 files (591.12 MB)

## Category Breakdown
- other: 33 files (33.06 MB)
- frames: 712 files (924.64 MB)
- phonemes: 60 files (77.39 MB)
- visemes: 28 files (35.73 MB)
- base-states: 3 files (4.13 MB)
- expressions: 6 files (8.78 MB)
- lesson: 6 files (8.81 MB)

## Railway Deployment

1. **Environment Variables**
   ```
   CDN_BASE_URL=https://your-app.railway.app/assets/avatars
   NODE_ENV=production
   ```

2. **Build Command**
   ```
   npm install && npm run build
   ```

3. **Start Command**
   ```
   npm start
   ```

4. **Static Files**
   Ensure `production-deploy` is served as static directory

## Cloudflare Pages

1. **Build Settings**
   - Build command: `npm run build`
   - Build output directory: `production-deploy`

2. **Environment Variables**
   - `CDN_BASE_URL`: Your Cloudflare Pages URL

3. **Headers**
   The `_headers` file is already configured for optimal caching

## Verification

After deployment, verify:
1. Visit `/inventory` to check all assets
2. Check browser DevTools Network tab for caching headers
3. Test on mobile devices for performance

## Critical Assets (Preloaded)
- kelly/base-states/kelly_neutral_default.png
- kelly/emotional-expressions/kelly_concerned_thinking.png
- kelly/emotional-expressions/kelly_happy_celebrating.png
- kelly/kelly_neutral_default.png
- kelly/lesson-sequence/kelly_question_curious.png
- kelly/lesson-sequence/kelly_teaching_explaining.png
- kelly/optimized/base-states/kelly_neutral_default.png
- kelly/optimized/emotional-expressions/kelly_concerned_thinking.png
- kelly/optimized/emotional-expressions/kelly_happy_celebrating.png
- kelly/optimized/lesson-sequence/kelly_question_curious.png
- kelly/optimized/lesson-sequence/kelly_teaching_explaining.png
- ken/base-states/ken_neutral_default.png
- ken/emotional-expressions/ken_concerned_thinking.png
- ken/emotional-expressions/ken_happy_celebrating.png
- ken/ken_neutral_default.png
- ken/lesson-sequence/ken_question_curious.png
- ken/lesson-sequence/ken_teaching_explaining.png
