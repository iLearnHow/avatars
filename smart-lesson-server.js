/**
 * Smart Lesson Server
 * Instantly serves pre-generated lesson variants with real-time assembly
 */

class SmartLessonServer {
  constructor() {
    this.cache = new Map();
    this.variants = {};
    this.initialized = false;
  }

  /**
   * Initialize with pre-generated variants
   */
  async initialize() {
    console.log('🚀 Initializing Smart Lesson Server...');
    
    try {
      // Load pre-generated variants from storage
      await this.loadVariants();
      
      // Warm up cache with common combinations
      await this.warmCache();
      
      this.initialized = true;
      console.log('✅ Smart Lesson Server initialized');
      
    } catch (error) {
      console.error('❌ Failed to initialize Smart Lesson Server:', error);
      throw error;
    }
  }

  /**
   * Load pre-generated variants from storage
   */
  async loadVariants() {
    // In production, this would load from KV storage
    // For now, we'll simulate with a small set
    this.variants = {
      'day1_early_childhood_grandmother': {
        content: "Oh my dear one, let me tell you something wonderful about our bright friend in the sky...",
        metadata: {
          age_group: 'early_childhood',
          tone_style: 'grandmother',
          vocabulary: ['sun', 'warm', 'bright', 'light'],
          complexity: 'concrete_observable_actions_and_immediate_effects'
        }
      },
      'day1_early_childhood_fun': {
        content: "Ready to have your mind BLOWN by the most incredible cosmic show...",
        metadata: {
          age_group: 'early_childhood', 
          tone_style: 'fun',
          vocabulary: ['sun', 'warm', 'bright', 'light'],
          complexity: 'concrete_observable_actions_and_immediate_effects'
        }
      },
      'day1_youth_grandmother': {
        content: "Sweetheart, today we'll discover how the sun powers our world through fusion...",
        metadata: {
          age_group: 'youth',
          tone_style: 'grandmother',
          vocabulary: ['fusion', 'hydrogen', 'helium', 'radiation'],
          complexity: 'systems_thinking_with_practical_applications'
        }
      },
      'day1_youth_fun': {
        content: "Welcome to the most incredible cosmic show! Let's explore fusion power...",
        metadata: {
          age_group: 'youth',
          tone_style: 'fun', 
          vocabulary: ['fusion', 'hydrogen', 'helium', 'radiation'],
          complexity: 'systems_thinking_with_practical_applications'
        }
      },
      'day1_young_adult_grandmother': {
        content: "Let me share something that will amaze you about stellar nucleosynthesis...",
        metadata: {
          age_group: 'young_adult',
          tone_style: 'grandmother',
          vocabulary: ['proton-proton_chain', 'stellar_nucleosynthesis', 'photovoltaic_efficiency'],
          complexity: 'mechanistic_understanding_with_career_and_technology_applications'
        }
      },
      'day1_young_adult_fun': {
        content: "BOOM! Science magic happening! Let's dive into proton-proton chains...",
        metadata: {
          age_group: 'young_adult',
          tone_style: 'fun',
          vocabulary: ['proton-proton_chain', 'stellar_nucleosynthesis', 'photovoltaic_efficiency'], 
          complexity: 'mechanistic_understanding_with_career_and_technology_applications'
        }
      }
    };
    
    console.log(`📚 Loaded ${Object.keys(this.variants).length} pre-generated variants`);
  }

  /**
   * Warm up cache with common combinations
   */
  async warmCache() {
    const commonCombinations = [
      { day: 1, age: 'early_childhood', tone: 'grandmother' },
      { day: 1, age: 'early_childhood', tone: 'fun' },
      { day: 1, age: 'youth', tone: 'grandmother' },
      { day: 1, age: 'youth', tone: 'fun' },
      { day: 1, age: 'young_adult', tone: 'grandmother' },
      { day: 1, age: 'young_adult', tone: 'fun' }
    ];

    for (const combo of commonCombinations) {
      const key = this.buildCacheKey(combo.day, combo.age, combo.tone);
      const lesson = await this.serveLesson(combo.day, combo.age, combo.tone);
      this.cache.set(key, lesson);
    }

    console.log(`🔥 Warmed cache with ${commonCombinations.length} combinations`);
  }

