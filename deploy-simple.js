/**
 * Simple Deployment Script for iLearn How
 * Copies working files to production directory
 */

const fs = require('fs');
const path = require('path');

// Production directory
const PROD_DIR = 'production-deploy';

// Files to copy
const FILES_TO_COPY = [
    'index.html',
    'complete-curriculum.js',
    'corrected-variant-generator-v2.js',
    'complete-elevenlabs-integration.js',
    'apple-quality-overlay-system.js',
    'complete-lesson-player.js',
    'dna-file-loader.js',
    'variant-switcher.js',
    'dna-ken-integration.js',
    'ken-wallpaper-system.js',
    'face-safe-positioning.js'
];

// Directories to copy
const DIRS_TO_COPY = [
    'lesson-player-deploy',
    'dna_files'
];

function copyFile(src, dest) {
    try {
        fs.copyFileSync(src, dest);
        console.log(`✅ Copied: ${src} -> ${dest}`);
    } catch (error) {
        console.error(`❌ Failed to copy ${src}:`, error.message);
    }
}

function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    
    items.forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        
        if (fs.statSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            copyFile(srcPath, destPath);
        }
    });
}

function deploy() {
    console.log('🚀 Starting simple deployment...');
    
    // Create production directory if it doesn't exist
    if (!fs.existsSync(PROD_DIR)) {
        fs.mkdirSync(PROD_DIR, { recursive: true });
        console.log(`✅ Created directory: ${PROD_DIR}`);
    }
    
    // Copy files
    console.log('\n📁 Copying files...');
    FILES_TO_COPY.forEach(file => {
        if (fs.existsSync(file)) {
            copyFile(file, path.join(PROD_DIR, file));
        } else {
            console.warn(`⚠️ File not found: ${file}`);
        }
    });
    
    // Copy directories
    console.log('\n📂 Copying directories...');
    DIRS_TO_COPY.forEach(dir => {
        if (fs.existsSync(dir)) {
            copyDirectory(dir, path.join(PROD_DIR, dir));
        } else {
            console.warn(`⚠️ Directory not found: ${dir}`);
        }
    });
    
    // Create a simple server script
    const serverScript = `#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    console.log(\`\${req.method} \${req.url}\`);
    
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(\`🚀 Server running at http://localhost:\${PORT}/\`);
    console.log(\`🌍 Ready for deployment!\`);
});
`;

    fs.writeFileSync(path.join(PROD_DIR, 'server.js'), serverScript);
    console.log('✅ Created server.js');
    
    // Create package.json for production
    const packageJson = {
        "name": "ilearnhow-production",
        "version": "1.0.0",
        "description": "iLearn How - Production Deployment",
        "main": "server.js",
        "scripts": {
            "start": "node server.js",
            "dev": "node server.js"
        },
        "engines": {
            "node": ">=14.0.0"
        }
    };
    
    fs.writeFileSync(path.join(PROD_DIR, 'package.json'), JSON.stringify(packageJson, null, 2));
    console.log('✅ Created package.json');
    
    // Create README for deployment
    const readme = `# iLearn How - Production Deployment

## Quick Start

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

3. Open in browser:
   http://localhost:3000

## Deployment Options

### Heroku
\`\`\`bash
heroku create ilearnhow-app
git push heroku main
\`\`\`

### Railway
\`\`\`bash
railway login
railway init
railway up
\`\`\`

### Render
\`\`\`bash
# Connect your GitHub repo to Render
# Set build command: npm install
# Set start command: npm start
\`\`\`

### Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## Features
- ✅ Complete lesson player
- ✅ 366-day curriculum
- ✅ Avatar system (Ken/Kelly)
- ✅ Apple-quality overlays
- ✅ Audio integration
- ✅ Variant generation
- ✅ Production ready

## Status: 🟢 READY FOR DEPLOYMENT
`;

    fs.writeFileSync(path.join(PROD_DIR, 'README.md'), readme);
    console.log('✅ Created README.md');
    
    console.log('\n🎉 Deployment complete!');
    console.log(`📁 Production files in: ${PROD_DIR}/`);
    console.log('🚀 Ready for deployment to any platform!');
    console.log('\nNext steps:');
    console.log('1. cd production-deploy');
    console.log('2. npm install');
    console.log('3. npm start');
    console.log('4. Deploy to your preferred platform');
}

deploy(); 