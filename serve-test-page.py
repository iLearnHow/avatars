#!/usr/bin/env python3
"""
Simple HTTP server to serve the TTS test page locally
This avoids CORS issues when testing the Railway TTS server
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 8080
DIRECTORY = Path(__file__).parent

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow all origins for local testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()
    
    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200)
        self.end_headers()

def main():
    # Change to the directory containing this script
    os.chdir(DIRECTORY)
    
    # Create server
    with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
        print("=" * 60)
        print("🚀 Local TTS Test Server Started!")
        print("=" * 60)
        print(f"📁 Serving from: {DIRECTORY}")
        print(f"🌐 Local URL: http://localhost:{PORT}")
        print(f"🔗 Test Page: http://localhost:{PORT}/test-railway-tts-integration.html")
        print("=" * 60)
        print("💡 This server avoids CORS issues when testing Railway TTS")
        print("🔄 Press Ctrl+C to stop the server")
        print("=" * 60)
        
        # Open the test page in the default browser
        test_url = f"http://localhost:{PORT}/test-railway-tts-integration.html"
        print(f"🌐 Opening test page: {test_url}")
        webbrowser.open(test_url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            httpd.shutdown()

if __name__ == "__main__":
    main()
