#!/usr/bin/env node

/**
 * Avatar Inventory Verification Script
 * Compares local avatar assets with Cloudflare R2 inventory
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    localAssetsPath: path.join(__dirname, '../production-deploy/assets/avatars'),
    avatars: ['kelly', 'ken'],
    assetCategories: {
        'base-states': 'Base state expressions',
        'emotional-expressions': 'Emotional expressions',
        'lesson-sequence': 'Lesson sequence expressions',
        '2d': '2D assets (mouth phonemes, visemes, frames)',
        'tone-specific': 'Tone-specific variations',
        'optimized': 'Optimized versions'
    }
};

// Inventory structure
const expectedInventory = {
    kelly: {
        'base-states': ['kelly_neutral_default.png'],
        'emotional-expressions': [
            'kelly_concerned_thinking.png',
            'kelly_happy_celebrating.png'
        ],
        'lesson-sequence': [
            'kelly_question_curious.png',
            'kelly_teaching_explaining.png'
        ],
        '2d/visemes_flat': [
            'kelly_A.png', 'kelly_DNTL.png', 'kelly_E.png', 'kelly_FV.png',
            'kelly_I.png', 'kelly_KG.png', 'kelly_MBP.png', 'kelly_O.png',
            'kelly_R.png', 'kelly_REST.png', 'kelly_S.png', 'kelly_TH.png', 'kelly_WQ.png'
        ],
        '2d/full': {
            frameCount: 365, // 0-364
            pattern: 'kelly_frame_{num}.png',
            special: ['kelly_O.png']
        }
    },
    ken: {
        'base-states': ['ken_neutral_default.png'],
        'emotional-expressions': [
            'ken_concerned_thinking.png',
            'ken_happy_celebrating.png'
        ],
        'lesson-sequence': [
            'ken_question_curious.png',
            'ken_teaching_explaining.png'
        ],
        '2d/visemes_flat': [
            'ken_A.png', 'ken_DNTL.png', 'ken_E.png', 'ken_FV.png',
            'ken_I.png', 'ken_KG.png', 'ken_MBP.png', 'ken_O.png',
            'ken_R.png', 'ken_REST.png', 'ken_S.png', 'ken_TH.png', 'ken_WQ.png'
        ],
        '2d/full': {
            frameCount: 347, // 0-346
            pattern: 'ken_frame_{num}.png',
            special: ['ken_O.png']
        },
        'tone-specific': {
            directories: ['fun', 'grandmother', 'neutral']
        }
    }
};

// Helper functions
function checkFileExists(filePath) {
    try {
        return fs.existsSync(filePath);
    } catch {
        return false;
    }
}

function getDirectoryFiles(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) return [];
        return fs.readdirSync(dirPath).filter(file => file.endsWith('.png'));
    } catch {
        return [];
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Verification functions
function verifyFrameSequence(avatarPath, frameData) {
    const results = {
        found: 0,
        missing: [],
        totalSize: 0
    };
    
    const fullPath = path.join(avatarPath, '2d/full');
    
    // Check numbered frames
    for (let i = 0; i < frameData.frameCount; i++) {
        const frameNum = String(i).padStart(4, '0');
        const fileName = frameData.pattern.replace('{num}', frameNum);
        const filePath = path.join(fullPath, fileName);
        
        if (checkFileExists(filePath)) {
            results.found++;
            const stats = fs.statSync(filePath);
            results.totalSize += stats.size;
        } else {
            results.missing.push(fileName);
        }
    }
    
    // Check special frames
    if (frameData.special) {
        frameData.special.forEach(specialFile => {
            const filePath = path.join(fullPath, specialFile);
            if (checkFileExists(filePath)) {
                results.found++;
                const stats = fs.statSync(filePath);
                results.totalSize += stats.size;
            } else {
                results.missing.push(specialFile);
            }
        });
    }
    
    return results;
}

function verifyAvatarAssets(avatarName) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🎭 Verifying ${avatarName.toUpperCase()} Avatar Assets`);
    console.log(`${'='.repeat(50)}\n`);
    
    const avatarPath = path.join(CONFIG.localAssetsPath, avatarName);
    const inventory = expectedInventory[avatarName];
    const report = {
        avatar: avatarName,
        categories: {},
        totalFiles: 0,
        totalSize: 0,
        missingFiles: []
    };
    
    // Check each category
    for (const [category, expectedFiles] of Object.entries(inventory)) {
        console.log(`\n📁 ${category}:`);
        
        if (category === '2d/full') {
            // Handle frame sequences
            const frameResults = verifyFrameSequence(avatarPath, expectedFiles);
            console.log(`  ✅ Found: ${frameResults.found} frames`);
            if (frameResults.missing.length > 0) {
                console.log(`  ❌ Missing: ${frameResults.missing.length} frames`);
                if (frameResults.missing.length <= 10) {
                    frameResults.missing.forEach(f => console.log(`     - ${f}`));
                } else {
                    console.log(`     - First 10: ${frameResults.missing.slice(0, 10).join(', ')}...`);
                }
            }
            console.log(`  📊 Total size: ${formatFileSize(frameResults.totalSize)}`);
            
            report.categories[category] = frameResults;
            report.totalFiles += frameResults.found;
            report.totalSize += frameResults.totalSize;
            report.missingFiles.push(...frameResults.missing.map(f => `${category}/${f}`));
            
        } else if (category === 'tone-specific' && expectedFiles.directories) {
            // Handle tone-specific directories
            const toneResults = { found: 0, missing: [], directories: {} };
            
            expectedFiles.directories.forEach(dir => {
                const dirPath = path.join(avatarPath, category, dir);
                const files = getDirectoryFiles(dirPath);
                toneResults.directories[dir] = files.length;
                toneResults.found += files.length;
                
                console.log(`  📂 ${dir}: ${files.length} files`);
            });
            
            report.categories[category] = toneResults;
            report.totalFiles += toneResults.found;
            
        } else if (Array.isArray(expectedFiles)) {
            // Handle regular file lists
            const categoryPath = path.join(avatarPath, category);
            const results = { found: 0, missing: [], totalSize: 0 };
            
            expectedFiles.forEach(file => {
                const filePath = path.join(categoryPath, file);
                if (checkFileExists(filePath)) {
                    results.found++;
                    const stats = fs.statSync(filePath);
                    results.totalSize += stats.size;
                } else {
                    results.missing.push(file);
                }
            });
            
            console.log(`  ✅ Found: ${results.found}/${expectedFiles.length} files`);
            if (results.missing.length > 0) {
                console.log(`  ❌ Missing: ${results.missing.join(', ')}`);
            }
            console.log(`  📊 Size: ${formatFileSize(results.totalSize)}`);
            
            report.categories[category] = results;
            report.totalFiles += results.found;
            report.totalSize += results.totalSize;
            report.missingFiles.push(...results.missing.map(f => `${category}/${f}`));
        }
    }
    
    // Check for mouth phonemes
    const mouthPath = path.join(avatarPath, '2d');
    const mouthFiles = getDirectoryFiles(mouthPath).filter(f => f.startsWith('mouth_'));
    console.log(`\n📁 2d/mouth phonemes:`);
    console.log(`  ✅ Found: ${mouthFiles.length} mouth files`);
    report.totalFiles += mouthFiles.length;
    
    return report;
}

function generateInventoryReport() {
    console.log('\n🔍 Avatar Inventory Verification Report');
    console.log('Generated:', new Date().toISOString());
    
    const reports = [];
    
    // Verify each avatar
    CONFIG.avatars.forEach(avatar => {
        const report = verifyAvatarAssets(avatar);
        reports.push(report);
    });
    
    // Summary
    console.log(`\n${'='.repeat(50)}`);
    console.log('📊 SUMMARY');
    console.log(`${'='.repeat(50)}`);
    
    let totalFiles = 0;
    let totalSize = 0;
    let totalMissing = 0;
    
    reports.forEach(report => {
        totalFiles += report.totalFiles;
        totalSize += report.totalSize;
        totalMissing += report.missingFiles.length;
        
        console.log(`\n${report.avatar.toUpperCase()}:`);
        console.log(`  Total files: ${report.totalFiles}`);
        console.log(`  Total size: ${formatFileSize(report.totalSize)}`);
        console.log(`  Missing files: ${report.missingFiles.length}`);
    });
    
    console.log(`\nGRAND TOTAL:`);
    console.log(`  Files: ${totalFiles}`);
    console.log(`  Size: ${formatFileSize(totalSize)}`);
    console.log(`  Missing: ${totalMissing}`);
    
    // Save detailed report
    const reportPath = path.join(__dirname, '../inventory-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(reports, null, 2));
    console.log(`\n💾 Detailed report saved to: ${reportPath}`);
    
    // Generate R2 sync commands
    if (totalMissing > 0) {
        console.log('\n📋 R2 Upload Commands:');
        console.log('# Use these commands to sync missing files to R2:');
        reports.forEach(report => {
            if (report.missingFiles.length > 0) {
                console.log(`\n# Missing ${report.avatar} files:`);
                report.missingFiles.forEach(file => {
                    const localPath = path.join(CONFIG.localAssetsPath, report.avatar, file);
                    const r2Path = `avatars/${report.avatar}/${file}`;
                    console.log(`# aws s3 cp "${localPath}" "s3://your-r2-bucket/${r2Path}"`);
                });
            }
        });
    }
}

// Main execution
if (require.main === module) {
    console.log('🚀 Starting Avatar Inventory Verification...\n');
    
    // Check if assets directory exists
    if (!fs.existsSync(CONFIG.localAssetsPath)) {
        console.error(`❌ Assets directory not found: ${CONFIG.localAssetsPath}`);
        process.exit(1);
    }
    
    generateInventoryReport();
    
    console.log('\n✅ Verification complete!');
}

module.exports = { verifyAvatarAssets, generateInventoryReport };
