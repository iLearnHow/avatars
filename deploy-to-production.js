/**
 * Deploy to Production Script
 * Uploads all files to ilearnhow.com
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying iLearn How to Production...');

// Core files to deploy
const coreFiles = [
    'index.html',
    'complete-curriculum.js',
    'corrected-variant-generator-v2.js',
    'complete-elevenlabs-integration.js',
    'apple-quality-overlay-system.js',
    'ai-generation-integration.js',
    'face-safe-layout-system.js',
    'test-overlay-fixes.js',
    'test-system-status.js'
];

// Test files to deploy
const testFiles = [
    'working-test.html',
    'deploy-and-test.js'
];

// Documentation files
const docsFiles = [
    'SYSTEM_FIXES_SUMMARY.md',
    'FINAL_DEPLOYMENT_GUIDE.md'
];

// Check if files exist
function checkFiles() {
    console.log('\n📁 Checking files for deployment...');
    
    const allFiles = [...coreFiles, ...testFiles, ...docsFiles];
    let missingFiles = [];
    
    allFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`✅ ${file}`);
        } else {
            console.log(`❌ ${file} - MISSING`);
            missingFiles.push(file);
        }
    });
    
    if (missingFiles.length > 0) {
        console.log(`\n⚠️ Missing files: ${missingFiles.join(', ')}`);
        return false;
    }
    
    console.log('\n✅ All files present for deployment');
    return true;
}

// Generate deployment package
function createDeploymentPackage() {
    console.log('\n📦 Creating deployment package...');
    
    const deploymentDir = 'production-deploy';
    
    // Create deployment directory
    if (!fs.existsSync(deploymentDir)) {
        fs.mkdirSync(deploymentDir);
    }
    
    // Copy core files
    coreFiles.forEach(file => {
        if (fs.existsSync(file)) {
            fs.copyFileSync(file, path.join(deploymentDir, file));
            console.log(`📄 Copied ${file}`);
        }
    });
    
    // Copy test files
    testFiles.forEach(file => {
        if (fs.existsSync(file)) {
            fs.copyFileSync(file, path.join(deploymentDir, file));
            console.log(`🧪 Copied ${file}`);
        }
    });
    
    // Copy documentation
    docsFiles.forEach(file => {
        if (fs.existsSync(file)) {
            fs.copyFileSync(file, path.join(deploymentDir, file));
            console.log(`📚 Copied ${file}`);
        }
    });
    
    // Copy assets directory if it exists
    if (fs.existsSync('lesson-player-deploy')) {
        fs.cpSync('lesson-player-deploy', path.join(deploymentDir, 'lesson-player-deploy'), { recursive: true });
        console.log('📁 Copied lesson-player-deploy assets');
    }
    
    // Copy data directory if it exists
    if (fs.existsSync('data')) {
        fs.cpSync('data', path.join(deploymentDir, 'data'), { recursive: true });
        console.log('📊 Copied curriculum data');
    }
    
    console.log(`\n✅ Deployment package created in ${deploymentDir}/`);
    return deploymentDir;
}

// Generate deployment manifest
function createDeploymentManifest(deploymentDir) {
    console.log('\n📋 Creating deployment manifest...');
    
    const manifest = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        files: {
            core: coreFiles.filter(f => fs.existsSync(f)),
            test: testFiles.filter(f => fs.existsSync(f)),
            docs: docsFiles.filter(f => fs.existsSync(f))
        },
        deployment: {
            target: 'ilearnhow.com',
            status: 'ready'
        }
    };
    
    const manifestPath = path.join(deploymentDir, 'deployment-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Deployment manifest created');
    
    return manifest;
}

// Generate deployment instructions
function createDeploymentInstructions(deploymentDir) {
    console.log('\n📝 Creating deployment instructions...');
    
    const instructions = `# 🚀 iLearn How - Production Deployment Instructions

## 📁 Files to Upload to ilearnhow.com

### Core Files (Required)
${coreFiles.map(f => `- ${f}`).join('\n')}

### Test Files (Optional)
${testFiles.map(f => `- ${f}`).join('\n')}

### Documentation
${docsFiles.map(f => `- ${f}`).join('\n')}

### Assets
- lesson-player-deploy/assets/avatars/kelly/ (Kelly avatar images)
- lesson-player-deploy/assets/avatars/ken/ (Ken avatar images)
- data/ (Monthly curriculum JSON files)

## 🎯 Deployment Steps

1. **Upload all files** to ilearnhow.com root directory
2. **Verify file paths** match the local structure
3. **Test functionality** on live site
4. **Configure ElevenLabs API** keys for voice synthesis
5. **Monitor console** for any errors

## ✅ Success Criteria

- [ ] All icons (📅 😊 🎭 🌍 👶 ➕) work correctly
- [ ] Overlays show/hide properly
- [ ] Calendar displays correct date (August 1st)
- [ ] No JavaScript errors in console
- [ ] Voice synthesis works (after API configuration)

## 🚨 Post-Deployment Checklist

- [ ] Test main interface: https://ilearnhow.com/index.html
- [ ] Test working test: https://ilearnhow.com/working-test.html
- [ ] Verify avatar images load correctly
- [ ] Check curriculum data loads
- [ ] Test overlay positioning
- [ ] Monitor for any console errors

## 📞 Support

If issues arise, check:
1. File paths and permissions
2. JavaScript console for errors
3. Network requests for missing assets
4. API key configuration for voice features

---
Deployment created: ${new Date().toISOString()}
Status: Ready for production
`;

    const instructionsPath = path.join(deploymentDir, 'DEPLOYMENT_INSTRUCTIONS.md');
    fs.writeFileSync(instructionsPath, instructions);
    console.log('✅ Deployment instructions created');
}

// Main deployment function
function deployToProduction() {
    console.log('🚀 Starting production deployment...\n');
    
    // Step 1: Check files
    if (!checkFiles()) {
        console.log('\n❌ Deployment aborted - missing files');
        return false;
    }
    
    // Step 2: Create deployment package
    const deploymentDir = createDeploymentPackage();
    
    // Step 3: Create manifest
    const manifest = createDeploymentManifest(deploymentDir);
    
    // Step 4: Create instructions
    createDeploymentInstructions(deploymentDir);
    
    // Step 5: Generate summary
    console.log('\n🎉 DEPLOYMENT PACKAGE READY!');
    console.log('================================');
    console.log(`📁 Package location: ${deploymentDir}/`);
    console.log(`📄 Core files: ${manifest.files.core.length}`);
    console.log(`🧪 Test files: ${manifest.files.test.length}`);
    console.log(`📚 Docs: ${manifest.files.docs.length}`);
    console.log('\n📋 Next Steps:');
    console.log('1. Upload all files from production-deploy/ to ilearnhow.com');
    console.log('2. Test functionality on live site');
    console.log('3. Configure ElevenLabs API keys');
    console.log('4. Monitor for any issues');
    
    return true;
}

// Run deployment
if (require.main === module) {
    deployToProduction();
}

module.exports = { deployToProduction }; 