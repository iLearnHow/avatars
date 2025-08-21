// CDN Configuration for Full Lip-Sync Experience
const CDN_CONFIG = {
    // Base CDN URLs (update these with your actual CDN details)
    baseUrl: 'https://your-cdn-domain.com/avatars',
    
    // Avatar frame sequences for full lip-sync
    avatars: {
        kelly: {
            // Full frame sequence (365 frames for smooth lip-sync)
            frames: {
                baseUrl: 'https://your-cdn-domain.com/avatars/kelly/frames',
                totalFrames: 365,
                framePattern: 'kelly_frame_{0000-0364}.png',
                frameRate: 30, // fps
                dimensions: { width: 1920, height: 1080 },
                totalSize: '~450MB'
            },
            // Visemes for phoneme-based lip-sync
            visemes: {
                baseUrl: 'https://your-cdn-domain.com/avatars/kelly/visemes',
                phonemes: ['A', 'E', 'I', 'O', 'U', 'M', 'P', 'B', 'F', 'V', 'L', 'S', 'T', 'D', 'N', 'K', 'G', 'H', 'R', 'W', 'Y', 'TH', 'SH', 'CH', 'J', 'NG', 'ZH']
            },
            // Base states and expressions
            expressions: {
                baseUrl: 'https://your-cdn-domain.com/avatars/kelly/expressions',
                states: ['neutral', 'happy', 'excited', 'concerned', 'teaching', 'questioning', 'celebrating']
            }
        },
        ken: {
            // Full frame sequence (347 frames for smooth lip-sync)
            frames: {
                baseUrl: 'https://your-cdn-domain.com/avatars/ken/frames',
                totalFrames: 347,
                framePattern: 'ken_frame_{0000-0346}.png',
                frameRate: 30, // fps
                dimensions: { width: 1920, height: 1080 },
                totalSize: '~420MB'
            },
            // Visemes for phoneme-based lip-sync
            visemes: {
                baseUrl: 'https://your-cdn-domain.com/avatars/ken/visemes',
                phonemes: ['A', 'E', 'I', 'O', 'U', 'M', 'P', 'B', 'F', 'V', 'L', 'S', 'T', 'D', 'N', 'K', 'G', 'H', 'R', 'W', 'Y', 'TH', 'SH', 'CH', 'J', 'NG', 'ZH']
            },
            // Base states and expressions
            expressions: {
                baseUrl: 'https://your-cdn-domain.com/avatars/ken/expressions',
                states: ['neutral', 'happy', 'excited', 'concerned', 'teaching', 'questioning', 'celebrating']
            }
        }
    },
    
    // Lip-sync configuration
    lipSync: {
        // Phoneme mapping for different languages
        phonemeMap: {
            en: {
                'A': ['ah', 'aa', 'aw'],
                'E': ['eh', 'ey', 'ay'],
                'I': ['ih', 'iy', 'ee'],
                'O': ['oh', 'ow', 'ao'],
                'U': ['uh', 'uw', 'oo'],
                'M': ['m', 'mm'],
                'P': ['p', 'pp'],
                'B': ['b', 'bb'],
                'F': ['f', 'ff'],
                'V': ['v', 'vv'],
                'L': ['l', 'll'],
                'S': ['s', 'ss'],
                'T': ['t', 'tt'],
                'D': ['d', 'dd'],
                'N': ['n', 'nn'],
                'K': ['k', 'kk'],
                'G': ['g', 'gg'],
                'H': ['h', 'hh'],
                'R': ['r', 'rr'],
                'W': ['w', 'ww'],
                'Y': ['y', 'yy'],
                'TH': ['th'],
                'SH': ['sh'],
                'CH': ['ch'],
                'J': ['j', 'jj'],
                'NG': ['ng'],
                'ZH': ['zh']
            }
        },
        
        // Frame selection strategy
        frameSelection: {
            strategy: 'phoneme_based', // 'phoneme_based' or 'time_based'
            fallbackFrames: 30, // frames per second if phoneme detection fails
            interpolation: true, // smooth transitions between frames
            preloadFrames: 10 // number of frames to preload ahead
        }
    },
    
    // Performance optimization
    performance: {
        lazyLoading: true,
        progressiveLoading: true,
        frameCacheSize: 100, // number of frames to keep in memory
        preloadThreshold: 0.8, // preload when 80% through current frame
        compression: {
            format: 'webp', // 'webp', 'png', 'jpg'
            quality: 85,
            maxWidth: 1920,
            maxHeight: 1080
        }
    },
    
    // Error handling and fallbacks
    fallbacks: {
        useLocalAssets: true, // fallback to local assets if CDN fails
        useVisemes: true, // fallback to visemes if frames fail
        useStaticImages: true, // fallback to static images if everything fails
        retryAttempts: 3,
        retryDelay: 1000
    }
};

