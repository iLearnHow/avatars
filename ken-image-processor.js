#!/usr/bin/env node

/**
 * Ken Image Processor - Production Image Optimization
 * Processes Ken avatar images for web deployment with responsive versions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class KenImageProcessor {
    constructor() {
        this.sourceDir = 'lesson-player-deploy/assets/avatars';
        this.outputDir = 'lesson-player-deploy/assets/avatars/ken';
        this.responsiveSizes = {
            desktop: { width: 1920, height: 1080 },
            tablet: { width: 1024, height: 768 },
            mobile: { width: 375, height: 667 },
            thumbnail: { width: 320, height: 180 }
        };
        this.qualitySettings = {
            desktop: { webp: 85, png: 90 },
            tablet: { webp: 80, png: 85 },
            mobile: { webp: 75, png: 80 },
            thumbnail: { webp: 70, png: 75 }
        };
    }

    /**
     * Main processing pipeline
     */
    async processImages() {
        console.log('🎯 Starting Ken image processing...');
        
        try {
            // Step 1: Analyze current assets
            const assets = this.analyzeAssets();
            console.log(`📊 Found ${assets.length} image files`);
            
            // Step 2: Create output directory structure
            this.createDirectoryStructure();
            
            // Step 3: Process each image
            for (const asset of assets) {
                await this.processImage(asset);
            }
            
            // Step 4: Generate asset manifest
            this.generateAssetManifest();
            
            console.log('✅ Ken image processing complete!');
            
        } catch (error) {
            console.error('❌ Error processing images:', error);
            process.exit(1);
        }
    }

    /**
     * Analyze current assets and identify duplicates
     */
    analyzeAssets() {
        const assets = [];
        const sourcePath = path.resolve(this.sourceDir);
        
        // Scan for image files
        const imageExtensions = ['.png', '.jpg', '.jpeg'];
        
        function scanDirectory(dir) {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    scanDirectory(fullPath);
                } else if (imageExtensions.includes(path.extname(item).toLowerCase())) {
                    assets.push({
                        path: fullPath,
                        name: item,
                        size: stat.size,
                        relativePath: path.relative(sourcePath, fullPath)
                    });
                }
            }
        }
        
        scanDirectory(sourcePath);
        
        // Remove duplicates (keep the first occurrence)
        const uniqueAssets = [];
        const seenNames = new Set();
        
        for (const asset of assets) {
            const baseName = path.basename(asset.name, path.extname(asset.name));
            if (!seenNames.has(baseName)) {
                seenNames.add(baseName);
                uniqueAssets.push(asset);
            } else {
                console.log(`🔄 Removing duplicate: ${asset.name}`);
            }
        }
        
        return uniqueAssets;
    }

    /**
     * Create directory structure for processed images
     */
    createDirectoryStructure() {
        const directories = [
            this.outputDir,
            path.join(this.outputDir, 'base-states'),
            path.join(this.outputDir, 'emotional-expressions'),
            path.join(this.outputDir, 'lesson-sequence'),
            path.join(this.outputDir, 'tone-specific'),
            path.join(this.outputDir, 'tone-specific', 'grandmother'),
            path.join(this.outputDir, 'tone-specific', 'fun'),
            path.join(this.outputDir, 'tone-specific', 'neutral'),
            path.join(this.outputDir, 'responsive'),
            path.join(this.outputDir, 'responsive', 'desktop'),
            path.join(this.outputDir, 'responsive', 'tablet'),
            path.join(this.outputDir, 'responsive', 'mobile'),
            path.join(this.outputDir, 'responsive', 'thumbnail')
        ];
        
        for (const dir of directories) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`📁 Created directory: ${dir}`);
            }
        }
    }

    /**
     * Process individual image with responsive versions
     */
    async processImage(asset) {
        const semanticName = this.generateSemanticName(asset.name);
        console.log(`🔄 Processing: ${asset.name} → ${semanticName}`);
        
        // Create responsive versions
        for (const [size, dimensions] of Object.entries(this.responsiveSizes)) {
            await this.createResponsiveVersion(asset.path, semanticName, size, dimensions);
        }
        
        // Create fallback PNG versions
        for (const [size, dimensions] of Object.entries(this.responsiveSizes)) {
            await this.createPNGFallback(semanticName, size, dimensions);
        }
    }

    /**
     * Generate semantic filename from original
     */
    generateSemanticName(originalName) {
        // Remove file extension
        let name = path.basename(originalName, path.extname(originalName));
        
        // Convert spaces to underscores
        name = name.replace(/\s+/g, '_');
        
        // Remove special characters
        name = name.replace(/[^a-zA-Z0-9_-]/g, '');
        
        // Add ken_ prefix if not present
        if (!name.startsWith('ken_')) {
            name = `ken_${name}`;
        }
        
        // Map common expressions to semantic names
        const expressionMap = {
            'back_to_normal': 'neutral_default',
            'default_state2': 'neutral_default',
            'closer_up_default_mode': 'neutral_default',
            'laugh1': 'happy_laughing',
            'laugh2': 'happy_laughing',
            'laugh3': 'happy_laughing',
            'correct_celebration_mode': 'happy_celebrating',
            'critical_alert_terror': 'concerned_thinking',
            'error_oh_no': 'concerned_thinking',
            'sad_face_try_again_mode': 'sad_encouraging',
            'question_mode_first': 'question_curious',
            'hello_mode_perfect_elbow_and_palm_position_for_ASL': 'opening_welcoming',
            'joke_mode': 'fun_playful',
            'blinking_mode': 'neutral_listening',
            'talking_jaw_dropped_open': 'teaching_explaining',
            'talking_with_slightly_open_lips_with_lips_pushed_forward': 'teaching_explaining',
            'talking_open_mouth_with_lips_in_round_open_shape': 'teaching_explaining'
        };
        
        // Apply expression mapping
        for (const [pattern, replacement] of Object.entries(expressionMap)) {
            if (name.includes(pattern)) {
                name = name.replace(pattern, replacement);
                break;
            }
        }
        
        return name;
    }

    /**
     * Create responsive WebP version
     */
    async createResponsiveVersion(inputPath, semanticName, size, dimensions) {
        const outputPath = path.join(
            this.outputDir, 
            'responsive', 
            size, 
            `${semanticName}.webp`
        );
        
        const quality = this.qualitySettings[size].webp;
        
        try {
            // Use ImageMagick for resizing and conversion
            const command = `convert "${inputPath}" -resize ${dimensions.width}x${dimensions.height}^ -gravity center -extent ${dimensions.width}x${dimensions.height} -quality ${quality} "${outputPath}"`;
            
            execSync(command, { stdio: 'pipe' });
            
            // Check file size
            const stats = fs.statSync(outputPath);
            const sizeKB = Math.round(stats.size / 1024);
            
            console.log(`  ✅ ${size}: ${sizeKB}KB`);
            
            // Warn if file is too large
            const maxSize = size === 'desktop' ? 200 : 
                           size === 'tablet' ? 150 : 
                           size === 'mobile' ? 100 : 50;
            
            if (sizeKB > maxSize) {
                console.log(`  ⚠️  ${size} file is ${sizeKB}KB (target: <${maxSize}KB)`);
            }
            
        } catch (error) {
            console.error(`  ❌ Error creating ${size} version:`, error.message);
        }
    }

    /**
     * Create PNG fallback version
     */
    async createPNGFallback(semanticName, size, dimensions) {
        const webpPath = path.join(
            this.outputDir, 
            'responsive', 
            size, 
            `${semanticName}.webp`
        );
        
        const pngPath = path.join(
            this.outputDir, 
            'responsive', 
            size, 
            `${semanticName}.png`
        );
        
        if (fs.existsSync(webpPath)) {
            try {
                const quality = this.qualitySettings[size].png;
                const command = `convert "${webpPath}" -quality ${quality} "${pngPath}"`;
                
                execSync(command, { stdio: 'pipe' });
                console.log(`  ✅ ${size} PNG fallback created`);
                
            } catch (error) {
                console.error(`  ❌ Error creating ${size} PNG fallback:`, error.message);
            }
        }
    }

    /**
     * Generate asset manifest for JavaScript
     */
    generateAssetManifest() {
        const manifest = {
            baseStates: [],
            emotionalExpressions: [],
            lessonSequence: [],
            toneSpecific: {
                grandmother: [],
                fun: [],
                neutral: []
            },
            responsive: {
                desktop: [],
                tablet: [],
                mobile: [],
                thumbnail: []
            }
        };
        
        // Scan processed images and categorize
        const responsiveDir = path.join(this.outputDir, 'responsive');
        
        for (const size of Object.keys(this.responsiveSizes)) {
            const sizeDir = path.join(responsiveDir, size);
            if (fs.existsSync(sizeDir)) {
                const files = fs.readdirSync(sizeDir);
                manifest.responsive[size] = files.filter(f => f.endsWith('.webp'));
            }
        }
        
        // Save manifest
        const manifestPath = path.join(this.outputDir, 'asset-manifest.json');
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        
        console.log(`📋 Asset manifest saved: ${manifestPath}`);
    }

    /**
     * Generate HTML picture element example
     */
    generateHTMLExample() {
        const example = `
<!-- Responsive Ken image loading example -->
<picture class="ken-wallpaper">
    <source 
        srcset="/lesson-player-deploy/assets/avatars/ken/responsive/desktop/ken_neutral_default.webp 1x,
                /lesson-player-deploy/assets/avatars/ken/responsive/desktop/ken_neutral_default@2x.webp 2x"
        media="(min-width: 1024px)"
        type="image/webp">
    <source 
        srcset="/lesson-player-deploy/assets/avatars/ken/responsive/tablet/ken_neutral_default.webp 1x,
                /lesson-player-deploy/assets/avatars/ken/responsive/tablet/ken_neutral_default@2x.webp 2x"
        media="(min-width: 768px)"
        type="image/webp">
    <source 
        srcset="/lesson-player-deploy/assets/avatars/ken/responsive/mobile/ken_neutral_default.webp 1x,
                /lesson-player-deploy/assets/avatars/ken/responsive/mobile/ken_neutral_default@2x.webp 2x"
        media="(max-width: 767px)"
        type="image/webp">
    <img 
        src="/lesson-player-deploy/assets/avatars/ken/responsive/desktop/ken_neutral_default.png"
        alt="Ken neutral expression"
        loading="lazy"
        decoding="async"
        class="ken-wallpaper-image">
</picture>
        `;
        
        const examplePath = path.join(this.outputDir, 'html-example.html');
        fs.writeFileSync(examplePath, example.trim());
        
        console.log(`📄 HTML example saved: ${examplePath}`);
    }
}

// Run the processor
if (require.main === module) {
    const processor = new KenImageProcessor();
    processor.processImages().then(() => {
        processor.generateHTMLExample();
        console.log('\n🎉 Ken image processing complete!');
        console.log('📁 Check the output directory for processed images');
        console.log('📋 Asset manifest and HTML examples generated');
    });
}

module.exports = KenImageProcessor; 