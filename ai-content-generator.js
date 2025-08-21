/**
 * AI Content Generator for Universal Learning
 * Generates personalized lesson content based on age, tone, language, and DNA
 * This is the missing piece that makes the universal learning system actually work
 */

class AIContentGenerator {
    constructor() {
        this.claudeAPI = null;
        this.elevenLabs = null;
        this.generationCache = new Map();
        
        // Initialize AI integrations
        this.initializeAI();
    }

    async initializeAI() {
        console.log('🤖 Initializing AI integrations...');
        
        // Initialize Claude API for content generation
        if (typeof ClaudeAPI !== 'undefined') {
            this.claudeAPI = new ClaudeAPI();
            console.log('✅ Claude API initialized for content generation');
        } else {
            console.log('⚠️ Claude API not available, using fallback generation');
        }
        
        // Initialize ElevenLabs for voice synthesis
        if (typeof ElevenLabsIntegration !== 'undefined') {
            this.elevenLabs = new ElevenLabsIntegration();
            console.log('✅ ElevenLabs initialized for voice synthesis');
        } else {
            console.log('⚠️ ElevenLabs not available, using fallback audio');
        }
        
        console.log('✅ AI initialization complete');
    }

    /**
     * MAIN METHOD: Generate complete personalized lesson
     */
    async generatePersonalizedLesson(lessonData, variant, dnaData = null) {
        const { age, tone, language, avatar } = variant;
        const generationId = this.generateId();
        
        console.log(`🎨 Generating personalized lesson for ${age}, ${tone}, ${language}, ${avatar}`);
        
        try {
            // Step 1: Generate lesson structure based on DNA or curriculum
            const lessonStructure = await this.generateLessonStructure(lessonData, dnaData, age, tone);
            
            // Step 2: Generate personalized content for each phase
            const personalizedContent = await this.generatePhaseContent(lessonStructure, variant);
            
            // Step 3: Generate audio scripts for voice synthesis
            const audioScripts = await this.generateAudioScripts(personalizedContent, variant);
            
            // Step 4: Create complete lesson object with phases
            const completeLesson = {
                lesson_metadata: {
                    lesson_id: lessonData.title?.toLowerCase().replace(/\s+/g, '_') || 'daily_lesson',
                    title: lessonData.title,
                    learning_objective: lessonData.learning_objective,
                    generated_at: new Date().toISOString(),
                    generation_id: generationId,
                    variant: variant
                },
                phases: {
                    opening: personalizedContent.opening || 'Welcome to today\'s lesson!',
                    question_1: personalizedContent.questions?.[0] || 'What have you learned today?',
                    question_2: personalizedContent.questions?.[1] || 'How can you apply this knowledge?',
                    question_3: personalizedContent.questions?.[2] || 'What questions do you have?',
                    closing: personalizedContent.conclusion || 'Great job! You\'ve learned something new today.'
                },
                scripts: audioScripts,
                content: personalizedContent,
                dna_data: dnaData,
                production_notes: {
                    age_group: age,
                    tone: tone,
                    language: language,
                    avatar: avatar,
                    estimated_duration: this.calculateDuration(audioScripts),
                    complexity_level: this.calculateComplexity(age),
                    engagement_indicators: this.calculateEngagement(age, tone)
                }
            };
            
            console.log(`✅ Personalized lesson generated: ${generationId}`);
            return completeLesson;
            
        } catch (error) {
            console.error(`❌ Failed to generate personalized lesson:`, error);
            throw error;
        }
    }

    /**
     * Generate lesson structure based on DNA or curriculum
     */
    async generateLessonStructure(lessonData, dnaData, age, tone) {
        if (dnaData) {
            // Use DNA structure if available
            return this.generateFromDNA(dnaData, age, tone);
        } else {
            // Generate from curriculum data
            return this.generateFromCurriculum(lessonData, age, tone);
        }
    }

