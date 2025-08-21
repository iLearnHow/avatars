#!/usr/bin/env node

/**
 * Cloudflare Pages Deployment Script
 * Deploys the frontend to Cloudflare Pages
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class PagesDeployer {
  constructor() {
    this.distPath = path.join(__dirname, '../dist');
    this.projectName = 'ilearnhow-frontend';
  }

  async deploy() {
    console.log('🚀 Deploying to Cloudflare Pages...');
    
    try {
      // Check if dist directory exists
      if (!fs.existsSync(this.distPath)) {
        throw new Error('Dist directory not found. Run npm run build:production first.');
      }

      // Check if wrangler is installed
      try {
        execSync('wrangler --version', { stdio: 'pipe' });
      } catch (error) {
        throw new Error('Wrangler CLI not found. Install with: npm install -g wrangler');
      }

      // Deploy to Cloudflare Pages
      console.log('📦 Deploying frontend to Cloudflare Pages...');
      
      const deployCommand = `wrangler pages deploy ${this.distPath} --project-name=${this.projectName}`;
      const result = execSync(deployCommand, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });

      console.log('✅ Deployment successful!');
      console.log(result);

      // Extract URL from output
      const urlMatch = result.match(/https:\/\/[^\s]+/);
      if (urlMatch) {
        console.log(`🌐 Your site is live at: ${urlMatch[0]}`);
      }

      return true;

    } catch (error) {
      console.error('❌ Deployment failed:', error.message);
      
      if (error.message.includes('not found')) {
        console.log('💡 Try running: npm run build:production first');
      }
      
      return false;
    }
  }
}

// Run deployment
if (require.main === module) {
  const deployer = new PagesDeployer();
  deployer.deploy().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = PagesDeployer; 