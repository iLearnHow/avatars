/**
 * Monitoring Handler
 * Error tracking and performance metrics collection
 */

export async function handleMonitoring(event, data, env) {
  try {
    switch (event) {
      case 'error':
        await trackError(data, env);
        break;
        
      case 'performance':
        await trackPerformance(data, env);
        break;
        
      case 'synthesis':
        await trackSynthesis(data, env);
        break;
        
      case 'user_action':
        await trackUserAction(data, env);
        break;
        
      default:
        console.warn(`Unknown monitoring event: ${event}`);
    }
  } catch (error) {
    console.error('Monitoring error:', error);
  }
}

async function trackError(data, env) {
  const { error, stack, url, method, duration } = data;
  
  // Store error in KV for analysis
  const errorKey = `error:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
  const errorData = {
    error,
    stack,
    url,
    method,
    duration,
    timestamp: new Date().toISOString(),
    environment: env.ENVIRONMENT
  };
  
  await env.ILEARNHOW_CACHE.put(errorKey, JSON.stringify(errorData), {
    expirationTtl: 604800 // 7 days
  });
  
  // Update error statistics
  const errorStatsKey = 'error_stats';
  const currentStats = await env.ILEARNHOW_CACHE.get(errorStatsKey);
  const stats = currentStats ? JSON.parse(currentStats) : {
    totalErrors: 0,
    errorsByType: {},
    errorsByUrl: {},
    lastError: null,
    lastUpdated: new Date().toISOString()
  };
  
  stats.totalErrors++;
  stats.lastError = errorData;
  stats.lastUpdated = new Date().toISOString();
  
  // Categorize error
  const errorType = categorizeError(error);
  stats.errorsByType[errorType] = (stats.errorsByType[errorType] || 0) + 1;
  
  const urlPath = new URL(url).pathname;
  stats.errorsByUrl[urlPath] = (stats.errorsByUrl[urlPath] || 0) + 1;
  
  await env.ILEARNHOW_CACHE.put(errorStatsKey, JSON.stringify(stats), {
    expirationTtl: 86400 // 24 hours
  });
  
  // Send to external monitoring service if configured
  if (env.SENTRY_DSN) {
    try {
      await sendToSentry(errorData, env);
    } catch (sentryError) {
      console.error('Sentry error:', sentryError);
    }
  }
}

async function trackPerformance(data, env) {
  const { metric, value, url, method, timestamp } = data;
  
  // Store performance metric
  const perfKey = `perf:${metric}:${Date.now()}`;
  const perfData = {
    metric,
    value,
    url,
    method,
    timestamp: timestamp || new Date().toISOString(),
    environment: env.ENVIRONMENT
  };
  
  await env.ILEARNHOW_CACHE.put(perfKey, JSON.stringify(perfData), {
    expirationTtl: 86400 // 24 hours
  });
  
  // Update performance statistics
  const perfStatsKey = `perf_stats:${metric}`;
  const currentStats = await env.ILEARNHOW_CACHE.get(perfStatsKey);
  const stats = currentStats ? JSON.parse(currentStats) : {
    count: 0,
    sum: 0,
    min: Infinity,
    max: -Infinity,
    average: 0,
    lastUpdated: new Date().toISOString()
  };
  
  stats.count++;
  stats.sum += value;
  stats.min = Math.min(stats.min, value);
  stats.max = Math.max(stats.max, value);
  stats.average = Math.round(stats.sum / stats.count);
  stats.lastUpdated = new Date().toISOString();
  
  await env.ILEARNHOW_CACHE.put(perfStatsKey, JSON.stringify(stats), {
    expirationTtl: 86400 // 24 hours
  });
  
  // Alert on performance thresholds
  if (value > getPerformanceThreshold(metric)) {
    await alertPerformanceIssue(metric, value, data, env);
  }
}

async function trackSynthesis(data, env) {
  const { day, age, tone, topic, duration, success, tokens } = data;
  
  // Store synthesis event
  const synthesisKey = `synthesis:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
  const synthesisData = {
    day,
    age,
    tone,
    topic,
    duration,
    success,
    tokens,
    timestamp: new Date().toISOString(),
    environment: env.ENVIRONMENT
  };
  
  await env.ILEARNHOW_CACHE.put(synthesisKey, JSON.stringify(synthesisData), {
    expirationTtl: 604800 // 7 days
  });
  
  // Update synthesis statistics
  const synthesisStatsKey = 'synthesis_stats';
  const currentStats = await env.ILEARNHOW_CACHE.get(synthesisStatsKey);
  const stats = currentStats ? JSON.parse(currentStats) : {
    totalSyntheses: 0,
    successfulSyntheses: 0,
    failedSyntheses: 0,
    averageDuration: 0,
    totalTokens: 0,
    averageTokens: 0,
    byAge: {},
    byTone: {},
    byTopic: {},
    lastUpdated: new Date().toISOString()
  };
  
  stats.totalSyntheses++;
  if (success) {
    stats.successfulSyntheses++;
  } else {
    stats.failedSyntheses++;
  }
  
  stats.averageDuration = Math.round(
    (stats.averageDuration * (stats.totalSyntheses - 1) + duration) / stats.totalSyntheses
  );
  
  if (tokens) {
    stats.totalTokens += tokens;
    stats.averageTokens = Math.round(stats.totalTokens / stats.totalSyntheses);
  }
  
  // Update distributions
  stats.byAge[age] = (stats.byAge[age] || 0) + 1;
  stats.byTone[tone] = (stats.byTone[tone] || 0) + 1;
  stats.byTopic[topic] = (stats.byTopic[topic] || 0) + 1;
  
  stats.lastUpdated = new Date().toISOString();
  
  await env.ILEARNHOW_CACHE.put(synthesisStatsKey, JSON.stringify(stats), {
    expirationTtl: 86400 // 24 hours
  });
}