    /**
     * Generate content from DNA structure
     */
    generateFromDNA(dnaData, age, tone) {
        const ageGroup = this.mapAgeToGroup(age);
        const ageExpressions = dnaData.age_expressions?.[ageGroup] || {};
        const toneDelivery = dnaData.tone_delivery_dna?.[tone] || {};
        
        return {
            opening: {
                hook: ageExpressions.opening_hook || toneDelivery.opening_hook || "Welcome to today's learning adventure!",
                context: ageExpressions.context_setting || toneDelivery.context_setting || "Let's explore something amazing together.",
                objective: ageExpressions.learning_objective || toneDelivery.learning_objective || "Today we'll discover new things!"
            },
            questions: [
                {
                    question: ageExpressions.question_1 || toneDelivery.question_1 || "What interests you most about this topic?",
                    choices: ageExpressions.choices_1 || toneDelivery.choices_1 || ["I want to learn more", "I'm curious", "Tell me more"],
                    feedback: ageExpressions.feedback_1 || toneDelivery.feedback_1 || "Great thinking! Let's explore further."
                },
                {
                    question: ageExpressions.question_2 || toneDelivery.question_2 || "How does this connect to your life?",
                    choices: ageExpressions.choices_2 || toneDelivery.choices_2 || ["It helps me understand", "I see connections", "I'm learning"],
                    feedback: ageExpressions.feedback_2 || toneDelivery.feedback_2 || "Excellent connections! You're making great insights."
                },
                {
                    question: ageExpressions.question_3 || toneDelivery.question_3 || "What would you like to explore next?",
                    choices: ageExpressions.choices_3 || toneDelivery.choices_3 || ["More about this topic", "Related subjects", "Practical applications"],
                    feedback: ageExpressions.feedback_3 || toneDelivery.feedback_3 || "Wonderful curiosity! Your learning journey continues."
                }
            ],
            closing: {
                summary: ageExpressions.closing_summary || toneDelivery.closing_summary || "You've learned something amazing today!",
                reflection: ageExpressions.reflection_prompt || toneDelivery.reflection_prompt || "Think about what you discovered.",
                encouragement: ageExpressions.encouragement || toneDelivery.encouragement || "Keep exploring and asking questions!"
            },
            fortune: ageExpressions.daily_fortune || toneDelivery.daily_fortune || "Your curiosity is your superpower. Keep learning and growing!"
        };
    }

    /**
     * Generate content from curriculum data
     */
    async generateFromCurriculum(lessonData, age, tone) {
        const prompt = this.buildCurriculumPrompt(lessonData, age, tone);
        
        if (this.claudeAPI) {
            try {
                const response = await this.claudeAPI.generateContent(prompt);
                return this.parseCurriculumResponse(response);
            } catch (error) {
                console.warn('Claude API failed, using fallback generation');
            }
        }
        
        // Fallback generation
        return this.generateFallbackStructure(lessonData, age, tone);
    }

    /**
     * Build AI prompt for curriculum-based generation
     */
    buildCurriculumPrompt(lessonData, age, tone) {
        const ageContext = this.getAgeContext(age);
        const toneContext = this.getToneContext(tone);
        
        return `Generate a personalized lesson about "${lessonData.title}" with learning objective: "${lessonData.learning_objective}".

Requirements:
- Age group: ${ageContext}
- Tone: ${toneContext}
- Include 5 phases: opening, question_1, question_2, question_3, closing
- Each question should have 3 choices and feedback
- Include a daily fortune
- Make it engaging and age-appropriate
- Use natural, conversational language

Format the response as JSON with this structure:
{
  "opening": {"hook": "...", "context": "...", "objective": "..."},
  "questions": [
    {"question": "...", "choices": ["...", "...", "..."], "feedback": "..."},
    {"question": "...", "choices": ["...", "...", "..."], "feedback": "..."},
    {"question": "...", "choices": ["...", "...", "..."], "feedback": "..."}
  ],
  "closing": {"summary": "...", "reflection": "...", "encouragement": "..."},
  "fortune": "..."
}`;
    }

    /**
     * Generate phase content with personalization
     */
    async generatePhaseContent(lessonStructure, variant) {
        const { age, tone, language, avatar } = variant;
        
        return {
            opening: {
                voice_script: this.personalizeContent(lessonStructure.opening.hook, variant),
                on_screen_text: this.personalizeContent(lessonStructure.opening.context, variant),
                avatar_expression: this.getAvatarExpression(tone),
                duration: this.calculatePhaseDuration('opening', age)
            },
            questions: lessonStructure.questions.map((question, index) => ({
                question_script: this.personalizeContent(question.question, variant),
                choices: question.choices.map(choice => this.personalizeContent(choice, variant)),
                feedback: this.personalizeContent(question.feedback, variant),
                avatar_expression: this.getQuestionExpression(index, tone),
                duration: this.calculatePhaseDuration('question', age)
            })),
            closing: {
                voice_script: this.personalizeContent(lessonStructure.closing.summary, variant),
                on_screen_text: this.personalizeContent(lessonStructure.closing.encouragement, variant),
                avatar_expression: this.getAvatarExpression(tone),
                duration: this.calculatePhaseDuration('closing', age)
            },
            fortune: {
                voice_script: this.personalizeContent(lessonStructure.fortune, variant),
                on_screen_text: this.personalizeContent(lessonStructure.fortune, variant),
                avatar_expression: 'happy_celebrating',
                duration: this.calculatePhaseDuration('fortune', age)
            }
        };
    }

