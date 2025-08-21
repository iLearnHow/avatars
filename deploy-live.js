/**
 * Live Deployment Script
 * Deploys files to ilearnhow.com to make it live
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying iLearn How to ilearnhow.com...');

// Check if we have the deployment package
function checkDeploymentPackage() {
    console.log('\n📦 Checking deployment package...');
    
    const deploymentDir = 'production-deploy';
    if (!fs.existsSync(deploymentDir)) {
        console.log('❌ Deployment package not found. Run deploy-to-production.js first.');
        return false;
    }
    
    const files = fs.readdirSync(deploymentDir);
    console.log(`✅ Deployment package found with ${files.length} files`);
    
    // Check for critical files
    const criticalFiles = ['index.html', 'complete-curriculum.js', 'corrected-variant-generator-v2.js'];
    const missingFiles = criticalFiles.filter(file => !fs.existsSync(path.join(deploymentDir, file)));
    
    if (missingFiles.length > 0) {
        console.log(`❌ Missing critical files: ${missingFiles.join(', ')}`);
        return false;
    }
    
    console.log('✅ All critical files present');
    return true;
}

// Generate deployment commands
function generateDeploymentCommands() {
    console.log('\n📋 Generating deployment commands...');
    
    const commands = `
# 🚀 iLearn How - Live Deployment Commands

## Option 1: Using FTP/SFTP
\`\`\`bash
# Connect to your hosting provider via FTP/SFTP
# Upload all files from production-deploy/ to the root directory of ilearnhow.com

# Example using sftp:
sftp username@your-hosting-provider.com
cd public_html/
put production-deploy/index.html
put production-deploy/*.js
put production-deploy/working-test.html
put -r production-deploy/lesson-player-deploy/
put -r production-deploy/data/
\`\`\`

## Option 2: Using cPanel File Manager
1. Log into your hosting cPanel
2. Open File Manager
3. Navigate to public_html/ (or www/)
4. Upload all files from production-deploy/ directory

## Option 3: Using Git (if using GitHub Pages or similar)
\`\`\`bash
# If you have a git repository for ilearnhow.com
git add .
git commit -m "Deploy iLearn How production version"
git push origin main
\`\`\`

## Option 4: Using Cloudflare Pages
1. Go to Cloudflare Dashboard
2. Navigate to Pages
3. Create new project or connect existing repository
4. Upload files from production-deploy/ directory

## Files to Upload:
- index.html (main interface)
- complete-curriculum.js (curriculum system)
- corrected-variant-generator-v2.js (variant generation)
- complete-elevenlabs-integration.js (voice system)
- apple-quality-overlay-system.js (overlay management)
- ai-generation-integration.js (AI integration)
- face-safe-layout-system.js (face-safe positioning)
- test-overlay-fixes.js (overlay tests)
- test-system-status.js (system tests)
- working-test.html (test page)
- lesson-player-deploy/ (avatar assets)
- data/ (curriculum data)

## Post-Deployment Verification:
1. Visit https://ilearnhow.com
2. Test https://ilearnhow.com/working-test.html
3. Check browser console for any errors
4. Test all icons and overlays
5. Configure ElevenLabs API keys for voice synthesis
`;

    const commandsPath = 'DEPLOYMENT_COMMANDS.md';
    fs.writeFileSync(commandsPath, commands);
    console.log('✅ Deployment commands saved to DEPLOYMENT_COMMANDS.md');
    
    return commands;
}

// Create a simple upload script
function createUploadScript() {
    console.log('\n📤 Creating upload script...');
    
    const uploadScript = `#!/bin/bash
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
`;

    const scriptPath = 'upload-to-ilearnhow.sh';
    fs.writeFileSync(scriptPath, uploadScript);
    
    // Make it executable
    require('child_process').execSync(`chmod +x ${scriptPath}`);
    
    console.log('✅ Upload script created: upload-to-ilearnhow.sh');
    return scriptPath;
}

// Create a simple HTML test page for immediate deployment
function createSimpleTestPage() {
    console.log('\n🌐 Creating simple test page...');
    
    const simpleTest = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iLearn How - Coming Soon</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        
        .container {
            max-width: 600px;
            padding: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #fff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .status {
            font-size: 1.2rem;
            margin: 20px 0;
            padding: 15px;
            background: rgba(76, 175, 80, 0.2);
            border-radius: 10px;
            border-left: 4px solid #4CAF50;
        }
        
        .features {
            text-align: left;
            margin: 30px 0;
        }
        
        .feature {
            margin: 10px 0;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
        }
        
        .avatar-preview {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 30px 0;
        }
        
        .avatar {
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎓 iLearn How</h1>
        <p>Personalized learning with Kelly and Ken</p>
        
        <div class="status">
            ✅ System Ready - Deploying to Production
        </div>
        
        <div class="features">
            <div class="feature">🎯 <strong>Personalized Learning:</strong> AI-driven curriculum adaptation</div>
            <div class="feature">🎭 <strong>Dual Avatars:</strong> Kelly and Ken for different learning styles</div>
            <div class="feature">🎵 <strong>Voice Synthesis:</strong> ElevenLabs-powered audio narration</div>
            <div class="feature">🌍 <strong>Multi-language:</strong> Support for multiple languages</div>
            <div class="feature">👶 <strong>Age-appropriate:</strong> Content tailored to different age groups</div>
        </div>
        
        <div class="avatar-preview">
            <div class="avatar">👩</div>
            <div class="avatar">👨</div>
        </div>
        
        <p><strong>Deployment Status:</strong> Files ready for upload to ilearnhow.com</p>
        <p><strong>Next:</strong> Complete deployment and configure voice synthesis</p>
    </div>
    
    <script>
        console.log('🚀 iLearn How - Coming Soon');
        console.log('📁 Files ready for deployment to ilearnhow.com');
        console.log('🎯 Target: Complete learning platform with Kelly and Ken');
    </script>
</body>
</html>`;

    const testPath = 'production-deploy/coming-soon.html';
    fs.writeFileSync(testPath, simpleTest);
    console.log('✅ Simple test page created: coming-soon.html');
    
    return testPath;
}

// Main deployment function
function deployLive() {
    console.log('🚀 Starting live deployment to ilearnhow.com...\n');
    
    // Step 1: Check deployment package
    if (!checkDeploymentPackage()) {
        console.log('\n❌ Cannot proceed without deployment package');
        return false;
    }
    
    // Step 2: Generate deployment commands
    const commands = generateDeploymentCommands();
    
    // Step 3: Create upload script
    const uploadScript = createUploadScript();
    
    // Step 4: Create simple test page
    const testPage = createSimpleTestPage();
    
    // Step 5: Generate final summary
    console.log('\n🎉 LIVE DEPLOYMENT READY!');
    console.log('==========================');
    console.log('📁 Files ready in: production-deploy/');
    console.log('📋 Commands saved to: DEPLOYMENT_COMMANDS.md');
    console.log('📤 Upload script: upload-to-ilearnhow.sh');
    console.log('🌐 Test page: production-deploy/coming-soon.html');
    console.log('\n🚀 IMMEDIATE ACTIONS:');
    console.log('1. Upload all files from production-deploy/ to ilearnhow.com');
    console.log('2. Test live site at https://ilearnhow.com');
    console.log('3. Test working interface at https://ilearnhow.com/working-test.html');
    console.log('4. Configure ElevenLabs API keys for voice synthesis');
    console.log('5. Monitor for any issues');
    
    return true;
}

// Run deployment
if (require.main === module) {
    deployLive();
}

module.exports = { deployLive }; 