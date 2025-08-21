/**
 * Universal Lesson Player for iLearnHow
 * Handles 366 daily lessons with 5 phases, 10 age groups, 3 tones, 12 languages, 2 avatars
 * Generates 3x3x3x3 variants (81 variants per lesson)
 * Universal learning for humanity
 */

class UniversalLessonPlayer {
    constructor() {
        // Universal scope configuration
        this.lessonPhases = ['opening', 'question_1', 'question_2', 'question_3', 'closing'];
        this.ageGroups = ['age_2', 'age_5', 'age_8', 'age_12', 'age_16', 'age_25', 'age_40', 'age_60', 'age_80', 'age_102'];
        this.tones = ['grandmother', 'fun', 'neutral'];
        this.languages = ['english', 'spanish', 'french', 'german', 'chinese', 'japanese', 'portuguese', 'italian', 'russian', 'arabic', 'hindi', 'korean'];
        this.avatars = ['kelly', 'ken'];
        
        // Current state
        this.currentPhase = 0;
        this.currentLesson = null;
        this.currentDNA = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.playbackSpeed = 1;
        this.volume = 0.5;
        this.autoplay = false;
        
        // Audio system
        this.audioElement = null;
        this.elevenLabs = null;
        
        // Variant system
        this.currentVariant = {
            age: 'age_25',
            tone: 'neutral',
            language: 'english',
            avatar: 'kelly'
        };
        
        // Calendar system
        this.currentYear = 2025;
        this.currentDay = this.getCurrentDayOfYear();
        this.selectedDay = this.currentDay;
        
        // Initialize universal systems
        this.initializeUniversalPlayer();
        this.setupEventListeners();
        this.loadUniversalCurriculum();
    }

    /**
     * Initialize universal lesson player
     */
    initializeUniversalPlayer() {
        console.log('🌍 Initializing Universal Lesson Player for Humanity...');
        
        // Initialize audio system via AudioService + Railway
        this.audioElement = document.getElementById('tts-audio') || new Audio();
        this.setupAudioEvents();
        this.setVolume(this.volume);
        
        // Initialize Railway TTS integration (sole TTS path)
        try {
            const RAILWAY_TTS_URL = (window && (window.RAILWAY_TTS_URL || (window.RailwayTTS && window.RailwayTTS.DEFAULT_BASE_URL))) || 'https://mynextlesson-synthesis-production.up.railway.app';
            this.railwayTTS = (typeof RailwayTTS !== 'undefined') ? new RailwayTTS(RAILWAY_TTS_URL) : null;
            this.audioService = (typeof AudioService !== 'undefined') ? new AudioService(this.audioElement, this.railwayTTS) : null;
            if (this.audioService) console.log('✅ Railway TTS integration ready'); else console.warn('⚠️ Railway AudioService not available');
        } catch (e) { console.warn('⚠️ Railway TTS init error', e); }
        
        // Set default avatar and preload assets
        this.updateAvatar(this.currentVariant.avatar, 'welcoming_engaging');
        try { this.preloadVisemeFrames(this.currentVariant.avatar); } catch{}
        
        // Aug20 safety: disable flashing viseme canvases if present
        try {
            const qp = new URLSearchParams(location.search);
            const aug20 = (qp.get('ui')||'').toLowerCase() === 'aug20' || qp.get('aug20') === '1';
            if (aug20) {
                ['avatar-mouth-overlay','avatar-mouth'].forEach(id=>{ try { const el = document.getElementById(id); if (el) el.style.display = 'none'; } catch{} });
                window.DISABLE_VISEMES = true;
            }
        } catch {}

        console.log('✅ Universal Lesson Player initialized');
    }

    /**
     * Load universal curriculum (366 days)
     */
    async loadUniversalCurriculum() {
        console.log('📚 Loading universal curriculum for 366 days...');
        
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        
        try {
            this.universalCurriculum = {};
            
            for (const month of months) {
                const response = await fetch(`data/${month}_curriculum.json`);
                if (response.ok) {
                    this.universalCurriculum[month] = await response.json();
                    console.log(`✅ Loaded ${month} curriculum`);
                } else {
                    console.error(`❌ Failed to load ${month} curriculum`);
                }
            }
            
            console.log('✅ Universal curriculum loaded');
            this.generateUniversalCalendar();
            this.loadCurrentLesson();
            
        } catch (error) {
            console.error('❌ Error loading universal curriculum:', error);
            this.showError('Failed to load universal curriculum');
        }
    }