    /**
     * Generate audio scripts for voice synthesis
     */
    async generateAudioScripts(content, variant) {
        const scripts = [];
        
        // Opening script
        scripts.push({
            type: 'opening',
            script: content.opening.voice_script,
            avatar: variant.avatar,
            expression: content.opening.avatar_expression,
            duration: content.opening.duration,
            language: variant.language,
            tone: variant.tone
        });
        
        // Question scripts
        content.questions.forEach((question, index) => {
            scripts.push({
                type: `question_${index + 1}`,
                script: question.question_script,
                avatar: variant.avatar,
                expression: question.avatar_expression,
                duration: question.duration,
                language: variant.language,
                tone: variant.tone,
                choices: question.choices,
                feedback: question.feedback
            });
        });
        
        // Closing script
        scripts.push({
            type: 'closing',
            script: content.closing.voice_script,
            avatar: variant.avatar,
            expression: content.closing.avatar_expression,
            duration: content.closing.duration,
            language: variant.language,
            tone: variant.tone
        });
        
        // Fortune script
        scripts.push({
            type: 'daily_fortune',
            script: content.fortune.voice_script,
            avatar: variant.avatar,
            expression: content.fortune.avatar_expression,
            duration: content.fortune.duration,
            language: variant.language,
            tone: variant.tone
        });
        
        return scripts;
    }

    /**
     * Personalize content based on variant
     */
    personalizeContent(content, variant) {
        const { age, tone, language, avatar } = variant;
        
        // Age-appropriate language
        let personalized = this.adaptForAge(content, age);
        
        // Tone adaptation
        personalized = this.adaptForTone(personalized, tone);
        
        // Language adaptation (if not English)
        if (language !== 'english') {
            personalized = this.translateContent(personalized, language);
        }
        
        // Avatar personalization
        personalized = this.adaptForAvatar(personalized, avatar);
        
        return personalized;
    }

    /**
     * Age-specific content adaptation
     */
    adaptForAge(content, age) {
        const ageGroup = this.mapAgeToGroup(age);
        
        switch (ageGroup) {
            case 'early_childhood':
                return this.simplifyForYoungChildren(content);
            case 'youth':
                return this.adaptForYouth(content);
            case 'young_adult':
                return this.adaptForYoungAdults(content);
            case 'midlife':
                return this.adaptForMidlife(content);
            case 'wisdom_years':
                return this.adaptForWisdomYears(content);
            default:
                return content;
        }
    }

    /**
     * Tone-specific content adaptation
     */
    adaptForTone(content, tone) {
        switch (tone) {
            case 'grandmother':
                return this.addGrandmotherWarmth(content);
            case 'fun':
                return this.addFunEnergy(content);
            case 'neutral':
                return this.keepNeutral(content);
            default:
                return content;
        }
    }

    // Helper methods for content adaptation
    simplifyForYoungChildren(content) {
        return content
            .replace(/complex/g, 'simple')
            .replace(/advanced/g, 'basic')
            .replace(/sophisticated/g, 'fun');
    }

    adaptForYouth(content) {
        return content
            .replace(/you should/g, 'you might want to')
            .replace(/you must/g, 'you could try');
    }

    adaptForYoungAdults(content) {
        return content
            .replace(/simple/g, 'straightforward')
            .replace(/basic/g, 'fundamental');
    }

    adaptForMidlife(content) {
        return content
            .replace(/new/g, 'valuable')
            .replace(/simple/g, 'practical');
    }

    adaptForWisdomYears(content) {
        return content
            .replace(/new/g, 'meaningful')
            .replace(/simple/g, 'profound');
    }

    addGrandmotherWarmth(content) {
        return content
            .replace(/Hello/g, 'Hello, dear')
            .replace(/Welcome/g, 'Welcome, sweetheart')
            .replace(/Great/g, 'Wonderful, dear');
    }

    addFunEnergy(content) {
        return content
            .replace(/Hello/g, 'Hey there!')
            .replace(/Welcome/g, 'Welcome to the fun!')
            .replace(/Great/g, 'Awesome!');
    }

    keepNeutral(content) {
        return content; // Keep as is
    }

    // Utility methods
    mapAgeToGroup(age) {
        const ageNum = parseInt(age.replace('age_', ''));
        if (ageNum <= 5) return 'early_childhood';
        if (ageNum <= 12) return 'youth';
        if (ageNum <= 25) return 'young_adult';
        if (ageNum <= 60) return 'midlife';
        return 'wisdom_years';
    }

    getAgeContext(age) {
        const ageNum = parseInt(age.replace('age_', ''));
        if (ageNum <= 5) return 'young children (ages 2-5)';
        if (ageNum <= 12) return 'children (ages 6-12)';
        if (ageNum <= 25) return 'young adults (ages 13-25)';
        if (ageNum <= 60) return 'adults (ages 26-60)';
        return 'older adults (ages 60+)';
    }

