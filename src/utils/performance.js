/**
 * Performance Utility - Global Performance Monitoring
 * Centralized performance tracking and optimization utilities
 * @author iLearnHow
 * @version 1.0.0
 */

/**
 * Global Performance Monitor
 * Provides centralized performance tracking across the application
 */
export class PerformanceMonitor {
    constructor() {
        this.marks = new Map();
        this.measures = new Map();
        this.observers = [];
        this.enabled = true;
    }

    /**
     * Mark a performance point
     * @param {string} name - Mark name
     * @param {Object} options - Mark options
     */
    static mark(name, options = {}) {
        if (!this.enabled) return;
        
        try {
            performance.mark(name, options);
            this.marks.set(name, {
                timestamp: performance.now(),
                options
            });
        } catch (error) {
            console.warn(`Failed to mark performance: ${name}`, error);
        }
    }

    /**
     * Measure performance between marks
     * @param {string} name - Measure name
     * @param {string} startMark - Start mark name
     * @param {string} endMark - End mark name
     * @param {Object} options - Measure options
     */
    static measure(name, startMark, endMark, options = {}) {
        if (!this.enabled) return;
        
        try {
            performance.measure(name, startMark, endMark, options);
            this.measures.set(name, {
                startMark,
                endMark,
                options,
                timestamp: performance.now()
            });
        } catch (error) {
            console.warn(`Failed to measure performance: ${name}`, error);
        }
    }

    /**
     * Get performance entry by name
     * @param {string} name - Entry name
     * @returns {PerformanceEntry|undefined} Performance entry
     */
    static getEntry(name) {
        return performance.getEntriesByName(name)[0];
    }

    /**
     * Get all performance entries
     * @returns {PerformanceEntryList} All performance entries
     */
    static getAllEntries() {
        return performance.getEntries();
    }

    /**
     * Clear performance entries
     * @param {string} name - Entry name to clear (optional)
     */
    static clearEntries(name) {
        if (name) {
            performance.clearMarks(name);
            performance.clearMeasures(name);
        } else {
            performance.clearMarks();
            performance.clearMeasures();
        }
    }

    /**
     * Enable/disable performance monitoring
     * @param {boolean} enabled - Whether to enable monitoring
     */
    static setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Check if performance monitoring is enabled
     * @returns {boolean} Whether monitoring is enabled
     */
    static isEnabled() {
        return this.enabled;
    }
}

/**
 * Performance Timer
 * Utility for timing operations with automatic cleanup
 */
export class PerformanceTimer {
    constructor(name) {
        this.name = name;
        this.startTime = null;
        this.endTime = null;
        this.duration = null;
    }

    /**
     * Start the timer
     */
    start() {
        this.startTime = performance.now();
        PerformanceMonitor.mark(`${this.name}-start`);
    }

    /**
     * End the timer
     */
    end() {
        this.endTime = performance.now();
        this.duration = this.endTime - this.startTime;
        PerformanceMonitor.mark(`${this.name}-end`);
        PerformanceMonitor.measure(`${this.name}-duration`, `${this.name}-start`, `${this.name}-end`);
        return this.duration;
    }

    /**
     * Get the duration
     * @returns {number} Duration in milliseconds
     */
    getDuration() {
        return this.duration;
    }

    /**
     * Get formatted duration
     * @returns {string} Formatted duration string
     */
    getFormattedDuration() {
        if (this.duration === null) return 'Not measured';
        
        if (this.duration < 1) {
            return `${(this.duration * 1000).toFixed(2)}μs`;
        } else if (this.duration < 1000) {
            return `${this.duration.toFixed(2)}ms`;
        } else {
            return `${(this.duration / 1000).toFixed(2)}s`;
        }
    }
}

/**
 * Performance Budget Checker
 * Validates performance against defined budgets
 */
export class PerformanceBudgetChecker {
    constructor(budgets = {}) {
        this.budgets = {
            synthesis: 200,
            cacheHit: 10,
            parameterChange: 50,
            initialLoad: 3000,
            ...budgets
        };
    }

    /**
     * Check if performance meets budget
     * @param {string} operation - Operation name
     * @param {number} duration - Duration in milliseconds
     * @returns {Object} Budget check result
     */
    check(operation, duration) {
        const budget = this.budgets[operation];
        
        if (!budget) {
            return {
                operation,
                duration,
                budget: null,
                compliant: true,
                margin: null,
                percentage: null
            };
        }

        const compliant = duration <= budget;
        const margin = budget - duration;
        const percentage = (duration / budget) * 100;

        return {
            operation,
            duration,
            budget,
            compliant,
            margin,
            percentage
        };
    }

    /**
     * Set budget for operation
     * @param {string} operation - Operation name
     * @param {number} budget - Budget in milliseconds
     */
    setBudget(operation, budget) {
        this.budgets[operation] = budget;
    }

    /**
     * Get all budgets
     * @returns {Object} All budgets
     */
    getBudgets() {
        return { ...this.budgets };
    }
}

