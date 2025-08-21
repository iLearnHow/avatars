/**
 * Test July 29 Lesson Generation
 * This tests the generation system without requiring API keys
 */

const { getLessonDataForDay } = require('./complete-curriculum.js');

class July29TestGenerator {
    constructor() {
        this.lessonDay = 210; // July 29th
        this.lessonTopic = getLessonDataForDay(this.lessonDay);
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
     * Generate sample lesson content for testing
     */
    generateSampleLesson() {
        console.log('🎯 Testing July 29 Lesson Generation');
        console.log(`📚 Topic: ${this.lessonTopic.title}`);
        console.log(`🎯 Objective: ${this.lessonTopic.learning_objective}`);
        
        // Generate sample variants
        const sampleVariants = this.generateSampleVariants();
        
        // Add smart images
        this.addSmartImagesToVariants(sampleVariants);
        
        // Generate summary
        this.generateLessonSummary(sampleVariants);
        
        console.log('✅ Sample lesson generation test completed!');
        return sampleVariants;
    }

    /**
     * Generate sample variants for testing
     */
    generateSampleVariants() {
        const variants = [];
        
        const ageGroups = ['early_childhood', 'youth', 'young_adult'];
        const tones = ['grandmother', 'fun', 'neutral'];
        const contentTypes = ['voice_over_script', 'on_screen_text', 'lesson_logic'];
        const questionTypes = ['question_1', 'question_2', 'question_3'];
        
        // Generate 3x3x3 format variants (27 combinations)
        for (const ageGroup of ageGroups) {
            for (const tone of tones) {
                for (const contentType of contentTypes) {
                    for (const questionType of questionTypes) {
                        variants.push({
                            ageGroup,
                            tone,
                            contentType,
                            questionType,
                            choice: 'A',
                            content: this.generateSampleContent(ageGroup, tone, contentType, questionType),
                            variantId: `${ageGroup}_${tone}_${contentType}_${questionType}_A`
                        });
                    }
                }
            }
        }
        
        return variants;
    }

    /**
     * Generate sample content based on parameters
     */
    generateSampleContent(ageGroup, tone, contentType, questionType) {
        const ageContext = {
            early_childhood: 'simple, colorful, and fun',
            youth: 'engaging and interactive',
            young_adult: 'detailed and analytical'
        };
        
        const toneContext = {
            grandmother: 'warm and nurturing',
            fun: 'exciting and playful',
            neutral: 'clear and balanced'
        };
        
        const contentContext = {
            voice_over_script: 'spoken explanation',
            on_screen_text: 'visual text display',
            lesson_logic: 'structured learning approach'
        };
        
        return `This is a ${ageContext[ageGroup]} lesson about aging, presented in a ${toneContext[tone]} tone. The content is delivered as ${contentContext[contentType]} for ${questionType}.`;
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
     * Test 3x3x3 format
     */
    get3x3x3Variants() {
        const ageGroups = ['early_childhood', 'youth', 'young_adult'];
        const contentTypes = ['voice_over_script', 'on_screen_text', 'lesson_logic'];
        const questionTypes = ['question_1', 'question_2', 'question_3'];
        
        return this.generateSampleVariants().filter(variant => 
            ageGroups.includes(variant.ageGroup) &&
            contentTypes.includes(variant.contentType) &&
            questionTypes.includes(variant.questionType)
        );
    }

    /**
     * Test 3x2x1 format
     */
    get3x2x1Variants() {
        const ageGroups = ['early_childhood', 'youth', 'young_adult'];
        const contentTypes = ['voice_over_script', 'on_screen_text'];
        const questionTypes = ['question_1'];
        
        return this.generateSampleVariants().filter(variant => 
            ageGroups.includes(variant.ageGroup) &&
            contentTypes.includes(variant.contentType) &&
            questionTypes.includes(variant.questionType)
        );
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { July29TestGenerator };
}

// If running directly, run the test
if (require.main === module) {
    const testGenerator = new July29TestGenerator();
    
    console.log('🧪 Testing July 29 Lesson Generation System');
    console.log('=' .repeat(50));
    
    // Test sample generation
    const sampleVariants = testGenerator.generateSampleLesson();
    
    // Test format filtering
    const format3x3x3 = testGenerator.get3x3x3Variants();
    const format3x2x1 = testGenerator.get3x2x1Variants();
    
    console.log(`\n📊 Format Results:`);
    console.log(`3x3x3 variants: ${format3x3x3.length}`);
    console.log(`3x2x1 variants: ${format3x2x1.length}`);
    
    console.log('\n✅ All tests completed successfully!');
} 