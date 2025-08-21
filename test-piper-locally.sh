#!/bin/bash

echo "🧪 Testing Piper TTS Locally with Docker"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "1️⃣ Building Docker image..."
docker build -f Dockerfile.piper -t piper-tts-test .

echo ""
echo "2️⃣ Starting TTS server..."
docker run -d --name piper-test -p 5002:5002 piper-tts-test

echo ""
echo "3️⃣ Waiting for server to start..."
sleep 5

echo ""
echo "4️⃣ Testing TTS generation..."
./test-tts-deployment.sh http://localhost:5002

echo ""
echo "5️⃣ Cleaning up..."
docker stop piper-test
docker rm piper-test

echo ""
echo "✅ Local test complete!"
echo ""
echo "If everything worked, deploy to Railway:"
echo "👉 https://railway.app"
