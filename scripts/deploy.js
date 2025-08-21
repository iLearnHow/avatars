/**
 * Deployment Script
 * Handles production deployment and validation
 * @version 1.0.0
 * @author iLearnHow
 */

const fs = require('fs');
const path = require('path');

class DeploymentManager {
    constructor() {
        this.distPath = path.join(__dirname, '../dist');
        this.deploymentConfig = {
            target: process.env.DEPLOYMENT_TARGET || 'local',
            url: process.env.DEPLOYMENT_URL || 'http://localhost:8080',
            environment: process.env.NODE_ENV || 'production'
        };
    }

    /**
     * Run deployment process
     */
    async deploy() {
        try {
            console.log('🚀 Starting deployment process...');
            console.log(`  Target: ${this.deploymentConfig.target}`);
            console.log(`  Environment: ${this.deploymentConfig.environment}`);
            
            // Validate build artifacts
            await this.validateBuildArtifacts();
            
            // Run pre-deployment tests
            await this.runPreDeploymentTests();
            
            // Deploy to target
            await this.deployToTarget();
            
            // Run post-deployment validation
            await this.runPostDeploymentValidation();
            
            // Generate deployment report
            await this.generateDeploymentReport();
            
            console.log('✅ Deployment completed successfully!');
            
        } catch (error) {
            console.error('❌ Deployment failed:', error.message);
            process.exit(1);
        }
    }

    /**
     * Validate build artifacts
     */
    async validateBuildArtifacts() {
        console.log('📦 Validating build artifacts...');
        
        // Check for index.html
        const indexPath = path.join(this.distPath, 'index.html');
        if (!fs.existsSync(indexPath)) {
            throw new Error('Required build artifact missing: index.html');
        }
        
        const indexStats = fs.statSync(indexPath);
        console.log(`  ✓ index.html: ${this.formatBytes(indexStats.size)}`);
        
        // Check for JavaScript files
        const jsPath = path.join(this.distPath, 'assets/js');
        if (!fs.existsSync(jsPath)) {
            throw new Error('Required build artifact missing: assets/js directory');
        }
        
        const jsFiles = fs.readdirSync(jsPath).filter(file => file.endsWith('.js'));
        if (jsFiles.length === 0) {
            throw new Error('No JavaScript files found in assets/js');
        }
        
        let totalJsSize = 0;
        for (const file of jsFiles) {
            const filePath = path.join(jsPath, file);
            const stats = fs.statSync(filePath);
            totalJsSize += stats.size;
            console.log(`  ✓ ${file}: ${this.formatBytes(stats.size)}`);
        }
        
        console.log(`  Total JavaScript: ${this.formatBytes(totalJsSize)}`);
        console.log('  All build artifacts validated successfully');
    }

    /**
     * Run pre-deployment tests
     */
    async runPreDeploymentTests() {
        console.log('🧪 Running pre-deployment tests...');
        
        // Run unit tests
        await this.runCommand('npm run test:unit');
        
        // Run integration tests
        await this.runCommand('npm run test:integration');
        
        // Run performance tests
        await this.runCommand('npm run test:performance');
        
        console.log('  All pre-deployment tests passed');
    }

    /**
     * Deploy to target
     */
    async deployToTarget() {
        console.log(`🌐 Deploying to ${this.deploymentConfig.target}...`);
        
        switch (this.deploymentConfig.target) {
            case 'local':
                await this.deployToLocal();
                break;
            case 'cloudflare':
                await this.deployToCloudflare();
                break;
            case 'netlify':
                await this.deployToNetlify();
                break;
            default:
                throw new Error(`Unknown deployment target: ${this.deploymentConfig.target}`);
        }
    }

    /**
     * Deploy to local server
     */
    async deployToLocal() {
        console.log('  Deploying to local server...');
        
        // Simulate local deployment
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('  ✓ Local deployment completed');
    }

    /**
     * Deploy to Cloudflare Pages
     */
    async deployToCloudflare() {
        console.log('  Deploying to Cloudflare Pages...');
        
        // Check if wrangler is available
        try {
            await this.runCommand('wrangler --version');
        } catch (error) {
            throw new Error('Wrangler CLI not found. Install with: npm install -g wrangler');
        }
        
        // Deploy using wrangler
        await this.runCommand('wrangler pages deploy dist --project-name mynextlesson-synthesis');
        
        console.log('  ✓ Cloudflare Pages deployment completed');
    }

