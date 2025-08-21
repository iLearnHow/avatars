/**
 * Accessibility - WCAG 2.1 AA Compliance & Accessibility Features
 * Ensures the application is accessible to all users
 * @version 1.0.0
 * @author iLearnHow
 */

import { Logger } from '../../utils/logger.js';
import { ErrorHandler } from '../../utils/error-handler.js';
import { config } from '../../core/config.js';

export class Accessibility {
    constructor() {
        this.isReady = false;
        this.isEnabled = true;
        this.features = new Map();
        this.eventListeners = new Map();
        this.observers = new Map();
        
        // Accessibility settings
        this.settings = {
            highContrast: false,
            reducedMotion: false,
            screenReader: false,
            keyboardNavigation: true,
            focusVisible: true,
            fontSize: 'medium',
            colorBlindness: 'none'
        };
    }

    /**
     * Initialize accessibility features
     */
    async initialize() {
        try {
            Logger.info('accessibility_init', 'Initializing accessibility features');
            
            // Load user preferences
            this.loadUserPreferences();
            
            // Initialize features
            await this.initializeFeatures();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Apply initial settings
            this.applySettings();
            
            // Mark as ready
            this.isReady = true;
            
            Logger.info('accessibility_ready', 'Accessibility features initialized successfully');
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'accessibility', phase: 'initialization' });
            throw error;
        }
    }

    /**
     * Load user accessibility preferences
     */
    loadUserPreferences() {
        try {
            const stored = localStorage.getItem('ilearn_accessibility');
            
            if (stored) {
                const preferences = JSON.parse(stored);
                this.settings = { ...this.settings, ...preferences };
                Logger.info('accessibility_preferences_loaded', 'User preferences loaded');
            }
            
        } catch (error) {
            Logger.warn('accessibility_preferences_failed', 'Failed to load preferences, using defaults');
        }
    }

    /**
     * Initialize accessibility features
     */
    async initializeFeatures() {
        // Initialize keyboard navigation
        this.features.set('keyboard', this.initializeKeyboardNavigation());
        
        // Initialize focus management
        this.features.set('focus', this.initializeFocusManagement());
        
        // Initialize screen reader support
        this.features.set('screenReader', this.initializeScreenReaderSupport());
        
        // Initialize high contrast mode
        this.features.set('highContrast', this.initializeHighContrast());
        
        // Initialize reduced motion
        this.features.set('reducedMotion', this.initializeReducedMotion());
        
        // Initialize font size controls
        this.features.set('fontSize', this.initializeFontSizeControls());
        
        // Initialize color blindness support
        this.features.set('colorBlindness', this.initializeColorBlindnessSupport());
        
        Logger.info('accessibility_features_ready', 'All accessibility features initialized');
    }

    /**
     * Initialize keyboard navigation
     */
    initializeKeyboardNavigation() {
        return {
            enable: () => this.enableKeyboardNavigation(),
            disable: () => this.disableKeyboardNavigation(),
            isEnabled: () => this.settings.keyboardNavigation
        };
    }

    /**
     * Initialize focus management
     */
    initializeFocusManagement() {
        return {
            enable: () => this.enableFocusManagement(),
            disable: () => this.disableFocusManagement(),
            isEnabled: () => this.settings.focusVisible
        };
    }

    /**
     * Initialize screen reader support
     */
    initializeScreenReaderSupport() {
        return {
            enable: () => this.enableScreenReaderSupport(),
            disable: () => this.disableScreenReaderSupport(),
            isEnabled: () => this.settings.screenReader
        };
    }

    /**
     * Initialize high contrast mode
     */
    initializeHighContrast() {
        return {
            enable: () => this.enableHighContrast(),
            disable: () => this.disableHighContrast(),
            isEnabled: () => this.settings.highContrast
        };
    }

    /**
     * Initialize reduced motion
     */
    initializeReducedMotion() {
        return {
            enable: () => this.enableReducedMotion(),
            disable: () => this.disableReducedMotion(),
            isEnabled: () => this.settings.reducedMotion
        };
    }

    /**
     * Initialize font size controls
     */
    initializeFontSizeControls() {
        return {
            setSize: (size) => this.setFontSize(size),
            getSize: () => this.settings.fontSize,
            increase: () => this.increaseFontSize(),
            decrease: () => this.decreaseFontSize()
        };
    }

    /**
     * Initialize color blindness support
     */
    initializeColorBlindnessSupport() {
        return {
            setMode: (mode) => this.setColorBlindnessMode(mode),
            getMode: () => this.settings.colorBlindness,
            isEnabled: () => this.settings.colorBlindness !== 'none'
        };
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Focus management
        document.addEventListener('focusin', (e) => this.handleFocusIn(e));
        document.addEventListener('focusout', (e) => this.handleFocusOut(e));
        
        // Screen reader announcements
        this.setupScreenReaderAnnouncements();
        
        // Motion preference changes
        this.setupMotionPreferenceObserver();
        
        // Store references for cleanup
        this.eventListeners.set('keydown', document);
        this.eventListeners.set('focusin', document);
        this.eventListeners.set('focusout', document);
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Don't interfere with form inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Alt + A: Toggle accessibility panel
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            this.toggleAccessibilityPanel();
        }
        
        // Alt + H: Toggle high contrast
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            this.toggleHighContrast();
        }
        
        // Alt + M: Toggle reduced motion
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            this.toggleReducedMotion();
        }
        
        // Alt + Plus: Increase font size
        if (e.altKey && e.key === '+') {
            e.preventDefault();
            this.increaseFontSize();
        }
        
        // Alt + Minus: Decrease font size
        if (e.altKey && e.key === '-') {
            e.preventDefault();
            this.decreaseFontSize();
        }
        
        // Alt + 0: Reset font size
        if (e.altKey && e.key === '0') {
            e.preventDefault();
            this.setFontSize('medium');
        }
    }

    /**
     * Handle focus in events
     */
    handleFocusIn(e) {
        if (this.settings.focusVisible) {
            e.target.classList.add('focus-visible');
        }
    }

    /**
     * Handle focus out events
     */
    handleFocusOut(e) {
        e.target.classList.remove('focus-visible');
    }

    /**
     * Set up screen reader announcements
     */
    setupScreenReaderAnnouncements() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.id = 'accessibility-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
        
        this.liveRegion = liveRegion;
    }

    /**
     * Set up motion preference observer
     */
    setupMotionPreferenceObserver() {
        if (window.matchMedia) {
            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            
            const handleMotionChange = (e) => {
                if (e.matches) {
                    this.enableReducedMotion();
                }
            };
            
            motionQuery.addEventListener('change', handleMotionChange);
            
            // Check initial preference
            if (motionQuery.matches) {
                this.enableReducedMotion();
            }
            
            this.observers.set('motion', motionQuery);
        }
    }

    /**
     * Enable keyboard navigation
     */
    enableKeyboardNavigation() {
        this.settings.keyboardNavigation = true;
        this.applySettings();
        this.announce('Keyboard navigation enabled');
        Logger.info('accessibility_keyboard_enabled', 'Keyboard navigation enabled');
    }

    /**
     * Disable keyboard navigation
     */
    disableKeyboardNavigation() {
        this.settings.keyboardNavigation = false;
        this.applySettings();
        this.announce('Keyboard navigation disabled');
        Logger.info('accessibility_keyboard_disabled', 'Keyboard navigation disabled');
    }

    /**
     * Enable focus management
     */
    enableFocusManagement() {
        this.settings.focusVisible = true;
        this.applySettings();
        this.announce('Focus indicators enabled');
        Logger.info('accessibility_focus_enabled', 'Focus management enabled');
    }

    /**
     * Disable focus management
     */
    disableFocusManagement() {
        this.settings.focusVisible = false;
        this.applySettings();
        this.announce('Focus indicators disabled');
        Logger.info('accessibility_focus_disabled', 'Focus management disabled');
    }

    /**
     * Enable screen reader support
     */
    enableScreenReaderSupport() {
        this.settings.screenReader = true;
        this.applySettings();
        this.announce('Screen reader support enabled');
        Logger.info('accessibility_screen_reader_enabled', 'Screen reader support enabled');
    }

    /**
     * Disable screen reader support
     */
    disableScreenReaderSupport() {
        this.settings.screenReader = false;
        this.applySettings();
        this.announce('Screen reader support disabled');
        Logger.info('accessibility_screen_reader_disabled', 'Screen reader support disabled');
    }

    /**
     * Enable high contrast mode
     */
    enableHighContrast() {
        this.settings.highContrast = true;
        this.applySettings();
        this.announce('High contrast mode enabled');
        Logger.info('accessibility_high_contrast_enabled', 'High contrast mode enabled');
    }

    /**
     * Disable high contrast mode
     */
    disableHighContrast() {
        this.settings.highContrast = false;
        this.applySettings();
        this.announce('High contrast mode disabled');
        Logger.info('accessibility_high_contrast_disabled', 'High contrast mode disabled');
    }

    /**
     * Enable reduced motion
     */
    enableReducedMotion() {
        this.settings.reducedMotion = true;
        this.applySettings();
        this.announce('Reduced motion enabled');
        Logger.info('accessibility_reduced_motion_enabled', 'Reduced motion enabled');
    }

    /**
     * Disable reduced motion
     */
    disableReducedMotion() {
        this.settings.reducedMotion = false;
        this.applySettings();
        this.announce('Reduced motion disabled');
        Logger.info('accessibility_reduced_motion_disabled', 'Reduced motion disabled');
    }

    /**
     * Set font size
     */
    setFontSize(size) {
        const validSizes = ['small', 'medium', 'large', 'x-large'];
        
        if (!validSizes.includes(size)) {
            throw new Error(`Invalid font size: ${size}`);
        }
        
        this.settings.fontSize = size;
        this.applySettings();
        this.announce(`Font size set to ${size}`);
        Logger.info('accessibility_font_size_set', `Font size set to ${size}`);
    }

    /**
     * Increase font size
     */
    increaseFontSize() {
        const sizes = ['small', 'medium', 'large', 'x-large'];
        const currentIndex = sizes.indexOf(this.settings.fontSize);
        
        if (currentIndex < sizes.length - 1) {
            this.setFontSize(sizes[currentIndex + 1]);
        }
    }

    /**
     * Decrease font size
     */
    decreaseFontSize() {
        const sizes = ['small', 'medium', 'large', 'x-large'];
        const currentIndex = sizes.indexOf(this.settings.fontSize);
        
        if (currentIndex > 0) {
            this.setFontSize(sizes[currentIndex - 1]);
        }
    }

    /**
     * Set color blindness mode
     */
    setColorBlindnessMode(mode) {
        const validModes = ['none', 'protanopia', 'deuteranopia', 'tritanopia'];
        
        if (!validModes.includes(mode)) {
            throw new Error(`Invalid color blindness mode: ${mode}`);
        }
        
        this.settings.colorBlindness = mode;
        this.applySettings();
        this.announce(`Color blindness mode set to ${mode}`);
        Logger.info('accessibility_color_blindness_set', `Color blindness mode set to ${mode}`);
    }

    /**
     * Apply accessibility settings
     */
    applySettings() {
        // Apply high contrast
        if (this.settings.highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
        
        // Apply reduced motion
        if (this.settings.reducedMotion) {
            document.documentElement.classList.add('reduced-motion');
        } else {
            document.documentElement.classList.remove('reduced-motion');
        }
        
        // Apply font size
        document.documentElement.classList.remove('font-small', 'font-medium', 'font-large', 'font-x-large');
        document.documentElement.classList.add(`font-${this.settings.fontSize}`);
        
        // Apply color blindness mode
        document.documentElement.classList.remove('color-protanopia', 'color-deuteranopia', 'color-tritanopia');
        if (this.settings.colorBlindness !== 'none') {
            document.documentElement.classList.add(`color-${this.settings.colorBlindness}`);
        }
        
        // Apply focus visible
        if (this.settings.focusVisible) {
            document.documentElement.classList.add('focus-visible-enabled');
        } else {
            document.documentElement.classList.remove('focus-visible-enabled');
        }
        
        // Save preferences
        this.saveUserPreferences();
        
        // Apply CSS styles
        this.applyAccessibilityStyles();
    }

    /**
     * Apply accessibility CSS styles
     */
    applyAccessibilityStyles() {
        const styles = `
            /* Screen reader only content */
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
            
            /* Focus visible styles */
            .focus-visible-enabled *:focus {
                outline: 2px solid ${config.get('ui.theme.primary')};
                outline-offset: 2px;
            }
            
            .focus-visible-enabled *:focus:not(:focus-visible) {
                outline: none;
            }
            
            .focus-visible-enabled *:focus-visible {
                outline: 2px solid ${config.get('ui.theme.primary')};
                outline-offset: 2px;
            }
            
            /* High contrast mode */
            .high-contrast {
                --primary-color: #000000;
                --secondary-color: #ffffff;
                --text-color: #000000;
                --background-color: #ffffff;
                --border-color: #000000;
            }
            
            .high-contrast * {
                background-color: var(--background-color) !important;
                color: var(--text-color) !important;
                border-color: var(--border-color) !important;
            }
            
            .high-contrast button,
            .high-contrast input,
            .high-contrast select {
                border: 2px solid var(--border-color) !important;
            }
            
            /* Reduced motion */
            .reduced-motion *,
            .reduced-motion *::before,
            .reduced-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            
            /* Font size controls */
            .font-small {
                font-size: 14px;
            }
            
            .font-medium {
                font-size: 16px;
            }
            
            .font-large {
                font-size: 18px;
            }
            
            .font-x-large {
                font-size: 20px;
            }
            
            /* Color blindness support */
            .color-protanopia {
                filter: url('#protanopia-filter');
            }
            
            .color-deuteranopia {
                filter: url('#deuteranopia-filter');
            }
            
            .color-tritanopia {
                filter: url('#tritanopia-filter');
            }
            
            /* Skip link */
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: ${config.get('ui.theme.primary')};
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 1000;
            }
            
            .skip-link:focus {
                top: 6px;
            }
            
            /* ARIA live regions */
            [aria-live="polite"] {
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            }
            
            /* Focus management */
            .focus-trap {
                outline: none;
            }
            
            /* Keyboard navigation indicators */
            .keyboard-nav *:focus {
                box-shadow: 0 0 0 2px ${config.get('ui.theme.primary')};
            }
        `;
        
        // Inject styles
        if (!document.getElementById('accessibility-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'accessibility-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }

    /**
     * Announce message to screen readers
     */
    announce(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            
            // Clear after a short delay
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
        
        Logger.info('accessibility_announcement', message);
    }

    /**
     * Toggle accessibility panel
     */
    toggleAccessibilityPanel() {
        // This would show/hide an accessibility settings panel
        this.announce('Accessibility panel toggled');
        Logger.info('accessibility_panel_toggle', 'Accessibility panel toggled');
    }

    /**
     * Toggle high contrast
     */
    toggleHighContrast() {
        if (this.settings.highContrast) {
            this.disableHighContrast();
        } else {
            this.enableHighContrast();
        }
    }

    /**
     * Toggle reduced motion
     */
    toggleReducedMotion() {
        if (this.settings.reducedMotion) {
            this.disableReducedMotion();
        } else {
            this.enableReducedMotion();
        }
    }

    /**
     * Save user preferences
     */
    saveUserPreferences() {
        try {
            localStorage.setItem('ilearn_accessibility', JSON.stringify(this.settings));
        } catch (error) {
            Logger.warn('accessibility_save_failed', 'Failed to save accessibility preferences');
        }
    }

    /**
     * Get accessibility status
     */
    getStatus() {
        return {
            isReady: this.isReady,
            isEnabled: this.isEnabled,
            settings: { ...this.settings },
            features: Array.from(this.features.keys())
        };
    }

    /**
     * Validate WCAG compliance
     */
    validateWCAGCompliance() {
        const issues = [];
        
        // Check for proper heading structure
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let previousLevel = 0;
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            if (level > previousLevel + 1) {
                issues.push(`Heading level skipped: ${heading.tagName} after h${previousLevel}`);
            }
            previousLevel = level;
        });
        
        // Check for alt text on images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.alt && !img.getAttribute('aria-label')) {
                issues.push(`Image missing alt text: ${img.src}`);
            }
        });
        
        // Check for form labels
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (!input.id || !document.querySelector(`label[for="${input.id}"]`)) {
                issues.push(`Form control missing label: ${input.type || input.tagName}`);
            }
        });
        
        // Check color contrast (basic check)
        const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        textElements.forEach(element => {
            const style = window.getComputedStyle(element);
            const color = style.color;
            const backgroundColor = style.backgroundColor;
            
            // Basic contrast check (would need more sophisticated algorithm for production)
            if (color === backgroundColor) {
                issues.push(`Potential contrast issue: ${element.tagName}`);
            }
        });
        
        return {
            compliant: issues.length === 0,
            issues: issues,
            score: Math.max(0, 100 - (issues.length * 10))
        };
    }

    /**
     * Shutdown accessibility features
     */
    async shutdown() {
        Logger.info('accessibility_shutdown', 'Shutting down accessibility features');
        
        // Remove event listeners
        this.eventListeners.forEach((element, type) => {
            if (element && element.removeEventListener) {
                element.removeEventListener(type, this[`handle${type.charAt(0).toUpperCase() + type.slice(1)}`]);
            }
        });
        
        // Remove observers
        this.observers.forEach((observer, type) => {
            if (observer && observer.removeEventListener) {
                observer.removeEventListener('change', this[`handle${type.charAt(0).toUpperCase() + type.slice(1)}Change`]);
            }
        });
        
        // Remove live region
        if (this.liveRegion && this.liveRegion.parentNode) {
            this.liveRegion.parentNode.removeChild(this.liveRegion);
        }
        
        // Reset settings
        this.applySettings();
        
        this.isReady = false;
        Logger.info('accessibility_shutdown_complete', 'Accessibility features shutdown complete');
    }
} 