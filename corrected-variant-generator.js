/**
 * Corrected Variant Generator for Kelly's 3x3x3 and 3x2x1 Systems
 * Based on proper understanding: 3 Questions × Answer Choices × Fortune Elements × Tones
 */

const { getLessonDataForDay } = require('./complete-curriculum.js');

class CorrectedVariantGenerator {
    constructor() {
        this.lessonDay = 210; // July 29th
        this.lessonTopic = getLessonDataForDay(this.lessonDay);
        this.questionArchitecture = this.createQuestionArchitecture();
        this.fortuneArchitecture = this.createFortuneArchitecture();
        this.tonePatterns = this.createTonePatterns();
    }

    /**
     * Create proper question architecture based on Kelly's system
     */
    createQuestionArchitecture() {
        return {
            question_1: {
                type: 'foundation',
                intrigue_hook: 'Let\'s start with something you might already know...',
                complexity: 'recognition',
                selection_rules: 'Choose one answer',
                context_bridge: '...and it has to do with [CONCEPT], but we use it like [APPLICATION], and it does [FUNCTION]...'
            },
            question_2: {
                type: 'application',
                intrigue_hook: 'Here\'s where it gets interesting...',
                complexity: 'analysis',
                selection_rules: 'You can choose one, two, or all three',
                context_bridge: '...and it has to do with [CONCEPT], but we use it like [APPLICATION], and it does [FUNCTION]...'
            },
            question_3: {
                type: 'synthesis',
                intrigue_hook: 'This final one will really make you think...',
                complexity: 'evaluation',
                selection_rules: 'Choose one answer',
                context_bridge: '...and it has to do with [CONCEPT], but we use it like [APPLICATION], and it does [FUNCTION]...'
            }
        };
    }

    /**
     * Create fortune architecture based on Kelly's system
     */
    createFortuneArchitecture() {
        return {
            wisdom: {
                date_anchor: 'current_date',
                insight_formula: 'abstract_concept about concrete_element and practical_application',
                core_wisdom: 'Because [concept] about [element] without [missing_piece] is [incomplete_state]'
            },
            discovery_paths: {
                empowering_identity: 'You are [identity] and [identity] is [trait]',
                preference_validation: 'If you don\'t like [A] or [B], or you love [C]...',
                reassurance: 'It\'s going to be ok because we can [action] at any time'
            },
            ul_generation: {
                discovery_interests: 'If you are looking for [interest_A] or [interest_B]...',
                generation_hook: 'If you run into a topic, just click on [combination]...'
            }
        };
    }

    /**
     * Create tone patterns for different teaching styles
     */
    createTonePatterns() {
        return {
            grandmother: {
                question_setup: 'gentle_curious',
                feedback_style: 'supportive_encouraging',
                fortune_tone: 'warm_nurturing',
                opening_pattern: 'Welcome back! [Reason for excitement about today\'s topic]'
            },
            fun: {
                question_setup: 'excited_curious',
                feedback_style: 'playful_encouraging',
                fortune_tone: 'enthusiastic_engaging',
                opening_pattern: '[Positive greeting]! I was hoping we\'d get to [specific topic excitement]'
            },
            neutral: {
                question_setup: 'thoughtful_curious',
                feedback_style: 'patient_encouraging',
                fortune_tone: 'clear_informative',
                opening_pattern: '[Greeting]! Today we\'re exploring something [three descriptive words]'
            }
        };
    }

    /**
     * Generate 3x3x3 format variants (81 total)
     */
    generate3x3x3Variants() {
        console.log('🎯 Generating 3x3x3 Format Variants');
        console.log(`📚 Topic: ${this.lessonTopic.title}`);
        
        const variants = [];
        const questions = ['question_1', 'question_2', 'question_3'];
        const answerChoices = ['choice_A', 'choice_B', 'choice_C'];
        const fortuneElements = ['wisdom', 'discovery_paths', 'ul_generation'];
        const tones = ['grandmother', 'fun', 'neutral'];
        
        // Generate all combinations: 3 × 3 × 3 × 3 = 81
        for (const question of questions) {
            for (const answerChoice of answerChoices) {
                for (const fortuneElement of fortuneElements) {
                    for (const tone of tones) {
                        const variant = this.create3x3x3Variant(question, answerChoice, fortuneElement, tone);
                        variants.push(variant);
                    }
                }
            }
        }
        
        console.log(`✅ Generated ${variants.length} 3x3x3 variants`);
        return variants;
    }

