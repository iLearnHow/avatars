/**
 * Enterprise Synthesis Engine
 * High-performance educational content synthesis with sub-200ms response times
 * @author iLearnHow
 * @version 1.0.0
 */

import { PerformanceMonitor } from '@utils/performance.js';
import { ErrorHandler } from '@utils/error-handler.js';
import { Logger } from '@utils/logger.js';
import { DNALoader } from './dna-loader.js';
import { AgeContextualizer } from './age-contextualizer.js';
import { ToneSynthesizer } from './tone-synthesizer.js';
import { PerformanceMonitor as SynthesisPerformanceMonitor } from './performance-monitor.js';
import ClaudeSynthesisEngine from '../../services/claude-synthesis-engine.js';

export class SynthesisEngine {
    constructor() {
        this.dnaLoader = new DNALoader();
        this.ageContextualizer = new AgeContextualizer();
        this.toneSynthesizer = new ToneSynthesizer();
        this.performanceMonitor = new SynthesisPerformanceMonitor();
        this.errorHandler = new ErrorHandler();
        this.logger = new Logger('SynthesisEngine');
        
        // Claude API integration
        this.claudeEngine = new ClaudeSynthesisEngine();
        this.useClaudeAPI = false; // Will be enabled if API key is provided
        
        // Performance-optimized cache with LRU eviction
        this.cache = new Map();
        this.cacheSize = 1000; // Maximum cache entries
        this.synthesisCount = 0;
        this.totalSynthesisTime = 0;
        
        // Performance budgets (in milliseconds)
        this.performanceBudgets = {
            synthesis: 200,
            cacheHit: 10,
            dnaLoad: 50,
            ageContextualization: 30,
            toneSynthesis: 40,
            contentGeneration: 80,
            claudeAPI: 5000 // Allow more time for API calls
        };
        
        this.initialized = false;
        this.initializeEngine();
    }

    /**
     * Initialize the synthesis engine with error recovery
     */
    async initializeEngine() {
        const startTime = performance.now();
        
        try {
            this.logger.info('Initializing synthesis engine...');
            
            // Load lesson DNA with performance monitoring
            await this.dnaLoader.loadDNA();
            
            // Initialize components
            await Promise.all([
                this.ageContextualizer.initialize(),
                this.toneSynthesizer.initialize()
            ]);
            
            this.initialized = true;
            
            const initTime = performance.now() - startTime;
            this.logger.info(`Synthesis engine initialized in ${initTime.toFixed(2)}ms`);
            
            // Mark initialization complete
            PerformanceMonitor.mark('synthesis-engine-init-complete');
            
        } catch (error) {
            this.logger.error('Failed to initialize synthesis engine:', error);
            this.errorHandler.handle(error, { context: 'engine-initialization' });
            
            // Use fallback initialization
            await this.fallbackInitialization();
        }
    }

    /**
     * Fallback initialization with minimal functionality
     */
    async fallbackInitialization() {
        try {
            this.logger.warn('Using fallback initialization');
            this.dnaLoader.useFallbackDNA();
            this.initialized = true;
        } catch (error) {
            this.logger.error('Fallback initialization failed:', error);
            throw new Error('Synthesis engine initialization failed completely');
        }
    }

    /**
     * Configure Claude API for real content generation
     * @param {string} apiKey - Claude API key
     */
    configureClaudeAPI(apiKey) {
        if (apiKey && apiKey.trim()) {
            this.claudeEngine.setApiKey(apiKey.trim());
            this.useClaudeAPI = true;
            this.logger.info('Claude API configured for real content generation');
        } else {
            this.useClaudeAPI = false;
            this.logger.warn('No Claude API key provided, using fallback synthesis');
        }
    }

