/**
 * Complete Variant Display System for iLearn
 * Generates and displays all text variants for today's lesson
 * Integrates DNA variant generator with lesson player interface
 */

class CompleteVariantDisplaySystem {
    constructor() {
        this.dnaGenerator = new CompleteDNAVariantGenerator();
        this.lessonPlayer = null;
        this.currentVariants = {};
        this.currentLessonDay = null;
        this.currentLessonTopic = null;
        
        // Variant display state
        this.currentAgeGroup = 'young_adult';
        this.currentTone = 'neutral';
        this.currentLanguage = 'en';
        this.currentAvatar = 'kelly';
        
        // UI state
        this.isGenerating = false;
        this.generationProgress = 0;
        this.variantDisplayMode = 'text'; // text, audio, avatar
        
        // Initialize system
        this.initializeSystem();
    }

    /**
     * Initialize the complete system
     */
    async initializeSystem() {
        console.log('🚀 Initializing Complete Variant Display System...');
        
        // Get today's lesson
        const today = new Date();
        this.currentLessonDay = today.getDate();
        const currentMonth = today.getMonth() + 1;
        
        // Initialize DNA generator
        await this.dnaGenerator.initialize();
        
        // Load today's lesson topic
        this.currentLessonTopic = this.dnaGenerator.dnaParser.getLessonTopic(this.currentLessonDay);
        
        console.log(`📅 Today's lesson: Day ${this.currentLessonDay} - ${this.currentLessonTopic.title}`);
        
        // Generate all variants for today
        await this.generateTodayVariants();
        
        // Setup UI controls
        this.setupVariantControls();
        
        console.log('✅ Complete Variant Display System initialized');
    }

    /**
     * Generate all variants for today's lesson
     */
    async generateTodayVariants() {
        console.log(`🎯 Generating all variants for today's lesson (Day ${this.currentLessonDay})...`);
        
        this.isGenerating = true;
        this.updateGenerationProgress(0);
        
        try {
            // Generate all variants using DNA generator
            const result = await this.dnaGenerator.generateAllVariants(this.currentLessonDay);
            
            this.currentVariants = this.organizeVariants(result.variants);
            this.isGenerating = false;
            
            console.log(`✅ Generated ${result.variants.length} variants for today's lesson`);
            console.log(`📊 Generation stats:`, result.stats);
            
            // Update UI with variants
            this.updateVariantDisplay();
            
        } catch (error) {
            console.error('❌ Failed to generate today\'s variants:', error);
            this.isGenerating = false;
            this.showError('Failed to generate lesson variants');
        }
    }

    /**
     * Organize variants by category for easy access
     */
    organizeVariants(variants) {
        const organized = {
            ageGroups: {},
            tones: {},
            contentTypes: {},
            questions: {},
            fortunes: []
        };
        
        variants.forEach(variant => {
            const { ageGroup, tone, contentType, questionType, choice } = variant.metadata;
            
            // Organize by age group
            if (!organized.ageGroups[ageGroup]) {
                organized.ageGroups[ageGroup] = [];
            }
            organized.ageGroups[ageGroup].push(variant);
            
            // Organize by tone
            if (!organized.tones[tone]) {
                organized.tones[tone] = [];
            }
            organized.tones[tone].push(variant);
            
            // Organize by content type
            if (!organized.contentTypes[contentType]) {
                organized.contentTypes[contentType] = [];
            }
            organized.contentTypes[contentType].push(variant);
            
            // Organize by question type
            if (questionType) {
                if (!organized.questions[questionType]) {
                    organized.questions[questionType] = [];
                }
                organized.questions[questionType].push(variant);
            }
            
            // Collect fortunes
            if (variant.metadata.type === 'daily_fortune') {
                organized.fortunes.push(variant);
            }
        });
        
        return organized;
    }

    /**
     * Setup variant control UI
     */
    setupVariantControls() {
        // Create enhanced variant controls
        this.createVariantSliders();
        this.createVariantDisplay();
        this.createVariantNavigation();
        
        // Setup event listeners
        this.setupVariantEventListeners();
    }

