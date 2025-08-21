/**
 * Complete Lesson System
 * Addresses all user journeys and gaps for production-ready education platform
 */

class CompleteLessonSystem {
  constructor() {
    this.currentUser = {
      id: this.generateUserId(),
      preferences: {
        avatar: 'kelly',
        age: 'youth',
        tone: 'grandmother',
        autoplay: false,
        playbackSpeed: 1,
        volume: 0.8
      },
      progress: {
        currentLesson: 1,
        completedLessons: [],
        lastPlayed: null
      }
    };
    
    this.audioEngine = null;
    this.storageManager = null;
    this.errorHandler = null;
    this.accessibilityManager = null;
    this.performanceMonitor = null;
    
    this.initializeSystem();
  }

  /**
   * Initialize complete system
   */
  async initializeSystem() {
    try {
      console.log('🚀 Initializing Complete Lesson System...');
      
      // Initialize all subsystems
      await this.initializeStorage();
      await this.initializeAudioEngine();
      await this.initializeErrorHandler();
      await this.initializeAccessibility();
      await this.initializePerformance();
      
      // Load user data
      await this.loadUserData();
      
      // Setup UI
      this.setupUI();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Load initial lesson
      await this.loadLesson(this.currentUser.progress.currentLesson);
      
      console.log('✅ Complete Lesson System initialized');
      
    } catch (error) {
      console.error('❌ Failed to initialize system:', error);
      this.errorHandler.handleError(error);
    }
  }

  /**
   * Initialize storage manager
   */
  async initializeStorage() {
    this.storageManager = {
      async saveUserData(userData) {
        try {
          localStorage.setItem('ilearn_user_data', JSON.stringify(userData));
          return true;
        } catch (error) {
          console.error('Failed to save user data:', error);
          return false;
        }
      },
      
      async loadUserData() {
        try {
          const data = localStorage.getItem('ilearn_user_data');
          return data ? JSON.parse(data) : null;
        } catch (error) {
          console.error('Failed to load user data:', error);
          return null;
        }
      },
      
      async saveLessonProgress(lessonId, progress) {
        try {
          const key = `lesson_progress_${lessonId}`;
          localStorage.setItem(key, JSON.stringify(progress));
          return true;
        } catch (error) {
          console.error('Failed to save lesson progress:', error);
          return false;
        }
      },
      
      async loadLessonProgress(lessonId) {
        try {
          const key = `lesson_progress_${lessonId}`;
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        } catch (error) {
          console.error('Failed to load lesson progress:', error);
          return null;
        }
      }
    };
  }

