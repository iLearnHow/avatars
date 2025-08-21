/**
 * Application Bootstrap - Enterprise Entry Point
 * Initializes the complete 366-lesson synthesis platform
 * @version 1.0.0
 * @author iLearnHow
 */

import { ErrorHandler } from '../utils/error-handler.js';
import { Logger } from '../utils/logger.js';
import { PerformanceMonitor } from '../services/monitoring/performance-monitor.js';
import { ReactiveUI } from '../components/lesson-player/reactive-ui.js';
import { config } from './config.js';
import '../assets/styles/main.css';

class ApplicationBootstrap {
    constructor() {
        this.engine = null;
        this.performanceMonitor = null;
        this.isInitialized = false;
        this.startTime = performance.now();
        this.logger = new Logger('ApplicationBootstrap');
    }

    /**
     * Initialize the complete application
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {
            this.logger.info('bootstrap_start', 'Initializing enterprise synthesis platform');
            
            // Initialize core systems
            await this.initializeCoreSystems();
            
            console.log('DEBUG: About to call initializeReactiveUI...');
            try {
                // Initialize reactive UI
                await this.initializeReactiveUI();
                console.log('DEBUG: initializeReactiveUI completed successfully');
            } catch (error) {
                console.error('DEBUG: Error in initializeReactiveUI:', error);
                throw error;
            }
            
            // UI components are now handled by reactive UI
            // await this.initializeUIComponents();
            
            console.log('DEBUG: About to call validateSystemReadiness...');
            // Validate system readiness
            await this.validateSystemReadiness();
            
            // Mark as initialized
            this.isInitialized = true;
            
            const initTime = performance.now() - this.startTime;
            this.logger.info('bootstrap_complete', `Application initialized in ${initTime.toFixed(2)}ms`);
            
            // Trigger ready event
            this.triggerReadyEvent();
            
            return true;
            
        } catch (error) {
            const errorHandler = new ErrorHandler();
            errorHandler.handleError(error, { context: 'bootstrap', phase: 'initialization' });
            return false;
        }
    }

    /**
     * Initialize core systems (config, logging, performance monitoring)
     */
    async initializeCoreSystems() {
        this.logger.info('bootstrap_core', 'Initializing core systems');
        
        console.log('DEBUG: Starting initializeCoreSystems...');
        
        try {
            // Initialize configuration
            console.log('DEBUG: About to initialize config...');
            config.initialize();
            console.log('DEBUG: Config initialized successfully');
            
            // Initialize performance monitoring
            console.log('DEBUG: About to initialize performance monitor...');
            try {
                this.performanceMonitor = new PerformanceMonitor();
                console.log('DEBUG: PerformanceMonitor instance created');
                await this.performanceMonitor.initialize();
                console.log('DEBUG: Performance monitor initialized successfully');
            } catch (error) {
                console.error('DEBUG: Error in performance monitor initialization:', error);
                throw error;
            }
            
            // Set up global error handling
            console.log('DEBUG: About to setup global error handling...');
            this.setupGlobalErrorHandling();
            console.log('DEBUG: Global error handling setup complete');
            
            this.logger.info('bootstrap_core_complete', 'Core systems initialized');
            console.log('DEBUG: Core systems completed, moving to ReactiveUI...');
        } catch (error) {
            console.error('DEBUG: Error in initializeCoreSystems:', error);
            throw error;
        }
    }

    /**
     * Initialize the reactive UI
     */
    async initializeReactiveUI() {
        console.log('DEBUG: Starting ReactiveUI initialization...');
        this.logger.info('bootstrap_ui', 'Initializing reactive UI');
        
        this.reactiveUI = new ReactiveUI();
        console.log('DEBUG: ReactiveUI instance created, calling initialize...');
        await this.reactiveUI.initialize();
        
        this.logger.info('bootstrap_ui_complete', 'Reactive UI initialized');
        console.log('DEBUG: ReactiveUI initialization completed');
    }



    /**
     * Initialize UI components
     */
    async initializeUIComponents() {
        this.logger.info('bootstrap_ui', 'Initializing UI components');
        
        // Initialize lesson player
        await this.initializeLessonPlayer();
        
        // Initialize calendar overlay
        await this.initializeCalendarOverlay();
        
        // Initialize synthesis controls
        await this.initializeSynthesisControls();
        
        // Initialize accessibility features
        await this.initializeAccessibility();
        
        this.logger.info('bootstrap_ui_complete', 'UI components initialized');
    }

    /**
     * Initialize lesson player component
     */
    async initializeLessonPlayer() {
        try {
            const { LessonPlayer } = await import('../components/lesson-player/player.js');
            this.lessonPlayer = new LessonPlayer(this.engine);
            await this.lessonPlayer.initialize();
        } catch (error) {
            Logger.error('bootstrap_lesson_player_failed', error);
            throw error;
        }
    }

    /**
     * Initialize calendar overlay component
     */
    async initializeCalendarOverlay() {
        try {
            const { CalendarOverlay } = await import('../components/lesson-player/calendar-overlay.js');
            this.calendarOverlay = new CalendarOverlay();
            await this.calendarOverlay.initialize();
        } catch (error) {
            Logger.error('bootstrap_calendar_failed', error);
            throw error;
        }
    }

