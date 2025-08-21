/**
 * Corrected Variant Generator for iLearn
 * Based on actual DNA structure and curriculum system
 */

class CorrectedVariantGenerator {
    constructor() {
        this.ageGroups = this.defineAgeGroups();
        this.tonePatterns = this.defineTonePatterns();
        this.contentTypes = this.defineContentTypes();
        this.questionTypes = this.defineQuestionTypes();
        this.curriculumTopics = this.loadCurriculumTopics();
    }

    /**
     * Define the 5 actual age groups from DNA
     */
    defineAgeGroups() {
        return {
            early_childhood: {
                name: "Early Childhood",
                ageRange: "3-8 years",
                conceptName: "The Amazing [Topic] That [Simple Description]",
                coreMetaphor: "[topic]_as_magical_friend_that_helps_everything_grow",
                complexityLevel: "concrete_observable_actions_and_immediate_effects",
                attentionSpan: "3-4_minutes",
                cognitiveFocus: "simple_cause_and_effect_with_wonder_and_safety",
                vocabulary: ["simple", "basic", "warm", "bright", "grow", "help", "wonder"],
                abstractConcepts: {
                    "complex_process": "tiny_pieces_working_together_to_make_something_amazing",
                    "scientific_observation": "watching_and_learning_about_how_things_work",
                    "energy_conversion": "changing_one_thing_into_another_helpful_thing"
                }
            },
            youth: {
                name: "Youth",
                ageRange: "9-17 years",
                conceptName: "[Topic] - [Age-Appropriate Description]",
                coreMetaphor: "[topic]_as_cosmic_power_plant_and_life_enabler",
                complexityLevel: "systems_thinking_with_practical_applications",
                attentionSpan: "5-6_minutes",
                cognitiveFocus: "understanding_processes_and_connections_to_technology",
                vocabulary: ["fusion", "hydrogen", "helium", "radiation", "photovoltaic", "renewable", "sustainable"],
                abstractConcepts: {
                    "nuclear_fusion": "hydrogen_atoms_combining_under_extreme_pressure_to_create_helium_and_energy",
                    "energy_conversion": "mass_to_energy_transformation_following_einsteins_equation",
                    "scientific_observation": "using_instruments_and_data_to_understand_processes"
                }
            },
            young_adult: {
                name: "Young Adult",
                ageRange: "18-25 years",
                conceptName: "[Topic] - Understanding [Complex Description]",
                coreMetaphor: "[topic]_as_natural_fusion_reactor_and_renewable_energy_model",
                complexityLevel: "mechanistic_understanding_with_career_and_technology_applications",
                attentionSpan: "6_minutes",
                cognitiveFocus: "practical_applications_and_future_implications",
                vocabulary: ["proton-proton_chain", "stellar_nucleosynthesis", "photovoltaic_efficiency", "concentrated_solar_power", "energy_policy"],
                abstractConcepts: {
                    "nuclear_fusion": "four_hydrogen_nuclei_fusing_to_form_helium_releasing_energy_per_einsteins_mass_energy_equivalence",
                    "energy_conversion": "electromagnetic_radiation_conversion_to_electrical_energy_through_semiconductor_physics",
                    "scientific_observation": "spectroscopy_and_satellite_data_revealing_structure_and_dynamics"
                }
            },
            midlife: {
                name: "Midlife",
                ageRange: "26-60 years",
                conceptName: "[Topic] - [Systems Integration Description]",
                coreMetaphor: "[topic]_as_sustainable_energy_foundation_and_environmental_stewardship_guide",
                complexityLevel: "systems_integration_and_long_term_planning_perspective",
                attentionSpan: "6_minutes",
                cognitiveFocus: "family_community_and_legacy_considerations",
                vocabulary: ["net_metering", "carbon_footprint", "energy_independence", "intergenerational_equity", "sustainable_development"],
                abstractConcepts: {
                    "nuclear_fusion": "stellar_fusion_as_model_for_clean_energy_production_and_long_term_sustainability",
                    "energy_conversion": "integrated_energy_systems_combining_storage_and_grid_technologies",
                    "scientific_observation": "evidence_based_decision_making_for_investments_and_environmental_stewardship"
                }
            },
            wisdom_years: {
                name: "Wisdom Years",
                ageRange: "61+ years",
                conceptName: "[Topic] - A Lifetime of [Topic] Wonder and Wisdom",
                coreMetaphor: "[topic]_as_eternal_teacher_and_symbol_of_continuity_across_generations",
                complexityLevel: "philosophical_integration_with_scientific_understanding_and_life_experience",
                attentionSpan: "6_minutes",
                cognitiveFocus: "meaning_making_legacy_and_sharing_wisdom_with_younger_generations",
                vocabulary: ["stellar_evolution", "cosmic_perspective", "intergenerational_wisdom", "scientific_legacy", "environmental_stewardship"],
                abstractConcepts: {
                    "nuclear_fusion": "fusion_as_fundamental_cosmic_process_connecting_personal_experience_to_universal_physical_laws",
                    "energy_conversion": "lifetime_perspective_on_energy_transformation_from_cosmic_to_personal_to_societal_scales",
                    "scientific_observation": "accumulated_wisdom_from_decades_of_scientific_progress_and_technological_change"
                }
            }
        };
    }