// CDN Helper Functions
const CDN_HELPERS = {
    // Get frame URL for a specific avatar and frame number
    getFrameUrl: (avatar, frameNumber, options = {}) => {
        const config = CDN_CONFIG.avatars[avatar];
        if (!config) return null;
        
        const frameNum = String(frameNumber).padStart(4, '0');
        const baseUrl = options.useVisemes ? config.visemes.baseUrl : config.frames.baseUrl;
        
        if (options.useVisemes) {
            // Return viseme-based frame
            return `${baseUrl}/${frameNum}.png`;
        } else {
            // Return full frame sequence
            return `${baseUrl}/${config.frames.framePattern.replace('{0000-0364}', frameNum)}`;
        }
    },
    
    // Get viseme URL for a specific phoneme
    getVisemeUrl: (avatar, phoneme, options = {}) => {
        const config = CDN_CONFIG.avatars[avatar];
        if (!config) return null;
        
        const baseUrl = config.visemes.baseUrl;
        return `${baseUrl}/${phoneme.toUpperCase()}.png`;
    },
    
    // Get expression URL for a specific state
    getExpressionUrl: (avatar, expression, options = {}) => {
        const config = CDN_CONFIG.avatars[avatar];
        if (!config) return null;
        
        const baseUrl = config.expressions.baseUrl;
        return `${baseUrl}/${avatar}_${expression}.png`;
    },
    
    // Preload frames for smooth playback
    preloadFrames: async (avatar, startFrame, count, options = {}) => {
        const config = CDN_CONFIG.avatars[avatar];
        if (!config) return [];
        
        const frames = [];
        const endFrame = Math.min(startFrame + count, config.frames.totalFrames);
        
        for (let i = startFrame; i < endFrame; i++) {
            const frameUrl = CDN_HELPERS.getFrameUrl(avatar, i, options);
            if (frameUrl) {
                try {
                    const img = new Image();
                    img.src = frameUrl;
                    frames.push(img);
                } catch (error) {
                    console.warn(`Failed to preload frame ${i} for ${avatar}:`, error);
                }
            }
        }
        
        return frames;
    },
    
    // Check CDN availability
    checkCDNHealth: async () => {
        try {
            const testUrl = `${CDN_CONFIG.baseUrl}/health`;
            const response = await fetch(testUrl, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            console.warn('CDN health check failed:', error);
            return false;
        }
    },
    
    // Get optimal frame rate based on device performance
    getOptimalFrameRate: () => {
        // Simple performance detection
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const hasHighPerformance = navigator.hardwareConcurrency > 4;
        
        if (isMobile) return 24; // Lower frame rate for mobile
        if (hasHighPerformance) return 30; // Full frame rate for high-end devices
        return 24; // Default to 24 fps
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CDN_CONFIG, CDN_HELPERS };
} else if (typeof window !== 'undefined') {
    window.CDN_CONFIG = CDN_CONFIG;
    window.CDN_HELPERS = CDN_HELPERS;
}
