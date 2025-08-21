/**
 * Corrected Variant Generator V2 - DNA-Driven Content Generation
 * Integrates with DNA template system for universal accessibility
 * Generates 3,600 variants per DNA file (10 ages × 3 tones × 12 languages × 10 content types)
 */

class CorrectedVariantGeneratorV2 {
    constructor() {
        this.currentDNA = null;
        this.variantSwitcher = null;
        this.currentPreferences = {
            age: 'age_25',
            tone: 'neutral',
            language: 'english',
            avatar: 'kelly'
        };
        
        // Initialize DNA integration
        this.initializeDNAIntegration();
    }

    /**
     * Initialize DNA integration components
     */
    async initializeDNAIntegration() {
        // Initialize variant switcher if available
        if (typeof VariantSwitcher !== 'undefined') {
            this.variantSwitcher = new VariantSwitcher();
            console.log('Variant Switcher initialized');
        }

        // Load initial DNA data
        await this.loadCurrentDNA();
    }

    /**
     * Load DNA data for current day
     */
    async loadCurrentDNA() {
        try {
            const currentDay = this.getCurrentDay();
            if (typeof getDNALessonData === 'function') {
                this.currentDNA = await getDNALessonData(currentDay);
                if (this.currentDNA && this.variantSwitcher) {
                    this.variantSwitcher.initialize(this.currentDNA);
                }
                console.log(`DNA data loaded for day ${currentDay}`);
            }
        } catch (error) {
            console.error('Failed to load DNA data:', error);
        }
    }

    /**
     * Get current day of year
     */
    getCurrentDay() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    /**
     * Generate personalized content using DNA data
     * @param {Object} preferences - User preferences (age, tone, language, avatar)
     * @returns {Promise<Object>} Generated lesson content
     */
    async generatePersonalizedContent(preferences = null) {
        if (!this.currentDNA) {
            console.warn('No DNA data available, using fallback content');
            return this.generateFallbackContent();
        }

        const userPreferences = preferences || this.currentPreferences;
        
        // Use variant switcher if available
        if (this.variantSwitcher) {
            return await this.variantSwitcher.instantSwitch(userPreferences);
        }

        // Fallback to manual generation
        return this.generateContentFromDNA(userPreferences);
    }

    /**
     * Generate content directly from DNA data
     * @param {Object} preferences - User preferences
     * @returns {Object} Generated content
     */
    generateContentFromDNA(preferences) {
        if (!this.currentDNA) {
            console.warn('No DNA data available, using fallback content');
            return this.generateFallbackContent();
        }

        const ageData = this.currentDNA.age_expressions?.[preferences.age];
        const toneData = this.currentDNA.tone_delivery_dna?.[preferences.tone];
        const langData = this.currentDNA.language_translations?.[preferences.language];

        if (!ageData || !toneData || !langData) {
            console.warn('Missing DNA data for preferences:', preferences);
            return this.generateFallbackContent();
        }

        return {
            opening: this.generateOpeningFromDNA(ageData, toneData, langData),
            questions: this.generateQuestionsFromDNA(preferences),
            fortune: this.generateFortuneFromDNA(preferences),
            avatarMood: this.getAvatarMoodFromDNA(preferences),
            metadata: {
                preferences,
                generationTime: Date.now(),
                dnaDay: this.currentDNA.day
            }
        };
    }

    /**
     * Generate opening content from DNA
     * @param {Object} ageData - Age-specific data
     * @param {Object} toneData - Tone-specific data
     * @param {Object} langData - Language-specific data
     * @returns {string} Opening content
     */
    generateOpeningFromDNA(ageData, toneData, langData) {
        if (!toneData || !toneData.language_patterns || !toneData.language_patterns.openings) {
            console.warn('Missing tone data structure, using fallback opening');
            return `Welcome to today's lesson about ${ageData?.concept_name || 'learning'}!`;
        }

        const openingPatterns = toneData.language_patterns.openings;
        const opening = openingPatterns[Math.floor(Math.random() * openingPatterns.length)];
        const conceptName = ageData?.concept_name || 'learning';
        const greeting = langData?.key_phrases?.greeting || 'Welcome!';

        return `${greeting} ${opening} ${conceptName}!`;
    }

