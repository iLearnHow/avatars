# iLearnHow Enterprise Synthesis Platform

## Overview

The iLearnHow Enterprise Synthesis Platform is a multi-tier, high-performance system designed to deliver personalized educational content synthesis with enterprise-grade reliability, performance, and cost management.

## Architecture

### Multi-Tier Caching Strategy

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │───▶│  Cloudflare KV  │───▶│   Redis Cache   │
│                 │    │   (Backup)      │    │   (Primary)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN Assets    │    │  Rate Limiting  │    │  Cost Tracking  │
│   (Static)      │    │   (KV Store)    │    │   (Analytics)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Components

1. **Frontend**: React-based lesson player with synthesis controls
2. **Cloudflare Workers**: Edge computing for global performance
3. **Redis (Upstash)**: Primary caching layer
4. **Cloudflare KV**: Backup caching and metadata storage
5. **Claude API**: AI synthesis engine
6. **R2 Storage**: Static asset storage

## Infrastructure

### Cloudflare Resources

- **KV Namespaces**:
  - `LESSON_CACHE_KV`: Primary lesson caching
  - `STATIC_ASSETS_KV`: Static asset metadata
  - `RATE_LIMIT_KV`: Rate limiting counters
  - `ANALYTICS_KV`: Performance and cost analytics

- **R2 Bucket**: `ilearnhow-assets` for static file storage

### Redis Configuration

- **Provider**: Upstash Redis
- **Host**: `steady-earwig-10527.upstash.io`
- **Port**: `6379`
- **Use Case**: Primary caching layer for synthesis results

## API Endpoints

### Synthesis API

```http
POST /api/synthesize
Content-Type: application/json
X-Client-ID: your-client-id

{
  "lessonId": "lesson-123",
  "age": 8,
  "tone": "friendly",
  "curriculum": "math-grade-2"
}
```

### Health Check

```http
GET /api/health
```

## Performance Metrics

### Targets

- **Synthesis Time**: < 200ms (target), < 5000ms (max)
- **Cache Hit Rate**: > 80%
- **Error Rate**: < 5%
- **Cost per Lesson**: < $0.05

### Monitoring

- Real-time performance tracking
- Cost budget management
- Rate limiting per client
- Error tracking and alerting

## Cost Management

### Budget Controls

- **Daily Budget**: $500 (configurable)
- **Monthly Budget**: $2000 (configurable)
- **Max Cost per Lesson**: $0.05 (configurable)

### Cost Tracking

- Real-time cost monitoring
- Daily and monthly cost aggregation
- Budget alerts at 90% threshold
- Cost per lesson validation

## Rate Limiting

### Default Limits

- **Per Minute**: 60 requests
- **Per Hour**: 1000 requests
- **Per Day**: 10000 requests

### Client Tiers

- **Premium**: 2x default limits
- **Enterprise**: 5x default limits
- **Standard**: Default limits

## Caching Strategy

### Cache Layers

1. **Redis (Primary)**: Fastest access, 1-hour TTL
2. **Cloudflare KV (Backup)**: Global distribution, 1-hour TTL
3. **CDN (Static)**: Curriculum files and assets

### Cache Keys

```
synthesis:{lessonId}:{age}:{tone}
lesson:{lessonId}
cost:daily:{date}
cost:monthly:{month}
rate:{clientId}:{period}:{window}
```

## Deployment

### Build Commands

```bash
# Development
npm run dev

# Enterprise build
npm run build:enterprise

# Deploy to Cloudflare
npm run deploy:enterprise
```

### Environment Variables

```bash
# AI Provider
CLAUDE_API_KEY=your-claude-key

# Redis Configuration
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Budget Controls
DAILY_AI_BUDGET=500
MONTHLY_AI_BUDGET=2000
MAX_COST_PER_LESSON=0.05

# Performance Thresholds
TARGET_SYNTHESIS_TIME=200
MAX_SYNTHESIS_TIME=5000
```

## Monitoring & Analytics

### Health Checks

- System health monitoring
- Performance metrics tracking
- Error rate monitoring
- Cache hit rate analysis

### Alerts

- Performance degradation alerts
- Budget threshold alerts
- Error rate alerts
- Cache performance alerts

## Security

### Rate Limiting

- Per-client rate limiting
- IP-based rate limiting
- Request validation

### API Security

- Client ID validation
- Request sanitization
- Error message sanitization

## Scaling

### Horizontal Scaling

- Cloudflare Workers auto-scaling
- Redis cluster support
- KV namespace distribution

### Performance Optimization

- Cache warming strategies
- Request batching
- Response compression

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Use `lsof -ti:3000` to find and kill processes
2. **Cache Misses**: Check Redis connectivity and KV namespace access
3. **Rate Limiting**: Verify client ID and check limits
4. **Budget Exceeded**: Monitor daily/monthly spending

### Debug Commands

```bash
# Check port usage
lsof -ti:3000

# Test KV access
wrangler kv key get --binding=LESSON_CACHE_KV "test-key"

# Check Redis connection
redis-cli -h your-redis-host ping

# View worker logs
wrangler tail
```

## Support

For enterprise support and custom configurations, contact the iLearnHow team.

---

**Last Updated**: July 27, 2025
**Version**: 1.0.0
**Status**: Production Ready 