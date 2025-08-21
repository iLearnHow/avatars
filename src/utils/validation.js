/**
 * Validation Utility - Comprehensive Input Validation
 * Centralized validation and sanitization for all inputs
 * @author iLearnHow
 * @version 1.0.0
 */

import { Logger } from './logger.js';

/**
 * Validation Rules
 * Predefined validation rules for common use cases
 */
export const ValidationRules = {
    // Age validation
    age: {
        min: 5,
        max: 65,
        type: 'number',
        required: true
    },
    
    // Day validation
    day: {
        min: 1,
        max: 366,
        type: 'number',
        required: true
    },
    
    // Tone validation
    tone: {
        values: ['grandmother', 'fun', 'neutral'],
        type: 'string',
        required: true
    },
    
    // Language validation
    language: {
        values: ['english', 'spanish', 'french'],
        type: 'string',
        required: true
    },
    
    // Email validation
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        type: 'string',
        required: true
    },
    
    // URL validation
    url: {
        pattern: /^https?:\/\/.+/,
        type: 'string',
        required: false
    },
    
    // Text validation
    text: {
        minLength: 1,
        maxLength: 1000,
        type: 'string',
        required: true
    }
};

/**
 * Validation Error Class
 * Custom error class for validation failures
 */
export class ValidationError extends Error {
    constructor(message, field, value, rule) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.value = value;
        this.rule = rule;
        this.timestamp = Date.now();
    }
}

/**
 * Validator Class
 * Main validation class with comprehensive validation methods
 */
export class Validator {
    constructor(options = {}) {
        this.logger = new Logger('Validator');
        this.strict = options.strict !== false;
        this.autoSanitize = options.autoSanitize !== false;
        this.validationCache = new Map();
    }

    /**
     * Validate a single value against a rule
     * @param {*} value - Value to validate
     * @param {Object} rule - Validation rule
     * @param {string} fieldName - Field name for error reporting
     * @returns {Object} Validation result
     */
    validateValue(value, rule, fieldName = 'field') {
        const result = {
            valid: true,
            errors: [],
            sanitized: value
        };

        try {
            // Check if value is required
            if (rule.required && (value === null || value === undefined || value === '')) {
                result.valid = false;
                result.errors.push(new ValidationError(
                    `${fieldName} is required`,
                    fieldName,
                    value,
                    rule
                ));
                return result;
            }

            // Skip validation if value is not required and empty
            if (!rule.required && (value === null || value === undefined || value === '')) {
                return result;
            }

            // Type validation
            if (rule.type && !this.validateType(value, rule.type)) {
                result.valid = false;
                result.errors.push(new ValidationError(
                    `${fieldName} must be of type ${rule.type}`,
                    fieldName,
                    value,
                    rule
                ));
            }

            // Range validation for numbers
            if (rule.type === 'number' && typeof value === 'number') {
                if (rule.min !== undefined && value < rule.min) {
                    result.valid = false;
                    result.errors.push(new ValidationError(
                        `${fieldName} must be at least ${rule.min}`,
                        fieldName,
                        value,
                        rule
                    ));
                }
                
                if (rule.max !== undefined && value > rule.max) {
                    result.valid = false;
                    result.errors.push(new ValidationError(
                        `${fieldName} must be at most ${rule.max}`,
                        fieldName,
                        value,
                        rule
                    ));
                }
            }

            // Length validation for strings
            if (rule.type === 'string' && typeof value === 'string') {
                if (rule.minLength !== undefined && value.length < rule.minLength) {
                    result.valid = false;
                    result.errors.push(new ValidationError(
                        `${fieldName} must be at least ${rule.minLength} characters long`,
                        fieldName,
                        value,
                        rule
                    ));
                }
                
                if (rule.maxLength !== undefined && value.length > rule.maxLength) {
                    result.valid = false;
                    result.errors.push(new ValidationError(
                        `${fieldName} must be at most ${rule.maxLength} characters long`,
                        fieldName,
                        value,
                        rule
                    ));
                }
            }

            // Enum validation
            if (rule.values && !rule.values.includes(value)) {
                result.valid = false;
                result.errors.push(new ValidationError(
                    `${fieldName} must be one of: ${rule.values.join(', ')}`,
                    fieldName,
                    value,
                    rule
                ));
            }

            // Pattern validation
            if (rule.pattern && !rule.pattern.test(value)) {
                result.valid = false;
                result.errors.push(new ValidationError(
                    `${fieldName} format is invalid`,
                    fieldName,
                    value,
                    rule
                ));
            }

            // Custom validation function
            if (rule.validate && typeof rule.validate === 'function') {
                try {
                    const customResult = rule.validate(value, fieldName);
                    if (customResult !== true) {
                        result.valid = false;
                        result.errors.push(new ValidationError(
                            customResult || `${fieldName} validation failed`,
                            fieldName,
                            value,
                            rule
                        ));
                    }
                } catch (error) {
                    result.valid = false;
                    result.errors.push(new ValidationError(
                        `Custom validation failed for ${fieldName}: ${error.message}`,
                        fieldName,
                        value,
                        rule
                    ));
                }
            }

            // Sanitize value if validation passed and auto-sanitize is enabled
            if (result.valid && this.autoSanitize && rule.sanitize) {
                result.sanitized = this.sanitizeValue(value, rule);
            }

        } catch (error) {
            result.valid = false;
            result.errors.push(new ValidationError(
                `Validation error for ${fieldName}: ${error.message}`,
                fieldName,
                value,
                rule
            ));
        }

        return result;
    }

