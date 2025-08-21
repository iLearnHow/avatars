/**
 * Quality Validation System for iLearn
 * Validates content quality across all dimensions
 */

class QualityValidationSystem {
    constructor() {
        this.validationRules = this.defineValidationRules();
        this.qualityMetrics = {
            totalValidations: 0,
            passedValidations: 0,
            failedValidations: 0,
            qualityScore: 0
        };
        this.validationCache = {};
    }

    /**
     * Define validation rules
     */
    defineValidationRules() {
        return {
            ageAppropriateness: {
                early_childhood: {
                    maxWordLength: 8,
                    maxSentenceLength: 15,
                    requiredConcepts: ['simple', 'concrete', 'observable'],
                    forbiddenConcepts: ['abstract', 'complex', 'technical']
                },
                youth: {
                    maxWordLength: 12,
                    maxSentenceLength: 25,
                    requiredConcepts: ['practical', 'engaging', 'relatable'],
                    forbiddenConcepts: ['overly_simple', 'condescending']
                },
                young_adult: {
                    maxWordLength: 15,
                    maxSentenceLength: 35,
                    requiredConcepts: ['practical', 'career_relevant', 'technology'],
                    forbiddenConcepts: ['childish', 'oversimplified']
                },
                midlife: {
                    maxWordLength: 18,
                    maxSentenceLength: 40,
                    requiredConcepts: ['family', 'community', 'legacy', 'sustainability'],
                    forbiddenConcepts: ['youth_focused', 'trendy']
                },
                wisdom_years: {
                    maxWordLength: 20,
                    maxSentenceLength: 45,
                    requiredConcepts: ['wisdom', 'experience', 'reflection', 'legacy'],
                    forbiddenConcepts: ['youth_centric', 'trendy']
                }
            },
            toneAuthenticity: {
                grandmother: {
                    requiredElements: ['warm', 'nurturing', 'protective', 'wonder'],
                    forbiddenElements: ['formal', 'cold', 'distant'],
                    languagePatterns: ['gentle', 'encouraging', 'celebratory']
                },
                fun: {
                    requiredElements: ['enthusiastic', 'energetic', 'celebratory', 'adventurous'],
                    forbiddenElements: ['serious', 'boring', 'formal'],
                    languagePatterns: ['excited', 'dynamic', 'playful']
                },
                neutral: {
                    requiredElements: ['balanced', 'informative', 'respectful', 'clear'],
                    forbiddenElements: ['biased', 'emotional', 'unclear'],
                    languagePatterns: ['professional', 'educational', 'accessible']
                }
            },
            educationalIntegrity: {
                requiredElements: ['accurate', 'educational', 'progressive', 'engaging'],
                forbiddenElements: ['misleading', 'entertainment_only', 'regressive'],
                contentStructure: ['introduction', 'main_content', 'examples', 'reflection', 'conclusion']
            },
            universality: {
                requiredElements: ['inclusive', 'culturally_neutral', 'accessible', 'relevant'],
                forbiddenElements: ['exclusive', 'culturally_specific', 'inaccessible'],
                globalAppeal: ['universal_concepts', 'shared_experiences', 'common_understanding']
            }
        };
    }

    /**
     * Validate lesson content comprehensively
     */
    async validateLessonContent(lessonContent, metadata) {
        console.log('🔍 Validating lesson content...');
        
        const validationResults = {
            ageAppropriateness: this.validateAgeAppropriateness(lessonContent, metadata.ageGroup),
            toneAuthenticity: this.validateToneAuthenticity(lessonContent, metadata.tone),
            educationalIntegrity: this.validateEducationalIntegrity(lessonContent),
            universality: this.validateUniversality(lessonContent),
            overall: {
                passed: false,
                score: 0,
                issues: []
            }
        };
        
        // Calculate overall score
        const scores = [
            validationResults.ageAppropriateness.score,
            validationResults.toneAuthenticity.score,
            validationResults.educationalIntegrity.score,
            validationResults.universality.score
        ];
        
        validationResults.overall.score = scores.reduce((a, b) => a + b, 0) / scores.length;
        validationResults.overall.passed = validationResults.overall.score >= 0.8;
        
        // Collect all issues
        validationResults.overall.issues = [
            ...validationResults.ageAppropriateness.issues,
            ...validationResults.toneAuthenticity.issues,
            ...validationResults.educationalIntegrity.issues,
            ...validationResults.universality.issues
        ];
        
        this.updateQualityMetrics(validationResults.overall.passed);
        
        console.log(`✅ Validation complete. Score: ${(validationResults.overall.score * 100).toFixed(1)}%`);
        return validationResults;
    }

