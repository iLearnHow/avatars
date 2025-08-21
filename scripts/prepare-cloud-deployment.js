#!/usr/bin/env node

/**
 * Cloud Deployment Preparation Script
 * Prepares avatar assets for Railway/Cloudflare deployment
 * Optimizes assets and generates manifest for cloud storage
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const CONFIG = {
    sourceDir: path.join(__dirname, '../production-deploy/assets/avatars'),
    outputDir: path.join(__dirname, '../production-deploy/cloud-assets'),
    manifestFile: path.join(__dirname, '../production-deploy/asset-manifest.json'),
    cdnBase: process.env.CDN_BASE_URL || 'https://ilearnhow.com/assets/avatars',
    
    // Asset optimization settings
    optimization: {
        // Critical assets to preload
        criticalAssets: [
            'kelly/kelly_neutral_default.png',
            'ken/ken_neutral_default.png',
            'kelly/lesson-sequence/kelly_teaching_explaining.png',
            'ken/lesson-sequence/ken_teaching_explaining.png'
        ],
        
        // Asset categories for caching strategy
        categories: {
            'base-states': { cache: '1y', preload: true },
            'emotional-expressions': { cache: '1y', preload: true },
            'lesson-sequence': { cache: '1y', preload: true },
            'visemes_flat': { cache: '1y', preload: false },
            'mouth_': { cache: '1y', preload: false },
            'frame_': { cache: '30d', preload: false }
        }
    }
};

// Helper functions
async function getFileHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex').substring(0, 8);
}

async function getFileSize(filePath) {
    const stats = await stat(filePath);
    return stats.size;
}

async function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = await readdir(dirPath);
    
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const fileStat = await stat(filePath);
        
        if (fileStat.isDirectory()) {
            await getAllFiles(filePath, arrayOfFiles);
        } else if (file.endsWith('.png') || file.endsWith('.jpg')) {
            arrayOfFiles.push(filePath);
        }
    }
    
    return arrayOfFiles;
}

function getCacheStrategy(filePath) {
    for (const [pattern, config] of Object.entries(CONFIG.optimization.categories)) {
        if (filePath.includes(pattern)) {
            return config;
        }
    }
    return { cache: '7d', preload: false };
}

async function generateManifest() {
    console.log('📋 Generating asset manifest...\n');
    
    const manifest = {
        version: '1.0.0',
        generated: new Date().toISOString(),
        cdnBase: CONFIG.cdnBase,
        assets: {},
        preloadList: [],
        statistics: {
            totalFiles: 0,
            totalSize: 0,
            byAvatar: {
                kelly: { files: 0, size: 0 },
                ken: { files: 0, size: 0 }
            },
            byCategory: {}
        }
    };
    
    // Get all asset files
    const files = await getAllFiles(CONFIG.sourceDir);
    
    for (const filePath of files) {
        const relativePath = path.relative(CONFIG.sourceDir, filePath).replace(/\\/g, '/');
        const fileSize = await getFileSize(filePath);
        const fileHash = await getFileHash(filePath);
        const cacheStrategy = getCacheStrategy(filePath);
        
        // Determine avatar
        const avatar = relativePath.startsWith('kelly') ? 'kelly' : 'ken';
        
        // Determine category
        let category = 'other';
        if (relativePath.includes('base-states')) category = 'base-states';
        else if (relativePath.includes('emotional-expressions')) category = 'expressions';
        else if (relativePath.includes('lesson-sequence')) category = 'lesson';
        else if (relativePath.includes('visemes_flat')) category = 'visemes';
        else if (relativePath.includes('mouth_')) category = 'phonemes';
        else if (relativePath.includes('frame_')) category = 'frames';
        
        // Add to manifest
        manifest.assets[relativePath] = {
            path: relativePath,
            url: `${CONFIG.cdnBase}/${relativePath}`,
            size: fileSize,
            hash: fileHash,
            avatar: avatar,
            category: category,
            cache: cacheStrategy.cache,
            preload: cacheStrategy.preload || CONFIG.optimization.criticalAssets.includes(relativePath)
        };
        
        // Update statistics
        manifest.statistics.totalFiles++;
        manifest.statistics.totalSize += fileSize;
        manifest.statistics.byAvatar[avatar].files++;
        manifest.statistics.byAvatar[avatar].size += fileSize;
        
        if (!manifest.statistics.byCategory[category]) {
            manifest.statistics.byCategory[category] = { files: 0, size: 0 };
        }
        manifest.statistics.byCategory[category].files++;
        manifest.statistics.byCategory[category].size += fileSize;
        
        // Add to preload list if needed
        if (manifest.assets[relativePath].preload) {
            manifest.preloadList.push(relativePath);
        }
        
        // Progress indicator
        if (manifest.statistics.totalFiles % 50 === 0) {
            process.stdout.write('.');
        }
    }
    
    console.log('\n');
    
    // Save manifest
    fs.writeFileSync(CONFIG.manifestFile, JSON.stringify(manifest, null, 2));
    
    return manifest;
}

function generateCloudflareHeaders() {
    console.log('\n📝 Generating Cloudflare _headers file...');
    
    const headers = `# Avatar asset caching rules
/assets/avatars/*
  Cache-Control: public, max-age=31536000, immutable
  
/assets/avatars/*/2d/full/*
  Cache-Control: public, max-age=2592000
  
/assets/avatars/*/kelly_neutral_default.png
  Cache-Control: public, max-age=31536000, immutable
  Link: </assets/avatars/kelly/kelly_neutral_default.png>; rel=preload; as=image
  