    /**
     * Define the 3 tone patterns from DNA
     */
    defineTonePatterns() {
        return {
            grandmother: {
                name: "Grandmother",
                voiceCharacter: "loving_wise_elder_sharing_cosmic_wonder_with_gentle_authority",
                emotionalTemperature: "warm_nurturing_amazed_protective",
                languagePatterns: {
                    openings: ["Oh my dear one,", "Sweetheart,", "Let me tell you something wonderful,", "Come close and listen,"],
                    transitions: ["Now here's the most beautiful part", "And this is where it gets truly magical", "Let me share something that will amaze you"],
                    encouragements: ["Isn't that just incredible?", "What a miracle this is!", "You understand such beautiful things!", "How wonderful that you're learning this!"],
                    closings: ["What a blessing this knowledge is, precious one", "Sleep well knowing how amazing our universe is", "You carry such wonder in your heart"]
                },
                metaphorStyle: "gentle_wonder_family_warmth_nature_protection_based",
                questionApproach: "soft_curious_wonder_that_honors_the_learners_natural_curiosity",
                validationStyle: "deep_celebration_of_intelligence_and_natural_wonder"
            },
            fun: {
                name: "Fun",
                voiceCharacter: "enthusiastic_cosmic_adventure_guide_and_science_celebration_leader",
                emotionalTemperature: "high_energy_amazed_celebratory_mind_blowing",
                languagePatterns: {
                    openings: ["Ready to have your mind BLOWN?", "Welcome to the most incredible cosmic show!", "Time to explore something absolutely AMAZING!", "Get ready for some serious space magic!"],
                    transitions: ["But wait, it gets even MORE incredible!", "Plot twist - here's the mind-blowing part!", "BOOM! Science magic happening!", "And now for the absolute coolest part!"],
                    encouragements: ["You're basically a space scientist now!", "Your brain is on FIRE with this knowledge!", "That's some serious cosmic understanding!", "You're absolutely crushing this stellar physics!"],
                    closings: ["You're officially a solar system expert!", "Sweet dreams, you incredible cosmic explorer!", "See you tomorrow, stellar physicist!", "Keep being the amazing science superstar you are!"]
                },
                metaphorStyle: "cosmic_adventure_superhero_mind_blowing_celebration_based",
                questionApproach: "exciting_space_missions_and_cosmic_discovery_adventures",
                validationStyle: "cosmic_significance_celebration_and_science_superhero_recognition"
            },
            neutral: {
                name: "Neutral",
                voiceCharacter: "knowledgeable_scientific_educator_and_evidence_based_guide",
                emotionalTemperature: "calm_confident_scientifically_precise_inspiring",
                languagePatterns: {
                    openings: ["Today we're exploring", "Let's examine the science of", "Research shows us", "Scientific evidence reveals"],
                    transitions: ["Building on this understanding", "The data demonstrates", "This leads us to discover", "Evidence indicates"],
                    encouragements: ["You're thinking scientifically", "That's excellent scientific reasoning", "You understand the key principles", "You've grasped the important concepts"],
                    closings: ["This knowledge empowers informed decisions", "Scientific understanding serves society well", "Evidence-based thinking benefits everyone", "Continue exploring with curiosity"]
                },
                metaphorStyle: "scientific_evidence_technological_application_research_based",
                questionApproach: "evidence_based_inquiry_and_scientific_method_exploration",
                validationStyle: "scientific_literacy_and_critical_thinking_recognition"
            }
        };
    }

    /**
     * Define the 3 content types from DNA
     */
    defineContentTypes() {
        return {
            voice_over_script: {
                name: "Voice-Over Script",
                description: "Narrated content for audio delivery",
                structure: ["introduction", "main_content", "examples", "reflection", "conclusion"]
            },
            on_screen_text: {
                name: "On-Screen Text",
                description: "Visual text displayed during lesson",
                structure: ["key_points", "definitions", "process_steps", "important_facts"]
            },
            lesson_logic: {
                name: "Lesson Logic",
                description: "Interactive elements and question structure",
                structure: ["question_1", "question_2", "question_3", "daily_fortune"]
            }
        };
    }

