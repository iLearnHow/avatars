/**
 * Build Optimization Script
 * Optimizes production builds for performance and size
 * @version 1.0.0
 * @author iLearnHow
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

class BuildOptimizer {
    constructor() {
        this.distPath = path.join(__dirname, '../dist');
        this.optimizationStats = {
            jsSize: 0,
            cssSize: 0,
            originalJsSize: 0,
            originalCssSize: 0,
            compressionRatio: 0
        };
    }

    /**
     * Run optimization process
     */
    async optimize() {
        try {
            console.log('🚀 Starting build optimization...');
            
            // Ensure dist directory exists
            if (!fs.existsSync(this.distPath)) {
                throw new Error('Dist directory not found. Run build first.');
            }
            
            // Optimize JavaScript files
            await this.optimizeJavaScript();
            
            // Optimize CSS files
            await this.optimizeCSS();
            
            // Optimize HTML
            await this.optimizeHTML();
            
            // Generate optimization report
            await this.generateReport();
            
            console.log('✅ Build optimization completed successfully!');
            
        } catch (error) {
            console.error('❌ Build optimization failed:', error.message);
            process.exit(1);
        }
    }

    /**
     * Optimize JavaScript files
     */
    async optimizeJavaScript() {
        console.log('📦 Optimizing JavaScript files...');
        
        const jsFiles = this.findFiles(this.distPath, '.js');
        
        for (const file of jsFiles) {
            const content = fs.readFileSync(file, 'utf8');
            const originalSize = Buffer.byteLength(content, 'utf8');
            
            try {
                const result = await minify(content, {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log', 'console.info', 'console.debug']
                    },
                    mangle: {
                        toplevel: true
                    },
                    format: {
                        comments: false
                    }
                });
                
                fs.writeFileSync(file, result.code);
                const optimizedSize = Buffer.byteLength(result.code, 'utf8');
                
                this.optimizationStats.originalJsSize += originalSize;
                this.optimizationStats.jsSize += optimizedSize;
                
                console.log(`  ✓ ${path.basename(file)}: ${this.formatBytes(originalSize)} → ${this.formatBytes(optimizedSize)}`);
                
            } catch (error) {
                console.warn(`  ⚠️  Failed to optimize ${path.basename(file)}: ${error.message}`);
            }
        }
    }

    /**
     * Optimize CSS files
     */
    async optimizeCSS() {
        console.log('🎨 Optimizing CSS files...');
        
        const cssFiles = this.findFiles(this.distPath, '.css');
        const cleanCSS = new CleanCSS({
            level: 2,
            format: 'keep-breaks'
        });
        
        for (const file of cssFiles) {
            const content = fs.readFileSync(file, 'utf8');
            const originalSize = Buffer.byteLength(content, 'utf8');
            
            try {
                const result = cleanCSS.minify(content);
                fs.writeFileSync(file, result.styles);
                
                const optimizedSize = Buffer.byteLength(result.styles, 'utf8');
                
                this.optimizationStats.originalCssSize += originalSize;
                this.optimizationStats.cssSize += optimizedSize;
                
                console.log(`  ✓ ${path.basename(file)}: ${this.formatBytes(originalSize)} → ${this.formatBytes(optimizedSize)}`);
                
            } catch (error) {
                console.warn(`  ⚠️  Failed to optimize ${path.basename(file)}: ${error.message}`);
            }
        }
    }

    /**
     * Optimize HTML files
     */
    async optimizeHTML() {
        console.log('📄 Optimizing HTML files...');
        
        const htmlFiles = this.findFiles(this.distPath, '.html');
        
        for (const file of htmlFiles) {
            let content = fs.readFileSync(file, 'utf8');
            const originalSize = Buffer.byteLength(content, 'utf8');
            
            // Remove comments
            content = content.replace(/<!--[\s\S]*?-->/g, '');
            
            // Remove unnecessary whitespace
            content = content.replace(/\s+/g, ' ');
            content = content.replace(/>\s+</g, '><');
            
            // Remove empty lines
            content = content.replace(/\n\s*\n/g, '\n');
            
            fs.writeFileSync(file, content);
            
            const optimizedSize = Buffer.byteLength(content, 'utf8');
            console.log(`  ✓ ${path.basename(file)}: ${this.formatBytes(originalSize)} → ${this.formatBytes(optimizedSize)}`);
        }
    }

    /**
     * Generate optimization report
     */
    async generateReport() {
        const totalOriginal = this.optimizationStats.originalJsSize + this.optimizationStats.originalCssSize;
        const totalOptimized = this.optimizationStats.jsSize + this.optimizationStats.cssSize;
        const compressionRatio = totalOriginal > 0 ? ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1) : 0;
        
        this.optimizationStats.compressionRatio = compressionRatio;
        
        const report = {
            timestamp: new Date().toISOString(),
            optimization: this.optimizationStats,
            summary: {
                totalOriginalSize: this.formatBytes(totalOriginal),
                totalOptimizedSize: this.formatBytes(totalOptimized),
                compressionRatio: `${compressionRatio}%`,
                spaceSaved: this.formatBytes(totalOriginal - totalOptimized)
            }
        };
        
        // Save report
        const reportPath = path.join(this.distPath, 'optimization-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        // Display summary
        console.log('\n📊 Optimization Summary:');
        console.log(`  Total original size: ${report.summary.totalOriginalSize}`);
        console.log(`  Total optimized size: ${report.summary.totalOptimizedSize}`);
        console.log(`  Compression ratio: ${report.summary.compressionRatio}`);
        console.log(`  Space saved: ${report.summary.spaceSaved}`);
        console.log(`  Report saved to: ${reportPath}`);
    }

    /**
     * Find files by extension
     */
    findFiles(dir, ext) {
        const files = [];
        
        const walk = (currentDir) => {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    walk(fullPath);
                } else if (item.endsWith(ext)) {
                    files.push(fullPath);
                }
            }
        };
        
        walk(dir);
        return files;
    }

    /**
     * Format bytes to human readable format
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Run optimization if called directly
if (require.main === module) {
    const optimizer = new BuildOptimizer();
    optimizer.optimize();
}

module.exports = BuildOptimizer; 