    /**
     * Create comprehensive variant sliders
     */
    createVariantSliders() {
        const playerControls = document.querySelector('.player-controls');
        if (!playerControls) return;
        
        // Create variant controls section
        const variantSection = document.createElement('div');
        variantSection.className = 'variant-section';
        variantSection.innerHTML = `
            <div class="variant-controls">
                <h3>🎛️ Personalize Your Lesson</h3>
                
                <div class="variant-slider-group">
                    <label>👶 Age Group:</label>
                    <div class="slider-container">
                        <input type="range" id="age-variant-slider" min="0" max="4" value="2" class="variant-slider">
                        <span class="slider-value" id="age-variant-value">Young Adult</span>
                    </div>
                </div>
                
                <div class="variant-slider-group">
                    <label>🎭 Tone Style:</label>
                    <div class="slider-container">
                        <input type="range" id="tone-variant-slider" min="0" max="2" value="1" class="variant-slider">
                        <span class="slider-value" id="tone-variant-value">Neutral</span>
                    </div>
                </div>
                
                <div class="variant-slider-group">
                    <label>🌍 Language:</label>
                    <div class="slider-container">
                        <input type="range" id="language-variant-slider" min="0" max="11" value="0" class="variant-slider">
                        <span class="slider-value" id="language-variant-value">English</span>
                    </div>
                </div>
                
                <div class="variant-slider-group">
                    <label>👤 Avatar:</label>
                    <div class="slider-container">
                        <input type="range" id="avatar-variant-slider" min="0" max="1" value="0" class="variant-slider">
                        <span class="slider-value" id="avatar-variant-value">Kelly</span>
                    </div>
                </div>
                
                <div class="variant-actions">
                    <button id="apply-variant-btn" class="apply-variant-btn">Apply Changes</button>
                    <button id="show-all-variants-btn" class="show-all-variants-btn">Show All Variants</button>
                </div>
            </div>
        `;
        
        // Insert before existing controls
        playerControls.insertBefore(variantSection, playerControls.firstChild);
        
        // Add styles
        this.addVariantStyles();
    }

    /**
     * Create variant display area
     */
    createVariantDisplay() {
        const lessonContent = document.getElementById('lesson-content');
        if (!lessonContent) return;
        
        // Create variant display section
        const variantDisplay = document.createElement('div');
        variantDisplay.id = 'variant-display';
        variantDisplay.className = 'variant-display';
        variantDisplay.innerHTML = `
            <div class="variant-info">
                <h3 id="variant-title">Today's Lesson</h3>
                <p id="variant-subtitle">Personalized for your preferences</p>
            </div>
            
            <div class="variant-content" id="variant-content">
                <div class="content-section">
                    <h4>📝 Voice Over Script</h4>
                    <p id="voice-over-text">Loading...</p>
                </div>
                
                <div class="content-section">
                    <h4>📺 On-Screen Text</h4>
                    <p id="on-screen-text">Loading...</p>
                </div>
                
                <div class="content-section">
                    <h4>🧠 Lesson Logic</h4>
                    <p id="lesson-logic-text">Loading...</p>
                </div>
                
                <div class="content-section">
                    <h4>❓ Questions</h4>
                    <div id="questions-text">Loading...</div>
                </div>
                
                <div class="content-section">
                    <h4>🔮 Daily Fortune</h4>
                    <p id="fortune-text">Loading...</p>
                </div>
            </div>
            
            <div class="variant-stats">
                <span id="variant-count">0 variants available</span>
                <span id="generation-time">Generated in 0ms</span>
            </div>
        `;
        
        lessonContent.appendChild(variantDisplay);
    }

    /**
     * Create variant navigation
     */
    createVariantNavigation() {
        const sideNavigation = document.querySelector('.side-navigation');
        if (!sideNavigation) return;
        
        // Add variant navigation button
        const variantNavBtn = document.createElement('button');
        variantNavBtn.className = 'nav-icon';
        variantNavBtn.innerHTML = '🎛️';
        variantNavBtn.title = 'Variant Controls';
        variantNavBtn.onclick = () => this.toggleVariantControls();
        
        sideNavigation.appendChild(variantNavBtn);
    }

