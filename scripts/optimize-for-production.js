#!/usr/bin/env node

/**
 * Production Optimization Script
 * Reduces frame count to manageable size for deployment
 * Keeps only essential frames for smooth animation
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
    avatarDir: path.join(__dirname, '../production-deploy/assets/avatars'),
    // Keep every Nth frame to reduce size
    frameSkip: {
        kelly: 90,  // ~365 frames from 32867
        ken: 90     // ~347 frames from 31225
    },
    // Target frame counts matching original inventory
    targetFrames: {
        kelly: 365,
        ken: 347
    }
};

function optimizeFrames(avatar) {
    const fullDir = path.join(CONFIG.avatarDir, avatar, '2d', 'full');
    
    console.log(`\n🔧 Optimizing ${avatar} frames...`);
    
    // Get all frame files
    const files = fs.readdirSync(fullDir)
        .filter(f => f.match(/frame_\d{4}\.png$/))
        .sort();
    
    console.log(`   Found ${files.length} frames`);
    
    const skip = CONFIG.frameSkip[avatar];
    const target = CONFIG.targetFrames[avatar];
    const keepFiles = new Set();
    
    // Keep frames at regular intervals
    for (let i = 0; i < target && i * skip < files.length; i++) {
        const frameIndex = i * skip;
        if (frameIndex < files.length) {
            keepFiles.add(files[frameIndex]);
        }
    }
    
    // Always keep first and last frames
    if (files.length > 0) {
        keepFiles.add(files[0]);
        keepFiles.add(files[files.length - 1]);
    }
    
    console.log(`   Keeping ${keepFiles.size} frames`);
    
    // Delete unneeded frames
    let deleted = 0;
    files.forEach(file => {
        if (!keepFiles.has(file)) {
            fs.unlinkSync(path.join(fullDir, file));
            deleted++;
        }
    });
    
    console.log(`   Deleted ${deleted} frames`);
    
    // Rename remaining frames to be sequential
    const remainingFiles = fs.readdirSync(fullDir)
        .filter(f => f.match(/frame_\d{4}\.png$/))
        .sort();
    
    console.log(`   Renaming ${remainingFiles.length} frames to be sequential...`);
    
    // First rename to temp names to avoid conflicts
    remainingFiles.forEach((file, index) => {
        const oldPath = path.join(fullDir, file);
        const tempPath = path.join(fullDir, `temp_${index}.png`);
        fs.renameSync(oldPath, tempPath);
    });
    
    // Then rename to final sequential names
    const tempFiles = fs.readdirSync(fullDir)
        .filter(f => f.startsWith('temp_'))
        .sort((a, b) => {
            const aNum = parseInt(a.match(/temp_(\d+)/)[1]);
            const bNum = parseInt(b.match(/temp_(\d+)/)[1]);
            return aNum - bNum;
        });
    
    tempFiles.forEach((file, index) => {
        const tempPath = path.join(fullDir, file);
        const newName = `${avatar}_frame_${String(index).padStart(4, '0')}.png`;
        const newPath = path.join(fullDir, newName);
        fs.renameSync(tempPath, newPath);
    });
    
    // Verify final count
    const finalFiles = fs.readdirSync(fullDir)
        .filter(f => f.match(/frame_\d{4}\.png$/));
    
    console.log(`   ✅ Final frame count: ${finalFiles.length}`);
    
    // Calculate size savings
    const totalSize = finalFiles.reduce((sum, file) => {
        const stats = fs.statSync(path.join(fullDir, file));
        return sum + stats.size;
    }, 0);
    
    console.log(`   📊 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
}

function updateManifest() {
    console.log('\n📋 Updating manifest for optimized assets...');
    
    const manifestPath = path.join(__dirname, '../production-deploy/asset-manifest.json');
    
    if (fs.existsSync(manifestPath)) {
        // Run the cloud deployment script again
        const { execSync } = require('child_process');
        execSync('node scripts/prepare-cloud-deployment.js', { stdio: 'inherit' });
    }
}

function main() {
    console.log('🚀 Production Optimization');
    console.log('==========================');
    
    // Check if frames exist
    const avatars = ['kelly', 'ken'];
    
    avatars.forEach(avatar => {
        const fullDir = path.join(CONFIG.avatarDir, avatar, '2d', 'full');
        if (!fs.existsSync(fullDir)) {
            console.error(`❌ Frame directory not found: ${fullDir}`);
            console.error('   Run the frame extraction script first.');
            return;
        }
        
        optimizeFrames(avatar);
    });
    
    // Update manifest
    updateManifest();
    
    console.log('\n✅ Production optimization complete!');
    console.log('\n📊 Asset sizes are now optimized for deployment.');
    console.log('   Kelly: ~365 frames');
    console.log('   Ken: ~347 frames');
    console.log('\n🚀 Ready for Railway deployment!');
}

if (require.main === module) {
    main();
}

module.exports = { optimizeFrames };