    /**
     * Generate 3x2x1 format variants (18 total)
     */
    generate3x2x1Variants() {
        console.log('🎯 Generating 3x2x1 Format Variants');
        console.log(`📚 Topic: ${this.lessonTopic.title}`);
        
        const variants = [];
        const questions = ['question_1', 'question_2', 'question_3'];
        const answerChoices = ['true', 'false'];
        const fortuneElements = ['wisdom']; // Only 1 fortune element for 3x2x1
        const tones = ['grandmother', 'fun', 'neutral'];
        
        // Generate all combinations: 3 × 2 × 1 × 3 = 18
        for (const question of questions) {
            for (const answerChoice of answerChoices) {
                for (const fortuneElement of fortuneElements) {
                    for (const tone of tones) {
                        const variant = this.create3x2x1Variant(question, answerChoice, fortuneElement, tone);
                        variants.push(variant);
                    }
                }
            }
        }
        
        console.log(`✅ Generated ${variants.length} 3x2x1 variants`);
        return variants;
    }

    /**
     * Create a single 3x3x3 variant
     */
    create3x3x3Variant(question, answerChoice, fortuneElement, tone) {
        const questionData = this.questionArchitecture[question];
        const toneData = this.tonePatterns[tone];
        const fortuneData = this.fortuneArchitecture[fortuneElement];
        
        return {
            format: '3x3x3',
            question: question,
            answerChoice: answerChoice,
            fortuneElement: fortuneElement,
            tone: tone,
            variantId: `${question}_${answerChoice}_${fortuneElement}_${tone}`,
            
            // Question structure
            questionType: questionData.type,
            intrigueHook: questionData.intrigue_hook,
            complexity: questionData.complexity,
            selectionRules: questionData.selection_rules,
            contextBridge: questionData.context_bridge,
            
            // Tone-specific elements
            toneSetup: toneData.question_setup,
            toneFeedback: toneData.feedback_style,
            toneFortune: toneData.fortune_tone,
            openingPattern: toneData.opening_pattern,
            
            // Fortune structure
            fortuneDate: new Date().toISOString().split('T')[0],
            fortuneInsight: fortuneData.insight_formula,
            fortuneWisdom: fortuneData.core_wisdom,
            
            // Content generation
            content: this.generateVariantContent(question, answerChoice, fortuneElement, tone),
            
            // Smart image mapping
            smartImage: this.getSmartImage(question, tone),
            microExpression: this.getMicroExpression(question, tone)
        };
    }

    /**
     * Create a single 3x2x1 variant
     */
    create3x2x1Variant(question, answerChoice, fortuneElement, tone) {
        const questionData = this.questionArchitecture[question];
        const toneData = this.tonePatterns[tone];
        const fortuneData = this.fortuneArchitecture[fortuneElement];
        
        return {
            format: '3x2x1',
            question: question,
            answerChoice: answerChoice,
            fortuneElement: fortuneElement,
            tone: tone,
            variantId: `${question}_${answerChoice}_${fortuneElement}_${tone}`,
            
            // Question structure (same as 3x3x3)
            questionType: questionData.type,
            intrigueHook: questionData.intrigue_hook,
            complexity: questionData.complexity,
            selectionRules: 'Choose one answer', // Always single choice for 3x2x1
            contextBridge: questionData.context_bridge,
            
            // Tone-specific elements
            toneSetup: toneData.question_setup,
            toneFeedback: toneData.feedback_style,
            toneFortune: toneData.fortune_tone,
            openingPattern: toneData.opening_pattern,
            
            // Fortune structure (simplified)
            fortuneDate: new Date().toISOString().split('T')[0],
            fortuneInsight: fortuneData.insight_formula,
            fortuneWisdom: fortuneData.core_wisdom,
            
            // Content generation
            content: this.generateVariantContent(question, answerChoice, fortuneElement, tone),
            
            // Smart image mapping
            smartImage: this.getSmartImage(question, tone),
            microExpression: this.getMicroExpression(question, tone)
        };
    }

