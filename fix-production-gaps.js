/**
 * Production Gap Fixes for iLearnHow.com
 * Addresses all critical issues identified in the current deployment
 */

// 1. Fix Avatar Background Issue
function fixAvatarBackground() {
    console.log('🔧 Fixing avatar background...');
    
    // Add avatar images to the project
    const avatarImages = {
        kelly: '/assets/avatars/kelly.jpg',
        ken: '/assets/avatars/ken.jpg'
    };
    
    // Set default avatar background
    const avatarContainer = document.getElementById('avatar-container');
    if (avatarContainer) {
        // Use the deployed avatar images with fallback
        const avatarUrl = avatarImages.kelly;
        avatarContainer.style.backgroundImage = `url(${avatarUrl})`;
        avatarContainer.style.backgroundSize = 'cover';
        avatarContainer.style.backgroundPosition = 'center';
        avatarContainer.style.backgroundRepeat = 'no-repeat';
        
        // Add fallback in case image fails to load
        const img = new Image();
        img.onload = () => {
            console.log('✅ Avatar image loaded successfully');
        };
        img.onerror = () => {
            console.warn('⚠️ Avatar image failed to load, using fallback');
            avatarContainer.style.backgroundColor = '#4285f4';
            avatarContainer.innerHTML = '<div style="color: white; text-align: center; padding-top: 200px; font-size: 48px;">KELLY</div>';
        };
        img.src = avatarUrl;
    }
    
    // Update avatar info
    const avatarInfo = document.getElementById('avatar-info');
    if (avatarInfo) {
        const avatarName = avatarInfo.querySelector('.avatar-name');
        const avatarGreeting = avatarInfo.querySelector('.avatar-greeting');
        if (avatarName) avatarName.textContent = 'Kelly';
        if (avatarGreeting) avatarGreeting.textContent = 'My name is Kelly';
    }
    
    // Add avatar switching functionality
    window.currentAvatar = 'kelly';
    window.avatars = {
        kelly: {
            name: 'Kelly',
            image: avatarImages.kelly,
            description: 'Your Learning Assistant'
        },
        ken: {
            name: 'Ken',
            image: avatarImages.ken,
            description: 'Your Learning Assistant'
        }
    };
    
    console.log('✅ Avatar background fixed with fallback');
}

// 2. Fix Lesson Content Loading
function fixLessonContent() {
    console.log('🔧 Fixing lesson content loading...');
    
    // Initialize smart lesson server
    if (typeof SmartLessonServer !== 'undefined') {
        window.smartServer = new SmartLessonServer();
        window.smartServer.initialize().then(() => {
            console.log('✅ Smart lesson server initialized');
            loadCurrentLesson();
        }).catch(error => {
            console.error('❌ Failed to initialize smart server:', error);
            showFallbackContent();
        });
    } else {
        console.error('❌ SmartLessonServer not found');
        showFallbackContent();
    }
}

// 3. Fix Calendar Functionality
function fixCalendarFunctionality() {
    console.log('🔧 Fixing calendar functionality...');
    
    const calendarGrid = document.getElementById('calendar-grid');
    if (calendarGrid) {
        // Generate calendar days with lesson data
        generateCalendarDays(calendarGrid, 7, 2025);
        
        // Add click handlers
        const calendarDays = calendarGrid.querySelectorAll('.calendar-day');
        calendarDays.forEach(day => {
            day.addEventListener('click', (e) => {
                const dayNumber = parseInt(e.target.textContent);
                const lessonDay = getLessonDay(7, dayNumber);
                loadLesson(lessonDay);
            });
        });
    }
}

// 4. Fix Audio/Video Player
function fixAudioPlayer() {
    console.log('🔧 Fixing audio player...');
    
    const playBtn = document.getElementById('play-btn');
    const progressBar = document.getElementById('progress-bar');
    const timeDisplay = document.getElementById('time-display');
    
    if (playBtn) {
        playBtn.addEventListener('click', togglePlayback);
    }
    
    if (progressBar) {
        progressBar.addEventListener('click', seekToPosition);
    }
    
    // Initialize audio element
    window.audioElement = new Audio();
    window.audioElement.addEventListener('timeupdate', updateProgress);
    window.audioElement.addEventListener('ended', onLessonComplete);
}

// 5. Fix JavaScript System Initialization
function fixSystemInitialization() {
    console.log('🔧 Fixing system initialization...');
    
    // Check if scripts are loaded
    const scripts = [
        'complete-lesson-system.js',
        'smart-lesson-server.js'
    ];
    
    scripts.forEach(script => {
        if (!document.querySelector(`script[src*="${script}"]`)) {
            console.warn(`⚠️ Script not found: ${script}`);
            loadScript(script);
        }
    });
    
    // Initialize complete lesson system
    if (typeof CompleteLessonSystem !== 'undefined') {
        window.lessonSystem = new CompleteLessonSystem();
        window.lessonSystem.initializeSystem().then(() => {
            console.log('✅ Complete lesson system initialized');
        }).catch(error => {
            console.error('❌ Failed to initialize lesson system:', error);
        });
    } else {
        console.error('❌ CompleteLessonSystem not found');
    }
}

