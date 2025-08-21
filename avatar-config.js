/**
 * Avatar Asset Configuration
 * Based on PRD.md specifications for HeyGen-generated avatar assets
 * 
 * Assets stored in Cloudflare R2 bucket with the following structure:
 * - 768x768 PNG images extracted from HeyGen videos
 * - Organized by avatar (kelly/ken) and expression type
 * - Optimized for real-time lesson playback
 */

const AVATAR_CONFIG = {
    // Asset base (served by Cloudflare Pages)
    r2: {
        baseUrl: '/production-deploy/assets/avatars',
        bucketName: '',
        get fullUrl() {
            return this.baseUrl;
        }
    },

    // Avatar Specifications (per PRD.md)
    avatars: {
        kelly: {
            name: 'Kelly',
            gender: 'female',
            sourceVideo: 'kelly2.mp4', // HeyGen generated
            baseExpression: 'neutral'
        },
        ken: {
            name: 'Ken', 
            gender: 'male',
            sourceVideo: 'ken2.mp4', // HeyGen generated
            baseExpression: 'neutral'
        }
    },

    // Expression Mapping (per PRD requirements)
    expressions: {
        // Base neutral state
        neutral: {
            path: 'base',
            filename: '{avatar}_neutral_768.png',
            description: 'Default neutral expression from HeyGen base frames'
        },
        
        // Educational expressions
        teaching_explaining: {
            path: 'expressions',
            filename: '{avatar}_teaching_explaining_768.png',
            description: 'Professional teaching/explaining mode'
        },
        question_curious: {
            path: 'expressions', 
            filename: '{avatar}_question_curious_768.png',
            description: 'Curious questioning expression'
        },
        
        // Emotional expressions
        concerned_thinking: {
            path: 'expressions',
            filename: '{avatar}_concerned_thinking_768.png',
            description: 'Thoughtful/concerned expression for incorrect answers'
        },
        happy_celebrating: {
            path: 'expressions',
            filename: '{avatar}_happy_celebrating_768.png', 
            description: 'Positive/celebrating expression for correct answers'
        },
        welcoming_engaging: {
            path: 'expressions',
            filename: '{avatar}_welcoming_768.png',
            description: 'Warm welcoming expression for lesson start'
        },
        excited_celebrating: {
            path: 'expressions',
            filename: '{avatar}_excited_768.png',
            description: 'High-energy excited expression for fun tone'
        }
    },

    // Asset Quality Standards (per PRD.md Section B)
    quality: {
        imageSize: '768x768',
        format: 'PNG',
        lighting: 'consistent per avatar',
        pose: 'frontal, neutral, eyes open',
        enhancer: 'GFPGAN (strength 0.35) or CodeFormer (weight 0.5)'
    },

    // Performance Settings
    performance: {
        preloadExpressions: ['neutral', 'teaching_explaining', 'question_curious'],
        cacheTimeout: 3600000, // 1 hour in ms
        fallbackColor: '#e0e0e0' // Background color while loading
    },

    // Helper Methods
    getAvatarUrl(avatar, expression = 'neutral_default') {
        const a = (String(avatar||'').toLowerCase() === 'ken') ? 'ken' : 'kelly';
        const expr = String(expression||'neutral_default');
        // Map expression to directory structure
        const exprDirMap = {
            neutral_default: `base-states/${a}_neutral_default.png`,
            teaching_explaining: `lesson-sequence/${a}_teaching_explaining.png`,
            question_curious: `lesson-sequence/${a}_question_curious.png`,
            happy_celebrating: `emotional-expressions/${a}_happy_celebrating.png`,
            concerned_thinking: `emotional-expressions/${a}_concerned_thinking.png`
        };
        const rel = exprDirMap[expr] || `base-states/${a}_neutral_default.png`;
        return `${this.r2.fullUrl}/${a}/${rel}`;
    },

    getVisemeUrl(avatar, viseme = 'REST'){
        const a = (String(avatar||'').toLowerCase() === 'ken') ? 'ken' : 'kelly';
        const v = String(viseme||'REST').toUpperCase();
        // Map to existing asset files in repo
        const rel = `2d/visemes_flat/${a}_${v}.png`;
        return `${this.r2.fullUrl}/${a}/${rel}`;
    },

    getAllExpressionUrls(avatar) {
        const urls = {};
        for (const [key, expr] of Object.entries(this.expressions)) {
            urls[key] = this.getAvatarUrl(avatar, key);
        }
        return urls;
    },

    validateConfig() {
        // Check if R2 URL is configured
        if (!this.r2.baseUrl || this.r2.baseUrl === '/') {
            console.warn('⚠️ Avatar config: Base URL not configured');
            return false;
        }
        console.log(`✅ Avatar config base: ${this.r2.baseUrl}`);
        return true;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AVATAR_CONFIG;
}

// Make globally available in browser
if (typeof window !== 'undefined') {
    window.AVATAR_CONFIG = AVATAR_CONFIG;
    
    // Validate configuration on load
    if (AVATAR_CONFIG.validateConfig()) {
        console.log('✅ Avatar configuration loaded successfully');
    }
}
