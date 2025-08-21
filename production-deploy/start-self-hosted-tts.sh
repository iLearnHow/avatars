#!/bin/bash

# Start Self-Hosted TTS Server
# No Railway dependency - runs completely on your machine

echo "🎤 Starting Self-Hosted TTS Server..."
echo "====================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "self-hosted-tts-server.py" ]; then
    echo -e "${RED}❌ Error: self-hosted-tts-server.py not found${NC}"
    echo "Please run this script from the production-deploy directory"
    exit 1
fi

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Error: Python 3 is not installed${NC}"
    echo "Please install Python 3 and try again"
    exit 1
fi

# Check if Flask is installed
if ! python3 -c "import flask" &> /dev/null; then
    echo -e "${YELLOW}⚠️  Flask not found. Installing...${NC}"
    pip3 install flask flask-cors
fi

echo -e "${GREEN}✅ Environment ready${NC}"

# Check voice files
echo -e "\n${YELLOW}🔍 Checking voice files...${NC}"
if [ -f "../dist/reference_kelly.wav" ]; then
    echo -e "${GREEN}✅ Kelly reference voice found${NC}"
else
    echo -e "${RED}❌ Kelly reference voice not found${NC}"
fi

if [ -f "../dist/reference_ken_mono16k.wav" ]; then
    echo -e "${GREEN}✅ Ken reference voice found${NC}"
else
    echo -e "${RED}❌ Ken reference voice not found${NC}"
fi

if [ -f "kelly_test.wav" ]; then
    echo -e "${GREEN}✅ Kelly fallback voice found${NC}"
else
    echo -e "${RED}❌ Kelly fallback voice not found${NC}"
fi

if [ -f "test_ken_voice.wav" ]; then
    echo -e "${GREEN}✅ Ken fallback voice found${NC}"
else
    echo -e "${RED}❌ Ken fallback voice not found${NC}"
fi

echo -e "\n${YELLOW}🚀 Starting TTS server...${NC}"
echo "Server will run on: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
python3 self-hosted-tts-server.py
