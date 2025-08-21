/**
 * Generate Complete July 29 Lesson - Quality Template
 * This generates all 270+ variants for "Aging Process - How Life Changes Over Time"
 * This becomes our template for all future lesson generation
 */

const { CompleteDNAVariantGenerator } = require('./complete-dna-variant-generator.js');
const { getLessonDataForDay } = require('./complete-curriculum.js');

class July29LessonGenerator {
    constructor() {
        this.generator = new CompleteDNAVariantGenerator();
        this.lessonDay = 210; // July 29th
        this.lessonTopic = getLessonDataForDay(this.lessonDay);
        this.generatedVariants = {};
        this.smartImageMapping = this.createSmartImageMapping();
    }

    /**
     * Create smart image mapping for lesson progression
     */
    createSmartImageMapping() {
        return {
            // Introduction phase
            introduction: {
                early_childhood: 'ken_early_childhood_fun_day28.jpg',
                youth: 'ken_youth_fun_day28.jpg', 
                young_adult: 'ken_young_adult_fun_day28.jpg',
                midlife: 'ken_conclusion_day28.jpg',
                wisdom_years: 'ken_conclusion_day28.jpg'
            },
            
            // Teaching phase
            voice_over_teaching: {
                early_childhood: 'ken_early_childhood_fun_day28.jpg',
                youth: 'ken_youth_fun_day28.jpg',
                young_adult: 'ken_young_adult_fun_day28.jpg', 
                midlife: 'ken_conclusion_day28.jpg',
                wisdom_years: 'ken_conclusion_day28.jpg'
            },
            
            // Question asking phase
            question_asking: {
                early_childhood: 'question mode first.png',
                youth: 'question mode first.png',
                young_adult: 'question mode first.png',
                midlife: 'question mode first.png',
                wisdom_years: 'question mode first.png'
            },
            
            // Correct answer celebration
            correct_celebration: {
                early_childhood: 'ken/ken_neutral_default.png',
                youth: 'ken/ken_neutral_default.png',
                young_adult: 'ken/ken_neutral_default.png',
                midlife: 'ken/ken_neutral_default.png',
                wisdom_years: 'ken/ken_neutral_default.png'
            },
            
            // Incorrect answer encouragement
            incorrect_encouraging: {
                early_childhood: 'sad-face try again mode.png',
                youth: 'not-quite-try-again mode.png',
                young_adult: 'not-quite-try-again mode.png',
                midlife: 'neutral-face-try-again mode glasses on.png',
                wisdom_years: 'neutral-face-try-again mode glasses on.png'
            },
            
            // Conclusion phase
            conclusion: {
                early_childhood: 'ken_conclusion_day28.jpg',
                youth: 'ken_conclusion_day28.jpg',
                young_adult: 'ken_conclusion_day28.jpg',
                midlife: 'ken_conclusion_day28.jpg',
                wisdom_years: 'ken_conclusion_day28.jpg'
            },
            
            // Daily fortune
            fortune: {
                early_childhood: 'daily-fortune.jpg',
                youth: 'daily-fortune.jpg',
                young_adult: 'daily-fortune.jpg',
                midlife: 'daily-fortune.jpg',
                wisdom_years: 'daily-fortune.jpg'
            }
        };
    }

    /**
     * Generate complete lesson with all variants
     */
    async generateCompleteLesson(apiKey) {
        console.log('🎯 Generating Complete July 29 Lesson - Quality Template');
        console.log(`📚 Topic: ${this.lessonTopic.title}`);
        console.log(`🎯 Objective: ${this.lessonTopic.learning_objective}`);
        
        try {
            // Initialize the generator
            await this.generator.initialize(apiKey);
            
            // Generate all variants
            const variants = await this.generator.generateAllVariants(this.lessonDay, apiKey);
            
            // Add smart image mapping to each variant
            this.addSmartImagesToVariants(variants);
            
            // Save the complete lesson
            await this.saveCompleteLesson(variants);
            
            // Generate lesson summary
            this.generateLessonSummary(variants);
            
            console.log('✅ Complete July 29 lesson generated successfully!');
            return variants;
            
        } catch (error) {
            console.error('❌ Error generating complete lesson:', error);
            throw error;
        }
    }

    /**
     * Add smart image selections to variants
     */
    addSmartImagesToVariants(variants) {
        console.log('🖼️ Adding smart image selections...');
        
        variants.forEach(variant => {
            const { ageGroup, tone, contentType, questionType } = variant;
            
            // Determine lesson phase based on content type
            let phase = 'introduction';
            if (contentType === 'voice_over_script') {
                phase = 'voice_over_teaching';
            } else if (contentType === 'lesson_logic') {
                if (questionType.includes('question')) {
                    phase = 'question_asking';
                } else {
                    phase = 'conclusion';
                }
            }
            
            // Get appropriate image for this phase and age group
            const imageMapping = this.smartImageMapping[phase];
            if (imageMapping && imageMapping[ageGroup]) {
                variant.smartImage = imageMapping[ageGroup];
            } else {
                // Fallback image
                variant.smartImage = 'ken_conclusion_day28.jpg';
            }
            
            // Add micro-expression context
            variant.microExpression = this.getMicroExpressionContext(phase, tone, ageGroup);
        });
    }

