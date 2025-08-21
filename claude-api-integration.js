/**
 * Claude API Integration for iLearn
 * Handles content generation with cost tracking and error handling
 */

class ClaudeAPIIntegration {
    constructor() {
        this.apiKey = null;
        this.baseURL = 'https://api.anthropic.com/v1/messages';
        this.costTracker = {
            inputTokens: 0,
            outputTokens: 0,
            totalCost: 0,
            requests: 0
        };
        this.rateLimiter = {
            requests: 0,
            lastReset: Date.now(),
            maxRequests: 100 // per minute
        };
    }

    /**
     * Initialize with API key
     */
    async initialize(apiKey) {
        this.apiKey = apiKey;
        console.log('🔑 Claude API initialized');
        return true;
    }

    /**
     * Generate content using Claude API
     */
    async generateContent(prompt, options = {}) {
        if (!this.apiKey) {
            throw new Error('Claude API not initialized');
        }

        // Check rate limits
        if (!this.checkRateLimit()) {
            throw new Error('Rate limit exceeded');
        }

        const requestBody = {
            model: options.model || 'claude-3-5-sonnet-20241022',
            max_tokens: options.maxTokens || 1000,
            temperature: options.temperature || 0.7,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        };

        try {
            console.log('🚀 Sending request to Claude API...');
            
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Claude API error: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            
            // Track costs
            this.trackCosts(data.usage);
            
            console.log('✅ Content generated successfully');
            return {
                content: data.content[0].text,
                usage: data.usage,
                cost: this.calculateCost(data.usage)
            };

        } catch (error) {
            console.error('❌ Claude API error:', error);
            throw error;
        }
    }

    /**
     * Generate variant content based on DNA structure
     */
    async generateVariantContent(lessonDay, lessonTopic, ageGroup, tone, contentType, questionType, choice, dnaStructure) {
        const prompt = this.buildVariantPrompt(lessonDay, lessonTopic, ageGroup, tone, contentType, questionType, choice, dnaStructure);
        
        return await this.generateContent(prompt, {
            maxTokens: 800,
            temperature: 0.8
        });
    }

    /**
     * Build prompt for variant generation
     */
    buildVariantPrompt(lessonDay, lessonTopic, ageGroup, tone, contentType, questionType, choice, dnaStructure) {
        const ageInfo = dnaStructure.ageGroups[ageGroup];
        const toneInfo = dnaStructure.tonePatterns[tone];
        const questionInfo = dnaStructure.questionStructure[questionType];

        return `
Create content for lesson ${lessonDay} about "${lessonTopic.title}" with the following specifications:

AGE GROUP: ${ageGroup}
- Concept Name: ${ageInfo.name}
- Core Metaphor: ${ageInfo.metaphor}
- Complexity Level: ${ageInfo.complexity}
- Attention Span: ${ageInfo.attention}
- Cognitive Focus: ${ageInfo.focus}
- Vocabulary: ${ageInfo.vocabulary.join(', ')}

TONE: ${tone}
- Voice Character: ${toneInfo.name}
- Emotional Temperature: ${toneInfo.emotional}
- Language Patterns: ${JSON.stringify(toneInfo.patterns)}

CONTENT TYPE: ${contentType}
- Voice-Over Script: Narrated content for audio delivery
- On-Screen Text: Visual text displayed during lesson  
- Lesson Logic: Interactive elements and question structure

QUESTION TYPE: ${questionType}
- Concept Focus: ${questionInfo.concept}
- Universal Principle: ${questionInfo.principle}
- Cognitive Target: ${questionInfo.target}
- Choice: ${choice}

Please create content that:
1. Uses age-appropriate vocabulary and complexity
2. Matches the specified tone and voice character
3. Follows the content type structure
4. Incorporates the question type's universal principle
5. Maintains educational integrity while being engaging
6. Is suitable for the specified age group
7. Uses the tone's language patterns appropriately

Format the response as JSON with the following structure:
{
  "introduction": "Age-appropriate introduction",
  "mainContent": "Main lesson content",
  "examples": "Relevant examples",
  "reflection": "Thought-provoking reflection",
  "conclusion": "Engaging conclusion"
}
        `.trim();
    }

