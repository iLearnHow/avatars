#!/usr/bin/env python3
"""
Test script for Flask backend
"""

import requests
import json

def test_flask_backend():
    """Test Flask backend endpoints"""
    base_url = "http://localhost:5001"
    
    print("🧪 Testing Flask Backend...")
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/api/health")
        print(f"✅ Health check: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Backend: {data.get('backend')}")
            print(f"   Version: {data.get('version')}")
    except requests.exceptions.ConnectionError:
        print("❌ Flask backend not running on localhost:5000")
        return False
    
    # Test lesson data endpoint
    try:
        response = requests.get(f"{base_url}/api/lessons/1")
        print(f"✅ Lesson data: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Day: {data.get('day')}")
            print(f"   Phases: {len(data.get('phases', {}))}")
    except Exception as e:
        print(f"❌ Lesson data test failed: {e}")
    
    # Test authentication endpoints
    try:
        # Test registration
        register_data = {
            "username": "testuser2",
            "password": "testpass123",
            "email": "test2@ilearnhow.com"
        }
        response = requests.post(f"{base_url}/api/auth/register", json=register_data)
        print(f"✅ Registration: {response.status_code}")
        
        # Test login
        login_data = {
            "username": "testuser2",
            "password": "testpass123"
        }
        response = requests.post(f"{base_url}/api/auth/login", json=login_data)
        print(f"✅ Login: {response.status_code}")
        
    except Exception as e:
        print(f"❌ Auth test failed: {e}")
    
    print("✅ Flask backend tests completed!")
    return True

if __name__ == "__main__":
    test_flask_backend() 