    /**
     * Get micro-expression context for image selection
     */
    getMicroExpressionContext(phase, tone, ageGroup) {
        const contexts = {
            introduction: {
                grandmother: 'warm_welcoming',
                fun: 'playful_energetic',
                neutral: 'calm_professional'
            },
            voice_over_teaching: {
                grandmother: 'nurturing_explanatory',
                fun: 'enthusiastic_engaging',
                neutral: 'clear_informative'
            },
            question_asking: {
                grandmother: 'gentle_curious',
                fun: 'excited_curious',
                neutral: 'thoughtful_curious'
            },
            correct_celebration: {
                grandmother: 'proud_celebratory',
                fun: 'excited_celebratory',
                neutral: 'satisfied_acknowledging'
            },
            incorrect_encouraging: {
                grandmother: 'supportive_encouraging',
                fun: 'playful_encouraging',
                neutral: 'patient_encouraging'
            },
            conclusion: {
                grandmother: 'warm_concluding',
                fun: 'enthusiastic_concluding',
                neutral: 'reflective_concluding'
            }
        };
        
        return contexts[phase]?.[tone] || 'neutral_professional';
    }

    /**
     * Save complete lesson to file
     */
    async saveCompleteLesson(variants) {
        const lessonData = {
            lessonDay: this.lessonDay,
            lessonTopic: this.lessonTopic,
            generationDate: new Date().toISOString(),
            totalVariants: variants.length,
            variants: variants,
            smartImageMapping: this.smartImageMapping,
            lessonStructure: {
                format3x3x3: this.get3x3x3Structure(),
                format3x2x1: this.get3x2x1Structure()
            }
        };
        
        const fs = require('fs');
        const filename = `july-29-complete-lesson-${Date.now()}.json`;
        
        fs.writeFileSync(filename, JSON.stringify(lessonData, null, 2));
        console.log(`💾 Complete lesson saved to: ${filename}`);
    }

    /**
     * Get 3x3x3 lesson structure
     */
    get3x3x3Structure() {
        return {
            ageGroups: ['early_childhood', 'youth', 'young_adult'],
            contentTypes: ['voice_over_script', 'on_screen_text', 'lesson_logic'],
            questionTypes: ['question_1', 'question_2', 'question_3'],
            totalCombinations: 27
        };
    }

    /**
     * Get 3x2x1 lesson structure  
     */
    get3x2x1Structure() {
        return {
            ageGroups: ['early_childhood', 'youth', 'young_adult'],
            contentTypes: ['voice_over_script', 'on_screen_text'],
            questionTypes: ['question_1'],
            totalCombinations: 6
        };
    }

    /**
     * Generate lesson summary
     */
    generateLessonSummary(variants) {
        const summary = {
            lessonDay: this.lessonDay,
            lessonTopic: this.lessonTopic.title,
            totalVariants: variants.length,
            ageGroups: [...new Set(variants.map(v => v.ageGroup))],
            tones: [...new Set(variants.map(v => v.tone))],
            contentTypes: [...new Set(variants.map(v => v.contentType))],
            questionTypes: [...new Set(variants.map(v => v.questionType))],
            uniqueImages: [...new Set(variants.map(v => v.smartImage))],
            microExpressions: [...new Set(variants.map(v => v.microExpression))]
        };
        
        console.log('📊 Lesson Summary:');
        console.log(JSON.stringify(summary, null, 2));
        
        return summary;
    }

    /**
     * Get specific variant by filters
     */
    getVariantByFilters(filters = {}) {
        return this.generatedVariants.filter(variant => {
            return Object.keys(filters).every(key => 
                variant[key] === filters[key]
            );
        });
    }

    /**
     * Get lesson for specific format (3x3x3 or 3x2x1)
     */
    getLessonForFormat(format) {
        if (format === '3x3x3') {
            return this.get3x3x3Variants();
        } else if (format === '3x2x1') {
            return this.get3x2x1Variants();
        }
        return this.generatedVariants;
    }

    /**
     * Get 3x3x3 variants
     */
    get3x3x3Variants() {
        const ageGroups = ['early_childhood', 'youth', 'young_adult'];
        const contentTypes = ['voice_over_script', 'on_screen_text', 'lesson_logic'];
        const questionTypes = ['question_1', 'question_2', 'question_3'];
        
        return this.generatedVariants.filter(variant => 
            ageGroups.includes(variant.ageGroup) &&
            contentTypes.includes(variant.contentType) &&
            questionTypes.includes(variant.questionType)
        );
    }

    /**
     * Get 3x2x1 variants
     */
    get3x2x1Variants() {
        const ageGroups = ['early_childhood', 'youth', 'young_adult'];
        const contentTypes = ['voice_over_script', 'on_screen_text'];
        const questionTypes = ['question_1'];
        
        return this.generatedVariants.filter(variant => 
            ageGroups.includes(variant.ageGroup) &&
            contentTypes.includes(variant.contentType) &&
            questionTypes.includes(variant.questionType)
        );
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { July29LessonGenerator };
}

// If running directly, generate the lesson
if (require.main === module) {
    const generator = new July29LessonGenerator();
    
    // You would need to provide your Claude API key here
    const apiKey = process.env.CLAUDE_API_KEY;
    
    if (!apiKey) {
        console.error('❌ Please set CLAUDE_API_KEY environment variable');
        process.exit(1);
    }
    
    generator.generateCompleteLesson(apiKey)
        .then(variants => {
            console.log(`✅ Generated ${variants.length} variants for July 29 lesson`);
        })
        .catch(error => {
            console.error('❌ Generation failed:', error);
            process.exit(1);
        });
} 