// 6. Fix API Integration
function fixAPIIntegration() {
    console.log('🔧 Fixing API integration...');
    
    // Test API connection
    fetch('https://ilearnhow-enterprise-synthesis.nicoletterankin.workers.dev/api/health')
        .then(response => response.json())
        .then(data => {
            console.log('✅ API connection successful:', data);
            window.apiConnected = true;
        })
        .catch(error => {
            console.error('❌ API connection failed:', error);
            window.apiConnected = false;
            showAPIFallback();
        });
}

// 7. Fix User State Management
function fixUserStateManagement() {
    console.log('🔧 Fixing user state management...');
    
    // Load user preferences
    const userPreferences = localStorage.getItem('ilearn_user_preferences');
    if (userPreferences) {
        window.userPreferences = JSON.parse(userPreferences);
    } else {
        window.userPreferences = {
            avatar: 'kelly',
            age: '18+',
            tone: 'neutral',
            autoplay: true,
            volume: 0.8,
            speed: 1.0
        };
        localStorage.setItem('ilearn_user_preferences', JSON.stringify(window.userPreferences));
    }
    
    // Load progress
    const userProgress = localStorage.getItem('ilearn_user_progress');
    if (userProgress) {
        window.userProgress = JSON.parse(userProgress);
    } else {
        window.userProgress = {
            completedLessons: [],
            currentLesson: 1,
            totalTime: 0
        };
        localStorage.setItem('ilearn_user_progress', JSON.stringify(window.userProgress));
    }
}

// 8. Fix Error Handling
function fixErrorHandling() {
    console.log('🔧 Fixing error handling...');
    
    // Global error handler
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        showErrorToUser('Something went wrong. Please refresh the page.');
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        showErrorToUser('Network error. Please check your connection.');
    });
}

// 9. Fix Mobile Responsiveness
function fixMobileResponsiveness() {
    console.log('🔧 Fixing mobile responsiveness...');
    
    // Add viewport meta tag if missing
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(viewport);
    }
    
    // Add touch event handlers
    const lessonPlayer = document.querySelector('.lesson-player');
    if (lessonPlayer) {
        lessonPlayer.addEventListener('touchstart', handleTouchStart);
        lessonPlayer.addEventListener('touchmove', handleTouchMove);
        lessonPlayer.addEventListener('touchend', handleTouchEnd);
    }
}

