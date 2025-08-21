/**
 * Lesson Player Variant Integration for iLearn
 * Integrates generated variants with the existing lesson player
 */

class LessonPlayerVariantIntegration {
    constructor() {
        this.variantGenerator = new CompleteDNAVariantGenerator();
        this.currentLesson = null;
        this.currentVariant = null;
        this.userPreferences = {
            ageGroup: 'young_adult', // Default
            tone: 'neutral', // Default
            avatar: 'ken' // Default
        };
        this.variantCache = {};
    }

    /**
     * Initialize the integration
     */
    async initialize(apiKey) {
        console.log('🔗 Initializing Lesson Player Variant Integration...');
        
        try {
            await this.variantGenerator.initialize(apiKey);
            this.loadUserPreferences();
            console.log('✅ Lesson Player Variant Integration initialized');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize integration:', error);
            throw error;
        }
    }

    /**
     * Load lesson with variants
     */
    async loadLessonWithVariants(lessonDay, forceGenerate = false) {
        console.log(`📚 Loading lesson ${lessonDay} with variants...`);
        
        try {
            // Check if variants are cached
            let variants = this.variantGenerator.loadVariants(lessonDay);
            
            // Generate variants if not cached or forced
            if (variants.length === 0 || forceGenerate) {
                console.log('🔄 Generating new variants...');
                const result = await this.variantGenerator.generateAllVariants(lessonDay);
                variants = result.variants;
                this.variantGenerator.saveVariants(lessonDay, variants);
            }
            
            // Select appropriate variant based on user preferences
            const selectedVariant = this.selectVariant(variants, this.userPreferences);
            
            // Create lesson object for player
            this.currentLesson = this.createLessonObject(lessonDay, selectedVariant, variants);
            this.currentVariant = selectedVariant;
            
            console.log(`✅ Lesson ${lessonDay} loaded with ${variants.length} variants`);
            return this.currentLesson;
            
        } catch (error) {
            console.error('❌ Failed to load lesson with variants:', error);
            throw error;
        }
    }

    /**
     * Select appropriate variant based on user preferences
     */
    selectVariant(variants, preferences) {
        // Filter variants by user preferences
        const filteredVariants = variants.filter(variant => {
            if (variant.metadata.type === 'daily_fortune') return true;
            
            return variant.metadata.ageGroup === preferences.ageGroup &&
                   variant.metadata.tone === preferences.tone;
        });
        
        if (filteredVariants.length === 0) {
            console.warn('⚠️ No variants match preferences, using first available');
            return variants[0];
        }
        
        // Return the first matching variant
        return filteredVariants[0];
    }

    /**
     * Create lesson object for the player
     */
    createLessonObject(lessonDay, selectedVariant, allVariants) {
        const lesson = {
            day: lessonDay,
            topic: selectedVariant.topic,
            currentVariant: selectedVariant,
            allVariants: allVariants,
            content: {
                introduction: selectedVariant.content.introduction || 'Welcome to today\'s lesson!',
                mainContent: selectedVariant.content.mainContent || 'Main lesson content',
                examples: selectedVariant.content.examples || 'Examples and applications',
                reflection: selectedVariant.content.reflection || 'Thought-provoking reflection',
                conclusion: selectedVariant.content.conclusion || 'Lesson conclusion',
                fortune: this.getDailyFortune(allVariants)
            },
            metadata: {
                ageGroup: selectedVariant.metadata.ageGroup,
                tone: selectedVariant.metadata.tone,
                contentType: selectedVariant.metadata.contentType,
                questionType: selectedVariant.metadata.questionType,
                choice: selectedVariant.metadata.choice,
                totalVariants: allVariants.length,
                generationTime: selectedVariant.metadata.generationTime
            },
            navigation: {
                canSwitchAgeGroup: this.canSwitchAgeGroup(allVariants),
                canSwitchTone: this.canSwitchTone(allVariants),
                availableAgeGroups: this.getAvailableAgeGroups(allVariants),
                availableTones: this.getAvailableTones(allVariants)
            }
        };
        
        return lesson;
    }

    /**
     * Get daily fortune from variants
     */
    getDailyFortune(variants) {
        const fortuneVariant = variants.find(v => v.metadata.type === 'daily_fortune');
        return fortuneVariant ? fortuneVariant.content.fortune : 'Today is a great day for learning!';
    }

    /**
     * Switch to different age group
     */
    switchAgeGroup(ageGroup) {
        if (!this.currentLesson) return false;
        
        const newVariant = this.currentLesson.allVariants.find(v => 
            v.metadata.ageGroup === ageGroup && 
            v.metadata.tone === this.userPreferences.tone
        );
        
        if (newVariant) {
            this.currentVariant = newVariant;
            this.userPreferences.ageGroup = ageGroup;
            this.saveUserPreferences();
            
            // Update lesson content
            this.currentLesson.currentVariant = newVariant;
            this.currentLesson.content = {
                introduction: newVariant.content.introduction,
                mainContent: newVariant.content.mainContent,
                examples: newVariant.content.examples,
                reflection: newVariant.content.reflection,
                conclusion: newVariant.content.conclusion,
                fortune: this.getDailyFortune(this.currentLesson.allVariants)
            };
            this.currentLesson.metadata.ageGroup = ageGroup;
            
            console.log(`✅ Switched to age group: ${ageGroup}`);
            return true;
        }
        
        return false;
    }