  /**
   * Serve a lesson with instant response
   */
  async serveLesson(day, age, tone) {
    const startTime = performance.now();
    
    try {
      // Check cache first
      const cacheKey = this.buildCacheKey(day, age, tone);
      const cached = this.cache.get(cacheKey);
      
      if (cached) {
        const responseTime = performance.now() - startTime;
        console.log(`⚡ Cache hit: ${responseTime.toFixed(2)}ms`);
        return { ...cached, cached: true, responseTime };
      }

      // Generate lesson content dynamically
      const lesson = this.generateLessonContent(day, age, tone);
      
      // Cache the result
      this.cache.set(cacheKey, lesson);
      
      const responseTime = performance.now() - startTime;
      console.log(`📖 Served lesson: ${responseTime.toFixed(2)}ms`);
      
      return { ...lesson, cached: false, responseTime };
      
    } catch (error) {
      console.error('❌ Failed to serve lesson:', error);
      throw error;
    }
  }

  /**
   * Generate lesson content for any day and variant
   */
  generateLessonContent(day, age, tone) {
    const ageGroups = {
      'early_childhood': '5-11',
      'youth': '12-17', 
      'young_adult': '18+'
    };
    
    const tones = {
      'grandmother': 'grandmother',
      'fun': 'fun',
      'neutral': 'neutral'
    };
    
    const ageGroup = ageGroups[age] || '18+';
    const toneStyle = tones[tone] || 'neutral';
    
    // Generate lesson structure
    const lesson = {
      day: day,
      title: this.generateLessonTitle(day),
      content: {
        introduction: this.generateIntroduction(day, ageGroup, toneStyle),
        mainContent: this.generateMainContent(day, ageGroup, toneStyle),
        conclusion: this.generateConclusion(day, ageGroup, toneStyle),
        keyTakeaways: this.generateKeyTakeaways(day)
      },
      duration: this.calculateDuration(day),
      difficulty: this.calculateDifficulty(day),
      ageGroup: ageGroup,
      tone: toneStyle,
      metadata: {
        assembled: new Date().toISOString(),
        universal_concept: "learning_and_growth",
        core_principle: "knowledge_empowers_understanding"
      }
    };
    
    return lesson;
  }

  /**
   * Generate lesson title
   */
  generateLessonTitle(day) {
    const titles = [
      "The Science of Everyday Life",
      "Mathematics in Nature", 
      "Understanding Our World",
      "The Power of Learning",
      "Exploring New Concepts",
      "Building Knowledge",
      "Discovering Patterns",
      "The Art of Problem Solving",
      "Connecting Ideas",
      "Growing Through Learning"
    ];
    
    return titles[day % titles.length];
  }

  /**
   * Generate introduction
   */
  generateIntroduction(day, ageGroup, tone) {
    const baseIntro = `Welcome to lesson ${day}! Today we'll explore something fascinating.`;
    
    switch (tone) {
      case 'grandmother':
        return `Oh my dear one, ${baseIntro.toLowerCase()}`;
      case 'fun':
        return `Get ready for some awesome learning! ${baseIntro}`;
      default:
        return baseIntro;
    }
  }

  /**
   * Generate main content
   */
  generateMainContent(day, ageGroup, tone) {
    const baseContent = `This is the main content for lesson ${day}. We'll discover important concepts that connect to your everyday life.`;
    
    switch (tone) {
      case 'grandmother':
        return `You see, sweetheart, ${baseContent.toLowerCase()}`;
      case 'fun':
        return `Here's the exciting part: ${baseContent}`;
      default:
        return baseContent;
    }
  }

  /**
   * Generate conclusion
   */
  generateConclusion(day, ageGroup, tone) {
    const baseConclusion = `Thank you for completing lesson ${day}! Keep learning and growing.`;
    
    switch (tone) {
      case 'grandmother':
        return `And just between you and me, ${baseConclusion.toLowerCase()}`;
      case 'fun':
        return `How cool is that? ${baseConclusion}`;
      default:
        return baseConclusion;
    }
  }

