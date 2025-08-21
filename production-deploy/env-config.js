// Environment Configuration for CDN Setup
// Copy this file to .env and fill in your actual credentials

const ENV_CONFIG = {
    // =============================================================================
    // CLOUDFLARE R2 (Recommended - Fast, Global, Cost-Effective)
    // =============================================================================
    R2: {
        ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID || 'your_r2_access_key_here',
        SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY || 'your_r2_secret_key_here',
        BUCKET_NAME: process.env.R2_BUCKET_NAME || 'your_avatar_bucket_name',
        ACCOUNT_ID: process.env.R2_ACCOUNT_ID || 'your_cloudflare_account_id',
        ENDPOINT: process.env.R2_ENDPOINT || 'https://your_account_id.r2.cloudflarestorage.com'
    },

    // =============================================================================
    // AWS S3 (Alternative - Reliable, Mature)
    // =============================================================================
    AWS: {
        ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'your_aws_access_key_here',
        SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'your_aws_secret_key_here',
        REGION: process.env.AWS_REGION || 'us-east-1',
        BUCKET_NAME: process.env.AWS_BUCKET_NAME || 'your_avatar_bucket_name'
    },

    // =============================================================================
    // GENERIC HTTP CDN (For any CDN with HTTP API)
    // =============================================================================
    GENERIC: {
        API_KEY: process.env.CDN_API_KEY || 'your_cdn_api_key_here',
        BASE_URL: process.env.CDN_BASE_URL || 'https://your_cdn_domain.com',
        UPLOAD_ENDPOINT: process.env.CDN_UPLOAD_ENDPOINT || 'https://your_cdn_domain.com/upload'
    },

    // =============================================================================
    // PERFORMANCE SETTINGS
    // =============================================================================
    PERFORMANCE: {
        FRAME_RATE: parseInt(process.env.FRAME_RATE) || 30,
        COMPRESSION_QUALITY: parseInt(process.env.COMPRESSION_QUALITY) || 85,
        PRELOAD_FRAMES: parseInt(process.env.PRELOAD_FRAMES) || 10,
        CACHE_SIZE: parseInt(process.env.CACHE_SIZE) || 100
    },

    // =============================================================================
    // MONITORING & ANALYTICS
    // =============================================================================
    MONITORING: {
        ENABLE_CDN_HEALTH_CHECK: process.env.ENABLE_CDN_HEALTH_CHECK !== 'false',
        HEALTH_CHECK_INTERVAL: parseInt(process.env.HEALTH_CHECK_INTERVAL) || 60000,
        ENABLE_PERFORMANCE_MONITORING: process.env.ENABLE_PERFORMANCE_MONITORING !== 'false',
        ENABLE_ERROR_LOGGING: process.env.ENABLE_ERROR_LOGGING !== 'false'
    },

    // =============================================================================
    // SECURITY SETTINGS
    // =============================================================================
    SECURITY: {
        ENABLE_CORS: process.env.ENABLE_CORS !== 'false',
        ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || '*',
        MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 10485760,
        ENABLE_RATE_LIMITING: process.env.ENABLE_RATE_LIMITING !== 'false',
        RATE_LIMIT_REQUESTS: parseInt(process.env.RATE_LIMIT_REQUESTS) || 1000,
        RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW) || 60000
    }
};

// Helper function to validate configuration
function validateConfig() {
    const errors = [];
    
    // Check R2 configuration
    if (ENV_CONFIG.R2.ACCESS_KEY_ID === 'your_r2_access_key_here') {
        errors.push('R2_ACCESS_KEY_ID not configured');
    }
    if (ENV_CONFIG.R2.SECRET_ACCESS_KEY === 'your_r2_secret_key_here') {
        errors.push('R2_SECRET_ACCESS_KEY not configured');
    }
    
    // Check AWS configuration
    if (ENV_CONFIG.AWS.ACCESS_KEY_ID === 'your_aws_access_key_here') {
        errors.push('AWS_ACCESS_KEY_ID not configured');
    }
    if (ENV_CONFIG.AWS.SECRET_ACCESS_KEY === 'your_aws_secret_key_here') {
        errors.push('AWS_SECRET_ACCESS_KEY not configured');
    }
    
    // Check Generic CDN configuration
    if (ENV_CONFIG.GENERIC.API_KEY === 'your_cdn_api_key_here') {
        errors.push('CDN_API_KEY not configured');
    }
    
    return errors;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ENV_CONFIG, validateConfig };
} else if (typeof window !== 'undefined') {
    window.ENV_CONFIG = ENV_CONFIG;
    window.validateConfig = validateConfig;
}
