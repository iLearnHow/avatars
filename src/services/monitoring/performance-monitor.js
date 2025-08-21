/**
 * Performance Monitor
 * Tracks synthesis performance and system metrics
 */

export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      synthesisCount: 0,
      cacheHits: 0,
      cacheMisses: 0,
      averageSynthesisTime: 0,
      totalSynthesisTime: 0,
      errors: 0,
      lastReset: new Date().toISOString()
    };
  }

  recordSynthesis(startTime, result) {
    const endTime = performance.now();
    const synthesisTime = endTime - startTime;
    
    this.metrics.synthesisCount++;
    this.metrics.totalSynthesisTime += synthesisTime;
    this.metrics.averageSynthesisTime = this.metrics.totalSynthesisTime / this.metrics.synthesisCount;

    // Record detailed metrics
    this.recordDetailedMetrics({
      type: 'synthesis',
      lessonId: result.lessonId,
      synthesisTime,
      tokensUsed: result.performance?.tokensUsed || 0,
      cost: result.cost,
      success: result.success,
      timestamp: new Date().toISOString()
    });

    // Check performance thresholds
    this.checkPerformanceThresholds(synthesisTime, result);

    console.log(`Synthesis recorded: ${synthesisTime.toFixed(2)}ms, Cost: $${result.cost?.toFixed(4) || 0}`);
  }

  recordCacheHit(startTime) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    this.metrics.cacheHits++;
    
    this.recordDetailedMetrics({
      type: 'cache_hit',
      responseTime,
      timestamp: new Date().toISOString()
    });

    console.log(`Cache hit recorded: ${responseTime.toFixed(2)}ms`);
  }

  recordCacheMiss(startTime) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    this.metrics.cacheMisses++;
    
    this.recordDetailedMetrics({
      type: 'cache_miss',
      responseTime,
      timestamp: new Date().toISOString()
    });

    console.log(`Cache miss recorded: ${responseTime.toFixed(2)}ms`);
  }

  recordError(error, context = {}) {
    this.metrics.errors++;
    
    this.recordDetailedMetrics({
      type: 'error',
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });

    console.error('Error recorded:', error.message, context);
  }

  recordDetailedMetrics(metric) {
    try {
      // Store in analytics KV for detailed analysis
      const key = `metrics:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
      
      // This would be stored in the analytics KV namespace
      // For now, just log it
      console.log('Detailed metric:', metric);
    } catch (error) {
      console.error('Record detailed metrics error:', error);
    }
  }

  checkPerformanceThresholds(synthesisTime, result) {
    const targetTime = 200; // 200ms target
    const maxTime = 5000; // 5 second max
    
    if (synthesisTime > maxTime) {
      this.recordError(new Error(`Synthesis time exceeded maximum threshold: ${synthesisTime}ms`), {
        lessonId: result.lessonId,
        synthesisTime,
        threshold: maxTime
      });
    } else if (synthesisTime > targetTime) {
      console.warn(`Synthesis time above target: ${synthesisTime}ms (target: ${targetTime}ms)`);
    }

    // Check cost thresholds
    const maxCostPerLesson = 0.05;
    if (result.cost > maxCostPerLesson) {
      console.warn(`Cost exceeded threshold: $${result.cost} (max: $${maxCostPerLesson})`);
    }
  }

  getMetrics() {
    const cacheHitRate = this.metrics.synthesisCount > 0 ? 
      (this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses)) * 100 : 0;

    return {
      ...this.metrics,
      cacheHitRate: cacheHitRate.toFixed(2) + '%',
      errorRate: this.metrics.synthesisCount > 0 ? 
        (this.metrics.errors / this.metrics.synthesisCount) * 100 : 0,
      timestamp: new Date().toISOString()
    };
  }

  async getPerformanceStats(hours = 24) {
    try {
      const stats = {
        period: `${hours} hours`,
        synthesis: {
          total: this.metrics.synthesisCount,
          averageTime: this.metrics.averageSynthesisTime,
          totalTime: this.metrics.totalSynthesisTime
        },
        cache: {
          hits: this.metrics.cacheHits,
          misses: this.metrics.cacheMisses,
          hitRate: this.metrics.synthesisCount > 0 ? 
            (this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses)) * 100 : 0
        },
        errors: {
          total: this.metrics.errors,
          rate: this.metrics.synthesisCount > 0 ? 
            (this.metrics.errors / this.metrics.synthesisCount) * 100 : 0
        },
        thresholds: {
          targetSynthesisTime: 200,
          maxSynthesisTime: 5000,
          maxCostPerLesson: 0.05
        },
        timestamp: new Date().toISOString()
      };

      return stats;
    } catch (error) {
      console.error('Get performance stats error:', error);
      return { error: error.message };
    }
  }

  resetMetrics() {
    this.metrics = {
      synthesisCount: 0,
      cacheHits: 0,
      cacheMisses: 0,
      averageSynthesisTime: 0,
      totalSynthesisTime: 0,
      errors: 0,
      lastReset: new Date().toISOString()
    };

    console.log('Performance metrics reset');
  }

  async getHealthCheck() {
    try {
      const metrics = this.getMetrics();
      
      const health = {
        status: 'healthy',
        checks: {
          synthesisCount: metrics.synthesisCount >= 0,
          averageSynthesisTime: metrics.averageSynthesisTime < 5000,
          errorRate: (metrics.errors / Math.max(metrics.synthesisCount, 1)) < 0.1, // Less than 10% error rate
          cacheHitRate: parseFloat(metrics.cacheHitRate) > 0
        },
        metrics,
        timestamp: new Date().toISOString()
      };

      // Determine overall health status
      const allChecksPass = Object.values(health.checks).every(check => check);
      health.status = allChecksPass ? 'healthy' : 'degraded';

      return health;
    } catch (error) {
      console.error('Health check error:', error);
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async getAlerts() {
    try {
      const alerts = [];
      const metrics = this.getMetrics();

      // Performance alerts
      if (metrics.averageSynthesisTime > 3000) {
        alerts.push({
          type: 'performance_degradation',
          message: `Average synthesis time is high: ${metrics.averageSynthesisTime.toFixed(2)}ms`,
          severity: 'warning',
          threshold: 3000,
          current: metrics.averageSynthesisTime
        });
      }

      // Error rate alerts
      const errorRate = (metrics.errors / Math.max(metrics.synthesisCount, 1)) * 100;
      if (errorRate > 5) {
        alerts.push({
          type: 'high_error_rate',
          message: `Error rate is high: ${errorRate.toFixed(2)}%`,
          severity: 'critical',
          threshold: 5,
          current: errorRate
        });
      }

      // Cache performance alerts
      const cacheHitRate = parseFloat(metrics.cacheHitRate);
      if (cacheHitRate < 50) {
        alerts.push({
          type: 'low_cache_hit_rate',
          message: `Cache hit rate is low: ${cacheHitRate.toFixed(2)}%`,
          severity: 'warning',
          threshold: 50,
          current: cacheHitRate
        });
      }

      return {
        alerts,
        count: alerts.length,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Get alerts error:', error);
      return { error: error.message };
    }
  }
} 