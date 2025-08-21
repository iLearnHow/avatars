/**
 * Asset Storage Handler
 * R2 bucket management for curriculum data and user assets
 */

export async function handleAssetStorage(request, env, ctx) {
  const url = new URL(request.url);
  
  if (request.method === 'GET') {
    return await getAsset(request, env);
  }
  
  if (request.method === 'PUT') {
    return await uploadAsset(request, env);
  }
  
  if (request.method === 'DELETE') {
    return await deleteAsset(request, env);
  }
  
  if (request.method === 'POST' && url.pathname === '/api/assets/list') {
    return await listAssets(request, env);
  }
  
  return new Response(JSON.stringify({
    error: 'Method not allowed',
    allowed: ['GET', 'PUT', 'DELETE', 'POST']
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function getAsset(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/assets/', '');
  
  if (!path) {
    return new Response(JSON.stringify({
      error: 'Asset path required'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const object = await env.ILEARNHOW_ASSETS.get(path);
    
    if (!object) {
      return new Response(JSON.stringify({
        error: 'Asset not found',
        path
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const headers = new Headers();
    headers.set('Content-Type', getContentType(path));
    headers.set('Cache-Control', 'public, max-age=3600');
    headers.set('ETag', object.etag);
    
    return new Response(object.body, { headers });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to retrieve asset',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function uploadAsset(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/assets/', '');
  
  if (!path) {
    return new Response(JSON.stringify({
      error: 'Asset path required'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const body = await request.arrayBuffer();
    const contentType = request.headers.get('Content-Type') || getContentType(path);
    
    await env.ILEARNHOW_ASSETS.put(path, body, {
      httpMetadata: {
        contentType,
        cacheControl: 'public, max-age=3600'
      }
    });
    
    // Invalidate cache for this asset
    await env.ILEARNHOW_CACHE.delete(`asset:${path}`);
    
    return new Response(JSON.stringify({
      success: true,
      path,
      size: body.byteLength,
      uploadedAt: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to upload asset',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function deleteAsset(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/assets/', '');
  
  if (!path) {
    return new Response(JSON.stringify({
      error: 'Asset path required'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    await env.ILEARNHOW_ASSETS.delete(path);
    
    // Invalidate cache for this asset
    await env.ILEARNHOW_CACHE.delete(`asset:${path}`);
    
    return new Response(JSON.stringify({
      success: true,
      path,
      deletedAt: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to delete asset',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function listAssets(request, env) {
  try {
    const { prefix = '', limit = 100 } = await request.json();
    
    const objects = await env.ILEARNHOW_ASSETS.list({
      prefix,
      limit: Math.min(limit, 1000)
    });
    
    const assets = objects.objects.map(obj => ({
      key: obj.key,
      size: obj.size,
      uploaded: obj.uploaded,
      etag: obj.etag
    }));
    
    return new Response(JSON.stringify({
      assets,
      truncated: objects.truncated,
      cursor: objects.cursor,
      total: assets.length
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to list assets',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function getContentType(path) {
  const ext = path.split('.').pop().toLowerCase();
  
  const contentTypes = {
    'json': 'application/json',
    'js': 'application/javascript',
    'css': 'text/css',
    'html': 'text/html',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'txt': 'text/plain',
    'md': 'text/markdown'
  };
  
  return contentTypes[ext] || 'application/octet-stream';
}

// Utility function to migrate existing assets to R2
export async function migrateAssetsToR2(env) {
  const assetsToMigrate = [
    'assets/data/the-sun-dna.json',
    'assets/data/curriculum/january_curriculum.json',
    'assets/data/curriculum/february_curriculum.json'
  ];
  
  for (const assetPath of assetsToMigrate) {
    try {
      // Check if asset already exists in R2
      const existing = await env.ILEARNHOW_ASSETS.get(assetPath);
      if (existing) {
        console.log(`Asset ${assetPath} already exists in R2`);
        continue;
      }
      
      // Fetch from current location and upload to R2
      const response = await fetch(`https://3a17ab1a.ilearnhow-synthesis.pages.dev/${assetPath}`);
      if (response.ok) {
        const body = await response.arrayBuffer();
        await env.ILEARNHOW_ASSETS.put(assetPath, body, {
          httpMetadata: {
            contentType: getContentType(assetPath),
            cacheControl: 'public, max-age=86400'
          }
        });
        console.log(`Migrated ${assetPath} to R2`);
      }
    } catch (error) {
      console.error(`Failed to migrate ${assetPath}:`, error);
    }
  }
} 