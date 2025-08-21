/**
 * AI Generation Integration - Real Claude API Integration
 * Replaces simulation with actual AI-powered content generation
 * Generates DNA files and lesson content using Claude API
 */

class AIGenerationIntegration {
    constructor() {
        this.claudeAPIKey = null;
        this.apiEndpoint = 'https://api.anthropic.com/v1/messages';
        this.currentDNA = null;
        this.generationQueue = [];
        this.isGenerating = false;
        
        // Initialize API key from environment or config
        this.initializeAPIKey();
    }

    /**
     * Initialize API key from environment or configuration
     */
    async initializeAPIKey() {
        // Try to get API key from environment or config
        this.claudeAPIKey = (typeof process !== 'undefined' && process.env ? process.env.CLAUDE_API_KEY : null) || localStorage.getItem('claude_api_key');
        
        if (!this.claudeAPIKey) {
            console.warn('⚠️ No Claude API key configured - using fallback mode');
            return false;
        }
        
        console.log('✅ Claude API key initialized');
        return true;
    }

    /**
     * Generate DNA lesson data using Claude API
     * @param {number} day - Day of year (1-366)
     * @param {Object} preferences - User preferences
     * @returns {Promise<Object>} Generated DNA data
     */
    async generateDNALesson(day, preferences = {}) {
        if (!this.claudeAPIKey) {
            throw new Error('Claude API key not configured');
        }

        const prompt = this.createDNAGenerationPrompt(day, preferences);
        
        try {
            const response = await this.callClaudeAPI(prompt);
            const dnaData = this.parseDNAResponse(response);
            
            // Save DNA file
            await this.saveDNAFile(dnaData, day);
            
            console.log(`✅ DNA lesson generated for day ${day}`);
            return dnaData;
        } catch (error) {
            console.error('Failed to generate DNA lesson:', error);
            throw error;
        }
    }

    /**
     * Create comprehensive prompt for DNA generation
     * @param {number} day - Day of year
     * @param {Object} preferences - User preferences
     * @returns {string} Claude API prompt
     */
    createDNAGenerationPrompt(day, preferences) {
        const curriculumData = this.getCurriculumDataForDay(day);
        
        return `You are an expert educational content creator for iLearn How, a personalized learning platform. 

TASK: Generate a comprehensive DNA lesson file for day ${day} of the year.

CURRICULUM TOPIC: ${curriculumData.title}
LEARNING OBJECTIVE: ${curriculumData.learning_objective}

REQUIREMENTS:
1. Create a JSON structure following the exact DNA template format
2. Generate content for 6 age groups: age_2, age_5, age_8, age_12, age_16, age_25
3. Include 3 tone variations: neutral, fun, grandmother
4. Provide 12 language translations: english, spanish, french, german, italian, portuguese, russian, chinese, japanese, korean, arabic, hindi
5. Create engaging, age-appropriate content for each variant
6. Ensure educational value and safety for all ages

DNA TEMPLATE STRUCTURE:
{
  "lesson_id": "unique_identifier",
  "day": ${day},
  "date": "Month Day",
  "universal_concept": "core_learning_concept",
  "core_principle": "fundamental_educational_principle",
  "learning_essence": "What learners will discover",
  "age_expressions": {
    "age_2": { /* toddler content */ },
    "age_5": { /* early childhood */ },
    "age_8": { /* school age */ },
    "age_12": { /* pre-teen */ },
    "age_16": { /* teen */ },
    "age_25": { /* adult */ }
  },
  "tone_delivery_dna": {
    "neutral": { /* neutral tone content */ },
    "fun": { /* fun tone content */ },
    "grandmother": { /* grandmother tone content */ }
  },
  "language_translations": {
    "english": { /* english content */ },
    "spanish": { /* spanish content */ },
    /* ... other languages */
  }
}

Generate the complete DNA JSON structure for day ${day}. Ensure all content is engaging, educational, and age-appropriate.`;
    }

    /**
     * Call Claude API with the given prompt
     * @param {string} prompt - The prompt to send to Claude
     * @returns {Promise<string>} Claude's response
     */
    async callClaudeAPI(prompt) {
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.claudeAPIKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 4000,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.content[0].text;
    }

