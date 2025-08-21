/**
 * Reactive UI Component
 * Handles user interactions and updates the DOM with synthesized content
 * @version 1.0.0
 * @author iLearnHow
 */

import { LessonController } from './lesson-controller.js';
import { Logger } from '../../utils/logger.js';

export class ReactiveUI {
  constructor() {
    this.logger = new Logger('ReactiveUI');
    this.controller = new LessonController();
    this.elements = {};
    this.isInitialized = false;
  }

  /**
   * Initialize the reactive UI
   */
  async initialize() {
    this.logger.info('Initializing reactive UI...');
    console.log('ReactiveUI: Starting initialization...');
    
    try {
      // Cache DOM elements
      this.cacheElements();
      console.log('ReactiveUI: DOM elements cached:', Object.keys(this.elements));
      
      // Set up event listeners
      this.setupEventListeners();
      console.log('ReactiveUI: Event listeners set up');
      
      // Initialize lesson controller
      console.log('ReactiveUI: Initializing lesson controller...');
      const success = await this.controller.initialize();
      if (!success) {
        console.warn('ReactiveUI: Lesson controller failed to initialize, but continuing with fallback mode');
        // Don't throw error, continue with fallback mode
      } else {
        console.log('ReactiveUI: Lesson controller initialized');
      }
      
      // Set up controller listeners
      this.setupControllerListeners();
      console.log('ReactiveUI: Controller listeners set up');
      
      this.isInitialized = true;
      this.logger.info('Reactive UI initialized successfully');
      console.log('ReactiveUI: Initialization complete!');
      
    } catch (error) {
      this.logger.error('Failed to initialize reactive UI:', error);
      console.error('ReactiveUI: Initialization failed:', error);
      this.showError('Failed to initialize the application. Please refresh the page.');
    }
  }

  /**
   * Cache important DOM elements
   */
  cacheElements() {
    this.elements = {
      // Controls
      ageSlider: document.getElementById('age-slider'),
      ageDisplay: document.getElementById('age-display'),
      toneButtons: document.querySelectorAll('.tone-button'),
      languageSelect: document.getElementById('language-select'),
      
      // Content areas
      lessonTitle: document.getElementById('lesson-title'),
      lessonContent: document.getElementById('lesson-content'),
      introduction: document.getElementById('introduction'),
      coreConcept: document.getElementById('core-concept'),
      examples: document.getElementById('examples'),
      reflection: document.getElementById('reflection'),
      
      // Status elements
      synthesisTime: document.getElementById('synthesis-time'),
      loadingIndicators: document.querySelectorAll('.loading-indicator'),
      experienceButton: document.getElementById('experience-button'),
      
      // Error display
      errorDisplay: document.getElementById('error-display')
    };
  }

