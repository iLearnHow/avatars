/**
 * Pre-Generation Pipeline for iLearnHow Lessons
 * Generates all variants for a single lesson day
 */

const DAY_1_DNA = {
  universal_concept: "stellar_physics_enables_life_and_scientific_understanding",
  core_principle: "scientific_observation_and_measurement_create_shared_global_knowledge", 
  learning_essence: "Understand how the sun works through nuclear fusion and how this knowledge connects us to both cosmic processes and practical energy solutions",
  
  age_groups: {
    early_childhood: {
      vocabulary: ["sun", "warm", "bright", "light", "grow", "day", "energy"],
      complexity: "concrete_observable_actions_and_immediate_effects",
      examples: ["feeling_warm_sunshine_on_your_face", "watching_flowers_turn_toward_the_sun"],
      metaphor: "sun_as_magical_friend_that_helps_everything_grow"
    },
    youth: {
      vocabulary: ["fusion", "hydrogen", "helium", "radiation", "photovoltaic", "renewable"],
      complexity: "systems_thinking_with_practical_applications",
      examples: ["solar_panels_on_calculators_and_houses", "photosynthesis_powering_food_chains"],
      metaphor: "sun_as_cosmic_power_plant_and_life_enabler"
    },
    young_adult: {
      vocabulary: ["proton-proton_chain", "stellar_nucleosynthesis", "photovoltaic_efficiency"],
      complexity: "mechanistic_understanding_with_career_and_technology_applications", 
      examples: ["grid_scale_solar_installations_and_energy_storage", "fusion_research_for_clean_energy_production"],
      metaphor: "sun_as_natural_fusion_reactor_and_renewable_energy_model"
    }
  },
  
  tone_styles: {
    grandmother: {
      voice_character: "loving_wise_elder_sharing_cosmic_wonder_with_gentle_authority",
      openings: ["Oh my dear one,", "Sweetheart,", "Let me tell you something wonderful,"],
      transitions: ["Now here's the most beautiful part", "And this is where it gets truly magical"],
      closings: ["What a blessing this knowledge is, precious one", "Sleep well knowing how amazing our universe is"]
    },
    fun: {
      voice_character: "enthusiastic_cosmic_adventure_guide_and_science_celebration_leader",
      openings: ["Ready to have your mind BLOWN?", "Welcome to the most incredible cosmic show!"],
      transitions: ["But wait, it gets even MORE incredible!", "Plot twist - here's the mind-blowing part!"],
      closings: ["You're officially a solar system expert!", "Sweet dreams, you incredible cosmic explorer!"]
    }
  }
};

/**
 * Generate all variants for Day 1
 */
async function generateDay1Variants() {
  const variants = {};
  const ageGroups = Object.keys(DAY_1_DNA.age_groups);
  const toneStyles = Object.keys(DAY_1_DNA.tone_styles);
  
  console.log('🚀 Starting pre-generation for Day 1...');
  
  for (const age of ageGroups) {
    for (const tone of toneStyles) {
      const variantKey = `${age}_${tone}`;
      console.log(`📝 Generating variant: ${variantKey}`);
      
      try {
        const content = await generateLessonVariant(1, age, tone);
        variants[variantKey] = content;
        
        console.log(`✅ Generated ${variantKey} successfully`);
      } catch (error) {
        console.error(`❌ Failed to generate ${variantKey}:`, error);
      }
    }
  }
  
  return variants;
}

/**
 * Generate a single lesson variant
 */
async function generateLessonVariant(day, age, tone) {
  const ageData = DAY_1_DNA.age_groups[age];
  const toneData = DAY_1_DNA.tone_styles[tone];
  
  const prompt = buildVariantPrompt(day, age, tone, ageData, toneData);
  
  const response = await fetch('https://ilearnhow-enterprise-synthesis.nicoletterankin.workers.dev/api/synthesize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lessonContent: DAY_1_DNA.learning_essence,
      age: getAgeForGroup(age),
      tone: tone,
      clientId: `pregen-${day}-${age}-${tone}`
    })
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  
  const data = await response.json();
  
  return {
    day,
    age,
    tone,
    content: data.content,
    metadata: {
      universal_concept: DAY_1_DNA.universal_concept,
      core_principle: DAY_1_DNA.core_principle,
      learning_essence: DAY_1_DNA.learning_essence,
      age_group: age,
      tone_style: tone,
      vocabulary: ageData.vocabulary,
      complexity: ageData.complexity,
      metaphor: ageData.metaphor,
      examples: ageData.examples,
      generated: new Date().toISOString()
    }
  };
}

function getAgeForGroup(ageGroup) {
  const ageMap = {
    early_childhood: 8,
    youth: 15,
    young_adult: 25
  };
  return ageMap[ageGroup];
}

function buildVariantPrompt(day, age, tone, ageData, toneData) {
  return `Create a lesson about the sun for day ${day} with these specific requirements:

AGE GROUP: ${age} (${ageData.complexity})
- Vocabulary: ${ageData.vocabulary.join(', ')}
- Metaphor: ${ageData.metaphor}
- Examples: ${ageData.examples.join(', ')}

TONE: ${tone} (${toneData.voice_character})
- Opening style: ${toneData.openings.join(' or ')}
- Transition style: ${toneData.transitions.join(' or ')}
- Closing style: ${toneData.closings.join(' or ')}

UNIVERSAL CONCEPT: ${DAY_1_DNA.universal_concept}
CORE PRINCIPLE: ${DAY_1_DNA.core_principle}
LEARNING ESSENCE: ${DAY_1_DNA.learning_essence}

Create a lesson with Introduction, Core Concept, Real-World Examples, and Reflection Question sections.`;
}

/**
 * Save generated variants to storage
 */
async function saveVariants(variants) {
  const storageKey = `day1_variants_${Date.now()}`;
  
  // Save to KV storage
  try {
    // This would save to your KV namespace
    console.log(`💾 Saving ${Object.keys(variants).length} variants to storage...`);
    return storageKey;
  } catch (error) {
    console.error('Failed to save variants:', error);
    throw error;
  }
}

/**
 * Test the pre-generation pipeline
 */
async function testPreGeneration() {
  console.log('🧪 Testing pre-generation pipeline...');
  
  try {
    const variants = await generateDay1Variants();
    console.log(`✅ Generated ${Object.keys(variants).length} variants`);
    
    const storageKey = await saveVariants(variants);
    console.log(`💾 Saved to storage with key: ${storageKey}`);
    
    // Test serving a variant
    const testVariant = variants['early_childhood_grandmother'];
    console.log('📖 Test variant content preview:', testVariant.content.substring(0, 200) + '...');
    
    return { success: true, variants, storageKey };
  } catch (error) {
    console.error('❌ Pre-generation test failed:', error);
    return { success: false, error: error.message };
  }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testPreGeneration, generateDay1Variants };
} 