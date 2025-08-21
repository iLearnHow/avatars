/**
 * Lesson Controller
 * Manages lesson state and coordinates user interactions with the synthesis engine
 * @version 1.0.0
 * @author iLearnHow
 */

import { apiClient } from '../../services/api-client.js';
import { Logger } from '../../utils/logger.js';

export class LessonController {
  constructor() {
    this.logger = new Logger('LessonController');
    this.currentLesson = null;
    this.currentParams = {
      age: 25,
      tone: 'grandmother',
      language: 'english',
      day: this.getCurrentDay()
    };
    this.isLoading = false;
    this.synthesisTime = 0;
    this.listeners = new Set();
  }

  /**
   * Get current day of the year
   */
  getCurrentDay() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  /**
   * Initialize the lesson controller
   */
  async initialize() {
    this.logger.info('Initializing lesson controller...');
    
    try {
      // Test API connection (but don't fail if it's down)
      try {
        await apiClient.checkHealth();
        console.log('LessonController: API health check passed');
      } catch (error) {
        console.warn('LessonController: API health check failed, will use fallback mode:', error.message);
        // Continue with fallback mode instead of failing
      }
      
      // Load initial lesson
      await this.loadLesson();
      
      this.logger.info('Lesson controller initialized successfully');
      return true;
    } catch (error) {
      this.logger.error('Failed to initialize lesson controller:', error);
      return false;
    }
  }

  /**
   * Load lesson with current parameters
   */
  async loadLesson() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.notifyListeners('loading', { isLoading: true });
    
    try {
      this.logger.info(`Loading lesson with params:`, this.currentParams);
      
      const startTime = performance.now();
      
      const result = await apiClient.synthesizeLesson(
        this.getLessonContent(),
        this.currentParams.age,
        this.currentParams.tone
      );
      
      this.synthesisTime = performance.now() - startTime;
      this.currentLesson = result;
      
      this.logger.info(`Lesson loaded successfully in ${this.synthesisTime}ms`);
      
      this.notifyListeners('lessonLoaded', {
        lesson: this.currentLesson,
        synthesisTime: this.synthesisTime,
        params: this.currentParams
      });
      
    } catch (error) {
      this.logger.error('Failed to load lesson:', error);
      
      // Provide fallback content when API fails
      const fallbackContent = this.getFallbackContent();
      this.currentLesson = fallbackContent;
      this.synthesisTime = 0;
      
      this.notifyListeners('lessonLoaded', {
        lesson: this.currentLesson,
        synthesisTime: 0,
        params: this.currentParams,
        error: error.message
      });
      
      // Also notify about the error for UI feedback
      this.notifyListeners('error', { 
        error: `API unavailable: ${error.message}. Showing fallback content.` 
      });
    } finally {
      this.isLoading = false;
      this.notifyListeners('loading', { isLoading: false });
    }
  }

  /**
   * Get fallback content when API is unavailable
   */
  getFallbackContent() {
    const lessonContent = this.getLessonContent();
    const age = this.currentParams.age;
    const tone = this.currentParams.tone;
    
    // Create a simple fallback based on tone
    let tonePrefix = '';
    switch(tone) {
      case 'grandmother':
        tonePrefix = 'Dear one, ';
        break;
      case 'fun':
        tonePrefix = 'Hey there! ';
        break;
      default:
        tonePrefix = '';
    }
    
    return {
      title: `Learning About: ${lessonContent.split(' ').slice(0, 4).join(' ')}...`,
      content: `${tonePrefix}${lessonContent} This is a fallback lesson while our synthesis engine is being updated. The real lesson would be personalized just for you!`,
      metadata: {
        age,
        tone,
        synthesisTime: 0,
        cached: false,
        generated: new Date().toISOString(),
        fallback: true
      }
    };
  }

  /**
   * Get lesson content for synthesis
   */
  getLessonContent() {
    // For now, use a simple lesson template
    // In the future, this could load from curriculum data
    const lessons = [
      "The sun is a star that provides light and heat to Earth. It is very hot and bright, and without it, life on Earth would not be possible.",
      "Water is essential for life. It covers most of our planet and is found in oceans, rivers, and lakes. All living things need water to survive.",
      "Plants use sunlight to make their own food through a process called photosynthesis. They take in carbon dioxide and release oxygen.",
      "The human body is made up of many different systems that work together. The heart pumps blood, the lungs help us breathe, and the brain controls everything.",
      "Electricity is a form of energy that powers many things in our world. It flows through wires and can be used to light bulbs, run computers, and charge phones."
    ];
    
    const dayIndex = (this.currentParams.day - 1) % lessons.length;
    return lessons[dayIndex];
  }

  /**
   * Update age parameter and reload lesson
   */
  async updateAge(age) {
    this.currentParams.age = parseInt(age);
    this.logger.info(`Age updated to ${age}`);
    this.notifyListeners('paramsChanged', { params: this.currentParams });
    await this.loadLesson();
  }

  /**
   * Update tone parameter and reload lesson
   */
  async updateTone(tone) {
    this.currentParams.tone = tone;
    this.logger.info(`Tone updated to ${tone}`);
    this.notifyListeners('paramsChanged', { params: this.currentParams });
    await this.loadLesson();
  }

  /**
   * Update language parameter and reload lesson
   */
  async updateLanguage(language) {
    this.currentParams.language = language;
    this.logger.info(`Language updated to ${language}`);
    this.notifyListeners('paramsChanged', { params: this.currentParams });
    await this.loadLesson();
  }

  /**
   * Get current lesson
   */
  getCurrentLesson() {
    return this.currentLesson;
  }

  /**
   * Get current parameters
   */
  getCurrentParams() {
    return { ...this.currentParams };
  }

  /**
   * Get synthesis time
   */
  getSynthesisTime() {
    return this.synthesisTime;
  }

  /**
   * Check if currently loading
   */
  isLoading() {
    return this.isLoading;
  }

  /**
   * Add event listener
   */
  addListener(callback) {
    this.listeners.add(callback);
  }

  /**
   * Remove event listener
   */
  removeListener(callback) {
    this.listeners.delete(callback);
  }

  /**
   * Notify all listeners
   */
  notifyListeners(event, data) {
    this.listeners.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        this.logger.error('Listener error:', error);
      }
    });
  }
} 