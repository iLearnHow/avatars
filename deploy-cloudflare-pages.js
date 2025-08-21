/**
 * Cloudflare Pages Deployment Script
 * Deploys iLearn How to ilearnhow.com via Cloudflare Pages
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Deploying to ilearnhow.com via Cloudflare Pages...');

// Check if we have the deployment package
function checkDeploymentPackage() {
    console.log('\n📦 Checking deployment package...');
    
    const deploymentDir = 'production-deploy';
    if (!fs.existsSync(deploymentDir)) {
        console.log('❌ Deployment package not found. Run deploy-to-production.js first.');
        return false;
    }
    
    const criticalFiles = ['index.html', 'complete-curriculum.js', 'corrected-variant-generator-v2.js'];
    const missingFiles = criticalFiles.filter(file => !fs.existsSync(path.join(deploymentDir, file)));
    
    if (missingFiles.length > 0) {
        console.log(`❌ Missing critical files: ${missingFiles.join(', ')}`);
        return false;
    }
    
    console.log('✅ All critical files present');
    return true;
}

// Create Cloudflare Pages configuration
function createCloudflarePagesConfig() {
    console.log('\n⚙️ Creating Cloudflare Pages configuration...');
    
    const wranglerConfig = `name = "ilearnhow"
compatibility_date = "2024-08-01"
compatibility_flags = ["nodejs_compat"]

[site]
bucket = "./production-deploy"
entry-point = "workers-site"

[build]
command = "echo 'No build required - static files only'"
publish = "production-deploy"

[env.production]
name = "ilearnhow.com"
route = "ilearnhow.com/*"

[env.production.site]
bucket = "./production-deploy"
`;

    const configPath = 'wrangler.toml';
    fs.writeFileSync(configPath, wranglerConfig);
    console.log('✅ Cloudflare Pages config created: wrangler.toml');
    
    return configPath;
}

// Create package.json for Cloudflare Pages
function createPackageJson() {
    console.log('\n📦 Creating package.json for Cloudflare Pages...');
    
    const packageJson = {
        "name": "ilearnhow",
        "version": "1.0.0",
        "description": "iLearn How - Personalized Learning with Kelly and Ken",
        "main": "index.html",
        "scripts": {
            "deploy": "wrangler pages deploy production-deploy --project-name=ilearnhow",
            "dev": "wrangler pages dev production-deploy",
            "test": "echo 'Testing complete'"
        },
        "keywords": ["education", "learning", "personalized", "avatars"],
        "author": "iLearn How Team",
        "license": "MIT",
        "devDependencies": {
            "wrangler": "^3.0.0"
        }
    };
    
    const packagePath = 'package.json';
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Package.json created for Cloudflare Pages');
    
    return packagePath;
}

// Create deployment script
function createDeploymentScript() {
    console.log('\n📤 Creating Cloudflare Pages deployment script...');
    
    const deployScript = `#!/bin/bash
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
`;

    const scriptPath = 'deploy-cloudflare.sh';
    fs.writeFileSync(scriptPath, deployScript);
    
    // Make it executable
    execSync(`chmod +x ${scriptPath}`);
    
    console.log('✅ Cloudflare Pages deployment script created: deploy-cloudflare.sh');
    return scriptPath;
}

// Create step-by-step instructions
function createCloudflareInstructions() {
    console.log('\n📋 Creating Cloudflare Pages instructions...');
    
    const instructions = `# 🚀 Cloudflare Pages Deployment Guide

## Prerequisites
1. Cloudflare account with Pages enabled
2. Node.js and npm installed
3. Wrangler CLI installed

## Step 1: Install Wrangler CLI
\`\`\`bash
npm install -g wrangler
\`\`\`

## Step 2: Login to Cloudflare
\`\`\`bash
wrangler login
\`\`\`

## Step 3: Deploy to Cloudflare Pages
\`\`\`bash
# Option A: Use the deployment script
./deploy-cloudflare.sh

# Option B: Manual deployment
wrangler pages deploy production-deploy --project-name=ilearnhow
\`\`\`

## Step 4: Configure Custom Domain
1. Go to Cloudflare Dashboard
2. Navigate to Pages > ilearnhow
3. Go to Custom domains
4. Add ilearnhow.com
5. Configure DNS settings

## Step 5: Verify Deployment
- Main site: https://ilearnhow.com
- Test page: https://ilearnhow.com/working-test.html
- Live test: https://ilearnhow.com/live-test.html

## Expected Results
- ✅ Site loads without errors
- ✅ All icons work (📅 😊 🎭 🌍 👶 ➕)
- ✅ Overlays show/hide properly
- ✅ Kelly and Ken avatars display correctly
- ✅ No JavaScript errors in console

## Troubleshooting
- If deployment fails, check wrangler login status
- If domain doesn't work, verify DNS settings in Cloudflare
- If files don't load, check the production-deploy directory exists

## Files Being Deployed
- index.html (main interface)
- All JavaScript files (*.js)
- Avatar assets (lesson-player-deploy/)
- Curriculum data (data/)
- Test files (working-test.html, live-test.html)
`;

    const instructionsPath = 'CLOUDFLARE_PAGES_DEPLOYMENT.md';
    fs.writeFileSync(instructionsPath, instructions);
    console.log('✅ Cloudflare Pages instructions saved');
    
    return instructionsPath;
}

// Create a simple test to verify Cloudflare deployment
function createCloudflareTest() {
    console.log('\n🧪 Creating Cloudflare deployment test...');
    
    const testScript = `
// Cloudflare Pages Deployment Test
// Run this in browser console after deployment

console.log('🧪 Testing Cloudflare Pages deployment...');

// Test 1: Check if site loads
if (document.title.includes('iLearn How')) {
    console.log('✅ Site title correct');
} else {
    console.log('❌ Site title incorrect');
}

// Test 2: Check for Cloudflare-specific elements
const tests = [
    { name: 'Avatar Container', selector: '#avatar-container', expected: true },
    { name: 'Lesson Info', selector: '#lesson-info', expected: true },
    { name: 'Navigation Icons', selector: '.nav-icons', expected: true },
    { name: 'Calendar Overlay', selector: '#calendar-overlay', expected: true },
    { name: 'Tone Overlay', selector: '#tone-overlay', expected: true },
    { name: 'Avatar Overlay', selector: '#avatar-overlay', expected: true }
];

let passedTests = 0;
tests.forEach(test => {
    const element = document.querySelector(test.selector);
    if (element === null && !test.expected) {
        console.log(\`✅ \${test.name} - Not present (expected)\`);
        passedTests++;
    } else if (element !== null && test.expected) {
        console.log(\`✅ \${test.name} - Present\`);
        passedTests++;
    } else {
        console.log(\`❌ \${test.name} - \${test.expected ? 'Missing' : 'Unexpectedly present'}\`);
    }
});

console.log(\`\\n🎯 Cloudflare Pages Test Results: \${passedTests}/\${tests.length} tests passed\`);

if (passedTests === tests.length) {
    console.log('🎉 CLOUDFLARE PAGES DEPLOYMENT SUCCESSFUL!');
} else {
    console.log('⚠️ Some tests failed - check deployment');
}

// Test 3: Check for Cloudflare headers
fetch(window.location.href)
    .then(response => {
        const server = response.headers.get('server');
        if (server && server.includes('cloudflare')) {
            console.log('✅ Cloudflare server detected');
        } else {
            console.log('⚠️ Cloudflare server not detected');
        }
    })
    .catch(error => {
        console.log('❌ Error checking server headers:', error);
    });
`;

    const testPath = 'production-deploy/cloudflare-test.js';
    fs.writeFileSync(testPath, testScript);
    console.log('✅ Cloudflare deployment test created');
    
    return testPath;
}

// Main Cloudflare Pages deployment function
function deployToCloudflarePages() {
    console.log('🚀 Starting Cloudflare Pages deployment...\n');
    
    // Step 1: Check deployment package
    if (!checkDeploymentPackage()) {
        console.log('\n❌ Cannot proceed without deployment package');
        return false;
    }
    
    // Step 2: Create Cloudflare Pages configuration
    const configPath = createCloudflarePagesConfig();
    
    // Step 3: Create package.json
    const packagePath = createPackageJson();
    
    // Step 4: Create deployment script
    const deployScript = createDeploymentScript();
    
    // Step 5: Create instructions
    const instructionsPath = createCloudflareInstructions();
    
    // Step 6: Create test script
    const testScript = createCloudflareTest();
    
    // Step 7: Generate final summary
    console.log('\n🎉 CLOUDFLARE PAGES DEPLOYMENT READY!');
    console.log('==========================================');
    console.log('📁 Files ready in: production-deploy/');
    console.log('⚙️ Config: wrangler.toml');
    console.log('📦 Package: package.json');
    console.log('📤 Script: deploy-cloudflare.sh');
    console.log('📋 Instructions: CLOUDFLARE_PAGES_DEPLOYMENT.md');
    console.log('🧪 Test: production-deploy/cloudflare-test.js');
    console.log('\n🚀 IMMEDIATE ACTIONS:');
    console.log('1. Install Wrangler CLI: npm install -g wrangler');
    console.log('2. Login to Cloudflare: wrangler login');
    console.log('3. Deploy: ./deploy-cloudflare.sh');
    console.log('4. Configure custom domain: ilearnhow.com');
    console.log('5. Test live site: https://ilearnhow.com');
    console.log('\n📞 Alternative deployment:');
    console.log('wrangler pages deploy production-deploy --project-name=ilearnhow');
    
    return true;
}

// Run deployment
if (require.main === module) {
    deployToCloudflarePages();
}

module.exports = { deployToCloudflarePages }; 