#!/usr/bin/env node

/**
 * Video Frame Extraction Script
 * Extracts frames from Kelly and Ken videos for lip-sync animation
 * Requires: ffmpeg installed on system
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const execPromise = util.promisify(exec);

const CONFIG = {
    videos: {
        kelly: [
            { file: 'kelly2.mp4', name: 'kelly_neutral_1' },
            { file: 'kelly2 (1).mp4', name: 'kelly_neutral_2' }
        ],
        ken: [
            { file: 'ken2.mp4', name: 'ken_neutral_1' },
            { file: 'ken2 (1).mp4', name: 'ken_neutral_2' }
        ]
    },
    inputDir: path.join(__dirname, '../production-deploy'),
    outputDir: path.join(__dirname, '../production-deploy/assets/avatars'),
    frameRate: 30, // Extract at 30fps for smooth animation
    quality: 2, // PNG quality (1-5, lower is better)
    resolution: '1920x1080' // Maintain HD resolution
};

async function checkFFmpeg() {
    try {
        await execPromise('ffmpeg -version');
        console.log('✅ FFmpeg is installed');
        return true;
    } catch (error) {
        console.error('❌ FFmpeg is not installed. Please install it first:');
        console.error('   Mac: brew install ffmpeg');
        console.error('   Ubuntu: sudo apt-get install ffmpeg');
        return false;
    }
}

async function getVideoInfo(videoPath) {
    try {
        const cmd = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,r_frame_rate -of json "${videoPath}"`;
        const { stdout } = await execPromise(cmd);
        const info = JSON.parse(stdout);
        const stream = info.streams[0];
        
        // Parse frame rate
        const [num, den] = stream.r_frame_rate.split('/');
        const fps = parseInt(num) / parseInt(den);
        
        return {
            width: stream.width,
            height: stream.height,
            duration: parseFloat(stream.duration),
            fps: fps
        };
    } catch (error) {
        console.error(`Error getting video info: ${error.message}`);
        return null;
    }
}

async function extractFrames(avatar, videoConfig) {
    const inputPath = path.join(CONFIG.inputDir, videoConfig.file);
    const outputPath = path.join(CONFIG.outputDir, avatar, '2d', 'full');
    
    // Check if video exists
    if (!fs.existsSync(inputPath)) {
        console.error(`❌ Video not found: ${inputPath}`);
        return false;
    }
    
    // Create output directory
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }
    
    console.log(`\n📹 Processing ${videoConfig.file}...`);
    
    // Get video info
    const videoInfo = await getVideoInfo(inputPath);
    if (!videoInfo) return false;
    
    console.log(`   Resolution: ${videoInfo.width}x${videoInfo.height}`);
    console.log(`   Duration: ${videoInfo.duration.toFixed(2)}s`);
    console.log(`   FPS: ${videoInfo.fps}`);
    
    // Calculate total frames
    const totalFrames = Math.floor(videoInfo.duration * CONFIG.frameRate);
    console.log(`   Extracting ${totalFrames} frames at ${CONFIG.frameRate}fps...`);
    
    // Extract frames using ffmpeg
    const framePattern = path.join(outputPath, `${avatar}_frame_%04d.png`);
    const cmd = `ffmpeg -i "${inputPath}" -vf "fps=${CONFIG.frameRate},scale=${CONFIG.resolution}" -q:v ${CONFIG.quality} "${framePattern}" -y`;
    
    try {
        await execPromise(cmd);
        console.log(`   ✅ Extracted ${totalFrames} frames`);
        
        // Verify frames were created
        const files = fs.readdirSync(outputPath).filter(f => f.startsWith(`${avatar}_frame_`));
        console.log(`   ✅ Verified ${files.length} frame files`);
        
        return true;
    } catch (error) {
        console.error(`   ❌ Error extracting frames: ${error.message}`);
        return false;
    }
}

async function extractKeyFrames(avatar, videoConfig) {
    const inputPath = path.join(CONFIG.inputDir, videoConfig.file);
    const outputBase = path.join(CONFIG.outputDir, avatar);
    
    console.log(`\n🎯 Extracting key frames from ${videoConfig.file}...`);
    
    // Key frame positions (in seconds)
    const keyFrames = {
        'neutral_default': 0,      // First frame
        'teaching_explaining': 2,   // 2 seconds in
        'question_curious': 4,      // 4 seconds in
        'happy_celebrating': 6,     // 6 seconds in
        'concerned_thinking': 8     // 8 seconds in
    };
    
    for (const [expression, time] of Object.entries(keyFrames)) {
        let outputDir, outputFile;
        
        if (expression === 'neutral_default') {
            outputFile = path.join(outputBase, `${avatar}_neutral_default.png`);
        } else if (expression.includes('teaching') || expression.includes('question')) {
            outputDir = path.join(outputBase, 'lesson-sequence');
            outputFile = path.join(outputDir, `${avatar}_${expression}.png`);
        } else {
            outputDir = path.join(outputBase, 'emotional-expressions');
            outputFile = path.join(outputDir, `${avatar}_${expression}.png`);
        }
        
        // Create directory if needed
        if (outputDir && !fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Extract single frame at specific time
        const cmd = `ffmpeg -ss ${time} -i "${inputPath}" -vf "scale=${CONFIG.resolution}" -frames:v 1 -q:v ${CONFIG.quality} "${outputFile}" -y`;
        
        try {
            await execPromise(cmd);
            console.log(`   ✅ ${expression}: ${outputFile}`);
        } catch (error) {
            console.log(`   ⚠️  ${expression}: Could not extract (video might be shorter)`);
        }
    }
}

async function generateVisemeFrames(avatar) {
    console.log(`\n🎤 Generating viseme reference frames for ${avatar}...`);
    
    const visemes = ['A', 'E', 'I', 'O', 'U', 'MBP', 'FV', 'TH', 'DNTL', 'KG', 'S', 'R', 'WQ', 'REST'];
    const outputDir = path.join(CONFIG.outputDir, avatar, '2d', 'visemes_flat');
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // For now, copy from existing frames as placeholders
    // In production, these would be specifically captured mouth positions
    const sourceFrames = fs.readdirSync(path.join(CONFIG.outputDir, avatar, '2d', 'full'))
        .filter(f => f.startsWith(`${avatar}_frame_`))
        .sort();
    
    if (sourceFrames.length === 0) {
        console.log('   ⚠️  No source frames found, skipping viseme generation');
        return;
    }
    
    for (let i = 0; i < visemes.length && i < sourceFrames.length; i++) {
        const viseme = visemes[i];
        const sourceFrame = sourceFrames[i * Math.floor(sourceFrames.length / visemes.length)];
        const sourcePath = path.join(CONFIG.outputDir, avatar, '2d', 'full', sourceFrame);
        const destPath = path.join(outputDir, `${avatar}_${viseme}.png`);
        
        try {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`   ✅ Created ${avatar}_${viseme}.png`);
        } catch (error) {
            console.log(`   ❌ Failed to create ${avatar}_${viseme}.png`);
        }
    }
}

async function main() {
    console.log('🎬 Video Frame Extraction Tool');
    console.log('==============================\n');
    
    // Check FFmpeg
    if (!await checkFFmpeg()) {
        process.exit(1);
    }
    
    // Process each avatar
    for (const [avatar, videos] of Object.entries(CONFIG.videos)) {
        console.log(`\n👤 Processing ${avatar.toUpperCase()} videos...`);
        
        for (const videoConfig of videos) {
            // Extract all frames
            await extractFrames(avatar, videoConfig);
            
            // Extract key expression frames
            await extractKeyFrames(avatar, videoConfig);
        }
        
        // Generate viseme frames
        await generateVisemeFrames(avatar);
    }
    
    console.log('\n✅ Frame extraction complete!');
    console.log('\n📊 Next steps:');
    console.log('1. Review extracted frames in assets/avatars/[avatar]/2d/full/');
    console.log('2. Verify key expression frames match desired emotions');
    console.log('3. Fine-tune viseme frames for accurate lip-sync');
    console.log('4. Run inventory verification: node scripts/verify-avatar-inventory.js');
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { extractFrames, extractKeyFrames };
