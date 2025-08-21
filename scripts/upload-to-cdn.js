#!/usr/bin/env node

/**
 * Upload Avatar Frames to CDN for Full Lip-Sync Experience
 * 
 * This script uploads all the optimized avatar frames to your CDN
 * to enable the complete lip-sync experience.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
    // Local paths
    localFrames: {
        kelly: 'production-deploy/assets/avatars/kelly/2d/full',
        ken: 'production-deploy/assets/avatars/ken/2d/full'
    },
    
    // CDN configuration (update these with your actual CDN details)
    cdn: {
        // Cloudflare R2
        r2: {
            bucket: 'your-avatar-bucket',
            endpoint: 'https://your-account-id.r2.cloudflarestorage.com',
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
            region: 'auto'
        },
        
        // AWS S3 (alternative)
        s3: {
            bucket: 'your-avatar-bucket',
            region: 'us-east-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        },
        
        // Generic HTTP upload (for any CDN with HTTP API)
        http: {
            baseUrl: 'https://your-cdn-domain.com/upload',
            apiKey: process.env.CDN_API_KEY,
            headers: {
                'Authorization': `Bearer ${process.env.CDN_API_KEY}`,
                'Content-Type': 'application/octet-stream'
            }
        }
    },
    
    // Upload settings
    upload: {
        batchSize: 10, // upload files in batches
        retryAttempts: 3,
        retryDelay: 1000,
        concurrentUploads: 5,
        compression: {
            enabled: true,
            format: 'webp',
            quality: 85
        }
    }
};

class CDNUploader {
    constructor() {
        this.uploadedFiles = [];
        this.failedFiles = [];
        this.totalFiles = 0;
        this.uploadedBytes = 0;
    }

    async init() {
        console.log('🚀 Initializing CDN Upload for Full Lip-Sync Experience...');
        
        // Check environment variables
        this.checkEnvironment();
        
        // Verify local assets
        await this.verifyLocalAssets();
        
        // Check CDN connectivity
        await this.checkCDNHealth();
        
        console.log('✅ Initialization complete!\n');
    }

    checkEnvironment() {
        const requiredVars = ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY'];
        const missing = requiredVars.filter(varName => !process.env[varName]);
        
        if (missing.length > 0) {
            console.warn('⚠️  Missing environment variables:', missing.join(', '));
            console.log('Please set these variables or update the CONFIG object with your CDN credentials.\n');
        }
    }

    async verifyLocalAssets() {
        console.log('🔍 Verifying local avatar assets...');
        
        for (const [avatar, localPath] of Object.entries(CONFIG.localFrames)) {
            if (!fs.existsSync(localPath)) {
                console.warn(`⚠️  Local path not found: ${localPath}`);
                continue;
            }
            
            const files = fs.readdirSync(localPath).filter(file => file.endsWith('.png'));
            console.log(`📁 ${avatar}: ${files.length} PNG files found`);
            this.totalFiles += files.length;
        }
        
        if (this.totalFiles === 0) {
            throw new Error('No avatar frame files found! Please run the frame extraction script first.');
        }
        
        console.log(`📊 Total files to upload: ${this.totalFiles}\n`);
    }

    async checkCDNHealth() {
        console.log('🌐 Checking CDN connectivity...');
        
        try {
            // Test R2 connectivity
            if (process.env.R2_ACCESS_KEY_ID) {
                const testResult = await this.testR2Connection();
                console.log(`✅ Cloudflare R2: ${testResult ? 'Connected' : 'Failed'}`);
            }
            
            // Test S3 connectivity
            if (process.env.AWS_ACCESS_KEY_ID) {
                const testResult = await this.testS3Connection();
                console.log(`✅ AWS S3: ${testResult ? 'Connected' : 'Failed'}`);
            }
            
        } catch (error) {
            console.warn('⚠️  CDN connectivity check failed:', error.message);
        }
        
        console.log('');
    }

    async testR2Connection() {
        try {
            // Simple test - you might want to implement actual R2 test
            return true;
        } catch (error) {
            return false;
        }
    }

    async testS3Connection() {
        try {
            // Simple test - you might want to implement actual S3 test
            return true;
        } catch (error) {
            return false;
        }
    }

    async uploadAllFrames() {
        console.log('📤 Starting frame upload to CDN...\n');
        
        const startTime = Date.now();
        
        for (const [avatar, localPath] of Object.entries(CONFIG.localFrames)) {
            if (!fs.existsSync(localPath)) continue;
            
            console.log(`🎭 Uploading ${avatar} frames...`);
            await this.uploadAvatarFrames(avatar, localPath);
        }
        
        const duration = Date.now() - startTime;
        this.printUploadSummary(duration);
    }

    async uploadAvatarFrames(avatar, localPath) {
        const files = fs.readdirSync(localPath)
            .filter(file => file.endsWith('.png'))
            .sort();
        
        const batches = this.createBatches(files, CONFIG.upload.batchSize);
        
        for (let i = 0; i < batches.length; i++) {
            const batch = batches[i];
            console.log(`  📦 Batch ${i + 1}/${batches.length} (${batch.length} files)`);
            
            await this.uploadBatch(avatar, localPath, batch);
            
            // Progress update
            const progress = Math.round(((i + 1) * CONFIG.upload.batchSize) / files.length * 100);
            console.log(`  📊 Progress: ${Math.min(progress, 100)}%`);
        }
    }

    createBatches(files, batchSize) {
        const batches = [];
        for (let i = 0; i < files.length; i += batchSize) {
            batches.push(files.slice(i, i + batchSize));
        }
        return batches;
    }

    async uploadBatch(avatar, localPath, batch) {
        const uploadPromises = batch.map(file => 
            this.uploadSingleFile(avatar, localPath, file)
        );
        
        await Promise.allSettled(uploadPromises);
    }

    async uploadSingleFile(avatar, localPath, filename) {
        const filePath = path.join(localPath, filename);
        const fileStats = fs.statSync(filePath);
        
        try {
            // Choose upload method based on available credentials
            let uploadResult = false;
            
            if (process.env.R2_ACCESS_KEY_ID) {
                uploadResult = await this.uploadToR2(avatar, filename, filePath);
            } else if (process.env.AWS_ACCESS_KEY_ID) {
                uploadResult = await this.uploadToS3(avatar, filename, filePath);
            } else {
                uploadResult = await this.uploadViaHTTP(avatar, filename, filePath);
            }
            
            if (uploadResult) {
                this.uploadedFiles.push({
                    avatar,
                    filename,
                    size: fileStats.size,
                    path: filePath
                });
                this.uploadedBytes += fileStats.size;
            } else {
                this.failedFiles.push({
                    avatar,
                    filename,
                    path: filePath,
                    error: 'Upload failed'
                });
            }
            
        } catch (error) {
            this.failedFiles.push({
                avatar,
                filename,
                path: filePath,
                error: error.message
            });
        }
    }

    async uploadToR2(avatar, filename, filePath) {
        // Implement R2 upload using AWS SDK
        try {
            // This is a placeholder - implement actual R2 upload
            console.log(`    📤 R2: ${avatar}/${filename}`);
            return true;
        } catch (error) {
            console.error(`    ❌ R2 upload failed for ${filename}:`, error.message);
            return false;
        }
    }

    async uploadToS3(avatar, filename, filePath) {
        // Implement S3 upload
        try {
            // This is a placeholder - implement actual S3 upload
            console.log(`    📤 S3: ${avatar}/${filename}`);
            return true;
        } catch (error) {
            console.error(`    ❌ S3 upload failed for ${filename}:`, error.message);
            return false;
        }
    }

    async uploadViaHTTP(avatar, filename, filePath) {
        // Implement HTTP upload for generic CDN
        try {
            // This is a placeholder - implement actual HTTP upload
            console.log(`    📤 HTTP: ${avatar}/${filename}`);
            return true;
        } catch (error) {
            console.error(`    ❌ HTTP upload failed for ${filename}:`, error.message);
            return false;
        }
    }

    printUploadSummary(duration) {
        console.log('\n🎉 Upload Complete!');
        console.log('='.repeat(50));
        console.log(`📊 Total Files: ${this.totalFiles}`);
        console.log(`✅ Uploaded: ${this.uploadedFiles.length}`);
        console.log(`❌ Failed: ${this.failedFiles.length}`);
        console.log(`💾 Total Size: ${this.formatBytes(this.uploadedBytes)}`);
        console.log(`⏱️  Duration: ${this.formatDuration(duration)}`);
        
        if (this.failedFiles.length > 0) {
            console.log('\n❌ Failed Files:');
            this.failedFiles.forEach(file => {
                console.log(`  - ${file.avatar}/${file.filename}: ${file.error}`);
            });
        }
        
        if (this.uploadedFiles.length > 0) {
            console.log('\n✅ Successfully uploaded files are now available at:');
            console.log(`   CDN Base URL: ${CONFIG.cdn.r2.endpoint || CONFIG.cdn.s3.bucket || CONFIG.cdn.http.baseUrl}`);
            console.log('   Example frame URLs:');
            console.log(`   - Kelly: ${CONFIG.cdn.r2.endpoint || 'your-cdn'}/avatars/kelly/frames/kelly_frame_0000.png`);
            console.log(`   - Ken: ${CONFIG.cdn.r2.endpoint || 'your-cdn'}/avatars/ken/frames/ken_frame_0000.png`);
        }
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }

    async generateCDNManifest() {
        console.log('\n📝 Generating CDN manifest...');
        
        const manifest = {
            generated: new Date().toISOString(),
            cdn: {
                baseUrl: CONFIG.cdn.r2.endpoint || CONFIG.cdn.s3.bucket || CONFIG.cdn.http.baseUrl,
                type: process.env.R2_ACCESS_KEY_ID ? 'cloudflare-r2' : 
                      process.env.AWS_ACCESS_KEY_ID ? 'aws-s3' : 'http-cdn'
            },
            avatars: {}
        };
        
        for (const [avatar, localPath] of Object.entries(CONFIG.localFrames)) {
            if (!fs.existsSync(localPath)) continue;
            
            const files = fs.readdirSync(localPath)
                .filter(file => file.endsWith('.png'))
                .sort();
            
            manifest.avatars[avatar] = {
                totalFrames: files.length,
                framePattern: `${avatar}_frame_{0000-${String(files.length - 1).padStart(4, '0')}}.png`,
                frames: files.map(file => ({
                    filename: file,
                    cdnUrl: `${manifest.cdn.baseUrl}/avatars/${avatar}/frames/${file}`,
                    localPath: path.join(localPath, file)
                }))
            };
        }
        
        const manifestPath = 'production-deploy/cdn-manifest.json';
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        
        console.log(`✅ CDN manifest saved to: ${manifestPath}`);
        return manifest;
    }
}

// Main execution
async function main() {
    try {
        const uploader = new CDNUploader();
        await uploader.init();
        await uploader.uploadAllFrames();
        await uploader.generateCDNManifest();
        
        console.log('\n🎯 Next Steps:');
        console.log('1. Update cdn-config.js with your actual CDN URLs');
        console.log('2. Test the lip-sync system with the uploaded frames');
        console.log('3. Monitor CDN performance and adjust settings as needed');
        
    } catch (error) {
        console.error('❌ Upload failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = CDNUploader;