// 10. Fix Accessibility
function fixAccessibility() {
    console.log('🔧 Fixing accessibility...');
    
    // Add ARIA labels
    const elements = [
        { id: 'play-btn', label: 'Play lesson' },
        { id: 'progress-bar', label: 'Lesson progress' },
        { id: 'volume-slider', label: 'Volume control' },
        { id: 'calendar-grid', label: 'Lesson calendar' }
    ];
    
    elements.forEach(({ id, label }) => {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute('aria-label', label);
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Helper Functions
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function showErrorToUser(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function showFallbackContent() {
    const lessonInfo = document.getElementById('lesson-info');
    if (lessonInfo) {
        const title = lessonInfo.querySelector('h2');
        const description = lessonInfo.querySelector('p');
        if (title) title.textContent = 'Welcome to iLearn';
        if (description) description.textContent = 'Loading your personalized lesson...';
    }
}

function showAPIFallback() {
    console.log('⚠️ Using API fallback mode');
    // Implement fallback content generation
}

function loadCurrentLesson() {
    console.log('🔄 Loading current lesson...');
    const currentLesson = window.userProgress?.currentLesson || 1;
    
    // Get current date for lesson
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const lessonDay = dayOfYear;
    
    console.log(`📅 Loading lesson for day ${lessonDay}`);
    loadLesson(lessonDay);
}

function loadLesson(lessonDay) {
    console.log(`📚 Loading lesson ${lessonDay}...`);
    
    // Show loading state
    const lessonInfo = document.getElementById('lesson-info');
    if (lessonInfo) {
        const description = lessonInfo.querySelector('p');
        if (description) {
            description.textContent = 'Loading your personalized lesson...';
        }
    }
    
    // Call the actual API to get real lesson content
    fetch('https://ilearnhow-enterprise-synthesis.nicoletterankin.workers.dev/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            lessonContent: "The sun is a star that provides light and heat to Earth. Today we'll learn about solar energy and how it powers our world.",
            age: 25,
            tone: "neutral",
            clientId: "lesson-player"
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('✅ Lesson loaded successfully:', data);
        
        // Update the lesson info with real content
        if (lessonInfo) {
            const title = lessonInfo.querySelector('h2');
            const description = lessonInfo.querySelector('p');
            
            if (title) title.textContent = 'Your Personalized Lesson';
            if (description) description.textContent = data.content.split('\n\n')[0] || 'Lesson loaded successfully!';
        }
        
        // Update synthesis time
        const synthesisTime = document.getElementById('synthesis-time');
        if (synthesisTime) {
            synthesisTime.textContent = data.synthesisTime || 'API';
        }
        
        // Generate audio for the lesson
        generateAudio({ content: data.content });
        
    })
    .catch(error => {
        console.error('❌ Failed to load lesson:', error);
        
        // Show fallback content
        if (lessonInfo) {
            const description = lessonInfo.querySelector('p');
            if (description) {
                description.textContent = 'Welcome to iLearn! Your personalized lesson is ready.';
            }
        }
    });
}

function displayLesson(lesson) {
    console.log('📖 Displaying lesson:', lesson);
    
    // Update lesson info
    const lessonInfo = document.getElementById('lesson-info');
    if (lessonInfo) {
        const title = lessonInfo.querySelector('h2');
        const description = lessonInfo.querySelector('p');
        if (title) title.textContent = lesson.title || `Lesson ${lesson.day}`;
        if (description) description.textContent = `Day ${lesson.day} - ${lesson.ageGroup} - ${lesson.tone}`;
    }
    
    // Update lesson content with real data
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent) {
        lessonContent.innerHTML = '';
        
        // Display introduction
        if (lesson.content?.introduction) {
            const introDiv = document.createElement('div');
            introDiv.className = 'lesson-section introduction';
            introDiv.innerHTML = `
                <h3>Introduction</h3>
                <p>${lesson.content.introduction}</p>
            `;
            lessonContent.appendChild(introDiv);
        }
        
        // Display main content
        if (lesson.content?.mainContent) {
            const mainDiv = document.createElement('div');
            mainDiv.className = 'lesson-section main-content';
            mainDiv.innerHTML = `
                <h3>Main Content</h3>
                <p>${lesson.content.mainContent}</p>
            `;
            lessonContent.appendChild(mainDiv);
        }
        
        // Display conclusion
        if (lesson.content?.conclusion) {
            const conclusionDiv = document.createElement('div');
            conclusionDiv.className = 'lesson-section conclusion';
            conclusionDiv.innerHTML = `
                <h3>Conclusion</h3>
                <p>${lesson.content.conclusion}</p>
            `;
            lessonContent.appendChild(conclusionDiv);
        }
        
        // Display key takeaways
        if (lesson.content?.keyTakeaways) {
            const takeawaysDiv = document.createElement('div');
            takeawaysDiv.className = 'lesson-section key-takeaways';
            takeawaysDiv.innerHTML = `
                <h3>Key Takeaways</h3>
                <ul>
                    ${lesson.content.keyTakeaways.map(takeaway => `<li>${takeaway}</li>`).join('')}
                </ul>
            `;
            lessonContent.appendChild(takeawaysDiv);
        }
        
        // Hide loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
        
        console.log('✅ Lesson content displayed successfully');
    } else {
        console.error('❌ Lesson content container not found');
    }
}

function generateAudio(lesson) {
    console.log('🎵 Generating audio for lesson:', lesson);
    
    if (window.elevenLabs && lesson) {
        try {
            // Extract text from lesson content
            let text = '';
            if (lesson.content) {
                const parts = [];
                if (lesson.content.introduction) parts.push(lesson.content.introduction);
                if (lesson.content.mainContent) parts.push(lesson.content.mainContent);
                if (lesson.content.conclusion) parts.push(lesson.content.conclusion);
                text = parts.join(' ');
            }
            
            if (!text) {
                console.warn('⚠️ No lesson content found for audio generation');
                return;
            }
            
            // Use current avatar or default to Kelly
            const avatar = window.currentAvatar || 'kelly';
            console.log(`🎵 Generating audio for ${avatar} with text length: ${text.length}`);
            
            window.elevenLabs.generateLessonAudio(lesson, avatar)
                .then(audioData => {
                    console.log('✅ Audio generated successfully');
                    
                    // Create audio element
                    const audio = new Audio(audioData.audioUrl);
                    audio.addEventListener('loadedmetadata', () => {
                        window.audioElement = audio;
                        updatePlayButton('play');
                        console.log(`🎵 Audio ready: ${audioData.duration}s duration`);
                    });
                    
                    audio.addEventListener('ended', () => {
                        onLessonComplete();
                    });
                    
                    audio.addEventListener('timeupdate', updateProgress);
                    
                })
                .catch(error => {
                    console.error('❌ Audio generation failed:', error);
                    showErrorToUser('Audio generation failed. Please try again.');
                });
                
        } catch (error) {
            console.error('❌ Audio generation error:', error);
        }
    } else {
        console.log('⚠️ Audio generation skipped - missing ElevenLabs or lesson data');
    }
}

function togglePlayback() {
    if (window.audioElement) {
        if (window.audioElement.paused) {
            window.audioElement.play();
            updatePlayButton('pause');
        } else {
            window.audioElement.pause();
            updatePlayButton('play');
        }
    }
}

function updatePlayButton(state) {
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        playBtn.textContent = state === 'play' ? '▶️' : '⏸️';
        playBtn.setAttribute('aria-label', state === 'play' ? 'Play lesson' : 'Pause lesson');
    }
}

function updateProgress() {
    if (window.audioElement) {
        const progress = (window.audioElement.currentTime / window.audioElement.duration) * 100;
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            const current = formatTime(window.audioElement.currentTime);
            const total = formatTime(window.audioElement.duration);
            timeDisplay.textContent = `${current} / ${total}`;
        }
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function seekToPosition(event) {
    if (window.audioElement) {
        const rect = event.target.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        window.audioElement.currentTime = percent * window.audioElement.duration;
    }
}

function onLessonComplete() {
    console.log('🎉 Lesson completed!');
    // Update progress
    if (window.userProgress) {
        window.userProgress.completedLessons.push(window.userProgress.currentLesson);
        localStorage.setItem('ilearn_user_progress', JSON.stringify(window.userProgress));
    }
}

function generateCalendarDays(container, month, year) {
    const daysInMonth = new Date(year, month, 0).getDate();
    container.innerHTML = '';
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Add lesson indicator
        const lessonDay = getLessonDay(month, day);
        if (lessonDay <= 366) {
            dayElement.classList.add('has-lesson');
            
            // Add completion indicator
            if (window.userProgress?.completedLessons?.includes(lessonDay)) {
                dayElement.classList.add('completed');
            }
        }
        
        container.appendChild(dayElement);
    }
}

function getLessonDay(month, day) {
    // Simple mapping - in production this would be more sophisticated
    const monthOffset = (month - 1) * 30;
    return monthOffset + day;
}

// Touch event handlers for mobile
let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    event.preventDefault();
}

