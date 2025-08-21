/**
 * Production Deployment Script for iLearn How
 * Deploys to Cloudflare Pages with custom domain
 */

const fs = require('fs');
const path = require('path');

class ProductionDeployer {
    constructor() {
        this.projectName = 'ilearnhow';
        this.customDomain = 'ilearnhow.com';
        this.buildDir = 'production-deploy';
        this.sourceDir = '.';
    }

    /**
     * Prepare production build
     */
    async prepareProductionBuild() {
        console.log('🚀 Preparing production build...');
        
        // Create production directory
        if (!fs.existsSync(this.buildDir)) {
            fs.mkdirSync(this.buildDir, { recursive: true });
        }

        // Copy essential files
        const essentialFiles = [
            'index.html',
            'complete-curriculum.js',
            'corrected-variant-generator-v2.js',
            'complete-elevenlabs-integration.js',
            'apple-quality-overlay-system.js',
            'ai-generation-integration.js',
            'package.json'
        ];

        for (const file of essentialFiles) {
            if (fs.existsSync(path.join(this.sourceDir, file))) {
                fs.copyFileSync(
                    path.join(this.sourceDir, file),
                    path.join(this.buildDir, file)
                );
                console.log(`✅ Copied ${file}`);
            }
        }

        // Copy assets directory
        this.copyDirectory('lesson-player-deploy/assets', `${this.buildDir}/assets`);
        
        // Copy DNA files
        this.copyDirectory('dna_files', `${this.buildDir}/dna_files`);

        console.log('✅ Production build prepared');
    }

