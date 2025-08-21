/**
 * Error Handler - Comprehensive Error Management
 * Centralized error handling with recovery mechanisms
 * @author iLearnHow
 * @version 1.0.0
 */

import { Logger } from './logger.js';
import { PerformanceMonitor } from './performance.js';

/**
 * Error Handler Class
 * Provides centralized error handling across the application
 */
export class ErrorHandler {
    constructor() {
        this.logger = new Logger('ErrorHandler');
        this.errorCount = 0;
        this.maxErrors = 100;
        this.errors = [];
        this.recoveryStrategies = new Map();
        this.fallbackHandlers = new Map();
        
        // Initialize default recovery strategies
        this.initializeDefaultStrategies();
        
        // Set up global error handlers
        this.setupGlobalHandlers();
    }

    /**
     * Initialize default recovery strategies
     */
    initializeDefaultStrategies() {
        // Synthesis errors
        this.addRecoveryStrategy('synthesis-failure', (error, context) => {
            return {
                type: 'fallback-content',
                content: this.getFallbackContent(context),
                error: error.message
            };
        });

        // Network errors
        this.addRecoveryStrategy('network-error', (error, context) => {
            return {
                type: 'retry',
                retryCount: 3,
                delay: 1000,
                error: error.message
            };
        });

        // Data loading errors
        this.addRecoveryStrategy('data-load-error', (error, context) => {
            return {
                type: 'fallback-data',
                data: this.getFallbackData(context),
                error: error.message
            };
        });

        // Validation errors
        this.addRecoveryStrategy('validation-error', (error, context) => {
            return {
                type: 'sanitize',
                sanitizedData: this.sanitizeData(context.data),
                error: error.message
            };
        });
    }