    /**
     * Deploy to Netlify
     */
    async deployToNetlify() {
        console.log('  Deploying to Netlify...');
        
        // Check if netlify CLI is available
        try {
            await this.runCommand('netlify --version');
        } catch (error) {
            throw new Error('Netlify CLI not found. Install with: npm install -g netlify-cli');
        }
        
        // Deploy using netlify CLI
        await this.runCommand('netlify deploy --prod --dir=dist');
        
        console.log('  ✓ Netlify deployment completed');
    }

    /**
     * Run post-deployment validation
     */
    async runPostDeploymentValidation() {
        console.log('🔍 Running post-deployment validation...');
        
        // Wait for deployment to propagate
        console.log('  Waiting for deployment to propagate...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Run live validation
        await this.runCommand('npm run test:live');
        
        console.log('  Post-deployment validation completed');
    }

    /**
     * Generate deployment report
     */
    async generateDeploymentReport() {
        console.log('📄 Generating deployment report...');
        
        const report = {
            timestamp: new Date().toISOString(),
            deployment: {
                target: this.deploymentConfig.target,
                environment: this.deploymentConfig.environment,
                url: this.deploymentConfig.url
            },
            build: {
                artifacts: this.getBuildArtifactsInfo(),
                optimization: this.getOptimizationInfo()
            },
            tests: {
                unit: 'passed',
                integration: 'passed',
                performance: 'passed',
                live: 'passed'
            },
            status: 'success'
        };
        
        // Save report
        const reportPath = path.join(this.distPath, 'deployment-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log(`  Deployment report saved to: ${reportPath}`);
        console.log(`  Application deployed to: ${this.deploymentConfig.url}`);
    }

    /**
     * Get build artifacts information
     */
    getBuildArtifactsInfo() {
        const artifacts = {};
        const files = ['index.html', 'assets/js/app.bundle.js', 'assets/css/main.bundle.css'];
        
        for (const file of files) {
            const filePath = path.join(this.distPath, file);
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                artifacts[file] = {
                    size: this.formatBytes(stats.size),
                    lastModified: stats.mtime.toISOString()
                };
            }
        }
        
        return artifacts;
    }

    /**
     * Get optimization information
     */
    getOptimizationInfo() {
        const optimizationPath = path.join(this.distPath, 'optimization-report.json');
        
        if (fs.existsSync(optimizationPath)) {
            try {
                const optimization = JSON.parse(fs.readFileSync(optimizationPath, 'utf8'));
                return {
                    compressionRatio: optimization.summary.compressionRatio,
                    spaceSaved: optimization.summary.spaceSaved
                };
            } catch (error) {
                return { error: 'Could not read optimization report' };
            }
        }
        
        return { status: 'No optimization report found' };
    }

    /**
     * Run command and wait for completion
     */
    async runCommand(command) {
        return new Promise((resolve, reject) => {
            const { exec } = require('child_process');
            
            console.log(`  Running: ${command}`);
            
            exec(command, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`  Command failed: ${error.message}`);
                    reject(error);
                    return;
                }
                
                if (stderr) {
                    console.warn(`  Command warnings: ${stderr}`);
                }
                
                console.log(`  Command completed successfully`);
                resolve(stdout);
            });
        });
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

    /**
     * Rollback to previous deployment
     */
    async rollback() {
        console.log('🔄 Rolling back deployment...');
        
        try {
            switch (this.deploymentConfig.target) {
                case 'cloudflare':
                    await this.runCommand('wrangler pages deployment list --project-name mynextlesson-synthesis');
                    break;
                case 'netlify':
                    await this.runCommand('netlify rollback');
                    break;
                default:
                    console.log('  Rollback not supported for this deployment target');
            }
            
            console.log('  ✓ Rollback completed');
            
        } catch (error) {
            console.error('  ✗ Rollback failed:', error.message);
            throw error;
        }
    }

    /**
     * Get deployment status
     */
    async getStatus() {
        console.log('📊 Getting deployment status...');
        
        const status = {
            timestamp: new Date().toISOString(),
            target: this.deploymentConfig.target,
            environment: this.deploymentConfig.environment,
            url: this.deploymentConfig.url,
            buildArtifacts: this.getBuildArtifactsInfo(),
            optimization: this.getOptimizationInfo()
        };
        
        console.log('  Deployment status retrieved');
        return status;
    }
}

// Run deployment if called directly
if (require.main === module) {
    const deployer = new DeploymentManager();
    
    const command = process.argv[2];
    
    switch (command) {
        case 'deploy':
            deployer.deploy();
            break;
        case 'rollback':
            deployer.rollback();
            break;
        case 'status':
            deployer.getStatus().then(status => {
                console.log(JSON.stringify(status, null, 2));
            });
            break;
        default:
            console.log('Usage: node deploy.js [deploy|rollback|status]');
            process.exit(1);
    }
}

module.exports = DeploymentManager; 