    /**
     * Generate questions from DNA
     * @param {Object} preferences - User preferences
     * @returns {Array} Array of question objects
     */
    generateQuestionsFromDNA(preferences) {
        const questions = [];
        const ageData = this.currentDNA.age_expressions[preferences.age];
        const toneData = this.currentDNA.tone_delivery_dna[preferences.tone];
        const langData = this.currentDNA.language_translations[preferences.language];

        // Generate 3 questions using DNA structure
        for (let i = 1; i <= 3; i++) {
            const questionData = this.currentDNA.core_lesson_structure?.[`question_${i}`];
            const examples = this.currentDNA.example_selector_data?.[`question_${i}_examples`]?.[preferences.age];

            const question = {
                id: i,
                text: this.generateQuestionTextFromDNA(questionData, ageData, langData),
                choices: this.generateChoicesFromDNA(questionData, examples, langData),
                teachingMoment: this.generateTeachingMomentFromDNA(questionData, toneData, langData)
            };

            questions.push(question);
        }

        return questions;
    }

    /**
     * Generate question text from DNA
     * @param {Object} questionData - Question data from DNA
     * @param {Object} ageData - Age-specific data
     * @param {Object} langData - Language-specific data
     * @returns {string} Question text
     */
    generateQuestionTextFromDNA(questionData, ageData, langData) {
        if (!questionData || !ageData || !langData) {
            return "What do you think about learning?";
        }

        const questionIntro = langData.key_phrases?.question_intro || "Here's a question:";
        const conceptFocus = questionData.concept_focus || ageData.concept_name || "learning";
        const complexityLevel = ageData.complexity_level || "basic";

        return `${questionIntro} ${conceptFocus} at a ${complexityLevel} level?`;
    }

    /**
     * Generate choice options from DNA
     * @param {Object} questionData - Question data from DNA
     * @param {Object} examples - Age-appropriate examples
     * @param {Object} langData - Language-specific data
     * @returns {Array} Array of choice objects
     */
    generateChoicesFromDNA(questionData, examples, langData) {
        if (!examples) {
            return [
                {
                    id: 'a',
                    text: "It's important",
                    isCorrect: true,
                    explanation: "Learning is indeed important for growth."
                },
                {
                    id: 'b',
                    text: "It's not necessary",
                    isCorrect: false,
                    explanation: "Learning helps us grow and understand the world."
                }
            ];
        }

        return [
            {
                id: 'a',
                text: examples.option_a || "It's important",
                isCorrect: false,
                explanation: questionData?.teaching_moments?.option_a_response || "Let's think about this differently."
            },
            {
                id: 'b',
                text: examples.option_b || "It's valuable",
                isCorrect: true,
                explanation: questionData?.teaching_moments?.option_b_response || "Great thinking!"
            }
        ];
    }

    /**
     * Generate teaching moment from DNA
     * @param {Object} questionData - Question data from DNA
     * @param {Object} toneData - Tone-specific data
     * @param {Object} langData - Language-specific data
     * @returns {string} Teaching moment text
     */
    generateTeachingMomentFromDNA(questionData, toneData, langData) {
        if (!toneData || !toneData.language_patterns || !toneData.language_patterns.encouragements) {
            return "Great thinking! Learning is indeed important for growth.";
        }

        const encouragements = toneData.language_patterns.encouragements;
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        const validationPositive = langData?.key_phrases?.validation_positive || "Excellent insight!";
        const universalPrinciple = questionData?.universal_principle || "learning helps us grow";

        return `${encouragement} ${validationPositive} ${universalPrinciple}`;
    }