    /**
     * Copy directory recursively
     */
    copyDirectory(src, dest) {
        if (!fs.existsSync(src)) {
            console.warn(`⚠️ Source directory not found: ${src}`);
            return;
        }

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const files = fs.readdirSync(src);
        for (const file of files) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            
            if (fs.statSync(srcPath).isDirectory()) {
                this.copyDirectory(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    /**
     * Create Cloudflare Pages configuration
     */
    createCloudflareConfig() {
        const config = {
            name: this.projectName,
            production_branch: 'main',
            build_command: 'npm run build',
            publish_directory: this.buildDir,
            environment_variables: {
                NODE_VERSION: '18'
            },
            routes: [
                {
                    pattern: `${this.customDomain}/*`,
                    zone_name: this.customDomain,
                    custom_domain: true
                }
            ]
        };

        const configPath = path.join(this.buildDir, 'wrangler.toml');
        const configContent = this.generateWranglerConfig(config);
        
        fs.writeFileSync(configPath, configContent);
        console.log('✅ Cloudflare configuration created');
    }

    /**
     * Generate Wrangler configuration
     */
    generateWranglerConfig(config) {
        return `name = "${config.name}"
compatibility_date = "2024-01-01"

[build]
command = "${config.build_command}"
publish = "${config.publish_directory}"

[env.production]
name = "${config.name}-production"

[[env.production.routes]]
pattern = "${config.custom_domain}/*"
zone_name = "${config.custom_domain}"
custom_domain = true

[env.production.vars]
NODE_VERSION = "${config.environment_variables.NODE_VERSION}"
`;
    }

    /**
     * Create package.json for production
     */
    createProductionPackage() {
        const packageJson = {
            name: this.projectName,
            version: '1.0.0',
            description: 'iLearn How - Personalized Learning Platform',
            main: 'index.html',
            scripts: {
                'build': 'echo "Build complete"',
                'deploy': 'wrangler pages deploy',
                'dev': 'python3 -m http.server 8000'
            },
            dependencies: {},
            devDependencies: {
                'wrangler': '^3.0.0'
            },
            engines: {
                'node': '>=18.0.0'
            }
        };

        const packagePath = path.join(this.buildDir, 'package.json');
        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Production package.json created');
    }

    /**
     * Create deployment instructions
     */
    createDeploymentInstructions() {
        const instructions = `# 🚀 Production Deployment Instructions

## Prerequisites
1. Install Wrangler CLI: \`npm install -g wrangler\`
2. Login to Cloudflare: \`wrangler login\`
3. Ensure custom domain is configured in Cloudflare

## Deployment Steps

### 1. Build Production Files
\`\`\`bash
node deploy-production.js
\`\`\`

### 2. Deploy to Cloudflare Pages
\`\`\`bash
cd production-deploy
wrangler pages deploy
\`\`\`

### 3. Configure Custom Domain
1. Go to Cloudflare Dashboard
2. Navigate to Pages > ${this.projectName}
3. Go to Custom Domains
4. Add ${this.customDomain}
5. Configure DNS records

### 4. Set Environment Variables
- CLAUDE_API_KEY: Your Claude API key
- ELEVENLABS_API_KEY: Your ElevenLabs API key

## Post-Deployment Checklist
- [ ] Custom domain is working
- [ ] SSL certificate is active
- [ ] API keys are configured
- [ ] Analytics are tracking
- [ ] Performance is optimized

## Monitoring
- Cloudflare Analytics: https://dash.cloudflare.com
- Performance: https://pages.dev
- Logs: \`wrangler pages deployment tail\`

## Rollback
\`\`\`bash
wrangler pages deployment list
wrangler pages deployment rollback <deployment-id>
\`\`\`
`;

        const instructionsPath = path.join(this.buildDir, 'DEPLOYMENT_INSTRUCTIONS.md');
        fs.writeFileSync(instructionsPath, instructions);
        console.log('✅ Deployment instructions created');
    }

    /**
     * Create analytics integration
     */
    createAnalyticsIntegration() {
        const analyticsScript = `
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_ANALYTICS_TOKEN"}'></script>

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
`;

        const analyticsPath = path.join(this.buildDir, 'analytics.html');
        fs.writeFileSync(analyticsPath, analyticsScript);
        console.log('✅ Analytics integration created');
    }

    /**
     * Create performance optimization
     */
    createPerformanceOptimization() {
        const optimizationScript = `
<!-- Performance Optimization -->
<link rel="preconnect" href="https://api.anthropic.com">
<link rel="preconnect" href="https://api.elevenlabs.io">
<link rel="dns-prefetch" href="https://static.cloudflareinsights.com">

<!-- Service Worker for caching -->
<script>
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('SW registered'))
        .catch(error => console.log('SW registration failed'));
}
</script>
`;

        const optimizationPath = path.join(this.buildDir, 'performance.html');
        fs.writeFileSync(optimizationPath, optimizationScript);
        console.log('✅ Performance optimization created');
    }

    /**
     * Create service worker for caching
     */
    createServiceWorker() {
        const serviceWorker = `
const CACHE_NAME = 'ilearnhow-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/complete-curriculum.js',
    '/corrected-variant-generator-v2.js',
    '/complete-elevenlabs-integration.js',
    '/apple-quality-overlay-system.js',
    '/ai-generation-integration.js',
    '/assets/avatars/kelly/kelly_neutral_default.png',
    '/assets/avatars/ken/ken_neutral_default.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
`;

        const swPath = path.join(this.buildDir, 'sw.js');
        fs.writeFileSync(swPath, serviceWorker);
        console.log('✅ Service worker created');
    }

    /**
     * Run complete deployment preparation
     */
    async deploy() {
        try {
            console.log('🚀 Starting production deployment preparation...');
            
            await this.prepareProductionBuild();
            this.createCloudflareConfig();
            this.createProductionPackage();
            this.createDeploymentInstructions();
            this.createAnalyticsIntegration();
            this.createPerformanceOptimization();
            this.createServiceWorker();
            
            console.log('✅ Production deployment preparation complete!');
            console.log(`📁 Production files ready in: ${this.buildDir}`);
            console.log('📋 Next steps:');
            console.log('1. cd production-deploy');
            console.log('2. wrangler pages deploy');
            console.log('3. Configure custom domain in Cloudflare Dashboard');
            
        } catch (error) {
            console.error('❌ Deployment preparation failed:', error);
            throw error;
        }
    }
}

// Run deployment if called directly
if (require.main === module) {
    const deployer = new ProductionDeployer();
    deployer.deploy().catch(console.error);
}

module.exports = ProductionDeployer; 