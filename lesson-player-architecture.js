/**
 * Lesson Player Architecture
 * Matches the 16:9 avatar-centric design with overlay system
 */

class LessonPlayer {
  constructor() {
    this.currentAvatar = 'kelly'; // 'kelly' or 'ken'
    this.currentLesson = null;
    this.currentVariant = { age: 'youth', tone: 'grandmother' };
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.autoplay = false;
    this.playbackSpeed = 1;
    
    this.initializePlayer();
  }

  /**
   * Initialize the lesson player
   */
  initializePlayer() {
    this.setupAvatar();
    this.setupOverlays();
    this.setupCalendar();
    this.setupControls();
    this.setupEventListeners();
  }

  /**
   * Setup avatar wallpaper
   */
  setupAvatar() {
    const avatarContainer = document.getElementById('avatar-container');
    avatarContainer.style.backgroundImage = `url('/assets/avatars/${this.currentAvatar}.jpg')`;
    avatarContainer.style.backgroundSize = 'cover';
    avatarContainer.style.backgroundPosition = 'center';
    
    // Avatar info overlay
    const avatarInfo = document.getElementById('avatar-info');
    avatarInfo.innerHTML = `
      <div class="avatar-name">iLearn</div>
      <div class="avatar-greeting">My name is ${this.currentAvatar === 'kelly' ? 'Kelly' : 'Ken'}</div>
    `;
  }

  /**
   * Setup overlay system
   */
  setupOverlays() {
    // Lesson info overlay (top-left)
    this.lessonInfoOverlay = document.getElementById('lesson-info');
    
    // Calendar overlay (top-right)
    this.calendarOverlay = document.getElementById('calendar-overlay');
    
    // Player controls overlay (bottom-center)
    this.playerControls = document.getElementById('player-controls');
    
    // Side navigation icons (right edge)
    this.sideNav = document.getElementById('side-navigation');
  }

  /**
   * Setup calendar with 366 lessons
   */
  setupCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Generate calendar for current month
    this.generateCalendarDays(calendarGrid, currentMonth, currentYear);
    
    // Setup hover previews
    this.setupLessonPreviews();
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
      if (lessonDay) {
        cell.classList.add('has-lesson');
        cell.dataset.lessonDay = lessonDay;
        cell.title = this.getLessonTitle(lessonDay);
      }
      
      // Highlight current day
      if (day === new Date().getDate() && month === new Date().getMonth()) {
        cell.classList.add('current-day');
      }
      