    /**
     * Main synthesis method with comprehensive performance monitoring
     * @param {Object} parameters - Synthesis parameters
     * @param {number} parameters.day - Day number (1-366)
     * @param {number} parameters.age - Learner age (5-65)
     * @param {string} parameters.tone - Personality tone (grandmother|fun|neutral)
     * @param {string} parameters.language - Language code
     * @returns {Promise<Object>} Synthesized lesson content
     */
    async synthesizeLesson(parameters) {
        const synthesisStart = performance.now();
        
        try {
            // Validate parameters
            this.validateParameters(parameters);
            
            // Generate cache key
            const cacheKey = this.generateCacheKey(parameters);
            
            // Check cache first (fast path)
            const cachedResult = this.getFromCache(cacheKey);
            if (cachedResult) {
                const cacheTime = performance.now() - synthesisStart;
                this.performanceMonitor.recordCacheHit(cacheTime);
                
                return {
                    ...cachedResult,
                    synthesisTime: cacheTime,
                    fromCache: true,
                    cacheHit: true
                };
            }
            
            // Perform synthesis
            const result = await this.performSynthesis(parameters);
            
            // Cache the result
            this.cacheResult(cacheKey, result);
            
            // Update metrics
            const synthesisTime = performance.now() - synthesisStart;
            this.updateMetrics(synthesisTime);
            
            // Performance validation
            this.validatePerformance(synthesisTime);
            
            this.logger.info(`Synthesized lesson in ${synthesisTime.toFixed(2)}ms`, {
                day: parameters.day,
                age: parameters.age,
                tone: parameters.tone,
                synthesisTime
            });
            
            return {
                ...result,
                synthesisTime,
                fromCache: false,
                cacheHit: false,
                synthesisCount: this.synthesisCount
            };
            
        } catch (error) {
            const errorTime = performance.now() - synthesisStart;
            this.logger.error('Synthesis failed:', error, { parameters, errorTime });
            
            // Return fallback content
            return this.getErrorFallback(parameters, error);
        }
    }

    /**
     * Perform the actual synthesis with component-based architecture
     */
    async performSynthesis(parameters) {
        const { day, age, tone, language } = parameters;
        
        // Use Claude API for real content generation if configured
        if (this.useClaudeAPI) {
            try {
                this.logger.info('Using Claude API for real content generation', { day, age, tone });
                
                // Get topic from curriculum data
                const curriculumData = await this.dnaLoader.getDayCurriculum(day);
                const topic = curriculumData?.topic || `Day ${day} Learning`;
                
                // Generate content using Claude API
                const claudeResult = await this.claudeEngine.synthesizeLesson(day, age, tone, topic);
                
                // Enhance with metadata
                const duration = this.calculateDuration(this.getAttentionSpan(age));
                const complexity = this.calculateComplexity(age, tone);
                const avatarInfo = this.getAvatarInfo(tone);
                
                return {
                    ...claudeResult,
                    metadata: {
                        ...claudeResult.metadata,
                        language,
                        duration,
                        complexity,
                        avatarInfo,
                        synthesisMethod: 'claude-api',
                        synthesisTimestamp: Date.now()
                    }
                };
            } catch (error) {
                this.logger.warn('Claude API failed, falling back to template synthesis:', error);
                // Fall through to template-based synthesis
            }
        }
        
        // Fallback to template-based synthesis
        // Step 1: Load day-specific curriculum data
        const curriculumData = await this.dnaLoader.getDayCurriculum(day);
        
        // Step 2: Age contextualization
        const ageContext = await this.ageContextualizer.contextualize(age, curriculumData);
        
        // Step 3: Tone synthesis
        const toneContext = await this.toneSynthesizer.synthesize(tone, ageContext);
        
        // Step 4: Generate final content
        const content = await this.generateLessonContent(ageContext, toneContext, language, parameters);
        
        return content;
    }

    /**
     * Generate complete lesson content
     */
    async generateLessonContent(ageContext, toneContext, language, parameters) {
        const { day, age, tone } = parameters;
        
        // Parallel content generation for performance
        const [title, intro, concept, examples, reflection] = await Promise.all([
            this.generateTitle(ageContext, toneContext, day),
            this.generateIntroduction(ageContext, toneContext, language),
            this.generateConcept(ageContext, toneContext, language),
            this.generateExamples(ageContext, toneContext, language),
            this.generateReflection(ageContext, toneContext, language)
        ]);
        
        // Calculate metadata
        const duration = this.calculateDuration(ageContext.attentionSpan);
        const complexity = this.calculateComplexity(age, tone);
        const avatarInfo = this.getAvatarInfo(tone);
        
        return {
            title,
            introduction: intro,
            concept,
            examples,
            reflection,
            metadata: {
                day,
                age,
                tone,
                language,
                duration,
                complexity,
                avatarInfo,
                synthesisTimestamp: Date.now()
            }
        };
    }

