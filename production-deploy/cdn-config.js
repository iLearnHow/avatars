// CDN Configuration for Full Lip-Sync Experience
// This file configures your CDN for optimal avatar frame delivery

const CDN_CONFIG = {
    // Base CDN URLs (update these with your actual CDN details)
    baseUrl: 'https://cdn.ilearnhow.com/avatars', // Update this to your actual CDN domain
    
    // Avatar frame sequences for full lip-sync
    avatars: {
        kelly: {
            // Full frame sequence (365 frames for smooth lip-sync)
            frames: {
                baseUrl: 'https://cdn.ilearnhow.com/avatars/kelly/frames',
                totalFrames: 365,
                framePattern: 'kelly_frame_{0000-0364}.png',
                frameRate: 30, // fps
                dimensions: { width: 1920, height: 1080 },
                totalSize: '~450MB',
                compression: 'webp',
                quality: 85
            },
            // Visemes for phoneme-based lip-sync
            visemes: {
                baseUrl: 'https://cdn.ilearnhow.com/avatars/kelly/visemes',
                phonemes: ['A', 'E', 'I', 'O', 'U', 'M', 'P', 'B', 'F', 'V', 'L', 'S', 'T', 'D', 'N', 'K', 'G', 'H', 'R', 'W', 'Y', 'TH', 'SH', 'CH', 'J', 'NG', 'ZH'],
                format: 'png',
                dimensions: { width: 512, height: 512 }
            },
            // Base states and expressions
            expressions: {
                baseUrl: 'https://cdn.ilearnhow.com/avatars/kelly/expressions',
                states: ['neutral', 'happy', 'excited', 'concerned', 'teaching', 'questioning', 'celebrating'],
                format: 'png',
                dimensions: { width: 1024, height: 1024 }
            }
        },
        ken: {
            // Full frame sequence (347 frames for smooth lip-sync)
            frames: {
                baseUrl: 'https://cdn.ilearnhow.com/avatars/ken/frames',
                totalFrames: 347,
                framePattern: 'ken_frame_{0000-0346}.png',
                frameRate: 30, // fps
                dimensions: { width: 1920, height: 1080 },
                totalSize: '~420MB',
                compression: 'webp',
                quality: 85
            },
            // Visemes for phoneme-based lip-sync
            visemes: {
                baseUrl: 'https://cdn.ilearnhow.com/avatars/ken/visemes',
                phonemes: ['A', 'E', 'I', 'O', 'U', 'M', 'P', 'B', 'F', 'V', 'L', 'S', 'T', 'D', 'N', 'K', 'G', 'H', 'R', 'W', 'Y', 'TH', 'SH', 'CH', 'J', 'NG', 'ZH'],
                format: 'png',
                dimensions: { width: 512, height: 512 }
            },
            // Base states and expressions
            expressions: {
                baseUrl: 'https://cdn.ilearnhow.com/avatars/ken/expressions',
                states: ['neutral', 'happy', 'excited', 'concerned', 'teaching', 'questioning', 'celebrating'],
                format: 'png',
                dimensions: { width: 1024, height: 1024 }
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
            },
            es: {
                'A': ['a', 'á'],
                'E': ['e', 'é'],
                'I': ['i', 'í'],
                'O': ['o', 'ó'],
                'U': ['u', 'ú'],
                'M': ['m'],
                'P': ['p'],
                'B': ['b', 'v'],
                'F': ['f'],
                'V': ['v', 'b'],
                'L': ['l'],
                'S': ['s'],
                'T': ['t'],
                'D': ['d'],
                'N': ['n', 'ñ'],
                'K': ['k', 'c', 'qu'],
                'G': ['g'],
                'H': ['h'],
                'R': ['r', 'rr'],
                'W': ['w'],
                'Y': ['y', 'll'],
                'TH': ['z'],
                'SH': ['ch'],
                'CH': ['ch'],
                'J': ['j', 'g'],
                'NG': ['ng'],
                'ZH': ['j']
            },
            fr: {
                'A': ['a', 'â'],
                'E': ['e', 'é', 'è', 'ê'],
                'I': ['i', 'î'],
                'O': ['o', 'ô'],
                'U': ['u', 'û'],
                'M': ['m'],
                'P': ['p'],
                'B': ['b'],
                'F': ['f'],
                'V': ['v'],
                'L': ['l'],
                'S': ['s'],
                'T': ['t'],
                'D': ['d'],
                'N': ['n'],
                'K': ['k', 'c', 'qu'],
                'G': ['g'],
                'H': ['h'],
                'R': ['r'],
                'W': ['w'],
                'Y': ['y'],
                'TH': ['t'],
                'SH': ['ch'],
                'CH': ['ch'],
                'J': ['j'],
                'NG': ['ng'],
                'ZH': ['j']
            }
        },
        
        // Frame selection strategy
        frameSelection: {
            strategy: 'phoneme_based', // 'phoneme_based' or 'time_based'
            fallbackFrames: 30, // fps if phoneme detection fails
            interpolation: true, // smooth transitions between frames
            preloadFrames: 10, // number of frames to preload ahead
            adaptiveFrameRate: true, // adjust frame rate based on device performance
            minFrameRate: 24,
            maxFrameRate: 60
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
            maxHeight: 1080,
            enableProgressive: true
        },
        caching: {
            strategy: 'aggressive', // 'conservative', 'balanced', 'aggressive'
            maxAge: 31536000, // 1 year in seconds
            staleWhileRevalidate: 86400, // 1 day in seconds
            cacheControl: 'public, max-age=31536000, stale-while-revalidate=86400'
        }
    },
    
    // Error handling and fallbacks
    fallbacks: {
        useLocalAssets: true, // fallback to local assets if CDN fails
        useVisemes: true, // fallback to visemes if frames fail
        useStaticImages: true, // fallback to static images if everything fails
        retryAttempts: 3,
        retryDelay: 1000,
        circuitBreaker: {
            enabled: true,
            failureThreshold: 5,
            recoveryTimeout: 30000
        }
    },
    
    // Analytics and monitoring
    analytics: {
        enabled: true,
        trackFrameLoads: true,
        trackPerformance: true,
        trackErrors: true,
        metricsEndpoint: 'https://analytics.ilearnhow.com/metrics',
        samplingRate: 0.1 // 10% of users
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
        const format = options.format || config.visemes.format || 'png';
        return `${baseUrl}/${phoneme.toUpperCase()}.${format}`;
    },
    
    // Get expression URL for a specific state
    getExpressionUrl: (avatar, expression, options = {}) => {
        const config = CDN_CONFIG.avatars[avatar];
        if (!config) return null;
        
        const baseUrl = config.expressions.baseUrl;
        const format = options.format || config.expressions.format || 'png';
        return `${baseUrl}/${avatar}_${expression}.${format}`;
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
        const hasGoodGPU = navigator.gpu || false;
        
        if (isMobile) return 24; // Lower frame rate for mobile
        if (hasHighPerformance && hasGoodGPU) return 60; // High frame rate for powerful devices
        if (hasHighPerformance) return 30; // Standard frame rate for good devices
        return 24; // Default to 24 fps
    },
    
    // Get compression settings for device
    getCompressionSettings: () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (isMobile && connection && connection.effectiveType === 'slow-2g') {
            return { format: 'jpg', quality: 60, maxWidth: 960, maxHeight: 540 };
        } else if (isMobile) {
            return { format: 'webp', quality: 75, maxWidth: 1280, maxHeight: 720 };
        } else {
            return { format: 'webp', quality: 85, maxWidth: 1920, maxHeight: 1080 };
        }
    },
    
    // Performance monitoring
    trackPerformance: (metric, value) => {
        if (CDN_CONFIG.analytics.enabled && CDN_CONFIG.analytics.trackPerformance) {
            // Send performance metric to analytics endpoint
            fetch(CDN_CONFIG.analytics.metricsEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    metric,
                    value,
                    timestamp: Date.now(),
                    userAgent: navigator.userAgent
                })
            }).catch(console.warn);
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CDN_CONFIG, CDN_HELPERS };
} else if (typeof window !== 'undefined') {
    window.CDN_CONFIG = CDN_CONFIG;
    window.CDN_HELPERS = CDN_HELPERS;
}