    /**
     * Setup event listeners for variant controls
     */
    setupVariantEventListeners() {
        // Age slider
        const ageSlider = document.getElementById('age-variant-slider');
        const ageValue = document.getElementById('age-variant-value');
        const ageOptions = ['Early Childhood', 'Youth', 'Young Adult', 'Midlife', 'Wisdom Years'];
        
        if (ageSlider && ageValue) {
            ageSlider.addEventListener('input', (e) => {
                ageValue.textContent = ageOptions[e.target.value];
                this.currentAgeGroup = ageOptions[e.target.value].toLowerCase().replace(' ', '_');
                this.updateVariantDisplay();
            });
        }

        // Tone slider
        const toneSlider = document.getElementById('tone-variant-slider');
        const toneValue = document.getElementById('tone-variant-value');
        const toneOptions = ['Grandmother', 'Fun', 'Neutral'];
        
        if (toneSlider && toneValue) {
            toneSlider.addEventListener('input', (e) => {
                toneValue.textContent = toneOptions[e.target.value];
                this.currentTone = toneOptions[e.target.value].toLowerCase();
                this.updateVariantDisplay();
            });
        }

        // Language slider
        const languageSlider = document.getElementById('language-variant-slider');
        const languageValue = document.getElementById('language-variant-value');
        const languageOptions = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'];
        
        if (languageSlider && languageValue) {
            languageSlider.addEventListener('input', (e) => {
                languageValue.textContent = languageOptions[e.target.value];
                this.currentLanguage = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi'][e.target.value];
                this.updateVariantDisplay();
            });
        }

        // Avatar slider
        const avatarSlider = document.getElementById('avatar-variant-slider');
        const avatarValue = document.getElementById('avatar-variant-value');
        const avatarOptions = ['Kelly', 'Ken'];
        
        if (avatarSlider && avatarValue) {
            avatarSlider.addEventListener('input', (e) => {
                avatarValue.textContent = avatarOptions[e.target.value];
                this.currentAvatar = avatarOptions[e.target.value].toLowerCase();
                this.updateVariantDisplay();
            });
        }

        // Apply variant button
        const applyBtn = document.getElementById('apply-variant-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.applyCurrentVariant();
            });
        }

        // Show all variants button
        const showAllBtn = document.getElementById('show-all-variants-btn');
        if (showAllBtn) {
            showAllBtn.addEventListener('click', () => {
                this.showAllVariants();
            });
        }
    }

    /**
     * Update variant display with current settings
     */
    updateVariantDisplay() {
        if (!this.currentVariants || Object.keys(this.currentVariants).length === 0) {
            console.log('⏳ Waiting for variants to be generated...');
            return;
        }

        // Get current variant content
        const currentVariant = this.getCurrentVariantContent();
        
        // Update display
        this.updateVariantContent(currentVariant);
        this.updateVariantStats();
    }

    /**
     * Get current variant content based on settings
     */
    getCurrentVariantContent() {
        const variantId = `${this.currentAgeGroup}_${this.currentTone}`;
        
        // Get voice over script
        const voiceOverVariant = this.currentVariants.contentTypes.voice_over_script?.find(
            v => v.metadata.ageGroup === this.currentAgeGroup && 
                 v.metadata.tone === this.currentTone
        );
        
        // Get on-screen text
        const onScreenVariant = this.currentVariants.contentTypes.on_screen_text?.find(
            v => v.metadata.ageGroup === this.currentAgeGroup && 
                 v.metadata.tone === this.currentTone
        );
        
        // Get lesson logic
        const lessonLogicVariant = this.currentVariants.contentTypes.lesson_logic?.find(
            v => v.metadata.ageGroup === this.currentAgeGroup && 
                 v.metadata.tone === this.currentTone
        );
        
        // Get questions
        const questionVariants = this.currentVariants.questions.question_1?.filter(
            v => v.metadata.ageGroup === this.currentAgeGroup && 
                 v.metadata.tone === this.currentTone
        ) || [];
        
        // Get fortune
        const fortuneVariant = this.currentVariants.fortunes[0];
        
        return {
            voiceOver: voiceOverVariant?.content || 'Content not available',
            onScreen: onScreenVariant?.content || 'Content not available',
            lessonLogic: lessonLogicVariant?.content || 'Content not available',
            questions: questionVariants,
            fortune: fortuneVariant?.content?.fortune || 'Fortune not available'
        };
    }

    /**
     * Update variant content in the display
     */
    updateVariantContent(content) {
        // Update voice over text
        const voiceOverText = document.getElementById('voice-over-text');
        if (voiceOverText) {
            voiceOverText.textContent = typeof content.voiceOver === 'string' ? 
                content.voiceOver : JSON.stringify(content.voiceOver, null, 2);
        }
        
        // Update on-screen text
        const onScreenText = document.getElementById('on-screen-text');
        if (onScreenText) {
            onScreenText.textContent = typeof content.onScreen === 'string' ? 
                content.onScreen : JSON.stringify(content.onScreen, null, 2);
        }
        
        // Update lesson logic
        const lessonLogicText = document.getElementById('lesson-logic-text');
        if (lessonLogicText) {
            lessonLogicText.textContent = typeof content.lessonLogic === 'string' ? 
                content.lessonLogic : JSON.stringify(content.lessonLogic, null, 2);
        }
        
        // Update questions
        const questionsText = document.getElementById('questions-text');
        if (questionsText) {
            questionsText.innerHTML = this.formatQuestions(content.questions);
        }
        
        // Update fortune
        const fortuneText = document.getElementById('fortune-text');
        if (fortuneText) {
            fortuneText.textContent = content.fortune;
        }
        
        // Update title and subtitle
        const variantTitle = document.getElementById('variant-title');
        const variantSubtitle = document.getElementById('variant-subtitle');
        
        if (variantTitle) {
            variantTitle.textContent = `${this.currentLessonTopic.title} - ${this.getAgeGroupDisplay(this.currentAgeGroup)}`;
        }
        
        if (variantSubtitle) {
            variantSubtitle.textContent = `${this.getToneDisplay(this.currentTone)} style for ${this.getAvatarDisplay(this.currentAvatar)}`;
        }
    }

    /**
     * Format questions for display
     */
    formatQuestions(questions) {
        if (!questions || questions.length === 0) {
            return '<p>No questions available</p>';
        }
        
        return questions.map((q, index) => `
            <div class="question-item">
                <h5>Question ${index + 1}</h5>
                <p>${q.content?.question || 'Question text not available'}</p>
                <div class="options">
                    <span class="option">A: ${q.content?.optionA || 'Option A'}</span>
                    <span class="option">B: ${q.content?.optionB || 'Option B'}</span>
                </div>
            </div>
        `).join('');
    }

    /**
     * Update variant statistics
     */
    updateVariantStats() {
        const variantCount = document.getElementById('variant-count');
        const generationTime = document.getElementById('generation-time');
        
        if (variantCount) {
            const totalVariants = Object.values(this.currentVariants).reduce((sum, variants) => {
                return sum + (Array.isArray(variants) ? variants.length : 0);
            }, 0);
            variantCount.textContent = `${totalVariants} variants available`;
        }
        
        if (generationTime) {
            generationTime.textContent = `Generated in ${this.dnaGenerator.getGenerationStats().duration}ms`;
        }
    }

    /**
     * Apply current variant to lesson player
     */
    applyCurrentVariant() {
        console.log(`🎯 Applying variant: ${this.currentAgeGroup}_${this.currentTone}_${this.currentLanguage}_${this.currentAvatar}`);
        
        // Update lesson player with current variant
        if (window.lessonPlayer) {
            window.lessonPlayer.currentVariant = `${this.currentAgeGroup}_${this.currentTone}`;
            window.lessonPlayer.currentAvatar = this.currentAvatar;
            
            // Update lesson content
            const currentContent = this.getCurrentVariantContent();
            window.lessonPlayer.displayLessonContent({
                title: this.currentLessonTopic.title,
                content: currentContent.voiceOver,
                onScreenText: currentContent.onScreen,
                lessonLogic: currentContent.lessonLogic
            });
            
            console.log('✅ Variant applied to lesson player');
        }
    }

    /**
     * Show all variants in a comprehensive view
     */
    showAllVariants() {
        console.log('📊 Showing all variants for today\'s lesson...');
        
        // Create comprehensive variant view
        const variantView = this.createComprehensiveVariantView();
        
        // Display in modal or overlay
        this.displayVariantModal(variantView);
    }

    /**
     * Create comprehensive variant view
     */
    createComprehensiveVariantView() {
        const view = {
            lessonDay: this.currentLessonDay,
            lessonTopic: this.currentLessonTopic.title,
            totalVariants: 0,
            ageGroups: {},
            tones: {},
            contentTypes: {},
            questions: {},
            fortunes: []
        };
        
        // Count and organize all variants
        Object.entries(this.currentVariants).forEach(([category, variants]) => {
            if (Array.isArray(variants)) {
                view.totalVariants += variants.length;
                view[category] = variants;
            }
        });
        
        return view;
    }

    /**
     * Display variant modal
     */
    displayVariantModal(variantView) {
        // Create modal content
        const modalContent = `
            <div class="variant-modal">
                <div class="modal-header">
                    <h2>📊 All Variants for Day ${variantView.lessonDay}</h2>
                    <p>${variantView.lessonTopic} - ${variantView.totalVariants} total variants</p>
                </div>
                
                <div class="modal-content">
                    <div class="variant-summary">
                        <h3>Summary</h3>
                        <ul>
                            <li>Age Groups: ${Object.keys(this.currentVariants.ageGroups).length}</li>
                            <li>Tones: ${Object.keys(this.currentVariants.tones).length}</li>
                            <li>Content Types: ${Object.keys(this.currentVariants.contentTypes).length}</li>
                            <li>Questions: ${Object.keys(this.currentVariants.questions).length}</li>
                            <li>Fortunes: ${this.currentVariants.fortunes.length}</li>
                        </ul>
                    </div>
                    
                    <div class="variant-details">
                        <h3>Detailed Breakdown</h3>
                        <div class="variant-grid">
                            ${this.createVariantGrid()}
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button onclick="this.closeVariantModal()">Close</button>
                    <button onclick="this.exportVariants()">Export Data</button>
                </div>
            </div>
        `;
        
        // Create and show modal
        this.showModal(modalContent);
    }

    /**
     * Create variant grid for display
     */
    createVariantGrid() {
        let grid = '';
        
        Object.entries(this.currentVariants).forEach(([category, variants]) => {
            if (Array.isArray(variants) && variants.length > 0) {
                grid += `
                    <div class="variant-category">
                        <h4>${category.replace(/_/g, ' ').toUpperCase()}</h4>
                        <div class="variant-list">
                            ${variants.map(v => `
                                <div class="variant-item">
                                    <span class="variant-id">${v.variantId}</span>
                                    <span class="variant-preview">${this.getVariantPreview(v)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        });
        
        return grid;
    }

    /**
     * Get variant preview text
     */
    getVariantPreview(variant) {
        if (variant.content) {
            const content = typeof variant.content === 'string' ? 
                variant.content : JSON.stringify(variant.content);
            return content.substring(0, 100) + (content.length > 100 ? '...' : '');
        }
        return 'No content available';
    }

    /**
     * Show modal
     */
    showModal(content) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'variant-modal-overlay';
        modal.innerHTML = content;
        
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    /**
     * Toggle variant controls visibility
     */
    toggleVariantControls() {
        const variantControls = document.querySelector('.variant-controls');
        if (variantControls) {
            variantControls.style.display = 
                variantControls.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Update generation progress
     */
    updateGenerationProgress(progress) {
        this.generationProgress = progress;
        
        // Update UI if needed
        const progressElement = document.getElementById('generation-progress');
        if (progressElement) {
            progressElement.style.width = `${progress}%`;
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        }
    }

    /**
     * Add variant-specific styles
     */
    addVariantStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .variant-section {
                margin-bottom: 20px;
                padding: 15px;
                background: rgba(0, 0, 0, 0.8);
                border-radius: 8px;
                backdrop-filter: blur(10px);
            }
            
            .variant-controls h3 {
                color: #fff;
                margin-bottom: 15px;
                font-size: 16px;
            }
            
            .variant-slider-group {
                margin-bottom: 15px;
            }
            
            .variant-slider-group label {
                display: block;
                margin-bottom: 5px;
                color: #ccc;
                font-size: 14px;
            }
            
            .slider-container {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .variant-slider {
                flex: 1;
                height: 6px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
                outline: none;
                cursor: pointer;
            }
            
            .variant-slider::-webkit-slider-thumb {
                appearance: none;
                width: 18px;
                height: 18px;
                background: #007AFF;
                border-radius: 50%;
                cursor: pointer;
            }
            
            .slider-value {
                min-width: 80px;
                color: #fff;
                font-size: 12px;
                font-weight: 500;
            }
            
            .variant-actions {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            .apply-variant-btn, .show-all-variants-btn {
                background: #007AFF;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
            }
            
            .apply-variant-btn:hover, .show-all-variants-btn:hover {
                background: #0056CC;
            }
            
            .variant-display {
                margin-top: 20px;
                padding: 20px;
                background: rgba(0, 0, 0, 0.8);
                border-radius: 8px;
                backdrop-filter: blur(10px);
            }
            
            .variant-info h3 {
                color: #fff;
                margin-bottom: 5px;
            }
            
            .variant-info p {
                color: #ccc;
                font-size: 14px;
            }
            
            .content-section {
                margin-bottom: 20px;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 6px;
            }
            
            .content-section h4 {
                color: #fff;
                margin-bottom: 10px;
                font-size: 14px;
            }
            
            .content-section p {
                color: #ccc;
                font-size: 13px;
                line-height: 1.4;
            }
            
            .question-item {
                margin-bottom: 15px;
                padding: 10px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 4px;
            }
            
            .question-item h5 {
                color: #fff;
                margin-bottom: 5px;
                font-size: 13px;
            }
            
            .options {
                display: flex;
                gap: 15px;
                margin-top: 8px;
            }
            
            .option {
                color: #ccc;
                font-size: 12px;
            }
            
            .variant-stats {
                display: flex;
                justify-content: space-between;
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 12px;
                color: #ccc;
            }
            
            .variant-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(10px);
            }
            
            .variant-modal {
                background: rgba(0, 0, 0, 0.95);
                border-radius: 12px;
                padding: 30px;
                max-width: 800px;
                max-height: 80vh;
                overflow-y: auto;
                color: white;
            }
            
            .modal-header h2 {
                margin-bottom: 10px;
                color: #fff;
            }
            
            .modal-header p {
                color: #ccc;
                margin-bottom: 20px;
            }
            
            .variant-summary ul {
                list-style: none;
                padding: 0;
            }
            
            .variant-summary li {
                padding: 5px 0;
                color: #ccc;
            }
            
            .variant-grid {
                display: grid;
                gap: 20px;
                margin-top: 20px;
            }
            
            .variant-category h4 {
                color: #fff;
                margin-bottom: 10px;
                font-size: 14px;
            }
            
            .variant-list {
                display: grid;
                gap: 8px;
            }
            
            .variant-item {
                display: flex;
                justify-content: space-between;
                padding: 8px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 4px;
                font-size: 12px;
            }
            
            .variant-id {
                color: #007AFF;
                font-weight: 500;
            }
            
            .variant-preview {
                color: #ccc;
                max-width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            .modal-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
                justify-content: flex-end;
            }
            
            .modal-actions button {
                background: #007AFF;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
            }
        `;
        
        document.head.appendChild(style);
    }

    /**
     * Helper methods for display text
     */
    getAgeGroupDisplay(ageGroup) {
        const displays = {
            'early_childhood': 'Early Childhood',
            'youth': 'Youth',
            'young_adult': 'Young Adult',
            'midlife': 'Midlife',
            'wisdom_years': 'Wisdom Years'
        };
        return displays[ageGroup] || ageGroup;
    }

    getToneDisplay(tone) {
        const displays = {
            'grandmother': 'Grandmother',
            'fun': 'Fun',
            'neutral': 'Neutral'
        };
        return displays[tone] || tone;
    }

    getAvatarDisplay(avatar) {
        const displays = {
            'kelly': 'Kelly',
            'ken': 'Ken'
        };
        return displays[avatar] || avatar;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.CompleteVariantDisplaySystem = CompleteVariantDisplaySystem;
}
if (typeof module !== 'undefined') {
    module.exports = { CompleteVariantDisplaySystem };
} 