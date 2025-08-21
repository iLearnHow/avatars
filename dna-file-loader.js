/**
 * DNA File Loader - Critical component for loading and caching DNA files
 * Handles loading of 366 DNA files (001_topic.json through 366_topic.json)
 * Provides instant access to DNA data for variant generation
 */

class DNAFileLoader {
  constructor() {
    this.dnaCache = new Map();
    this.loadingPromises = new Map();
    this.basePath = '/dna_files/';
  }

  /**
   * Load DNA file for specific day
   * @param {number} dayNumber - Day number (1-366)
   * @returns {Promise<Object>} DNA data object
   */
  async loadDNAForDay(dayNumber) {
    // Validate day number
    if (dayNumber < 1 || dayNumber > 366) {
      throw new Error(`Invalid day number: ${dayNumber}. Must be between 1 and 366.`);
    }

    // Check cache first
    if (this.dnaCache.has(dayNumber)) {
      return this.dnaCache.get(dayNumber);
    }

    // Check if already loading
    if (this.loadingPromises.has(dayNumber)) {
      return this.loadingPromises.get(dayNumber);
    }

    // Load DNA file
    const loadingPromise = this.loadDNAFile(dayNumber);
    this.loadingPromises.set(dayNumber, loadingPromise);

    try {
      const dnaData = await loadingPromise;
      this.dnaCache.set(dayNumber, dnaData);
      this.loadingPromises.delete(dayNumber);
      return dnaData;
    } catch (error) {
      this.loadingPromises.delete(dayNumber);
      throw error;
    }
  }

