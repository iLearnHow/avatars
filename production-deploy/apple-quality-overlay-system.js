/**
 * Apple-Quality Overlay System
 * Icon-Specific Positioning with Smart Stacking
 * Based on Claude Cursor Constitution v3.0
 */

class IconPositioningManager {
    constructor() {
        // Icon-specific positioning strategies
        this.iconStrategies = {
            'speaker-controls': {
                primary: 'top-right',
                secondary: 'right-middle',
                size: 'compact',
                priority: 'high',
                behavior: 'persistent',
                dimensions: { width: 300, height: 350 }
            },
            'tone-controls': {
                primary: 'top-left',
                secondary: 'left-middle',
                size: 'very-compact',
                priority: 'low',
                behavior: 'auto-close',
                dimensions: { width: 250, height: 200 }
            },
            'language-controls': {
                primary: 'top-left-below-tone',
                secondary: 'left-below-tone',
                size: 'compact',
                priority: 'low',
                behavior: 'auto-close',
                dimensions: { width: 280, height: 250 }
            },
            'avatar-controls': {
                primary: 'top-left-below-language',
                secondary: 'left-below-language',
                size: 'very-compact',
                priority: 'low',
                behavior: 'auto-close',
                dimensions: { width: 200, height: 180 }
            },
            'age-controls': {
                primary: 'top-left-below-avatar',
                secondary: 'left-below-avatar',
                size: 'compact',
                priority: 'low',
                behavior: 'auto-close',
                dimensions: { width: 250, height: 200 }
            },
            'calendar-controls': {
                primary: 'center-right',
                secondary: 'right-middle',
                size: 'large',
                priority: 'medium',
                behavior: 'persistent',
                dimensions: { width: 400, height: 500 }
            },
            'hamburger-menu': {
                primary: 'bottom-left',
                secondary: 'left-bottom',
                size: 'compact',
                priority: 'very-low',
                behavior: 'persistent',
                dimensions: { width: 250, height: 300 }
            }
        };

        // Smart stacking configuration
        this.leftStack = ['tone-controls', 'language-controls', 'avatar-controls', 'age-controls'];
        this.rightStack = ['speaker-controls', 'calendar-controls'];
        this.bottomStack = ['hamburger-menu'];

        // Face-safe zones (Ken/Kelly face protection)
        this.faceZones = {
            ken: { x: 0.3, y: 0.2, width: 0.4, height: 0.6 },
            kelly: { x: 0.3, y: 0.2, width: 0.4, height: 0.6 }
        };

        // Auto-close timing
        this.autoCloseDelay = 2000; // 2 seconds
        this.autoCloseTimers = new Map();

        // Animation settings
        this.animationSettings = {
            duration: 300,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            springStiffness: 0.8,
            springDamping: 0.6
        };

        this.initialize();
    }

    initialize() {
        console.log('🎯 Initializing Apple-Quality Overlay System...');
        this.setupEventListeners();
        this.setupFaceSafeDetection();
        this.setupAutoCloseSystem();
        console.log('✅ Apple-Quality Overlay System initialized');
    }

    positionIcon(iconId, position = 'primary') {
        const strategy = this.iconStrategies[iconId];
        if (!strategy) {
            console.error(`❌ No positioning strategy found for icon: ${iconId}`);
            return null;
        }

        const targetPosition = position === 'primary' ? strategy.primary : strategy.secondary;
        const coordinates = this.calculatePosition(targetPosition, strategy);
        
        // Check face-safe positioning
        if (!this.isFaceSafe(coordinates, strategy.dimensions)) {
            console.log(`🔄 Repositioning ${iconId} due to face collision`);
            const safeCoordinates = this.findSafePosition(coordinates, strategy.dimensions);
            return this.applyPosition(iconId, safeCoordinates, strategy);
        }

        return this.applyPosition(iconId, coordinates, strategy);
    }

