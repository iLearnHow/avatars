/**
 * Performance Monitor - Synthesis Performance Tracking
 * Real-time monitoring and optimization of synthesis performance
 * @author iLearnHow
 * @version 1.0.0
 */

import { Logger } from '../../utils/logger.js';

export class PerformanceMonitor {
    constructor() {
        console.log('DEBUG: PerformanceMonitor constructor starting...');
        try {
            this.logger = new Logger('SynthesisPerformanceMonitor');
            console.log('DEBUG: Logger created successfully');
        } catch (error) {
            console.error('DEBUG: Error creating Logger:', error);
            throw error;
        }
        
        // Performance metrics storage
        this.metrics = {
            synthesisTimes: [],
            cacheHits: [],
            cacheMisses: [],
            errors: [],
            performanceIssues: []
        };
        
        // Performance thresholds (in milliseconds)
        this.thresholds = {
            synthesis: 200,
            cacheHit: 10,
            dnaLoad: 50,
            ageContextualization: 30,
            toneSynthesis: 40,
            contentGeneration: 80
        };
        
        // Performance budgets
        this.budgets = {
            synthesis: 200,
            cacheHit: 10,
            parameterChange: 50,
            initialLoad: 3000
        };
        
        // Statistics
        this.stats = {
            totalSyntheses: 0,
            totalCacheHits: 0,
            totalCacheMisses: 0,
            totalErrors: 0,
            averageSynthesisTime: 0,
            averageCacheHitTime: 0,
            cacheHitRate: 0,
            performanceIssues: 0
        };
        
        // Alert system
        this.alerts = [];
        this.maxAlerts = 100;
        
        // Initialization state
        this.isInitialized = false;
    }

    /**
     * Initialize the performance monitor
     */
    async initialize() {
        console.log('DEBUG: PerformanceMonitor.initialize() starting...');
        try {
            this.logger.info('Initializing performance monitor');
            console.log('DEBUG: First logger call successful');
            this.isInitialized = true;
            console.log('DEBUG: isInitialized set to true');
            this.logger.info('Performance monitor initialized successfully');
            console.log('DEBUG: Second logger call successful');
            console.log('DEBUG: PerformanceMonitor.initialize() completed successfully');
        } catch (error) {
            console.error('DEBUG: Error in PerformanceMonitor.initialize():', error);
            throw error;
        }
    }

    /**
     * Check if the performance monitor is ready
     * @returns {boolean} True if ready
     */
    isReady() {
        return this.isInitialized;
    }

    /**
     * Get the current status of the performance monitor
     * @returns {Object} Status object
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            stats: this.getStats(),
            cacheHitRate: this.getCacheHitRate(),
            recentAlerts: this.getRecentAlerts(5),
            budgetCompliance: this.checkBudgetCompliance()
        };
    }

    /**
     * Shutdown the performance monitor
     */
    async shutdown() {
        this.logger.info('Shutting down performance monitor');
        this.isInitialized = false;
        this.logger.info('Performance monitor shutdown complete');
    }

    /**
     * Record synthesis performance
     * @param {number} synthesisTime - Synthesis time in milliseconds
     * @param {Object} metadata - Additional metadata
     */
    recordSynthesis(synthesisTime, metadata = {}) {
        this.metrics.synthesisTimes.push({
            time: synthesisTime,
            timestamp: Date.now(),
            metadata
        });
        
        this.stats.totalSyntheses++;
        this.updateAverageSynthesisTime();
        
        // Check for performance issues
        if (synthesisTime > this.thresholds.synthesis) {
            this.recordPerformanceIssue('synthesis-time-exceeded', synthesisTime, metadata);
        }
        
        // Keep only recent metrics (last 1000 entries)
        if (this.metrics.synthesisTimes.length > 1000) {
            this.metrics.synthesisTimes = this.metrics.synthesisTimes.slice(-1000);
        }
    }

    /**
     * Record cache hit performance
     * @param {number} cacheTime - Cache hit time in milliseconds
     * @param {Object} metadata - Additional metadata
     */
    recordCacheHit(cacheTime, metadata = {}) {
        this.metrics.cacheHits.push({
            time: cacheTime,
            timestamp: Date.now(),
            metadata
        });
        
        this.stats.totalCacheHits++;
        this.updateCacheHitRate();
        this.updateAverageCacheHitTime();
        
        // Check for performance issues
        if (cacheTime > this.thresholds.cacheHit) {
            this.recordPerformanceIssue('cache-hit-time-exceeded', cacheTime, metadata);
        }
        
        // Keep only recent metrics
        if (this.metrics.cacheHits.length > 1000) {
            this.metrics.cacheHits = this.metrics.cacheHits.slice(-1000);
        }
    }

