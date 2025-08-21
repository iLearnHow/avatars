/**
 * Application Configuration Management
 * Centralized configuration for the synthesis platform
 * @version 1.0.0
 * @author iLearnHow
 */

class Config {
    constructor() {
        this.config = {
            // Claude API Configuration
            claude: {
                apiKey: null,
                model: 'claude-3-5-sonnet-20241022',
                maxTokens: 2000,
                timeout: 30000
            },
            
            // Synthesis Engine Configuration
            synthesis: {
                cacheSize: 1000,
                performanceBudget: 200,
                enableClaudeAPI: true,
                fallbackToTemplates: true
            },
            
            // UI Configuration
            ui: {
                theme: 'light',
                language: 'english',
                accessibility: {
                    highContrast: false,
                    screenReader: false,
                    fontSize: 'medium'
                }
            },
            
            // Performance Configuration
            performance: {
                enableMonitoring: true,
                logLevel: 'info',
                metricsCollection: true
            }
        };
        
        this.initialized = false;
    }

    /**
     * Initialize configuration
     */
    initialize() {
        if (this.initialized) return;
        
        // Load configuration from localStorage if available
        this.loadFromStorage();
        
        // Set default values
        this.setDefaults();
        
        this.initialized = true;
    }

    /**
     * Load configuration from localStorage
     */
    loadFromStorage() {
        if (typeof localStorage === 'undefined') return;
        
        try {
            const stored = localStorage.getItem('ilearnhow-config');
            if (stored) {
                const parsed = JSON.parse(stored);
                this.config = { ...this.config, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load configuration from storage:', error);
        }
    }

    /**
     * Save configuration to localStorage
     */
    saveToStorage() {
        if (typeof localStorage === 'undefined') return;
        
        try {
            localStorage.setItem('ilearnhow-config', JSON.stringify(this.config));
        } catch (error) {
            console.warn('Failed to save configuration to storage:', error);
        }
    }

    /**
     * Set default configuration values
     */
    setDefaults() {
        // Set Claude API key if available in environment
        if (typeof process !== 'undefined' && process.env.CLAUDE_API_KEY) {
            this.config.claude.apiKey = process.env.CLAUDE_API_KEY;
        }
        
        // Set other defaults as needed
        if (!this.config.ui.theme) {
            this.config.ui.theme = 'light';
        }
        
        if (!this.config.ui.language) {
            this.config.ui.language = 'english';
        }
    }

    /**
     * Get configuration value
     * @param {string} key - Configuration key (supports dot notation)
     * @returns {*} Configuration value
     */
    get(key) {
        const keys = key.split('.');
        let value = this.config;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return undefined;
            }
        }
        
        return value;
    }

    /**
     * Set configuration value
     * @param {string} key - Configuration key (supports dot notation)
     * @param {*} value - Configuration value
     */
    set(key, value) {
        const keys = key.split('.');
        const lastKey = keys.pop();
        let target = this.config;
        
        for (const k of keys) {
            if (!target[k] || typeof target[k] !== 'object') {
                target[k] = {};
            }
            target = target[k];
        }
        
        target[lastKey] = value;
        this.saveToStorage();
    }

    /**
     * Set Claude API key
     * @param {string} apiKey - Claude API key
     */
    setClaudeAPIKey(apiKey) {
        this.set('claude.apiKey', apiKey);
    }

    /**
     * Get Claude API key
     * @returns {string|null} Claude API key
     */
    getClaudeAPIKey() {
        return this.get('claude.apiKey');
    }

    /**
     * Check if Claude API is configured
     * @returns {boolean} True if API key is set
     */
    isClaudeAPIConfigured() {
        return !!this.getClaudeAPIKey();
    }

    /**
     * Get all configuration
     * @returns {Object} Complete configuration object
     */
    getAll() {
        return { ...this.config };
    }

    /**
     * Reset configuration to defaults
     */
    reset() {
        this.config = {
            claude: {
                apiKey: null,
                model: 'claude-3-5-sonnet-20241022',
                maxTokens: 2000,
                timeout: 30000
            },
            synthesis: {
                cacheSize: 1000,
                performanceBudget: 200,
                enableClaudeAPI: true,
                fallbackToTemplates: true
            },
            ui: {
                theme: 'light',
                language: 'english',
                accessibility: {
                    highContrast: false,
                    screenReader: false,
                    fontSize: 'medium'
                }
            },
            performance: {
                enableMonitoring: true,
                logLevel: 'info',
                metricsCollection: true
            }
        };
        
        this.saveToStorage();
    }
}

// Export singleton instance
export const config = new Config(); 