      container.appendChild(cell);
    }
  }

  /**
   * Create calendar cell
   */
  createCalendarCell(content) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day';
    cell.textContent = content;
    return cell;
  }

  /**
   * Setup lesson previews on hover
   */
  setupLessonPreviews() {
    const lessonCells = document.querySelectorAll('.has-lesson');
    
    lessonCells.forEach(cell => {
      cell.addEventListener('mouseenter', (e) => {
        const lessonDay = e.target.dataset.lessonDay;
        this.showLessonPreview(lessonDay, e.target);
      });
      
      cell.addEventListener('mouseleave', () => {
        this.hideLessonPreview();
      });
      
      cell.addEventListener('click', (e) => {
        const lessonDay = e.target.dataset.lessonDay;
        this.loadLesson(lessonDay);
      });
    });
  }

  /**
   * Show lesson preview on hover
   */
  showLessonPreview(lessonDay, element) {
    const preview = document.getElementById('lesson-preview');
    const lessonData = this.getLessonData(lessonDay);
    
    preview.innerHTML = `
      <h3>${lessonData.title}</h3>
      <p>${lessonData.description}</p>
      <div class="preview-variants">
        <span class="variant-tag">Age: ${this.currentVariant.age}</span>
        <span class="variant-tag">Tone: ${this.currentVariant.tone}</span>
      </div>
    `;
    
    preview.style.display = 'block';
    preview.style.left = element.offsetLeft + 'px';
    preview.style.top = (element.offsetTop - 100) + 'px';
  }

  /**
   * Hide lesson preview
   */
  hideLessonPreview() {
    const preview = document.getElementById('lesson-preview');
    preview.style.display = 'none';
  }

  /**
   * Load lesson with current variant
   */
  async loadLesson(lessonDay) {
    try {
      // Show loading state
      this.showLoadingState();
      
      // Get lesson from smart server
      const lesson = await this.smartServer.serveLesson(
        lessonDay, 
        this.currentVariant.age, 
        this.currentVariant.tone
      );
      
      // Update lesson info overlay
      this.updateLessonInfo(lesson);
      
      // Setup audio/video content
      this.setupLessonContent(lesson);
      
      // Hide loading state
      this.hideLoadingState();
      
      console.log(`✅ Loaded lesson ${lessonDay} in ${lesson.responseTime}ms`);
      
    } catch (error) {
      console.error('Failed to load lesson:', error);
      this.showError('Failed to load lesson. Please try again.');
    }
  }

  /**
   * Update lesson info overlay
   */
  updateLessonInfo(lesson) {
    this.lessonInfoOverlay.innerHTML = `
      <h2>${lesson.title}</h2>
      <p>Welcome! Today's topic: ${lesson.title}</p>
      <button id="start-lesson-btn" class="start-lesson-btn">Start Lesson</button>
    `;
    
    // Setup start lesson button
    document.getElementById('start-lesson-btn').addEventListener('click', () => {
      this.startLesson();
    });
  }

  /**
   * Setup lesson content (audio/video)
   */
  setupLessonContent(lesson) {
    this.currentLesson = lesson;
    
    // Create audio element for voice-over
    this.audioElement = new Audio();
    this.audioElement.src = this.generateAudioUrl(lesson);
    
    // Setup audio events
    this.audioElement.addEventListener('loadedmetadata', () => {
      this.duration = this.audioElement.duration;
      this.updateProgressBar();
    });
    
    this.audioElement.addEventListener('timeupdate', () => {
      this.currentTime = this.audioElement.currentTime;
      this.updateProgressBar();
    });
    
    this.audioElement.addEventListener('ended', () => {
      this.onLessonComplete();
    });
  }

  /**
   * Start lesson playback
   */
  startLesson() {
    if (!this.currentLesson) return;
    
    this.isPlaying = true;
    this.audioElement.play();
    this.updatePlayButton();
    
    // Show lesson content overlay
    this.showLessonContent();
  }

  /**
   * Pause/Resume lesson
   */
  togglePlayback() {
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
   * Update play button state
   */
  updatePlayButton() {
    const playBtn = document.getElementById('play-btn');
    playBtn.innerHTML = this.isPlaying ? '⏸️' : '▶️';
  }

  /**
   * Update progress bar
   */
  updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = (this.currentTime / this.duration) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update time display
    const timeDisplay = document.getElementById('time-display');
    timeDisplay.textContent = `${this.formatTime(this.currentTime)} / ${this.formatTime(this.duration)}`;
  }

  /**
   * Format time for display
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Show lesson content overlay
   */
  showLessonContent() {
    const contentOverlay = document.getElementById('lesson-content');
    contentOverlay.style.display = 'block';
    
    // Animate content sections based on audio timing
    this.setupContentTiming();
  }

  /**
   * Setup content timing with audio
   */
  setupContentTiming() {
    const sections = this.currentLesson.sections;
    const sectionTimings = this.calculateSectionTimings();
    
    // Show sections based on audio progress
    this.audioElement.addEventListener('timeupdate', () => {
      const currentTime = this.audioElement.currentTime;
      
      Object.keys(sectionTimings).forEach(section => {
        const timing = sectionTimings[section];
        const element = document.getElementById(`section-${section}`);
        
        if (currentTime >= timing.start && currentTime <= timing.end) {
          element.style.opacity = '1';
        } else {
          element.style.opacity = '0.3';
        }
      });
    });
  }

  /**
   * Calculate section timings based on lesson duration
   */
  calculateSectionTimings() {
    const duration = this.duration;
    return {
      introduction: { start: 0, end: duration * 0.25 },
      core_concept: { start: duration * 0.25, end: duration * 0.5 },
      examples: { start: duration * 0.5, end: duration * 0.75 },
      reflection: { start: duration * 0.75, end: duration }
    };
  }

  /**
   * Generate audio URL for lesson
   */
  generateAudioUrl(lesson) {
    // This would integrate with your ElevenLabs API for Kelly/Ken voice synthesis
    return `/api/audio/${lesson.day}_${lesson.age}_${lesson.tone}.mp3`;
  }

  /**
   * Change avatar
   */
  changeAvatar(avatar) {
    this.currentAvatar = avatar;
    this.setupAvatar();
    
    // Update lesson content if currently playing
    if (this.currentLesson) {
      this.loadLesson(this.currentLesson.day);
    }
  }

  /**
   * Change variant (age/tone)
   */
  async changeVariant(age, tone) {
    this.currentVariant = { age, tone };
    
    // Reload current lesson with new variant
    if (this.currentLesson) {
      await this.loadLesson(this.currentLesson.day);
    }
  }

  /**
   * Show loading state
   */
  showLoadingState() {
    const loading = document.getElementById('loading-overlay');
    loading.style.display = 'flex';
  }

  /**
   * Hide loading state
   */
  hideLoadingState() {
    const loading = document.getElementById('loading-overlay');
    loading.style.display = 'none';
  }

  /**
   * Show error message
   */
  showError(message) {
    const error = document.getElementById('error-message');
    error.textContent = message;
    error.style.display = 'block';
    
    setTimeout(() => {
      error.style.display = 'none';
    }, 5000);
  }

  /**
   * Handle lesson completion
   */
  onLessonComplete() {
    this.isPlaying = false;
    this.updatePlayButton();
    
    // Show completion overlay
    this.showCompletionOverlay();
  }

  /**
   * Show completion overlay
   */
  showCompletionOverlay() {
    const completion = document.getElementById('completion-overlay');
    completion.style.display = 'flex';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      completion.style.display = 'none';
    }, 3000);
  }

  /**
   * Get lesson day from calendar
   */
  getLessonDay(month, day) {
    // Map calendar day to lesson day (1-366)
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
      // ... all 366 titles
    };
    return titles[lessonDay] || `Lesson ${lessonDay}`;
  }

  /**
   * Get lesson data
   */
  getLessonData(lessonDay) {
    return {
      title: this.getLessonTitle(lessonDay),
      description: `Day ${lessonDay} of your learning journey`,
      day: lessonDay
    };
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LessonPlayer };
} 