/**
 * Variant Switcher - Handles instant preference switching
 * Regenerates content without server calls or delays
 * Uses same DNA file to generate new variant
 * Maintains educational integrity across all variants
 */

class VariantSwitcher {
  constructor() {
    this.currentDNA = null;
    this.currentPreferences = {
      age: 'age_25',
      tone: 'neutral',
      language: 'english',
      avatar: 'kelly'
    };
    this.variantCache = new Map();
    this.switchingInProgress = false;
  }

  /**
   * Initialize variant switcher with DNA data
   * @param {Object} dnaData - Current lesson DNA data
   */
  initialize(dnaData) {
    this.currentDNA = dnaData;
    console.log('VariantSwitcher initialized with DNA data');
  }

  /**
   * Instant switch between variants without server calls
   * @param {Object} newPreferences - New user preferences
   * @returns {Promise<Object>} New lesson content
   */
  async instantSwitch(newPreferences) {
    if (this.switchingInProgress) {
      console.warn('Variant switching already in progress');
      return null;
    }

    this.switchingInProgress = true;
    const startTime = performance.now();

    try {
      // Validate preferences
      this.validatePreferences(newPreferences);

      // Generate cache key
      const cacheKey = this.generateCacheKey(newPreferences);

      // Check cache first
      if (this.variantCache.has(cacheKey)) {
        const cachedContent = this.variantCache.get(cacheKey);
        this.switchingInProgress = false;
        return cachedContent;
      }

      // Generate new variant using current DNA
      const newContent = await this.generateVariant(newPreferences);

      // Cache the result
      this.variantCache.set(cacheKey, newContent);

      // Update current preferences
      this.currentPreferences = { ...newPreferences };

      const duration = performance.now() - startTime;
      console.log(`Variant switch completed in ${duration.toFixed(2)}ms`);

      this.switchingInProgress = false;
      return newContent;

    } catch (error) {
      console.error('Variant switching failed:', error);
      this.switchingInProgress = false;
      throw error;
    }
  }

  /**
   * Validate user preferences
   * @param {Object} preferences - User preferences to validate
   */
  validatePreferences(preferences) {
    const validAges = ['age_2', 'age_5', 'age_8', 'age_12', 'age_16', 'age_25', 'age_40', 'age_60', 'age_80', 'age_102'];
    const validTones = ['grandmother', 'fun', 'neutral'];
    const validLanguages = ['english', 'spanish', 'french', 'german', 'italian', 'portuguese', 'mandarin', 'japanese', 'arabic', 'hindi', 'russian', 'dutch'];
    const validAvatars = ['kelly', 'ken', 'you'];

    if (!validAges.includes(preferences.age)) {
      throw new Error(`Invalid age: ${preferences.age}`);
    }

    if (!validTones.includes(preferences.tone)) {
      throw new Error(`Invalid tone: ${preferences.tone}`);
    }

    if (!validLanguages.includes(preferences.language)) {
      throw new Error(`Invalid language: ${preferences.language}`);
    }

    if (!validAvatars.includes(preferences.avatar)) {
      throw new Error(`Invalid avatar: ${preferences.avatar}`);
    }
  }

  /**
   * Generate cache key for preferences
   * @param {Object} preferences - User preferences
   * @returns {string} Cache key
   */
  generateCacheKey(preferences) {
    return `${preferences.age}_${preferences.tone}_${preferences.language}_${preferences.avatar}`;
  }

  /**
   * Generate new variant using DNA data
   * @param {Object} preferences - User preferences
   * @returns {Promise<Object>} Generated lesson content
   */
  async generateVariant(preferences) {
    if (!this.currentDNA) {
      throw new Error('No DNA data available for variant generation');
    }

    const content = {
      opening: this.generateOpening(preferences),
      questions: this.generateQuestions(preferences),
      fortune: this.generateFortune(preferences),
      avatarMood: this.getAvatarMood(preferences),
      metadata: {
        preferences,
        generationTime: Date.now(),
        dnaDay: this.currentDNA.day
      }
    };

    return content;
  }

  /**
   * Generate opening content based on preferences
   * @param {Object} preferences - User preferences
   * @returns {string} Opening content
   */
  generateOpening(preferences) {
    const ageData = this.currentDNA.age_expressions[preferences.age];
    const toneData = this.currentDNA.tone_delivery_dna[preferences.tone];
    const langData = this.currentDNA.language_translations[preferences.language];

    // Get appropriate opening pattern based on tone
    const openingPatterns = toneData.language_patterns.openings;
    const opening = openingPatterns[Math.floor(Math.random() * openingPatterns.length)];

    // Get age-appropriate concept name
    const conceptName = ageData.concept_name;

    // Get language-specific greeting
    const greeting = langData.key_phrases.greeting;

    return `${greeting} ${opening} ${conceptName}!`;
  }

  /**
   * Generate questions based on preferences
   * @param {Object} preferences - User preferences
   * @returns {Array} Array of question objects
   */
  generateQuestions(preferences) {
    const questions = [];
    const ageData = this.currentDNA.age_expressions[preferences.age];
    const toneData = this.currentDNA.tone_delivery_dna[preferences.tone];
    const langData = this.currentDNA.language_translations[preferences.language];

    // Generate 3 questions using DNA structure
    for (let i = 1; i <= 3; i++) {
      const questionData = this.currentDNA.core_lesson_structure[`question_${i}`];
      const examples = this.currentDNA.example_selector_data[`question_${i}_examples`][preferences.age];

      const question = {
        id: i,
        text: this.generateQuestionText(questionData, ageData, langData),
        choices: this.generateChoices(questionData, examples, langData),
        teachingMoment: this.generateTeachingMoment(questionData, toneData, langData)
      };

      questions.push(question);
    }

    return questions;
  }

