/**
 * Tone Synthesizer - Personality-Based Content Adaptation
 * Applies authentic personality tones to educational content
 * @author iLearnHow
 * @version 1.0.0
 */

import { Logger } from '@utils/logger.js';
import { PerformanceMonitor } from '@utils/performance.js';

export class ToneSynthesizer {
    constructor() {
        this.logger = new Logger('ToneSynthesizer');
        this.initialized = false;
        
        // Personality tone definitions
        this.toneDefinitions = {
            grandmother: {
                name: 'Grace',
                personality: 'Warm and nurturing',
                voiceCharacteristics: {
                    pace: 'gentle',
                    vocabulary: 'comforting',
                    sentenceStructure: 'flowing',
                    emotionalTone: 'caring',
                    culturalElements: 'traditional',
                    metaphors: 'home-based',
                    questions: 'encouraging'
                },
                contentPatterns: {
                    titleModifier: 'Warm ',
                    introStyle: 'gentle and caring',
                    conceptStyle: 'patient and nurturing',
                    exampleStyle: 'relatable and comforting',
                    reflectionStyle: 'thoughtful and encouraging',
                    transitions: ['Now, dear', 'You see', 'Remember', 'Just like'],
                    affirmations: ['That\'s wonderful', 'You\'re doing great', 'I\'m so proud'],
                    culturalReferences: ['family', 'home', 'traditions', 'wisdom']
                }
            },
            fun: {
                name: 'Ken',
                personality: 'Energetic and playful',
                voiceCharacteristics: {
                    pace: 'dynamic',
                    vocabulary: 'exciting',
                    sentenceStructure: 'varied',
                    emotionalTone: 'enthusiastic',
                    culturalElements: 'modern',
                    metaphors: 'adventure-based',
                    questions: 'engaging'
                },
                contentPatterns: {
                    titleModifier: 'Amazing ',
                    introStyle: 'exciting and energetic',
                    conceptStyle: 'dynamic and engaging',
                    exampleStyle: 'cool and fascinating',
                    reflectionStyle: 'creative and inspiring',
                    transitions: ['Check this out!', 'Here\'s the cool part', 'Get ready', 'Boom!'],
                    affirmations: ['Awesome!', 'You\'ve got this!', 'That\'s incredible!'],
                    culturalReferences: ['technology', 'adventure', 'discovery', 'innovation']
                }
            },
            neutral: {
                name: 'Dr. Smith',
                personality: 'Clear and educational',
                voiceCharacteristics: {
                    pace: 'measured',
                    vocabulary: 'precise',
                    sentenceStructure: 'structured',
                    emotionalTone: 'objective',
                    culturalElements: 'universal',
                    metaphors: 'analytical',
                    questions: 'analytical'
                },
                contentPatterns: {
                    titleModifier: '',
                    introStyle: 'clear and educational',
                    conceptStyle: 'precise and informative',
                    exampleStyle: 'practical and relevant',
                    reflectionStyle: 'analytical and objective',
                    transitions: ['Furthermore', 'Additionally', 'Moreover', 'Consequently'],
                    affirmations: ['Correct', 'Accurate', 'Precise', 'Well-observed'],
                    culturalReferences: ['evidence', 'research', 'data', 'analysis']
                }
            }
        };
        
        // Tone-specific language patterns
        this.languagePatterns = {
            grandmother: {
                greetings: ['Hello dear', 'Welcome sweetheart', 'Come here', 'Let\'s sit together'],
                encouragements: ['You can do it', 'Take your time', 'That\'s the way', 'Wonderful job'],
                explanations: ['Let me tell you', 'You see', 'It\'s like this', 'Imagine if'],
                conclusions: ['There you go', 'See how that works', 'Isn\'t that nice', 'You\'ve got it']
            },
            fun: {
                greetings: ['Hey there!', 'What\'s up!', 'Ready to rock?', 'Let\'s do this!'],
                encouragements: ['You\'re crushing it!', 'Keep going!', 'That\'s the spirit!', 'Awesome work!'],
                explanations: ['Here\'s the deal', 'Check this out', 'Get this', 'Listen up'],
                conclusions: ['And that\'s how it\'s done!', 'Pretty cool, right?', 'You nailed it!', 'Mission accomplished!']
            },
            neutral: {
                greetings: ['Welcome', 'Good day', 'Let\'s begin', 'Today we\'ll examine'],
                encouragements: ['Well done', 'Excellent', 'Precise', 'Accurate'],
                explanations: ['To explain', 'Let me clarify', 'Consider this', 'Note that'],
                conclusions: ['In conclusion', 'Therefore', 'Thus', 'Consequently']
            }
        };
    }

