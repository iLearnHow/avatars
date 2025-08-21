const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression
app.use(compression());

// Enable CORS for all routes
app.use(cors());

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Serve static files from production-deploy directory
app.use(express.static(path.join(__dirname, 'production-deploy'), {
    maxAge: '1d',
    setHeaders: (res, path) => {
        // Set caching headers based on file type
        if (path.endsWith('.png') || path.endsWith('.jpg')) {
            // Avatar images - cache for 1 year
            if (path.includes('/avatars/')) {
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            } else {
                res.setHeader('Cache-Control', 'public, max-age=86400');
            }
        } else if (path.endsWith('.js') || path.endsWith('.css')) {
            // Scripts and styles - cache for 1 hour
            res.setHeader('Cache-Control', 'public, max-age=3600');
        } else if (path.endsWith('.html')) {
            // HTML files - no cache
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API endpoint for avatar manifest
app.get('/api/manifest', (req, res) => {
    try {
        const manifest = require('./production-deploy/asset-manifest.json');
        res.json(manifest);
    } catch (error) {
        res.status(404).json({ error: 'Manifest not found' });
    }
});

// Catch-all route - serve index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'production-deploy', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 iLearn How server running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Serving from: ${path.join(__dirname, 'production-deploy')}`);
    console.log(`   Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});