    /**
     * Record cache miss
     * @param {Object} metadata - Additional metadata
     */
    recordCacheMiss(metadata = {}) {
        this.metrics.cacheMisses.push({
            timestamp: Date.now(),
            metadata
        });
        
        this.stats.totalCacheMisses++;
        this.updateCacheHitRate();
        
        // Keep only recent metrics
        if (this.metrics.cacheMisses.length > 1000) {
            this.metrics.cacheMisses = this.metrics.cacheMisses.slice(-1000);
        }
    }

    /**
     * Record error
     * @param {Error} error - Error object
     * @param {Object} metadata - Additional metadata
     */
    recordError(error, metadata = {}) {
        this.metrics.errors.push({
            error: error.message,
            stack: error.stack,
            timestamp: Date.now(),
            metadata
        });
        
        this.stats.totalErrors++;
        
        // Keep only recent errors
        if (this.metrics.errors.length > 100) {
            this.metrics.errors = this.metrics.errors.slice(-100);
        }
    }

    /**
     * Record performance issue
     * @param {string} issueType - Type of performance issue
     * @param {number} value - Performance value that triggered the issue
     * @param {Object} metadata - Additional metadata
     */
    recordPerformanceIssue(issueType, value, metadata = {}) {
        const issue = {
            type: issueType,
            value,
            threshold: this.thresholds[issueType.replace('-time-exceeded', '')] || 'unknown',
            timestamp: Date.now(),
            metadata
        };
        
        this.metrics.performanceIssues.push(issue);
        this.stats.performanceIssues++;
        
        // Add to alerts
        this.addAlert({
            level: 'warning',
            message: `Performance issue: ${issueType} (${value}ms > ${issue.threshold}ms)`,
            data: issue
        });
        
        this.logger.warn(`Performance issue detected: ${issueType}`, issue);
        
        // Keep only recent issues
        if (this.metrics.performanceIssues.length > 100) {
            this.metrics.performanceIssues = this.metrics.performanceIssues.slice(-100);
        }
    }

    /**
     * Update average synthesis time
     */
    updateAverageSynthesisTime() {
        if (this.metrics.synthesisTimes.length === 0) return;
        
        const total = this.metrics.synthesisTimes.reduce((sum, entry) => sum + entry.time, 0);
        this.stats.averageSynthesisTime = total / this.metrics.synthesisTimes.length;
    }

    /**
     * Update average cache hit time
     */
    updateAverageCacheHitTime() {
        if (this.metrics.cacheHits.length === 0) return;
        
        const total = this.metrics.cacheHits.reduce((sum, entry) => sum + entry.time, 0);
        this.stats.averageCacheHitTime = total / this.metrics.cacheHits.length;
    }

    /**
     * Update cache hit rate
     */
    updateCacheHitRate() {
        const totalRequests = this.stats.totalCacheHits + this.stats.totalCacheMisses;
        if (totalRequests === 0) return;
        
        this.stats.cacheHitRate = this.stats.totalCacheHits / totalRequests;
    }

    /**
     * Add alert
     * @param {Object} alert - Alert object
     */
    addAlert(alert) {
        this.alerts.push({
            ...alert,
            id: Date.now() + Math.random(),
            timestamp: Date.now()
        });
        
        // Keep only recent alerts
        if (this.alerts.length > this.maxAlerts) {
            this.alerts = this.alerts.slice(-this.maxAlerts);
        }
    }

    /**
     * Get performance metrics
     * @returns {Object} Current performance metrics
     */
    getMetrics() {
        return {
            current: {
                synthesisTimes: this.metrics.synthesisTimes.slice(-10), // Last 10
                cacheHits: this.metrics.cacheHits.slice(-10),
                cacheMisses: this.metrics.cacheMisses.slice(-10),
                errors: this.metrics.errors.slice(-5), // Last 5 errors
                performanceIssues: this.metrics.performanceIssues.slice(-5)
            },
            stats: { ...this.stats },
            thresholds: { ...this.thresholds },
            budgets: { ...this.budgets }
        };
    }

    /**
     * Get cache hit rate
     * @returns {number} Cache hit rate as percentage
     */
    getCacheHitRate() {
        return this.stats.cacheHitRate;
    }

    /**
     * Get performance statistics
     * @returns {Object} Performance statistics
     */
    getStats() {
        return { ...this.stats };
    }

    /**
     * Get recent alerts
     * @param {number} count - Number of alerts to return
     * @returns {Array} Recent alerts
     */
    getRecentAlerts(count = 10) {
        return this.alerts.slice(-count);
    }

