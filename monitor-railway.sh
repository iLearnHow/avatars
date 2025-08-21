#!/bin/bash

echo "🚂 Monitoring Railway Deployment"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Railway CLI
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI not found${NC}"
    echo "Please install: npm install -g @railway/cli"
    exit 1
fi

# Function to check deployment status
check_status() {
    echo -e "${YELLOW}📊 Checking deployment status...${NC}"
    
    # Try to get logs (last 10 lines)
    echo ""
    echo "📜 Recent logs:"
    railway logs --tail 10 2>/dev/null || echo "Unable to fetch logs (not logged in?)"
    
    echo ""
    echo "================================"
}

# Function to test TTS endpoint
test_endpoint() {
    if [ -z "$1" ]; then
        echo -e "${YELLOW}No URL provided yet${NC}"
        return
    fi
    
    echo -e "${GREEN}🧪 Testing TTS endpoint: $1${NC}"
    
    # Test health
    echo "Testing /health..."
    curl -s "$1/health" | python3 -m json.tool || echo "Health check failed"
    
    echo ""
}

# Main monitoring loop
echo "Press Ctrl+C to stop monitoring"
echo ""

while true; do
    clear
    echo "🚂 Railway Deployment Monitor"
    echo "============================="
    echo "Time: $(date '+%H:%M:%S')"
    echo ""
    
    check_status
    
    # Check if we have a domain
    DOMAIN=$(railway domain 2>/dev/null | grep -v "error" | head -1)
    if [ ! -z "$DOMAIN" ]; then
        echo -e "${GREEN}✅ Domain available: $DOMAIN${NC}"
        test_endpoint "$DOMAIN"
    else
        echo -e "${YELLOW}⏳ Waiting for domain...${NC}"
        echo "Run 'railway domain' once deployment is complete"
    fi
    
    echo ""
    echo "Refreshing in 30 seconds..."
    sleep 30
done