    /**
     * Validate age appropriateness
     */
    validateAgeAppropriateness(content, ageGroup) {
        const rules = this.validationRules.ageAppropriateness[ageGroup];
        if (!rules) {
            return { passed: false, score: 0, issues: ['Unknown age group'] };
        }
        
        const issues = [];
        let score = 1.0;
        
        // Check word length
        const words = this.extractWords(content);
        const longWords = words.filter(word => word.length > rules.maxWordLength);
        if (longWords.length > 0) {
            issues.push(`Contains ${longWords.length} words longer than ${rules.maxWordLength} characters`);
            score -= 0.1;
        }
        
        // Check sentence length
        const sentences = this.extractSentences(content);
        const longSentences = sentences.filter(sentence => 
            sentence.split(' ').length > rules.maxSentenceLength
        );
        if (longSentences.length > 0) {
            issues.push(`Contains ${longSentences.length} sentences longer than ${rules.maxSentenceLength} words`);
            score -= 0.1;
        }
        
        // Check required concepts
        const hasRequiredConcepts = rules.requiredConcepts.some(concept => 
            this.containsConcept(content, concept)
        );
        if (!hasRequiredConcepts) {
            issues.push(`Missing required concepts for ${ageGroup}`);
            score -= 0.2;
        }
        
        // Check forbidden concepts
        const hasForbiddenConcepts = rules.forbiddenConcepts.some(concept => 
            this.containsConcept(content, concept)
        );
        if (hasForbiddenConcepts) {
            issues.push(`Contains forbidden concepts for ${ageGroup}`);
            score -= 0.3;
        }
        
        return {
            passed: score >= 0.8,
            score: Math.max(0, score),
            issues
        };
    }

    /**
     * Validate tone authenticity
     */
    validateToneAuthenticity(content, tone) {
        const rules = this.validationRules.toneAuthenticity[tone];
        if (!rules) {
            return { passed: false, score: 0, issues: ['Unknown tone'] };
        }
        
        const issues = [];
        let score = 1.0;
        
        // Check required elements
        const hasRequiredElements = rules.requiredElements.some(element => 
            this.containsToneElement(content, element)
        );
        if (!hasRequiredElements) {
            issues.push(`Missing required tone elements for ${tone}`);
            score -= 0.3;
        }
        
        // Check forbidden elements
        const hasForbiddenElements = rules.forbiddenElements.some(element => 
            this.containsToneElement(content, element)
        );
        if (hasForbiddenElements) {
            issues.push(`Contains forbidden tone elements for ${tone}`);
            score -= 0.4;
        }
        
        // Check language patterns
        const hasLanguagePatterns = rules.languagePatterns.some(pattern => 
            this.containsLanguagePattern(content, pattern)
        );
        if (!hasLanguagePatterns) {
            issues.push(`Missing appropriate language patterns for ${tone}`);
            score -= 0.2;
        }
        
        return {
            passed: score >= 0.8,
            score: Math.max(0, score),
            issues
        };
    }

    /**
     * Validate educational integrity
     */
    validateEducationalIntegrity(content) {
        const rules = this.validationRules.educationalIntegrity;
        const issues = [];
        let score = 1.0;
        
        // Check required elements
        const hasRequiredElements = rules.requiredElements.some(element => 
            this.containsEducationalElement(content, element)
        );
        if (!hasRequiredElements) {
            issues.push('Missing required educational elements');
            score -= 0.3;
        }
        
        // Check forbidden elements
        const hasForbiddenElements = rules.forbiddenElements.some(element => 
            this.containsEducationalElement(content, element)
        );
        if (hasForbiddenElements) {
            issues.push('Contains forbidden educational elements');
            score -= 0.4;
        }
        
        // Check content structure
        const hasStructure = rules.contentStructure.every(section => 
            content[section] && content[section].trim().length > 0
        );
        if (!hasStructure) {
            issues.push('Missing required content structure');
            score -= 0.2;
        }
        
        return {
            passed: score >= 0.8,
            score: Math.max(0, score),
            issues
        };
    }