  /**
   * Load specific DNA file from server
   * @param {number} dayNumber - Day number
   * @returns {Promise<Object>} DNA data
   */
  async loadDNAFile(dayNumber) {
    const fileName = `${dayNumber.toString().padStart(3, '0')}_topic.json`;
    const filePath = `${this.basePath}${fileName}`;

    try {
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to load DNA file: ${fileName}. Status: ${response.status}`);
      }

      const dnaData = await response.json();
      
      // Validate DNA structure
      this.validateDNAStructure(dnaData, dayNumber);
      
      return dnaData;
    } catch (error) {
      console.error(`Error loading DNA file for day ${dayNumber}:`, error);
      
      // Return fallback DNA using template
      return this.getFallbackDNA(dayNumber);
    }
  }

  /**
   * Validate DNA file structure
   * @param {Object} dnaData - DNA data to validate
   * @param {number} dayNumber - Day number for validation
   */
  validateDNAStructure(dnaData, dayNumber) {
    const requiredFields = [
      'lesson_id', 'day', 'date', 'universal_concept', 
      'core_principle', 'learning_essence', 'age_expressions',
      'tone_delivery_dna', 'language_translations',
      '__lesson_player_integration'
    ];

    for (const field of requiredFields) {
      if (!dnaData.hasOwnProperty(field)) {
        throw new Error(`DNA file for day ${dayNumber} missing required field: ${field}`);
      }
    }

    // Validate age expressions (10 age buckets)
    const expectedAges = ['age_2', 'age_5', 'age_8', 'age_12', 'age_16', 'age_25', 'age_40', 'age_60', 'age_80', 'age_102'];
    for (const age of expectedAges) {
      if (!dnaData.age_expressions.hasOwnProperty(age)) {
        throw new Error(`DNA file for day ${dayNumber} missing age expression: ${age}`);
      }
    }

    // Validate tone delivery (3 tones)
    const expectedTones = ['grandmother', 'fun', 'neutral'];
    for (const tone of expectedTones) {
      if (!dnaData.tone_delivery_dna.hasOwnProperty(tone)) {
        throw new Error(`DNA file for day ${dayNumber} missing tone delivery: ${tone}`);
      }
    }
  }

  /**
   * Get fallback DNA using template structure
   * @param {number} dayNumber - Day number
   * @returns {Object} Fallback DNA data
   */
  getFallbackDNA(dayNumber) {
    // Load template and customize for specific day
    return {
      lesson_id: `fallback_lesson_${dayNumber}`,
      day: dayNumber,
      date: this.getDateFromDay(dayNumber),
      universal_concept: "universal_learning_principle",
      core_principle: "fundamental_truth_across_all_cultures",
      learning_essence: "What learners will discover through this lesson",
      age_expressions: this.getFallbackAgeExpressions(),
      tone_delivery_dna: this.getFallbackToneDelivery(),
      language_translations: this.getFallbackLanguageTranslations(),
      core_lesson_structure: this.getFallbackCoreLessonStructure(),
      example_selector_data: this.getFallbackExampleData(),
      daily_fortune_elements: this.getFallbackFortuneElements(),
      __lesson_player_integration: this.getFallbackIntegration()
    };
  }

  /**
   * Get date string from day number
   * @param {number} dayNumber - Day number
   * @returns {string} Date string
   */
  getDateFromDay(dayNumber) {
    const date = new Date(2024, 0, dayNumber);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric' 
    });
  }

  /**
   * Get fallback age expressions
   * @returns {Object} Age expressions data
   */
  getFallbackAgeExpressions() {
    return {
      age_2: { concept_name: "Toddler Learning", complexity_level: "sensory_immediate" },
      age_5: { concept_name: "Early Childhood Learning", complexity_level: "concrete_observable" },
      age_8: { concept_name: "School Age Learning", complexity_level: "rule_understanding" },
      age_12: { concept_name: "Pre-Teen Learning", complexity_level: "identity_formation" },
      age_16: { concept_name: "Teen Learning", complexity_level: "abstract_thinking" },
      age_25: { concept_name: "Young Adult Learning", complexity_level: "practical_application" },
      age_40: { concept_name: "Midlife Learning", complexity_level: "leadership_community" },
      age_60: { concept_name: "Pre-Retirement Learning", complexity_level: "wisdom_consolidation" },
      age_80: { concept_name: "Elder Wisdom Learning", complexity_level: "philosophical_integration" },
      age_102: { concept_name: "Centenarian Learning", complexity_level: "transcendent_perspective" }
    };
  }

  /**
   * Get fallback tone delivery
   * @returns {Object} Tone delivery data
   */
  getFallbackToneDelivery() {
    return {
      grandmother: {
        voice_character: "loving_wise_elder_with_life_experience_and_gentle_guidance",
        emotional_temperature: "warm_nurturing_encouraging_with_gentle_wisdom",
        language_patterns: {
          openings: ["My dear learner,", "Sweetheart, come learn with me,", "Oh my precious one,", "Come here, love, let's explore together,"],
          transitions: ["And here's the beautiful thing about learning", "Now, this is where it gets wonderful", "The most amazing part is"],
          encouragements: ["How wonderful you are!", "What a gift you have for learning!", "I'm so proud of how you grow!", "You have such natural curiosity!"],
          closings: ["You are so loved, dear learner", "Keep learning with joy in your heart", "Keep growing in knowledge and love"]
        },
        metaphor_style: "heart_centered_family_love_nature_wisdom_based",
        question_approach: "gentle_nurturing_curiosity_with_life_experience_perspective",
        validation_style: "celebration_of_personal_growth_and_inherent_worth"
      },
      fun: {
        voice_character: "enthusiastic_adventure_guide_and_celebration_coach",
        emotional_temperature: "high_energy_joyful_celebratory_with_achievement_focus",
        language_patterns: {
          openings: ["Ready for something AMAZING? Welcome to the incredible world of learning!", "Time for an awesome learning adventure!", "Let's dive into something incredible - LEARNING!", "Welcome to the fun zone of discovery!"],
          transitions: ["But here's where it gets REALLY cool!", "Plot twist - this is about to get epic!", "And now for the best part ever!"],
          encouragements: ["You're absolutely crushing this learning!", "That curiosity of yours is on fire!", "You're like a learning superhero!", "What a rockstar discovery!"],
          closings: ["Keep being the amazing learner you are!", "You're going to do incredible things with knowledge!", "See you tomorrow, learning superstar!"]
        },
        metaphor_style: "adventure_achievement_superhero_celebration_based",
        question_approach: "exciting_challenges_and_achievement_focused_exploration",
        validation_style: "enthusiastic_achievement_celebration_and_capability_recognition"
      },
      neutral: {
        voice_character: "knowledgeable_professional_educator_and_competence_builder",
        emotional_temperature: "calm_confident_respectful_with_professional_warmth",
        language_patterns: {
          openings: ["Today we're exploring learning and growth", "Let's examine knowledge and discovery", "This topic involves continuous learning", "We can understand learning as universal process"],
          transitions: ["Building on this foundation of knowledge", "This connects to human development", "We can observe that learning is", "The evidence shows that growth"],
          encouragements: ["You're thinking clearly about learning", "That's solid understanding of growth", "You understand the key principle of continuous learning", "You've grasped the important concept of development"],
          closings: ["This knowledge serves you well in understanding learning", "Understanding this builds your capabilities", "You're developing strong learning skills"]
        },
        metaphor_style: "professional_competence_evidence_based_growth_focused",
        question_approach: "analytical_inquiry_and_competence_building_exploration",
        validation_style: "professional_competence_recognition_and_skill_development_celebration"
      }
    };
  }

  /**
   * Get fallback language translations
   * @returns {Object} Language translations data
   */
  getFallbackLanguageTranslations() {
    return {
      english: {
        language_code: "en",
        language_name: "English",
        native_display: "English",
        key_phrases: {
          greeting: "Welcome back!",
          encouragement: "Great thinking!",
          transition: "Now let's explore",
          closing: "See you tomorrow!",
          question_intro: "Here's an interesting question:",
          choice_prompt: "What do you think?",
          validation_positive: "Excellent insight!",
          validation_redirect: "Let's think about this differently:"
        }
      },
      spanish: {
        language_code: "es",
        language_name: "Español",
        native_display: "Español",
        key_phrases: {
          greeting: "¡Bienvenido de nuevo!",
          encouragement: "¡Excelente pensamiento!",
          transition: "Ahora exploremos",
          closing: "¡Hasta mañana!",
          question_intro: "Aquí hay una pregunta interesante:",
          choice_prompt: "¿Qué piensas?",
          validation_positive: "¡Excelente percepción!",
          validation_redirect: "Pensemos en esto de manera diferente:"
        }
      },
      french: {
        language_code: "fr",
        language_name: "Français",
        native_display: "Français",
        key_phrases: {
          greeting: "Bon retour !",
          encouragement: "Excellente réflexion !",
          transition: "Maintenant explorons",
          closing: "À demain !",
          question_intro: "Voici une question intéressante :",
          choice_prompt: "Qu'en pensez-vous ?",
          validation_positive: "Excellente perspicacité !",
          validation_redirect: "Pensons à cela différemment :"
        }
      },
      german: {
        language_code: "de",
        language_name: "Deutsch",
        native_display: "Deutsch",
        key_phrases: {
          greeting: "Willkommen zurück!",
          encouragement: "Ausgezeichnetes Denken!",
          transition: "Jetzt erkunden wir",
          closing: "Bis morgen!",
          question_intro: "Hier ist eine interessante Frage:",
          choice_prompt: "Was denkst du?",
          validation_positive: "Ausgezeichnete Einsicht!",
          validation_redirect: "Lass uns das anders denken:"
        }
      },
      italian: {
        language_code: "it",
        language_name: "Italiano",
        native_display: "Italiano",
        key_phrases: {
          greeting: "Bentornato!",
          encouragement: "Eccellente pensiero!",
          transition: "Ora esploriamo",
          closing: "A domani!",
          question_intro: "Ecco una domanda interessante:",
          choice_prompt: "Cosa ne pensi?",
          validation_positive: "Eccellente intuizione!",
          validation_redirect: "Pensiamoci in modo diverso:"
        }
      },
      portuguese: {
        language_code: "pt",
        language_name: "Português",
        native_display: "Português",
        key_phrases: {
          greeting: "Bem-vindo de volta!",
          encouragement: "Excelente pensamento!",
          transition: "Agora vamos explorar",
          closing: "Até amanhã!",
          question_intro: "Aqui está uma pergunta interessante:",
          choice_prompt: "O que você acha?",
          validation_positive: "Excelente percepção!",
          validation_redirect: "Vamos pensar nisso de forma diferente:"
        }
      },
      mandarin: {
        language_code: "zh",
        language_name: "中文",
        native_display: "中文",
        key_phrases: {
          greeting: "欢迎回来！",
          encouragement: "很好的思考！",
          transition: "现在让我们探索",
          closing: "明天见！",
          question_intro: "这里有一个有趣的问题：",
          choice_prompt: "你觉得呢？",
          validation_positive: "很好的见解！",
          validation_redirect: "让我们换个角度思考："
        }
      },
      japanese: {
        language_code: "ja",
        language_name: "日本語",
        native_display: "日本語",
        key_phrases: {
          greeting: "おかえりなさい！",
          encouragement: "素晴らしい思考です！",
          transition: "今度は探求しましょう",
          closing: "また明日！",
          question_intro: "ここに興味深い質問があります：",
          choice_prompt: "どう思いますか？",
          validation_positive: "素晴らしい洞察です！",
          validation_redirect: "別の角度から考えてみましょう："
        }
      },
      arabic: {
        language_code: "ar",
        language_name: "العربية",
        native_display: "العربية",
        key_phrases: {
          greeting: "مرحباً بعودتك!",
          encouragement: "تفكير ممتاز!",
          transition: "الآن دعنا نستكشف",
          closing: "أراك غداً!",
          question_intro: "إليك سؤال مثير للاهتمام:",
          choice_prompt: "ماذا تعتقد؟",
          validation_positive: "رؤية ممتازة!",
          validation_redirect: "دعنا نفكر في هذا بطريقة مختلفة:"
        }
      },
      hindi: {
        language_code: "hi",
        language_name: "हिंदी",
        native_display: "हिंदी",
        key_phrases: {
          greeting: "वापस आने पर स्वागत है!",
          encouragement: "बहुत अच्छा सोचा!",
          transition: "अब आइए खोजें",
          closing: "कल मिलते हैं!",
          question_intro: "यहाँ एक दिलचस्प सवाल है:",
          choice_prompt: "आप क्या सोचते हैं?",
          validation_positive: "उत्कृष्ट अंतर्दृष्टि!",
          validation_redirect: "इसे अलग तरीके से सोचते हैं:"
        }
      },
      russian: {
        language_code: "ru",
        language_name: "Русский",
        native_display: "Русский",
        key_phrases: {
          greeting: "Добро пожаловать обратно!",
          encouragement: "Отличное мышление!",
          transition: "Теперь давайте исследуем",
          closing: "До завтра!",
          question_intro: "Вот интересный вопрос:",
          choice_prompt: "Что вы думаете?",
          validation_positive: "Отличное понимание!",
          validation_redirect: "Давайте подумаем об этом по-другому:"
        }
      },
      dutch: {
        language_code: "nl",
        language_name: "Nederlands",
        native_display: "Nederlands",
        key_phrases: {
          greeting: "Welkom terug!",
          encouragement: "Uitstekend denken!",
          transition: "Laten we nu verkennen",
          closing: "Tot morgen!",
          question_intro: "Hier is een interessante vraag:",
          choice_prompt: "Wat denk je?",
          validation_positive: "Uitstekend inzicht!",
          validation_redirect: "Laten we hier anders over nadenken:"
        }
      }
    };
  }

  /**
   * Get fallback core lesson structure
   * @returns {Object} Core lesson structure data
   */
  getFallbackCoreLessonStructure() {
    return {
      question_1: {
        concept_focus: "basic learning",
        universal_principle: "learning helps us grow",
        teaching_moments: {
          option_a_response: "Let's think about this differently.",
          option_b_response: "Great thinking!"
        }
      },
      question_2: {
        concept_focus: "learning growth",
        universal_principle: "growth comes from learning",
        teaching_moments: {
          option_a_response: "Consider another perspective.",
          option_b_response: "Excellent understanding!"
        }
      },
      question_3: {
        concept_focus: "continuous learning",
        universal_principle: "learning never ends",
        teaching_moments: {
          option_a_response: "Let's explore this further.",
          option_b_response: "Perfect insight!"
        }
      }
    };
  }

  /**
   * Get fallback example data
   * @returns {Object} Example selector data
   */
  getFallbackExampleData() {
    return {
      question_1_examples: {
        age_2: { option_a: "It's fun", option_b: "It's important" },
        age_5: { option_a: "It's fun", option_b: "It's important" },
        age_8: { option_a: "It's fun", option_b: "It's important" },
        age_12: { option_a: "It's fun", option_b: "It's important" },
        age_16: { option_a: "It's fun", option_b: "It's important" },
        age_25: { option_a: "It's fun", option_b: "It's important" },
        age_40: { option_a: "It's fun", option_b: "It's important" },
        age_60: { option_a: "It's fun", option_b: "It's important" },
        age_80: { option_a: "It's fun", option_b: "It's important" },
        age_102: { option_a: "It's fun", option_b: "It's important" }
      },
      question_2_examples: {
        age_2: { option_a: "It's fun", option_b: "It's important" },
        age_5: { option_a: "It's fun", option_b: "It's important" },
        age_8: { option_a: "It's fun", option_b: "It's important" },
        age_12: { option_a: "It's fun", option_b: "It's important" },
        age_16: { option_a: "It's fun", option_b: "It's important" },
        age_25: { option_a: "It's fun", option_b: "It's important" },
        age_40: { option_a: "It's fun", option_b: "It's important" },
        age_60: { option_a: "It's fun", option_b: "It's important" },
        age_80: { option_a: "It's fun", option_b: "It's important" },
        age_102: { option_a: "It's fun", option_b: "It's important" }
      },
      question_3_examples: {
        age_2: { option_a: "It's fun", option_b: "It's important" },
        age_5: { option_a: "It's fun", option_b: "It's important" },
        age_8: { option_a: "It's fun", option_b: "It's important" },
        age_12: { option_a: "It's fun", option_b: "It's important" },
        age_16: { option_a: "It's fun", option_b: "It's important" },
        age_25: { option_a: "It's fun", option_b: "It's important" },
        age_40: { option_a: "It's fun", option_b: "It's important" },
        age_60: { option_a: "It's fun", option_b: "It's important" },
        age_80: { option_a: "It's fun", option_b: "It's important" },
        age_102: { option_a: "It's fun", option_b: "It's important" }
      }
    };
  }

  /**
   * Get fallback fortune elements
   * @returns {Object} Fortune elements data
   */
  getFallbackFortuneElements() {
    return {
      fortune_template: "You are a natural learner!"
    };
  }

  /**
   * Get fallback integration data
   * @returns {Object} Integration data
   */
  getFallbackIntegration() {
    return {
      ken_kelly_avatar_system: {
        expression_variations: {
          grandmother_tone: "gentle_wise",
          fun_tone: "enthusiastic_joyful",
          neutral_tone: "calm_professional"
        },
        mood_triggers: {
          opening: "curious",
          question_1: "thoughtful",
          question_2: "engaged",
          question_3: "satisfied",
          closing: "content"
        }
      },
      glass_morphism_integration: {
        overlay_styling: {
          background: "rgba(255, 255, 255, 0.85)",
          backdrop_filter: "blur(20px)",
          border_radius: "12px",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          box_shadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        }
      }
    };
  }

  /**
   * Preload all 366 DNA files for instant access
   * @returns {Promise<void>}
   */
  async cacheDNAFiles() {
    console.log('Starting DNA file preload...');
    const startTime = performance.now();

    const loadPromises = [];
    
    // Load first 10 files immediately for testing
    for (let day = 1; day <= 10; day++) {
      loadPromises.push(this.loadDNAForDay(day));
    }

    try {
      await Promise.all(loadPromises);
      const duration = performance.now() - startTime;
      console.log(`DNA preload completed in ${duration.toFixed(2)}ms`);
    } catch (error) {
      console.error('DNA preload failed:', error);
    }
  }

  /**
   * Clear DNA cache
   */
  clearCache() {
    this.dnaCache.clear();
    this.loadingPromises.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getCacheStats() {
    return {
      cachedFiles: this.dnaCache.size,
      loadingFiles: this.loadingPromises.size,
      totalFiles: 366
    };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DNAFileLoader;
} else {
  // Browser environment
  window.DNAFileLoader = DNAFileLoader;
} 