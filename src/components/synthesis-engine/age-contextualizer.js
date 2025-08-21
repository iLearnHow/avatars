/**
 * Age Contextualizer - Age-Appropriate Content Adaptation
 * Adapts educational content based on cognitive development stages
 * @author iLearnHow
 * @version 1.0.0
 */

import { Logger } from '@utils/logger.js';
import { PerformanceMonitor } from '@utils/performance.js';

export class AgeContextualizer {
    constructor() {
        this.logger = new Logger('AgeContextualizer');
        this.initialized = false;
        
        // Age categories and cognitive characteristics
        this.ageCategories = {
            early_childhood: { min: 5, max: 8, stage: 'Early Childhood' },
            middle_childhood: { min: 9, max: 12, stage: 'Middle Childhood' },
            adolescence: { min: 13, max: 18, stage: 'Adolescence' },
            young_adult: { min: 19, max: 30, stage: 'Young Adult' },
            adulthood: { min: 31, max: 50, stage: 'Adulthood' },
            mature_adult: { min: 51, max: 65, stage: 'Mature Adult' }
        };
        
        // Cognitive development patterns
        this.cognitivePatterns = {
            early_childhood: {
                attentionSpan: 15,
                vocabularyLevel: 'basic',
                abstractThinking: 'concrete',
                learningStyle: 'playful',
                exampleTypes: ['visual', 'hands-on', 'story-based'],
                complexityLevel: 'simple',
                sentenceLength: 'short',
                conceptDepth: 'surface'
            },
            middle_childhood: {
                attentionSpan: 25,
                vocabularyLevel: 'intermediate',
                abstractThinking: 'developing',
                learningStyle: 'interactive',
                exampleTypes: ['real-world', 'comparative', 'experiential'],
                complexityLevel: 'moderate',
                sentenceLength: 'medium',
                conceptDepth: 'moderate'
            },
            adolescence: {
                attentionSpan: 35,
                vocabularyLevel: 'advanced',
                abstractThinking: 'abstract',
                learningStyle: 'analytical',
                exampleTypes: ['scientific', 'hypothetical', 'critical'],
                complexityLevel: 'complex',
                sentenceLength: 'varied',
                conceptDepth: 'deep'
            },
            young_adult: {
                attentionSpan: 45,
                vocabularyLevel: 'specialized',
                abstractThinking: 'sophisticated',
                learningStyle: 'self-directed',
                exampleTypes: ['professional', 'theoretical', 'practical'],
                complexityLevel: 'advanced',
                sentenceLength: 'complex',
                conceptDepth: 'comprehensive'
            },
            adulthood: {
                attentionSpan: 40,
                vocabularyLevel: 'expert',
                abstractThinking: 'nuanced',
                learningStyle: 'efficient',
                exampleTypes: ['efficient', 'practical', 'strategic'],
                complexityLevel: 'expert',
                sentenceLength: 'efficient',
                conceptDepth: 'strategic'
            },
            mature_adult: {
                attentionSpan: 35,
                vocabularyLevel: 'refined',
                abstractThinking: 'wisdom-based',
                learningStyle: 'reflective',
                exampleTypes: ['philosophical', 'life-experience', 'synthesis'],
                complexityLevel: 'refined',
                sentenceLength: 'elegant',
                conceptDepth: 'synthesized'
            }
        };
    }

    /**
     * Initialize the age contextualizer
     */
    async initialize() {
        try {
            this.logger.info('Initializing age contextualizer...');
            
            // Validate cognitive patterns
            this.validateCognitivePatterns();
            
            this.initialized = true;
            this.logger.info('Age contextualizer initialized successfully');
            
        } catch (error) {
            this.logger.error('Failed to initialize age contextualizer:', error);
            throw error;
        }
    }

    /**
     * Contextualize content for specific age
     * @param {number} age - Learner age (5-65)
     * @param {Object} curriculumData - Base curriculum data
     * @returns {Object} Age-contextualized content
     */
    async contextualize(age, curriculumData) {
        const startTime = performance.now();
        
        try {
            if (!this.initialized) {
                throw new Error('Age contextualizer not initialized');
            }
            
            // Determine age category
            const ageCategory = this.getAgeCategory(age);
            const cognitivePattern = this.cognitivePatterns[ageCategory];
            
            // Apply age-appropriate adaptations
            const contextualized = {
                ageCategory,
                cognitivePattern,
                attentionSpan: this.calculateAttentionSpan(age, cognitivePattern),
                baseTitle: this.adaptTitle(curriculumData.title, ageCategory),
                introTemplate: this.adaptIntroduction(curriculumData, ageCategory),
                conceptTemplate: this.adaptConcept(curriculumData, ageCategory),
                examples: this.adaptExamples(curriculumData.examples, ageCategory),
                reflectionTemplate: this.adaptReflection(curriculumData, ageCategory),
                vocabularyLevel: cognitivePattern.vocabularyLevel,
                complexityLevel: cognitivePattern.complexityLevel,
                learningStyle: cognitivePattern.learningStyle
            };
            
            const contextualizeTime = performance.now() - startTime;
            this.logger.debug(`Age contextualization completed in ${contextualizeTime.toFixed(2)}ms`, {
                age,
                ageCategory,
                contextualizeTime
            });
            
            return contextualized;
            
        } catch (error) {
            this.logger.error('Age contextualization failed:', error);
            return this.getFallbackContextualization(age, curriculumData);
        }
    }