    /**
     * Generate daily fortune
     */
    async generateDailyFortune(lessonDay, lessonTopic, fortuneElements) {
        const prompt = `
Create a daily fortune for lesson ${lessonDay} about "${lessonTopic.title}" that includes:

Core Identity Shift: ${fortuneElements.core_identity_shift}
Skill Celebration: ${fortuneElements.skill_celebration}
Relationship Impact: ${fortuneElements.relationship_impact}
Universal Connection: ${fortuneElements.universal_connection}

The fortune should be inspiring and connect the lesson to the learner's life and the broader universe. Make it feel personal and meaningful.

Format as a single inspiring paragraph.
        `.trim();

        return await this.generateContent(prompt, {
            maxTokens: 200,
            temperature: 0.9
        });
    }

    /**
     * Track API usage and costs
     */
    trackCosts(usage) {
        this.costTracker.inputTokens += usage.input_tokens;
        this.costTracker.outputTokens += usage.output_tokens;
        this.costTracker.requests += 1;
        
        const cost = this.calculateCost(usage);
        this.costTracker.totalCost += cost;
        
        console.log(`💰 Cost tracked: $${cost.toFixed(4)} (${usage.input_tokens} input, ${usage.output_tokens} output tokens)`);
    }

    /**
     * Calculate cost based on usage
     */
    calculateCost(usage) {
        // Claude 3.5 Sonnet pricing (approximate)
        const inputCostPerMillion = 3.00; // $3 per million input tokens
        const outputCostPerMillion = 15.00; // $15 per million output tokens
        
        const inputCost = (usage.input_tokens / 1000000) * inputCostPerMillion;
        const outputCost = (usage.output_tokens / 1000000) * outputCostPerMillion;
        
        return inputCost + outputCost;
    }

    /**
     * Check rate limits
     */
    checkRateLimit() {
        const now = Date.now();
        const oneMinute = 60 * 1000;
        
        if (now - this.rateLimiter.lastReset > oneMinute) {
            this.rateLimiter.requests = 0;
            this.rateLimiter.lastReset = now;
        }
        
        if (this.rateLimiter.requests >= this.rateLimiter.maxRequests) {
            return false;
        }
        
        this.rateLimiter.requests += 1;
        return true;
    }

    /**
     * Get cost summary
     */
    getCostSummary() {
        return {
            totalRequests: this.costTracker.requests,
            totalInputTokens: this.costTracker.inputTokens,
            totalOutputTokens: this.costTracker.outputTokens,
            totalCost: this.costTracker.totalCost,
            averageCostPerRequest: this.costTracker.requests > 0 ? 
                this.costTracker.totalCost / this.costTracker.requests : 0
        };
    }

    /**
     * Reset cost tracking
     */
    resetCostTracking() {
        this.costTracker = {
            inputTokens: 0,
            outputTokens: 0,
            totalCost: 0,
            requests: 0
        };
        console.log('💰 Cost tracking reset');
    }

    /**
     * Estimate cost for generating all variants
     */
    estimateVariantCosts(totalVariants = 270) {
        const estimatedInputTokens = 500; // per variant
        const estimatedOutputTokens = 1000; // per variant
        
        const totalInputTokens = totalVariants * estimatedInputTokens;
        const totalOutputTokens = totalVariants * estimatedOutputTokens;
        
        const inputCost = (totalInputTokens / 1000000) * 3.00;
        const outputCost = (totalOutputTokens / 1000000) * 15.00;
        
        return {
            totalVariants,
            totalInputTokens,
            totalOutputTokens,
            estimatedCost: inputCost + outputCost,
            costPerVariant: (inputCost + outputCost) / totalVariants
        };
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.ClaudeAPIIntegration = ClaudeAPIIntegration;
}
if (typeof module !== 'undefined') {
    module.exports = { ClaudeAPIIntegration };
} 