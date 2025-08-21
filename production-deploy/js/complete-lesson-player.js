/**
 * Complete Lesson Player for iLearnHow
 * Handles all 365 days of 2025 with full calendar functionality
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
        
        this.audioElement = null;
        this.currentSegment = 0;
        this.segments = [];
        
        // Calendar and curriculum data
        this.fullYearData = {};
        this.currentYear = 2025;
        this.currentMonth = new Date().getMonth() + 1; // 1-12
        this.currentDay = new Date().getDate(); // 1-31
        this.selectedDay = this.currentDay;
        this.selectedMonth = this.currentMonth;
        
        this.initializePlayer();
        this.setupEventListeners();
        this.loadFullYearData();
    }

    /**
     * Initialize the lesson player
     */
    initializePlayer() {
        console.log('🎬 Initializing Complete Lesson Player for 2025...');
        
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
     * Load all 12 months of curriculum data
     */
    async loadFullYearData() {
        console.log('📚 Loading full year curriculum data...');
        
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
        
        try {
            for (const month of months) {
                const response = await fetch(`data/${month}_curriculum.json`);
                if (response.ok) {
                    this.fullYearData[month] = await response.json();
                    console.log(`✅ Loaded ${month} curriculum`);
                } else {
                    console.error(`❌ Failed to load ${month} curriculum`);
                }
            }
            
            console.log('✅ All curriculum data loaded');
            this.generateFullYearCalendar();
            this.loadCurrentLesson();
            
        } catch (error) {
            console.error('❌ Error loading curriculum data:', error);
            this.showError('Failed to load curriculum data');
        }
    }

    /**
     * Generate complete 365-day calendar for 2025
     */
    generateFullYearCalendar() {
        console.log('📅 Generating full year calendar...');
        
        const calendarContainer = document.getElementById('calendar-overlay');
        const calendarGrid = document.getElementById('calendar-grid');
        
        // Clear existing calendar
        calendarGrid.innerHTML = '';
        
        // Create month selector
        const monthSelector = document.createElement('div');
        monthSelector.className = 'month-selector';
        monthSelector.innerHTML = `
            <button class="month-nav" id="prev-month">‹</button>
            <span class="current-month" id="current-month">${this.getMonthName(this.currentMonth)} 2025</span>
            <button class="month-nav" id="next-month">›</button>
        `;
        
        // Insert month selector before calendar grid
        calendarGrid.parentNode.insertBefore(monthSelector, calendarGrid);
        
        // Generate calendar for current month
        this.generateMonthCalendar(this.currentMonth);
        
        // Setup month navigation
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentMonth = this.currentMonth === 1 ? 12 : this.currentMonth - 1;
            this.updateMonthDisplay();
            this.generateMonthCalendar(this.currentMonth);
        });
        
        document.getElementById('next-month').addEventListener('click', () => {
            this.currentMonth = this.currentMonth === 12 ? 1 : this.currentMonth + 1;
            this.updateMonthDisplay();
            this.generateMonthCalendar(this.currentMonth);
        });
    }

    /**
     * Generate calendar for a specific month
     */
    generateMonthCalendar(month) {
        const calendarGrid = document.getElementById('calendar-grid');
        calendarGrid.innerHTML = '';
        
        const monthName = this.getMonthName(month).toLowerCase();
        const monthData = this.fullYearData[monthName];
        
        if (!monthData) {
            console.error(`No data for ${monthName}`);
            return;
        }
        
        // Get first day of month and number of days
        const firstDay = new Date(2025, month - 1, 1).getDay();
        const daysInMonth = new Date(2025, month, 0).getDate();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            dayElement.dataset.day = day;
            dayElement.dataset.month = month;
            
            // Check if this day has lesson data
            const lessonData = this.getLessonData(month, day);
            if (lessonData) {
                dayElement.dataset.title = lessonData.title;
                dayElement.dataset.objective = lessonData.learning_objective;
                dayElement.classList.add('has-lesson');
                
                // Add tooltip
                dayElement.title = `${lessonData.title}\n\n${lessonData.learning_objective}`;
            }
            
            // Highlight current day
            if (day === this.currentDay && month === this.currentMonth) {
                dayElement.classList.add('current-day');
            }
            
            // Highlight selected day
            if (day === this.selectedDay && month === this.selectedMonth) {
                dayElement.classList.add('selected');
            }
            
            dayElement.addEventListener('click', () => {
                this.selectDay(day, month);
            });
            
            calendarGrid.appendChild(dayElement);
        }
    }

    /**
     * Get lesson data for a specific day
     */
    getLessonData(month, day) {
        const monthName = this.getMonthName(month).toLowerCase();
        const monthData = this.fullYearData[monthName];
        
        if (!monthData || !monthData.days) {
            return null;
        }
        
        return monthData.days.find(lesson => lesson.day === day) || null;
    }

    /**
     * Select a day and load its lesson
     */
    selectDay(day, month) {
        console.log(`📅 Selected day ${day} of month ${month}`);
        
        // Update selected day
        this.selectedDay = day;
        this.selectedMonth = month;
        
        // Update calendar display
        document.querySelectorAll('.calendar-day').forEach(el => {
            el.classList.remove('selected');
        });
        
        const selectedElement = document.querySelector(`[data-day="${day}"][data-month="${month}"]`);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }
        
        // Load lesson for selected day
        this.loadLessonByDay(day, month);
    }

    /**
     * Load lesson for a specific day
     */
    async loadLessonByDay(day, month) {
        const lessonData = this.getLessonData(month, day);
        
        if (!lessonData) {
            console.log(`No lesson data for day ${day} of month ${month}`);
            this.showError('No lesson available for this day');
            return;
        }
        
        console.log(`📚 Loading lesson: ${lessonData.title}`);
        
        // Update lesson info display
        this.updateLessonInfo(lessonData);
        
        // Show lesson content immediately
        this.displayLessonContent(lessonData);
        
        // Store lesson data for later use
        this.currentLesson = {
            day: day,
            month: month,
            title: lessonData.title,
            topic: lessonData.title,
            learning_objective: lessonData.learning_objective,
            lessonData: lessonData
        };
        
        console.log('✅ Lesson loaded successfully');
        
        // Hide loading overlay
        this.hideLoading();
    }

    /**
     * Load today's lesson
     */
    async loadCurrentLesson() {
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() + 1;
        
        console.log(`📅 Loading today's lesson: Day ${currentDay} of month ${currentMonth}`);
        
        this.selectDay(currentDay, currentMonth);
    }

    /**
     * Update month display
     */
    updateMonthDisplay() {
        const monthDisplay = document.getElementById('current-month');
        if (monthDisplay) {
            monthDisplay.textContent = `${this.getMonthName(this.currentMonth)} 2025`;
        }
    }

    /**
     * Get month name from number
     */
    getMonthName(month) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1];
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Play button
        const playButton = document.getElementById('play-button');
        if (playButton) {
            playButton.addEventListener('click', () => {
                this.togglePlayback();
            });
        } else {
            console.log('⚠️ Play button not found, skipping event listener');
        }

        // Start lesson button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'start-lesson-btn') {
                this.startLesson();
            }
        });

        // Progress bar
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                this.seekToPosition(e);
            });
        } else {
            console.log('⚠️ Progress bar not found, skipping event listener');
        }

        // Volume slider
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        } else {
            console.log('⚠️ Volume slider not found, skipping event listener');
        }

        // Speed buttons
        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setPlaybackSpeed(parseFloat(e.target.dataset.speed));
            });
        });

        // Autoplay toggle
        const autoplayToggle = document.getElementById('autoplay-toggle');
        if (autoplayToggle) {
            autoplayToggle.addEventListener('change', (e) => {
                this.autoplay = e.target.checked;
            });
        } else {
            console.log('⚠️ Autoplay toggle not found, skipping event listener');
        }

        // Navigation icons
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                this.handleNavigation(e.target.dataset.section);
            });
        });

        // Lesson content buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'continue-btn') {
                this.continueLesson();
            } else if (e.target.id === 'pause-btn') {
                this.pauseLesson();
            }
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
    updateLessonInfo(lessonData) {
        const lessonInfo = document.getElementById('lesson-info');
        if (lessonInfo) {
            lessonInfo.innerHTML = `
                <h2>${lessonData.title}</h2>
                <p>${lessonData.learning_objective}</p>
                <button class="start-lesson-btn" id="start-lesson-btn">Start Lesson</button>
            `;
        }
    }

    /**
     * Display lesson content with real variant integration
     */
    displayLessonContent(lessonData) {
        const lessonContent = document.getElementById('lesson-content');
        if (!lessonContent) {
            console.error('❌ Lesson content container not found');
            return;
        }

        console.log('🎬 Displaying lesson content:', lessonData);

        // Get current variant settings
        const currentVariant = this.getCurrentVariantSettings();
        
        // Generate or retrieve variant content
        const variantContent = this.getVariantContent(lessonData, currentVariant);
        
        // Update lesson info
        this.updateLessonInfo(lessonData);
        
        // Display the content
            lessonContent.innerHTML = `
            <div class="lesson-header">
                <h2 class="lesson-title" id="lesson-title">${lessonData.title}</h2>
                <p class="lesson-description" id="lesson-description">${lessonData.learning_objective}</p>
            </div>
            
            <div class="lesson-main-content">
                <div class="content-section" id="voice-over-section">
                    <h3>Voice Over Script</h3>
                    <div class="content-text" id="voice-over-text">
                        ${variantContent.voiceOver || 'Voice over content will appear here...'}
                    </div>
                </div>
                
                <div class="content-section" id="on-screen-section">
                    <h3>On-Screen Text</h3>
                    <div class="content-text" id="on-screen-text">
                        ${variantContent.onScreen || 'On-screen content will appear here...'}
                    </div>
                </div>
                
                <div class="content-section" id="lesson-logic-section">
                    <h3>Lesson Logic</h3>
                    <div class="content-text" id="lesson-logic-text">
                        ${variantContent.lessonLogic || 'Lesson logic content will appear here...'}
                    </div>
                </div>
                
                <div class="content-section" id="questions-section">
                    <h3>Interactive Questions</h3>
                    <div class="questions-container" id="questions-container">
                        ${this.generateQuestionsHTML(variantContent.questions)}
                    </div>
                </div>
                
                <div class="content-section" id="fortune-section">
                    <h3>Daily Fortune</h3>
                    <div class="fortune-text" id="fortune-text">
                        ${variantContent.fortune || 'Your daily fortune will appear here...'}
                    </div>
                </div>
            </div>
            
            <div class="variant-controls" id="variant-controls">
                    <h3>Personalize Your Lesson</h3>
                    <div class="variant-slider-group">
                    <label for="age-slider">Age Group:</label>
                        <div class="slider-container">
                        <input type="range" id="age-slider" min="0" max="4" value="${this.getAgeIndex(currentVariant.age)}" class="variant-slider">
                        <span class="slider-value" id="age-value">${this.formatAgeLabel(currentVariant.age)}</span>
                        </div>
                    </div>
                    <div class="variant-slider-group">
                    <label for="tone-slider">Tone Style:</label>
                        <div class="slider-container">
                        <input type="range" id="tone-slider" min="0" max="2" value="${this.getToneIndex(currentVariant.tone)}" class="variant-slider">
                        <span class="slider-value" id="tone-value">${this.formatToneLabel(currentVariant.tone)}</span>
                        </div>
                    </div>
                    <div class="variant-slider-group">
                    <label for="language-slider">Language:</label>
                        <div class="slider-container">
                        <input type="range" id="language-slider" min="0" max="11" value="${this.getLanguageIndex(currentVariant.language)}" class="variant-slider">
                        <span class="slider-value" id="language-value">${this.formatLanguageLabel(currentVariant.language)}</span>
                    </div>
                </div>
                <div class="variant-slider-group">
                    <label for="avatar-slider">Avatar:</label>
                    <div class="slider-container">
                        <input type="range" id="avatar-slider" min="0" max="1" value="${this.getAvatarIndex(currentVariant.avatar)}" class="variant-slider">
                        <span class="slider-value" id="avatar-value">${this.formatAvatarLabel(currentVariant.avatar)}</span>
                        </div>
                    </div>
                    <button class="apply-variants-btn" id="apply-variants-btn">Apply Settings</button>
                </div>
                
                <div class="lesson-actions">
                <button class="action-btn primary" id="start-lesson-btn">Start Lesson</button>
                <button class="action-btn secondary" id="pause-btn">Pause</button>
                <button class="action-btn secondary" id="show-variants-btn">Customize</button>
                <button class="action-btn secondary" id="export-content-btn">Export Content</button>
                </div>
            `;
        
            lessonContent.classList.add('active');
            
        // Setup event listeners for the new content
        this.setupContentEventListeners();
        
        // Update avatar based on current variant
        this.updateAvatar(currentVariant.avatar, this.getAvatarExpression(currentVariant.tone));
        
        console.log('✅ Lesson content displayed successfully');
    }

    /**
     * Get current variant settings from UI or defaults
     */
    getCurrentVariantSettings() {
        return {
            age: this.currentVariant?.age || 'young_adult',
            tone: this.currentVariant?.tone || 'neutral',
            language: this.currentVariant?.language || 'english',
            avatar: this.currentVariant?.avatar || 'kelly'
        };
    }

    /**
     * Get variant content from generator or cache
     */
    getVariantContent(lessonData, variantSettings) {
        // Check if we have a variant generator available
        if (window.CorrectedVariantGeneratorV2) {
            try {
                const generator = new window.CorrectedVariantGeneratorV2();
                return generator.generateVariantContent(lessonData, variantSettings);
            } catch (error) {
                console.warn('⚠️ Variant generator not available, using fallback content');
            }
        }
        
        // Fallback content based on variant settings
        return this.generateFallbackContent(lessonData, variantSettings);
    }

    /**
     * Generate fallback content when variant generator is not available
     */
    generateFallbackContent(lessonData, variantSettings) {
        const ageLabels = {
            'early_childhood': 'Early Childhood',
            'youth': 'Youth',
            'young_adult': 'Young Adult',
            'midlife': 'Midlife',
            'wisdom_years': 'Wisdom Years'
        };
        
        const toneLabels = {
            'grandmother': 'Grandmother',
            'fun': 'Fun',
            'neutral': 'Neutral'
        };
        
        const avatarLabels = {
            'kelly': 'Kelly',
            'ken': 'Ken'
        };
        
        return {
            voiceOver: `Welcome to today's lesson about ${lessonData.title}! This is your personalized learning experience for ${ageLabels[variantSettings.age]} learners with a ${toneLabels[variantSettings.tone]} tone, presented by ${avatarLabels[variantSettings.avatar]}.`,
            onScreen: `Today's Topic: ${lessonData.title}\n\nLearning Objective: ${lessonData.learning_objective}\n\nKey Points:\n• Understanding the core concepts\n• Exploring real-world applications\n• Connecting to your daily life`,
            lessonLogic: `🧠 ${ageLabels[variantSettings.age]} Learning Approach with ${toneLabels[variantSettings.tone]} Delivery\n\nThis lesson is designed specifically for ${ageLabels[variantSettings.age].toLowerCase()} learners, using a ${toneLabels[variantSettings.tone].toLowerCase()} approach to make complex concepts accessible and engaging.`,
            questions: [
                {
                    question: "What is the main topic of today's lesson?",
                    optionA: lessonData.title,
                    optionB: "A different topic",
                    feedback: "Great job! You correctly identified the main topic."
                },
                {
                    question: "How does this lesson connect to your daily life?",
                    optionA: "It helps me understand the world better",
                    optionB: "It doesn't connect to my life",
                    feedback: "Excellent! Understanding how lessons connect to daily life makes learning more meaningful."
                },
                {
                    question: "What would you like to explore further about this topic?",
                    optionA: "I want to learn more about the practical applications",
                    optionB: "I'm not interested in exploring further",
                    feedback: "Wonderful! Your curiosity will lead to deeper understanding."
                }
            ],
            fortune: `Your curiosity about ${lessonData.title} shows your natural desire to learn and grow. Keep asking questions and exploring the world around you!`
        };
    }

    /**
     * Generate HTML for questions
     */
    generateQuestionsHTML(questions) {
        if (!questions || questions.length === 0) {
            return '<p>No questions available for this lesson.</p>';
        }
        
        return questions.map((question, index) => `
            <div class="question-container" data-question="${index}">
                <h4>Question ${index + 1}</h4>
                <p class="question-text">${question.question}</p>
                <div class="answer-options">
                    <button class="answer-btn" data-option="A" data-question="${index}">
                        A) ${question.optionA}
                    </button>
                    <button class="answer-btn" data-option="B" data-question="${index}">
                        B) ${question.optionB}
                    </button>
                </div>
                <div class="feedback-text" id="feedback-${index}" style="display: none;">
                    ${question.feedback}
                </div>
            </div>
        `).join('');
    }

    /**
     * Setup event listeners for lesson content
     */
    setupContentEventListeners() {
        // Variant slider event listeners
        const ageSlider = document.getElementById('age-slider');
        const toneSlider = document.getElementById('tone-slider');
        const languageSlider = document.getElementById('language-slider');
        const avatarSlider = document.getElementById('avatar-slider');
        
        if (ageSlider) {
            ageSlider.addEventListener('input', (e) => {
                const ageValue = this.getAgeFromIndex(parseInt(e.target.value));
                document.getElementById('age-value').textContent = this.formatAgeLabel(ageValue);
            });
        }
        
        if (toneSlider) {
            toneSlider.addEventListener('input', (e) => {
                const toneValue = this.getToneFromIndex(parseInt(e.target.value));
                document.getElementById('tone-value').textContent = this.formatToneLabel(toneValue);
            });
        }
        
        if (languageSlider) {
            languageSlider.addEventListener('input', (e) => {
                const languageValue = this.getLanguageFromIndex(parseInt(e.target.value));
                document.getElementById('language-value').textContent = this.formatLanguageLabel(languageValue);
            });
        }
        
        if (avatarSlider) {
            avatarSlider.addEventListener('input', (e) => {
                const avatarValue = this.getAvatarFromIndex(parseInt(e.target.value));
                document.getElementById('avatar-value').textContent = this.formatAvatarLabel(avatarValue);
            });
        }
        
        // Apply variants button
        const applyBtn = document.getElementById('apply-variants-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.applyVariantChanges();
            });
        }
        
        // Question answer buttons
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const questionIndex = e.target.dataset.question;
                const selectedOption = e.target.dataset.option;
                this.handleQuestionAnswer(questionIndex, selectedOption);
            });
        });
        
        // Action buttons
        const startBtn = document.getElementById('start-lesson-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const variantsBtn = document.getElementById('show-variants-btn');
        const exportBtn = document.getElementById('export-content-btn');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startLesson());
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.pauseLesson());
        }
        
        if (variantsBtn) {
            variantsBtn.addEventListener('click', () => this.toggleVariantControls());
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportLessonContent());
        }
    }

    /**
     * Apply variant changes and update content
     */
    applyVariantChanges() {
        const ageSlider = document.getElementById('age-slider');
        const toneSlider = document.getElementById('tone-slider');
        const languageSlider = document.getElementById('language-slider');
        const avatarSlider = document.getElementById('avatar-slider');
        
        if (!ageSlider || !toneSlider || !languageSlider || !avatarSlider) {
            console.error('❌ Variant sliders not found');
            return;
        }
        
        const newVariant = {
            age: this.getAgeFromIndex(parseInt(ageSlider.value)),
            tone: this.getToneFromIndex(parseInt(toneSlider.value)),
            language: this.getLanguageFromIndex(parseInt(languageSlider.value)),
            avatar: this.getAvatarFromIndex(parseInt(avatarSlider.value))
        };
        
        console.log('🔄 Applying variant changes:', newVariant);
        
        // Update current variant
        this.currentVariant = newVariant;
        
        // Reload lesson content with new variant
        if (this.currentLesson) {
            this.displayLessonContent(this.currentLesson);
        }
        
        // Update avatar
        this.updateAvatar(newVariant.avatar, this.getAvatarExpression(newVariant.tone));
        
        this.showMessage('Variant settings applied successfully!', 'success');
    }

    /**
     * Handle question answer selection
     */
    handleQuestionAnswer(questionIndex, selectedOption) {
        console.log(`🎯 Question ${questionIndex} answered: ${selectedOption}`);
        
        // Show feedback
        const feedbackElement = document.getElementById(`feedback-${questionIndex}`);
        if (feedbackElement) {
            feedbackElement.style.display = 'block';
        }
        
        // Update button states
        document.querySelectorAll(`[data-question="${questionIndex}"]`).forEach(btn => {
            btn.classList.remove('selected');
        });
        
        const selectedBtn = document.querySelector(`[data-question="${questionIndex}"][data-option="${selectedOption}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }
        
        this.showMessage('Answer recorded! Check the feedback below.', 'info');
    }

    /**
     * Export lesson content
     */
    exportLessonContent() {
        const lessonData = {
            title: this.currentLesson?.title || 'Lesson',
            variant: this.currentVariant,
            content: {
                voiceOver: document.getElementById('voice-over-text')?.textContent,
                onScreen: document.getElementById('on-screen-text')?.textContent,
                lessonLogic: document.getElementById('lesson-logic-text')?.textContent,
                questions: Array.from(document.querySelectorAll('.question-container')).map(q => ({
                    question: q.querySelector('.question-text')?.textContent,
                    options: Array.from(q.querySelectorAll('.answer-btn')).map(btn => btn.textContent.trim()),
                    feedback: q.querySelector('.feedback-text')?.textContent
                })),
                fortune: document.getElementById('fortune-text')?.textContent
            },
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(lessonData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lesson-${this.currentLesson?.day || 'unknown'}-${this.currentVariant?.age}-${this.currentVariant?.tone}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showMessage('Lesson content exported successfully!', 'success');
    }

    /**
     * Toggle variant controls visibility
     */
    toggleVariantControls() {
        const variantControls = document.getElementById('variant-controls');
        if (variantControls) {
            const isVisible = variantControls.style.display !== 'none';
            variantControls.style.display = isVisible ? 'none' : 'block';
            this.showMessage(`Variant controls ${isVisible ? 'hidden' : 'shown'}`, 'info');
        }
    }

    // Helper methods for variant management
    getAgeIndex(age) {
        const ages = ['early_childhood', 'youth', 'young_adult', 'midlife', 'wisdom_years'];
        return ages.indexOf(age);
    }
    
    getAgeFromIndex(index) {
        const ages = ['early_childhood', 'youth', 'young_adult', 'midlife', 'wisdom_years'];
        return ages[index] || 'young_adult';
    }
    
    formatAgeLabel(age) {
        const labels = {
            'early_childhood': 'Early Childhood',
            'youth': 'Youth',
            'young_adult': 'Young Adult',
            'midlife': 'Midlife',
            'wisdom_years': 'Wisdom Years'
        };
        return labels[age] || age;
    }
    
    getToneIndex(tone) {
        const tones = ['grandmother', 'fun', 'neutral'];
        return tones.indexOf(tone);
    }
    
    getToneFromIndex(index) {
        const tones = ['grandmother', 'fun', 'neutral'];
        return tones[index] || 'neutral';
    }
    
    formatToneLabel(tone) {
        const labels = {
            'grandmother': 'Grandmother',
            'fun': 'Fun',
            'neutral': 'Neutral'
        };
        return labels[tone] || tone;
    }
    
    getLanguageIndex(language) {
        const languages = ['english', 'spanish', 'french', 'german', 'italian', 'portuguese', 'russian', 'chinese', 'japanese', 'korean', 'arabic', 'hindi'];
        return languages.indexOf(language);
    }
    
    getLanguageFromIndex(index) {
        const languages = ['english', 'spanish', 'french', 'german', 'italian', 'portuguese', 'russian', 'chinese', 'japanese', 'korean', 'arabic', 'hindi'];
        return languages[index] || 'english';
    }
    
    formatLanguageLabel(language) {
        const labels = {
            'english': 'English',
            'spanish': 'Spanish',
            'french': 'French',
            'german': 'German',
            'italian': 'Italian',
            'portuguese': 'Portuguese',
            'russian': 'Russian',
            'chinese': 'Chinese',
            'japanese': 'Japanese',
            'korean': 'Korean',
            'arabic': 'Arabic',
            'hindi': 'Hindi'
        };
        return labels[language] || language;
    }
    
    getAvatarIndex(avatar) {
        const avatars = ['kelly', 'ken'];
        return avatars.indexOf(avatar);
    }
    
    getAvatarFromIndex(index) {
        const avatars = ['kelly', 'ken'];
        return avatars[index] || 'kelly';
    }
    
    formatAvatarLabel(avatar) {
        const labels = {
            'kelly': 'Kelly',
            'ken': 'Ken'
        };
        return labels[avatar] || avatar;
    }
    
    getAvatarExpression(tone) {
        const expressions = {
            'grandmother': 'welcoming_engaging',
            'fun': 'enthusiastic_energetic',
            'neutral': 'professional_clear'
        };
        return expressions[tone] || 'welcoming_engaging';
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