    /**
     * Get age category from age
     */
    getAgeCategory(age) {
        for (const [category, range] of Object.entries(this.ageCategories)) {
            if (age >= range.min && age <= range.max) {
                return category;
            }
        }
        
        // Default to adulthood for out-of-range ages
        return 'adulthood';
    }

    /**
     * Calculate attention span based on age and cognitive pattern
     */
    calculateAttentionSpan(age, cognitivePattern) {
        const baseSpan = cognitivePattern.attentionSpan;
        const ageFactor = Math.min(age / 10, 1.2); // Cap at 120% of base
        return Math.round(baseSpan * ageFactor);
    }

    /**
     * Adapt title for age category
     */
    adaptTitle(title, ageCategory) {
        const adaptations = {
            early_childhood: {
                prefix: 'Let\'s Learn About: ',
                suffix: ' (Fun!)',
                simplify: true
            },
            middle_childhood: {
                prefix: 'Discover: ',
                suffix: '',
                simplify: true
            },
            adolescence: {
                prefix: 'Exploring: ',
                suffix: '',
                simplify: false
            },
            young_adult: {
                prefix: 'Understanding: ',
                suffix: '',
                simplify: false
            },
            adulthood: {
                prefix: '',
                suffix: '',
                simplify: false
            },
            mature_adult: {
                prefix: 'Wisdom of: ',
                suffix: '',
                simplify: false
            }
        };
        
        const adaptation = adaptations[ageCategory];
        let adaptedTitle = title;
        
        if (adaptation.simplify) {
            adaptedTitle = this.simplifyTitle(title);
        }
        
        return `${adaptation.prefix}${adaptedTitle}${adaptation.suffix}`;
    }

    /**
     * Simplify title for younger learners
     */
    simplifyTitle(title) {
        // Remove complex words and simplify structure
        const simplifications = {
            'magnificent': 'amazing',
            'extraordinary': 'special',
            'phenomenon': 'thing',
            'fundamental': 'important',
            'comprehensive': 'complete',
            'sophisticated': 'smart'
        };
        
        let simplified = title;
        Object.entries(simplifications).forEach(([complex, simple]) => {
            simplified = simplified.replace(new RegExp(complex, 'gi'), simple);
        });
        
        return simplified;
    }

    /**
     * Adapt introduction for age category
     */
    adaptIntroduction(curriculumData, ageCategory) {
        const baseIntro = curriculumData.concept || 'Let\'s learn something amazing today!';
        
        const adaptations = {
            early_childhood: `Hello little friend! ${baseIntro} This is going to be so much fun!`,
            middle_childhood: `Hey there! ${baseIntro} Ready to discover something cool?`,
            adolescence: `Welcome! ${baseIntro} Let\'s dive into this fascinating topic.`,
            young_adult: `Greetings! ${baseIntro} We\'ll explore this in depth today.`,
            adulthood: `${baseIntro} Let\'s examine this important concept.`,
            mature_adult: `Welcome to our exploration. ${baseIntro} Let\'s reflect on this together.`
        };
        
        return adaptations[ageCategory] || adaptations.adulthood;
    }

    /**
     * Adapt concept explanation for age category
     */
    adaptConcept(curriculumData, ageCategory) {
        const baseConcept = curriculumData.concept || 'This is an important concept to understand.';
        
        const adaptations = {
            early_childhood: this.simplifyConcept(baseConcept, 'very_simple'),
            middle_childhood: this.simplifyConcept(baseConcept, 'simple'),
            adolescence: baseConcept,
            young_adult: this.enhanceConcept(baseConcept, 'detailed'),
            adulthood: this.enhanceConcept(baseConcept, 'comprehensive'),
            mature_adult: this.enhanceConcept(baseConcept, 'philosophical')
        };
        
        return adaptations[ageCategory] || adaptations.adulthood;
    }