    /**
     * Validate type of value
     * @param {*} value - Value to check
     * @param {string} type - Expected type
     * @returns {boolean} Whether type is valid
     */
    validateType(value, type) {
        switch (type) {
            case 'string':
                return typeof value === 'string';
            case 'number':
                return typeof value === 'number' && !isNaN(value);
            case 'boolean':
                return typeof value === 'boolean';
            case 'object':
                return typeof value === 'object' && value !== null;
            case 'array':
                return Array.isArray(value);
            case 'function':
                return typeof value === 'function';
            default:
                return true;
        }
    }

    /**
     * Sanitize value based on rule
     * @param {*} value - Value to sanitize
     * @param {Object} rule - Validation rule
     * @returns {*} Sanitized value
     */
    sanitizeValue(value, rule) {
        if (rule.sanitize && typeof rule.sanitize === 'function') {
            return rule.sanitize(value);
        }

        // Default sanitization based on type
        if (rule.type === 'string' && typeof value === 'string') {
            let sanitized = value.trim();
            
            // Remove HTML tags
            sanitized = sanitized.replace(/<[^>]*>/g, '');
            
            // Escape special characters
            sanitized = sanitized.replace(/[<>]/g, '');
            
            return sanitized;
        }

        if (rule.type === 'number' && typeof value === 'number') {
            return isNaN(value) ? 0 : value;
        }

        return value;
    }

    /**
     * Validate an object against a schema
     * @param {Object} data - Data to validate
     * @param {Object} schema - Validation schema
     * @returns {Object} Validation result
     */
    validateObject(data, schema) {
        const result = {
            valid: true,
            errors: [],
            sanitized: {}
        };

        // Validate each field in the schema
        for (const [fieldName, rule] of Object.entries(schema)) {
            const value = data[fieldName];
            const fieldResult = this.validateValue(value, rule, fieldName);
            
            if (!fieldResult.valid) {
                result.valid = false;
                result.errors.push(...fieldResult.errors);
            }
            
            result.sanitized[fieldName] = fieldResult.sanitized;
        }

        // Check for extra fields if strict mode is enabled
        if (this.strict) {
            for (const fieldName of Object.keys(data)) {
                if (!schema[fieldName]) {
                    result.valid = false;
                    result.errors.push(new ValidationError(
                        `Unexpected field: ${fieldName}`,
                        fieldName,
                        data[fieldName],
                        { type: 'strict' }
                    ));
                }
            }
        }

        return result;
    }

    /**
     * Validate synthesis parameters
     * @param {Object} parameters - Synthesis parameters
     * @returns {Object} Validation result
     */
    validateSynthesisParameters(parameters) {
        const schema = {
            day: ValidationRules.day,
            age: ValidationRules.age,
            tone: ValidationRules.tone,
            language: ValidationRules.language
        };

        return this.validateObject(parameters, schema);
    }

    /**
     * Validate curriculum data
     * @param {Object} data - Curriculum data
     * @returns {Object} Validation result
     */
    validateCurriculumData(data) {
        const schema = {
            title: { ...ValidationRules.text, maxLength: 200 },
            concept: { ...ValidationRules.text, maxLength: 500 },
            examples: {
                type: 'array',
                required: true,
                validate: (value) => {
                    if (!Array.isArray(value) || value.length === 0) {
                        return 'Examples must be a non-empty array';
                    }
                    return true;
                }
            },
            reflection: { ...ValidationRules.text, maxLength: 300 }
        };

        return this.validateObject(data, schema);
    }

    /**
     * Create a custom validation rule
     * @param {Object} rule - Rule definition
     * @returns {Object} Validation rule
     */
    createRule(rule) {
        return {
            type: 'string',
            required: false,
            ...rule
        };
    }

    /**
     * Add a custom validation rule to the cache
     * @param {string} name - Rule name
     * @param {Object} rule - Rule definition
     */
    addCachedRule(name, rule) {
        this.validationCache.set(name, this.createRule(rule));
    }