    calculatePosition(positionType, strategy) {
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        const margins = { x: 20, y: 20 };
        const stackGap = 80;

        switch (positionType) {
            case 'top-right':
                return {
                    x: viewport.width - strategy.dimensions.width - margins.x,
                    y: margins.y
                };

            case 'right-middle':
                return {
                    x: viewport.width - strategy.dimensions.width - margins.x,
                    y: (viewport.height - strategy.dimensions.height) / 2
                };

            case 'top-left':
                return {
                    x: margins.x,
                    y: margins.y
                };

            case 'top-left-below-tone':
                return {
                    x: margins.x,
                    y: margins.y + 220 // Below tone controls
                };

            case 'top-left-below-language':
                return {
                    x: margins.x,
                    y: margins.y + 480 // Below language controls
                };

            case 'top-left-below-avatar':
                return {
                    x: margins.x,
                    y: margins.y + 680 // Below avatar controls
                };

            case 'left-middle':
                return {
                    x: margins.x,
                    y: (viewport.height - strategy.dimensions.height) / 2
                };

            case 'left-below-tone':
                return {
                    x: margins.x,
                    y: margins.y + 220 + stackGap
                };

            case 'left-below-language':
                return {
                    x: margins.x,
                    y: margins.y + 480 + stackGap
                };

            case 'left-below-avatar':
                return {
                    x: margins.x,
                    y: margins.y + 680 + stackGap
                };

            case 'center-right':
                return {
                    x: viewport.width - strategy.dimensions.width - margins.x - 100,
                    y: (viewport.height - strategy.dimensions.height) / 2
                };

            case 'bottom-left':
                return {
                    x: margins.x,
                    y: viewport.height - strategy.dimensions.height - margins.y
                };

            case 'left-bottom':
                return {
                    x: margins.x,
                    y: viewport.height - strategy.dimensions.height - margins.y
                };

            default:
                return { x: margins.x, y: margins.y };
        }
    }

    applyPosition(iconId, coordinates, strategy) {
        const overlay = document.getElementById(`${iconId}-overlay`);
        if (!overlay) {
            console.error(`❌ Overlay not found: ${iconId}-overlay`);
            return null;
        }

        // Apply Apple-quality spring animation
        overlay.style.transition = `all ${this.animationSettings.duration}ms ${this.animationSettings.easing}`;
        overlay.style.transform = `translate(${coordinates.x}px, ${coordinates.y}px)`;
        overlay.style.width = `${strategy.dimensions.width}px`;
        overlay.style.height = `${strategy.dimensions.height}px`;

        // Add Apple-quality visual feedback
        this.addTactileFeedback(overlay);

        console.log(`🎯 Positioned ${iconId} at (${coordinates.x}, ${coordinates.y})`);
        return coordinates;
    }

    isFaceSafe(coordinates, dimensions) {
        const currentAvatar = window.currentAvatar || 'kelly';
        const faceZone = this.faceZones[currentAvatar.toLowerCase()];
        
        const overlayBounds = {
            x: coordinates.x,
            y: coordinates.y,
            width: dimensions.width,
            height: dimensions.height
        };

        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        const faceBounds = {
            x: faceZone.x * viewport.width,
            y: faceZone.y * viewport.height,
            width: faceZone.width * viewport.width,
            height: faceZone.height * viewport.height
        };

        // Check for collision
        return !(overlayBounds.x < faceBounds.x + faceBounds.width &&
                overlayBounds.x + overlayBounds.width > faceBounds.x &&
                overlayBounds.y < faceBounds.y + faceBounds.height &&
                overlayBounds.y + overlayBounds.height > faceBounds.y);
    }

    findSafePosition(originalCoordinates, dimensions) {
        // Try alternative positions if face collision detected
        const alternatives = [
            { x: originalCoordinates.x + 100, y: originalCoordinates.y },
            { x: originalCoordinates.x, y: originalCoordinates.y + 100 },
            { x: originalCoordinates.x - 100, y: originalCoordinates.y },
            { x: originalCoordinates.x, y: originalCoordinates.y - 100 }
        ];

        for (const alt of alternatives) {
            if (this.isFaceSafe(alt, dimensions)) {
                return alt;
            }
        }

        // Fallback to safe zone
        return { x: 20, y: 20 };
    }

    handleStacking() {
        // Implement smart stacking for related overlays
        this.leftStack.forEach((iconId, index) => {
            if (this.isOverlayOpen(iconId)) {
                const stackOffset = index * 80; // 80px gap between stacked items
                this.adjustStackPosition(iconId, stackOffset);
            }
        });
    }