    /**
     * Generate universal calendar for all 366 days
     */
    generateUniversalCalendar() {
        console.log('📅 Generating universal calendar for 366 days...');
        
        const calendarContainer = document.getElementById('calendar-overlay');
        const calendarGrid = document.getElementById('calendar-grid');
        
        if (!calendarGrid) {
            console.error('❌ Calendar grid not found');
            return;
        }
        
        // Clear existing calendar
        calendarGrid.innerHTML = '';
        
        // Create month navigation
        const monthNavigation = document.createElement('div');
        monthNavigation.className = 'month-navigation';
        monthNavigation.innerHTML = `
            <button onclick="lessonPlayer.previousMonth()">◀</button>
            <span id="current-month">January</span>
            <button onclick="lessonPlayer.nextMonth()">▶</button>
        `;
        calendarContainer.insertBefore(monthNavigation, calendarGrid);
        
        // Generate current month calendar
        this.generateMonthCalendar(this.getCurrentMonth());
    }

    /**
     * Generate calendar for specific month
     */
    generateMonthCalendar(month) {
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthElement = document.getElementById('current-month');
        
        if (!calendarGrid) return;
        
        // Update month display
        if (currentMonthElement) {
            currentMonthElement.textContent = this.getMonthName(month);
        }
        
        // Clear grid
        calendarGrid.innerHTML = '';
        
        // Get days in month
        const daysInMonth = this.getDaysInMonth(month);
        
        // Generate day buttons
        for (let day = 1; day <= daysInMonth; day++) {
            const dayOfYear = this.getDayOfYear(month, day);
            const isToday = dayOfYear === this.currentDay;
            const isSelected = dayOfYear === this.selectedDay;
            
            const dayButton = document.createElement('button');
            dayButton.className = 'calendar-day';
            dayButton.textContent = day;
            
            if (isToday) dayButton.classList.add('today');
            if (isSelected) dayButton.classList.add('selected');
            if (dayOfYear <= 366) dayButton.classList.add('available');
            
            dayButton.onclick = () => this.selectDay(dayOfYear);
            calendarGrid.appendChild(dayButton);
        }
    }

    /**
     * Load lesson for specific day
     */
    async loadLessonByDay(day) {
        console.log(`📚 Loading lesson for day ${day}...`);
        
        try {
            // Get lesson data from curriculum
            const lessonData = this.getLessonDataForDay(day);
            if (!lessonData) {
                throw new Error(`No lesson data for day ${day}`);
            }
            
            // Load DNA data if available
            await this.loadDNALesson(day);
            
            // Set current lesson
            this.currentLesson = lessonData;
            this.selectedDay = day;
            
            // Update display
            this.updateLessonInfo(lessonData);
            this.updateCalendarSelection(day);
            
            console.log(`✅ Lesson loaded for day ${day}: ${lessonData.title}`);
            
        } catch (error) {
            console.error(`❌ Failed to load lesson for day ${day}:`, error);
            this.showError(`Failed to load lesson for day ${day}`);
        }
    }

    /**
     * Load DNA lesson data
     */
    async loadDNALesson(day) {
        try {
            // Try to load specific DNA file for this day
            const dnaResponse = await fetch(`dna_files/${day.toString().padStart(3, '0')}_lesson.json`);
            if (dnaResponse.ok) {
                this.currentDNA = await dnaResponse.json();
                console.log(`✅ DNA data loaded for day ${day}`);
            } else {
                // Fallback to the-sun-dna.json
                const fallbackResponse = await fetch('data/the-sun-dna.json');
                if (fallbackResponse.ok) {
                    this.currentDNA = await fallbackResponse.json();
                    console.log(`✅ Using fallback DNA data for day ${day}`);
                }
            }
        } catch (error) {
            console.warn(`⚠️ No DNA data available for day ${day}, using fallback`);
        }
    }

