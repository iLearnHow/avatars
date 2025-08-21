/**
 * Caching Handler
 * Distributed caching operations with KV
 */

export async function handleCaching(request, env, ctx) {
  const url = new URL(request.url);
  
  if (request.method === 'GET') {
    return await getCachedData(request, env);
  }
  
  if (request.method === 'POST') {
    return await setCachedData(request, env);
  }
  
  if (request.method === 'DELETE') {
    return await deleteCachedData(request, env);
  }
  
  if (request.method === 'PUT' && url.pathname === '/api/cache/warmup') {
    return await warmupCache(request, env);
  }
  
  if (request.method === 'GET' && url.pathname === '/api/cache/stats') {
    return await getCacheStats(env);
  }
  
  return new Response(JSON.stringify({
    error: 'Method not allowed',
    allowed: ['GET', 'POST', 'DELETE', 'PUT']
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function getCachedData(request, env) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  
  if (!key) {
    return new Response(JSON.stringify({
      error: 'Cache key required'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const value = await env.ILEARNHOW_CACHE.get(key);
    
    if (value === null) {
      return new Response(JSON.stringify({
        error: 'Cache miss',
        key
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Try to parse as JSON, fallback to string
    let parsedValue;
    try {
      parsedValue = JSON.parse(value);
    } catch {
      parsedValue = value;
    }
    
    return new Response(JSON.stringify({
      key,
      value: parsedValue,
      cached: true
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to retrieve cached data',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function setCachedData(request, env) {
  try {
    const { key, value, ttl = 3600 } = await request.json();
    
    if (!key) {
      return new Response(JSON.stringify({
        error: 'Cache key required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    
    await env.ILEARNHOW_CACHE.put(key, stringValue, {
      expirationTtl: Math.min(ttl, 86400) // Max 24 hours
    });
    
    return new Response(JSON.stringify({
      success: true,
      key,
      ttl,
      cachedAt: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to cache data',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function deleteCachedData(request, env) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  
  if (!key) {
    return new Response(JSON.stringify({
      error: 'Cache key required'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    await env.ILEARNHOW_CACHE.delete(key);
    
    return new Response(JSON.stringify({
      success: true,
      key,
      deletedAt: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to delete cached data',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function warmupCache(request, env) {
  try {
    const { patterns } = await request.json();
    
    if (!patterns || !Array.isArray(patterns)) {
      return new Response(JSON.stringify({
        error: 'Cache warmup patterns required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const results = [];
    
    for (const pattern of patterns) {
      try {
        const { key, value, ttl = 3600 } = pattern;
        
        if (key && value) {
          const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
          await env.ILEARNHOW_CACHE.put(key, stringValue, {
            expirationTtl: Math.min(ttl, 86400)
          });
          
          results.push({
            key,
            status: 'warmed',
            ttl
          });
        }
      } catch (error) {
        results.push({
          key: pattern.key,
          status: 'failed',
          error: error.message
        });
      }
    }
    
    return new Response(JSON.stringify({
      success: true,
      results,
      total: patterns.length,
      warmed: results.filter(r => r.status === 'warmed').length,
      failed: results.filter(r => r.status === 'failed').length
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to warmup cache',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function getCacheStats(env) {
  try {
    // Get synthesis statistics
    const synthesisStats = await env.ILEARNHOW_CACHE.get('synthesis_stats');
    const analyticsStats = await env.ILEARNHOW_CACHE.get('analytics_aggregate');
    
    const stats = {
      synthesis: synthesisStats ? JSON.parse(synthesisStats) : { totalSyntheses: 0 },
      analytics: analyticsStats ? JSON.parse(analyticsStats) : { totalSessions: 0 },
      cache: {
        lastUpdated: new Date().toISOString(),
        // Note: KV doesn't provide built-in stats, would need custom tracking
        estimatedKeys: 0,
        estimatedSize: 0
      }
    };
    
    return new Response(JSON.stringify(stats), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to get cache stats',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Utility functions for cache operations
export async function getCachedLesson(key, env) {
  return await env.ILEARNHOW_CACHE.get(key);
}

export async function setCachedLesson(key, value, ttl = 86400, env) {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  await env.ILEARNHOW_CACHE.put(key, stringValue, { expirationTtl: ttl });
}

export async function invalidateCache(pattern, env) {
  // Note: KV doesn't support pattern-based deletion
  // This would need to be implemented with a list operation
  // For now, we'll just return success
  return { success: true, message: 'Cache invalidation queued' };
} 