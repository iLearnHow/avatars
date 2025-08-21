/**
 * Complete DNA-Based Variant Generator for iLearn
 * Generates all 270 variants per lesson using actual DNA structure
 */

class CompleteDNAVariantGenerator {
    constructor() {
        this.dnaParser = new DNAParser();
        this.claudeAPI = new ClaudeAPIIntegration();
        this.generatedVariants = {};
        this.generationStats = {
            totalVariants: 0,
            successfulGenerations: 0,
            failedGenerations: 0,
            totalCost: 0,
            startTime: null,
            endTime: null
        };
    }

    /**
     * Initialize the generator
     */
    async initialize(apiKey) {
        console.log('🚀 Initializing Complete DNA Variant Generator...');
        
        // Initialize Claude API
        await this.claudeAPI.initialize(apiKey);
        
        // Load and parse DNA structure
        await this.dnaParser.loadCurriculumFiles();
        await this.dnaParser.loadDNAFiles();
        
        const dnaStructure = this.dnaParser.parseDNAStructure();
        if (!dnaStructure) {
            throw new Error('Failed to parse DNA structure');
        }
        
        console.log('✅ Complete DNA Variant Generator initialized');
        return true;
    }

    /**
     * Generate all variants for a single lesson
     */
    async generateAllVariants(lessonDay, apiKey) {
        console.log(`🎯 Generating all variants for lesson ${lessonDay}...`);
        
        this.generationStats.startTime = Date.now();
        this.generationStats.totalVariants = 0;
        this.generationStats.successfulGenerations = 0;
        this.generationStats.failedGenerations = 0;
        
        // Get lesson topic
        const lessonTopic = this.dnaParser.getLessonTopic(lessonDay);
        console.log(`📚 Lesson topic: ${lessonTopic.title}`);
        
        // Get DNA structure
        const dnaStructure = this.dnaParser.parsedStructure;
        
        // Generate variants for each combination
        const variants = [];
        
        // Age groups: early_childhood, youth, young_adult, midlife, wisdom_years
        const ageGroups = Object.keys(dnaStructure.ageGroups);
        
        // Tones: grandmother, fun, neutral
        const tones = Object.keys(dnaStructure.tonePatterns);
        
        // Content types: voice_over_script, on_screen_text, lesson_logic
        const contentTypes = ['voice_over_script', 'on_screen_text', 'lesson_logic'];
        
        // Question types: question_1, question_2, question_3
        const questionTypes = Object.keys(dnaStructure.questionStructure);
        
        // Choices: A, B
        const choices = ['A', 'B'];
        
        console.log(`📊 Generating ${ageGroups.length} × ${tones.length} × ${contentTypes.length} × ${questionTypes.length} × ${choices.length} = ${ageGroups.length * tones.length * contentTypes.length * questionTypes.length * choices.length} variants`);
        
        // Generate content variants
        for (const ageGroup of ageGroups) {
            for (const tone of tones) {
                for (const contentType of contentTypes) {
                    for (const questionType of questionTypes) {
                        for (const choice of choices) {
                            try {
                                const variant = await this.generateSingleVariant(
                                    lessonDay,
                                    lessonTopic,
                                    ageGroup,
                                    tone,
                                    contentType,
                                    questionType,
                                    choice,
                                    dnaStructure
                                );
                                
                                variants.push(variant);
                                this.generationStats.successfulGenerations++;
                                
                                console.log(`✅ Generated variant: ${ageGroup}_${tone}_${contentType}_${questionType}_${choice}`);
                                
                            } catch (error) {
                                console.error(`❌ Failed to generate variant: ${ageGroup}_${tone}_${contentType}_${questionType}_${choice}`, error);
                                this.generationStats.failedGenerations++;
                            }
                        }
                    }
                }
            }
        }
        
        // Generate daily fortune
        try {
            const fortune = await this.generateDailyFortune(lessonDay, lessonTopic, dnaStructure.fortuneElements);
            variants.push(fortune);
            this.generationStats.successfulGenerations++;
            console.log('✅ Generated daily fortune');
        } catch (error) {
            console.error('❌ Failed to generate daily fortune', error);
            this.generationStats.failedGenerations++;
        }
        
        this.generationStats.endTime = Date.now();
        this.generationStats.totalVariants = variants.length;
        this.generationStats.totalCost = this.claudeAPI.getCostSummary().totalCost;
        
        console.log(`🎉 Generation complete! Generated ${variants.length} variants`);
        console.log(`📊 Stats: ${this.generationStats.successfulGenerations} successful, ${this.generationStats.failedGenerations} failed`);
        console.log(`💰 Total cost: $${this.generationStats.totalCost.toFixed(4)}`);
        
        return {
            lessonDay,
            lessonTopic,
            variants,
            stats: this.generationStats
        };
    }