    /**
     * Validate universality
     */
    validateUniversality(content) {
        const rules = this.validationRules.universality;
        const issues = [];
        let score = 1.0;
        
        // Check required elements
        const hasRequiredElements = rules.requiredElements.some(element => 
            this.containsUniversalElement(content, element)
        );
        if (!hasRequiredElements) {
            issues.push('Missing required universal elements');
            score -= 0.3;
        }
        
        // Check forbidden elements
        const hasForbiddenElements = rules.forbiddenElements.some(element => 
            this.containsUniversalElement(content, element)
        );
        if (hasForbiddenElements) {
            issues.push('Contains forbidden universal elements');
            score -= 0.4;
        }
        
        // Check global appeal
        const hasGlobalAppeal = rules.globalAppeal.some(appeal => 
            this.containsGlobalAppeal(content, appeal)
        );
        if (!hasGlobalAppeal) {
            issues.push('Missing global appeal elements');
            score -= 0.2;
        }
        
        return {
            passed: score >= 0.8,
            score: Math.max(0, score),
            issues
        };
    }

    /**
     * Helper methods for content analysis
     */
    extractWords(content) {
        const allText = Object.values(content).join(' ');
        return allText.toLowerCase().match(/\b\w+\b/g) || [];
    }

    extractSentences(content) {
        const allText = Object.values(content).join(' ');
        return allText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    }

    containsConcept(content, concept) {
        const allText = Object.values(content).join(' ').toLowerCase();
        const conceptWords = {
            'simple': ['simple', 'basic', 'easy', 'clear'],
            'concrete': ['concrete', 'specific', 'tangible', 'real'],
            'observable': ['see', 'watch', 'observe', 'notice'],
            'practical': ['practical', 'useful', 'helpful', 'applicable'],
            'engaging': ['interesting', 'exciting', 'fun', 'engaging'],
            'relatable': ['relatable', 'familiar', 'everyday', 'common'],
            'career_relevant': ['career', 'job', 'work', 'professional'],
            'technology': ['technology', 'digital', 'computer', 'online'],
            'family': ['family', 'children', 'parents', 'home'],
            'community': ['community', 'neighbors', 'friends', 'together'],
            'legacy': ['legacy', 'future', 'generations', 'impact'],
            'sustainability': ['sustainable', 'environment', 'future', 'care'],
            'wisdom': ['wisdom', 'experience', 'knowledge', 'understanding'],
            'reflection': ['reflect', 'think', 'consider', 'contemplate']
        };
        
        const words = conceptWords[concept] || [concept];
        return words.some(word => allText.includes(word));
    }

    containsToneElement(content, element) {
        const allText = Object.values(content).join(' ').toLowerCase();
        const toneElements = {
            'warm': ['warm', 'caring', 'loving', 'gentle'],
            'nurturing': ['nurturing', 'supportive', 'encouraging', 'helpful'],
            'protective': ['protective', 'safe', 'secure', 'guarded'],
            'wonder': ['wonder', 'amazing', 'incredible', 'magical'],
            'enthusiastic': ['enthusiastic', 'excited', 'energetic', 'passionate'],
            'energetic': ['energetic', 'dynamic', 'lively', 'vibrant'],
            'celebratory': ['celebratory', 'joyful', 'happy', 'positive'],
            'adventurous': ['adventurous', 'explore', 'discover', 'journey'],
            'balanced': ['balanced', 'fair', 'objective', 'neutral'],
            'informative': ['informative', 'educational', 'instructive', 'helpful'],
            'respectful': ['respectful', 'polite', 'considerate', 'thoughtful'],
            'clear': ['clear', 'understandable', 'simple', 'straightforward']
        };
        
        const words = toneElements[element] || [element];
        return words.some(word => allText.includes(word));
    }

