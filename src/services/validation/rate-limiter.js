/**
 * Rate Limiter
 * API rate limiting with Redis and Cloudflare KV
 */

export class RateLimiter {
  constructor(env) {
    this.env = env;
    this.defaultLimits = {
      requestsPerMinute: 60,
      requestsPerHour: 1000,
      requestsPerDay: 10000
    };
  }

  async checkLimit(clientId, env) {
    try {
      const now = Date.now();
      const minute = Math.floor(now / 60000);
      const hour = Math.floor(now / 3600000);
      const day = Math.floor(now / 86400000);

      // Check multiple time windows
      const minuteKey = `rate:${clientId}:minute:${minute}`;
      const hourKey = `rate:${clientId}:hour:${hour}`;
      const dayKey = `rate:${clientId}:day:${day}`;

      // Get current counts from Redis
      const [minuteCount, hourCount, dayCount] = await Promise.all([
        this.getCount(minuteKey),
        this.getCount(hourKey),
        this.getCount(dayKey)
      ]);

      // Check limits
      const limits = this.getLimitsForClient(clientId);
      
      if (minuteCount >= limits.requestsPerMinute) {
        return {
          allowed: false,
          retryAfter: 60 - (now % 60000) / 1000,
          reason: 'minute_limit_exceeded'
        };
      }

      if (hourCount >= limits.requestsPerHour) {
        return {
          allowed: false,
          retryAfter: 3600 - (now % 3600000) / 1000,
          reason: 'hour_limit_exceeded'
        };
      }

      if (dayCount >= limits.requestsPerDay) {
        return {
          allowed: false,
          retryAfter: 86400 - (now % 86400000) / 1000,
          reason: 'day_limit_exceeded'
        };
      }

      // Increment counters
      await Promise.all([
        this.incrementCount(minuteKey, 60),
        this.incrementCount(hourKey, 3600),
        this.incrementCount(dayKey, 86400)
      ]);

      return {
        allowed: true,
        limits: {
          minute: { current: minuteCount + 1, limit: limits.requestsPerMinute },
          hour: { current: hourCount + 1, limit: limits.requestsPerHour },
          day: { current: dayCount + 1, limit: limits.requestsPerDay }
        }
      };

    } catch (error) {
      console.error('Rate limit check error:', error);
      // On error, allow the request but log it
      return { allowed: true, error: error.message };
    }
  }

  async getCount(key) {
    try {
      // Try Redis first
      const count = await this.env.REDIS_HOST ? 
        this.getRedisCount(key) : 
        this.getKVCount(key);
      
      return parseInt(count) || 0;
    } catch (error) {
      console.error('Get count error:', error);
      return 0;
    }
  }

  async getRedisCount(key) {
    // This would use the Redis connection
    // For now, use KV as fallback
    return await this.getKVCount(key);
  }

  async getKVCount(key) {
    const count = await this.env.RATE_LIMIT_KV.get(key);
    return parseInt(count) || 0;
  }

  async incrementCount(key, ttl) {
    try {
      // Increment in Redis if available
      if (this.env.REDIS_HOST) {
        await this.incrementRedisCount(key, ttl);
      } else {
        await this.incrementKVCount(key, ttl);
      }
    } catch (error) {
      console.error('Increment count error:', error);
    }
  }

  async incrementRedisCount(key, ttl) {
    // This would use the Redis connection
    // For now, use KV as fallback
    await this.incrementKVCount(key, ttl);
  }

  async incrementKVCount(key, ttl) {
    const current = await this.env.RATE_LIMIT_KV.get(key);
    const newCount = (parseInt(current) || 0) + 1;
    await this.env.RATE_LIMIT_KV.put(key, newCount.toString(), { expirationTtl: ttl });
  }

  getLimitsForClient(clientId) {
    // You can implement different limits for different client types
    if (clientId.startsWith('premium_')) {
      return {
        requestsPerMinute: 120,
        requestsPerHour: 2000,
        requestsPerDay: 20000
      };
    }
    
    if (clientId.startsWith('enterprise_')) {
      return {
        requestsPerMinute: 300,
        requestsPerHour: 5000,
        requestsPerDay: 50000
      };
    }

    return this.defaultLimits;
  }

  async resetLimits(clientId) {
    try {
      const now = Date.now();
      const minute = Math.floor(now / 60000);
      const hour = Math.floor(now / 3600000);
      const day = Math.floor(now / 86400000);

      const keys = [
        `rate:${clientId}:minute:${minute}`,
        `rate:${clientId}:hour:${hour}`,
        `rate:${clientId}:day:${day}`
      ];

      // Delete from both Redis and KV
      for (const key of keys) {
        if (this.env.REDIS_HOST) {
          // await this.redis.del(key);
        }
        await this.env.RATE_LIMIT_KV.delete(key);
      }

      console.log(`Reset rate limits for client: ${clientId}`);
      return true;
    } catch (error) {
      console.error('Reset limits error:', error);
      return false;
    }
  }

  async getClientStats(clientId) {
    try {
      const now = Date.now();
      const minute = Math.floor(now / 60000);
      const hour = Math.floor(now / 3600000);
      const day = Math.floor(now / 86400000);

      const [minuteCount, hourCount, dayCount] = await Promise.all([
        this.getCount(`rate:${clientId}:minute:${minute}`),
        this.getCount(`rate:${clientId}:hour:${hour}`),
        this.getCount(`rate:${clientId}:day:${day}`)
      ]);

      const limits = this.getLimitsForClient(clientId);

      return {
        clientId,
        current: {
          minute: minuteCount,
          hour: hourCount,
          day: dayCount
        },
        limits,
        remaining: {
          minute: Math.max(0, limits.requestsPerMinute - minuteCount),
          hour: Math.max(0, limits.requestsPerHour - hourCount),
          day: Math.max(0, limits.requestsPerDay - dayCount)
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Get client stats error:', error);
      return { error: error.message };
    }
  }
} 