    getToneContext(tone) {
        switch (tone) {
            case 'grandmother': return 'warm, nurturing, and caring';
            case 'fun': return 'energetic, playful, and exciting';
            case 'neutral': return 'clear, direct, and balanced';
            default: return 'neutral';
        }
    }

    getAvatarExpression(tone) {
        switch (tone) {
            case 'grandmother': return 'warm_smiling';
            case 'fun': return 'happy_celebrating';
            case 'neutral': return 'neutral_default';
            default: return 'neutral_default';
        }
    }

    getQuestionExpression(index, tone) {
        const expressions = ['question_curious', 'teaching_explaining', 'concerned_thinking'];
        return expressions[index % expressions.length];
    }

    calculatePhaseDuration(phase, age) {
        const baseDuration = {
            opening: 30,
            question: 45,
            closing: 25,
            fortune: 15
        };
        
        const ageMultiplier = this.getAgeMultiplier(age);
        return Math.round(baseDuration[phase] * ageMultiplier);
    }

    getAgeMultiplier(age) {
        const ageNum = parseInt(age.replace('age_', ''));
        if (ageNum <= 5) return 1.5; // Slower for young children
        if (ageNum <= 12) return 1.2; // Slightly slower for children
        if (ageNum <= 25) return 1.0; // Normal speed
        if (ageNum <= 60) return 0.9; // Slightly faster for adults
        return 0.8; // Faster for older adults
    }

    calculateDuration(scripts) {
        return scripts.reduce((total, script) => total + (script.duration || 30), 0);
    }

    calculateComplexity(age) {
        const ageNum = parseInt(age.replace('age_', ''));
        if (ageNum <= 5) return 'very_simple';
        if (ageNum <= 12) return 'simple';
        if (ageNum <= 25) return 'moderate';
        if (ageNum <= 60) return 'complex';
        return 'very_complex';
    }

    calculateEngagement(age, tone) {
        const ageEngagement = this.getAgeEngagement(age);
        const toneEngagement = this.getToneEngagement(tone);
        return Math.round((ageEngagement + toneEngagement) / 2);
    }

    getAgeEngagement(age) {
        const ageNum = parseInt(age.replace('age_', ''));
        if (ageNum <= 5) return 95; // Very high for young children
        if (ageNum <= 12) return 85; // High for children
        if (ageNum <= 25) return 75; // Moderate for young adults
        if (ageNum <= 60) return 65; // Lower for adults
        return 55; // Lower for older adults
    }

    getToneEngagement(tone) {
        switch (tone) {
            case 'grandmother': return 80;
            case 'fun': return 90;
            case 'neutral': return 70;
            default: return 70;
        }
    }

    translateContent(content, language) {
        // Placeholder for translation logic
        // In real implementation, this would use translation API
        return content;
    }

    adaptForAvatar(content, avatar) {
        // Placeholder for avatar-specific adaptations
        return content;
    }

    generateId() {
        return `aicg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Fallback methods
    generateFallbackStructure(lessonData, age, tone) {
        return {
            opening: {
                hook: `Welcome to today's lesson about ${lessonData.title}!`,
                context: `Let's explore ${lessonData.title} together.`,
                objective: `Today we'll learn about ${lessonData.learning_objective}.`
            },
            questions: [
                {
                    question: `What do you think about ${lessonData.title}?`,
                    choices: ["It's interesting", "I want to learn more", "I'm curious"],
                    feedback: "Great thinking! Let's explore further."
                },
                {
                    question: "How does this connect to your life?",
                    choices: ["It helps me understand", "I see connections", "I'm learning"],
                    feedback: "Excellent connections! You're making great insights."
                },
                {
                    question: "What would you like to explore next?",
                    choices: ["More about this topic", "Related subjects", "Practical applications"],
                    feedback: "Wonderful curiosity! Your learning journey continues."
                }
            ],
            closing: {
                summary: `You've learned something amazing about ${lessonData.title}!`,
                reflection: "Think about what you discovered today.",
                encouragement: "Keep exploring and asking questions!"
            },
            fortune: "Your curiosity is your superpower. Keep learning and growing!"
        };
    }

    parseCurriculumResponse(response) {
        try {
            return JSON.parse(response);
        } catch (error) {
            console.warn('Failed to parse AI response, using fallback');
            return null;
        }
    }
}

// Initialize the AI content generator
if (typeof window !== 'undefined') {
    window.aiContentGenerator = new AIContentGenerator();
    console.log('✅ AI Content Generator initialized');
} 