  /**
   * Set up event listeners for user interactions
   */
  setupEventListeners() {
    // Age slider
    if (this.elements.ageSlider) {
      this.elements.ageSlider.addEventListener('input', (e) => {
        const age = e.target.value;
        this.updateAgeDisplay(age);
        this.controller.updateAge(age);
      });
    }

    // Tone buttons
    this.elements.toneButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const tone = e.target.dataset.tone;
        this.updateToneSelection(tone);
        this.controller.updateTone(tone);
      });
    });

    // Language select
    if (this.elements.languageSelect) {
      this.elements.languageSelect.addEventListener('change', (e) => {
        const language = e.target.value;
        this.controller.updateLanguage(language);
      });
    }

    // Experience button
    if (this.elements.experienceButton) {
      this.elements.experienceButton.addEventListener('click', () => {
        this.handleExperienceClick();
      });
    }
  }

  /**
   * Set up listeners for lesson controller events
   */
  setupControllerListeners() {
    this.controller.addListener((event, data) => {
      switch (event) {
        case 'loading':
          this.handleLoading(data.isLoading);
          break;
        case 'lessonLoaded':
          this.handleLessonLoaded(data);
          break;
        case 'paramsChanged':
          this.handleParamsChanged(data);
          break;
        case 'error':
          this.handleError(data.error);
          break;
      }
    });
  }

  /**
   * Handle loading state changes
   */
  handleLoading(isLoading) {
    this.logger.info(`Loading state changed: ${isLoading}`);
    
    // Show/hide loading indicators
    this.elements.loadingIndicators.forEach(indicator => {
      if (isLoading) {
        indicator.style.display = 'block';
        indicator.textContent = 'Synthesizing your personalized lesson...';
      } else {
        indicator.style.display = 'none';
      }
    });

    // Disable/enable controls
    const controls = [
      this.elements.ageSlider,
      ...this.elements.toneButtons,
      this.elements.languageSelect,
      this.elements.experienceButton
    ];

    controls.forEach(control => {
      if (control) {
        control.disabled = isLoading;
      }
    });
  }

  /**
   * Handle lesson loaded event
   */
  handleLessonLoaded(data) {
    this.logger.info('Lesson loaded, updating UI');
    
    const { lesson, synthesisTime, params } = data;
    
    // Update lesson title
    if (this.elements.lessonTitle) {
      this.elements.lessonTitle.textContent = lesson.title;
    }

    // Update lesson content
    if (this.elements.lessonContent) {
      this.elements.lessonContent.textContent = lesson.content;
    }

    // Update synthesis time
    if (this.elements.synthesisTime) {
      this.elements.synthesisTime.textContent = `${Math.round(synthesisTime)}ms`;
    }

    // Update content sections
    this.updateContentSections(lesson.content);

    // Hide loading indicators
    this.elements.loadingIndicators.forEach(indicator => {
      indicator.style.display = 'none';
    });

    // Enable controls
    const controls = [
      this.elements.ageSlider,
      ...this.elements.toneButtons,
      this.elements.languageSelect,
      this.elements.experienceButton
    ];

    controls.forEach(control => {
      if (control) {
        control.disabled = false;
      }
    });
  }

  /**
   * Update content sections with synthesized content
   */
  updateContentSections(content) {
    // Split content into sections (this is a simple implementation)
    const sections = this.splitContentIntoSections(content);
    
    if (this.elements.introduction) {
      this.elements.introduction.textContent = sections.introduction || 'Your personalized introduction is being prepared...';
    }
    
    if (this.elements.coreConcept) {
      this.elements.coreConcept.textContent = sections.coreConcept || 'Your personalized core concept is being prepared...';
    }
    
    if (this.elements.examples) {
      this.elements.examples.textContent = sections.examples || 'Your personalized examples are being prepared...';
    }
    
    if (this.elements.reflection) {
      this.elements.reflection.textContent = sections.reflection || 'Your personalized reflection question is being prepared...';
    }
  }

  /**
   * Split content into sections (simple implementation)
   */
  splitContentIntoSections(content) {
    // This is a simple implementation - in a real app, you might want more sophisticated parsing
    const sentences = content.split('. ');
    const sectionCount = Math.ceil(sentences.length / 4);
    
    return {
      introduction: sentences.slice(0, sectionCount).join('. ') + '.',
      coreConcept: sentences.slice(sectionCount, sectionCount * 2).join('. ') + '.',
      examples: sentences.slice(sectionCount * 2, sectionCount * 3).join('. ') + '.',
      reflection: sentences.slice(sectionCount * 3).join('. ') + '.'
    };
  }

  /**
   * Handle parameters changed event
   */
  handleParamsChanged(data) {
    this.logger.info('Parameters changed:', data.params);
    // Parameters are already updated in the UI, just log the change
  }

  /**
   * Handle errors from controller
   */
  handleError(error) {
    console.error('ReactiveUI: Controller error:', error);
    
    // Show user-friendly error message
    let userMessage = 'Something went wrong while loading your lesson.';
    
    if (error.error && error.error.includes('API unavailable')) {
      userMessage = 'Our synthesis engine is temporarily unavailable. Showing you a preview lesson instead.';
    } else if (error.error && error.error.includes('network')) {
      userMessage = 'Network connection issue. Please check your internet and try again.';
    } else if (error.error && error.error.includes('rate limit')) {
      userMessage = 'Too many requests. Please wait a moment and try again.';
    }
    
    this.showError(userMessage);
    
    // Hide error after 8 seconds for API issues
    setTimeout(() => {
      if (this.elements.errorDisplay) {
        this.elements.errorDisplay.style.display = 'none';
      }
    }, 8000);
  }

  /**
   * Update age display
   */
  updateAgeDisplay(age) {
    if (this.elements.ageDisplay) {
      this.elements.ageDisplay.textContent = `${age} years old`;
    }
  }

  /**
   * Update tone selection
   */
  updateToneSelection(selectedTone) {
    this.elements.toneButtons.forEach(button => {
      const tone = button.dataset.tone;
      if (tone === selectedTone) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    });
  }

  /**
   * Handle experience button click
   */
  handleExperienceClick() {
    this.logger.info('Experience button clicked');
    
    // For now, just show an alert
    // In the future, this could launch an enhanced lesson experience
    const lesson = this.controller.getCurrentLesson();
    if (lesson) {
      alert(`Enhanced lesson experience coming soon!\n\nCurrent lesson: ${lesson.title}\n\nThis feature will include audio narration, interactive elements, and more!`);
    }
  }

  /**
   * Show error message to user
   */
  showError(message) {
    console.error('ReactiveUI Error:', message);
    
    if (this.elements.errorDisplay) {
      const errorMessage = this.elements.errorDisplay.querySelector('#error-message');
      if (errorMessage) {
        errorMessage.textContent = message;
      }
      this.elements.errorDisplay.style.display = 'block';
    }
    
    // Also show in console for debugging
    console.error('User-facing error:', message);
  }

  /**
   * Get current lesson
   */
  getCurrentLesson() {
    return this.controller.getCurrentLesson();
  }

  /**
   * Get current parameters
   */
  getCurrentParams() {
    return this.controller.getCurrentParams();
  }

  /**
   * Check if UI is initialized
   */
  isReady() {
    return this.isInitialized;
  }
} 