    /**
     * Define the 3 question types from DNA
     */
    defineQuestionTypes() {
        return {
            concept_focus: {
                name: "Concept Focus",
                description: "Understanding vs. superficial observation",
                universalPrinciple: "understanding_underlying_processes_provides_deeper_knowledge_than_surface_observations",
                cognitiveTarget: "moving_from_descriptive_to_explanatory_thinking"
            },
            universal_principle: {
                name: "Universal Principle",
                description: "Connecting cosmic processes to practical decisions",
                universalPrinciple: "understanding_energy_sources_enables_sustainable_technological_and_social_choices",
                cognitiveTarget: "connecting_cosmic_processes_to_practical_human_decisions"
            },
            cognitive_target: {
                name: "Cognitive Target",
                description: "Scientific understanding enables wonder and practical advancement",
                universalPrinciple: "scientific_understanding_enables_both_wonder_and_practical_technological_advancement",
                cognitiveTarget: "appreciating_how_fundamental_knowledge_drives_innovation"
            }
        };
    }

    /**
     * Load curriculum topics from all 12 months
     */
    loadCurriculumTopics() {
        // This would load from all 12 curriculum files
        // For now, return sample topics
        return {
            january: [
                { day: 1, title: "The Power of New Beginnings", topic: "Personal Development" },
                { day: 2, title: "The Science of Habit Formation", topic: "Psychology" },
                { day: 3, title: "The Art of Mindful Communication", topic: "Communication" }
            ],
            february: [
                { day: 32, title: "The Art of Creative Problem Solving", topic: "Creativity" },
                { day: 33, title: "The Science of Learning", topic: "Education" },
                { day: 34, title: "The Power of Emotional Intelligence", topic: "Psychology" }
            ],
            march: [
                { day: 60, title: "Robotics - Machines That Move and Act", topic: "Technology" },
                { day: 61, title: "Mindfulness Practice - Being Present in the Moment", topic: "Wellness" },
                { day: 62, title: "Sports History - Competition and Human Achievement", topic: "Sports" }
            ],
            april: [
                { day: 91, title: "Trade Routes - How Goods and Ideas Traveled", topic: "History" },
                { day: 92, title: "Ecosystems - How Living Things Interact", topic: "Science" },
                { day: 93, title: "Drawing and Sketching - Capturing the World on Paper", topic: "Arts" }
            ]
        };
    }

    /**
     * Generate all variants for a single lesson
     */
    async generateLessonVariants(lessonDay, lessonTopic) {
        console.log(`🎯 Generating variants for lesson ${lessonDay}: ${lessonTopic}`);
        
        const variants = [];
        const totalVariants = this.calculateTotalVariants();
        
        console.log(`📊 Total variants to generate: ${totalVariants}`);
        
        // Generate for each age group
        for (const [ageKey, ageGroup] of Object.entries(this.ageGroups)) {
            // Generate for each tone
            for (const [toneKey, tonePattern] of Object.entries(this.tonePatterns)) {
                // Generate for each content type
                for (const [contentKey, contentType] of Object.entries(this.contentTypes)) {
                    // Generate for each question type
                    for (const [questionKey, questionType] of Object.entries(this.questionTypes)) {
                        // Generate for each answer choice (A and B)
                        for (const choice of ['A', 'B']) {
                            const variant = await this.generateVariant(
                                lessonDay, 
                                lessonTopic, 
                                ageKey, 
                                toneKey, 
                                contentKey, 
                                questionKey, 
                                choice
                            );
                            variants.push(variant);
                        }
                    }
                }
            }
        }
        
        // Generate daily fortune
        const fortune = await this.generateDailyFortune(lessonDay, lessonTopic);
        variants.push(fortune);
        
        console.log(`✅ Generated ${variants.length} variants`);
        return variants;
    }

    /**
     * Generate a single variant
     */
    async generateVariant(lessonDay, lessonTopic, ageGroup, tone, contentType, questionType, choice) {
        const ageInfo = this.ageGroups[ageGroup];
        const toneInfo = this.tonePatterns[tone];
        const contentInfo = this.contentTypes[contentType];
        const questionInfo = this.questionTypes[questionType];
        
        const prompt = this.buildVariantPrompt(
            lessonDay, 
            lessonTopic, 
            ageInfo, 
            toneInfo, 
            contentInfo, 
            questionInfo, 
            choice
        );
        
        const content = await this.generateContentWithClaude(prompt);
        
        return {
            lessonDay,
            topic: lessonTopic,
            variantId: `${ageGroup}_${tone}_${contentType}_${questionType}_${choice}`,
            content,
            metadata: {
                ageGroup,
                tone,
                contentType,
                questionType,
                choice,
                generationTime: new Date().toISOString()
            }
        };
    }