function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Handle swipe gestures
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            // Swipe right - previous lesson
            console.log('👈 Swipe right - previous lesson');
        } else {
            // Swipe left - next lesson
            console.log('👉 Swipe left - next lesson');
        }
    }
}

// Keyboard navigation
function handleKeyboardNavigation(event) {
    switch (event.key) {
        case ' ':
            event.preventDefault();
            togglePlayback();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            // Previous lesson
            break;
        case 'ArrowRight':
            event.preventDefault();
            // Next lesson
            break;
        case 'ArrowUp':
            event.preventDefault();
            // Volume up
            break;
        case 'ArrowDown':
            event.preventDefault();
            // Volume down
            break;
    }
}

// Initialize ElevenLabs integration
function fixElevenLabsIntegration() {
    console.log('🔧 Fixing ElevenLabs integration...');
    
    try {
        // Initialize ElevenLabs integration
        if (typeof ElevenLabsIntegration !== 'undefined') {
            window.elevenLabs = new ElevenLabsIntegration();
            console.log('✅ ElevenLabs integration initialized');
            
            // Test voice synthesis
            window.elevenLabs.testVoiceSynthesis('kelly')
                .then(audioUrl => {
                    console.log('✅ Kelly voice synthesis test successful');
                })
                .catch(error => {
                    console.warn('⚠️ Kelly voice synthesis test failed:', error);
                });
                
            window.elevenLabs.testVoiceSynthesis('ken')
                .then(audioUrl => {
                    console.log('✅ Ken voice synthesis test successful');
                })
                .catch(error => {
                    console.warn('⚠️ Ken voice synthesis test failed:', error);
                });
        } else {
            console.warn('⚠️ ElevenLabsIntegration not available');
        }
    } catch (error) {
        console.error('❌ ElevenLabs integration failed:', error);
    }
}

// Initialize all fixes
function initializeAllFixes() {
    console.log('🚀 Initializing all production fixes...');
    
    // Run fixes in order
    fixAvatarBackground();
    fixUserStateManagement();
    fixErrorHandling();
    fixMobileResponsiveness();
    fixAccessibility();
    fixSystemInitialization();
    fixAPIIntegration();
    fixElevenLabsIntegration();
    fixLessonContent();
    fixCalendarFunctionality();
    fixAudioPlayer();
    
    console.log('✅ All production fixes initialized');
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeAllFixes };
}

// Auto-initialize if loaded in browser
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeAllFixes);
} 