    /**
     * Initialize synthesis controls component
     */
    async initializeSynthesisControls() {
        try {
            const { SynthesisControls } = await import('../components/lesson-player/synthesis-controls.js');
            this.synthesisControls = new SynthesisControls(this.engine);
            await this.synthesisControls.initialize();
        } catch (error) {
            Logger.error('bootstrap_controls_failed', error);
            throw error;
        }
    }

    /**
     * Initialize accessibility features
     */
    async initializeAccessibility() {
        try {
            const { Accessibility } = await import('../components/ui/accessibility.js');
            this.accessibility = new Accessibility();
            await this.accessibility.initialize();
        } catch (error) {
            Logger.error('bootstrap_accessibility_failed', error);
            throw error;
        }
    }

    /**
     * Set up global error handling
     */
    setupGlobalErrorHandling() {
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            ErrorHandler.handle(event.reason, { context: 'global', type: 'unhandled_rejection' });
            event.preventDefault();
        });

        // Handle global errors
        window.addEventListener('error', (event) => {
            ErrorHandler.handle(event.error, { context: 'global', type: 'global_error' });
        });

        // Handle resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                ErrorHandler.handle(new Error(`Resource load failed: ${event.target.src || event.target.href}`), {
                    context: 'global',
                    type: 'resource_error',
                    resource: event.target.src || event.target.href
                });
            }
        }, true);
    }

    /**
     * Validate system readiness
     */
    async validateSystemReadiness() {
        this.logger.info('bootstrap_validation', 'Validating system readiness');
        
        const validations = [
            this.validateReactiveUI(),
            this.validateCurriculum(),
            this.validatePerformance(),
            this.validateUIComponents()
        ];
        
        const results = await Promise.allSettled(validations);
        const failures = results.filter(result => result.status === 'rejected');
        
        if (failures.length > 0) {
            throw new Error(`System validation failed: ${failures.length} components failed validation`);
        }
        
        this.logger.info('bootstrap_validation_complete', 'System validation successful');
    }

    /**
     * Validate reactive UI
     */
    async validateReactiveUI() {
        if (!this.reactiveUI || !this.reactiveUI.isReady()) {
            throw new Error('Reactive UI not ready');
        }
        
        // Test UI performance
        const testStart = performance.now();
        const currentLesson = this.reactiveUI.getCurrentLesson();
        const testDuration = performance.now() - testStart;
        
        if (testDuration > config.get('performance.synthesis.maxTime')) {
            throw new Error(`UI performance below threshold: ${testDuration}ms`);
        }
        
        if (!currentLesson || !currentLesson.title) {
            throw new Error('Test UI failed to produce valid lesson');
        }
    }

    /**
     * Validate curriculum data
     */
    async validateCurriculum() {
        // For now, we're using simple lesson templates
        // In the future, this could validate actual curriculum data
        this.logger.info('bootstrap_validation', 'Curriculum validation skipped - using templates');
    }

    /**
     * Validate performance monitoring
     */
    async validatePerformance() {
        if (!this.performanceMonitor || !this.performanceMonitor.isReady()) {
            throw new Error('Performance monitoring not ready');
        }
    }

    /**
     * Validate UI components
     */
    async validateUIComponents() {
        // For now, we only validate the reactive UI
        // The old components are no longer used
        this.logger.info('bootstrap_validation', 'UI components validation skipped - using reactive UI only');
    }

    /**
     * Trigger application ready event
     */
    triggerReadyEvent() {
        const readyEvent = new CustomEvent('application:ready', {
            detail: {
                initializationTime: performance.now() - this.startTime,
                reactiveUI: this.reactiveUI,
                components: {
                    lessonPlayer: this.lessonPlayer,
                    calendarOverlay: this.calendarOverlay,
                    synthesisControls: this.synthesisControls,
                    accessibility: this.accessibility
                }
            }
        });
        
        window.dispatchEvent(readyEvent);
    }

    /**
     * Get application status
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            initializationTime: performance.now() - this.startTime,
            reactiveUI: this.reactiveUI ? this.reactiveUI.isReady() : false,
            performance: this.performanceMonitor ? this.performanceMonitor.getStatus() : null,
            components: {
                lessonPlayer: this.lessonPlayer ? this.lessonPlayer.getStatus() : null,
                calendarOverlay: this.calendarOverlay ? this.calendarOverlay.getStatus() : null,
                synthesisControls: this.synthesisControls ? this.synthesisControls.getStatus() : null,
                accessibility: this.accessibility ? this.accessibility.getStatus() : null
            }
        };
    }

    /**
     * Graceful shutdown
     */
    async shutdown() {
        this.logger.info('bootstrap_shutdown', 'Shutting down application');
        
        try {
            // Shutdown components in reverse order
            if (this.accessibility) await this.accessibility.shutdown();
            if (this.synthesisControls) await this.synthesisControls.shutdown();
            if (this.calendarOverlay) await this.calendarOverlay.shutdown();
            if (this.lessonPlayer) await this.lessonPlayer.shutdown();
            if (this.engine) await this.engine.shutdown();
            if (this.performanceMonitor) await this.performanceMonitor.shutdown();
            
            this.isInitialized = false;
            this.logger.info('bootstrap_shutdown_complete', 'Application shutdown complete');
            
        } catch (error) {
            Logger.error('bootstrap_shutdown_failed', error);
            throw error;
        }
    }
}

// Create global application instance
window.Application = new ApplicationBootstrap();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.Application.initialize();
    });
} else {
    window.Application.initialize();
}

// Export for module usage
export { ApplicationBootstrap };
export default window.Application; 