    /**
     * Start universal lesson with 5 phases
     */
    startUniversalLesson() {
        if (!this.currentLesson) {
            this.showError('No lesson loaded');
            return;
        }

        console.log('🚀 Starting universal lesson with 5 phases...');
        
        // Reset to first phase
        this.currentPhase = 0;
        
        // Generate personalized content for current variant
        this.generateUniversalContent();
        
        // Start first phase
        this.playCurrentPhase();
    }

    /**
     * Generate universal content based on current variant
     */
    generateUniversalContent() {
        console.log('🎨 Generating universal content for variant:', this.currentVariant);
        
        // Use variant generator if available
        if (typeof CorrectedVariantGeneratorV2 !== 'undefined') {
            const variantGenerator = new CorrectedVariantGeneratorV2();
            this.universalContent = variantGenerator.generatePersonalizedContent(this.currentVariant);
        } else {
            // Generate fallback content
            this.universalContent = this.generateFallbackUniversalContent();
        }
        
        console.log('✅ Universal content generated');
    }

    /**
     * Play current lesson phase
     */
    async playCurrentPhase() {
        if (this.currentPhase >= this.lessonPhases.length) {
            this.onLessonComplete();
            return;
        }

        const phase = this.lessonPhases[this.currentPhase];
        console.log(`🎵 Playing phase ${this.currentPhase + 1}/5: ${phase}`);

        // Update avatar for current phase
        this.updateAvatarForPhase(phase);

        // Display phase content
        this.showPhaseContent(phase);

        // Generate and play audio
        await this.generateAndPlayPhaseAudio(phase);

        // Set up auto-advance
        const phaseDuration = this.getPhaseDuration(phase);
        setTimeout(() => {
            this.nextPhase();
        }, phaseDuration * 1000);
    }

    /**
     * Update avatar for specific phase
     */
    updateAvatarForPhase(phase) {
        const avatar = this.currentVariant.avatar;
        const tone = this.currentVariant.tone;
        
        let expression = 'neutral_default';
        
        switch (phase) {
            case 'opening':
                expression = tone === 'grandmother' ? 'welcoming_engaging' : 
                           tone === 'fun' ? 'excited_celebrating' : 'teaching_explaining';
                break;
            case 'question_1':
            case 'question_2':
            case 'question_3':
                expression = 'question_curious';
                break;
            case 'closing':
                expression = tone === 'grandmother' ? 'happy_celebrating' : 
                           tone === 'fun' ? 'excited_celebrating' : 'teaching_explaining';
                break;
        }
        
        this.updateAvatar(avatar, expression);
    }

