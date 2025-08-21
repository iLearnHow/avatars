/**
 * Smart Variant Generator for iLearn
 * Generates essential variants for a single lesson based on user needs
 */

class SmartVariantGenerator {
    constructor() {
        this.coreVariants = this.defineCoreVariants();
        this.userProfiles = this.defineUserProfiles();
        this.generationCosts = {
            claude: {
                inputTokensPerVariant: 500,
                outputTokensPerVariant: 1000,
                costPerMillionInputTokens: 3.00,
                costPerMillionOutputTokens: 15.00
            }
        };
    }

    /**
     * Define core variants that cover 80% of user needs
     */
    defineCoreVariants() {
        return {
            // Age Groups (11) - Birth year based
            ageGroups: [
                { id: 'infant', name: 'Infant', birthYears: [2023, 2024, 2025], description: '0-2 years old' },
                { id: 'toddler', name: 'Toddler', birthYears: [2020, 2021, 2022], description: '3-5 years old' },
                { id: 'early_childhood', name: 'Early Childhood', birthYears: [2017, 2018, 2019], description: '6-8 years old' },
                { id: 'middle_childhood', name: 'Middle Childhood', birthYears: [2014, 2015, 2016], description: '9-11 years old' },
                { id: 'pre_teen', name: 'Pre-Teen', birthYears: [2011, 2012, 2013], description: '12-14 years old' },
                { id: 'teen', name: 'Teen', birthYears: [2008, 2009, 2010], description: '15-17 years old' },
                { id: 'young_adult', name: 'Young Adult', birthYears: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007], description: '18-25 years old' },
                { id: 'adult', name: 'Adult', birthYears: [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999], description: '26-40 years old' },
                { id: 'middle_age', name: 'Middle Age', birthYears: [1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984], description: '41-60 years old' },
                { id: 'senior', name: 'Senior', birthYears: [1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964], description: '61-80 years old' },
                { id: 'elder', name: 'Elder', birthYears: [1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944], description: '81-102 years old' }
            ],

            // Tone Styles (10) - How content is delivered
            toneStyles: [
                { id: 'educational', name: 'Educational', description: 'Academic, formal, structured approach' },
                { id: 'conversational', name: 'Conversational', description: 'Casual, friendly, approachable tone' },
                { id: 'inspirational', name: 'Inspirational', description: 'Motivational, uplifting, encouraging' },
                { id: 'humorous', name: 'Humorous', description: 'Funny, playful, entertaining style' },
                { id: 'serious', name: 'Serious', description: 'Professional, focused, authoritative' },
                { id: 'gentle', name: 'Gentle', description: 'Soft, nurturing, supportive approach' },
                { id: 'energetic', name: 'Energetic', description: 'Dynamic, enthusiastic, lively delivery' },
                { id: 'calm', name: 'Calm', description: 'Peaceful, soothing, relaxed tone' },
                { id: 'curious', name: 'Curious', description: 'Questioning, exploratory, inquisitive' },
                { id: 'wise', name: 'Wise', description: 'Philosophical, thoughtful, reflective' }
            ],

            // Learning Styles (8) - How content is presented
            learningStyles: [
                { id: 'visual', name: 'Visual', description: 'Picture-based, diagram-focused learning' },
                { id: 'auditory', name: 'Auditory', description: 'Sound-focused, music-integrated approach' },
                { id: 'kinesthetic', name: 'Kinesthetic', description: 'Movement-based, hands-on learning' },
                { id: 'reading_writing', name: 'Reading/Writing', description: 'Text-heavy, note-taking style' },
                { id: 'social', name: 'Social', description: 'Group-based, collaborative learning' },
                { id: 'solitary', name: 'Solitary', description: 'Individual, self-paced approach' },
                { id: 'logical', name: 'Logical', description: 'Problem-solving, analytical thinking' },
                { id: 'creative', name: 'Creative', description: 'Artistic, imaginative approach' }
            ],

            // Cognitive Levels (4) - Complexity of content
            cognitiveLevels: [
                { id: 'beginner', name: 'Beginner', description: 'Basic concepts, simple language' },
                { id: 'intermediate', name: 'Intermediate', description: 'Moderate complexity, expanded concepts' },
                { id: 'advanced', name: 'Advanced', description: 'Complex ideas, sophisticated language' },
                { id: 'expert', name: 'Expert', description: 'Deep analysis, specialized knowledge' }
            ],

            // Interest Areas (10) - Subject focus
            interestAreas: [
                { id: 'science', name: 'Science', description: 'Scientific approach, experiments' },
                { id: 'arts', name: 'Arts', description: 'Creative expression, aesthetics' },
                { id: 'history', name: 'History', description: 'Historical context, timelines' },
                { id: 'technology', name: 'Technology', description: 'Digital focus, innovation' },
                { id: 'nature', name: 'Nature', description: 'Environmental, outdoor focus' },
                { id: 'sports', name: 'Sports', description: 'Athletic, physical activity' },
                { id: 'music', name: 'Music', description: 'Rhythmic, melodic elements' },
                { id: 'literature', name: 'Literature', description: 'Story-based, narrative' },
                { id: 'mathematics', name: 'Mathematics', description: 'Numerical, logical' },
                { id: 'philosophy', name: 'Philosophy', description: 'Abstract thinking, ethics' }
            ],

            // Accessibility Needs (5) - Inclusive learning
            accessibilityNeeds: [
                { id: 'standard', name: 'Standard', description: 'No special accommodations needed' },
                { id: 'visual_impairment', name: 'Visual Impairment', description: 'Audio-focused, descriptive content' },
                { id: 'hearing_impairment', name: 'Hearing Impairment', description: 'Visual-focused, captioned content' },
                { id: 'cognitive_impairment', name: 'Cognitive Impairment', description: 'Simplified, repetitive content' },
                { id: 'neurodivergent', name: 'Neurodivergent', description: 'Structured, predictable content' }
            ],

            // Language Complexity (4) - Text difficulty
            languageComplexity: [
                { id: 'simple', name: 'Simple', description: 'Basic vocabulary, short sentences' },
                { id: 'standard', name: 'Standard', description: 'Normal complexity, varied vocabulary' },
                { id: 'advanced', name: 'Advanced', description: 'Sophisticated language, complex ideas' },
                { id: 'academic', name: 'Academic', description: 'Technical terms, formal structure' }
            ]
        };
    }

    /**
     * Define user profiles for smart variant selection
     */
    defineUserProfiles() {
        return {
            // Popular combinations that cover 80% of users
            popularProfiles: [
                {
                    id: 'young_learner_visual',
                    name: 'Young Visual Learner',
                    variants: ['early_childhood', 'visual', 'beginner', 'conversational', 'arts', 'standard', 'simple'],
                    weight: 0.15 // 15% of users
                },
                {
                    id: 'teen_auditory',
                    name: 'Teen Auditory Learner',
                    variants: ['teen', 'auditory', 'intermediate', 'energetic', 'music', 'standard', 'standard'],
                    weight: 0.12 // 12% of users
                },
                {
                    id: 'adult_logical',
                    name: 'Adult Logical Learner',
                    variants: ['adult', 'logical', 'advanced', 'serious', 'science', 'standard', 'advanced'],
                    weight: 0.10 // 10% of users
                },
                {
                    id: 'senior_wise',
                    name: 'Senior Wise Learner',
                    variants: ['senior', 'solitary', 'expert', 'wise', 'philosophy', 'standard', 'academic'],
                    weight: 0.08 // 8% of users
                },
                {
                    id: 'child_creative',
                    name: 'Child Creative Learner',
                    variants: ['middle_childhood', 'creative', 'beginner', 'humorous', 'arts', 'standard', 'simple'],
                    weight: 0.10 // 10% of users
                }
            ],

            // Essential combinations for coverage
            essentialCombinations: [
                // Age + Learning Style combinations
                ['infant', 'kinesthetic', 'beginner', 'gentle', 'nature', 'standard', 'simple'],
                ['toddler', 'visual', 'beginner', 'conversational', 'arts', 'standard', 'simple'],
                ['early_childhood', 'auditory', 'beginner', 'energetic', 'music', 'standard', 'simple'],
                ['middle_childhood', 'social', 'intermediate', 'humorous', 'sports', 'standard', 'standard'],
                ['pre_teen', 'logical', 'intermediate', 'educational', 'science', 'standard', 'standard'],
                ['teen', 'creative', 'intermediate', 'inspirational', 'literature', 'standard', 'standard'],
                ['young_adult', 'reading_writing', 'advanced', 'serious', 'technology', 'standard', 'advanced'],
                ['adult', 'solitary', 'advanced', 'calm', 'philosophy', 'standard', 'advanced'],
                ['middle_age', 'logical', 'expert', 'wise', 'history', 'standard', 'academic'],
                ['senior', 'visual', 'expert', 'gentle', 'nature', 'standard', 'simple'],
                ['elder', 'auditory', 'expert', 'wise', 'philosophy', 'standard', 'simple']
            ]
        };
    }

    /**
     * Generate essential variants for a single lesson
     */
    async generateEssentialVariants(lessonTopic, lessonDay) {
        console.log(`🎯 Generating essential variants for lesson ${lessonDay}: ${lessonTopic}`);
        
        const variants = [];
        const totalVariants = this.calculateTotalVariants();
        
        console.log(`📊 Total essential variants to generate: ${totalVariants}`);
        
        // Generate popular profile variants first
        for (const profile of this.userProfiles.popularProfiles) {
            const variant = await this.generateVariant(lessonTopic, lessonDay, profile.variants);
            variants.push({
                ...variant,
                profile: profile.id,
                weight: profile.weight
            });
        }
        
        // Generate essential combinations
        for (const combination of this.userProfiles.essentialCombinations) {
            const variant = await this.generateVariant(lessonTopic, lessonDay, combination);
            variants.push({
                ...variant,
                profile: 'essential',
                weight: 0.05 // 5% weight for essential combinations
            });
        }
        
        console.log(`✅ Generated ${variants.length} essential variants`);
        return variants;
    }

    /**
     * Generate a single variant
     */
    async generateVariant(lessonTopic, lessonDay, variantSpec) {
        const [ageGroup, learningStyle, cognitiveLevel, toneStyle, interestArea, accessibility, languageComplexity] = variantSpec;
        
        const prompt = this.buildVariantPrompt(lessonTopic, lessonDay, {
            ageGroup,
            learningStyle,
            cognitiveLevel,
            toneStyle,
            interestArea,
            accessibility,
            languageComplexity
        });
        
        // This would call Claude API in real implementation
        const content = await this.generateContentWithClaude(prompt);
        
        return {
            lessonDay,
            topic: lessonTopic,
            variantId: `${ageGroup}_${learningStyle}_${cognitiveLevel}_${toneStyle}_${interestArea}_${accessibility}_${languageComplexity}`,
            content,
            metadata: {
                ageGroup,
                learningStyle,
                cognitiveLevel,
                toneStyle,
                interestArea,
                accessibility,
                languageComplexity,
                generationTime: new Date().toISOString()
            }
        };
    }

    /**
     * Build prompt for variant generation
     */
    buildVariantPrompt(lessonTopic, lessonDay, variantSpec) {
        const { ageGroup, learningStyle, cognitiveLevel, toneStyle, interestArea, accessibility, languageComplexity } = variantSpec;
        
        const ageInfo = this.coreVariants.ageGroups.find(a => a.id === ageGroup);
        const learningInfo = this.coreVariants.learningStyles.find(l => l.id === learningStyle);
        const cognitiveInfo = this.coreVariants.cognitiveLevels.find(c => c.id === cognitiveLevel);
        const toneInfo = this.coreVariants.toneStyles.find(t => t.id === toneStyle);
        const interestInfo = this.coreVariants.interestAreas.find(i => i.id === interestArea);
        const accessibilityInfo = this.coreVariants.accessibilityNeeds.find(a => a.id === accessibility);
        const languageInfo = this.coreVariants.languageComplexity.find(l => l.id === languageComplexity);
        
        return `
Create a lesson about "${lessonTopic}" for day ${lessonDay} with the following specifications:

AGE GROUP: ${ageInfo.name} (${ageInfo.description})
LEARNING STYLE: ${learningInfo.name} (${learningInfo.description})
COGNITIVE LEVEL: ${cognitiveInfo.name} (${cognitiveInfo.description})
TONE: ${toneInfo.name} (${toneInfo.description})
INTEREST AREA: ${interestInfo.name} (${interestInfo.description})
ACCESSIBILITY: ${accessibilityInfo.name} (${accessibilityInfo.description})
LANGUAGE: ${languageInfo.name} (${languageInfo.description})

Please create:
1. An engaging introduction (2-3 sentences)
2. Main content explanation (4-6 sentences)
3. A practical example or activity
4. A reflection question
5. A conclusion (1-2 sentences)

Make sure the content is appropriate for the age group, uses the specified learning style, matches the tone, incorporates the interest area, accommodates accessibility needs, and uses the appropriate language complexity level.
        `.trim();
    }

    /**
     * Generate content using Claude API (placeholder)
     */
    async generateContentWithClaude(prompt) {
        // This would be the actual Claude API call
        // For now, return placeholder content
        return {
            introduction: "Welcome to this lesson about the topic!",
            mainContent: "This is the main content of the lesson.",
            example: "Here's a practical example.",
            reflection: "What did you learn from this lesson?",
            conclusion: "Thank you for learning with us!"
        };
    }

    /**
     * Calculate total variants
     */
    calculateTotalVariants() {
        const popularProfiles = this.userProfiles.popularProfiles.length;
        const essentialCombinations = this.userProfiles.essentialCombinations.length;
        return popularProfiles + essentialCombinations;
    }

    /**
     * Estimate generation cost
     */
    estimateGenerationCost() {
        const totalVariants = this.calculateTotalVariants();
        const inputTokens = totalVariants * this.generationCosts.claude.inputTokensPerVariant;
        const outputTokens = totalVariants * this.generationCosts.claude.outputTokensPerVariant;
        
        const inputCost = (inputTokens / 1000000) * this.generationCosts.claude.costPerMillionInputTokens;
        const outputCost = (outputTokens / 1000000) * this.generationCosts.claude.costPerMillionOutputTokens;
        
        return {
            totalVariants,
            inputTokens,
            outputTokens,
            inputCost,
            outputCost,
            totalCost: inputCost + outputCost
        };
    }

    /**
     * Get variant statistics
     */
    getVariantStatistics() {
        const stats = {
            totalAgeGroups: this.coreVariants.ageGroups.length,
            totalToneStyles: this.coreVariants.toneStyles.length,
            totalLearningStyles: this.coreVariants.learningStyles.length,
            totalCognitiveLevels: this.coreVariants.cognitiveLevels.length,
            totalInterestAreas: this.coreVariants.interestAreas.length,
            totalAccessibilityNeeds: this.coreVariants.accessibilityNeeds.length,
            totalLanguageComplexity: this.coreVariants.languageComplexity.length,
            totalPossibleVariants: this.coreVariants.ageGroups.length * 
                                 this.coreVariants.toneStyles.length * 
                                 this.coreVariants.learningStyles.length * 
                                 this.coreVariants.cognitiveLevels.length * 
                                 this.coreVariants.interestAreas.length * 
                                 this.coreVariants.accessibilityNeeds.length * 
                                 this.coreVariants.languageComplexity.length,
            essentialVariants: this.calculateTotalVariants(),
            costEstimate: this.estimateGenerationCost()
        };
        
        return stats;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.SmartVariantGenerator = SmartVariantGenerator;
}
if (typeof module !== 'undefined') {
    module.exports = { SmartVariantGenerator };
} 