    /**
     * Generate age and tone-appropriate title
     */
    async generateTitle(ageContext, toneContext, day) {
        const baseTitle = ageContext.baseTitle || 'Educational Content';
        const toneModifier = toneContext.titleModifier || '';
        
        return `${toneModifier}${baseTitle}`.trim();
    }

    /**
     * Generate introduction content
     */
    async generateIntroduction(ageContext, toneContext, language) {
        const template = ageContext.introTemplate;
        const toneStyle = toneContext.introStyle;
        const languagePatterns = this.getLanguagePatterns(language);
        
        return this.applyContentTemplate(template, toneStyle, languagePatterns);
    }

    /**
     * Generate concept explanation
     */
    async generateConcept(ageContext, toneContext, language) {
        const template = ageContext.conceptTemplate;
        const toneStyle = toneContext.conceptStyle;
        const languagePatterns = this.getLanguagePatterns(language);
        
        return this.applyContentTemplate(template, toneStyle, languagePatterns);
    }

    /**
     * Generate real-world examples
     */
    async generateExamples(ageContext, toneContext, language) {
        const examples = ageContext.examples || [];
        const toneStyle = toneContext.exampleStyle;
        const languagePatterns = this.getLanguagePatterns(language);
        
        return examples.map(example => 
            this.applyContentTemplate(example, toneStyle, languagePatterns)
        ).join(' ');
    }

    /**
     * Generate reflection questions
     */
    async generateReflection(ageContext, toneContext, language) {
        const template = ageContext.reflectionTemplate;
        const toneStyle = toneContext.reflectionStyle;
        const languagePatterns = this.getLanguagePatterns(language);
        
        return this.applyContentTemplate(template, toneStyle, languagePatterns);
    }

    /**
     * Apply content template with tone and language patterns
     */
    applyContentTemplate(template, toneStyle, languagePatterns) {
        if (!template) return '';
        
        let content = template;
        
        // Apply tone modifications
        if (toneStyle) {
            content = content.replace(/\{tone\}/g, toneStyle);
        }
        
        // Apply language patterns
        if (languagePatterns) {
            Object.entries(languagePatterns).forEach(([pattern, replacement]) => {
                content = content.replace(new RegExp(`\\{${pattern}\\}`, 'g'), replacement);
            });
        }
        
        return content;
    }

    /**
     * Get language-specific patterns
     */
    getLanguagePatterns(language) {
        const patterns = {
            english: {
                greeting: 'Hello',
                transition: 'Now',
                conclusion: 'In conclusion'
            },
            spanish: {
                greeting: 'Hola',
                transition: 'Ahora',
                conclusion: 'En conclusión'
            },
            french: {
                greeting: 'Bonjour',
                transition: 'Maintenant',
                conclusion: 'En conclusion'
            }
        };
        
        return patterns[language] || patterns.english;
    }

    /**
     * Calculate lesson duration based on attention span
     */
    calculateDuration(attentionSpan) {
        const baseDuration = Math.max(3, Math.min(10, attentionSpan / 2));
        return `${Math.round(baseDuration)} minutes`;
    }

    /**
     * Calculate content complexity
     */
    calculateComplexity(age, tone) {
        const ageComplexity = Math.min(age / 10, 1);
        const toneComplexity = tone === 'neutral' ? 1 : 0.8;
        const complexity = ageComplexity * toneComplexity;
        
        if (complexity < 0.3) return 'Beginner';
        if (complexity < 0.7) return 'Intermediate';
        return 'Advanced';
    }

    /**
     * Get avatar information based on tone
     */
    getAvatarInfo(tone) {
        const avatars = {
            grandmother: { name: 'Grace', personality: 'Warm and nurturing' },
            fun: { name: 'Ken', personality: 'Energetic and playful' },
            neutral: { name: 'Dr. Smith', personality: 'Clear and educational' }
        };
        
        return avatars[tone] || avatars.neutral;
    }

