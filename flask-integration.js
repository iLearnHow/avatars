/**
 * Flask Backend Integration for iLearnHow
 * Connects existing UI with Flask backend APIs
 */

class FlaskIntegration {
    constructor() {
        this.baseUrl = 'http://localhost:5001';
        this.isAuthenticated = false;
        this.currentUser = null;
        this.currentSession = null;
        
        console.log('🔗 Initializing Flask Backend Integration...');
        this.initialize();
    }

    async initialize() {
        try {
            // Check if backend is available
            const health = await this.checkHealth();
            if (health.status === 'healthy') {
                console.log('✅ Flask backend connected');
                this.checkAuthStatus();
            } else {
                console.warn('⚠️ Flask backend not available, using fallback');
            }
        } catch (error) {
            console.warn('⚠️ Flask backend not available:', error.message);
        }
    }

    async checkHealth() {
        const response = await fetch(`${this.baseUrl}/api/health`);
        return await response.json();
    }

    async checkAuthStatus() {
        try {
            const response = await fetch(`${this.baseUrl}/api/auth/status`, {
                credentials: 'include'
            });
            const data = await response.json();
            
            if (data.authenticated) {
                this.isAuthenticated = true;
                this.currentUser = {
                    id: data.user_id,
                    username: data.username
                };
                console.log('✅ User authenticated:', this.currentUser.username);
                this.updateUIForAuthenticatedUser();
            } else {
                console.log('ℹ️ User not authenticated');
                this.showLoginPrompt();
            }
        } catch (error) {
            console.warn('⚠️ Auth check failed:', error.message);
        }
    }

    async register(username, password, email = '') {
        try {
            const response = await fetch(`${this.baseUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, password, email })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.isAuthenticated = true;
                this.currentUser = {
                    id: data.user_id,
                    username: data.username
                };
                console.log('✅ User registered successfully');
                this.updateUIForAuthenticatedUser();
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.error };
            }
        } catch (error) {
            return { success: false, message: 'Registration failed: ' + error.message };
        }
    }

    async login(username, password) {
        try {
            const response = await fetch(`${this.baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.isAuthenticated = true;
                this.currentUser = {
                    id: data.user_id,
                    username: data.username
                };
                console.log('✅ User logged in successfully');
                this.updateUIForAuthenticatedUser();
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.error };
            }
        } catch (error) {
            return { success: false, message: 'Login failed: ' + error.message };
        }
    }