    /**
     * Initialize the tone synthesizer
     */
    async initialize() {
        try {
            this.logger.info('Initializing tone synthesizer...');
            
            // Validate tone definitions
            this.validateToneDefinitions();
            
            this.initialized = true;
            this.logger.info('Tone synthesizer initialized successfully');
            
        } catch (error) {
            this.logger.error('Failed to initialize tone synthesizer:', error);
            throw error;
        }
    }

    /**
     * Synthesize content with specific tone
     * @param {string} tone - Personality tone (grandmother|fun|neutral)
     * @param {Object} ageContext - Age-contextualized content
     * @returns {Object} Tone-synthesized content
     */
    async synthesize(tone, ageContext) {
        const startTime = performance.now();
        
        try {
            if (!this.initialized) {
                throw new Error('Tone synthesizer not initialized');
            }
            
            if (!this.toneDefinitions[tone]) {
                throw new Error(`Invalid tone: ${tone}`);
            }
            
            const toneDefinition = this.toneDefinitions[tone];
            
            // Apply tone-specific adaptations
            const synthesized = {
                tone,
                personality: toneDefinition.personality,
                voiceCharacteristics: toneDefinition.voiceCharacteristics,
                titleModifier: toneDefinition.contentPatterns.titleModifier,
                introStyle: this.applyToneToIntro(ageContext.introTemplate, tone),
                conceptStyle: this.applyToneToConcept(ageContext.conceptTemplate, tone),
                exampleStyle: this.applyToneToExamples(ageContext.examples, tone),
                reflectionStyle: this.applyToneToReflection(ageContext.reflectionTemplate, tone),
                transitions: toneDefinition.contentPatterns.transitions,
                affirmations: toneDefinition.contentPatterns.affirmations,
                culturalReferences: toneDefinition.contentPatterns.culturalReferences,
                languagePatterns: this.languagePatterns[tone]
            };
            
            const synthesizeTime = performance.now() - startTime;
            this.logger.debug(`Tone synthesis completed in ${synthesizeTime.toFixed(2)}ms`, {
                tone,
                synthesizeTime
            });
            
            return synthesized;
            
        } catch (error) {
            this.logger.error('Tone synthesis failed:', error);
            return this.getFallbackToneSynthesis(tone, ageContext);
        }
    }

    /**
     * Apply tone to introduction content
     */
    applyToneToIntro(introTemplate, tone) {
        if (!introTemplate) return '';
        
        const tonePatterns = this.toneDefinitions[tone].contentPatterns;
        const languagePatterns = this.languagePatterns[tone];
        
        let intro = introTemplate;
        
        // Add tone-specific greeting
        const greeting = this.selectRandom(languagePatterns.greetings);
        intro = `${greeting}! ${intro}`;
        
        // Apply tone-specific modifications
        switch (tone) {
            case 'grandmother':
                intro = intro.replace(/\./g, ', dear.');
                intro = intro.replace(/\b(amazing|cool|awesome)\b/gi, 'wonderful');
                break;
            case 'fun':
                intro = intro.replace(/\./g, '!');
                intro = intro.replace(/\b(wonderful|nice|good)\b/gi, 'awesome');
                break;
            case 'neutral':
                intro = intro.replace(/!/g, '.');
                intro = intro.replace(/\b(awesome|amazing|wonderful)\b/gi, 'significant');
                break;
        }
        
        return intro;
    }

    /**
     * Apply tone to concept content
     */
    applyToneToConcept(conceptTemplate, tone) {
        if (!conceptTemplate) return '';
        
        let concept = conceptTemplate;
        
        // Apply tone-specific vocabulary
        const vocabularyMap = {
            grandmother: {
                'important': 'precious',
                'big': 'wonderful',
                'good': 'lovely',
                'help': 'guide',
                'learn': 'discover'
            },
            fun: {
                'important': 'awesome',
                'big': 'massive',
                'good': 'incredible',
                'help': 'power up',
                'learn': 'unlock'
            },
            neutral: {
                'precious': 'important',
                'wonderful': 'significant',
                'lovely': 'beneficial',
                'guide': 'assist',
                'discover': 'learn'
            }
        };
        
        const replacements = vocabularyMap[tone] || {};
        Object.entries(replacements).forEach(([oldWord, newWord]) => {
            concept = concept.replace(new RegExp(`\\b${oldWord}\\b`, 'gi'), newWord);
        });
        
        // Apply tone-specific sentence structure
        switch (tone) {
            case 'grandmother':
                concept = concept.replace(/\./g, ', you see.');
                break;
            case 'fun':
                concept = concept.replace(/\./g, '!');
                break;
            case 'neutral':
                concept = concept.replace(/!/g, '.');
                break;
        }
        
        return concept;
    }

