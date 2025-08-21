/**
 * iLearnHow Enterprise Synthesis Worker
 * Cloudflare Worker for AI-powered lesson synthesis
 * @version 1.0.0
 * @author iLearnHow
 */

// Simple cache implementation for Cloudflare Workers
class SimpleCache {
  constructor(kv) {
    this.kv = kv;
  }

  async get(key) {
    try {
      return await this.kv.get(key);
    } catch (error) {
      console.warn('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttl = 3600) {
    try {
      await this.kv.put(key, value, { expirationTtl: ttl });
      return true;
    } catch (error) {
      console.warn('Cache set error:', error);
      return false;
    }
  }
}

// Simple rate limiter
class SimpleRateLimiter {
  constructor(kv) {
    this.kv = kv;
  }

  async checkLimit(clientId, limit = 100, window = 3600) {
    const key = `rate_limit:${clientId}:${Math.floor(Date.now() / (window * 1000))}`;
    
    try {
      const current = await this.kv.get(key) || 0;
      if (current >= limit) {
        return { allowed: false, remaining: 0, reset: window };
      }
      
      await this.kv.put(key, current + 1, { expirationTtl: window });
      return { allowed: true, remaining: limit - current - 1, reset: window };
    } catch (error) {
      console.warn('Rate limit error:', error);
      return { allowed: true, remaining: limit, reset: window };
    }
  }
}

// Simple cost tracker
class SimpleCostTracker {
  constructor(kv) {
    this.kv = kv;
  }

  async recordCost(amount) {
    const today = new Date().toISOString().split('T')[0];
    const key = `cost:${today}`;
    
    try {
      const current = parseFloat(await this.kv.get(key) || '0');
      const newTotal = current + amount;
      await this.kv.put(key, newTotal.toString(), { expirationTtl: 86400 });
      return newTotal;
    } catch (error) {
      console.warn('Cost tracking error:', error);
      return 0;
    }
  }

  async getDailyCost() {
    const today = new Date().toISOString().split('T')[0];
    const key = `cost:${today}`;
    
    try {
      return parseFloat(await this.kv.get(key) || '0');
    } catch (error) {
      console.warn('Cost retrieval error:', error);
      return 0;
    }
  }
}

// Simple synthesis engine
class SimpleSynthesisEngine {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.anthropic.com/v1/messages';
  }

  async synthesize(lessonContent, age, tone) {
    try {
      const prompt = this.createPrompt(lessonContent, age, tone);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Claude API error:', response.status, errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return {
        content: data.content[0].text,
        cost: this.calculateCost(data.usage),
        usage: data.usage
      };
    } catch (error) {
      console.error('Synthesis error:', error);
      throw error;
    }
  }

  createPrompt(lessonContent, age, tone) {
    return `You are an expert educational content synthesizer. Please adapt the following lesson content for a ${age}-year-old student using a ${tone} tone.

Original Lesson Content:
${lessonContent}

Please provide:
1. An age-appropriate version of the lesson
2. Engaging explanations suitable for ${age}-year-olds
3. Examples and analogies that resonate with this age group
4. A ${tone} tone throughout the content

Format the response as clean, readable text without markdown formatting.`;
  }

  calculateCost(usage) {
    // Claude 3.5 Sonnet pricing: $3 per 1M input tokens, $15 per 1M output tokens
    const inputCost = (usage.input_tokens / 1000000) * 3;
    const outputCost = (usage.output_tokens / 1000000) * 15;
    return inputCost + outputCost;
  }
}

// Initialize services
let cache, rateLimiter, costTracker, synthesisEngine;

function initializeServices(env) {
  if (!cache) {
    cache = new SimpleCache(env.LESSON_CACHE_KV);
    rateLimiter = new SimpleRateLimiter(env.RATE_LIMIT_KV);
    costTracker = new SimpleCostTracker(env.ANALYTICS_KV);
    synthesisEngine = new SimpleSynthesisEngine(env.CLAUDE_API_KEY);
  }
}