    /**
     * Simplify concept for younger learners
     */
    simplifyConcept(concept, level) {
        const simplifications = {
            very_simple: {
                'solar system': 'space around the sun',
                'nuclear fusion': 'how the sun makes light',
                'photosynthesis': 'how plants make food',
                'gravity': 'what keeps things on the ground',
                'energy': 'power that makes things work'
            },
            simple: {
                'nuclear fusion': 'the sun\'s power source',
                'photosynthesis': 'how plants use sunlight',
                'gravity': 'the force that pulls things together',
                'energy': 'the ability to do work'
            }
        };
        
        let simplified = concept;
        const replacements = simplifications[level] || {};
        
        Object.entries(replacements).forEach(([complex, simple]) => {
            simplified = simplified.replace(new RegExp(complex, 'gi'), simple);
        });
        
        return simplified;
    }

    /**
     * Enhance concept for older learners
     */
    enhanceConcept(concept, level) {
        const enhancements = {
            detailed: {
                'sun': 'our nearest star, the sun',
                'energy': 'energy in its various forms',
                'light': 'electromagnetic radiation'
            },
            comprehensive: {
                'sun': 'our G-type main-sequence star',
                'energy': 'energy across multiple domains',
                'light': 'electromagnetic radiation across the spectrum'
            },
            philosophical: {
                'sun': 'the celestial body that sustains all life',
                'energy': 'the fundamental force that drives existence',
                'light': 'the electromagnetic manifestation of energy'
            }
        };
        
        let enhanced = concept;
        const replacements = enhancements[level] || {};
        
        Object.entries(replacements).forEach(([simple, enhanced]) => {
            enhanced = enhanced.replace(new RegExp(`\\b${simple}\\b`, 'gi'), enhanced);
        });
        
        return enhanced;
    }

    /**
     * Adapt examples for age category
     */
    adaptExamples(examples, ageCategory) {
        if (!Array.isArray(examples)) {
            examples = [examples || 'This concept applies to many things in life.'];
        }
        
        const adaptations = {
            early_childhood: examples.map(ex => `Think about: ${ex}`),
            middle_childhood: examples.map(ex => `For example: ${ex}`),
            adolescence: examples.map(ex => `Consider this: ${ex}`),
            young_adult: examples.map(ex => `An illustration: ${ex}`),
            adulthood: examples.map(ex => `A practical example: ${ex}`),
            mature_adult: examples.map(ex => `Reflect on this: ${ex}`)
        };
        
        return adaptations[ageCategory] || adaptations.adulthood;
    }

    /**
     * Adapt reflection questions for age category
     */
    adaptReflection(curriculumData, ageCategory) {
        const baseReflection = curriculumData.reflection || 'What did you learn today?';
        
        const adaptations = {
            early_childhood: `What was your favorite part? Can you tell me about it?`,
            middle_childhood: `What did you find most interesting? Why?`,
            adolescence: `How does this connect to what you already know?`,
            young_adult: `What implications does this have for your understanding?`,
            adulthood: `How might you apply this knowledge in practice?`,
            mature_adult: `What deeper insights does this reveal about the nature of things?`
        };
        
        return adaptations[ageCategory] || baseReflection;
    }

    /**
     * Validate cognitive patterns
     */
    validateCognitivePatterns() {
        const requiredFields = ['attentionSpan', 'vocabularyLevel', 'abstractThinking', 'learningStyle'];
        
        Object.entries(this.cognitivePatterns).forEach(([category, pattern]) => {
            requiredFields.forEach(field => {
                if (!(field in pattern)) {
                    throw new Error(`Missing required field '${field}' in cognitive pattern for ${category}`);
                }
            });
        });
    }

    /**
     * Get fallback contextualization
     */
    getFallbackContextualization(age, curriculumData) {
        this.logger.warn('Using fallback age contextualization');
        
        return {
            ageCategory: 'adulthood',
            cognitivePattern: this.cognitivePatterns.adulthood,
            attentionSpan: 40,
            baseTitle: curriculumData.title || 'Learning Content',
            introTemplate: curriculumData.concept || 'Let\'s learn together.',
            conceptTemplate: curriculumData.concept || 'This is important to understand.',
            examples: [curriculumData.examples || 'This applies to many situations.'],
            reflectionTemplate: curriculumData.reflection || 'What did you learn?',
            vocabularyLevel: 'intermediate',
            complexityLevel: 'moderate',
            learningStyle: 'general',
            isFallback: true
        };
    }

    /**
     * Get age category information
     */
    getAgeCategoryInfo(age) {
        const category = this.getAgeCategory(age);
        return {
            category,
            range: this.ageCategories[category],
            cognitivePattern: this.cognitivePatterns[category]
        };
    }

    /**
     * Get all age categories
     */
    getAgeCategories() {
        return this.ageCategories;
    }

    /**
     * Get cognitive patterns
     */
    getCognitivePatterns() {
        return this.cognitivePatterns;
    }

    /**
     * Check if contextualizer is initialized
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Reset contextualizer state
     */
    reset() {
        this.initialized = false;
        this.logger.info('Age contextualizer reset complete');
    }
} 