    async logout() {
        try {
            await fetch(`${this.baseUrl}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            
            this.isAuthenticated = false;
            this.currentUser = null;
            console.log('✅ User logged out');
            this.updateUIForUnauthenticatedUser();
        } catch (error) {
            console.warn('⚠️ Logout failed:', error.message);
        }
    }

    async updateLessonProgress(lessonDay, phase, completed = false, answers = [], timeSpent = 0) {
        if (!this.isAuthenticated) {
            console.warn('⚠️ User not authenticated, cannot update progress');
            return;
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/lessons/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    lesson_day: lessonDay,
                    phase: phase,
                    completed: completed,
                    answers: answers,
                    time_spent: timeSpent
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log(`✅ Progress updated for lesson ${lessonDay}, phase ${phase}`);
                return { success: true, message: data.message };
            } else {
                console.error('❌ Progress update failed:', data.error);
                return { success: false, message: data.error };
            }
        } catch (error) {
            console.error('❌ Progress update failed:', error.message);
            return { success: false, message: 'Progress update failed: ' + error.message };
        }
    }

    async getLessonProgress(lessonDay = null) {
        if (!this.isAuthenticated) {
            console.warn('⚠️ User not authenticated, cannot get progress');
            return [];
        }

        try {
            const url = lessonDay 
                ? `${this.baseUrl}/api/lessons/progress?day=${lessonDay}`
                : `${this.baseUrl}/api/lessons/progress`;
            
            const response = await fetch(url, {
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log(`✅ Retrieved progress data`);
                return data.progress || [];
            } else {
                console.error('❌ Progress retrieval failed:', data.error);
                return [];
            }
        } catch (error) {
            console.error('❌ Progress retrieval failed:', error.message);
            return [];
        }
    }

    async getHabitStatus() {
        if (!this.isAuthenticated) {
            console.warn('⚠️ User not authenticated, cannot get habit status');
            return null;
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/habits/status`, {
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log('✅ Retrieved habit status');
                return data;
            } else {
                console.error('❌ Habit status retrieval failed:', data.error);
                return null;
            }
        } catch (error) {
            console.error('❌ Habit status retrieval failed:', error.message);
            return null;
        }
    }

    async updateUserPreferences(preferences) {
        if (!this.isAuthenticated) {
            console.warn('⚠️ User not authenticated, cannot update preferences');
            return;
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/user/preferences`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(preferences)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log('✅ User preferences updated');
                return { success: true, message: data.message };
            } else {
                console.error('❌ Preferences update failed:', data.error);
                return { success: false, message: data.error };
            }
        } catch (error) {
            console.error('❌ Preferences update failed:', error.message);
            return { success: false, message: 'Preferences update failed: ' + error.message };
        }
    }

    async getLessonData(day) {
        try {
            const response = await fetch(`${this.baseUrl}/api/lessons/${day}`);
            const data = await response.json();
            
            if (response.ok) {
                console.log(`✅ Retrieved lesson data for day ${day}`);
                return data;
            } else {
                console.error('❌ Lesson data retrieval failed:', data.error);
                return null;
            }
        } catch (error) {
            console.error('❌ Lesson data retrieval failed:', error.message);
            return null;
        }
    }

    // UI Integration Methods
    updateUIForAuthenticatedUser() {
        // Update UI to show user is logged in
        const userInfo = document.createElement('div');
        userInfo.id = 'user-info';
        userInfo.innerHTML = `
            <div style="position: fixed; top: 20px; left: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 8px; z-index: 1000;">
                👤 ${this.currentUser.username}
                <button onclick="flaskIntegration.logout()" style="margin-left: 10px; background: #ff4444; border: none; color: white; padding: 2px 8px; border-radius: 4px; cursor: pointer;">Logout</button>
            </div>
        `;
        
        // Remove existing user info if present
        const existing = document.getElementById('user-info');
        if (existing) existing.remove();
        
        document.body.appendChild(userInfo);
        
        // Update lesson player to use authenticated progress
        if (window.lessonPlayer) {
            window.lessonPlayer.useFlaskProgress = true;
        }
    }

    updateUIForUnauthenticatedUser() {
        // Remove user info
        const userInfo = document.getElementById('user-info');
        if (userInfo) userInfo.remove();
        
        // Show login prompt
        this.showLoginPrompt();
    }

    showLoginPrompt() {
        // Create login modal
        const loginModal = document.createElement('div');
        loginModal.id = 'login-modal';
        loginModal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 10000;">
                <div style="background: white; padding: 30px; border-radius: 12px; max-width: 400px; width: 90%;">
                    <h2>Welcome to iLearnHow</h2>
                    <p>Please log in or register to track your progress:</p>
                    
                    <div style="margin: 20px 0;">
                        <input type="text" id="login-username" placeholder="Username" style="width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ddd; border-radius: 4px;">
                        <input type="password" id="login-password" placeholder="Password" style="width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ddd; border-radius: 4px;">
                        <button onclick="flaskIntegration.handleLogin()" style="width: 100%; padding: 10px; background: #007AFF; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 5px 0;">Login</button>
                        <button onclick="flaskIntegration.handleRegister()" style="width: 100%; padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 5px 0;">Register</button>
                    </div>
                    
                    <button onclick="flaskIntegration.hideLoginPrompt()" style="background: #666; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Continue without login</button>
                </div>
            </div>
        `;
        
        // Remove existing modal if present
        const existing = document.getElementById('login-modal');
        if (existing) existing.remove();
        
        document.body.appendChild(loginModal);
    }

    hideLoginPrompt() {
        const loginModal = document.getElementById('login-modal');
        if (loginModal) loginModal.remove();
    }

    async handleLogin() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        if (!username || !password) {
            alert('Please enter username and password');
            return;
        }
        
        const result = await this.login(username, password);
        if (result.success) {
            this.hideLoginPrompt();
            alert('Login successful!');
        } else {
            alert('Login failed: ' + result.message);
        }
    }

    async handleRegister() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        if (!username || !password) {
            alert('Please enter username and password');
            return;
        }
        
        const result = await this.register(username, password);
        if (result.success) {
            this.hideLoginPrompt();
            alert('Registration successful!');
        } else {
            alert('Registration failed: ' + result.message);
        }
    }

    // Integration with existing lesson player
    integrateWithLessonPlayer() {
        if (window.lessonPlayer) {
            // Override progress tracking to use Flask backend
            const originalUpdateProgress = window.lessonPlayer.updateProgress;
            window.lessonPlayer.updateProgress = async function(lessonDay, phase, completed, answers, timeSpent) {
                // Call Flask backend
                if (window.flaskIntegration && window.flaskIntegration.isAuthenticated) {
                    await window.flaskIntegration.updateLessonProgress(lessonDay, phase, completed, answers, timeSpent);
                }
                
                // Call original method if it exists
                if (originalUpdateProgress) {
                    originalUpdateProgress.call(this, lessonDay, phase, completed, answers, timeSpent);
                }
            };
            
            console.log('✅ Flask integration connected to lesson player');
        }
    }
}

// Initialize Flask integration
window.flaskIntegration = new FlaskIntegration();

// Integrate with lesson player when it's ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.flaskIntegration.integrateWithLessonPlayer();
    }, 1000);
}); 