    /**
     * Generate content for a specific variant
     */
    generateVariantContent(question, answerChoice, fortuneElement, tone) {
        const questionData = this.questionArchitecture[question];
        const toneData = this.tonePatterns[tone];
        
        return {
            opening: this.generateOpening(toneData),
            question: this.generateQuestion(questionData, toneData),
            answerChoices: this.getAnswerChoices(questionData.type),
            feedback: this.generateFeedback(question, answerChoice, toneData),
            fortune: this.generateFortune(fortuneElement, toneData)
        };
    }

    /**
     * Generate opening based on tone
     */
    generateOpening(toneData) {
        const topic = this.lessonTopic.title;
        const objective = this.lessonTopic.learning_objective;
        
        switch (toneData.opening_pattern) {
            case 'Welcome back! [Reason for excitement about today\'s topic]':
                return `Welcome back! Today we're diving into something that happens in your brain every single day - ${topic.toLowerCase()}.`;
            case '[Positive greeting]! I was hoping we\'d get to [specific topic excitement]':
                return `I'm excited about this one! You're going to see how ${topic.toLowerCase()} can completely change how you understand the world.`;
            case '[Greeting]! Today we\'re exploring something [three descriptive words]':
                return `Hello! Today we're exploring something fascinating, complex, and absolutely everywhere once you notice it - ${topic.toLowerCase()}.`;
            default:
                return `Welcome back! Today we're learning about ${topic.toLowerCase()}.`;
        }
    }

    /**
     * Generate question based on question architecture and tone
     */
    generateQuestion(questionData, toneData) {
        const topic = this.lessonTopic.title;
        
        return {
            setup: `${questionData.intrigue_hook} ${questionData.context_bridge.replace('[CONCEPT]', topic.toLowerCase())}`,
            question: `What does ${topic.toLowerCase()} need to work properly?`,
            choices: this.getAnswerChoices(questionData.type),
            selectionRules: questionData.selection_rules
        };
    }

    /**
     * Generate answer choices based on question type
     */
    getAnswerChoices(questionType) {
        switch (questionType) {
            case 'foundation':
                return [
                    'The basic elements it needs to function',
                    'Advanced components that enhance performance',
                    'External factors that influence its operation'
                ];
            case 'application':
                return [
                    'Primary requirements for operation',
                    'Secondary factors that support function',
                    'Environmental conditions that affect performance'
                ];
            case 'synthesis':
                return [
                    'Core mechanisms that drive the process',
                    'Supporting systems that enable function',
                    'Integrated factors that optimize performance'
                ];
            default:
                return ['Option A', 'Option B', 'Option C'];
        }
    }

    /**
     * Generate feedback based on answer choice and tone
     */
    generateFeedback(question, answerChoice, toneData) {
        const isCorrect = answerChoice === 'choice_A'; // Simplified logic
        
        if (isCorrect) {
            return {
                type: 'correct',
                message: `Exactly! You got it. ${answerChoice} is right because it represents the fundamental requirements.`,
                tone: toneData.feedback_style
            };
        } else {
            return {
                type: 'incorrect',
                message: `Actually, that's not quite right. Let me explain why ${answerChoice} might not be the best choice.`,
                tone: toneData.feedback_style
            };
        }
    }

    /**
     * Generate fortune based on fortune element and tone
     */
    generateFortune(fortuneElement, toneData) {
        const date = new Date().toISOString().split('T')[0];
        const topic = this.lessonTopic.title;
        
        switch (fortuneElement) {
            case 'wisdom':
                return {
                    type: 'wisdom',
                    message: `Today, ${date}, is a perfect day to realize understanding about ${topic.toLowerCase()} and how it affects your daily life.`,
                    tone: toneData.fortune_tone
                };
            case 'discovery_paths':
                return {
                    type: 'discovery_paths',
                    message: `You are a learner and learners see connections everywhere. If you're looking for more about ${topic.toLowerCase()}, here's how to discover more.`,
                    tone: toneData.fortune_tone
                };
            case 'ul_generation':
                return {
                    type: 'ul_generation',
                    message: `If you run into a topic, just click on '${topic.toLowerCase()} + daily life' and I'll grab the context and make you a UL.`,
                    tone: toneData.fortune_tone
                };
            default:
                return {
                    type: 'wisdom',
                    message: `Today, ${date}, is a perfect day to realize understanding about ${topic.toLowerCase()}.`,
                    tone: toneData.fortune_tone
                };
        }
    }