async function trackUserAction(data, env) {
  const { action, userId, sessionId, metadata, timestamp } = data;
  
  // Store user action
  const actionKey = `action:${userId}:${sessionId}:${Date.now()}`;
  const actionData = {
    action,
    userId,
    sessionId,
    metadata,
    timestamp: timestamp || new Date().toISOString(),
    environment: env.ENVIRONMENT
  };
  
  await env.ILEARNHOW_CACHE.put(actionKey, JSON.stringify(actionData), {
    expirationTtl: 604800 // 7 days
  });
  
  // Update user analytics
  const userAnalyticsKey = `user_analytics:${userId}`;
  const currentAnalytics = await env.ILEARNHOW_CACHE.get(userAnalyticsKey);
  const analytics = currentAnalytics ? JSON.parse(currentAnalytics) : {
    userId,
    totalActions: 0,
    actionsByType: {},
    lastAction: null,
    firstSeen: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };
  
  analytics.totalActions++;
  analytics.actionsByType[action] = (analytics.actionsByType[action] || 0) + 1;
  analytics.lastAction = actionData;
  analytics.lastUpdated = new Date().toISOString();
  
  await env.ILEARNHOW_CACHE.put(userAnalyticsKey, JSON.stringify(analytics), {
    expirationTtl: 604800 // 7 days
  });
}

function categorizeError(error) {
  if (error.includes('API') || error.includes('fetch')) return 'api_error';
  if (error.includes('synthesis') || error.includes('Claude')) return 'synthesis_error';
  if (error.includes('cache') || error.includes('KV')) return 'cache_error';
  if (error.includes('rate limit') || error.includes('429')) return 'rate_limit_error';
  return 'general_error';
}

function getPerformanceThreshold(metric) {
  const thresholds = {
    'synthesis_time': 5000, // 5 seconds
    'api_response_time': 3000, // 3 seconds
    'cache_hit_time': 100, // 100ms
    'page_load_time': 3000, // 3 seconds
    'user_interaction_time': 500 // 500ms
  };
  
  return thresholds[metric] || 1000;
}

async function alertPerformanceIssue(metric, value, data, env) {
  const alertKey = `alert:${metric}:${Date.now()}`;
  const alertData = {
    type: 'performance_alert',
    metric,
    value,
    threshold: getPerformanceThreshold(metric),
    data,
    timestamp: new Date().toISOString(),
    environment: env.ENVIRONMENT
  };
  
  await env.ILEARNHOW_CACHE.put(alertKey, JSON.stringify(alertData), {
    expirationTtl: 86400 // 24 hours
  });
  
  // Could send to external alerting service here
  console.warn(`Performance alert: ${metric} = ${value}ms`);
}

async function sendToSentry(errorData, env) {
  // Simplified Sentry integration
  // In production, you'd use the actual Sentry SDK
  const sentryPayload = {
    message: errorData.error,
    level: 'error',
    timestamp: errorData.timestamp,
    tags: {
      environment: env.ENVIRONMENT,
      url: errorData.url,
      method: errorData.method
    },
    extra: {
      stack: errorData.stack,
      duration: errorData.duration
    }
  };
  
  // This would be the actual Sentry API call
  // await fetch(env.SENTRY_DSN, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(sentryPayload)
  // });
  
  console.log('Sentry payload:', sentryPayload);
} 