export default {
  async fetch(request, env, ctx) {
    const startTime = performance.now();
    
    // Initialize services
    initializeServices(env);
    
    try {
      // Parse request
      const url = new URL(request.url);
      const path = url.pathname;
      
      // CORS headers
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      };

      // Handle preflight requests
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      // Serve homepage for root path
      if (path === '/' || path === '/index.html') {
        return await serveHomepage(env);
      }

      // Route API requests
      if (path === '/api/health') {
        return new Response(JSON.stringify({
          status: 'healthy',
          timestamp: new Date().toISOString(),
          environment: env.ENVIRONMENT,
          version: env.API_VERSION
        }), { headers: corsHeaders });
      }

      if (path === '/api/synthesize' && request.method === 'POST') {
        return await handleSynthesis(request, env, corsHeaders, startTime);
      }

      // Default response
      return new Response(JSON.stringify({
        error: 'Not found',
        message: 'Endpoint not found',
        available: ['/', '/api/health', '/api/synthesize']
      }), { 
        status: 404,
        headers: corsHeaders 
      });

    } catch (error) {
      console.error('Worker error:', error);
      
      return new Response(JSON.stringify({
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
      }), { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};

async function serveHomepage(env) {
  try {
    // Try to get homepage from static assets KV
    const homepage = await env.STATIC_ASSETS_KV.get('index.html');
    
    if (homepage) {
      return new Response(homepage, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    // Fallback to a simple homepage if not in KV
    const fallbackHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iLearnHow - Enterprise Educational Synthesis</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .api-info {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            margin-top: 2rem;
        }
        .endpoint {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 8px;
            margin: 0.5rem 0;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎓 iLearnHow</h1>
        <p>Enterprise Educational Synthesis Platform</p>
        
        <div class="api-info">
            <h2>API Endpoints</h2>
            <div class="endpoint">GET /api/health - System health check</div>
            <div class="endpoint">POST /api/synthesize - Generate personalized lessons</div>
            
            <h3>Example Synthesis Request:</h3>
            <div class="endpoint">
                curl -X POST /api/synthesize \\<br>
                -H "Content-Type: application/json" \\<br>
                -d '{"lessonContent": "The sun is a star", "age": 25, "tone": "neutral"}'
            </div>
        </div>
    </div>
</body>
</html>`;

    return new Response(fallbackHTML, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });

  } catch (error) {
    console.error('Error serving homepage:', error);
    
    return new Response('Error loading homepage', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}

async function handleSynthesis(request, env, corsHeaders, startTime) {
  try {
    // Parse request body
    const body = await request.json();
    const { lessonContent, age, tone, clientId = 'anonymous' } = body;

    // Validate input
    if (!lessonContent || !age || !tone) {
      return new Response(JSON.stringify({
        error: 'Missing required fields',
        required: ['lessonContent', 'age', 'tone'],
        received: { lessonContent: !!lessonContent, age: !!age, tone: !!tone }
      }), { 
        status: 400,
        headers: corsHeaders 
      });
    }

    // Check rate limits
    const rateLimit = await rateLimiter.checkLimit(clientId, 100, 3600);
    if (!rateLimit.allowed) {
      return new Response(JSON.stringify({
        error: 'Rate limit exceeded',
        message: 'Too many requests',
        reset: rateLimit.reset
      }), { 
        status: 429,
        headers: corsHeaders 
      });
    }

    // Check daily budget
    const dailyCost = await costTracker.getDailyCost();
    const dailyBudget = parseFloat(env.DAILY_AI_BUDGET || '500');
    if (dailyCost >= dailyBudget) {
      return new Response(JSON.stringify({
        error: 'Budget exceeded',
        message: 'Daily AI budget limit reached',
        dailyCost,
        dailyBudget
      }), { 
        status: 429,
        headers: corsHeaders 
      });
    }

    // Check cache first
    const cacheKey = `synthesis:${btoa(lessonContent + age + tone)}`;
    const cached = await cache.get(cacheKey);
    
    if (cached) {
      const cachedData = JSON.parse(cached);
      return new Response(JSON.stringify({
        ...cachedData,
        cached: true,
        synthesisTime: performance.now() - startTime
      }), { headers: corsHeaders });
    }

    // Perform synthesis
    const synthesisResult = await synthesisEngine.synthesize(lessonContent, age, tone);
    
    // Record cost
    await costTracker.recordCost(synthesisResult.cost);

    // Cache result
    const result = {
      content: synthesisResult.content,
      cost: synthesisResult.cost,
      usage: synthesisResult.usage,
      age,
      tone,
      timestamp: new Date().toISOString()
    };

    await cache.set(cacheKey, JSON.stringify(result), 3600); // Cache for 1 hour

    return new Response(JSON.stringify({
      ...result,
      cached: false,
      synthesisTime: performance.now() - startTime,
      rateLimit: {
        remaining: rateLimit.remaining,
        reset: rateLimit.reset
      }
    }), { headers: corsHeaders });

  } catch (error) {
    console.error('Synthesis error:', error);
    
    return new Response(JSON.stringify({
      error: 'Synthesis failed',
      message: error.message,
      timestamp: new Date().toISOString()
    }), { 
      status: 500,
      headers: corsHeaders 
    });
  }
} 