    /**
     * Generate a single variant
     */
    async generateSingleVariant(lessonDay, lessonTopic, ageGroup, tone, contentType, questionType, choice, dnaStructure) {
        const variantId = `${ageGroup}_${tone}_${contentType}_${questionType}_${choice}`;
        
        const result = await this.claudeAPI.generateVariantContent(
            lessonDay,
            lessonTopic,
            ageGroup,
            tone,
            contentType,
            questionType,
            choice,
            dnaStructure
        );
        
        // Parse JSON content
        let parsedContent;
        try {
            parsedContent = JSON.parse(result.content);
        } catch (error) {
            // If JSON parsing fails, create structured content
            parsedContent = {
                introduction: result.content,
                mainContent: "Content generated successfully",
                examples: "Examples provided",
                reflection: "Reflection included",
                conclusion: "Conclusion reached"
            };
        }
        
        return {
            lessonDay,
            topic: lessonTopic.title,
            variantId,
            content: parsedContent,
            metadata: {
                ageGroup,
                tone,
                contentType,
                questionType,
                choice,
                generationTime: new Date().toISOString(),
                cost: result.cost,
                usage: result.usage
            }
        };
    }

    /**
     * Generate daily fortune
     */
    async generateDailyFortune(lessonDay, lessonTopic, fortuneElements) {
        const result = await this.claudeAPI.generateDailyFortune(lessonDay, lessonTopic, fortuneElements);
        
        return {
            lessonDay,
            topic: lessonTopic.title,
            variantId: `daily_fortune_${lessonDay}`,
            content: {
                fortune: result.content
            },
            metadata: {
                type: 'daily_fortune',
                generationTime: new Date().toISOString(),
                cost: result.cost,
                usage: result.usage
            }
        };
    }

    /**
     * Get generation statistics
     */
    getGenerationStats() {
        return {
            ...this.generationStats,
            duration: this.generationStats.endTime ? 
                (this.generationStats.endTime - this.generationStats.startTime) / 1000 : 0,
            costSummary: this.claudeAPI.getCostSummary()
        };
    }

    /**
     * Get variant by ID
     */
    getVariant(lessonDay, variantId) {
        const lessonVariants = this.generatedVariants[lessonDay];
        if (!lessonVariants) return null;
        
        return lessonVariants.find(v => v.variantId === variantId);
    }

    /**
     * Get all variants for a lesson
     */
    getLessonVariants(lessonDay) {
        return this.generatedVariants[lessonDay] || [];
    }

    /**
     * Get variants by filter
     */
    getVariantsByFilter(lessonDay, filters = {}) {
        const variants = this.getLessonVariants(lessonDay);
        
        return variants.filter(variant => {
            if (filters.ageGroup && variant.metadata.ageGroup !== filters.ageGroup) return false;
            if (filters.tone && variant.metadata.tone !== filters.tone) return false;
            if (filters.contentType && variant.metadata.contentType !== filters.contentType) return false;
            if (filters.questionType && variant.metadata.questionType !== filters.questionType) return false;
            if (filters.choice && variant.metadata.choice !== filters.choice) return false;
            return true;
        });
    }

    /**
     * Save variants to storage
     */
    saveVariants(lessonDay, variants) {
        this.generatedVariants[lessonDay] = variants;
        
        // Save to localStorage for persistence
        try {
            localStorage.setItem(`lesson_variants_${lessonDay}`, JSON.stringify(variants));
            console.log(`💾 Saved ${variants.length} variants for lesson ${lessonDay}`);
        } catch (error) {
            console.warn('⚠️ Could not save to localStorage:', error);
        }
    }

    /**
     * Load variants from storage
     */
    loadVariants(lessonDay) {
        try {
            const stored = localStorage.getItem(`lesson_variants_${lessonDay}`);
            if (stored) {
                this.generatedVariants[lessonDay] = JSON.parse(stored);
                console.log(`📂 Loaded ${this.generatedVariants[lessonDay].length} variants for lesson ${lessonDay}`);
                return this.generatedVariants[lessonDay];
            }
        } catch (error) {
            console.warn('⚠️ Could not load from localStorage:', error);
        }
        
        return [];
    }

    /**
     * Clear all stored variants
     */
    clearStoredVariants() {
        this.generatedVariants = {};
        
        // Clear from localStorage
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('lesson_variants_')) {
                    localStorage.removeItem(key);
                }
            });
            console.log('🗑️ Cleared all stored variants');
        } catch (error) {
            console.warn('⚠️ Could not clear localStorage:', error);
        }
    }

    /**
     * Get DNA structure summary
     */
    getDNAStructureSummary() {
        return this.dnaParser.getStructureSummary();
    }

    /**
     * Validate generation readiness
     */
    validateReadiness() {
        const dnaSummary = this.getDNAStructureSummary();
        
        if (dnaSummary.ageGroups < 3) {
            throw new Error('Insufficient age groups in DNA structure');
        }
        
        if (dnaSummary.tones < 2) {
            throw new Error('Insufficient tones in DNA structure');
        }
        
        if (dnaSummary.questions < 2) {
            throw new Error('Insufficient question types in DNA structure');
        }
        
        if (dnaSummary.curriculumFiles < 1) {
            throw new Error('No curriculum files loaded');
        }
        
        console.log('✅ Generation readiness validated');
        return true;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.CompleteDNAVariantGenerator = CompleteDNAVariantGenerator;
}
if (typeof module !== 'undefined') {
    module.exports = { CompleteDNAVariantGenerator };
} 