/**
 * Performance Observer
 * Observes performance metrics and triggers callbacks
 */
export class PerformanceObserver {
    constructor(callback, options = {}) {
        this.callback = callback;
        this.options = {
            entryTypes: ['measure', 'mark'],
            ...options
        };
        this.observer = null;
        this.isObserving = false;
    }

    /**
     * Start observing
     */
    start() {
        if (this.isObserving) return;

        try {
            this.observer = new window.PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.callback(entry);
                });
            });

            this.observer.observe(this.options);
            this.isObserving = true;
        } catch (error) {
            console.warn('PerformanceObserver not supported:', error);
        }
    }

    /**
     * Stop observing
     */
    stop() {
        if (this.observer && this.isObserving) {
            this.observer.disconnect();
            this.isObserving = false;
        }
    }
}

/**
 * Performance Reporter
 * Generates performance reports
 */
export class PerformanceReporter {
    /**
     * Generate comprehensive performance report
     * @returns {Object} Performance report
     */
    static generateReport() {
        const entries = PerformanceMonitor.getAllEntries();
        const measures = entries.filter(entry => entry.entryType === 'measure');
        const marks = entries.filter(entry => entry.entryType === 'mark');

        const report = {
            timestamp: Date.now(),
            summary: {
                totalEntries: entries.length,
                totalMeasures: measures.length,
                totalMarks: marks.length
            },
            measures: measures.map(measure => ({
                name: measure.name,
                duration: measure.duration,
                startTime: measure.startTime,
                endTime: measure.endTime
            })),
            marks: marks.map(mark => ({
                name: mark.name,
                startTime: mark.startTime
            })),
            statistics: this.calculateStatistics(measures)
        };

        return report;
    }

    /**
     * Calculate performance statistics
     * @param {Array} measures - Performance measures
     * @returns {Object} Statistics
     */
    static calculateStatistics(measures) {
        if (measures.length === 0) {
            return {
                average: 0,
                min: 0,
                max: 0,
                total: 0,
                count: 0
            };
        }

        const durations = measures.map(m => m.duration);
        const total = durations.reduce((sum, duration) => sum + duration, 0);
        const average = total / durations.length;
        const min = Math.min(...durations);
        const max = Math.max(...durations);

        return {
            average,
            min,
            max,
            total,
            count: durations.length
        };
    }

    /**
     * Export performance data
     * @returns {Object} Exportable performance data
     */
    static export() {
        return {
            report: this.generateReport(),
            marks: Array.from(PerformanceMonitor.marks.entries()),
            measures: Array.from(PerformanceMonitor.measures.entries())
        };
    }
}

/**
 * Performance Decorator
 * Decorates functions with performance monitoring
 */
export function performanceDecorator(operationName, budget = null) {
    return function(target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function(...args) {
            const timer = new PerformanceTimer(operationName);
            timer.start();

            try {
                const result = await originalMethod.apply(this, args);
                timer.end();
                
                if (budget) {
                    const checker = new PerformanceBudgetChecker({ [operationName]: budget });
                    const check = checker.check(operationName, timer.getDuration());
                    
                    if (!check.compliant) {
                        console.warn(`Performance budget exceeded for ${operationName}:`, check);
                    }
                }

                return result;
            } catch (error) {
                timer.end();
                throw error;
            }
        };

        return descriptor;
    };
}

/**
 * Performance Utility Functions
 */

/**
 * Time a function execution
 * @param {Function} fn - Function to time
 * @param {string} name - Operation name
 * @returns {Promise<Object>} Timing result
 */
export async function timeFunction(fn, name = 'function') {
    const timer = new PerformanceTimer(name);
    timer.start();
    
    try {
        const result = await fn();
        const duration = timer.end();
        
        return {
            result,
            duration,
            formattedDuration: timer.getFormattedDuration()
        };
    } catch (error) {
        timer.end();
        throw error;
    }
}

/**
 * Debounce function with performance tracking
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(fn, delay) {
    let timeoutId;
    let lastCallTime = 0;
    
    return function(...args) {
        const now = performance.now();
        const timeSinceLastCall = now - lastCallTime;
        
        clearTimeout(timeoutId);
        
        if (timeSinceLastCall > delay) {
            lastCallTime = now;
            return fn.apply(this, args);
        }
        
        timeoutId = setTimeout(() => {
            lastCallTime = performance.now();
            fn.apply(this, args);
        }, delay);
    };
}

/**
 * Throttle function with performance tracking
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(fn, limit) {
    let inThrottle;
    let lastCallTime = 0;
    
    return function(...args) {
        const now = performance.now();
        
        if (!inThrottle) {
            lastCallTime = now;
            inThrottle = true;
            fn.apply(this, args);
            
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        } else if (now - lastCallTime >= limit) {
            lastCallTime = now;
            fn.apply(this, args);
        }
    };
}

// Initialize global performance monitor
PerformanceMonitor.enabled = true; 