/assets/avatars/*/ken_neutral_default.png
  Cache-Control: public, max-age=31536000, immutable
  Link: </assets/avatars/ken/ken_neutral_default.png>; rel=preload; as=image

/*.html
  Cache-Control: no-cache
  
/*.js
  Cache-Control: public, max-age=3600
  
/*.css
  Cache-Control: public, max-age=3600`;
  
    const headersPath = path.join(__dirname, '../production-deploy/_headers');
    fs.writeFileSync(headersPath, headers);
    console.log('✅ Created _headers file');
}

function generateServiceWorker(manifest) {
    console.log('\n⚙️  Generating service worker...');
    
    const sw = `// Auto-generated service worker for avatar assets
const CACHE_NAME = 'avatar-cache-v${manifest.version}';
const CDN_BASE = '${manifest.cdnBase}';

// Critical assets to cache immediately
const CRITICAL_ASSETS = ${JSON.stringify(manifest.preloadList.map(p => `${manifest.cdnBase}/${p}`), null, 2)};

// Install event - cache critical assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching critical avatar assets...');
            return cache.addAll(CRITICAL_ASSETS);
        })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name.startsWith('avatar-cache-') && name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    if (event.request.url.includes('/assets/avatars/')) {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(response => {
                    // Cache successful responses
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
    }
});`;
    
    const swPath = path.join(__dirname, '../production-deploy/sw.js');
    fs.writeFileSync(swPath, sw);
    console.log('✅ Created service worker');
}

function generateDeploymentGuide(manifest) {
    console.log('\n📖 Generating deployment guide...');
    
    const guide = `# Cloud Deployment Guide

Generated: ${new Date().toISOString()}

## Asset Statistics
- Total Files: ${manifest.statistics.totalFiles}
- Total Size: ${(manifest.statistics.totalSize / 1024 / 1024).toFixed(2)} MB
- Kelly Assets: ${manifest.statistics.byAvatar.kelly.files} files (${(manifest.statistics.byAvatar.kelly.size / 1024 / 1024).toFixed(2)} MB)
- Ken Assets: ${manifest.statistics.byAvatar.ken.files} files (${(manifest.statistics.byAvatar.ken.size / 1024 / 1024).toFixed(2)} MB)

## Category Breakdown
${Object.entries(manifest.statistics.byCategory).map(([cat, stats]) => 
    `- ${cat}: ${stats.files} files (${(stats.size / 1024 / 1024).toFixed(2)} MB)`
).join('\n')}

## Railway Deployment

1. **Environment Variables**
   \`\`\`
   CDN_BASE_URL=https://your-app.railway.app/assets/avatars
   NODE_ENV=production
   \`\`\`

2. **Build Command**
   \`\`\`
   npm install && npm run build
   \`\`\`

3. **Start Command**
   \`\`\`
   npm start
   \`\`\`

4. **Static Files**
   Ensure \`production-deploy\` is served as static directory

## Cloudflare Pages

1. **Build Settings**
   - Build command: \`npm run build\`
   - Build output directory: \`production-deploy\`

2. **Environment Variables**
   - \`CDN_BASE_URL\`: Your Cloudflare Pages URL

3. **Headers**
   The \`_headers\` file is already configured for optimal caching

## Verification

After deployment, verify:
1. Visit \`/inventory\` to check all assets
2. Check browser DevTools Network tab for caching headers
3. Test on mobile devices for performance

## Critical Assets (Preloaded)
${manifest.preloadList.map(asset => `- ${asset}`).join('\n')}
`;
    
    const guidePath = path.join(__dirname, '../production-deploy/CLOUD_DEPLOYMENT.md');
    fs.writeFileSync(guidePath, guide);
    console.log('✅ Created deployment guide');
}

async function main() {
    console.log('☁️  Cloud Deployment Preparation');
    console.log('================================\n');
    
    try {
        // Check if assets directory exists
        if (!fs.existsSync(CONFIG.sourceDir)) {
            console.error('❌ Assets directory not found:', CONFIG.sourceDir);
            console.error('   Run the frame extraction script first.');
            process.exit(1);
        }
        
        // Generate asset manifest
        const manifest = await generateManifest();
        
        console.log('📊 Asset Summary:');
        console.log(`   Total files: ${manifest.statistics.totalFiles}`);
        console.log(`   Total size: ${(manifest.statistics.totalSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Critical assets: ${manifest.preloadList.length}`);
        
        // Generate deployment files
        generateCloudflareHeaders();
        generateServiceWorker(manifest);
        generateDeploymentGuide(manifest);
        
        console.log('\n✅ Cloud deployment preparation complete!');
        console.log('\n📋 Generated files:');
        console.log('   - asset-manifest.json (asset inventory)');
        console.log('   - _headers (Cloudflare caching rules)');
        console.log('   - sw.js (service worker for offline support)');
        console.log('   - CLOUD_DEPLOYMENT.md (deployment guide)');
        
        console.log('\n🚀 Ready for deployment to Railway or Cloudflare!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { generateManifest };
