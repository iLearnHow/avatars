/**
 * DNA-Ken Integration System
 * Connects DNA-driven content with Ken wallpaper system for complete personalization
 */

class DNAKenIntegration {
    constructor() {
        this.currentLesson = null;
        this.currentPreferences = {
            age: 'age_25',
            tone: 'neutral',
            language: 'english',
            avatar: 'ken'
        };
        this.lessonPhase = 'opening';
        this.kenWallpaperSystem = null;
        this.variantGenerator = null;
        this.dnaLoader = null;
        
        this.initializeIntegration();
    }

    /**
     * Initialize all systems
     */
    async initializeIntegration() {
        try {
            // Initialize DNA loader
            this.dnaLoader = new DNAFileLoader();
            await this.dnaLoader.initialize();
            
            // Initialize Ken wallpaper system
            this.kenWallpaperSystem = new KenWallpaperSystem();
            
            // Initialize variant generator
            this.variantGenerator = new VariantGenerator();
            await this.variantGenerator.initialize();
            
            console.log('✅ DNA-Ken integration initialized');
            
            // Load initial lesson
            await this.loadLessonForDay(1);
            
        } catch (error) {
            console.error('❌ Error initializing DNA-Ken integration:', error);
        }
    }

    /**
     * Load lesson for specific day with full integration
     */
    async loadLessonForDay(day) {
        try {
            console.log(`🔄 Loading lesson for day ${day}...`);
            
            // Load DNA data
            const dnaData = await this.dnaLoader.loadDNAForDay(day);
            this.currentLesson = dnaData;
            
            // Generate initial content
            const content = await this.variantGenerator.generateContentFromDNA(dnaData, this.currentPreferences);
            
            // Update Ken's expression based on lesson phase
            this.updateKenForLessonPhase('opening', content);
            
            // Update lesson display
            this.updateLessonDisplay(content);
            
            console.log(`✅ Lesson ${day} loaded with Ken integration`);
            
        } catch (error) {
            console.error('❌ Error loading lesson:', error);
        }
    }

    /**
     * Update Ken's expression based on lesson phase and content
     */
    updateKenForLessonPhase(phase, content) {
        if (!this.kenWallpaperSystem) return;
        
        const tone = this.currentPreferences.tone;
        const mood = this.getMoodFromContent(content);
        
        // Map lesson phases to Ken expressions
        const phaseMappings = {
            'opening': {
                grandmother: 'ken_grandmother_warm',
                fun: 'ken_fun_enthusiastic',
                neutral: 'ken_neutral_professional'
            },
            'question_1': {
                grandmother: 'ken_grandmother_curious',
                fun: 'ken_fun_playful',
                neutral: 'ken_neutral_focused'
            },
            'question_2': {
                grandmother: 'ken_grandmother_thoughtful',
                fun: 'ken_fun_engaged',
                neutral: 'ken_neutral_analytical'
            },
            'question_3': {
                grandmother: 'ken_grandmother_wise',
                fun: 'ken_fun_excited',
                neutral: 'ken_neutral_satisfied'
            },
            'feedback_correct': {
                grandmother: 'ken_happy_celebrating',
                fun: 'ken_happy_celebrating',
                neutral: 'ken_happy_celebrating'
            },
            'feedback_incorrect': {
                grandmother: 'ken_concerned_thinking',
                fun: 'ken_concerned_thinking',
                neutral: 'ken_concerned_thinking'
            },
            'closing': {
                grandmother: 'ken_grandmother_warm',
                fun: 'ken_fun_enthusiastic',
                neutral: 'ken_neutral_professional'
            }
        };
        
        const expression = phaseMappings[phase]?.[tone] || 'ken_neutral_default';
        this.kenWallpaperSystem.updateKenExpression(phase, tone, mood);
        
        console.log(`🎭 Ken expression updated: ${expression} (${phase}, ${tone}, ${mood})`);
    }

    /**
     * Get mood from content for Ken expression
     */
    getMoodFromContent(content) {
        if (!content) return 'neutral';
        
        const text = content.opening?.toLowerCase() || '';
        
        if (text.includes('celebrate') || text.includes('great') || text.includes('wonderful')) {
            return 'happy';
        } else if (text.includes('think') || text.includes('consider') || text.includes('reflect')) {
            return 'concerned';
        } else if (text.includes('excited') || text.includes('amazing') || text.includes('incredible')) {
            return 'excited';
        } else {
            return 'neutral';
        }
    }