    /**
     * Show content for specific phase
     */
    showPhaseContent(phase) {
        const lessonContent = document.getElementById('lesson-content');
        const lessonTitle = document.getElementById('lesson-title');
        const lessonText = document.getElementById('lesson-text');
        
        if (!lessonContent || !lessonTitle || !lessonText) {
            console.error('❌ Lesson content elements not found');
            return;
        }

        // Get phase-specific content
        const phaseContent = this.getPhaseContent(phase);
        
        // Set title
        const titles = {
            opening: 'Welcome to Your Lesson',
            question_1: 'Question 1: Think About This',
            question_2: 'Question 2: Explore Further',
            question_3: 'Question 3: Deep Understanding',
            closing: 'What You\'ve Learned'
        };
        
        lessonTitle.textContent = titles[phase] || 'Your Lesson';
        
        // Format and display content
        lessonText.innerHTML = this.formatPhaseContent(phaseContent, phase);
        
        // Show with animation
        lessonContent.style.display = 'block';
        lessonContent.style.opacity = '0';
        lessonContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            lessonContent.style.opacity = '1';
            lessonContent.style.transform = 'translateY(0)';
        }, 100);
    }

    /**
     * Get content for specific phase
     */
    getPhaseContent(phase) {
        if (!this.universalContent) {
            return 'Content not available';
        }
        
        switch (phase) {
            case 'opening':
                return this.universalContent.introduction || this.currentLesson.learning_objective;
            case 'question_1':
            case 'question_2':
            case 'question_3':
                const questionIndex = parseInt(phase.split('_')[1]) - 1;
                const questions = this.universalContent.questions || [];
                return questions[questionIndex] || 'Question content not available';
            case 'closing':
                return this.universalContent.conclusion || 'Great job! You\'ve learned something new today.';
            default:
                return 'Phase content not available';
        }
    }

    /**
     * Format phase content appropriately
     */
    formatPhaseContent(content, phase) {
        if (phase.includes('question')) {
            return this.formatQuestionContent(content);
        } else {
            return this.formatTextContent(content, phase);
        }
    }

    /**
     * Format question content
     */
    formatQuestionContent(questionData) {
        if (!questionData || typeof questionData === 'string') {
            return `<div class="content-text">${questionData || 'Question content not available'}</div>`;
        }
        
        let html = `<div class="question-container">`;
        html += `<h3 class="question-text">${questionData.question || 'Question'}</h3>`;
        
        if (questionData.choices && questionData.choices.length > 0) {
            html += `<div class="choices-container">`;
            questionData.choices.forEach((choice, index) => {
                html += `
                    <button class="choice-btn" data-choice="${index}" onclick="lessonPlayer.handleQuestionAnswer(${this.currentPhase - 1}, ${index})">
                        ${choice}
                    </button>
                `;
            });
            html += `</div>`;
        }
        
        html += `</div>`;
        return html;
    }

    /**
     * Format text content
     */
    formatTextContent(text, phase) {
        let formatted = text.replace(/\n/g, '<br>');
        
        // Add emphasis for important points
        if (phase === 'opening') {
            formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        }
        
        return `<div class="content-text ${phase}-text">${formatted}</div>`;
    }

    /**
     * Generate and play audio for phase
     */
    async generateAndPlayPhaseAudio(phase) {
        try {
            const content = this.getPhaseContent(phase);
            const avatar = this.currentVariant.avatar;
            if (this.audioService) {
                const result = await this.audioService.playText(content, avatar);
                if (result && result.audioUrl) {
                    this.isPlaying = true;
                    this.updatePlayButton();
                    console.log('✅ Railway audio generated and playing for phase:', phase);
                    // Start viseme loop if phonemes are present
                    try {
                        if (Array.isArray(result.phonemes) && result.phonemes.length > 0) {
                            this.startVisemeLoop(result.phonemes, avatar);
                        } else {
                            this.stopVisemeLoop();
                        }
                    } catch{}
                } else {
                    console.warn('⚠️ Railway result missing audioUrl; using fallback');
                    this.useFallbackAudio(phase);
                }
            } else {
                console.warn('⚠️ Railway AudioService not available; using fallback');
                this.useFallbackAudio(phase);
            }
        } catch (error) {
            console.error('❌ Audio generation error:', error);
            this.useFallbackAudio(phase);
        }
    }

    /**
     * Use fallback audio system
     */
    useFallbackAudio(phase) {
        const duration = this.getPhaseDuration(phase);
        
        // Simulate audio playback
        setTimeout(() => {
            this.nextPhase();
        }, duration * 1000);
        
        console.log('🔊 Using fallback audio simulation for phase:', phase);
    }

    /**
     * Get duration for phase
     */
    getPhaseDuration(phase) {
        const age = this.currentVariant.age;
        
        // Age-appropriate durations
        const durations = {
            age_2: { opening: 30, question: 45, closing: 30 },
            age_5: { opening: 45, question: 60, closing: 45 },
            age_8: { opening: 60, question: 90, closing: 60 },
            age_12: { opening: 75, question: 120, closing: 75 },
            age_16: { opening: 90, question: 150, closing: 90 },
            age_25: { opening: 90, question: 150, closing: 90 },
            age_40: { opening: 90, question: 150, closing: 90 },
            age_60: { opening: 90, question: 150, closing: 90 },
            age_80: { opening: 90, question: 150, closing: 90 },
            age_102: { opening: 90, question: 150, closing: 90 }
        };
        
        const ageDurations = durations[age] || durations.age_25;
        
        if (phase === 'opening') return ageDurations.opening;
        if (phase.includes('question')) return ageDurations.question;
        if (phase === 'closing') return ageDurations.closing;
        
        return 90; // Default duration
    }

    /**
     * Move to next phase
     */
    nextPhase() {
        this.currentPhase++;
        if (this.currentPhase < this.lessonPhases.length) {
            this.playCurrentPhase();
        } else {
            this.onLessonComplete();
        }
    }

    /**
     * Handle lesson completion
     */
    onLessonComplete() {
        console.log('🎉 Universal lesson completed!');
        this.isPlaying = false;
        this.updatePlayButton();
        
        // Show completion message
        this.showPhaseContent('closing');
        
        // Show daily fortune
        setTimeout(() => {
            this.showDailyFortune();
        }, 3000);
    }

    /**
     * Show daily fortune
     */
    showDailyFortune() {
        if (this.universalContent && this.universalContent.fortune) {
            this.showPhaseContent('fortune');
        }
    }

    /**
     * Handle question answer
     */
    handleQuestionAnswer(questionIndex, selectedOption) {
        console.log(`✅ Question ${questionIndex + 1} answered: ${selectedOption}`);
        
        // Show feedback
        this.showQuestionFeedback(questionIndex, selectedOption);
        
        // Advance to next phase after delay
        setTimeout(() => {
            this.nextPhase();
        }, 2000);
    }

    /**
     * Show question feedback
     */
    showQuestionFeedback(questionIndex, selectedOption) {
        const lessonText = document.getElementById('lesson-text');
        if (!lessonText) return;
        
        const feedback = this.getQuestionFeedback(questionIndex, selectedOption);
        
        lessonText.innerHTML = `
            <div class="feedback-container">
                <h3>Great thinking!</h3>
                <p>${feedback}</p>
            </div>
        `;
    }

    /**
     * Get feedback for question answer
     */
    getQuestionFeedback(questionIndex, selectedOption) {
        // This would be generated from DNA data
        return "You're thinking about this in a wonderful way! This understanding will help you in many areas of life.";
    }

    /**
     * Update avatar
     */
    updateAvatar(avatar, expression) {
        const avatarContainer = document.getElementById('avatar-container');
        if (!avatarContainer) return;
        
        // Update avatar container class
        avatarContainer.className = `avatar-container ${avatar}-active`;
        
        // Update background image (use config if available)
        let imagePath;
        try {
            if (window.AVATAR_CONFIG && typeof window.AVATAR_CONFIG.getAvatarUrl === 'function') {
                imagePath = window.AVATAR_CONFIG.getAvatarUrl(avatar, expression);
            }
        } catch {}
        if (!imagePath) {
            imagePath = `/production-deploy/assets/avatars/${avatar}/${avatar}_${expression}.png`;
        }
        avatarContainer.style.backgroundImage = `url('${imagePath}')`;
        
        console.log(`🎭 Avatar updated: ${avatar} with expression: ${expression}`);
    }

    /**
     * Update lesson info display
     */
    updateLessonInfo(lessonData) {
        const lessonInfo = document.getElementById('lesson-info');
        if (lessonInfo) {
            lessonInfo.innerHTML = `
                <h2>${lessonData.title}</h2>
                <p>${lessonData.learning_objective}</p>
                <button class="start-lesson-btn" id="start-lesson-btn">Start Universal Lesson</button>
            `;
        }
    }

    /**
     * Update calendar selection
     */
    updateCalendarSelection(selectedDay) {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        
        // Add new selection
        const selectedDayElement = document.querySelector(`[onclick*="${selectedDay}"]`);
        if (selectedDayElement) {
            selectedDayElement.classList.add('selected');
        }
    }

    /**
     * Get current day of year
     */
    getCurrentDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    /**
     * Get current month (1-12)
     */
    getCurrentMonth() {
        return new Date().getMonth() + 1;
    }

    /**
     * Get month name
     */
    getMonthName(month) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1] || 'Unknown';
    }

    /**
     * Get days in month
     */
    getDaysInMonth(month) {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return daysInMonth[month - 1] || 31;
    }

    /**
     * Get day of year for month and day
     */
    getDayOfYear(month, day) {
        const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let dayOfYear = day;
        
        for (let i = 1; i < month; i++) {
            dayOfYear += daysInMonth[i];
        }
        
        return dayOfYear;
    }

    /**
     * Get lesson data for day
     */
    getLessonDataForDay(day) {
        // Find which month this day belongs to
        const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let month = 1;
        let dayInMonth = day;
        
        for (let i = 1; i <= 12; i++) {
            if (dayInMonth <= daysInMonth[i]) {
                month = i;
                break;
            }
            dayInMonth -= daysInMonth[i];
        }
        
        // Get month curriculum
        const monthName = this.getMonthName(month).toLowerCase();
        const monthCurriculum = this.universalCurriculum[monthName];
        
        if (!monthCurriculum || !monthCurriculum.days) {
            return null;
        }
        
        // Find lesson for this day
        return monthCurriculum.days.find(lesson => lesson.day === day) || null;
    }

    /**
     * Load current lesson
     */
    async loadCurrentLesson() {
        await this.loadLessonByDay(this.currentDay);
    }

    /**
     * Select day
     */
    selectDay(day) {
        console.log(`📅 Selected day ${day}`);
        this.loadLessonByDay(day);
    }

    /**
     * Previous month
     */
    previousMonth() {
        let currentMonth = this.getCurrentMonth();
        currentMonth = currentMonth > 1 ? currentMonth - 1 : 12;
        this.generateMonthCalendar(currentMonth);
    }

    /**
     * Next month
     */
    nextMonth() {
        let currentMonth = this.getCurrentMonth();
        currentMonth = currentMonth < 12 ? currentMonth + 1 : 1;
        this.generateMonthCalendar(currentMonth);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Start lesson button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'start-lesson-btn') {
                this.startUniversalLesson();
            }
        });

        // Variant control event listeners
        this.setupVariantEventListeners();

        // Audio controls
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }

        // Play controls
        const playButton = document.getElementById('play-btn');
        if (playButton) {
            playButton.addEventListener('click', () => {
                this.togglePlayback();
            });
        }

        // Navigation
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                this.handleNavigation(e.target.dataset.section);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    /**
     * Setup variant event listeners
     */
    setupVariantEventListeners() {
        // Avatar selection
        const avatarSelect = document.getElementById('avatar-select');
        if (avatarSelect) {
            avatarSelect.addEventListener('change', (e) => {
                this.onAvatarChange(e.target.value);
            });
        }

        // Tone selection
        const toneSelect = document.getElementById('tone-select');
        if (toneSelect) {
            toneSelect.addEventListener('change', (e) => {
                this.onToneChange(e.target.value);
            });
        }

        // Language selection
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.onLanguageChange(e.target.value);
            });
        }

        // Age selection
        const ageSelect = document.getElementById('age-select');
        if (ageSelect) {
            ageSelect.addEventListener('change', (e) => {
                this.onAgeChange(e.target.value);
            });
        }
    }

    /**
     * Handle avatar change
     */
    onAvatarChange(newAvatar) {
        console.log('🎭 Avatar changed to:', newAvatar);
        this.currentVariant.avatar = newAvatar;
        
        // Update avatar display immediately
        this.updateAvatar(newAvatar, this.getAvatarExpression(this.currentVariant.tone));
        
        // Regenerate content if lesson is active
        if (this.isPlaying) {
            this.generateUniversalContent();
        }
    }

    /**
     * Handle tone change
     */
    onToneChange(newTone) {
        console.log('🎨 Tone changed to:', newTone);
        this.currentVariant.tone = newTone;
        
        // Update avatar expression
        this.updateAvatar(this.currentVariant.avatar, this.getAvatarExpression(newTone));
        
        // Regenerate content if lesson is active
        if (this.isPlaying) {
            this.generateUniversalContent();
        }
    }

    /**
     * Handle language change
     */
    onLanguageChange(newLanguage) {
        console.log('🌍 Language changed to:', newLanguage);
        this.currentVariant.language = newLanguage;
        
        // Regenerate content if lesson is active
        if (this.isPlaying) {
            this.generateUniversalContent();
        }
    }

    /**
     * Handle age change
     */
    onAgeChange(newAge) {
        console.log('👶 Age changed to:', newAge);
        this.currentVariant.age = newAge;
        
        // Regenerate content if lesson is active
        if (this.isPlaying) {
            this.generateUniversalContent();
        }
    }

    /**
     * Get avatar expression for tone
     */
    getAvatarExpression(tone) {
        const expressions = {
            grandmother: 'welcoming_engaging',
            fun: 'excited_celebrating',
            neutral: 'teaching_explaining'
        };
        return expressions[tone] || 'neutral_default';
    }

    /**
     * Setup audio events
     */
    setupAudioEvents() {
        this.audioElement.addEventListener('loadedmetadata', () => {
            this.duration = this.audioElement.duration;
            this.updateProgressBar();
        });

        this.audioElement.addEventListener('timeupdate', () => {
            this.currentTime = this.audioElement.currentTime;
            this.updateProgressBar();
        });

        this.audioElement.addEventListener('ended', () => {
            this.nextPhase();
        });

        this.audioElement.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.showError('Audio playback failed');
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
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
        }
    }

    /**
     * Update progress bar
     */
    updateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill && this.duration > 0) {
            const progress = (this.currentTime / this.duration) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    /**
     * Set volume
     */
    setVolume(volume) {
        this.volume = volume;
        this.audioElement.volume = volume;
    }

    /**
     * Viseme system: mapping, preload, and scheduling
     */
    getPhonemeVisemeMap(){
        return {
            'AA':'A','AE':'A','AH':'A','AY':'A',
            'AO':'O','AW':'O','OW':'O','OY':'O','UH':'O','UW':'O',
            'EH':'E','ER':'R','EY':'E',
            'IH':'I','IY':'I',
            'B':'MBP','M':'MBP','P':'MBP',
            'F':'FV','V':'FV',
            'TH':'TH',
            'D':'DNTL','N':'DNTL','T':'DNTL','L':'DNTL',
            'K':'KG','G':'KG',
            'S':'S','Z':'S',
            'W':'WQ','Q':'WQ',
            'R':'R'
        };
    }

    preloadVisemeFrames(avatar){
        try {
            const base = ['REST','A','E','I','O','MBP','FV','TH','DNTL','KG','S','WQ','R'];
            base.forEach(v=>{
                let url;
                try {
                    if (window.AVATAR_CONFIG && window.AVATAR_CONFIG.getVisemeUrl) {
                        url = window.AVATAR_CONFIG.getVisemeUrl(avatar, v);
                    } else {
                        const a = (String(avatar||'').toLowerCase()==='ken')?'ken':'kelly';
                        url = `/production-deploy/assets/avatars/${a}/2d/full/${a}_${v}.png`;
                    }
                } catch{}
                if (url) { const img = new Image(); img.src = url; }
            });
        } catch {}
    }

    startVisemeLoop(phonemes, avatar){
        try { this.stopVisemeLoop(); } catch{}
        this._viseme = this._viseme || { rafId: null, idx: 0, current: 'REST', startAt: performance.now() };
        this._viseme.idx = 0; this._viseme.current = 'REST'; this._viseme.startAt = performance.now();
        const map = this.getPhonemeVisemeMap();
        const a = avatar || this.currentVariant.avatar || 'kelly';
        const audio = this.audioElement;
        const show = (vis)=>{
            if (this._viseme.current === vis) return;
            this._viseme.current = vis;
            try {
                let url;
                if (window.AVATAR_CONFIG && window.AVATAR_CONFIG.getVisemeUrl) {
                    url = window.AVATAR_CONFIG.getVisemeUrl(a, vis);
                } else {
                    const aa = (String(a||'').toLowerCase()==='ken')?'ken':'kelly';
                    url = `/production-deploy/assets/avatars/${aa}/2d/full/${aa}_${vis}.png`;
                }
                const c = document.getElementById('avatar-container');
                if (c && url) c.style.backgroundImage = `url('${url}')`;
            } catch{}
        };
        const loop = ()=>{
            if (!this.isPlaying || audio.paused) { this._viseme.rafId = requestAnimationFrame(loop); return; }
            const t = audio.currentTime || 0;
            // Advance through phonemes in order
            while (this._viseme.idx < phonemes.length && phonemes[this._viseme.idx].end <= t) {
                this._viseme.idx++;
            }
            const ph = phonemes[this._viseme.idx];
            if (ph && ph.start <= t && t <= ph.end) {
                const code = String(ph.phoneme||'').toUpperCase();
                const vis = map[code] || 'REST';
                show(vis);
            } else if (this._viseme.idx >= phonemes.length) {
                show('REST');
            }
            this._viseme.rafId = requestAnimationFrame(loop);
        };
        this._viseme.rafId = requestAnimationFrame(loop);
        // Ensure frames are ready
        try { this.preloadVisemeFrames(a); } catch{}
        // Stop when audio ends
        const onEnd = ()=>{ try { this.stopVisemeLoop(); } catch{} audio.removeEventListener('ended', onEnd); };
        audio.addEventListener('ended', onEnd);
    }

    stopVisemeLoop(){
        if (this._viseme && this._viseme.rafId) {
            try { cancelAnimationFrame(this._viseme.rafId); } catch{}
            this._viseme.rafId = null;
        }
        // Return to neutral expression after audio finishes
        try { this.updateAvatar(this.currentVariant.avatar, this.getAvatarExpression(this.currentVariant.tone)); } catch{}
    }

    /**
     * Handle navigation
     */
    handleNavigation(section) {
        switch (section) {
            case 'calendar':
                this.toggleCalendar();
                break;
            case 'variants':
                this.toggleVariantControls();
                break;
            case 'tone':
                this.toggleToneControls();
                break;
            case 'avatar':
                this.toggleAvatarControls();
                break;
            case 'language':
                this.toggleLanguageControls();
                break;
            case 'age':
                this.toggleAgeControls();
                break;
            default:
                console.log('Navigation:', section);
        }
    }

    /**
     * Toggle calendar
     */
    toggleCalendar() {
        const overlay = document.getElementById('calendar-overlay');
        if (overlay) {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Toggle variant controls
     */
    toggleVariantControls() {
        console.log('📋 Variant controls toggled');
    }

    /**
     * Toggle tone controls
     */
    toggleToneControls() {
        const overlay = document.getElementById('tone-overlay');
        if (overlay) {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Toggle avatar controls
     */
    toggleAvatarControls() {
        const overlay = document.getElementById('avatar-overlay');
        if (overlay) {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Toggle language controls
     */
    toggleLanguageControls() {
        const overlay = document.getElementById('language-overlay');
        if (overlay) {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Toggle age controls
     */
    toggleAgeControls() {
        const overlay = document.getElementById('age-overlay');
        if (overlay) {
            overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
        }
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
                this.previousMonth();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextMonth();
                break;
            case 'Escape':
                this.closeAllOverlays();
                break;
        }
    }

    /**
     * Close all overlays
     */
    closeAllOverlays() {
        const overlays = [
            'calendar-overlay',
            'tone-overlay',
            'avatar-overlay',
            'language-overlay',
            'age-overlay'
        ];
        
        overlays.forEach(overlayId => {
            const overlay = document.getElementById(overlayId);
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
    }

    /**
     * Generate fallback universal content
     */
    generateFallbackUniversalContent() {
        return {
            introduction: `Welcome to today's lesson about ${this.currentLesson?.title || 'learning'}. This is your personalized learning experience.`,
            questions: [
                {
                    question: "What is the main topic of today's lesson?",
                    choices: [
                        this.currentLesson?.title || "Today's topic",
                        "A different topic",
                        "Something else entirely"
                    ]
                },
                {
                    question: "How does this lesson connect to your daily life?",
                    choices: [
                        "It helps me understand the world better",
                        "It doesn't connect to my life",
                        "I'm not sure yet"
                    ]
                },
                {
                    question: "What would you like to explore further about this topic?",
                    choices: [
                        "I want to learn more about the practical applications",
                        "I'm not interested in exploring further",
                        "I need more time to think about this"
                    ]
                }
            ],
            conclusion: "Great job! You've learned something new today. Keep exploring and asking questions!",
            fortune: "Your curiosity shows your natural desire to learn and grow. Keep asking questions and exploring the world around you!"
        };
    }

    /**
     * Show error message
     */
    showError(message) {
        console.error('❌ Error:', message);
        // Could implement toast notification here
    }

    /**
     * Show loading
     */
    showLoading() {
        console.log('⏳ Loading...');
    }

    /**
     * Hide loading
     */
    hideLoading() {
        console.log('✅ Loading complete');
    }
}

// Initialize the lesson player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Complete Lesson Player...');
    window.lessonPlayer = new UniversalLessonPlayer();
}); 