  /**
   * Generate key takeaways
   */
  generateKeyTakeaways(day) {
    return [
      `Key takeaway 1 for lesson ${day}`,
      `Key takeaway 2 for lesson ${day}`,
      `Key takeaway 3 for lesson ${day}`
    ];
  }

  /**
   * Calculate duration
   */
  calculateDuration(day) {
    return 5 + (day % 10);
  }

  /**
   * Calculate difficulty
   */
  calculateDifficulty(day) {
    return Math.min(Math.floor(day / 30) + 1, 5);
  }

  /**
   * Assemble lesson from pre-generated content
   */
  assembleLesson(variant, day, age, tone) {
    const sections = this.splitContentIntoSections(variant.content);
    
    return {
      day,
      age,
      tone,
      title: this.generateTitle(day, age, tone),
      sections: {
        introduction: sections.introduction || this.generateFallbackSection('introduction', age, tone),
        core_concept: sections.core_concept || this.generateFallbackSection('core_concept', age, tone),
        examples: sections.examples || this.generateFallbackSection('examples', age, tone),
        reflection: sections.reflection || this.generateFallbackSection('reflection', age, tone)
      },
      metadata: {
        ...variant.metadata,
        assembled: new Date().toISOString(),
        universal_concept: "stellar_physics_enables_life_and_scientific_understanding",
        core_principle: "scientific_observation_and_measurement_create_shared_global_knowledge"
      }
    };
  }

  /**
   * Split content into sections
   */
  splitContentIntoSections(content) {
    const sections = {};
    const lines = content.split('\n\n');
    
    for (const line of lines) {
      if (line.toLowerCase().includes('introduction')) {
        sections.introduction = line.replace(/introduction/i, '').trim();
      } else if (line.toLowerCase().includes('core concept')) {
        sections.core_concept = line.replace(/core concept/i, '').trim();
      } else if (line.toLowerCase().includes('examples')) {
        sections.examples = line.replace(/examples/i, '').trim();
      } else if (line.toLowerCase().includes('reflection')) {
        sections.reflection = line.replace(/reflection/i, '').trim();
      }
    }
    
    return sections;
  }

  /**
   * Generate dynamic title
   */
  generateTitle(day, age, tone) {
    const ageTitles = {
      early_childhood: "The Amazing Sun That Lights Up Our World",
      youth: "The Sun - Earth's Incredible Energy Source", 
      young_adult: "Solar Physics - Understanding Our Star"
    };
    
    const toneModifiers = {
      grandmother: "Warm ",
      fun: "Amazing ",
      neutral: ""
    };
    
    return toneModifiers[tone] + ageTitles[age];
  }

  /**
   * Generate fallback section content
   */
  generateFallbackSection(sectionType, age, tone) {
    const fallbacks = {
      introduction: {
        early_childhood: "Let's learn about the bright sun in the sky!",
        youth: "Today we'll discover how the sun powers our world.",
        young_adult: "We'll examine the sun's role in stellar evolution and life."
      },
      core_concept: {
        early_childhood: "The sun is like a giant light bulb in the sky that helps everything grow.",
        youth: "The sun is a star that provides light and heat to Earth through fusion.",
        young_adult: "The sun is a main-sequence star converting hydrogen to helium."
      },
      examples: {
        early_childhood: "Think about feeling warm sunshine on your face and watching flowers grow.",
        youth: "Solar panels on calculators and photosynthesis powering food chains.",
        young_adult: "Grid-scale solar installations and fusion research for clean energy."
      },
      reflection: {
        early_childhood: "What do you see when you look at the sun?",
        youth: "How would Earth be different without the sun?",
        young_adult: "How does understanding the sun help us understand other stars?"
      }
    };
    
    return fallbacks[sectionType]?.[age] || "Content coming soon...";
  }

  /**
   * Build cache key
   */
  buildCacheKey(day, age, tone) {
    return `${day}_${age}_${tone}`;
  }

  /**
   * Get server status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      variantsLoaded: Object.keys(this.variants).length,
      cacheSize: this.cache.size,
      memoryUsage: process.memoryUsage?.() || 'N/A'
    };
  }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SmartLessonServer };
} 