#!/bin/bash

# 🧹 Clean System Runner for iLearn How
# This script starts the clean, single-system architecture

echo "🚀 Starting Clean iLearn How System..."

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the ilearn_how directory."
    exit 1
fi

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
else
    echo "❌ Error: Python 3 is required but not installed."
    exit 1
fi

# Create avatar directories if they don't exist
if [ ! -d "assets/avatars/kelly" ]; then
    echo "📁 Creating avatar directories..."
    mkdir -p assets/avatars/kelly assets/avatars/ken
fi

# Check if curriculum file exists
if [ ! -f "complete-curriculum.js" ]; then
    echo "⚠️  Warning: complete-curriculum.js not found. System will use fallback data."
fi

echo "🌐 Starting HTTP server on port 8000..."
echo "📱 Open your browser and go to: http://localhost:8000"
echo "🧪 Test the system at: http://localhost:8000/test-clean-system.html"
echo ""
echo "🎯 Clean System Features:"
echo "   ✅ Single-system architecture"
echo "   ✅ No conflicting event handlers"
echo "   ✅ Clean, maintainable code"
echo "   ✅ Reliable lesson progression"
echo "   ✅ Simple avatar switching"
echo "   ✅ Calendar day selection"
echo "   ✅ Keyboard shortcuts"
echo ""
echo "⌨️  Keyboard Shortcuts:"
echo "   Space: Play/Pause"
echo "   →: Next phase"
echo "   ←: Previous phase"
echo "   R: Repeat current phase"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Start the HTTP server
python3 -m http.server 8000 