    /**
     * Set up global error handlers
     */
    setupGlobalHandlers() {
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, { context: 'unhandled-rejection' });
            event.preventDefault();
        });

        // Handle global errors
        window.addEventListener('error', (event) => {
            this.handleError(event.error, { 
                context: 'global-error',
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });
    }

    /**
     * Handle an error with recovery strategies
     * @param {Error} error - Error object
     * @param {Object} context - Error context
     * @returns {Object} Recovery result
     */
    handleError(error, context = {}) {
        const errorId = this.generateErrorId();
        const timestamp = Date.now();
        
        // Log the error
        this.logger.error(`Error ${errorId}:`, error, context);
        
        // Record error metrics
        this.recordError(error, context, errorId, timestamp);
        
        // Determine error type
        const errorType = this.classifyError(error, context);
        
        // Attempt recovery
        const recoveryResult = this.attemptRecovery(errorType, error, context);
        
        // Update error count
        this.errorCount++;
        
        // Check if we're hitting error limits
        if (this.errorCount > this.maxErrors) {
            this.logger.warn('Maximum error count reached, clearing old errors');
            this.clearOldErrors();
        }
        
        return {
            errorId,
            errorType,
            recoveryResult,
            timestamp,
            handled: true
        };
    }

    /**
     * Classify error based on type and context
     * @param {Error} error - Error object
     * @param {Object} context - Error context
     * @returns {string} Error type
     */
    classifyError(error, context) {
        const message = error.message.toLowerCase();
        const stack = error.stack.toLowerCase();
        
        // Network errors
        if (message.includes('fetch') || message.includes('network') || 
            message.includes('timeout') || message.includes('connection')) {
            return 'network-error';
        }
        
        // Synthesis errors
        if (message.includes('synthesis') || message.includes('synthesize') ||
            context.context === 'synthesis') {
            return 'synthesis-failure';
        }
        
        // Data loading errors
        if (message.includes('load') || message.includes('data') ||
            message.includes('json') || message.includes('parse')) {
            return 'data-load-error';
        }
        
        // Validation errors
        if (message.includes('validation') || message.includes('invalid') ||
            message.includes('required') || message.includes('type')) {
            return 'validation-error';
        }
        
        // Default to generic error
        return 'generic-error';
    }

    /**
     * Attempt recovery based on error type
     * @param {string} errorType - Type of error
     * @param {Error} error - Error object
     * @param {Object} context - Error context
     * @returns {Object} Recovery result
     */
    attemptRecovery(errorType, error, context) {
        const strategy = this.recoveryStrategies.get(errorType);
        
        if (strategy) {
            try {
                return strategy(error, context);
            } catch (recoveryError) {
                this.logger.error('Recovery strategy failed:', recoveryError);
                return this.getFallbackRecovery(error, context);
            }
        }
        
        return this.getFallbackRecovery(error, context);
    }

    /**
     * Add a recovery strategy for an error type
     * @param {string} errorType - Type of error
     * @param {Function} strategy - Recovery strategy function
     */
    addRecoveryStrategy(errorType, strategy) {
        this.recoveryStrategies.set(errorType, strategy);
    }

    /**
     * Add a fallback handler for an error type
     * @param {string} errorType - Type of error
     * @param {Function} handler - Fallback handler function
     */
    addFallbackHandler(errorType, handler) {
        this.fallbackHandlers.set(errorType, handler);
    }

    /**
     * Get fallback recovery when no strategy is available
     * @param {Error} error - Error object
     * @param {Object} context - Error context
     * @returns {Object} Fallback recovery result
     */
    getFallbackRecovery(error, context) {
        return {
            type: 'fallback',
            message: 'Using fallback recovery mechanism',
            error: error.message,
            context
        };
    }

    /**
     * Get fallback content for synthesis failures
     * @param {Object} context - Error context
     * @returns {Object} Fallback content
     */
    getFallbackContent(context) {
        return {
            title: 'Learning Content',
            introduction: 'Welcome to today\'s lesson. We\'re here to learn together.',
            concept: 'Today we\'ll explore an important concept that will help you grow.',
            examples: 'Think about how this applies to your daily life.',
            reflection: 'What did you learn today?',
            metadata: {
                isFallback: true,
                fallbackReason: context.error || 'Unknown error',
                timestamp: Date.now()
            }
        };
    }

    /**
     * Get fallback data for data loading failures
     * @param {Object} context - Error context
     * @returns {Object} Fallback data
     */
    getFallbackData(context) {
        return {
            title: 'The Sun - Our Magnificent Life-Giving Star',
            concept: 'The sun is the center of our solar system and provides energy for life on Earth.',
            examples: [
                'Plants use sunlight to make food through photosynthesis',
                'Solar panels convert sunlight into electricity',
                'The sun\'s gravity keeps planets in orbit'
            ],
            reflection: 'How does the sun affect your daily life?',
            isFallback: true
        };
    }

    /**
     * Sanitize data for validation errors
     * @param {*} data - Data to sanitize
     * @returns {*} Sanitized data
     */
    sanitizeData(data) {
        if (typeof data === 'string') {
            return data.trim().replace(/[<>]/g, '');
        }
        
        if (typeof data === 'object' && data !== null) {
            const sanitized = {};
            for (const [key, value] of Object.entries(data)) {
                sanitized[key] = this.sanitizeData(value);
            }
            return sanitized;
        }
        
        return data;
    }

    /**
     * Record error for monitoring
     * @param {Error} error - Error object
     * @param {Object} context - Error context
     * @param {string} errorId - Error ID
     * @param {number} timestamp - Error timestamp
     */
    recordError(error, context, errorId, timestamp) {
        const errorRecord = {
            id: errorId,
            message: error.message,
            stack: error.stack,
            context,
            timestamp,
            type: this.classifyError(error, context)
        };
        
        this.errors.push(errorRecord);
        
        // Keep only recent errors
        if (this.errors.length > this.maxErrors) {
            this.errors = this.errors.slice(-this.maxErrors);
        }
    }

    /**
     * Generate unique error ID
     * @returns {string} Error ID
     */
    generateErrorId() {
        return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Clear old errors
     */
    clearOldErrors() {
        const cutoff = Date.now() - (60 * 60 * 1000); // 1 hour ago
        this.errors = this.errors.filter(error => error.timestamp > cutoff);
        this.errorCount = this.errors.length;
    }

    /**
     * Get error statistics
     * @returns {Object} Error statistics
     */
    getErrorStats() {
        const errorTypes = {};
        this.errors.forEach(error => {
            errorTypes[error.type] = (errorTypes[error.type] || 0) + 1;
        });
        
        return {
            totalErrors: this.errorCount,
            recentErrors: this.errors.length,
            errorTypes,
            lastError: this.errors[this.errors.length - 1] || null
        };
    }

    /**
     * Get recent errors
     * @param {number} count - Number of errors to return
     * @returns {Array} Recent errors
     */
    getRecentErrors(count = 10) {
        return this.errors.slice(-count);
    }

    /**
     * Reset error handler
     */
    reset() {
        this.errors = [];
        this.errorCount = 0;
        this.logger.info('Error handler reset complete');
    }
}

/**
 * Error Boundary Component
 * React-like error boundary for catching component errors
 */
export class ErrorBoundary {
    constructor() {
        this.hasError = false;
        this.error = null;
        this.errorInfo = null;
    }

    /**
     * Catch errors in component execution
     * @param {Function} componentFn - Component function to execute
     * @param {Object} props - Component props
     * @returns {Object} Component result or error fallback
     */
    catchErrors(componentFn, props = {}) {
        try {
            this.hasError = false;
            this.error = null;
            this.errorInfo = null;
            
            return componentFn(props);
        } catch (error) {
            this.hasError = true;
            this.error = error;
            this.errorInfo = error.stack;
            
            return this.getErrorFallback(error);
        }
    }

    /**
     * Get error fallback UI
     * @param {Error} error - Error object
     * @returns {Object} Error fallback
     */
    getErrorFallback(error) {
        return {
            type: 'error-fallback',
            title: 'Something went wrong',
            message: 'We\'re working to fix this issue. Please try refreshing the page.',
            error: error.message,
            action: 'Refresh Page',
            actionHandler: () => window.location.reload()
        };
    }

    /**
     * Check if boundary has error
     * @returns {boolean} Whether boundary has error
     */
    hasCaughtError() {
        return this.hasError;
    }

    /**
     * Get caught error
     * @returns {Error|null} Caught error
     */
    getCaughtError() {
        return this.error;
    }

    /**
     * Reset error boundary
     */
    reset() {
        this.hasError = false;
        this.error = null;
        this.errorInfo = null;
    }
}

/**
 * Error Utility Functions
 */

/**
 * Create a safe function wrapper
 * @param {Function} fn - Function to wrap
 * @param {Function} errorHandler - Error handler function
 * @returns {Function} Safe function wrapper
 */
export function createSafeFunction(fn, errorHandler = null) {
    return function(...args) {
        try {
            return fn.apply(this, args);
        } catch (error) {
            if (errorHandler) {
                return errorHandler(error, args);
            }
            throw error;
        }
    };
}

/**
 * Create a safe async function wrapper
 * @param {Function} fn - Async function to wrap
 * @param {Function} errorHandler - Error handler function
 * @returns {Function} Safe async function wrapper
 */
export function createSafeAsyncFunction(fn, errorHandler = null) {
    return async function(...args) {
        try {
            return await fn.apply(this, args);
        } catch (error) {
            if (errorHandler) {
                return errorHandler(error, args);
            }
            throw error;
        }
    };
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Function result
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            
            if (attempt === maxRetries) {
                throw error;
            }
            
            const delay = baseDelay * Math.pow(2, attempt);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError;
}

/**
 * Validate data with error handling
 * @param {*} data - Data to validate
 * @param {Function} validator - Validation function
 * @param {string} errorMessage - Error message
 * @returns {*} Validated data
 */
export function validateWithErrorHandling(data, validator, errorMessage = 'Validation failed') {
    try {
        const isValid = validator(data);
        if (!isValid) {
            throw new Error(errorMessage);
        }
        return data;
    } catch (error) {
        throw new Error(`${errorMessage}: ${error.message}`);
    }
}

// Create global error handler instance
export const globalErrorHandler = new ErrorHandler(); 