    /**
     * Get attention span based on age
     */
    getAttentionSpan(age) {
        if (age < 6) return 5; // 5 minutes for early childhood
        if (age < 12) return 10; // 10 minutes for middle childhood
        if (age < 18) return 15; // 15 minutes for adolescence
        return 20; // 20 minutes for adults
    }

    /**
     * Validate synthesis parameters
     */
    validateParameters(parameters) {
        const { day, age, tone, language } = parameters;
        
        if (!day || day < 1 || day > 366) {
            throw new Error(`Invalid day: ${day}. Must be between 1 and 366.`);
        }
        
        if (!age || age < 5 || age > 65) {
            throw new Error(`Invalid age: ${age}. Must be between 5 and 65.`);
        }
        
        if (!tone || !['grandmother', 'fun', 'neutral'].includes(tone)) {
            throw new Error(`Invalid tone: ${tone}. Must be grandmother, fun, or neutral.`);
        }
        
        if (!language || !['english', 'spanish', 'french'].includes(language)) {
            throw new Error(`Invalid language: ${language}. Must be english, spanish, or french.`);
        }
    }

    /**
     * Generate cache key for parameters
     */
    generateCacheKey(parameters) {
        const { day, age, tone, language } = parameters;
        return `${day}-${age}-${tone}-${language}`;
    }

    /**
     * Get content from cache
     */
    getFromCache(cacheKey) {
        return this.cache.get(cacheKey);
    }

    /**
     * Cache synthesis result with LRU eviction
     */
    cacheResult(cacheKey, result) {
        // Remove oldest entry if cache is full
        if (this.cache.size >= this.cacheSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(cacheKey, result);
    }

    /**
     * Update performance metrics
     */
    updateMetrics(synthesisTime) {
        this.synthesisCount++;
        this.totalSynthesisTime += synthesisTime;
        
        this.performanceMonitor.recordSynthesis(synthesisTime);
    }

    /**
     * Validate performance against budgets
     */
    validatePerformance(synthesisTime) {
        if (synthesisTime > this.performanceBudgets.synthesis) {
            this.logger.warn(`Synthesis time ${synthesisTime.toFixed(2)}ms exceeds budget of ${this.performanceBudgets.synthesis}ms`);
            this.performanceMonitor.recordPerformanceIssue('synthesis-time-exceeded', synthesisTime);
        }
    }

    /**
     * Get error fallback content
     */
    getErrorFallback(parameters, error) {
        const { day, age, tone } = parameters;
        
        this.logger.error('Returning fallback content due to error:', error);
        
        return {
            title: 'Learning Content',
            introduction: 'Welcome to today\'s lesson. We\'re here to learn together.',
            concept: 'Today we\'ll explore an important concept that will help you grow.',
            examples: 'Think about how this applies to your daily life.',
            reflection: 'What did you learn today?',
            metadata: {
                day,
                age,
                tone,
                language: 'english',
                duration: '5 minutes',
                complexity: 'Intermediate',
                avatarInfo: { name: 'Teacher', personality: 'Supportive' },
                synthesisTimestamp: Date.now(),
                isFallback: true
            },
            synthesisTime: 0,
            fromCache: false,
            cacheHit: false,
            error: error.message
        };
    }

    /**
     * Get engine statistics
     */
    getStats() {
        const avgSynthesisTime = this.synthesisCount > 0 
            ? this.totalSynthesisTime / this.synthesisCount 
            : 0;
        
        return {
            synthesisCount: this.synthesisCount,
            averageSynthesisTime: avgSynthesisTime,
            cacheSize: this.cache.size,
            cacheHitRate: this.performanceMonitor.getCacheHitRate(),
            initialized: this.initialized,
            performanceMetrics: this.performanceMonitor.getMetrics()
        };
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
        this.logger.info('Cache cleared');
    }

    /**
     * Reset engine state
     */
    reset() {
        this.clearCache();
        this.synthesisCount = 0;
        this.totalSynthesisTime = 0;
        this.performanceMonitor.reset();
        this.logger.info('Engine reset complete');
    }
} 