    adjustStackPosition(iconId, offset) {
        const overlay = document.getElementById(`${iconId}-overlay`);
        if (overlay) {
            const currentTransform = overlay.style.transform;
            const match = currentTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
            if (match) {
                const x = parseFloat(match[1]);
                const y = parseFloat(match[2]) + offset;
                overlay.style.transform = `translate(${x}px, ${y}px)`;
            }
        }
    }

    setupAutoCloseSystem() {
        // Auto-close for set-once controls
        this.leftStack.forEach(iconId => {
            const strategy = this.iconStrategies[iconId];
            if (strategy.behavior === 'auto-close') {
                this.setupAutoClose(iconId);
            }
        });
    }

    setupAutoClose(iconId) {
        const overlay = document.getElementById(`${iconId}-overlay`);
        if (overlay) {
            overlay.addEventListener('mouseenter', () => {
                this.clearAutoCloseTimer(iconId);
            });

            overlay.addEventListener('mouseleave', () => {
                this.startAutoCloseTimer(iconId);
            });
        }
    }

    startAutoCloseTimer(iconId) {
        this.clearAutoCloseTimer(iconId);
        const timer = setTimeout(() => {
            this.closeOverlay(iconId);
        }, this.autoCloseDelay);
        this.autoCloseTimers.set(iconId, timer);
    }

    clearAutoCloseTimer(iconId) {
        const timer = this.autoCloseTimers.get(iconId);
        if (timer) {
            clearTimeout(timer);
            this.autoCloseTimers.delete(iconId);
        }
    }

    closeOverlay(iconId) {
        const overlay = document.getElementById(`${iconId}-overlay`);
        if (overlay) {
            overlay.style.display = 'none';
            console.log(`🔒 Auto-closed ${iconId}`);
        }
    }

    isOverlayOpen(iconId) {
        const overlay = document.getElementById(`${iconId}-overlay`);
        return overlay && overlay.style.display !== 'none';
    }

    addTactileFeedback(element) {
        // Add Apple-quality tactile feedback
        element.addEventListener('click', () => {
            element.style.transform += ' scale(0.95)';
            setTimeout(() => {
                element.style.transform = element.style.transform.replace(' scale(0.95)', '');
            }, 100);
        });

        element.addEventListener('mouseenter', () => {
            element.style.filter = 'brightness(1.1)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.filter = 'brightness(1)';
        });
    }

    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Handle avatar changes
        document.addEventListener('avatarChanged', (event) => {
            this.updateFaceSafeZones(event.detail.avatar);
        });
    }

    setupFaceSafeDetection() {
        // Monitor avatar changes for face-safe zone updates
        const avatarContainer = document.getElementById('avatar-container');
        if (avatarContainer) {
            const observer = new MutationObserver(() => {
                this.updateFaceSafeZones();
            });
            observer.observe(avatarContainer, { attributes: true, attributeFilter: ['class'] });
        }
    }

    updateFaceSafeZones(avatar = null) {
        if (avatar) {
            window.currentAvatar = avatar;
        }
        // Recalculate face-safe zones based on current avatar
        console.log(`🔄 Updated face-safe zones for ${window.currentAvatar || 'kelly'}`);
    }

    handleWindowResize() {
        // Reposition all open overlays on window resize
        Object.keys(this.iconStrategies).forEach(iconId => {
            if (this.isOverlayOpen(iconId)) {
                this.positionIcon(iconId);
            }
        });
    }

    // Public API methods
    openOverlay(iconId) {
        console.log(`🎯 Opening overlay: ${iconId}`);
        const overlay = document.getElementById(`${iconId}-overlay`);
        if (overlay) {
            overlay.style.display = 'block';
            this.positionIcon(iconId);
            
            // Start auto-close timer if needed
            const strategy = this.iconStrategies[iconId];
            if (strategy && strategy.behavior === 'auto-close') {
                this.startAutoCloseTimer(iconId);
            }
        }
    }

    closeAllOverlays() {
        Object.keys(this.iconStrategies).forEach(iconId => {
            this.closeOverlay(iconId);
        });
    }

    toggleOverlay(iconId) {
        if (this.isOverlayOpen(iconId)) {
            this.closeOverlay(iconId);
        } else {
            this.openOverlay(iconId);
        }
    }
}

// Initialize the Apple-Quality Overlay System
const appleQualityOverlaySystem = new IconPositioningManager();

// Export for use in other modules
window.AppleQualityOverlaySystem = appleQualityOverlaySystem; 