    /**
     * Apply tone to examples
     */
    applyToneToExamples(examples, tone) {
        if (!Array.isArray(examples)) {
            examples = [examples || 'This concept applies to many situations.'];
        }
        
        const tonePatterns = this.toneDefinitions[tone].contentPatterns;
        
        return examples.map(example => {
            let toneExample = example;
            
            // Add tone-specific transitions
            const transition = this.selectRandom(tonePatterns.transitions);
            toneExample = `${transition}, ${toneExample}`;
            
            // Apply tone-specific modifications
            switch (tone) {
                case 'grandmother':
                    toneExample = toneExample.replace(/\./g, ', dear.');
                    break;
                case 'fun':
                    toneExample = toneExample.replace(/\./g, '!');
                    break;
                case 'neutral':
                    toneExample = toneExample.replace(/!/g, '.');
                    break;
            }
            
            return toneExample;
        });
    }

    /**
     * Apply tone to reflection questions
     */
    applyToneToReflection(reflectionTemplate, tone) {
        if (!reflectionTemplate) return '';
        
        const languagePatterns = this.languagePatterns[tone];
        let reflection = reflectionTemplate;
        
        // Add tone-specific conclusion
        const conclusion = this.selectRandom(languagePatterns.conclusions);
        reflection = `${reflection} ${conclusion}`;
        
        // Apply tone-specific modifications
        switch (tone) {
            case 'grandmother':
                reflection = reflection.replace(/\?/g, ', dear?');
                reflection = reflection.replace(/\b(think|consider)\b/gi, 'wonder');
                break;
            case 'fun':
                reflection = reflection.replace(/\?/g, '?');
                reflection = reflection.replace(/\b(wonder|ponder)\b/gi, 'think about');
                break;
            case 'neutral':
                reflection = reflection.replace(/!/g, '.');
                reflection = reflection.replace(/\b(wonder|think about)\b/gi, 'consider');
                break;
        }
        
        return reflection;
    }

    /**
     * Select random element from array
     */
    selectRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Validate tone definitions
     */
    validateToneDefinitions() {
        const requiredFields = ['name', 'personality', 'voiceCharacteristics', 'contentPatterns'];
        
        Object.entries(this.toneDefinitions).forEach(([tone, definition]) => {
            requiredFields.forEach(field => {
                if (!(field in definition)) {
                    throw new Error(`Missing required field '${field}' in tone definition for ${tone}`);
                }
            });
            
            // Validate content patterns
            const requiredPatterns = ['titleModifier', 'introStyle', 'conceptStyle', 'exampleStyle', 'reflectionStyle'];
            requiredPatterns.forEach(pattern => {
                if (!(pattern in definition.contentPatterns)) {
                    throw new Error(`Missing required pattern '${pattern}' in tone definition for ${tone}`);
                }
            });
        });
    }

    /**
     * Get fallback tone synthesis
     */
    getFallbackToneSynthesis(tone, ageContext) {
        this.logger.warn('Using fallback tone synthesis');
        
        return {
            tone: 'neutral',
            personality: 'Clear and educational',
            voiceCharacteristics: {
                pace: 'measured',
                vocabulary: 'precise',
                sentenceStructure: 'structured',
                emotionalTone: 'objective'
            },
            titleModifier: '',
            introStyle: ageContext.introTemplate || 'Let\'s learn together.',
            conceptStyle: ageContext.conceptTemplate || 'This is important to understand.',
            exampleStyle: ageContext.examples || ['This applies to many situations.'],
            reflectionStyle: ageContext.reflectionTemplate || 'What did you learn?',
            transitions: ['Furthermore', 'Additionally', 'Moreover'],
            affirmations: ['Correct', 'Accurate', 'Precise'],
            culturalReferences: ['evidence', 'research', 'data'],
            languagePatterns: this.languagePatterns.neutral,
            isFallback: true
        };
    }

    /**
     * Get available tones
     */
    getAvailableTones() {
        return Object.keys(this.toneDefinitions);
    }

    /**
     * Get tone definition
     */
    getToneDefinition(tone) {
        return this.toneDefinitions[tone];
    }

    /**
     * Get all tone definitions
     */
    getAllToneDefinitions() {
        return this.toneDefinitions;
    }

    /**
     * Get language patterns for tone
     */
    getLanguagePatterns(tone) {
        return this.languagePatterns[tone];
    }

    /**
     * Check if synthesizer is initialized
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Reset synthesizer state
     */
    reset() {
        this.initialized = false;
        this.logger.info('Tone synthesizer reset complete');
    }
} 