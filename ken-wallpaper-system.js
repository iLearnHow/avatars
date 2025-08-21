/**
 * Ken Wallpaper System - Apple-Level UI Integration
 * Makes Ken the primary UI element with overlays that "sing, float, and glide"
 */

class KenWallpaperSystem {
    constructor() {
        this.currentExpression = 'ken_neutral_default';
        this.currentTone = 'neutral';
        this.currentMood = 'neutral';
        this.faceSafeZones = this.loadFaceSafeZones();
        this.moodTriggers = this.loadMoodTriggers();
        this.expressionTiming = this.loadExpressionTiming();
        
        this.initializeKenWallpaper();
    }

    /**
     * Initialize Ken as the primary wallpaper
     */
    initializeKenWallpaper() {
        const avatarContainer = document.getElementById('avatar-container');
        if (avatarContainer) {
                    // Set Ken as the primary wallpaper with correct image path
        avatarContainer.style.backgroundImage = 'url(lesson-player-deploy/assets/avatars/ken.jpg)';
            avatarContainer.style.backgroundColor = '#ffffff';
            avatarContainer.classList.add('ken-wallpaper-active');
            
            console.log('✅ Ken wallpaper system initialized with organized assets');
        }
    }

    /**
     * Load face-safe zone data for each Ken expression
     */
    loadFaceSafeZones() {
        return {
            'ken_neutral_default': {
                boundaries: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 },
                safeAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
                priorityZones: ['bottom-right']
            },
            'ken_happy_celebrating': {
                boundaries: { x: 0.25, y: 0.15, width: 0.5, height: 0.35 },
                safeAnchors: ['top-left', 'bottom-left', 'bottom-right'],
                priorityZones: ['bottom-right']
            },
            'ken_concerned_thinking': {
                boundaries: { x: 0.35, y: 0.25, width: 0.3, height: 0.25 },
                safeAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
                priorityZones: ['bottom-right', 'top-right']
            },
            'ken_grandmother_warm': {
                boundaries: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 },
                safeAnchors: ['top-left', 'bottom-left', 'bottom-right'],
                priorityZones: ['bottom-right']
            },
            'ken_fun_enthusiastic': {
                boundaries: { x: 0.25, y: 0.15, width: 0.5, height: 0.35 },
                safeAnchors: ['top-left', 'bottom-left', 'bottom-right'],
                priorityZones: ['bottom-right']
            },
            'ken_neutral_professional': {
                boundaries: { x: 0.35, y: 0.25, width: 0.3, height: 0.25 },
                safeAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
                priorityZones: ['bottom-right']
            }
        };
    }

    /**
     * Load mood triggers for lesson content
     */
    loadMoodTriggers() {
        return {
            'opening': {
                grandmother: 'warm',
                fun: 'enthusiastic',
                neutral: 'professional'
            },
            'question_1': {
                grandmother: 'curious',
                fun: 'playful',
                neutral: 'focused'
            },
            'question_2': {
                grandmother: 'thoughtful',
                fun: 'engaged',
                neutral: 'analytical'
            },
            'question_3': {
                grandmother: 'wise',
                fun: 'excited',
                neutral: 'satisfied'
            },
            'feedback_correct': {
                grandmother: 'celebrating',
                fun: 'celebrating',
                neutral: 'satisfied'
            },
            'feedback_incorrect': {
                grandmother: 'encouraging',
                fun: 'encouraging',
                neutral: 'encouraging'
            },
            'closing': {
                grandmother: 'wise',
                fun: 'satisfied',
                neutral: 'satisfied'
            }
        };
    }

    /**
     * Load expression timing data
     */
    loadExpressionTiming() {
        return {
            'transition_duration': 600,
            'mood_hold_duration': 3000,
            'micro_animation_duration': 3000,
            'expression_fade_duration': 300
        };
    }

    /**
     * Calculate safe zones based on Ken's current expression
     */
    calculateSafeZones(expression = this.currentExpression) {
        const faceZone = this.faceSafeZones[expression] || this.faceSafeZones['ken_neutral_default'];
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        return {
            avoidZone: {
                x: faceZone.boundaries.x * screenWidth,
                y: faceZone.boundaries.y * screenHeight,
                width: faceZone.boundaries.width * screenWidth,
                height: faceZone.boundaries.height * screenHeight
            },
            safeAnchors: faceZone.safeAnchors,
            priorityZones: faceZone.priorityZones
        };
    }

    /**
     * Update Ken's expression based on lesson content
     */
    updateKenExpression(lessonPhase, tone, mood) {
        const newExpression = this.mapExpressionToContent(lessonPhase, tone, mood);
        
        if (newExpression !== this.currentExpression) {
            this.transitionKenExpression(newExpression);
            this.currentExpression = newExpression;
            this.currentTone = tone;
            this.currentMood = mood;
            
            // Reposition overlays after Ken's expression changes
            this.repositionOverlays();
        }
    }

    /**
     * Map lesson content to Ken expressions
     */
    mapExpressionToContent(lessonPhase, tone, mood) {
        const moodTrigger = this.moodTriggers[lessonPhase]?.[tone] || 'neutral';
        
        const expressionMappings = {
            'opening': {
                grandmother: 'ken_grandmother_warm',
                fun: 'ken_fun_enthusiastic',
                neutral: 'ken_neutral_professional'
            },
            'question_1': {
                grandmother: 'ken_grandmother_curious',
                fun: 'ken_fun_playful',
                neutral: 'ken_neutral_focused'
            },
            'question_2': {
                grandmother: 'ken_grandmother_thoughtful',
                fun: 'ken_fun_engaged',
                neutral: 'ken_neutral_analytical'
            },
            'question_3': {
                grandmother: 'ken_grandmother_wise',
                fun: 'ken_fun_excited',
                neutral: 'ken_neutral_satisfied'
            },
            'feedback_correct': {
                grandmother: 'ken_grandmother_celebrating',
                fun: 'ken_fun_celebrating',
                neutral: 'ken_neutral_satisfied'
            },
            'feedback_incorrect': {
                grandmother: 'ken_grandmother_encouraging',
                fun: 'ken_fun_encouraging',
                neutral: 'ken_neutral_encouraging'
            },
            'closing': {
                grandmother: 'ken_grandmother_wise',
                fun: 'ken_fun_satisfied',
                neutral: 'ken_neutral_satisfied'
            }
        };

        return expressionMappings[lessonPhase]?.[tone] || 'ken_neutral_default';
    }

    /**
     * Smooth transition between Ken expressions
     */
    transitionKenExpression(newExpression) {
        const kenContainer = document.getElementById('avatar-container');
        if (!kenContainer) return;

        // Fade out current expression
        kenContainer.style.opacity = '0.8';
        kenContainer.style.transition = `opacity ${this.expressionTiming.expression_fade_duration}ms ease`;
        
        setTimeout(() => {
            // Update to new expression with organized asset paths
            const imagePath = this.getImagePathForExpression(newExpression);
            kenContainer.style.backgroundImage = `url(${imagePath})`;
            
            // Fade in new expression
            setTimeout(() => {
                kenContainer.style.opacity = '1';
            }, 50);
            
            // Update overlay mood classes
            this.updateOverlayMood(newExpression);
            
        }, this.expressionTiming.expression_fade_duration);
        
        console.log(`Ken expression changed to: ${newExpression}`);
    }

    /**
     * Update overlay mood classes for "sing" animations
     */
    updateOverlayMood(expression) {
        const overlays = document.querySelectorAll('.ken-responsive-overlay');
        
        // Remove all mood classes
        overlays.forEach(overlay => {
            overlay.classList.remove('ken-happy', 'ken-concerned', 'ken-neutral', 'ken-excited');
        });
        
        // Add appropriate mood class based on expression
        const moodClass = this.getMoodClassFromExpression(expression);
        overlays.forEach(overlay => {
            overlay.classList.add(moodClass);
        });
    }

    /**
     * Get mood class from Ken expression
     */
    getMoodClassFromExpression(expression) {
        if (expression.includes('happy') || expression.includes('celebrating') || expression.includes('enthusiastic')) {
            return 'ken-happy';
        } else if (expression.includes('concerned') || expression.includes('thinking') || expression.includes('focused')) {
            return 'ken-concerned';
        } else if (expression.includes('excited') || expression.includes('playful')) {
            return 'ken-excited';
        } else {
            return 'ken-neutral';
        }
    }

    /**
     * Reposition overlays based on Ken's current expression
     */
    repositionOverlays() {
        const safeZones = this.calculateSafeZones();
        const overlays = document.querySelectorAll('.glass-overlay');
        
        overlays.forEach(overlay => {
            if (overlay.classList.contains('active')) {
                this.positionOverlayFaceSafe(overlay, safeZones);
            }
        });
    }

    /**
     * Position overlay in face-safe zone with "glide" animation
     */
    positionOverlayFaceSafe(overlay, safeZones) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // Choose best safe zone (prefer bottom-right)
        const preferredZone = safeZones.priorityZones[0];
        let position;
        
        switch (preferredZone) {
            case 'bottom-right':
                position = {
                    x: screenWidth - 320,
                    y: screenHeight - 200
                };
                break;
            case 'top-right':
                position = {
                    x: screenWidth - 320,
                    y: 20
                };
                break;
            case 'bottom-left':
                position = {
                    x: 20,
                    y: screenHeight - 200
                };
                break;
            case 'top-left':
            default:
                position = {
                    x: 20,
                    y: 20
                };
                break;
        }
        
        // Apply "glide" animation
        overlay.style.transition = `all ${this.expressionTiming.transition_duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        overlay.style.position = 'fixed';
        overlay.style.left = `${position.x}px`;
        overlay.style.top = `${position.y}px`;
        overlay.style.transform = 'none';
    }

    /**
     * Get current Ken state
     */
    getCurrentKenState() {
        return {
            expression: this.currentExpression,
            tone: this.currentTone,
            mood: this.currentMood,
            safeZones: this.calculateSafeZones()
        };
    }

    /**
     * Get the correct image path for a given expression
     */
    getImagePathForExpression(expression) {
        const imagePaths = {
        "ken_neutral_default": "lesson-player-deploy/assets/avatars/ken.jpg",
        "ken_happy_celebrating": "lesson-player-deploy/assets/avatars/ken.jpg",
        "ken_concerned_thinking": "lesson-player-deploy/assets/avatars/ken.jpg",
        "ken_question_curious": "lesson-player-deploy/assets/avatars/ken.jpg",
        "ken_teaching_explaining": "lesson-player-deploy/assets/avatars/ken.jpg",
        "ken_grandmother_warm": "lesson-player-deploy/assets/avatars/ken.jpg",
        "ken_fun_enthusiastic": "lesson-player-deploy/assets/avatars/ken.jpg",
        "ken_neutral_professional": "lesson-player-deploy/assets/avatars/ken.jpg"
};
        
        return imagePaths[expression] || imagePaths['ken_neutral_default'];
    }

    /**
     * Handle window resize for responsive face-safe zones
     */
    handleWindowResize() {
        this.repositionOverlays();
    }
}

// Initialize Ken wallpaper system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.kenWallpaperSystem = new KenWallpaperSystem();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.kenWallpaperSystem) {
            window.kenWallpaperSystem.handleWindowResize();
        }
    });
    
    console.log('✅ Ken wallpaper system ready');
}); 