    /**
     * Get a cached validation rule
     * @param {string} name - Rule name
     * @returns {Object|null} Cached rule
     */
    getCachedRule(name) {
        return this.validationCache.get(name) || null;
    }

    /**
     * Clear validation cache
     */
    clearCache() {
        this.validationCache.clear();
    }
}

/**
 * Sanitizer Class
 * Specialized class for data sanitization
 */
export class Sanitizer {
    constructor() {
        this.logger = new Logger('Sanitizer');
    }

    /**
     * Sanitize HTML content
     * @param {string} html - HTML content to sanitize
     * @returns {string} Sanitized HTML
     */
    sanitizeHtml(html) {
        if (typeof html !== 'string') {
            return '';
        }

        // Remove script tags and event handlers
        let sanitized = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/vbscript:/gi, '');

        // Remove potentially dangerous attributes
        sanitized = sanitized.replace(/\s*(?:on\w+|javascript|vbscript)\s*=\s*["'][^"']*["']/gi, '');

        return sanitized;
    }

    /**
     * Sanitize text content
     * @param {string} text - Text to sanitize
     * @returns {string} Sanitized text
     */
    sanitizeText(text) {
        if (typeof text !== 'string') {
            return '';
        }

        return text
            .trim()
            .replace(/[<>]/g, '')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    }

    /**
     * Sanitize URL
     * @param {string} url - URL to sanitize
     * @returns {string} Sanitized URL
     */
    sanitizeUrl(url) {
        if (typeof url !== 'string') {
            return '';
        }

        const sanitized = url.trim();
        
        // Only allow http and https protocols
        if (!/^https?:\/\//.test(sanitized)) {
            return '';
        }

        return sanitized;
    }

    /**
     * Sanitize email
     * @param {string} email - Email to sanitize
     * @returns {string} Sanitized email
     */
    sanitizeEmail(email) {
        if (typeof email !== 'string') {
            return '';
        }

        return email.trim().toLowerCase();
    }

    /**
     * Sanitize object recursively
     * @param {Object} obj - Object to sanitize
     * @param {Object} schema - Sanitization schema
     * @returns {Object} Sanitized object
     */
    sanitizeObject(obj, schema = {}) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }

        const sanitized = {};

        for (const [key, value] of Object.entries(obj)) {
            const fieldSchema = schema[key];
            
            if (fieldSchema) {
                sanitized[key] = this.sanitizeValue(value, fieldSchema);
            } else {
                sanitized[key] = this.sanitizeValue(value);
            }
        }

        return sanitized;
    }

    /**
     * Sanitize value based on type
     * @param {*} value - Value to sanitize
     * @param {Object} schema - Field schema
     * @returns {*} Sanitized value
     */
    sanitizeValue(value, schema = {}) {
        if (value === null || value === undefined) {
            return value;
        }

        switch (schema.type) {
            case 'string':
                return this.sanitizeText(value);
            case 'html':
                return this.sanitizeHtml(value);
            case 'url':
                return this.sanitizeUrl(value);
            case 'email':
                return this.sanitizeEmail(value);
            case 'number':
                return typeof value === 'number' ? value : parseFloat(value) || 0;
            case 'boolean':
                return Boolean(value);
            case 'array':
                return Array.isArray(value) ? value.map(item => this.sanitizeValue(item)) : [];
            case 'object':
                return this.sanitizeObject(value, schema.properties);
            default:
                return value;
        }
    }
}

/**
 * Validation Utility Functions
 */

/**
 * Create a validator instance
 * @param {Object} options - Validator options
 * @returns {Validator} Validator instance
 */
export function createValidator(options = {}) {
    return new Validator(options);
}

/**
 * Create a sanitizer instance
 * @returns {Sanitizer} Sanitizer instance
 */
export function createSanitizer() {
    return new Sanitizer();
}

/**
 * Quick validation function
 * @param {*} value - Value to validate
 * @param {Object} rule - Validation rule
 * @returns {boolean} Whether value is valid
 */
export function isValid(value, rule) {
    const validator = new Validator();
    const result = validator.validateValue(value, rule);
    return result.valid;
}

/**
 * Quick sanitization function
 * @param {*} value - Value to sanitize
 * @param {string} type - Value type
 * @returns {*} Sanitized value
 */
export function sanitize(value, type = 'string') {
    const sanitizer = new Sanitizer();
    return sanitizer.sanitizeValue(value, { type });
}

/**
 * Validate and sanitize in one operation
 * @param {*} value - Value to validate and sanitize
 * @param {Object} rule - Validation rule
 * @returns {Object} Result with validation and sanitized value
 */
export function validateAndSanitize(value, rule) {
    const validator = new Validator({ autoSanitize: true });
    return validator.validateValue(value, rule);
}

// Create global validator and sanitizer instances
export const globalValidator = new Validator();
export const globalSanitizer = new Sanitizer(); 