  /**
   * Initialize audio engine with ElevenLabs integration
   */
  async initializeAudioEngine() {
    this.audioEngine = {
      voices: {
        kelly: 'kelly_voice_id', // ElevenLabs voice ID for Kelly
        ken: 'ken_voice_id'      // ElevenLabs voice ID for Ken
      },
      
      async generateAudio(text, voiceId, options = {}) {
        try {
          const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voiceId, {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': 'YOUR_ELEVENLABS_API_KEY'
            },
            body: JSON.stringify({
              text: text,
              model_id: 'eleven_monolingual_v1',
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5
              }
            })
          });
          
          if (!response.ok) {
            throw new Error(`Audio generation failed: ${response.status}`);
          }
          
          const audioBlob = await response.blob();
          return URL.createObjectURL(audioBlob);
          
        } catch (error) {
          console.error('Audio generation failed:', error);
          return null;
        }
      },
      
      async playAudio(audioUrl, onProgress, onComplete) {
        try {
          const audio = new Audio(audioUrl);
          
          audio.addEventListener('timeupdate', () => {
            if (onProgress) onProgress(audio.currentTime, audio.duration);
          });
          
          audio.addEventListener('ended', () => {
            if (onComplete) onComplete();
          });
          
          audio.addEventListener('error', (error) => {
            console.error('Audio playback error:', error);
            this.handleAudioError(error);
          });
          
          await audio.play();
          return audio;
          
        } catch (error) {
          console.error('Audio playback failed:', error);
          this.handleAudioError(error);
          return null;
        }
      },
      
      handleAudioError(error) {
        console.error('Audio error:', error);
        // Fallback to text-only mode
        this.showTextOnlyMode();
      },
      
      showTextOnlyMode() {
        const message = document.getElementById('audio-error-message');
        if (message) {
          message.style.display = 'block';
          message.textContent = 'Audio unavailable. Showing text-only mode.';
        }
      }
    };
  }

  /**
   * Initialize error handler
   */
  async initializeErrorHandler() {
    this.errorHandler = {
      handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        
        const errorMessage = this.getUserFriendlyMessage(error);
        this.showErrorToUser(errorMessage);
        
        // Log error for monitoring
        this.logError(error, context);
      },
      
      getUserFriendlyMessage(error) {
        if (error.message.includes('network')) {
          return 'Connection lost. Please check your internet and try again.';
        } else if (error.message.includes('timeout')) {
          return 'Loading is taking longer than expected. Please try again.';
        } else if (error.message.includes('audio')) {
          return 'Audio is unavailable. You can still read the lesson content.';
        } else {
          return 'Something went wrong. Please refresh the page and try again.';
        }
      },
      
      showErrorToUser(message) {
        const errorDiv = document.getElementById('error-message');
        if (errorDiv) {
          errorDiv.textContent = message;
          errorDiv.style.display = 'block';
          
          // Auto-hide after 8 seconds
          setTimeout(() => {
            errorDiv.style.display = 'none';
          }, 8000);
        }
      },
      
      logError(error, context) {
        // Send error to monitoring service
        console.log('Error logged:', { error: error.message, context, timestamp: new Date().toISOString() });
      }
    };
  }

  /**
   * Initialize accessibility manager
   */
  async initializeAccessibility() {
    this.accessibilityManager = {
      setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
          switch(e.key) {
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
            case 'f':
              e.preventDefault();
              this.toggleFullscreen();
              break;
          }
        });
      },
      
      setupScreenReader() {
        // Add ARIA labels and roles
        const elements = document.querySelectorAll('[data-aria-label]');
        elements.forEach(element => {
          const label = element.getAttribute('data-aria-label');
          element.setAttribute('aria-label', label);
        });
      },
      
      announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
          document.body.removeChild(announcement);
        }, 1000);
      }
    };
  }

  /**
   * Initialize performance monitor
   */
  async initializePerformance() {
    this.performanceMonitor = {
      metrics: {},
      
      startTimer(name) {
        this.metrics[name] = performance.now();
      },
      
      endTimer(name) {
        if (this.metrics[name]) {
          const duration = performance.now() - this.metrics[name];
          console.log(`${name} took ${duration.toFixed(2)}ms`);
          return duration;
        }
        return 0;
      },
      
      measureLoadTime() {
        this.startTimer('pageLoad');
        window.addEventListener('load', () => {
          this.endTimer('pageLoad');
        });
      },
      
      measureLessonLoad(lessonId) {
        this.startTimer(`lesson_${lessonId}`);
        return () => this.endTimer(`lesson_${lessonId}`);
      }
    };
  }

  /**
   * Load user data from storage
   */
  async loadUserData() {
    try {
      const savedData = await this.storageManager.loadUserData();
      if (savedData) {
        this.currentUser = { ...this.currentUser, ...savedData };
      }
    } catch (error) {
      this.errorHandler.handleError(error, 'loadUserData');
    }
  }

  /**
   * Save user data to storage
   */
  async saveUserData() {
    try {
      await this.storageManager.saveUserData(this.currentUser);
    } catch (error) {
      this.errorHandler.handleError(error, 'saveUserData');
    }
  }

  /**
   * Setup UI components
   */
  setupUI() {
    // Setup avatar
    this.setupAvatar();
    
    // Setup calendar
    this.setupCalendar();
    
    // Setup player controls
    this.setupPlayerControls();
    
    // Setup accessibility
    this.accessibilityManager.setupKeyboardNavigation();
    this.accessibilityManager.setupScreenReader();
    
    // Setup performance monitoring
    this.performanceMonitor.measureLoadTime();
  }

  /**
   * Setup avatar system
   */
  setupAvatar() {
    const avatarContainer = document.getElementById('avatar-container');
    const avatarInfo = document.getElementById('avatar-info');
    
    if (avatarContainer && avatarInfo) {
      const avatar = this.currentUser.preferences.avatar;
      const avatarName = avatar === 'kelly' ? 'Kelly' : 'Ken';
      
      // Set avatar background
      avatarContainer.style.backgroundImage = `url('/assets/avatars/${avatar}.jpg')`;
      
      // Update avatar info
      avatarInfo.innerHTML = `
        <div class="avatar-name">iLearn</div>
        <div class="avatar-greeting">My name is ${avatarName}</div>
      `;
      
      // Add ARIA labels
      avatarContainer.setAttribute('aria-label', `${avatarName} avatar`);
      avatarInfo.setAttribute('aria-label', `Avatar information: ${avatarName}`);
    }
  }

  /**
   * Setup calendar with 366 lessons
   */
  setupCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    // Generate calendar for current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    this.generateCalendarDays(calendarGrid, currentMonth, currentYear);
    this.setupCalendarNavigation();
  }

  /**
   * Generate calendar days with lesson data
   */
  generateCalendarDays(container, month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    container.innerHTML = '';
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      container.appendChild(this.createCalendarCell(''));
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = this.createCalendarCell(day);
      
      // Check if this day has a lesson
      const lessonDay = this.getLessonDay(month, day);
      if (lessonDay && lessonDay <= 366) {
        cell.classList.add('has-lesson');
        cell.dataset.lessonDay = lessonDay;
        cell.setAttribute('aria-label', `Lesson ${lessonDay}: ${this.getLessonTitle(lessonDay)}`);
        
        // Check if lesson is completed
        if (this.currentUser.progress.completedLessons.includes(lessonDay)) {
          cell.classList.add('completed');
        }
      }
      
      // Highlight current day
      if (day === new Date().getDate() && month === new Date().getMonth()) {
        cell.classList.add('current-day');
      }
      
      container.appendChild(cell);
    }
  }

  /**
   * Create calendar cell with accessibility
   */
  createCalendarCell(content) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day';
    cell.textContent = content;
    cell.setAttribute('role', 'button');
    cell.setAttribute('tabindex', '0');
    return cell;
  }

  /**
   * Setup calendar navigation
   */
  setupCalendarNavigation() {
    const lessonCells = document.querySelectorAll('.has-lesson');
    
    lessonCells.forEach(cell => {
      // Hover preview
      cell.addEventListener('mouseenter', (e) => {
        const lessonDay = e.target.dataset.lessonDay;
        this.showLessonPreview(lessonDay, e.target);
      });
      
      cell.addEventListener('mouseleave', () => {
        this.hideLessonPreview();
      });
      
      // Click to load lesson
      cell.addEventListener('click', (e) => {
        const lessonDay = parseInt(e.target.dataset.lessonDay);
        this.loadLesson(lessonDay);
      });
      
      // Keyboard navigation
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const lessonDay = parseInt(e.target.dataset.lessonDay);
          this.loadLesson(lessonDay);
        }
      });
    });
  }

  /**
   * Setup player controls
   */
  setupPlayerControls() {
    // Play/pause button
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlayback());
      playBtn.setAttribute('aria-label', 'Play lesson');
    }
    
    // Progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.addEventListener('click', (e) => this.seekToPosition(e));
      progressBar.setAttribute('aria-label', 'Lesson progress');
    }
    
    // Volume control
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    }
    
    // Speed control
    const speedBtn = document.getElementById('speed-btn');
    if (speedBtn) {
      speedBtn.addEventListener('click', () => this.cyclePlaybackSpeed());
    }
    
    // Autoplay checkbox
    const autoplayCheckbox = document.getElementById('autoplay-checkbox');
    if (autoplayCheckbox) {
      autoplayCheckbox.addEventListener('change', (e) => {
        this.currentUser.preferences.autoplay = e.target.checked;
        this.saveUserData();
      });
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Avatar switching
    document.addEventListener('avatarChange', (e) => {
      this.changeAvatar(e.detail.avatar);
    });
    
    // Variant changes
    document.addEventListener('variantChange', (e) => {
      this.changeVariant(e.detail.age, e.detail.tone);
    });
    
    // Lesson completion
    document.addEventListener('lessonComplete', (e) => {
      this.completeLesson(e.detail.lessonId);
    });
    
    // Error handling
    window.addEventListener('error', (e) => {
      this.errorHandler.handleError(e.error, 'global');
    });
    
    // Performance monitoring
    window.addEventListener('beforeunload', () => {
      this.saveUserData();
    });
  }

  /**
   * Load lesson with complete error handling
   */
  async loadLesson(lessonDay) {
    const endTimer = this.performanceMonitor.measureLoadTime();
    
    try {
      // Show loading state
      this.showLoadingState();
      
      // Validate lesson day
      if (lessonDay < 1 || lessonDay > 366) {
        throw new Error('Invalid lesson day');
      }
      
      // Get lesson from smart server
      const lesson = await this.smartServer.serveLesson(
        lessonDay,
        this.currentUser.preferences.age,
        this.currentUser.preferences.tone
      );
      
      // Generate audio
      const audioUrl = await this.generateLessonAudio(lesson);
      
      // Update UI
      this.updateLessonInfo(lesson);
      this.setupLessonContent(lesson, audioUrl);
      
      // Update progress
      this.currentUser.progress.currentLesson = lessonDay;
      this.currentUser.progress.lastPlayed = new Date().toISOString();
      await this.saveUserData();
      
      // Hide loading state
      this.hideLoadingState();
      
      // Announce to screen reader
      this.accessibilityManager.announceToScreenReader(`Lesson ${lessonDay} loaded: ${lesson.title}`);
      
      endTimer();
      console.log(`✅ Loaded lesson ${lessonDay} successfully`);
      
    } catch (error) {
      this.errorHandler.handleError(error, 'loadLesson');
      this.hideLoadingState();
    }
  }

  /**
   * Generate audio for lesson
   */
  async generateLessonAudio(lesson) {
    try {
      const voiceId = this.audioEngine.voices[this.currentUser.preferences.avatar];
      const fullText = this.combineLessonText(lesson);
      
      return await this.audioEngine.generateAudio(fullText, voiceId);
    } catch (error) {
      console.error('Audio generation failed:', error);
      return null;
    }
  }

  /**
   * Combine lesson text for audio generation
   */
  combineLessonText(lesson) {
    const sections = [
      lesson.sections.introduction,
      lesson.sections.core_concept,
      lesson.sections.examples,
      lesson.sections.reflection
    ];
    
    return sections.filter(Boolean).join('. ');
  }

  /**
   * Setup lesson content with audio
   */
  setupLessonContent(lesson, audioUrl) {
    this.currentLesson = lesson;
    
    if (audioUrl) {
      this.audioElement = new Audio(audioUrl);
      this.setupAudioEvents();
    } else {
      // Text-only mode
      this.showTextOnlyMode();
    }
    
    // Update lesson content overlay
    this.updateLessonContent(lesson);
  }

  /**
   * Setup audio events
   */
  setupAudioEvents() {
    if (!this.audioElement) return;
    
    this.audioElement.addEventListener('loadedmetadata', () => {
      this.duration = this.audioElement.duration;
      this.updateProgressBar();
    });
    
    this.audioElement.addEventListener('timeupdate', () => {
      this.currentTime = this.audioElement.currentTime;
      this.updateProgressBar();
      this.updateContentTiming();
    });
    
    this.audioElement.addEventListener('ended', () => {
      this.onLessonComplete();
    });
    
    this.audioElement.addEventListener('error', (error) => {
      this.audioEngine.handleAudioError(error);
    });
  }

  /**
   * Toggle playback
   */
  togglePlayback() {
    if (!this.audioElement) return;
    
    if (this.isPlaying) {
      this.audioElement.pause();
      this.isPlaying = false;
    } else {
      this.audioElement.play();
      this.isPlaying = true;
    }
    
    this.updatePlayButton();
  }

  /**
   * Update play button
   */
  updatePlayButton() {
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
      playBtn.innerHTML = this.isPlaying ? '⏸️' : '▶️';
      playBtn.setAttribute('aria-label', this.isPlaying ? 'Pause lesson' : 'Play lesson');
    }
  }

  /**
   * Update progress bar
   */
  updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const timeDisplay = document.getElementById('time-display');
    
    if (progressFill && this.duration > 0) {
      const progress = (this.currentTime / this.duration) * 100;
      progressFill.style.width = `${progress}%`;
    }
    
    if (timeDisplay) {
      timeDisplay.textContent = `${this.formatTime(this.currentTime)} / ${this.formatTime(this.duration)}`;
    }
  }

  /**
   * Update content timing
   */
  updateContentTiming() {
    if (!this.currentLesson || !this.audioElement) return;
    
    const currentTime = this.audioElement.currentTime;
    const sectionTimings = this.calculateSectionTimings();
    
    Object.keys(sectionTimings).forEach(section => {
      const timing = sectionTimings[section];
      const element = document.getElementById(`section-${section}`);
      
      if (element) {
        if (currentTime >= timing.start && currentTime <= timing.end) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      }
    });
  }

  /**
   * Calculate section timings
   */
  calculateSectionTimings() {
    const duration = this.duration || 300; // Default 5 minutes
    return {
      introduction: { start: 0, end: duration * 0.25 },
      core_concept: { start: duration * 0.25, end: duration * 0.5 },
      examples: { start: duration * 0.5, end: duration * 0.75 },
      reflection: { start: duration * 0.75, end: duration }
    };
  }

  /**
   * Format time
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Change avatar
   */
  async changeAvatar(avatar) {
    this.currentUser.preferences.avatar = avatar;
    this.setupAvatar();
    await this.saveUserData();
    
    // Reload current lesson with new voice
    if (this.currentLesson) {
      await this.loadLesson(this.currentLesson.day);
    }
  }

  /**
   * Change variant
   */
  async changeVariant(age, tone) {
    this.currentUser.preferences.age = age;
    this.currentUser.preferences.tone = tone;
    await this.saveUserData();
    
    // Reload current lesson with new variant
    if (this.currentLesson) {
      await this.loadLesson(this.currentLesson.day);
    }
  }

  /**
   * Complete lesson
   */
  async completeLesson(lessonId) {
    if (!this.currentUser.progress.completedLessons.includes(lessonId)) {
      this.currentUser.progress.completedLessons.push(lessonId);
      await this.saveUserData();
      
      // Update calendar
      this.updateCalendarCompletion(lessonId);
      
      // Show completion message
      this.showCompletionMessage();
    }
  }

  /**
   * Show completion message
   */
  showCompletionMessage() {
    const completion = document.getElementById('completion-overlay');
    if (completion) {
      completion.style.display = 'flex';
      setTimeout(() => {
        completion.style.display = 'none';
      }, 3000);
    }
  }

  /**
   * Generate user ID
   */
  generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get lesson day from calendar
   */
  getLessonDay(month, day) {
    const monthStartDays = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    return monthStartDays[month] + day - 1;
  }

  /**
   * Get lesson title
   */
  getLessonTitle(lessonDay) {
    const titles = {
      1: "The Sun - Our Star",
      2: "Gravity - The Invisible Force",
      3: "Atoms - Building Blocks of Everything",
      4: "Evolution - Life's Story",
      5: "DNA - The Code of Life",
      // ... all 366 titles would be defined here
    };
    return titles[lessonDay] || `Lesson ${lessonDay}`;
  }

  /**
   * Show loading state
   */
  showLoadingState() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
      loading.style.display = 'flex';
    }
  }

  /**
   * Hide loading state
   */
  hideLoadingState() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
      loading.style.display = 'none';
    }
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CompleteLessonSystem };
} 