    containsLanguagePattern(content, pattern) {
        const allText = Object.values(content).join(' ').toLowerCase();
        const patterns = {
            'gentle': ['oh my dear', 'sweetheart', 'let me tell you'],
            'encouraging': ['isn\'t that', 'how wonderful', 'you understand'],
            'celebratory': ['amazing', 'incredible', 'fantastic', 'wonderful'],
            'excited': ['ready to', 'welcome to', 'get ready', 'time to'],
            'dynamic': ['but wait', 'plot twist', 'boom', 'and now'],
            'playful': ['mind blown', 'serious space magic', 'cosmic show'],
            'professional': ['today we\'re', 'let\'s examine', 'research shows'],
            'educational': ['scientific evidence', 'data demonstrates', 'evidence indicates'],
            'accessible': ['clearly', 'simply', 'easily', 'understandably']
        };
        
        const phrases = patterns[pattern] || [pattern];
        return phrases.some(phrase => allText.includes(phrase));
    }

    containsEducationalElement(content, element) {
        const allText = Object.values(content).join(' ').toLowerCase();
        const elements = {
            'accurate': ['research', 'evidence', 'studies', 'scientific'],
            'educational': ['learn', 'understand', 'explore', 'discover'],
            'progressive': ['build', 'develop', 'advance', 'improve'],
            'engaging': ['interesting', 'exciting', 'fascinating', 'captivating'],
            'misleading': ['always', 'never', 'everyone', 'nobody'],
            'entertainment_only': ['just for fun', 'only entertainment', 'no learning'],
            'regressive': ['go back', 'return to', 'old ways', 'traditional only']
        };
        
        const words = elements[element] || [element];
        return words.some(word => allText.includes(word));
    }

    containsUniversalElement(content, element) {
        const allText = Object.values(content).join(' ').toLowerCase();
        const elements = {
            'inclusive': ['everyone', 'all people', 'we all', 'together'],
            'culturally_neutral': ['human', 'people', 'individuals', 'learners'],
            'accessible': ['simple', 'clear', 'easy', 'understandable'],
            'relevant': ['important', 'useful', 'helpful', 'valuable'],
            'exclusive': ['only', 'just', 'specific group', 'certain people'],
            'culturally_specific': ['american', 'western', 'eastern', 'specific culture'],
            'inaccessible': ['complex', 'difficult', 'complicated', 'hard']
        };
        
        const words = elements[element] || [element];
        return words.some(word => allText.includes(word));
    }

    containsGlobalAppeal(content, appeal) {
        const allText = Object.values(content).join(' ').toLowerCase();
        const appeals = {
            'universal_concepts': ['learning', 'growth', 'understanding', 'knowledge'],
            'shared_experiences': ['life', 'learning', 'growth', 'development'],
            'common_understanding': ['basic', 'fundamental', 'essential', 'core']
        };
        
        const words = appeals[appeal] || [appeal];
        return words.some(word => allText.includes(word));
    }

    /**
     * Update quality metrics
     */
    updateQualityMetrics(passed) {
        this.qualityMetrics.totalValidations++;
        if (passed) {
            this.qualityMetrics.passedValidations++;
        } else {
            this.qualityMetrics.failedValidations++;
        }
        
        this.qualityMetrics.qualityScore = this.qualityMetrics.passedValidations / this.qualityMetrics.totalValidations;
    }

    /**
     * Get quality metrics
     */
    getQualityMetrics() {
        return {
            ...this.qualityMetrics,
            passRate: this.qualityMetrics.totalValidations > 0 ? 
                (this.qualityMetrics.passedValidations / this.qualityMetrics.totalValidations * 100).toFixed(1) : 0
        };
    }

    /**
     * Reset quality metrics
     */
    resetQualityMetrics() {
        this.qualityMetrics = {
            totalValidations: 0,
            passedValidations: 0,
            failedValidations: 0,
            qualityScore: 0
        };
        console.log('🔄 Quality metrics reset');
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.QualityValidationSystem = QualityValidationSystem;
}
if (typeof module !== 'undefined') {
    module.exports = { QualityValidationSystem };
} 