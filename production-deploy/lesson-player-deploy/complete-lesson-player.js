/**
 * Complete Lesson Player for iLearnHow
 * Handles all 31 content pieces with avatar mood matching and audio synchronization
 */

class CompleteLessonPlayer {
    constructor() {
        this.currentLesson = null;
        this.currentVariant = 'young_adult_neutral';
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.playbackSpeed = 1;
        this.volume = 0.5;
        this.autoplay = false;
        
        this.lessonGenerator = new CompleteLessonGenerator();
        this.audioElement = null;
        this.currentSegment = 0;
        this.segments = [];
        
        this.initializePlayer();
        this.setupEventListeners();
        this.generateCalendar();
        this.loadCurrentLesson();
    }

    /**
     * Initialize the lesson player
     */
    initializePlayer() {
        console.log('🎬 Initializing Complete Lesson Player...');
        
        // Set default avatar
        this.updateAvatar('kelly', 'welcoming_engaging');
        
        // Initialize audio element
        this.audioElement = new Audio();
        this.setupAudioEvents();
        
        // Set initial volume
        this.setVolume(this.volume);
        
        console.log('✅ Lesson Player initialized');
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Play button
        document.getElementById('play-button').addEventListener('click', () => {
            this.togglePlayback();
        });

        // Start lesson button
        document.getElementById('start-lesson-btn').addEventListener('click', () => {
            this.startLesson();
        });

        // Progress bar
        document.getElementById('progress-bar').addEventListener('click', (e) => {
            this.seekToPosition(e);
        });

        // Volume slider
        document.getElementById('volume-slider').addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });

        // Speed buttons
        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setPlaybackSpeed(parseFloat(e.target.dataset.speed));
            });
        });

        // Autoplay toggle
        document.getElementById('autoplay-toggle').addEventListener('change', (e) => {
            this.autoplay = e.target.checked;
        });

        // Calendar day clicks
        document.getElementById('calendar-grid').addEventListener('click', (e) => {
            if (e.target.classList.contains('calendar-day')) {
                const day = parseInt(e.target.textContent);
                this.loadLessonByDay(day);
            }
        });

        // Navigation icons
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                this.handleNavigation(e.target.dataset.section);
            });
        });

        // Lesson content buttons
        document.getElementById('continue-btn').addEventListener('click', () => {
            this.continueLesson();
        });

        document.getElementById('pause-btn').addEventListener('click', () => {
            this.pauseLesson();
        });

        // Close calendar
        document.getElementById('close-calendar').addEventListener('click', () => {
            this.toggleCalendar();
        });

        // Info button
        document.getElementById('info-button').addEventListener('click', () => {
            this.showLessonInfo();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    /**
     * Setup audio element events
     */
    setupAudioEvents() {
        this.audioElement.addEventListener('loadedmetadata', () => {
            this.duration = this.audioElement.duration;
            this.updateProgressBar();
        });

        this.audioElement.addEventListener('timeupdate', () => {
            this.currentTime = this.audioElement.currentTime;
            this.updateProgressBar();
            this.checkSegmentTransition();
        });

        this.audioElement.addEventListener('ended', () => {
            this.onLessonComplete();
        });

        this.audioElement.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.showError('Audio playback failed');
        });
    }

    /**
     * Load current lesson (day 28 for July)
     */
    async loadCurrentLesson() {
        try {
            this.showLoading();
            
            console.log('📚 Loading current lesson...');
            const lesson = await this.lessonGenerator.generateCompleteLesson(28, 'The Sun', true); // Use fast mode
            
            this.currentLesson = lesson;
            this.prepareLessonSegments();
            
            this.updateLessonInfo(lesson);
            this.displayLessonContent(lesson);
            this.hideLoading();
            
            console.log('✅ Lesson loaded successfully');
            console.log('📊 Lesson data:', {
                languages: Object.keys(lesson.languages).length,
                content: Object.keys(lesson.languages.en.content).length,
                avatars: Object.keys(lesson.avatars).length
            });
            
        } catch (error) {
            console.error('Failed to load lesson:', error);
            this.showError('Failed to load lesson');
            this.hideLoading();
        }
    }

    /**
     * Load lesson by specific day
     */
    async loadLessonByDay(day) {
        try {
            this.showLoading();
            
            console.log(`📚 Loading lesson for day ${day}...`);
            const lesson = await this.lessonGenerator.generateCompleteLesson(day, 'The Sun', true); // Use fast mode
            
            this.currentLesson = lesson;
            this.prepareLessonSegments();
            
            this.updateLessonInfo(lesson);
            this.updateCalendarSelection(day);
            this.hideLoading();
            
            console.log(`✅ Lesson ${day} loaded successfully`);
            
        } catch (error) {
            console.error('Failed to load lesson:', error);
            this.showError('Failed to load lesson');
            this.hideLoading();
        }
    }

    /**
     * Prepare lesson segments for playback
     */
    prepareLessonSegments() {
        // Get English content (default language)
        const enContent = this.currentLesson.languages.en.content;
        const enAudio = this.currentLesson.languages.en.audio;
        
        this.segments = [
            {
                type: 'introduction',
                content: enContent.introduction,
                audio: enAudio.introduction,
                avatar: this.currentLesson.avatars.introduction,
                duration: 10
            },
            {
                type: 'main_content',
                content: enContent[this.currentVariant],
                audio: enAudio[this.currentVariant],
                avatar: this.currentLesson.avatars[this.currentVariant],
                duration: 30
            },
            {
                type: 'reflection',
                content: enContent.reflection,
                audio: enAudio.reflection,
                avatar: this.currentLesson.avatars.reflection,
                duration: 15
            },
            {
                type: 'conclusion',
                content: enContent.conclusion,
                audio: enAudio.conclusion,
                avatar: this.currentLesson.avatars.conclusion,
                duration: 10
            }
        ];

        console.log(`📝 Prepared ${this.segments.length} lesson segments`);
    }

    /**
     * Start the lesson
     */
    startLesson() {
        if (!this.currentLesson) {
            this.showError('No lesson loaded');
            return;
        }

        console.log('▶️ Starting lesson...');
        this.currentSegment = 0;
        this.playCurrentSegment();
    }

    /**
     * Play current segment
     */
    playCurrentSegment() {
        if (this.currentSegment >= this.segments.length) {
            this.onLessonComplete();
            return;
        }

        const segment = this.segments[this.currentSegment];
        console.log(`🎵 Playing segment ${this.currentSegment + 1}: ${segment.type}`);

        // Update avatar
        this.updateAvatar(segment.avatar.avatar, segment.avatar.expression);

        // Update lesson content
        this.showLessonContent(segment.content, segment.type);

        // Play audio
        if (segment.audio && segment.audio.url) {
            this.audioElement.src = segment.audio.url;
            this.audioElement.play();
            this.isPlaying = true;
            this.updatePlayButton();
        } else {
            console.warn('No audio available for segment');
            // Auto-advance after segment duration
            setTimeout(() => {
                this.nextSegment();
            }, segment.duration * 1000);
        }
    }

    /**
     * Check if we need to transition to next segment
     */
    checkSegmentTransition() {
        if (this.audioElement.ended && this.isPlaying) {
            this.nextSegment();
        }
    }

    /**
     * Move to next segment
     */
    nextSegment() {
        this.currentSegment++;
        if (this.currentSegment < this.segments.length) {
            this.playCurrentSegment();
        } else {
            this.onLessonComplete();
        }
    }

    /**
     * Handle lesson completion
     */
    onLessonComplete() {
        console.log('🎉 Lesson completed!');
        this.isPlaying = false;
        this.updatePlayButton();
        
        // Show completion message
        this.showLessonContent(
            "Congratulations! You've completed today's lesson. You've learned something new about The Sun and how it affects our world. Keep exploring and asking questions!",
            'completion'
        );

        // Show daily fortune
        setTimeout(() => {
            this.showDailyFortune();
        }, 3000);
    }

    /**
     * Show daily fortune
     */
    showDailyFortune() {
        if (this.currentLesson.dailyFortune) {
            this.showLessonContent(
                this.currentLesson.dailyFortune.message,
                'fortune'
            );
        }
    }

    /**
     * Update avatar based on mood
     */
    updateAvatar(avatar, expression) {
        const avatarContainer = document.getElementById('avatar-container');
        
        // Check if avatar container exists before accessing it
        if (!avatarContainer) {
            console.log('⚠️ Avatar container not found, skipping avatar update');
            return;
        }
        
        const avatarInfo = document.querySelector('.avatar-text');
        
        // Update avatar background
        const avatarImage = avatar === 'kelly' ? '/assets/avatars/kelly.jpg' : '/assets/avatars/ken.jpg';
        avatarContainer.style.backgroundImage = `url(${avatarImage})`;
        
        // Update avatar info if it exists
        if (avatarInfo) {
            avatarInfo.textContent = `My name is ${avatar === 'kelly' ? 'Kelly' : 'Ken'}`;
        }
        
        // Update avatar bubble if it exists
        const avatarBubble = document.querySelector('.avatar-bubble');
        if (avatarBubble) {
            avatarBubble.textContent = avatar === 'kelly' ? 'KL' : 'KN';
        }
        
        console.log(`👤 Updated avatar to ${avatar} with ${expression} expression`);
    }

    /**
     * Show lesson content overlay
     */
    showLessonContent(content, type) {
        const lessonContent = document.getElementById('lesson-content');
        const lessonTitle = document.getElementById('lesson-title');
        const lessonText = document.getElementById('lesson-text');
        
        // Set title based on type
        const titles = {
            introduction: 'Welcome to Your Lesson',
            main_content: 'Learning About The Sun',
            reflection: 'Think About This',
            conclusion: 'What You\'ve Learned',
            completion: 'Lesson Complete!',
            fortune: 'Today\'s Wisdom'
        };
        
        lessonTitle.textContent = titles[type] || 'Your Lesson';
        lessonText.textContent = content;
        
        // Show content with animation
        lessonContent.classList.add('active');
        
        // Auto-hide after delay (except for completion/fortune)
        if (!['completion', 'fortune'].includes(type)) {
            setTimeout(() => {
                lessonContent.classList.remove('active');
            }, 5000);
        }
    }

    /**
     * Update lesson info display
     */
    updateLessonInfo(lesson) {
        const lessonInfo = document.getElementById('lesson-info');
        const title = lessonInfo.querySelector('h2');
        const description = lessonInfo.querySelector('p');
        
        title.textContent = lesson.title;
        description.textContent = `Day ${lesson.day}: ${lesson.topic}`;
    }

    /**
     * Display lesson content from generated lesson data
     */
    displayLessonContent(lesson) {
        console.log('🎯 Displaying lesson content...');
        
        // Get English content (default language)
        const enContent = lesson.languages.en;
        
        // Display introduction
        if (enContent.content.introduction) {
            this.showLessonContent(enContent.content.introduction, 'introduction');
        }
        
        // Display main content (default variant)
        const mainContent = enContent.content[this.currentVariant];
        if (mainContent) {
            this.showLessonContent(mainContent, 'main_content');
        }
        
        // Update lesson info with actual content
        const lessonInfo = document.getElementById('lesson-info');
        if (lessonInfo) {
            const title = lessonInfo.querySelector('h2');
            const description = lessonInfo.querySelector('p');
            
            if (title) title.textContent = 'Your Personalized Lesson';
            if (description) {
                const introText = enContent.content.introduction || 'Welcome to iLearn!';
                description.textContent = introText.substring(0, 100) + '...';
            }
        }
        
        console.log('✅ Lesson content displayed successfully');
    }

    /**
     * Generate calendar
     */
    generateCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const today = new Date();
        const currentDay = today.getDate();
        
        // Generate 31 days for July
        for (let day = 1; day <= 31; day++) {
            const dayButton = document.createElement('button');
            dayButton.className = 'calendar-day';
            dayButton.textContent = day;
            
            if (day === currentDay) {
                dayButton.classList.add('selected');
            }
            
            calendarGrid.appendChild(dayButton);
        }
    }

    /**
     * Update calendar selection
     */
    updateCalendarSelection(selectedDay) {
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('selected');
            if (parseInt(day.textContent) === selectedDay) {
                day.classList.add('selected');
            }
        });
    }

    /**
     * Toggle playback
     */
    togglePlayback() {
        if (this.isPlaying) {
            this.pauseLesson();
        } else {
            this.resumeLesson();
        }
    }

    /**
     * Pause lesson
     */
    pauseLesson() {
        this.isPlaying = false;
        this.audioElement.pause();
        this.updatePlayButton();
    }

    /**
     * Resume lesson
     */
    resumeLesson() {
        this.isPlaying = true;
        this.audioElement.play();
        this.updatePlayButton();
    }

    /**
     * Update play button
     */
    updatePlayButton() {
        const playButton = document.getElementById('play-button');
        playButton.textContent = this.isPlaying ? '⏸️' : '▶️';
    }

    /**
     * Update progress bar
     */
    updateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        const timeDisplay = document.getElementById('time-display');
        
        if (this.duration > 0) {
            const progress = (this.currentTime / this.duration) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        timeDisplay.textContent = `${this.formatTime(this.currentTime)} / ${this.formatTime(this.duration)}`;
    }

    /**
     * Format time in MM:SS
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Seek to position in progress bar
     */
    seekToPosition(e) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        
        if (this.duration > 0) {
            this.audioElement.currentTime = percentage * this.duration;
        }
    }

    /**
     * Set volume
     */
    setVolume(volume) {
        this.volume = volume;
        this.audioElement.volume = volume;
        
        const volumeSlider = document.getElementById('volume-slider');
        volumeSlider.value = volume * 100;
    }

    /**
     * Set playback speed
     */
    setPlaybackSpeed(speed) {
        this.playbackSpeed = speed;
        this.audioElement.playbackRate = speed;
        
        // Update speed button states
        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.classList.remove('active');
            if (parseFloat(btn.dataset.speed) === speed) {
                btn.classList.add('active');
            }
        });
    }

    /**
     * Handle navigation
     */
    handleNavigation(section) {
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.classList.remove('active');
        });
        
        event.target.classList.add('active');
        
        switch (section) {
            case 'calendar':
                this.toggleCalendar();
                break;
            case 'home':
                this.goHome();
                break;
            case 'trophy':
                this.showAchievements();
                break;
            case 'info':
                this.showInfo();
                break;
            case 'menu':
                this.showMenu();
                break;
        }
    }

    /**
     * Toggle calendar visibility
     */
    toggleCalendar() {
        const calendar = document.getElementById('calendar-overlay');
        calendar.style.display = calendar.style.display === 'none' ? 'block' : 'none';
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        switch (e.key) {
            case ' ':
                e.preventDefault();
                this.togglePlayback();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.seekBackward();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.seekForward();
                break;
            case 'm':
                e.preventDefault();
                this.toggleMute();
                break;
        }
    }

    /**
     * Seek backward
     */
    seekBackward() {
        this.audioElement.currentTime = Math.max(0, this.audioElement.currentTime - 10);
    }

    /**
     * Seek forward
     */
    seekForward() {
        this.audioElement.currentTime = Math.min(this.duration, this.audioElement.currentTime + 10);
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        this.audioElement.muted = !this.audioElement.muted;
    }

    /**
     * Continue lesson
     */
    continueLesson() {
        this.nextSegment();
    }

    /**
     * Show loading overlay
     */
    showLoading() {
        document.getElementById('loading-overlay').style.display = 'flex';
    }

    /**
     * Hide loading overlay
     */
    hideLoading() {
        document.getElementById('loading-overlay').style.display = 'none';
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorElement = document.getElementById('error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }

    /**
     * Placeholder methods for navigation
     */
    goHome() {
        console.log('🏠 Going home...');
    }

    showAchievements() {
        console.log('🏆 Showing achievements...');
    }

    showInfo() {
        console.log('ℹ️ Showing info...');
    }

    showMenu() {
        console.log('☰ Showing menu...');
    }

    showLessonInfo() {
        if (this.currentLesson) {
            this.showLessonContent(
                `Lesson ${this.currentLesson.day}: ${this.currentLesson.topic}\n\nThis lesson explores the fundamental principles of ${this.currentLesson.topic} and how it affects our daily lives.`,
                'info'
            );
        }
    }
}

// Initialize the lesson player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Complete Lesson Player...');
    window.lessonPlayer = new CompleteLessonPlayer();
}); 