    /**
     * Switch to different tone
     */
    switchTone(tone) {
        if (!this.currentLesson) return false;
        
        const newVariant = this.currentLesson.allVariants.find(v => 
            v.metadata.tone === tone && 
            v.metadata.ageGroup === this.userPreferences.ageGroup
        );
        
        if (newVariant) {
            this.currentVariant = newVariant;
            this.userPreferences.tone = tone;
            this.saveUserPreferences();
            
            // Update lesson content
            this.currentLesson.currentVariant = newVariant;
            this.currentLesson.content = {
                introduction: newVariant.content.introduction,
                mainContent: newVariant.content.mainContent,
                examples: newVariant.content.examples,
                reflection: newVariant.content.reflection,
                conclusion: newVariant.content.conclusion,
                fortune: this.getDailyFortune(this.currentLesson.allVariants)
            };
            this.currentLesson.metadata.tone = tone;
            
            console.log(`✅ Switched to tone: ${tone}`);
            return true;
        }
        
        return false;
    }

    /**
     * Get available age groups for current lesson
     */
    getAvailableAgeGroups(variants) {
        const ageGroups = new Set();
        variants.forEach(v => {
            if (v.metadata.ageGroup) {
                ageGroups.add(v.metadata.ageGroup);
            }
        });
        return Array.from(ageGroups);
    }

    /**
     * Get available tones for current lesson
     */
    getAvailableTones(variants) {
        const tones = new Set();
        variants.forEach(v => {
            if (v.metadata.tone) {
                tones.add(v.metadata.tone);
            }
        });
        return Array.from(tones);
    }

    /**
     * Check if age group switching is available
     */
    canSwitchAgeGroup(variants) {
        return this.getAvailableAgeGroups(variants).length > 1;
    }

    /**
     * Check if tone switching is available
     */
    canSwitchTone(variants) {
        return this.getAvailableTones(variants).length > 1;
    }

    /**
     * Load user preferences from storage
     */
    loadUserPreferences() {
        try {
            const stored = localStorage.getItem('ilearn_user_preferences');
            if (stored) {
                this.userPreferences = { ...this.userPreferences, ...JSON.parse(stored) };
                console.log('📂 Loaded user preferences:', this.userPreferences);
            }
        } catch (error) {
            console.warn('⚠️ Could not load user preferences:', error);
        }
    }

    /**
     * Save user preferences to storage
     */
    saveUserPreferences() {
        try {
            localStorage.setItem('ilearn_user_preferences', JSON.stringify(this.userPreferences));
            console.log('💾 Saved user preferences:', this.userPreferences);
        } catch (error) {
            console.warn('⚠️ Could not save user preferences:', error);
        }
    }

    /**
     * Update user preferences
     */
    updateUserPreferences(newPreferences) {
        this.userPreferences = { ...this.userPreferences, ...newPreferences };
        this.saveUserPreferences();
        console.log('✅ Updated user preferences:', this.userPreferences);
    }

    /**
     * Get current lesson
     */
    getCurrentLesson() {
        return this.currentLesson;
    }

    /**
     * Get current variant
     */
    getCurrentVariant() {
        return this.currentVariant;
    }

    /**
     * Get generation statistics
     */
    getGenerationStats() {
        return this.variantGenerator.getGenerationStats();
    }

    /**
     * Get cost summary
     */
    getCostSummary() {
        return this.variantGenerator.claudeAPI.getCostSummary();
    }

    /**
     * Clear all cached data
     */
    clearCache() {
        this.variantGenerator.clearStoredVariants();
        this.variantCache = {};
        this.currentLesson = null;
        this.currentVariant = null;
        console.log('🗑️ Cleared all cached data');
    }

    /**
     * Get lesson summary
     */
    getLessonSummary() {
        if (!this.currentLesson) return null;
        
        return {
            day: this.currentLesson.day,
            topic: this.currentLesson.topic,
            totalVariants: this.currentLesson.metadata.totalVariants,
            currentAgeGroup: this.currentLesson.metadata.ageGroup,
            currentTone: this.currentLesson.metadata.tone,
            availableAgeGroups: this.currentLesson.navigation.availableAgeGroups,
            availableTones: this.currentLesson.navigation.availableTones,
            generationTime: this.currentLesson.metadata.generationTime
        };
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.LessonPlayerVariantIntegration = LessonPlayerVariantIntegration;
}
if (typeof module !== 'undefined') {
    module.exports = { LessonPlayerVariantIntegration };
} 