    /**
     * Generate fortune from DNA
     * @param {Object} preferences - User preferences
     * @returns {string} Fortune content
     */
    generateFortuneFromDNA(preferences) {
        const fortuneElements = this.currentDNA.daily_fortune_elements;
        const langData = this.currentDNA.language_translations[preferences.language];
        const toneData = this.currentDNA.tone_delivery_dna[preferences.tone];

        if (!toneData || !toneData.language_patterns || !toneData.language_patterns.closings) {
            return "You are a natural learner! Keep growing and exploring.";
        }

        const closings = toneData.language_patterns.closings;
        const closing = closings[Math.floor(Math.random() * closings.length)];
        const fortuneTemplate = fortuneElements?.fortune_template || "You are a natural learner!";

        return `${fortuneTemplate} ${closing}`;
    }

    /**
     * Get avatar mood from DNA
     * @param {Object} preferences - User preferences
     * @returns {Object} Avatar mood data
     */
    getAvatarMoodFromDNA(preferences) {
        const avatarSystem = this.currentDNA.__lesson_player_integration?.ken_kelly_avatar_system;
        
        if (!avatarSystem) {
            return {
                expression: `${preferences.avatar}_${preferences.tone}`,
                mood: "curious",
                variation: "neutral"
            };
        }

        const expressionVariations = avatarSystem.expression_variations || {};
        const moodTriggers = avatarSystem.mood_triggers || {};

        return {
            expression: `${preferences.avatar}_${preferences.tone}`,
            mood: moodTriggers.opening || "curious",
            variation: expressionVariations[`${preferences.tone}_tone`] || "neutral"
        };
    }

    /**
     * Generate fallback content when DNA is not available
     * @returns {Object} Fallback content
     */
    generateFallbackContent() {
        return {
            opening: "Welcome to today's lesson!",
            questions: [
                {
                    id: 1,
                    text: "What do you think about learning?",
                    choices: [
                        { id: 'a', text: "It's important", isCorrect: true },
                        { id: 'b', text: "It's not necessary", isCorrect: false }
                    ],
                    teachingMoment: "Great thinking! Learning is indeed important for growth."
                }
            ],
            fortune: "You are a natural learner!",
            avatarMood: { expression: "kelly_neutral", mood: "curious" },
            metadata: {
                preferences: this.currentPreferences,
                generationTime: Date.now(),
                fallback: true
            }
        };
    }

    /**
     * Switch age preference
     * @param {string} newAge - New age preference
     * @returns {Promise<Object>} Updated content
     */
    async switchAge(newAge) {
        const newPreferences = { ...this.currentPreferences, age: newAge };
        this.currentPreferences = newPreferences;
        return this.generatePersonalizedContent(newPreferences);
    }

    /**
     * Switch tone preference
     * @param {string} newTone - New tone preference
     * @returns {Promise<Object>} Updated content
     */
    async switchTone(newTone) {
        const newPreferences = { ...this.currentPreferences, tone: newTone };
        this.currentPreferences = newPreferences;
        return this.generatePersonalizedContent(newPreferences);
    }

    /**
     * Switch language preference
     * @param {string} newLanguage - New language preference
     * @returns {Promise<Object>} Updated content
     */
    async switchLanguage(newLanguage) {
        const newPreferences = { ...this.currentPreferences, language: newLanguage };
        this.currentPreferences = newPreferences;
        return this.generatePersonalizedContent(newPreferences);
    }

    /**
     * Switch avatar preference
     * @param {string} newAvatar - New avatar preference
     * @returns {Promise<Object>} Updated content
     */
    async switchAvatar(newAvatar) {
        const newPreferences = { ...this.currentPreferences, avatar: newAvatar };
        this.currentPreferences = newPreferences;
        return this.generatePersonalizedContent(newPreferences);
    }

