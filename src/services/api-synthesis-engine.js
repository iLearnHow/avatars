/**
 * API-Based Synthesis Engine
 * Uses the deployed Cloudflare Worker for synthesis
 * @version 1.0.0
 * @author iLearnHow
 */

import { apiClient } from './api-client.js';
import { Logger } from '../utils/logger.js';
import { ErrorHandler } from '../utils/error-handler.js';

export class APISynthesisEngine {
  constructor() {
    this.logger = new Logger('APISynthesisEngine');
    this.initialized = false;
  }

  /**
   * Initialize the API synthesis engine
   */
  async initialize() {
    try {
      this.logger.info('Initializing API synthesis engine...');
      
      // Test API connection
      const isConnected = await apiClient.testConnection();
      if (!isConnected) {
        throw new Error('Failed to connect to synthesis API');
      }
      
      this.initialized = true;
      this.logger.info('API synthesis engine initialized successfully');
      
    } catch (error) {
      this.logger.error('Failed to initialize API synthesis engine:', error);
      ErrorHandler.handle(error, { context: 'api_synthesis_engine', phase: 'initialization' });
      throw error;
    }
  }

  /**
   * Synthesize a lesson using the API
   */
  async synthesizeLesson(day, age, tone) {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      this.logger.info(`Synthesizing lesson: day=${day}, age=${age}, tone=${tone}`);

      // Get lesson content from curriculum
      const lessonContent = await this.getLessonContent(day);
      
      // Call the API for synthesis
      const result = await apiClient.synthesizeLesson(lessonContent, age, tone);
      
      // Add day information to metadata
      result.metadata.day = day;
      
      this.logger.info(`Lesson synthesized successfully in ${result.metadata.synthesisTime}ms`);
      
      return result;
      
    } catch (error) {
      this.logger.error('Synthesis failed:', error);
      ErrorHandler.handle(error, { 
        context: 'api_synthesis_engine', 
        phase: 'synthesis',
        params: { day, age, tone }
      });
      
      // Return fallback content
      return this.getFallbackLesson(day, age, tone);
    }
  }

  /**
   * Get lesson content from curriculum
   */
  async getLessonContent(day) {
    try {
      // Load curriculum data
      const curriculum = await this.loadCurriculum();
      
      // Find lesson for the given day
      const lesson = curriculum.find(l => l.day === day);
      
      if (!lesson) {
        throw new Error(`Lesson not found for day ${day}`);
      }
      
      return lesson.content || lesson.description || 'Educational content for today\'s lesson.';
      
    } catch (error) {
      this.logger.warn(`Failed to load curriculum for day ${day}, using fallback`);
      return 'Today we will learn something amazing! This lesson will be personalized just for you.';
    }
  }

  /**
   * Load curriculum data
   */
  async loadCurriculum() {
    try {
      // Try to load from multiple sources
      const sources = [
        '/assets/data/curriculum/january_curriculum.json',
        '/assets/data/curriculum/february_curriculum.json',
        '/assets/data/the-sun-dna.json'
      ];
      
      for (const source of sources) {
        try {
          const response = await fetch(source);
          if (response.ok) {
            const data = await response.json();
            if (data.lessons || data.curriculum) {
              return data.lessons || data.curriculum || [];
            }
          }
        } catch (e) {
          // Continue to next source
        }
      }
      
      // Fallback curriculum
      return [
        {
          day: 1,
          content: 'The sun is a star that provides light and heat to Earth. It is very hot and bright.',
          title: 'The Sun - Our Magnificent Life-Giving Star'
        },
        {
          day: 2,
          content: 'Water is essential for life. It covers most of our planet and is found in oceans, rivers, and lakes.',
          title: 'Water - The Source of Life'
        },
        {
          day: 3,
          content: 'Plants use sunlight to make their own food through a process called photosynthesis.',
          title: 'Plants - Nature\'s Food Factories'
        }
      ];
      
    } catch (error) {
      this.logger.error('Failed to load curriculum:', error);
      return [];
    }
  }

  /**
   * Get fallback lesson when synthesis fails
   */
  getFallbackLesson(day, age, tone) {
    const fallbackContent = `Welcome to day ${day} of your learning journey! 

Today we'll explore something wonderful together. Even though our AI synthesis is taking a break, we still have amazing things to learn.

For someone your age (${age} years old), learning is an adventure filled with discovery and wonder. Whether you prefer a ${tone} approach to learning, there's always something new to discover.

Let's make today a great day for learning!`;

    return {
      title: `Day ${day} - Learning Adventure`,
      content: fallbackContent,
      metadata: {
        day,
        age,
        tone,
        synthesisTime: 0,
        cost: 0,
        cached: false,
        generated: new Date().toISOString(),
        fallback: true
      }
    };
  }

  /**
   * Check if the engine is ready
   */
  isReady() {
    return this.initialized;
  }

  /**
   * Get engine status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      type: 'api',
      baseUrl: apiClient.baseUrl
    };
  }
} 