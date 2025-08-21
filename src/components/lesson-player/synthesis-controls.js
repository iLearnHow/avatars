/**
 * Synthesis Controls - Real-time Parameter Adjustment
 * Provides intuitive controls for customizing lesson synthesis
 * @version 1.0.0
 * @author iLearnHow
 */

import { Logger } from '../../utils/logger.js';
import { ErrorHandler } from '../../utils/error-handler.js';
import { config } from '../../core/config.js';

export class SynthesisControls {
    constructor(engine) {
        this.engine = engine;
        this.isReady = false;
        this.isVisible = false;
        this.currentParams = null;
        this.eventListeners = new Map();
        
        // UI elements
        this.container = null;
        this.controls = null;
        this.ageSlider = null;
        this.toneSelector = null;
        this.applyButton = null;
        this.resetButton = null;
        this.previewPanel = null;
    }

    /**
     * Initialize the synthesis controls
     */
    async initialize() {
        try {
            Logger.info('synthesis_controls_init', 'Initializing synthesis controls');
            
            // Create control elements
            this.createControls();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize with default values
            this.initializeDefaults();
            
            // Mark as ready
            this.isReady = true;
            
            Logger.info('synthesis_controls_ready', 'Synthesis controls initialized successfully');
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'synthesis_controls', phase: 'initialization' });
            throw error;
        }
    }

    /**
     * Create the controls interface
     */
    createControls() {
        // Create main container
        this.container = document.createElement('div');
        this.container.className = 'synthesis-controls-container';
        this.container.setAttribute('role', 'region');
        this.container.setAttribute('aria-label', 'Lesson Customization Controls');
        
        // Create controls panel
        this.controls = document.createElement('div');
        this.controls.className = 'synthesis-controls-panel';
        
        // Create header
        const header = this.createHeader();
        
        // Create age control
        const ageControl = this.createAgeControl();
        
        // Create tone control
        const toneControl = this.createToneControl();
        
        // Create action buttons
        const actionButtons = this.createActionButtons();
        
        // Create preview panel
        this.previewPanel = this.createPreviewPanel();
        
        // Assemble controls
        this.controls.appendChild(header);
        this.controls.appendChild(ageControl);
        this.controls.appendChild(toneControl);
        this.controls.appendChild(actionButtons);
        this.controls.appendChild(this.previewPanel);
        
        // Add to container
        this.container.appendChild(this.controls);
        
        // Add to page
        const target = document.querySelector('#lesson-player') || document.body;
        target.appendChild(this.container);
        
        // Apply styles
        this.applyStyles();
    }

    /**
     * Create controls header
     */
    createHeader() {
        const header = document.createElement('div');
        header.className = 'controls-header';
        
        header.innerHTML = `
            <h3>Customize Your Lesson</h3>
            <p>Adjust the lesson to match your learning preferences</p>
        `;
        
        return header;
    }

    /**
     * Create age control
     */
    createAgeControl() {
        const ageControl = document.createElement('div');
        ageControl.className = 'control-group age-control';
        
        // Age slider
        this.ageSlider = document.createElement('input');
        this.ageSlider.type = 'range';
        this.ageSlider.min = '5';
        this.ageSlider.max = '65';
        this.ageSlider.value = '25';
        this.ageSlider.className = 'age-slider';
        this.ageSlider.setAttribute('aria-label', 'Select your age');
        
        // Age display
        const ageDisplay = document.createElement('div');
        ageDisplay.className = 'age-display';
        ageDisplay.innerHTML = `
            <span class="age-label">Age:</span>
            <span class="age-value">25</span>
            <span class="age-description">Adult learner</span>
        `;
        
        // Age ranges indicator
        const ageRanges = document.createElement('div');
        ageRanges.className = 'age-ranges';
        ageRanges.innerHTML = `
            <span class="range-label">Young (5-12)</span>
            <span class="range-label">Teen (13-17)</span>
            <span class="range-label">Adult (18-65)</span>
        `;
        
        ageControl.appendChild(ageDisplay);
        ageControl.appendChild(this.ageSlider);
        ageControl.appendChild(ageRanges);
        
        return ageControl;
    }

    /**
     * Create tone control
     */
    createToneControl() {
        const toneControl = document.createElement('div');
        toneControl.className = 'control-group tone-control';
        
        // Tone selector
        this.toneSelector = document.createElement('div');
        this.toneSelector.className = 'tone-selector';
        this.toneSelector.setAttribute('role', 'radiogroup');
        this.toneSelector.setAttribute('aria-label', 'Select lesson tone');
        
        const tones = [
            { value: 'neutral', label: 'Neutral', description: 'Professional and balanced', icon: '🎯' },
            { value: 'fun', label: 'Fun', description: 'Engaging and entertaining', icon: '🎉' },
            { value: 'grandmother', label: 'Warm', description: 'Nurturing and supportive', icon: '💝' }
        ];
        
        tones.forEach(tone => {
            const toneOption = document.createElement('div');
            toneOption.className = 'tone-option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'tone';
            radio.value = tone.value;
            radio.id = `tone-${tone.value}`;
            radio.className = 'tone-radio';
            
            const label = document.createElement('label');
            label.htmlFor = `tone-${tone.value}`;
            label.className = 'tone-label';
            
            label.innerHTML = `
                <span class="tone-icon">${tone.icon}</span>
                <div class="tone-info">
                    <span class="tone-name">${tone.label}</span>
                    <span class="tone-desc">${tone.description}</span>
                </div>
            `;
            
            toneOption.appendChild(radio);
            toneOption.appendChild(label);
            this.toneSelector.appendChild(toneOption);
        });
        
        // Set default selection
        const defaultTone = this.toneSelector.querySelector('input[value="neutral"]');
        if (defaultTone) defaultTone.checked = true;
        
        toneControl.appendChild(this.toneSelector);
        
        return toneControl;
    }

    /**
     * Create action buttons
     */
    createActionButtons() {
        const actionButtons = document.createElement('div');
        actionButtons.className = 'control-actions';
        
        // Apply button
        this.applyButton = document.createElement('button');
        this.applyButton.className = 'btn btn-primary apply-btn';
        this.applyButton.textContent = 'Apply Changes';
        this.applyButton.setAttribute('aria-label', 'Apply synthesis changes');
        
        // Reset button
        this.resetButton = document.createElement('button');
        this.resetButton.className = 'btn btn-secondary reset-btn';
        this.resetButton.textContent = 'Reset to Defaults';
        this.resetButton.setAttribute('aria-label', 'Reset to default settings');
        
        actionButtons.appendChild(this.applyButton);
        actionButtons.appendChild(this.resetButton);
        
        return actionButtons;
    }

    /**
     * Create preview panel
     */
    createPreviewPanel() {
        const preview = document.createElement('div');
        preview.className = 'preview-panel';
        preview.setAttribute('role', 'region');
        preview.setAttribute('aria-label', 'Lesson Preview');
        
        preview.innerHTML = `
            <div class="preview-header">
                <h4>Preview</h4>
                <button class="preview-toggle" aria-label="Toggle preview panel">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M7 10l5 5 5-5z"/>
                    </svg>
                </button>
            </div>
            <div class="preview-content">
                <div class="preview-loading">
                    <div class="loading-spinner"></div>
                    <p>Generating preview...</p>
                </div>
            </div>
        `;
        
        return preview;
    }

    /**
     * Apply CSS styles
     */
    applyStyles() {
        const styles = `
            .synthesis-controls-container {
                margin-top: 20px;
                border-top: 1px solid #e2e8f0;
                padding-top: 20px;
            }
            
            .synthesis-controls-panel {
                background: #f8fafc;
                border-radius: 8px;
                padding: 20px;
                border: 1px solid #e2e8f0;
            }
            
            .controls-header {
                margin-bottom: 20px;
                text-align: center;
            }
            
            .controls-header h3 {
                margin: 0 0 8px 0;
                color: ${config.get('ui.theme.text')};
                font-size: 18px;
                font-weight: 600;
            }
            
            .controls-header p {
                margin: 0;
                color: #64748b;
                font-size: 14px;
            }
            
            .control-group {
                margin-bottom: 24px;
            }
            
            .control-group:last-child {
                margin-bottom: 0;
            }
            
            .age-control {
                text-align: center;
            }
            
            .age-display {
                margin-bottom: 12px;
            }
            
            .age-label {
                font-weight: 600;
                color: ${config.get('ui.theme.text')};
                margin-right: 8px;
            }
            
            .age-value {
                font-size: 18px;
                font-weight: 700;
                color: ${config.get('ui.theme.primary')};
                margin-right: 8px;
            }
            
            .age-description {
                color: #64748b;
                font-size: 14px;
            }
            
            .age-slider {
                width: 100%;
                height: 6px;
                background: #e2e8f0;
                border-radius: 3px;
                outline: none;
                margin-bottom: 8px;
            }
            
            .age-slider::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                background: ${config.get('ui.theme.primary')};
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .age-slider::-moz-range-thumb {
                width: 20px;
                height: 20px;
                background: ${config.get('ui.theme.primary')};
                border-radius: 50%;
                cursor: pointer;
                border: none;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .age-ranges {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #64748b;
            }
            
            .tone-selector {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 12px;
            }
            
            .tone-option {
                position: relative;
            }
            
            .tone-radio {
                position: absolute;
                opacity: 0;
                pointer-events: none;
            }
            
            .tone-label {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                background: white;
            }
            
            .tone-label:hover {
                border-color: ${config.get('ui.theme.primary')};
                background: #f0f9ff;
            }
            
            .tone-radio:checked + .tone-label {
                border-color: ${config.get('ui.theme.primary')};
                background: #eff6ff;
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            }
            
            .tone-icon {
                font-size: 24px;
                width: 32px;
                text-align: center;
            }
            
            .tone-info {
                flex: 1;
            }
            
            .tone-name {
                display: block;
                font-weight: 600;
                color: ${config.get('ui.theme.text')};
                margin-bottom: 4px;
            }
            
            .tone-desc {
                display: block;
                font-size: 12px;
                color: #64748b;
                line-height: 1.3;
            }
            
            .control-actions {
                display: flex;
                gap: 12px;
                justify-content: center;
                margin-top: 24px;
            }
            
            .btn {
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                min-width: 120px;
            }
            
            .btn-primary {
                background: ${config.get('ui.theme.primary')};
                color: white;
            }
            
            .btn-primary:hover {
                background: ${config.get('ui.theme.accent')};
                transform: translateY(-1px);
            }
            
            .btn-secondary {
                background: #f1f5f9;
                color: ${config.get('ui.theme.text')};
                border: 1px solid #e2e8f0;
            }
            
            .btn-secondary:hover {
                background: #e2e8f0;
            }
            
            .btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }
            
            .preview-panel {
                margin-top: 20px;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                overflow: hidden;
            }
            
            .preview-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                background: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .preview-header h4 {
                margin: 0;
                font-size: 14px;
                font-weight: 600;
                color: ${config.get('ui.theme.text')};
            }
            
            .preview-toggle {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background-color 0.2s ease;
            }
            
            .preview-toggle:hover {
                background: #e2e8f0;
            }
            
            .preview-toggle svg {
                fill: #64748b;
                transition: transform 0.2s ease;
            }
            
            .preview-toggle.expanded svg {
                transform: rotate(180deg);
            }
            
            .preview-content {
                padding: 16px;
                background: white;
                max-height: 200px;
                overflow-y: auto;
            }
            
            .preview-loading {
                text-align: center;
                padding: 20px;
            }
            
            .preview-loading .loading-spinner {
                width: 24px;
                height: 24px;
                border: 2px solid #e2e8f0;
                border-top: 2px solid ${config.get('ui.theme.primary')};
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 12px;
            }
            
            .preview-loading p {
                margin: 0;
                color: #64748b;
                font-size: 14px;
            }
            
            .preview-text {
                font-size: 14px;
                line-height: 1.5;
                color: ${config.get('ui.theme.text')};
            }
            
            .preview-meta {
                margin-top: 12px;
                padding-top: 12px;
                border-top: 1px solid #e2e8f0;
                font-size: 12px;
                color: #64748b;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @media (max-width: 768px) {
                .synthesis-controls-panel {
                    padding: 16px;
                }
                
                .tone-selector {
                    grid-template-columns: 1fr;
                }
                
                .control-actions {
                    flex-direction: column;
                }
                
                .btn {
                    width: 100%;
                }
            }
        `;
        
        // Inject styles
        if (!document.getElementById('synthesis-controls-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'synthesis-controls-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Age slider
        this.ageSlider.addEventListener('input', (e) => {
            this.updateAgeDisplay(e.target.value);
            this.schedulePreview();
        });
        
        // Tone selector
        this.toneSelector.addEventListener('change', () => {
            this.schedulePreview();
        });
        
        // Apply button
        this.applyButton.addEventListener('click', () => {
            this.applyChanges();
        });
        
        // Reset button
        this.resetButton.addEventListener('click', () => {
            this.resetToDefaults();
        });
        
        // Preview toggle
        const previewToggle = this.previewPanel.querySelector('.preview-toggle');
        previewToggle.addEventListener('click', () => {
            this.togglePreview();
        });
        
        // Store references for cleanup
        this.eventListeners.set('ageSlider', this.ageSlider);
        this.eventListeners.set('toneSelector', this.toneSelector);
        this.eventListeners.set('applyButton', this.applyButton);
        this.eventListeners.set('resetButton', this.resetButton);
        this.eventListeners.set('previewToggle', previewToggle);
    }

    /**
     * Initialize with default values
     */
    initializeDefaults() {
        const defaultAge = 25;
        const defaultTone = 'neutral';
        
        this.ageSlider.value = defaultAge;
        this.updateAgeDisplay(defaultAge);
        
        const defaultToneRadio = this.toneSelector.querySelector(`input[value="${defaultTone}"]`);
        if (defaultToneRadio) defaultToneRadio.checked = true;
        
        this.currentParams = { age: defaultAge, tone: defaultTone };
        
        Logger.info('synthesis_controls_defaults', `Defaults set: age=${defaultAge}, tone=${defaultTone}`);
    }

    /**
     * Update age display
     */
    updateAgeDisplay(age) {
        const ageValue = this.container.querySelector('.age-value');
        const ageDescription = this.container.querySelector('.age-description');
        
        ageValue.textContent = age;
        
        // Update description based on age range
        let description = '';
        if (age >= 5 && age <= 12) {
            description = 'Young learner';
        } else if (age >= 13 && age <= 17) {
            description = 'Teen learner';
        } else {
            description = 'Adult learner';
        }
        
        ageDescription.textContent = description;
    }

    /**
     * Get current parameters
     */
    getCurrentParams() {
        const age = parseInt(this.ageSlider.value);
        const tone = this.toneSelector.querySelector('input:checked').value;
        
        return { age, tone };
    }

    /**
     * Schedule preview generation
     */
    schedulePreview() {
        // Debounce preview generation
        if (this.previewTimeout) {
            clearTimeout(this.previewTimeout);
        }
        
        this.previewTimeout = setTimeout(() => {
            this.generatePreview();
        }, 500);
    }

    /**
     * Generate preview
     */
    async generatePreview() {
        try {
            const params = this.getCurrentParams();
            const previewContent = this.previewPanel.querySelector('.preview-content');
            
            // Show loading state
            previewContent.innerHTML = `
                <div class="preview-loading">
                    <div class="loading-spinner"></div>
                    <p>Generating preview...</p>
                </div>
            `;
            
            // Generate preview using engine
            const preview = await this.engine.generatePreview(params);
            
            // Display preview
            previewContent.innerHTML = `
                <div class="preview-text">${this.escapeHtml(preview.text)}</div>
                <div class="preview-meta">
                    Age: ${params.age} | Tone: ${params.tone} | Generated in ${preview.duration}ms
                </div>
            `;
            
            Logger.info('synthesis_controls_preview', `Preview generated for age=${params.age}, tone=${params.tone}`);
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'synthesis_controls', phase: 'preview_generation' });
            
            const previewContent = this.previewPanel.querySelector('.preview-content');
            previewContent.innerHTML = `
                <div class="preview-error">
                    <p>Unable to generate preview. Please try again.</p>
                </div>
            `;
        }
    }

    /**
     * Apply changes to current lesson
     */
    async applyChanges() {
        try {
            const params = this.getCurrentParams();
            
            // Disable apply button during processing
            this.applyButton.disabled = true;
            this.applyButton.textContent = 'Applying...';
            
            // Dispatch change event
            const event = new CustomEvent('synthesis:parametersChanged', {
                detail: { params }
            });
            
            window.dispatchEvent(event);
            
            // Update current params
            this.currentParams = params;
            
            // Re-enable button
            this.applyButton.disabled = false;
            this.applyButton.textContent = 'Apply Changes';
            
            Logger.info('synthesis_controls_applied', `Changes applied: age=${params.age}, tone=${params.tone}`);
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'synthesis_controls', phase: 'apply_changes' });
            
            // Re-enable button on error
            this.applyButton.disabled = false;
            this.applyButton.textContent = 'Apply Changes';
        }
    }

    /**
     * Reset to default values
     */
    resetToDefaults() {
        const defaultAge = 25;
        const defaultTone = 'neutral';
        
        // Update UI
        this.ageSlider.value = defaultAge;
        this.updateAgeDisplay(defaultAge);
        
        const defaultToneRadio = this.toneSelector.querySelector(`input[value="${defaultTone}"]`);
        if (defaultToneRadio) defaultToneRadio.checked = true;
        
        // Update current params
        this.currentParams = { age: defaultAge, tone: defaultTone };
        
        // Generate new preview
        this.schedulePreview();
        
        Logger.info('synthesis_controls_reset', 'Controls reset to defaults');
    }

    /**
     * Toggle preview panel
     */
    togglePreview() {
        const previewContent = this.previewPanel.querySelector('.preview-content');
        const previewToggle = this.previewPanel.querySelector('.preview-toggle');
        
        if (previewContent.style.display === 'none') {
            previewContent.style.display = 'block';
            previewToggle.classList.add('expanded');
        } else {
            previewContent.style.display = 'none';
            previewToggle.classList.remove('expanded');
        }
    }

    /**
     * Set parameters programmatically
     */
    setParameters(age, tone) {
        // Validate parameters
        if (age < 5 || age > 65) {
            throw new Error('Age must be between 5 and 65');
        }
        
        if (!['neutral', 'fun', 'grandmother'].includes(tone)) {
            throw new Error('Invalid tone specified');
        }
        
        // Update UI
        this.ageSlider.value = age;
        this.updateAgeDisplay(age);
        
        const toneRadio = this.toneSelector.querySelector(`input[value="${tone}"]`);
        if (toneRadio) toneRadio.checked = true;
        
        // Update current params
        this.currentParams = { age, tone };
        
        // Generate preview
        this.schedulePreview();
        
        Logger.info('synthesis_controls_set', `Parameters set: age=${age}, tone=${tone}`);
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Show controls
     */
    show() {
        this.isVisible = true;
        this.container.style.display = 'block';
    }

    /**
     * Hide controls
     */
    hide() {
        this.isVisible = false;
        this.container.style.display = 'none';
    }

    /**
     * Toggle controls visibility
     */
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Get controls status
     */
    getStatus() {
        return {
            isReady: this.isReady,
            isVisible: this.isVisible,
            currentParams: this.currentParams,
            previewTimeout: !!this.previewTimeout
        };
    }

    /**
     * Shutdown the synthesis controls
     */
    async shutdown() {
        Logger.info('synthesis_controls_shutdown', 'Shutting down synthesis controls');
        
        // Clear preview timeout
        if (this.previewTimeout) {
            clearTimeout(this.previewTimeout);
        }
        
        // Remove event listeners
        this.eventListeners.forEach((element, type) => {
            if (element && element.removeEventListener) {
                // Remove specific listeners based on type
                switch (type) {
                    case 'ageSlider':
                        element.removeEventListener('input', () => this.updateAgeDisplay());
                        break;
                    case 'toneSelector':
                        element.removeEventListener('change', () => this.schedulePreview());
                        break;
                    case 'applyButton':
                        element.removeEventListener('click', () => this.applyChanges());
                        break;
                    case 'resetButton':
                        element.removeEventListener('click', () => this.resetToDefaults());
                        break;
                }
            }
        });
        
        // Remove from DOM
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        
        this.isReady = false;
        Logger.info('synthesis_controls_shutdown_complete', 'Synthesis controls shutdown complete');
    }
} 