    /**
     * Get current preferences
     * @returns {Object} Current preferences
     */
    getCurrentPreferences() {
        return { ...this.currentPreferences };
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
                context_bridge: '...and it has to do with [CONCEPT], but we use it like [APPLICATION], and it does [FUNCTION]...'
            },
            question_2: {
                type: 'application',
                intrigue_hook: 'Here\'s where it gets interesting...',
                complexity: 'analysis',
                context_bridge: '...and it has to do with [CONCEPT], but we use it like [APPLICATION], and it does [FUNCTION]...'
            },
            question_3: {
                type: 'synthesis',
                intrigue_hook: 'This final one will really make you think...',
                complexity: 'evaluation',
                context_bridge: '...and it has to do with [CONCEPT], but we use it like [APPLICATION], and it does [FUNCTION]...'
            }
        };
    }

    /**
     * Create feedback system with correct and incorrect response patterns
     */
    createFeedbackSystem() {
        return {
            correct: {
                affirmation: ['Yup', 'Exactly', 'That\'s right', 'Bingo', 'Perfect'],
                pattern: '[AFFIRMATION]! You got it. [CORRECT_CHOICE] is right because [EXPLANATION] and that means [IMPLICATION]. This may be important because [REAL_WORLD_CONNECTION].',
                tone_appropriate: {
                    grandmother: 'gentle_celebration',
                    fun: 'enthusiastic_celebration',
                    neutral: 'satisfied_acknowledgment'
                }
            },
            incorrect_A: {
                pattern: '[CHOICE] isn\'t quite right, here\'s why... [BRIEF_EXPLANATION]. Think about how [CORRECT_OPTION] might be a better choice because of [SPECIFIC_REASON]... [GENTLE_GUIDANCE_TO_RECONSIDER]',
                tone_appropriate: {
                    grandmother: 'nurturing_correction',
                    fun: 'encouraging_correction',
                    neutral: 'patient_correction'
                }
            },
            incorrect_B: {
                pattern: 'Actually, [CHOICE] isn\'t the best answer because [DIFFERENT_EXPLANATION]. Consider how [CORRECT_OPTION] works in this context... [ALTERNATIVE_GUIDANCE]',
                tone_appropriate: {
                    grandmother: 'gentle_redirection',
                    fun: 'playful_redirection',
                    neutral: 'clear_redirection'
                }
            },
            incorrect: {
                pattern: '[CHOICE] isn\'t quite right, here\'s why... [BRIEF_EXPLANATION]. Think about how [CORRECT_OPTION] might be a better choice because of [SPECIFIC_REASON]... [GENTLE_GUIDANCE_TO_RECONSIDER]',
                tone_appropriate: {
                    grandmother: 'nurturing_correction',
                    fun: 'encouraging_correction',
                    neutral: 'patient_correction'
                }
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
     * Generate 3x3x3x3 format variants (81 total)
     */
    generate3x3x3x3Variants() {
        console.log('🎯 Generating 3x3x3x3 Format Variants');
        console.log(`📚 Topic: ${this.lessonTopic.title}`);
        
        const variants = [];
        const questions = ['question_1', 'question_2', 'question_3'];
        const answerChoices = ['choice_A', 'choice_B', 'choice_C'];
        const feedbackPaths = ['correct', 'incorrect_A', 'incorrect_B'];
        const fortuneElements = ['wisdom', 'discovery_paths', 'ul_generation'];
        
        // Generate all combinations: 3 × 3 × 3 × 3 = 81
        for (const question of questions) {
            for (const answerChoice of answerChoices) {
                for (const feedbackPath of feedbackPaths) {
                    for (const fortuneElement of fortuneElements) {
                        const variant = this.create3x3x3x3Variant(question, answerChoice, feedbackPath, fortuneElement, 'grandmother');
                        variants.push(variant);
                    }
                }
            }
        }
        
        console.log(`✅ Generated ${variants.length} 3x3x3x3 variants`);
        return variants;
    }

    /**
     * Generate 3x2x2x2 format variants (24 total)
     */
    generate3x2x2x2Variants() {
        console.log('🎯 Generating 3x2x2x2 Format Variants');
        console.log(`📚 Topic: ${this.lessonTopic.title}`);
        
        const variants = [];
        const questions = ['question_1', 'question_2', 'question_3'];
        const answerChoices = ['true', 'false'];
        const feedbackPaths = ['correct', 'incorrect'];
        const fortuneElements = ['wisdom', 'discovery_paths'];
        
        // Generate all combinations: 3 × 2 × 2 × 2 = 24
        for (const question of questions) {
            for (const answerChoice of answerChoices) {
                for (const feedbackPath of feedbackPaths) {
                    for (const fortuneElement of fortuneElements) {
                        const variant = this.create3x2x2x2Variant(question, answerChoice, feedbackPath, fortuneElement, 'grandmother');
                        variants.push(variant);
                    }
                }
            }
        }
        
        console.log(`✅ Generated ${variants.length} 3x2x2x2 variants`);
        return variants;
    }

    /**
     * Create a single 3x3x3x3 variant
     */
    create3x3x3x3Variant(question, answerChoice, feedbackPath, fortuneElement, tone) {
        const questionData = this.questionArchitecture[question];
        const feedbackData = this.feedbackSystem[feedbackPath];
        const toneData = this.tonePatterns[tone];
        const fortuneData = this.fortuneArchitecture[fortuneElement];
        
        return {
            format: '3x3x3x3',
            question: question,
            answerChoice: answerChoice,
            feedbackPath: feedbackPath,
            fortuneElement: fortuneElement,
            tone: tone,
            variantId: `${question}_${answerChoice}_${feedbackPath}_${fortuneElement}_${tone}`,
            
            // Question structure
            questionType: questionData.type,
            intrigueHook: questionData.intrigue_hook,
            complexity: questionData.complexity,
            contextBridge: questionData.context_bridge,
            
            // Feedback structure
            feedbackType: feedbackPath,
            feedbackPattern: feedbackData.pattern,
            feedbackTone: feedbackData.tone_appropriate[tone],
            
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
            content: this.generateVariantContent(question, answerChoice, feedbackPath, fortuneElement, tone),
            
            // Smart image mapping
            smartImage: this.getSmartImage(question, tone, feedbackPath),
            microExpression: this.getMicroExpression(question, tone, feedbackPath)
        };
    }

    /**
     * Create a single 3x2x2x2 variant
     */
    create3x2x2x2Variant(question, answerChoice, feedbackPath, fortuneElement, tone) {
        const questionData = this.questionArchitecture[question];
        const feedbackData = this.feedbackSystem[feedbackPath];
        const toneData = this.tonePatterns[tone];
        const fortuneData = this.fortuneArchitecture[fortuneElement];
        
        return {
            format: '3x2x2x2',
            question: question,
            answerChoice: answerChoice,
            feedbackPath: feedbackPath,
            fortuneElement: fortuneElement,
            tone: tone,
            variantId: `${question}_${answerChoice}_${feedbackPath}_${fortuneElement}_${tone}`,
            
            // Question structure (same as 3x3x3x3)
            questionType: questionData.type,
            intrigueHook: questionData.intrigue_hook,
            complexity: questionData.complexity,
            contextBridge: questionData.context_bridge,
            
            // Feedback structure (simplified for True/False)
            feedbackType: feedbackPath,
            feedbackPattern: feedbackData.pattern,
            feedbackTone: feedbackData.tone_appropriate[tone],
            
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
            content: this.generateVariantContent(question, answerChoice, feedbackPath, fortuneElement, tone),
            
            // Smart image mapping
            smartImage: this.getSmartImage(question, tone, feedbackPath),
            microExpression: this.getMicroExpression(question, tone, feedbackPath)
        };
    }

    /**
     * Generate content for a specific variant
     */
    generateVariantContent(question, answerChoice, feedbackPath, fortuneElement, tone) {
        const questionData = this.questionArchitecture[question];
        const feedbackData = this.feedbackSystem[feedbackPath];
        const toneData = this.tonePatterns[tone];
        
        return {
            opening: this.generateOpening(toneData),
            question: this.generateQuestion(questionData, toneData),
            answerChoices: this.getAnswerChoices(questionData.type),
            feedback: this.generateFeedback(answerChoice, feedbackPath, toneData),
            fortune: this.generateFortune(fortuneElement, toneData)
        };
    }

    /**
     * Generate opening based on tone
     */
    generateOpening(toneData) {
        const topic = this.lessonTopic.title;
        
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
            selectionRules: this.getSelectionRules(questionData.type)
        };
    }

    /**
     * Get answer choices based on question type
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
     * Get selection rules based on question type
     */
    getSelectionRules(questionType) {
        switch (questionType) {
            case 'foundation':
                return 'Choose one answer';
            case 'application':
                return 'You can choose one, two, or all three';
            case 'synthesis':
                return 'Choose one answer';
            default:
                return 'Choose one answer';
        }
    }

    /**
     * Generate feedback based on answer choice, feedback path, and tone
     */
    generateFeedback(answerChoice, feedbackPath, toneData) {
        const topic = this.lessonTopic.title;
        const feedbackData = this.feedbackSystem[feedbackPath];
        
        let feedbackMessage = '';
        
        switch (feedbackPath) {
            case 'correct':
                feedbackMessage = `Exactly! You got it. ${answerChoice} is right because it represents the fundamental requirements of ${topic.toLowerCase()}. This may be important because understanding these basics helps you see how everything connects.`;
                break;
            case 'incorrect_A':
                feedbackMessage = `${answerChoice} isn't quite right, here's why... ${topic.toLowerCase()} actually needs multiple elements working together. Think about how the correct option might be a better choice because it represents the complete system... Let's reconsider together.`;
                break;
            case 'incorrect_B':
                feedbackMessage = `Actually, ${answerChoice} isn't the best answer because ${topic.toLowerCase()} operates as an integrated system. Consider how the correct option works in this context... There's always more to learn!`;
                break;
            default:
                feedbackMessage = `Let me explain why ${answerChoice} might not be the best choice...`;
        }
        
        return {
            type: feedbackPath,
            message: feedbackMessage,
            tone: feedbackData.tone_appropriate[toneData.feedback_style],
            pattern: feedbackData.pattern
        };
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
     * Get smart image for question, tone, and feedback path
     */
    getSmartImage(question, tone, feedbackPath) {
        const imageMapping = {
            question_1: {
                grandmother: {
                    correct: 'ken_early_childhood_fun_day28.jpg',
                    incorrect_A: 'sad-face try again mode.png',
                    incorrect_B: 'not-quite-try-again mode.png'
                },
                fun: {
                    correct: 'ken_youth_fun_day28.jpg',
                    incorrect_A: 'sad-face try again mode.png',
                    incorrect_B: 'not-quite-try-again mode.png'
                },
                neutral: {
                    correct: 'ken_young_adult_fun_day28.jpg',
                    incorrect_A: 'sad-face try again mode.png',
                    incorrect_B: 'not-quite-try-again mode.png'
                }
            },
            question_2: {
                grandmother: {
                    correct: 'question mode first.png',
                    incorrect_A: 'not-looking-thinking mode.png',
                    incorrect_B: 'neutral-face-try-again mode glasses on.png'
                },
                fun: {
                    correct: 'question mode first.png',
                    incorrect_A: 'not-looking-thinking mode.png',
                    incorrect_B: 'neutral-face-try-again mode glasses on.png'
                },
                neutral: {
                    correct: 'question mode first.png',
                    incorrect_A: 'not-looking-thinking mode.png',
                    incorrect_B: 'neutral-face-try-again mode glasses on.png'
                }
            },
            question_3: {
                grandmother: {
                    correct: 'ken/ken_neutral_default.png',
                    incorrect_A: 'ken/ken_neutral_default.png',
                    incorrect_B: 'ken/ken_neutral_default.png'
                },
                fun: {
                    correct: 'ken/ken_neutral_default.png',
                    incorrect_A: 'ken/ken_neutral_default.png',
                    incorrect_B: 'ken/ken_neutral_default.png'
                },
                neutral: {
                    correct: 'ken/ken_neutral_default.png',
                    incorrect_A: 'ken/ken_neutral_default.png',
                    incorrect_B: 'ken/ken_neutral_default.png'
                }
            }
        };
        
        return imageMapping[question]?.[tone]?.[feedbackPath] || 'ken_conclusion_day28.jpg';
    }

    /**
     * Get micro expression for question, tone, and feedback path
     */
    getMicroExpression(question, tone, feedbackPath) {
        const expressionMapping = {
            question_1: {
                grandmother: {
                    correct: 'gentle_celebration',
                    incorrect_A: 'nurturing_correction',
                    incorrect_B: 'gentle_redirection'
                },
                fun: {
                    correct: 'enthusiastic_celebration',
                    incorrect_A: 'encouraging_correction',
                    incorrect_B: 'playful_redirection'
                },
                neutral: {
                    correct: 'satisfied_acknowledgment',
                    incorrect_A: 'patient_correction',
                    incorrect_B: 'clear_redirection'
                }
            },
            question_2: {
                grandmother: {
                    correct: 'proud_teaching',
                    incorrect_A: 'thoughtful_guidance',
                    incorrect_B: 'gentle_explanation'
                },
                fun: {
                    correct: 'excited_teaching',
                    incorrect_A: 'encouraging_guidance',
                    incorrect_B: 'playful_explanation'
                },
                neutral: {
                    correct: 'clear_teaching',
                    incorrect_A: 'patient_guidance',
                    incorrect_B: 'informative_explanation'
                }
            },
            question_3: {
                grandmother: {
                    correct: 'proud_celebratory',
                    incorrect_A: 'gentle_encouragement',
                    incorrect_B: 'nurturing_guidance'
                },
                fun: {
                    correct: 'excited_celebratory',
                    incorrect_A: 'enthusiastic_encouragement',
                    incorrect_B: 'playful_guidance'
                },
                neutral: {
                    correct: 'satisfied_acknowledging',
                    incorrect_A: 'patient_encouragement',
                    incorrect_B: 'clear_guidance'
                }
            }
        };
        
        return expressionMapping[question]?.[tone]?.[feedbackPath] || 'neutral_professional';
    }

    /**
     * Generate summary of all variants
     */
    generateSummary() {
        const variants3x3x3x3 = this.generate3x3x3x3Variants();
        const variants3x2x2x2 = this.generate3x2x2x2Variants();
        
        const summary = {
            lessonDay: this.lessonDay,
            lessonTopic: this.lessonTopic.title,
            totalVariants: variants3x3x3x3.length + variants3x2x2x2.length,
            format3x3x3x3: {
                count: variants3x3x3x3.length,
                structure: '3 Questions × 3 Answer Choices × 3 Feedback Paths × 3 Fortune Elements'
            },
            format3x2x2x2: {
                count: variants3x2x2x2.length,
                structure: '3 Questions × 2 Answer Choices × 2 Feedback Paths × 2 Fortune Elements'
            },
            questionTypes: [...new Set(variants3x3x3x3.map(v => v.questionType))],
            tones: [...new Set(variants3x3x3x3.map(v => v.tone))],
            feedbackPaths: [...new Set(variants3x3x3x3.map(v => v.feedbackPath))],
            fortuneElements: [...new Set(variants3x3x3x3.map(v => v.fortuneElement))],
            uniqueImages: [...new Set([...variants3x3x3x3, ...variants3x2x2x2].map(v => v.smartImage))],
            microExpressions: [...new Set([...variants3x3x3x3, ...variants3x2x2x2].map(v => v.microExpression))]
        };
        
        console.log('📊 Variant Summary:');
        console.log(JSON.stringify(summary, null, 2));
        
        return summary;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CorrectedVariantGeneratorV2 };
}

// Browser-safe initialization
if (typeof window !== 'undefined') {
    // Make available globally for browser use
    window.CorrectedVariantGeneratorV2 = CorrectedVariantGeneratorV2;
    console.log('✅ CorrectedVariantGeneratorV2 loaded for browser use');
} 