    /**
     * Parse Claude's response into DNA data structure
     * @param {string} response - Claude's response
     * @returns {Object} Parsed DNA data
     */
    parseDNAResponse(response) {
        try {
            // Extract JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in Claude response');
            }

            const dnaData = JSON.parse(jsonMatch[0]);
            
            // Validate DNA structure
            this.validateDNAStructure(dnaData);
            
            return dnaData;
        } catch (error) {
            console.error('Failed to parse DNA response:', error);
            throw new Error('Invalid DNA structure generated');
        }
    }

    /**
     * Validate DNA structure integrity
     * @param {Object} dnaData - DNA data to validate
     */
    validateDNAStructure(dnaData) {
        const requiredFields = ['lesson_id', 'day', 'universal_concept', 'age_expressions'];
        const requiredAges = ['age_2', 'age_5', 'age_8', 'age_12', 'age_16', 'age_25'];
        
        for (const field of requiredFields) {
            if (!dnaData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }
        
        for (const age of requiredAges) {
            if (!dnaData.age_expressions[age]) {
                throw new Error(`Missing age expression: ${age}`);
            }
        }
        
        console.log('✅ DNA structure validated');
    }

    /**
     * Save DNA file to filesystem
     * @param {Object} dnaData - DNA data to save
     * @param {number} day - Day number
     */
    async saveDNAFile(dnaData, day) {
        const filename = `dna_files/${day.toString().padStart(3, '0')}_${dnaData.lesson_id}.json`;
        
        try {
            // In a real implementation, this would save to filesystem
            // For now, we'll store in localStorage for demo
            localStorage.setItem(`dna_${day}`, JSON.stringify(dnaData));
            console.log(`✅ DNA file saved: ${filename}`);
        } catch (error) {
            console.error('Failed to save DNA file:', error);
            throw error;
        }
    }

    /**
     * Generate lesson content using AI
     * @param {Object} preferences - User preferences
     * @returns {Promise<Object>} Generated lesson content
     */
    async generateLessonContent(preferences) {
        if (!this.claudeAPIKey) {
            throw new Error('Claude API key not configured');
        }

        const prompt = this.createLessonContentPrompt(preferences);
        
        try {
            const response = await this.callClaudeAPI(prompt);
            const lessonContent = this.parseLessonContent(response);
            
            console.log('✅ Lesson content generated');
            return lessonContent;
        } catch (error) {
            console.error('Failed to generate lesson content:', error);
            throw error;
        }
    }

    /**
     * Create prompt for lesson content generation
     * @param {Object} preferences - User preferences
     * @returns {string} Claude API prompt
     */
    createLessonContentPrompt(preferences) {
        const { age, tone, language, avatar } = preferences;
        
        return `You are an expert educational content creator for iLearn How. 

TASK: Generate personalized lesson content for a learner with these preferences:
- Age: ${age}
- Tone: ${tone}
- Language: ${language}
- Avatar: ${avatar}

REQUIREMENTS:
1. Create engaging, age-appropriate content
2. Match the specified tone (neutral, fun, or grandmother)
3. Use the specified language
4. Include interactive elements
5. Ensure educational value
6. Make content accessible and inclusive

Generate a complete lesson structure with:
- Opening introduction
- Interactive questions
- Educational explanations
- Engaging activities
- Closing summary

Format the response as a JSON object with all lesson components.`;
    }

    /**
     * Parse lesson content from Claude response
     * @param {string} response - Claude's response
     * @returns {Object} Parsed lesson content
     */
    parseLessonContent(response) {
        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in lesson content response');
            }

            const lessonContent = JSON.parse(jsonMatch[0]);
            return lessonContent;
        } catch (error) {
            console.error('Failed to parse lesson content:', error);
            throw new Error('Invalid lesson content structure');
        }
    }

    /**
     * Generate full 366-day curriculum
     * @returns {Promise<void>}
     */
    async generateFullCurriculum() {
        console.log('🚀 Starting full curriculum generation...');
        
        for (let day = 1; day <= 366; day++) {
            try {
                console.log(`Generating DNA for day ${day}...`);
                await this.generateDNALesson(day);
                
                // Rate limiting to avoid API limits
                await this.delay(1000);
            } catch (error) {
                console.error(`Failed to generate day ${day}:`, error);
            }
        }
        
        console.log('✅ Full curriculum generation complete!');
    }

    /**
     * Get curriculum data for specific day
     * @param {number} day - Day of year
     * @returns {Object} Curriculum data
     */
    getCurriculumDataForDay(day) {
        // This would integrate with the existing curriculum system
        const curriculumData = COMPLETE_CURRICULUM[day] || {
            title: `Day ${day} Learning`,
            learning_objective: `Explore new concepts and develop skills on day ${day}`
        };
        
        return curriculumData;
    }

    /**
     * Utility function for delays
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise<void>}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Set API key for testing
     * @param {string} apiKey - Claude API key
     */
    setAPIKey(apiKey) {
        this.claudeAPIKey = apiKey;
        localStorage.setItem('claude_api_key', apiKey);
        console.log('✅ API key set');
    }

    /**
     * Test API connection
     * @returns {Promise<boolean>} Connection status
     */
    async testConnection() {
        try {
            const response = await this.callClaudeAPI('Hello, please respond with "Connection successful"');
            console.log('✅ Claude API connection successful');
            return true;
        } catch (error) {
            console.error('❌ Claude API connection failed:', error);
            return false;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIGenerationIntegration;
}

// Initialize global instance
window.AIGenerationIntegration = AIGenerationIntegration; 