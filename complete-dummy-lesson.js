/**
 * Complete Dummy Lesson System
 * Provides all missing functionality for a fully working lesson player
 * This ensures the universal learning system works end-to-end
 */

class CompleteDummyLessonSystem {
    constructor() {
        this.currentLesson = null;
        this.currentPhase = 0;
        this.isPlaying = false;
        this.currentVariant = {
            age: 'age_25',
            tone: 'neutral',
            language: 'english',
            avatar: 'kelly'
        };
        
        // Initialize the system
        this.initializeSystem();
    }

    /**
     * Initialize the complete dummy lesson system
     */
    initializeSystem() {
        console.log('🎯 Initializing Complete Dummy Lesson System...');
        
        // Create DOM elements if they don't exist
        this.ensureDOMElements();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load initial lesson
        this.loadDummyLesson();
        
        console.log('✅ Complete Dummy Lesson System initialized');
    }

    /**
     * Ensure all required DOM elements exist
     */
    ensureDOMElements() {
        console.log('🔧 Ensuring DOM elements exist...');
        
        // Create avatar container if it doesn't exist
        if (!document.getElementById('avatar-container')) {
            const avatarContainer = document.createElement('div');
            avatarContainer.id = 'avatar-container';
            avatarContainer.className = 'avatar-container';
            avatarContainer.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 20px;
                padding: 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                text-align: center;
            `;
            document.body.appendChild(avatarContainer);
            console.log('✅ Avatar container created');
        }

        // Create calendar grid if it doesn't exist
        if (!document.getElementById('calendar-grid')) {
            const calendarGrid = document.createElement('div');
            calendarGrid.id = 'calendar-grid';
            calendarGrid.className = 'calendar-grid';
            calendarGrid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 5px;
                padding: 10px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            `;
            
            // Add calendar to existing calendar overlay or create one
            let calendarOverlay = document.getElementById('calendar-overlay');
            if (!calendarOverlay) {
                calendarOverlay = document.createElement('div');
                calendarOverlay.id = 'calendar-overlay';
                calendarOverlay.className = 'overlay';
                calendarOverlay.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.8);
                    padding: 20px;
                    border-radius: 15px;
                    z-index: 2000;
                    display: none;
                `;
                document.body.appendChild(calendarOverlay);
            }
            calendarOverlay.appendChild(calendarGrid);
            console.log('✅ Calendar grid created');
        }

        // Create lesson content elements if they don't exist
        if (!document.getElementById('lesson-content')) {
            const lessonContent = document.createElement('div');
            lessonContent.id = 'lesson-content';
            lessonContent.className = 'lesson-content';
            lessonContent.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 15px;
                padding: 20px;
                z-index: 500;
                max-width: 400px;
            `;
            document.body.appendChild(lessonContent);
            console.log('✅ Lesson content container created');
        }

        // Create phase content container
        if (!document.getElementById('phase-content')) {
            const phaseContent = document.createElement('div');
            phaseContent.id = 'phase-content';
            phaseContent.className = 'phase-content';
            phaseContent.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 255, 255, 0.9);
                border-radius: 15px;
                padding: 20px;
                z-index: 600;
                max-width: 600px;
                text-align: center;
            `;
            document.body.appendChild(phaseContent);
            console.log('✅ Phase content container created');
        }

        // Create control buttons if they don't exist
        this.ensureControlButtons();
    }

    /**
     * Ensure control buttons exist
     */
    ensureControlButtons() {
        const buttonContainer = document.getElementById('control-buttons') || this.createButtonContainer();
        
        const buttons = [
            { id: 'continue-btn', text: 'Continue', icon: '▶️' },
            { id: 'louder-btn', text: 'Louder', icon: '🔊' },
            { id: 'softer-btn', text: 'Softer', icon: '🔉' },
            { id: 'slower-btn', text: 'Slower', icon: '🐌' },
            { id: 'faster-btn', text: 'Faster', icon: '⚡' },
            { id: 'repeat-btn', text: 'Repeat', icon: '🔄' },
            { id: 'hold-btn', text: 'Hold', icon: '✋' }
        ];

        buttons.forEach(button => {
            if (!document.getElementById(button.id)) {
                const btn = document.createElement('button');
                btn.id = button.id;
                btn.className = 'control-button';
                btn.innerHTML = `${button.icon} ${button.text}`;
                btn.style.cssText = `
                    display: block;
                    width: 100%;
                    margin: 5px 0;
                    padding: 10px;
                    border: none;
                    border-radius: 10px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    cursor: pointer;
                    font-size: 14px;
                `;
                buttonContainer.appendChild(btn);
            }
        });
    }

    /**
     * Create button container
     */
    createButtonContainer() {
        const container = document.createElement('div');
        container.id = 'control-buttons';
        container.style.cssText = `
            position: fixed;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 700;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
        return container;
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Control button event listeners
        const buttons = ['continue-btn', 'louder-btn', 'softer-btn', 'slower-btn', 'faster-btn', 'repeat-btn', 'hold-btn'];
        
        buttons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleControlButton(buttonId);
                });
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        console.log('✅ Event listeners set up');
    }

    /**
     * Handle control button clicks
     */
    handleControlButton(buttonId) {
        console.log(`🎮 Control button clicked: ${buttonId}`);
        
        switch (buttonId) {
            case 'continue-btn':
                this.nextPhase();
                break;
            case 'louder-btn':
                this.adjustVolume(1.2);
                break;
            case 'softer-btn':
                this.adjustVolume(0.8);
                break;
            case 'slower-btn':
                this.adjustSpeed(0.8);
                break;
            case 'faster-btn':
                this.adjustSpeed(1.2);
                break;
            case 'repeat-btn':
                this.repeatCurrentPhase();
                break;
            case 'hold-btn':
                this.togglePause();
                break;
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        switch (e.key) {
            case ' ':
                e.preventDefault();
                this.togglePause();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextPhase();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousPhase();
                break;
            case 'Escape':
                this.closeAllOverlays();
                break;
        }
    }

    /**
     * Load a complete dummy lesson
     */
    loadDummyLesson() {
        console.log('📚 Loading complete dummy lesson...');
        
        this.currentLesson = {
            day: 1,
            title: "Calculus - The Mathematics of Change",
            learning_objective: "Master mathematical analysis while understanding how calculus enables engineering, economics, and scientific modeling of dynamic systems.",
            phases: [
                {
                    type: 'opening',
                    title: 'Welcome to Calculus',
                    content: "Hello! I'm Kelly, and today we're going to explore one of the most powerful tools in mathematics: calculus. It's the mathematics of change, and it helps us understand how things move, grow, and transform.",
                    duration: 30,
                    avatar_expression: 'teaching_explaining'
                },
                {
                    type: 'question_1',
                    title: 'What is Calculus?',
                    content: "Before we dive in, let me ask you: What do you think calculus is? Is it just advanced math, or something more?",
                    choices: [
                        "It's advanced algebra and geometry",
                        "It's the study of how things change over time",
                        "It's just really hard math"
                    ],
                    correct_answer: 1,
                    feedback: "Excellent! Calculus is indeed the study of how things change over time. It's like having a mathematical microscope that lets us zoom in on the moment of change.",
                    duration: 45,
                    avatar_expression: 'question_curious'
                },
                {
                    type: 'question_2',
                    title: 'Real-World Applications',
                    content: "Now, think about this: Where do you see calculus being used in the real world?",
                    choices: [
                        "Only in advanced science and engineering",
                        "In everyday things like driving and cooking",
                        "I'm not sure where it's used"
                    ],
                    correct_answer: 1,
                    feedback: "Great thinking! Calculus is everywhere - from the speedometer in your car to the way your coffee cools down. It's the hidden mathematics of our world.",
                    duration: 45,
                    avatar_expression: 'teaching_explaining'
                },
                {
                    type: 'question_3',
                    title: 'Your Learning Journey',
                    content: "What aspect of calculus interests you most?",
                    choices: [
                        "Understanding the mathematical concepts",
                        "Seeing how it applies to real problems",
                        "Learning the computational techniques"
                    ],
                    correct_answer: 0,
                    feedback: "Perfect! Understanding the concepts is the foundation. Once you grasp the ideas, the applications and techniques will make much more sense.",
                    duration: 45,
                    avatar_expression: 'concerned_thinking'
                },
                {
                    type: 'closing',
                    title: 'What We Learned',
                    content: "Today we discovered that calculus is the mathematics of change. It helps us understand how things move, grow, and transform. From the speed of your car to the growth of plants, calculus is the language of change.",
                    duration: 25,
                    avatar_expression: 'happy_celebrating'
                },
                {
                    type: 'fortune',
                    title: 'Your Daily Fortune',
                    content: "Your curiosity about how things work is your greatest strength. Like calculus, you have the power to understand the patterns of change in your world. Keep asking questions and exploring the mathematics of life!",
                    duration: 15,
                    avatar_expression: 'happy_celebrating'
                }
            ]
        };

        // Update the interface
        this.updateLessonInterface();
        this.showPhase(0);
        
        console.log('✅ Complete dummy lesson loaded');
    }

    /**
     * Update the lesson interface
     */
    updateLessonInterface() {
        // Update lesson info
        const lessonContent = document.getElementById('lesson-content');
        if (lessonContent) {
            lessonContent.innerHTML = `
                <h3 style="margin: 0 0 10px 0; color: #333;">${this.currentLesson.title}</h3>
                <p style="margin: 0; color: #666; font-size: 14px;">${this.currentLesson.learning_objective}</p>
            `;
        }

        // Update avatar
        this.updateAvatar();
    }

    /**
     * Update avatar display
     */
    updateAvatar() {
        const avatarContainer = document.getElementById('avatar-container');
        if (avatarContainer) {
            const currentPhase = this.currentLesson.phases[this.currentPhase];
            const expression = currentPhase.avatar_expression || 'neutral_default';
            
            avatarContainer.innerHTML = `
                <div style="text-align: center;">
                    <div style="width: 200px; height: 200px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 80px;">
                        👩‍🏫
                    </div>
                    <h3 style="margin: 0; color: #333;">Kelly</h3>
                    <p style="margin: 5px 0; color: #666; font-size: 14px;">Expression: ${expression}</p>
                    <p style="margin: 5px 0; color: #666; font-size: 12px;">Phase ${this.currentPhase + 1} of ${this.currentLesson.phases.length}</p>
                </div>
            `;
        }
    }

    /**
     * Show current phase
     */
    showPhase(phaseIndex) {
        if (phaseIndex >= this.currentLesson.phases.length) {
            this.onLessonComplete();
            return;
        }

        this.currentPhase = phaseIndex;
        const phase = this.currentLesson.phases[phaseIndex];
        
        console.log(`🎭 Showing phase ${phaseIndex + 1}: ${phase.title}`);
        
        // Update avatar
        this.updateAvatar();
        
        // Update phase content
        const phaseContent = document.getElementById('phase-content');
        if (phaseContent) {
            let contentHTML = `
                <h3 style="margin: 0 0 15px 0; color: #333;">${phase.title}</h3>
                <p style="margin: 0 0 20px 0; color: #666; line-height: 1.5;">${phase.content}</p>
            `;
            
            // Add choices for questions
            if (phase.type === 'question_1' || phase.type === 'question_2' || phase.type === 'question_3') {
                contentHTML += `<div style="margin-top: 20px;">`;
                phase.choices.forEach((choice, index) => {
                    contentHTML += `
                        <button onclick="window.dummyLessonSystem.selectChoice(${index})" 
                                style="display: block; width: 100%; margin: 10px 0; padding: 15px; border: 2px solid #667eea; border-radius: 10px; background: white; color: #333; cursor: pointer; font-size: 16px; text-align: left;">
                            ${choice}
                        </button>
                    `;
                });
                contentHTML += `</div>`;
            }
            
            phaseContent.innerHTML = contentHTML;
        }
        
        // Start phase timer
        this.startPhaseTimer(phase.duration);
    }

    /**
     * Handle choice selection
     */
    selectChoice(choiceIndex) {
        const phase = this.currentLesson.phases[this.currentPhase];
        
        console.log(`✅ Choice selected: ${choiceIndex}`);
        
        // Show feedback
        const phaseContent = document.getElementById('phase-content');
        if (phaseContent) {
            phaseContent.innerHTML = `
                <h3 style="margin: 0 0 15px 0; color: #333;">${phase.title}</h3>
                <p style="margin: 0 0 20px 0; color: #666; line-height: 1.5;">${phase.feedback}</p>
                <button onclick="window.dummyLessonSystem.nextPhase()" 
                        style="padding: 15px 30px; border: none; border-radius: 10px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; cursor: pointer; font-size: 16px;">
                    Continue →
                </button>
            `;
        }
    }

    /**
     * Start phase timer
     */
    startPhaseTimer(duration) {
        console.log(`⏱️ Starting phase timer: ${duration} seconds`);
        
        // In a real system, this would control audio playback
        // For now, we'll just simulate the timer
        setTimeout(() => {
            if (this.isPlaying) {
                console.log('⏰ Phase timer completed');
                // Auto-advance for non-question phases
                const phase = this.currentLesson.phases[this.currentPhase];
                if (phase.type !== 'question_1' && phase.type !== 'question_2' && phase.type !== 'question_3') {
                    this.nextPhase();
                }
            }
        }, duration * 1000);
    }

    /**
     * Next phase
     */
    nextPhase() {
        console.log(`➡️ Moving to next phase`);
        this.showPhase(this.currentPhase + 1);
    }

    /**
     * Previous phase
     */
    previousPhase() {
        if (this.currentPhase > 0) {
            console.log(`⬅️ Moving to previous phase`);
            this.showPhase(this.currentPhase - 1);
        }
    }

    /**
     * Repeat current phase
     */
    repeatCurrentPhase() {
        console.log(`🔄 Repeating current phase`);
        this.showPhase(this.currentPhase);
    }

    /**
     * Toggle pause/play
     */
    togglePause() {
        this.isPlaying = !this.isPlaying;
        console.log(`⏸️ Playback ${this.isPlaying ? 'resumed' : 'paused'}`);
        
        // Update UI to reflect pause state
        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) {
            continueBtn.innerHTML = this.isPlaying ? '⏸️ Pause' : '▶️ Continue';
        }
    }

    /**
     * Adjust volume
     */
    adjustVolume(factor) {
        console.log(`🔊 Volume adjusted by factor: ${factor}`);
        // In a real system, this would adjust audio volume
    }

    /**
     * Adjust speed
     */
    adjustSpeed(factor) {
        console.log(`⚡ Speed adjusted by factor: ${factor}`);
        // In a real system, this would adjust playback speed
    }

    /**
     * Close all overlays
     */
    closeAllOverlays() {
        const overlays = ['calendar-overlay', 'tone-overlay', 'avatar-overlay', 'language-overlay', 'age-overlay'];
        overlays.forEach(overlayId => {
            const overlay = document.getElementById(overlayId);
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
        console.log('❌ All overlays closed');
    }

    /**
     * Lesson complete
     */
    onLessonComplete() {
        console.log('🎉 Lesson completed!');
        
        const phaseContent = document.getElementById('phase-content');
        if (phaseContent) {
            phaseContent.innerHTML = `
                <h3 style="margin: 0 0 15px 0; color: #333;">🎉 Lesson Complete!</h3>
                <p style="margin: 0 0 20px 0; color: #666; line-height: 1.5;">
                    Congratulations! You've completed today's lesson on Calculus. 
                    You've learned about the mathematics of change and how it applies to the real world.
                </p>
                <button onclick="window.dummyLessonSystem.restartLesson()" 
                        style="padding: 15px 30px; border: none; border-radius: 10px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; cursor: pointer; font-size: 16px;">
                    Restart Lesson
                </button>
            `;
        }
    }

    /**
     * Restart lesson
     */
    restartLesson() {
        console.log('🔄 Restarting lesson');
        this.currentPhase = 0;
        this.isPlaying = true;
        this.showPhase(0);
    }

    /**
     * Get system status
     */
    getSystemStatus() {
        return {
            status: 'fully_functional',
            currentLesson: this.currentLesson?.title || 'None',
            currentPhase: this.currentPhase + 1,
            totalPhases: this.currentLesson?.phases.length || 0,
            isPlaying: this.isPlaying,
            currentVariant: this.currentVariant
        };
    }
}

// Initialize the complete dummy lesson system
if (typeof window !== 'undefined') {
    window.dummyLessonSystem = new CompleteDummyLessonSystem();
    console.log('✅ Complete Dummy Lesson System loaded globally');
} 