/**
 * Background Job Handler
 * Processes queued jobs for analytics and data processing
 */

export async function handleBackgroundJobs(request, env, ctx) {
  // Handle HTTP requests to job endpoints
  if (request) {
    const url = new URL(request.url);
    
    if (url.pathname === '/api/jobs/status' && request.method === 'GET') {
      const jobId = url.searchParams.get('id');
      if (!jobId) {
        return new Response(JSON.stringify({ error: 'Job ID required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const jobStatus = await env.ILEARNHOW_CACHE.get(`job:${jobId}`);
      return new Response(jobStatus || JSON.stringify({ status: 'not_found' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url.pathname === '/api/jobs/stats' && request.method === 'GET') {
      const stats = await getJobStats(env);
      return new Response(JSON.stringify(stats), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  // Handle queued job batches
  if (request && request.body) {
    const batch = await request.json();
    await processJobBatch(batch, env);
  }
}

// Queue processor function
export async function processJobBatch(batch, env) {
  for (const message of batch.messages) {
    try {
      const { type, data } = message.body;
      
      switch (type) {
        case 'synthesis_completed':
          await processSynthesisCompleted(data, env);
          break;
          
        case 'cache_warmup':
          await processCacheWarmup(data, env);
          break;
          
        case 'analytics_collection':
          await processAnalyticsCollection(data, env);
          break;
          
        default:
          console.warn(`Unknown job type: ${type}`);
      }
      
      // Mark job as completed
      await env.ILEARNHOW_CACHE.put(`job:${message.id}`, JSON.stringify({
        status: 'completed',
        completedAt: new Date().toISOString()
      }), { expirationTtl: 86400 });
      
    } catch (error) {
      console.error('Job processing error:', error);
      
      // Mark job as failed
      await env.ILEARNHOW_CACHE.put(`job:${message.id}`, JSON.stringify({
        status: 'failed',
        error: error.message,
        failedAt: new Date().toISOString()
      }), { expirationTtl: 86400 });
    }
  }
}

async function processSynthesisCompleted(data, env) {
  const { day, age, tone, topic, tokens, timestamp } = data;
  
  // Update synthesis statistics
  const statsKey = 'synthesis_stats';
  const currentStats = await env.ILEARNHOW_CACHE.get(statsKey);
  const stats = currentStats ? JSON.parse(currentStats) : {
    totalSyntheses: 0,
    totalTokens: 0,
    averageTokens: 0,
    byAge: {},
    byTone: {},
    byTopic: {},
    lastUpdated: new Date().toISOString()
  };
  
  // Update counters
  stats.totalSyntheses++;
  stats.totalTokens += tokens;
  stats.averageTokens = Math.round(stats.totalTokens / stats.totalSyntheses);
  
  // Update age distribution
  stats.byAge[age] = (stats.byAge[age] || 0) + 1;
  
  // Update tone distribution
  stats.byTone[tone] = (stats.byTone[tone] || 0) + 1;
  
  // Update topic distribution
  stats.byTopic[topic] = (stats.byTopic[topic] || 0) + 1;
  
  stats.lastUpdated = new Date().toISOString();
  
  // Store updated stats
  await env.ILEARNHOW_CACHE.put(statsKey, JSON.stringify(stats), { expirationTtl: 86400 });
  
  // Send analytics to external service if configured
  if (env.ANALYTICS_ENDPOINT) {
    try {
      await fetch(env.ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'synthesis_completed',
          data,
          timestamp
        })
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }
}

async function processCacheWarmup(data, env) {
  const { topics, ages, tones } = data;
  
  // Pre-generate popular combinations
  for (const topic of topics) {
    for (const age of ages) {
      for (const tone of tones) {
        const cacheKey = `synthesis:1:${age}:${tone}:${topic}:english`;
        const existing = await env.ILEARNHOW_CACHE.get(cacheKey);
        
        if (!existing) {
          // Queue synthesis job for this combination
          await env.ILEARNHOW_QUEUE.send({
            type: 'synthesis_completed',
            data: {
              day: 1,
              age,
              tone,
              topic,
              tokens: 0,
              timestamp: Date.now(),
              warmup: true
            }
          });
        }
      }
    }
  }
}

async function processAnalyticsCollection(data, env) {
  const { metrics, userId, sessionId } = data;
  
  // Store user analytics
  const analyticsKey = `analytics:${userId}:${sessionId}`;
  await env.ILEARNHOW_CACHE.put(analyticsKey, JSON.stringify({
    metrics,
    timestamp: new Date().toISOString()
  }), { expirationTtl: 604800 }); // 7 days
  
  // Aggregate metrics
  const aggregateKey = 'analytics_aggregate';
  const currentAggregate = await env.ILEARNHOW_CACHE.get(aggregateKey);
  const aggregate = currentAggregate ? JSON.parse(currentAggregate) : {
    totalSessions: 0,
    totalInteractions: 0,
    averageSessionDuration: 0,
    lastUpdated: new Date().toISOString()
  };
  
  aggregate.totalSessions++;
  aggregate.totalInteractions += metrics.interactions || 0;
  aggregate.averageSessionDuration = Math.round(
    (aggregate.averageSessionDuration + (metrics.duration || 0)) / 2
  );
  aggregate.lastUpdated = new Date().toISOString();
  
  await env.ILEARNHOW_CACHE.put(aggregateKey, JSON.stringify(aggregate), { expirationTtl: 86400 });
}

async function getJobStats(env) {
  const statsKey = 'synthesis_stats';
  const stats = await env.ILEARNHOW_CACHE.get(statsKey);
  
  return {
    synthesis: stats ? JSON.parse(stats) : { totalSyntheses: 0 },
    jobs: {
      totalProcessed: 0, // Would need to track this separately
      lastUpdated: new Date().toISOString()
    }
  };
} 