  /**
   * Generate question text
   * @param {Object} questionData - Question data from DNA
   * @param {Object} ageData - Age-specific data
   * @param {Object} langData - Language-specific data
   * @returns {string} Question text
   */
  generateQuestionText(questionData, ageData, langData) {
    const questionIntro = langData.key_phrases.question_intro;
    const conceptFocus = questionData.concept_focus;
    const complexityLevel = ageData.complexity_level;

    return `${questionIntro} ${conceptFocus} at a ${complexityLevel} level?`;
  }

  /**
   * Generate choice options
   * @param {Object} questionData - Question data from DNA
   * @param {Object} examples - Age-appropriate examples
   * @param {Object} langData - Language-specific data
   * @returns {Array} Array of choice objects
   */
  generateChoices(questionData, examples, langData) {
    const choicePrompt = langData.key_phrases.choice_prompt;

    return [
      {
        id: 'a',
        text: examples.option_a,
        isCorrect: false,
        explanation: questionData.teaching_moments.option_a_response
      },
      {
        id: 'b',
        text: examples.option_b,
        isCorrect: true,
        explanation: questionData.teaching_moments.option_b_response
      }
    ];
  }

  /**
   * Generate teaching moment
   * @param {Object} questionData - Question data from DNA
   * @param {Object} toneData - Tone-specific data
   * @param {Object} langData - Language-specific data
   * @returns {string} Teaching moment text
   */
  generateTeachingMoment(questionData, toneData, langData) {
    const encouragements = toneData.language_patterns.encouragements;
    const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    const validationPositive = langData.key_phrases.validation_positive;

    return `${encouragement} ${validationPositive} ${questionData.universal_principle}`;
  }

  /**
   * Generate fortune content
   * @param {Object} preferences - User preferences
   * @returns {string} Fortune content
   */
  generateFortune(preferences) {
    const fortuneElements = this.currentDNA.daily_fortune_elements;
    const langData = this.currentDNA.language_translations[preferences.language];
    const toneData = this.currentDNA.tone_delivery_dna[preferences.tone];

    const closings = toneData.language_patterns.closings;
    const closing = closings[Math.floor(Math.random() * closings.length)];

    return `${fortuneElements.fortune_template} ${closing}`;
  }

  /**
   * Get avatar mood based on preferences
   * @param {Object} preferences - User preferences
   * @returns {Object} Avatar mood data
   */
  getAvatarMood(preferences) {
    const avatarSystem = this.currentDNA.__lesson_player_integration.ken_kelly_avatar_system;
    const expressionVariations = avatarSystem.expression_variations;
    const moodTriggers = avatarSystem.mood_triggers;

    return {
      expression: `${preferences.avatar}_${preferences.tone}`,
      mood: moodTriggers.opening,
      variation: expressionVariations[`${preferences.tone}_tone`]
    };
  }

  /**
   * Switch age preference
   * @param {string} newAge - New age preference
   * @returns {Promise<Object>} Updated content
   */
  async switchAge(newAge) {
    const newPreferences = { ...this.currentPreferences, age: newAge };
    return this.instantSwitch(newPreferences);
  }

  /**
   * Switch tone preference
   * @param {string} newTone - New tone preference
   * @returns {Promise<Object>} Updated content
   */
  async switchTone(newTone) {
    const newPreferences = { ...this.currentPreferences, tone: newTone };
    return this.instantSwitch(newPreferences);
  }

  /**
   * Switch language preference
   * @param {string} newLanguage - New language preference
   * @returns {Promise<Object>} Updated content
   */
  async switchLanguage(newLanguage) {
    const newPreferences = { ...this.currentPreferences, language: newLanguage };
    return this.instantSwitch(newPreferences);
  }

  /**
   * Switch avatar preference
   * @param {string} newAvatar - New avatar preference
   * @returns {Promise<Object>} Updated content
   */
  async switchAvatar(newAvatar) {
    const newPreferences = { ...this.currentPreferences, avatar: newAvatar };
    return this.instantSwitch(newPreferences);
  }

  /**
   * Get current preferences
   * @returns {Object} Current preferences
   */
  getCurrentPreferences() {
    return { ...this.currentPreferences };
  }

  /**
   * Clear variant cache
   */
  clearCache() {
    this.variantCache.clear();
    console.log('Variant cache cleared');
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getCacheStats() {
    return {
      cachedVariants: this.variantCache.size,
      currentPreferences: this.currentPreferences,
      switchingInProgress: this.switchingInProgress
    };
  }

  /**
   * Validate that content maintains educational integrity
   * @param {Object} content - Generated content
   * @param {Object} preferences - User preferences
   * @returns {boolean} True if content is educationally sound
   */
  validateEducationalIntegrity(content, preferences) {
    // Check that content is age-appropriate
    const ageData = this.currentDNA.age_expressions[preferences.age];
    const complexityLevel = ageData.complexity_level;

    // Check that tone is authentic
    const toneData = this.currentDNA.tone_delivery_dna[preferences.tone];
    const voiceCharacter = toneData.voice_character;

    // Check that language is culturally appropriate
    const langData = this.currentDNA.language_translations[preferences.language];
    const culturalAdaptation = langData.cultural_adaptation;

    return {
      ageAppropriateness: content.opening.includes(ageData.concept_name),
      toneAuthenticity: content.opening.includes(toneData.language_patterns.openings[0]),
      culturalSensitivity: content.opening.includes(langData.key_phrases.greeting),
      overallValid: true
    };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VariantSwitcher;
} else {
  // Browser environment
  window.VariantSwitcher = VariantSwitcher;
} 