    /**
     * Build prompt for variant generation
     */
    buildVariantPrompt(lessonDay, lessonTopic, ageInfo, toneInfo, contentInfo, questionInfo, choice) {
        return `
Create content for lesson ${lessonDay} about "${lessonTopic}" with the following specifications:

AGE GROUP: ${ageInfo.name} (${ageInfo.ageRange})
- Concept Name: ${ageInfo.conceptName}
- Core Metaphor: ${ageInfo.coreMetaphor}
- Complexity Level: ${ageInfo.complexityLevel}
- Attention Span: ${ageInfo.attentionSpan}
- Cognitive Focus: ${ageInfo.cognitiveFocus}
- Vocabulary: ${ageInfo.vocabulary.join(', ')}

TONE: ${toneInfo.name}
- Voice Character: ${toneInfo.voiceCharacter}
- Emotional Temperature: ${toneInfo.emotionalTemperature}
- Opening Style: ${toneInfo.languagePatterns.openings[0]}
- Encouragement Style: ${toneInfo.languagePatterns.encouragements[0]}
- Closing Style: ${toneInfo.languagePatterns.closings[0]}

CONTENT TYPE: ${contentInfo.name}
- Structure: ${contentInfo.structure.join(', ')}

QUESTION TYPE: ${questionInfo.name}
- Universal Principle: ${questionInfo.universalPrinciple}
- Cognitive Target: ${questionInfo.cognitiveTarget}
- Choice: ${choice}

Please create content that:
1. Uses age-appropriate vocabulary and complexity
2. Matches the specified tone and voice character
3. Follows the content type structure
4. Incorporates the question type's universal principle
5. Maintains educational integrity while being engaging
        `.trim();
    }

    /**
     * Generate daily fortune
     */
    async generateDailyFortune(lessonDay, lessonTopic) {
        const prompt = `
Create a daily fortune for lesson ${lessonDay} about "${lessonTopic}" that includes:
- Core identity shift
- Skill celebration
- Relationship impact
- Universal connection

The fortune should be inspiring and connect the lesson to the learner's life and the broader universe.
        `.trim();
        
        const content = await this.generateContentWithClaude(prompt);
        
        return {
            lessonDay,
            topic: lessonTopic,
            variantId: `daily_fortune_${lessonDay}`,
            content,
            metadata: {
                type: 'daily_fortune',
                generationTime: new Date().toISOString()
            }
        };
    }

    /**
     * Generate content using Claude API (placeholder)
     */
    async generateContentWithClaude(prompt) {
        // This would be the actual Claude API call
        // For now, return placeholder content
        return {
            introduction: "Welcome to this lesson!",
            mainContent: "This is the main content of the lesson.",
            examples: "Here are some examples.",
            reflection: "What did you learn?",
            conclusion: "Thank you for learning with us!"
        };
    }

    /**
     * Calculate total variants
     */
    calculateTotalVariants() {
        const ageGroups = Object.keys(this.ageGroups).length; // 5
        const tones = Object.keys(this.tonePatterns).length; // 3
        const contentTypes = Object.keys(this.contentTypes).length; // 3
        const questionTypes = Object.keys(this.questionTypes).length; // 3
        const choices = 2; // A and B
        const fortune = 1; // Daily fortune
        
        return (ageGroups * tones * contentTypes * questionTypes * choices) + fortune;
    }

    /**
     * Estimate generation cost
     */
    estimateGenerationCost() {
        const totalVariants = this.calculateTotalVariants();
        const inputTokensPerVariant = 500;
        const outputTokensPerVariant = 1000;
        
        const inputTokens = totalVariants * inputTokensPerVariant;
        const outputTokens = totalVariants * outputTokensPerVariant;
        
        const inputCost = (inputTokens / 1000000) * 3.00; // $3 per million input tokens
        const outputCost = (outputTokens / 1000000) * 15.00; // $15 per million output tokens
        
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
            totalAgeGroups: Object.keys(this.ageGroups).length,
            totalTones: Object.keys(this.tonePatterns).length,
            totalContentTypes: Object.keys(this.contentTypes).length,
            totalQuestionTypes: Object.keys(this.questionTypes).length,
            totalChoices: 2,
            totalVariants: this.calculateTotalVariants(),
            costEstimate: this.estimateGenerationCost()
        };
        
        return stats;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.CorrectedVariantGenerator = CorrectedVariantGenerator;
}
if (typeof module !== 'undefined') {
    module.exports = { CorrectedVariantGenerator };
} 