    /**
     * Switch user preferences with Ken integration
     */
    async switchPreferences(newPreferences) {
        try {
            console.log('🔄 Switching preferences:', newPreferences);
            
            // Update preferences
            this.currentPreferences = { ...this.currentPreferences, ...newPreferences };
            
            // Regenerate content with new preferences
            if (this.currentLesson) {
                const content = await this.variantGenerator.generateContentFromDNA(this.currentLesson, this.currentPreferences);
                
                // Update Ken's expression for current phase
                this.updateKenForLessonPhase(this.lessonPhase, content);
                
                // Update lesson display
                this.updateLessonDisplay(content);
            }
            
            console.log('✅ Preferences switched with Ken integration');
            
        } catch (error) {
            console.error('❌ Error switching preferences:', error);
        }
    }

    /**
     * Advance lesson phase with Ken integration
     */
    async advanceLessonPhase() {
        const phases = ['opening', 'question_1', 'question_2', 'question_3', 'closing'];
        const currentIndex = phases.indexOf(this.lessonPhase);
        
        if (currentIndex < phases.length - 1) {
            this.lessonPhase = phases[currentIndex + 1];
            
            // Regenerate content for new phase
            if (this.currentLesson) {
                const content = await this.variantGenerator.generateContentFromDNA(this.currentLesson, this.currentPreferences);
                this.updateKenForLessonPhase(this.lessonPhase, content);
                this.updateLessonDisplay(content);
            }
            
            console.log(`➡️ Advanced to phase: ${this.lessonPhase}`);
        }
    }

    /**
     * Handle user feedback with Ken integration
     */
    async handleUserFeedback(isCorrect) {
        const feedbackPhase = isCorrect ? 'feedback_correct' : 'feedback_incorrect';
        
        // Update Ken's expression for feedback
        this.updateKenForLessonPhase(feedbackPhase, null);
        
        // Show feedback for 3 seconds
        setTimeout(() => {
            this.advanceLessonPhase();
        }, 3000);
        
        console.log(`🎯 User feedback: ${isCorrect ? 'correct' : 'incorrect'}`);
    }

    /**
     * Update lesson display with content
     */
    updateLessonDisplay(content) {
        // Update lesson info panel
        const lessonTitle = document.getElementById('lesson-title');
        const lessonSubtitle = document.getElementById('lesson-subtitle');
        
        if (lessonTitle && content.opening) {
            lessonTitle.textContent = content.opening.substring(0, 50) + '...';
        }
        
        if (lessonSubtitle && content.questions && content.questions.length > 0) {
            lessonSubtitle.textContent = `Question ${this.lessonPhase.includes('question') ? this.lessonPhase.split('_')[1] : '1'}: ${content.questions[0].text.substring(0, 30)}...`;
        }
        
        // Update current variants display
        this.updateVariantsDisplay();
    }

    /**
     * Update variants display
     */
    updateVariantsDisplay() {
        const variantsDisplay = document.getElementById('current-variants');
        if (variantsDisplay) {
            variantsDisplay.innerHTML = `
                <div class="variant-info">
                    <p><strong>Age:</strong> ${this.currentPreferences.age}</p>
                    <p><strong>Tone:</strong> ${this.currentPreferences.tone}</p>
                    <p><strong>Language:</strong> ${this.currentPreferences.language}</p>
                    <p><strong>Avatar:</strong> ${this.currentPreferences.avatar}</p>
                    <p><strong>Phase:</strong> ${this.lessonPhase}</p>
                </div>
            `;
        }
    }

    /**
     * Get current integration state
     */
    getCurrentState() {
        return {
            lesson: this.currentLesson,
            preferences: this.currentPreferences,
            phase: this.lessonPhase,
            kenState: this.kenWallpaperSystem?.getCurrentKenState()
        };
    }

    /**
     * Handle bottom-right stack interactions
     */
    handleStackInteraction(iconType, action) {
        switch (iconType) {
            case 'language-picker':
                this.switchPreferences({ language: action });
                break;
            case 'tone-picker':
                this.switchPreferences({ tone: action });
                break;
            case 'age-slider':
                this.switchPreferences({ age: action });
                break;
            case 'avatar-picker':
                this.switchPreferences({ avatar: action });
                break;
            case 'calendar-picker':
                this.loadLessonForDay(action);
                break;
        }
    }
}

// Initialize DNA-Ken integration when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.dnaKenIntegration = new DNAKenIntegration();
    
    // Connect to bottom-right stack system
    if (window.handleStackIconClick) {
        const originalHandler = window.handleStackIconClick;
        window.handleStackIconClick = function(event) {
            const icon = event.currentTarget;
            const iconType = icon.id;
            
            // Call original handler
            originalHandler.call(this, event);
            
            // Add DNA-Ken integration
            if (window.dnaKenIntegration) {
                // Extract action from icon (simplified)
                const action = iconType.replace('-picker', '').replace('-slider', '');
                window.dnaKenIntegration.handleStackInteraction(iconType, action);
            }
        };
    }
    
    console.log('✅ DNA-Ken integration ready');
}); 