    /**
     * Get performance trends
     * @param {number} minutes - Time window in minutes
     * @returns {Object} Performance trends
     */
    getPerformanceTrends(minutes = 60) {
        const cutoff = Date.now() - (minutes * 60 * 1000);
        
        const recentSyntheses = this.metrics.synthesisTimes.filter(entry => entry.timestamp > cutoff);
        const recentCacheHits = this.metrics.cacheHits.filter(entry => entry.timestamp > cutoff);
        const recentErrors = this.metrics.errors.filter(entry => entry.timestamp > cutoff);
        
        const avgSynthesisTime = recentSyntheses.length > 0 
            ? recentSyntheses.reduce((sum, entry) => sum + entry.time, 0) / recentSyntheses.length 
            : 0;
        
        const avgCacheHitTime = recentCacheHits.length > 0 
            ? recentCacheHits.reduce((sum, entry) => sum + entry.time, 0) / recentCacheHits.length 
            : 0;
        
        return {
            timeWindow: minutes,
            synthesisCount: recentSyntheses.length,
            cacheHitCount: recentCacheHits.length,
            errorCount: recentErrors.length,
            averageSynthesisTime: avgSynthesisTime,
            averageCacheHitTime: avgCacheHitTime,
            performanceIssues: this.metrics.performanceIssues.filter(entry => entry.timestamp > cutoff).length
        };
    }

    /**
     * Check if performance is within budgets
     * @returns {Object} Budget compliance status
     */
    checkBudgetCompliance() {
        const trends = this.getPerformanceTrends(5); // Last 5 minutes
        
        return {
            synthesis: {
                compliant: trends.averageSynthesisTime <= this.budgets.synthesis,
                current: trends.averageSynthesisTime,
                budget: this.budgets.synthesis,
                margin: this.budgets.synthesis - trends.averageSynthesisTime
            },
            cacheHit: {
                compliant: trends.averageCacheHitTime <= this.budgets.cacheHit,
                current: trends.averageCacheHitTime,
                budget: this.budgets.cacheHit,
                margin: this.budgets.cacheHit - trends.averageCacheHitTime
            },
            overall: {
                compliant: trends.averageSynthesisTime <= this.budgets.synthesis && 
                          trends.averageCacheHitTime <= this.budgets.cacheHit,
                issues: trends.performanceIssues,
                errors: trends.errorCount
            }
        };
    }

    /**
     * Generate performance report
     * @returns {Object} Comprehensive performance report
     */
    generateReport() {
        const trends = this.getPerformanceTrends(60); // Last hour
        const compliance = this.checkBudgetCompliance();
        
        return {
            summary: {
                totalSyntheses: this.stats.totalSyntheses,
                cacheHitRate: this.stats.cacheHitRate,
                averageSynthesisTime: this.stats.averageSynthesisTime,
                averageCacheHitTime: this.stats.averageCacheHitTime,
                errorRate: this.stats.totalErrors / Math.max(this.stats.totalSyntheses, 1),
                performanceIssues: this.stats.performanceIssues
            },
            trends,
            compliance,
            alerts: this.getRecentAlerts(20),
            recommendations: this.generateRecommendations()
        };
    }

    /**
     * Generate performance recommendations
     * @returns {Array} Performance recommendations
     */
    generateRecommendations() {
        const recommendations = [];
        const compliance = this.checkBudgetCompliance();
        
        if (!compliance.synthesis.compliant) {
            recommendations.push({
                type: 'performance',
                priority: 'high',
                message: 'Synthesis time exceeds budget. Consider optimizing content generation or increasing cache usage.',
                action: 'Review synthesis pipeline and caching strategy'
            });
        }
        
        if (!compliance.cacheHit.compliant) {
            recommendations.push({
                type: 'performance',
                priority: 'medium',
                message: 'Cache hit time exceeds budget. Consider optimizing cache implementation.',
                action: 'Review cache implementation and data structures'
            });
        }
        
        if (this.stats.cacheHitRate < 0.5) {
            recommendations.push({
                type: 'efficiency',
                priority: 'medium',
                message: 'Low cache hit rate. Consider expanding cache size or improving cache keys.',
                action: 'Review cache strategy and key generation'
            });
        }
        
        if (this.stats.totalErrors > 0) {
            recommendations.push({
                type: 'reliability',
                priority: 'high',
                message: 'Errors detected in synthesis. Review error handling and fallback mechanisms.',
                action: 'Review error handling and implement better fallbacks'
            });
        }
        
        return recommendations;
    }

    /**
     * Reset performance monitor
     */
    reset() {
        this.metrics = {
            synthesisTimes: [],
            cacheHits: [],
            cacheMisses: [],
            errors: [],
            performanceIssues: []
        };
        
        this.stats = {
            totalSyntheses: 0,
            totalCacheHits: 0,
            totalCacheMisses: 0,
            totalErrors: 0,
            averageSynthesisTime: 0,
            averageCacheHitTime: 0,
            cacheHitRate: 0,
            performanceIssues: 0
        };
        
        this.alerts = [];
        
        this.logger.info('Performance monitor reset complete');
    }

    /**
     * Export performance data
     * @returns {Object} Exportable performance data
     */
    export() {
        return {
            metrics: this.metrics,
            stats: this.stats,
            thresholds: this.thresholds,
            budgets: this.budgets,
            alerts: this.alerts,
            timestamp: Date.now()
        };
    }
} 