/**
 * Cache Manager
 * Multi-tier caching with Redis + Cloudflare KV
 */

export class CacheManager {
  constructor(redis, env) {
    this.redis = redis;
    this.env = env;
    this.defaultTTL = 3600; // 1 hour
  }

  async get(key) {
    try {
      // Try Redis first (fastest)
      const redisResult = await this.redis.get(key);
      if (redisResult) {
        console.log(`Cache hit (Redis): ${key}`);
        return redisResult;
      }

      // Try Cloudflare KV as fallback
      const kvResult = await this.env.LESSON_CACHE_KV.get(key);
      if (kvResult) {
        console.log(`Cache hit (KV): ${key}`);
        // Refresh Redis cache
        await this.redis.set(key, kvResult, { ex: this.defaultTTL });
        return kvResult;
      }

      console.log(`Cache miss: ${key}`);
      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttl = this.defaultTTL) {
    try {
      // Set in Redis (primary cache)
      await this.redis.set(key, value, { ex: ttl });
      
      // Set in Cloudflare KV (backup cache)
      await this.env.LESSON_CACHE_KV.put(key, value, { expirationTtl: ttl });
      
      console.log(`Cache set: ${key} (TTL: ${ttl}s)`);
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  async delete(key) {
    try {
      // Delete from both caches
      await this.redis.del(key);
      await this.env.LESSON_CACHE_KV.delete(key);
      
      console.log(`Cache deleted: ${key}`);
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  async invalidatePattern(pattern) {
    try {
      // Get all keys matching pattern from Redis
      const keys = await this.redis.keys(pattern);
      
      if (keys.length > 0) {
        // Delete matching keys from Redis
        await this.redis.del(...keys);
        
        // Delete from KV (one by one since KV doesn't support pattern deletion)
        for (const key of keys) {
          await this.env.LESSON_CACHE_KV.delete(key);
        }
        
        console.log(`Invalidated ${keys.length} cache entries matching: ${pattern}`);
      }
      
      return keys.length;
    } catch (error) {
      console.error('Cache invalidation error:', error);
      return 0;
    }
  }

  async getStats() {
    try {
      const redisInfo = await this.redis.info('memory');
      const kvKeys = await this.env.LESSON_CACHE_KV.list();
      
      return {
        redis: {
          info: redisInfo,
          connected: true
        },
        kv: {
          keyCount: kvKeys.keys?.length || 0,
          connected: true
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Cache stats error:', error);
      return {
        redis: { connected: false, error: error.message },
        kv: { connected: false, error: error.message },
        timestamp: new Date().toISOString()
      };
    }
  }

  // Cache warming for frequently accessed lessons
  async warmCache(lessonIds, curriculum) {
    try {
      console.log(`Warming cache for ${lessonIds.length} lessons`);
      
      for (const lessonId of lessonIds) {
        const cacheKey = `lesson:${lessonId}`;
        const lessonData = await this.getLessonData(lessonId, curriculum);
        
        if (lessonData) {
          await this.set(cacheKey, lessonData, 7200); // 2 hours TTL
        }
      }
      
      console.log('Cache warming completed');
      return true;
    } catch (error) {
      console.error('Cache warming error:', error);
      return false;
    }
  }

  async getLessonData(lessonId, curriculum) {
    // This would fetch lesson data from your curriculum
    // For now, return a sample structure
    return {
      id: lessonId,
      title: `Lesson ${lessonId}`,
      content: `Sample content for lesson ${lessonId}`,
      metadata: {
        grade: "K-5",
        subject: "Math",
        duration: "30 minutes"
      }
    };
  }
} 