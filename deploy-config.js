/**
 * Deployment Configuration for ilearnhow.com
 * Complete production deployment setup
 */

const deploymentConfig = {
  // Domain configuration
  domain: 'ilearnhow.com',
  subdomain: 'www',
  
  // Cloudflare Pages configuration
  pages: {
    projectName: 'ilearnhow',
    accountId: 'your-cloudflare-account-id',
    apiToken: 'your-cloudflare-api-token'
  },
  
  // Build configuration
  build: {
    command: 'npm run build:production',
    outputDir: 'dist',
    nodeVersion: '18'
  },
  
  // Environment variables
  environment: {
    NODE_ENV: 'production',
    ELEVENLABS_API_KEY: 'your-elevenlabs-api-key',
    CLAUDE_API_KEY: 'your-claude-api-key',
    REDIS_HOST: 'your-redis-host',
    REDIS_PASSWORD: 'your-redis-password'
  },
  
  // Routes configuration
  routes: [
    {
      pattern: '/',
      serve: '/production-lesson-player.html'
    },
    {
      pattern: '/api/*',
      function: 'synthesis-worker'
    },
    {
      pattern: '/assets/*',
      headers: {
        'Cache-Control': 'public, max-age=31536000'
      }
    },
    {
      pattern: '/*',
      serve: '/production-lesson-player.html'
    }
  ],
  
  // Headers configuration
  headers: {
    '/*': {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    },
    '/api/*': {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  },
  
  // Security configuration
  security: {
    csp: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; media-src 'self' https:; connect-src 'self' https://api.elevenlabs.io https://api.anthropic.com;",
    hsts: 'max-age=31536000; includeSubDomains; preload'
  }
};

// Deployment script
async function deployToProduction() {
  console.log('🚀 Starting production deployment to ilearnhow.com...');
  
  try {
    // 1. Build the project
    console.log('📦 Building project...');
    await buildProject();
    
    // 2. Upload to Cloudflare Pages
    console.log('☁️ Uploading to Cloudflare Pages...');
    await uploadToCloudflare();
    
    // 3. Configure custom domain
    console.log('🌐 Configuring custom domain...');
    await configureDomain();
    
    // 4. Set up SSL certificate
    console.log('🔒 Setting up SSL certificate...');
    await setupSSL();
    
    // 5. Configure DNS
    console.log('📡 Configuring DNS...');
    await configureDNS();
    
    // 6. Test deployment
    console.log('🧪 Testing deployment...');
    await testDeployment();
    
    console.log('✅ Production deployment completed successfully!');
    console.log('🌍 Your site is live at: https://ilearnhow.com');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    throw error;
  }
}

// Build project
async function buildProject() {
  const { execSync } = require('child_process');
  
  // Clean previous build
  execSync('rm -rf dist', { stdio: 'inherit' });
  
  // Install dependencies
  execSync('npm install', { stdio: 'inherit' });
  
  // Build project
  execSync('npm run build:production', { stdio: 'inherit' });
  
  // Copy production files
  execSync('cp production-lesson-player.html dist/index.html', { stdio: 'inherit' });
  execSync('cp complete-lesson-system.js dist/', { stdio: 'inherit' });
  execSync('cp smart-lesson-server.js dist/', { stdio: 'inherit' });
  execSync('cp sw.js dist/', { stdio: 'inherit' });
  
  console.log('✅ Build completed');
}

// Upload to Cloudflare Pages
async function uploadToCloudflare() {
  const { execSync } = require('child_process');
  
  // Install Wrangler if not installed
  try {
    execSync('npx wrangler --version', { stdio: 'pipe' });
  } catch {
    execSync('npm install -g wrangler', { stdio: 'inherit' });
  }
  
  // Login to Cloudflare
  execSync('npx wrangler login', { stdio: 'inherit' });
  
  // Deploy to Pages
  execSync('npx wrangler pages deploy dist --project-name=ilearnhow', { stdio: 'inherit' });
  
  console.log('✅ Uploaded to Cloudflare Pages');
}

// Configure custom domain
async function configureDomain() {
  const { execSync } = require('child_process');
  
  // Add custom domain
  execSync('npx wrangler pages domain add ilearnhow.com --project-name=ilearnhow', { stdio: 'inherit' });
  
  console.log('✅ Custom domain configured');
}

// Setup SSL certificate
async function setupSSL() {
  const { execSync } = require('child_process');
  
  // Cloudflare automatically provides SSL certificates
  console.log('✅ SSL certificate configured (automatic)');
}

// Configure DNS
async function configureDNS() {
  const { execSync } = require('child_process');
  
  // Set up DNS records
  execSync('npx wrangler dns add ilearnhow.com A 192.0.2.1', { stdio: 'inherit' });
  execSync('npx wrangler dns add www.ilearnhow.com CNAME ilearnhow.com', { stdio: 'inherit' });
  
  console.log('✅ DNS configured');
}

// Test deployment
async function testDeployment() {
  const https = require('https');
  
  return new Promise((resolve, reject) => {
    const req = https.get('https://ilearnhow.com', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Deployment test passed');
        resolve();
      } else {
        reject(new Error(`Deployment test failed: ${res.statusCode}`));
      }
    });
    
    req.on('error', (error) => {
      reject(new Error(`Deployment test failed: ${error.message}`));
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Deployment test timeout'));
    });
  });
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { deploymentConfig, deployToProduction };
}

// Run deployment if called directly
if (require.main === module) {
  deployToProduction()
    .then(() => {
      console.log('🎉 Deployment completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Deployment failed:', error);
      process.exit(1);
    });
} 