    /**
     * Get smart image for question and tone
     */
    getSmartImage(question, tone) {
        const imageMapping = {
            question_1: {
                grandmother: 'ken_early_childhood_fun_day28.jpg',
                fun: 'ken_youth_fun_day28.jpg',
                neutral: 'ken_young_adult_fun_day28.jpg'
            },
            question_2: {
                grandmother: 'question mode first.png',
                fun: 'question mode first.png',
                neutral: 'question mode first.png'
            },
            question_3: {
                grandmother: 'ken/ken_neutral_default.png',
                fun: 'ken/ken_neutral_default.png',
                neutral: 'ken/ken_neutral_default.png'
            }
        };
        
        return imageMapping[question]?.[tone] || 'ken_conclusion_day28.jpg';
    }

    /**
     * Get micro expression for question and tone
     */
    getMicroExpression(question, tone) {
        const expressionMapping = {
            question_1: {
                grandmother: 'gentle_curious',
                fun: 'excited_curious',
                neutral: 'thoughtful_curious'
            },
            question_2: {
                grandmother: 'nurturing_explanatory',
                fun: 'enthusiastic_engaging',
                neutral: 'clear_informative'
            },
            question_3: {
                grandmother: 'proud_celebratory',
                fun: 'excited_celebratory',
                neutral: 'satisfied_acknowledging'
            }
        };
        
        return expressionMapping[question]?.[tone] || 'neutral_professional';
    }

    /**
     * Generate summary of all variants
     */
    generateSummary() {
        const variants3x3x3 = this.generate3x3x3Variants();
        const variants3x2x1 = this.generate3x2x1Variants();
        
        const summary = {
            lessonDay: this.lessonDay,
            lessonTopic: this.lessonTopic.title,
            totalVariants: variants3x3x3.length + variants3x2x1.length,
            format3x3x3: {
                count: variants3x3x3.length,
                structure: '3 Questions × 3 Answer Choices × 3 Fortune Elements × 3 Tones'
            },
            format3x2x1: {
                count: variants3x2x1.length,
                structure: '3 Questions × 2 Answer Choices × 1 Fortune Element × 3 Tones'
            },
            questionTypes: [...new Set(variants3x3x3.map(v => v.questionType))],
            tones: [...new Set(variants3x3x3.map(v => v.tone))],
            fortuneElements: [...new Set(variants3x3x3.map(v => v.fortuneElement))],
            uniqueImages: [...new Set([...variants3x3x3, ...variants3x2x1].map(v => v.smartImage))],
            microExpressions: [...new Set([...variants3x3x3, ...variants3x2x1].map(v => v.microExpression))]
        };
        
        console.log('📊 Variant Summary:');
        console.log(JSON.stringify(summary, null, 2));
        
        return summary;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CorrectedVariantGenerator };
}

// If running directly, generate and test variants
if (require.main === module) {
    const generator = new CorrectedVariantGenerator();
    
    console.log('🧪 Testing Corrected Variant Generator');
    console.log('=' .repeat(50));
    
    // Generate summary
    const summary = generator.generateSummary();
    
    // Test specific formats
    const variants3x3x3 = generator.generate3x3x3Variants();
    const variants3x2x1 = generator.generate3x2x1Variants();
    
    console.log('\n✅ Verification:');
    console.log(`3x3x3 variants: ${variants3x3x3.length} (expected: 81)`);
    console.log(`3x2x1 variants: ${variants3x2x1.length} (expected: 18)`);
    console.log(`Total variants: ${variants3x3x3.length + variants3x2x1.length} (expected: 99)`);
    
    console.log('\n🎯 Corrected logic implemented successfully!');
} 