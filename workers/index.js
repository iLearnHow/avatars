/**
 * Cloudflare Workers - iLearnHow Synthesis Platform
 * Enterprise-grade serverless functions for educational content synthesis
 * @version 1.0.0
 * @author iLearnHow
 */

// Import worker modules
import { handleSynthesisAPI } from './handlers/synthesis-api.js';
import { handleBackgroundJobs } from './handlers/background-jobs.js';
import { handleAssetStorage } from './handlers/asset-storage.js';
import { handleCaching } from './handlers/caching.js';
import { handleMonitoring } from './handlers/monitoring.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const startTime = Date.now();
    
    try {
      // Add CORS headers
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      };

      // Handle preflight requests
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      // Route requests based on path
      if (url.pathname.startsWith('/api/synthesis')) {
        return await handleSynthesisAPI(request, env, ctx);
      }
      
      if (url.pathname.startsWith('/api/jobs')) {
        return await handleBackgroundJobs(request, env, ctx);
      }
      
      if (url.pathname.startsWith('/api/assets')) {
        return await handleAssetStorage(request, env, ctx);
      }
      
      if (url.pathname.startsWith('/api/cache')) {
        return await handleCaching(request, env, ctx);
      }

      // Default response
      return new Response(JSON.stringify({
        message: 'iLearnHow Synthesis API',
        version: env.API_VERSION,
        environment: env.ENVIRONMENT,
        endpoints: {
          synthesis: '/api/synthesis',
          jobs: '/api/jobs',
          assets: '/api/assets',
          cache: '/api/cache'
        }
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });

    } catch (error) {
      // Log error to monitoring
      await handleMonitoring('error', {
        error: error.message,
        stack: error.stack,
        url: request.url,
        method: request.method,
        duration: Date.now() - startTime
      }, env);

      return new Response(JSON.stringify({
        error: 'Internal Server Error',
        message: env.ENVIRONMENT === 'development' ? error.message : 'Something went wrong'
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