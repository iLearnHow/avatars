/**
 * Lesson Player - Main UI Controller
 * Manages the complete lesson presentation and user interaction
 * @version 1.0.0
 * @author iLearnHow
 */

import { Logger } from '../../utils/logger.js';
import { ErrorHandler } from '../../utils/error-handler.js';
import { config } from '../../core/config.js';

export class LessonPlayer {
    constructor(engine) {
        this.engine = engine;
        this.currentLesson = null;
        this.currentParams = null;
        this.isPlaying = false;
        this.isReady = false;
        this.audioContext = null;
        this.audioElement = null;
        this.progressTracker = null;
        this.eventListeners = new Map();
        
        // UI elements
        this.container = null;
        this.lessonContent = null;
        this.controls = null;
        this.progressBar = null;
        this.statusIndicator = null;
    }

    /**
     * Initialize the lesson player
     */
    async initialize() {
        try {
            Logger.info('lesson_player_init', 'Initializing lesson player');
            
            // Initialize audio context
            await this.initializeAudio();
            
            // Set up UI elements
            await this.setupUI();
            
            // Initialize progress tracking
            await this.initializeProgressTracking();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Mark as ready
            this.isReady = true;
            
            Logger.info('lesson_player_ready', 'Lesson player initialized successfully');
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'lesson_player', phase: 'initialization' });
            throw error;
        }
    }

    /**
     * Initialize audio context for synthesis
     */
    async initializeAudio() {
        try {
            // Create audio context for modern browsers
            if (window.AudioContext || window.webkitAudioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Resume audio context if suspended
                if (this.audioContext.state === 'suspended') {
                    await this.audioContext.resume();
                }
            }
            
            // Create audio element for fallback
            this.audioElement = document.createElement('audio');
            this.audioElement.preload = 'none';
            this.audioElement.controls = false;
            
            Logger.info('lesson_player_audio_ready', 'Audio context initialized');
            
        } catch (error) {
            Logger.warn('lesson_player_audio_failed', 'Audio initialization failed, using fallback');
            this.audioContext = null;
        }
    }

    /**
     * Set up UI elements
     */
    async setupUI() {
        // Find or create main container
        this.container = document.getElementById('lesson-player') || this.createContainer();
        
        // Create lesson content area
        this.lessonContent = this.createLessonContent();
        
        // Create controls
        this.controls = this.createControls();
        
        // Create progress bar
        this.progressBar = this.createProgressBar();
        
        // Create status indicator
        this.statusIndicator = this.createStatusIndicator();
        
        // Assemble UI
        this.assembleUI();
        
        Logger.info('lesson_player_ui_ready', 'UI elements created and assembled');
    }

    /**
     * Create main container if it doesn't exist
     */
    createContainer() {
        const container = document.createElement('div');
        container.id = 'lesson-player';
        container.className = 'lesson-player-container';
        container.setAttribute('role', 'main');
        container.setAttribute('aria-label', 'Lesson Player');
        
        // Insert into page
        const target = document.querySelector('main') || document.body;
        target.appendChild(container);
        
        return container;
    }

    /**
     * Create lesson content area
     */
    createLessonContent() {
        const content = document.createElement('div');
        content.className = 'lesson-content';
        content.setAttribute('role', 'region');
        content.setAttribute('aria-label', 'Lesson Content');
        
        // Add loading state
        content.innerHTML = `
            <div class="lesson-loading">
                <div class="loading-spinner"></div>
                <p>Loading your personalized lesson...</p>
            </div>
        `;
        
        return content;
    }

    /**
     * Create player controls
     */
    createControls() {
        const controls = document.createElement('div');
        controls.className = 'lesson-controls';
        controls.setAttribute('role', 'toolbar');
        controls.setAttribute('aria-label', 'Lesson Controls');
        
        controls.innerHTML = `
            <button class="control-btn play-btn" aria-label="Play Lesson" disabled>
                <svg class="icon" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </button>
            <button class="control-btn pause-btn" aria-label="Pause Lesson" disabled>
                <svg class="icon" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
            </button>
            <button class="control-btn restart-btn" aria-label="Restart Lesson" disabled>
                <svg class="icon" viewBox="0 0 24 24">
                    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                </svg>
            </button>
            <div class="volume-control">
                <button class="control-btn volume-btn" aria-label="Toggle Mute">
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                </button>
                <input type="range" class="volume-slider" min="0" max="100" value="100" aria-label="Volume">
            </div>
        `;
        
        return controls;
    }

    /**
     * Create progress bar
     */
    createProgressBar() {
        const progress = document.createElement('div');
        progress.className = 'lesson-progress';
        progress.setAttribute('role', 'progressbar');
        progress.setAttribute('aria-label', 'Lesson Progress');
        progress.setAttribute('aria-valuemin', '0');
        progress.setAttribute('aria-valuemax', '100');
        progress.setAttribute('aria-valuenow', '0');
        
        progress.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="progress-time">
                <span class="current-time">0:00</span>
                <span class="total-time">0:00</span>
            </div>
        `;
        
        return progress;
    }

    /**
     * Create status indicator
     */
    createStatusIndicator() {
        const status = document.createElement('div');
        status.className = 'lesson-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        
        status.innerHTML = `
            <div class="status-icon"></div>
            <span class="status-text">Ready</span>
        `;
        
        return status;
    }

    /**
     * Assemble all UI elements
     */
    assembleUI() {
        // Clear container
        this.container.innerHTML = '';
        
        // Add elements in order
        this.container.appendChild(this.statusIndicator);
        this.container.appendChild(this.lessonContent);
        this.container.appendChild(this.progressBar);
        this.container.appendChild(this.controls);
        
        // Apply initial styles
        this.applyStyles();
    }

    /**
     * Apply CSS styles
     */
    applyStyles() {
        const styles = `
            .lesson-player-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background: ${config.get('ui.theme.background')};
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            .lesson-content {
                margin-bottom: 20px;
                padding: 20px;
                background: #f8fafc;
                border-radius: 8px;
                min-height: 200px;
            }
            
            .lesson-loading {
                text-align: center;
                padding: 40px;
            }
            
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #e2e8f0;
                border-top: 4px solid ${config.get('ui.theme.primary')};
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .lesson-controls {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px;
                background: #f1f5f9;
                border-radius: 8px;
            }
            
            .control-btn {
                background: ${config.get('ui.theme.primary')};
                color: white;
                border: none;
                border-radius: 50%;
                width: 44px;
                height: 44px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .control-btn:hover:not(:disabled) {
                background: ${config.get('ui.theme.accent')};
                transform: scale(1.05);
            }
            
            .control-btn:disabled {
                background: #cbd5e1;
                cursor: not-allowed;
            }
            
            .control-btn .icon {
                width: 24px;
                height: 24px;
                fill: currentColor;
            }
            
            .volume-control {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-left: auto;
            }
            
            .volume-slider {
                width: 80px;
                height: 4px;
                background: #cbd5e1;
                border-radius: 2px;
                outline: none;
            }
            
            .volume-slider::-webkit-slider-thumb {
                appearance: none;
                width: 16px;
                height: 16px;
                background: ${config.get('ui.theme.primary')};
                border-radius: 50%;
                cursor: pointer;
            }
            
            .lesson-progress {
                margin-bottom: 15px;
            }
            
            .progress-bar {
                width: 100%;
                height: 6px;
                background: #e2e8f0;
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .progress-fill {
                height: 100%;
                background: ${config.get('ui.theme.primary')};
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .progress-time {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #64748b;
            }
            
            .lesson-status {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
                padding: 10px;
                background: #f0f9ff;
                border-radius: 6px;
                font-size: 14px;
            }
            
            .status-icon {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: ${config.get('ui.theme.success')};
            }
            
            .lesson-title {
                font-size: 24px;
                font-weight: 700;
                color: ${config.get('ui.theme.text')};
                margin-bottom: 15px;
            }
            
            .lesson-text {
                font-size: 16px;
                line-height: 1.6;
                color: ${config.get('ui.theme.text')};
                margin-bottom: 20px;
            }
            
            .lesson-meta {
                display: flex;
                gap: 20px;
                font-size: 14px;
                color: #64748b;
                margin-bottom: 20px;
            }
            
            .meta-item {
                display: flex;
                align-items: center;
                gap: 5px;
            }
        `;
        
        // Inject styles
        if (!document.getElementById('lesson-player-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'lesson-player-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }

    /**
     * Initialize progress tracking
     */
    async initializeProgressTracking() {
        try {
            const { ProgressTracker } = await import('./progress-tracker.js');
            this.progressTracker = new ProgressTracker();
            await this.progressTracker.initialize();
            
            Logger.info('lesson_player_progress_ready', 'Progress tracking initialized');
            
        } catch (error) {
            Logger.warn('lesson_player_progress_failed', 'Progress tracking failed to initialize');
        }
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Control button events
        this.addControlListeners();
        
        // Volume control events
        this.addVolumeListeners();
        
        // Keyboard navigation
        this.addKeyboardListeners();
        
        // Window events
        this.addWindowListeners();
        
        Logger.info('lesson_player_events_ready', 'Event listeners configured');
    }

    /**
     * Add control button event listeners
     */
    addControlListeners() {
        const playBtn = this.controls.querySelector('.play-btn');
        const pauseBtn = this.controls.querySelector('.pause-btn');
        const restartBtn = this.controls.querySelector('.restart-btn');
        
        playBtn.addEventListener('click', () => this.play());
        pauseBtn.addEventListener('click', () => this.pause());
        restartBtn.addEventListener('click', () => this.restart());
        
        // Store references for cleanup
        this.eventListeners.set('play', playBtn);
        this.eventListeners.set('pause', pauseBtn);
        this.eventListeners.set('restart', restartBtn);
    }

    /**
     * Add volume control event listeners
     */
    addVolumeListeners() {
        const volumeBtn = this.controls.querySelector('.volume-btn');
        const volumeSlider = this.controls.querySelector('.volume-slider');
        
        volumeBtn.addEventListener('click', () => this.toggleMute());
        volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        
        this.eventListeners.set('volume', volumeBtn);
        this.eventListeners.set('volumeSlider', volumeSlider);
    }

    /**
     * Add keyboard navigation
     */
    addKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return; // Don't interfere with form inputs
            
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    this.isPlaying ? this.pause() : this.play();
                    break;
                case 'KeyR':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.restart();
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.seek(-10);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.seek(10);
                    break;
            }
        });
    }

    /**
     * Add window event listeners
     */
    addWindowListeners() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isPlaying) {
                this.pause();
            }
        });
        
        // Handle audio context suspension
        if (this.audioContext) {
            this.audioContext.addEventListener('statechange', () => {
                if (this.audioContext.state === 'suspended') {
                    this.pause();
                }
            });
        }
    }

    /**
     * Load and display a lesson
     * @param {number} day - Day number (1-366)
     * @param {number} age - Learner age (5-65)
     * @param {string} tone - Personality tone
     */
    async loadLesson(day, age, tone) {
        try {
            Logger.info('lesson_player_load', `Loading lesson: day=${day}, age=${age}, tone=${tone}`);
            
            // Update status
            this.updateStatus('loading', 'Synthesizing your lesson...');
            
            // Store parameters
            this.currentParams = { day, age, tone };
            
            // Synthesize lesson
            const startTime = performance.now();
            this.currentLesson = await this.engine.synthesizeLesson(day, age, tone);
            const synthesisTime = performance.now() - startTime;
            
            // Validate lesson
            if (!this.currentLesson || !this.currentLesson.title) {
                throw new Error('Synthesis failed to produce valid lesson');
            }
            
            // Display lesson
            this.displayLesson();
            
            // Enable controls
            this.enableControls();
            
            // Update status
            this.updateStatus('ready', `Lesson ready (${synthesisTime.toFixed(0)}ms)`);
            
            // Track progress
            if (this.progressTracker) {
                this.progressTracker.recordLessonLoad(day, age, tone, synthesisTime);
            }
            
            Logger.info('lesson_player_loaded', `Lesson loaded successfully in ${synthesisTime.toFixed(2)}ms`);
            
        } catch (error) {
            ErrorHandler.handle(error, { 
                context: 'lesson_player', 
                phase: 'load_lesson',
                params: { day, age, tone }
            });
            
            this.updateStatus('error', 'Failed to load lesson');
            this.displayError(error);
        }
    }

    /**
     * Display the current lesson
     */
    displayLesson() {
        if (!this.currentLesson) return;
        
        const { title, content, metadata } = this.currentLesson;
        
        this.lessonContent.innerHTML = `
            <h1 class="lesson-title">${this.escapeHtml(title)}</h1>
            <div class="lesson-meta">
                <span class="meta-item">
                    <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Day ${metadata.day}
                </span>
                <span class="meta-item">
                    <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Age ${metadata.age}
                </span>
                <span class="meta-item">
                    <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    ${metadata.tone}
                </span>
            </div>
            <div class="lesson-text">${this.formatContent(content)}</div>
        `;
    }

    /**
     * Display error message
     */
    displayError(error) {
        this.lessonContent.innerHTML = `
            <div class="lesson-error">
                <h2>Unable to Load Lesson</h2>
                <p>We encountered an issue while preparing your lesson. Please try again.</p>
                <button class="retry-btn" onclick="window.Application.lessonPlayer.retryLoad()">
                    Try Again
                </button>
            </div>
        `;
    }

    /**
     * Format lesson content with proper styling
     */
    formatContent(content) {
        if (typeof content === 'string') {
            // Convert line breaks to paragraphs
            return content
                .split('\n\n')
                .map(paragraph => `<p>${this.escapeHtml(paragraph)}</p>`)
                .join('');
        }
        
        return this.escapeHtml(String(content));
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Play the lesson
     */
    async play() {
        if (!this.currentLesson) return;
        
        try {
            this.isPlaying = true;
            this.updatePlayButton();
            this.updateStatus('playing', 'Playing lesson...');
            
            // Start audio synthesis if available
            if (this.audioContext && this.audioContext.state === 'running') {
                await this.startAudioSynthesis();
            }
            
            // Start progress tracking
            this.startProgressTracking();
            
            Logger.info('lesson_player_play', 'Lesson playback started');
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'lesson_player', phase: 'play' });
            this.pause();
        }
    }

    /**
     * Pause the lesson
     */
    pause() {
        this.isPlaying = false;
        this.updatePlayButton();
        this.updateStatus('paused', 'Lesson paused');
        this.stopProgressTracking();
        
        Logger.info('lesson_player_pause', 'Lesson playback paused');
    }

    /**
     * Restart the lesson
     */
    restart() {
        this.pause();
        this.resetProgress();
        this.play();
        
        Logger.info('lesson_player_restart', 'Lesson restarted');
    }

    /**
     * Start audio synthesis
     */
    async startAudioSynthesis() {
        // This would integrate with the synthesis engine for audio generation
        // For now, we'll simulate audio playback
        Logger.info('lesson_player_audio_start', 'Audio synthesis started');
    }

    /**
     * Update play/pause button state
     */
    updatePlayButton() {
        const playBtn = this.controls.querySelector('.play-btn');
        const pauseBtn = this.controls.querySelector('.pause-btn');
        
        if (this.isPlaying) {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
        } else {
            playBtn.style.display = 'flex';
            pauseBtn.style.display = 'none';
        }
    }

    /**
     * Update status indicator
     */
    updateStatus(status, message) {
        const statusIcon = this.statusIndicator.querySelector('.status-icon');
        const statusText = this.statusIndicator.querySelector('.status-text');
        
        // Update icon color
        const colors = {
            ready: config.get('ui.theme.success'),
            loading: config.get('ui.theme.warning'),
            playing: config.get('ui.theme.primary'),
            paused: config.get('ui.theme.secondary'),
            error: config.get('ui.theme.error')
        };
        
        statusIcon.style.background = colors[status] || colors.ready;
        statusText.textContent = message;
    }

    /**
     * Enable player controls
     */
    enableControls() {
        const buttons = this.controls.querySelectorAll('.control-btn');
        buttons.forEach(btn => btn.disabled = false);
    }

    /**
     * Start progress tracking
     */
    startProgressTracking() {
        // Simulate progress for now
        this.progressInterval = setInterval(() => {
            this.updateProgress();
        }, 1000);
    }

    /**
     * Stop progress tracking
     */
    stopProgressTracking() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    /**
     * Update progress bar
     */
    updateProgress() {
        // This would be based on actual audio/video progress
        // For now, simulate progress
        const progressFill = this.progressBar.querySelector('.progress-fill');
        const currentTime = this.progressBar.querySelector('.current-time');
        
        let currentProgress = parseFloat(progressFill.style.width) || 0;
        currentProgress = Math.min(currentProgress + 1, 100);
        
        progressFill.style.width = `${currentProgress}%`;
        this.progressBar.setAttribute('aria-valuenow', currentProgress);
        
        // Update time display
        const totalSeconds = 300; // 5 minutes estimated
        const currentSeconds = Math.floor((currentProgress / 100) * totalSeconds);
        currentTime.textContent = this.formatTime(currentSeconds);
    }

    /**
     * Reset progress
     */
    resetProgress() {
        const progressFill = this.progressBar.querySelector('.progress-fill');
        const currentTime = this.progressBar.querySelector('.current-time');
        
        progressFill.style.width = '0%';
        this.progressBar.setAttribute('aria-valuenow', 0);
        currentTime.textContent = '0:00';
    }

    /**
     * Format time as MM:SS
     */
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    /**
     * Toggle mute
     */
    toggleMute() {
        const volumeSlider = this.controls.querySelector('.volume-slider');
        const volumeBtn = this.controls.querySelector('.volume-btn');
        
        if (volumeSlider.value > 0) {
            this.previousVolume = volumeSlider.value;
            volumeSlider.value = 0;
            this.setVolume(0);
        } else {
            volumeSlider.value = this.previousVolume || 100;
            this.setVolume(this.previousVolume || 100);
        }
    }

    /**
     * Set volume
     */
    setVolume(value) {
        if (this.audioElement) {
            this.audioElement.volume = value / 100;
        }
        
        // Update volume button icon
        const volumeBtn = this.controls.querySelector('.volume-btn');
        const icon = volumeBtn.querySelector('svg');
        
        if (value == 0) {
            icon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
        } else if (value < 50) {
            icon.innerHTML = '<path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>';
        } else {
            icon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
        }
    }

    /**
     * Seek in the lesson
     */
    seek(seconds) {
        // This would seek in the audio/video
        Logger.info('lesson_player_seek', `Seeking ${seconds} seconds`);
    }

    /**
     * Retry loading the current lesson
     */
    retryLoad() {
        if (this.currentParams) {
            this.loadLesson(
                this.currentParams.day,
                this.currentParams.age,
                this.currentParams.tone
            );
        }
    }

    /**
     * Get player status
     */
    getStatus() {
        return {
            isReady: this.isReady,
            isPlaying: this.isPlaying,
            currentLesson: this.currentLesson ? {
                day: this.currentLesson.metadata.day,
                age: this.currentLesson.metadata.age,
                tone: this.currentLesson.metadata.tone,
                title: this.currentLesson.title
            } : null,
            audioContext: this.audioContext ? this.audioContext.state : null,
            progressTracker: this.progressTracker ? this.progressTracker.getStatus() : null
        };
    }

    /**
     * Shutdown the lesson player
     */
    async shutdown() {
        Logger.info('lesson_player_shutdown', 'Shutting down lesson player');
        
        // Stop playback
        this.pause();
        
        // Clear intervals
        this.stopProgressTracking();
        
        // Remove event listeners
        this.eventListeners.forEach((element, type) => {
            if (element && element.removeEventListener) {
                // Remove specific listeners based on type
                switch (type) {
                    case 'play':
                        element.removeEventListener('click', () => this.play());
                        break;
                    case 'pause':
                        element.removeEventListener('click', () => this.pause());
                        break;
                    case 'restart':
                        element.removeEventListener('click', () => this.restart());
                        break;
                }
            }
        });
        
        // Close audio context
        if (this.audioContext) {
            await this.audioContext.close();
        }
        
        // Shutdown progress tracker
        if (this.progressTracker) {
            await this.progressTracker.shutdown();
        }
        
        this.isReady = false;
        Logger.info('lesson_player_shutdown_complete', 'Lesson player shutdown complete');
    }
} 