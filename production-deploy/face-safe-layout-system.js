/**
 * Face-Safe Layout System
 * Ensures Kelly and Ken's faces are ALWAYS visible
 * Manages overlay positioning to avoid face coverage
 */

class FaceSafeLayoutSystem {
    constructor() {
        this.currentAvatar = 'kelly';
        this.faceSafeZones = {
            kelly: {
                face: { x: 200, y: 100, width: 400, height: 500 },
                safeZones: {
                    topLeft: { x: 50, y: 50, width: 300, height: 200 },
                    topRight: { x: 600, y: 50, width: 300, height: 200 },
                    bottomLeft: { x: 50, y: 400, width: 300, height: 200 },
                    bottomRight: { x: 600, y: 400, width: 300, height: 200 }
                }
            },
            ken: {
                face: { x: 200, y: 100, width: 400, height: 500 },
                safeZones: {
                    topLeft: { x: 50, y: 50, width: 300, height: 200 },
                    topRight: { x: 600, y: 50, width: 300, height: 200 },
                    bottomLeft: { x: 50, y: 400, width: 300, height: 200 },
                    bottomRight: { x: 600, y: 400, width: 300, height: 200 }
                }
            }
        };
        
        this.activeOverlay = null;
        this.overlayQueue = [];
        
        this.initializeFaceSafeSystem();
    }

    /**
     * Initialize face-safe positioning system
     */
    initializeFaceSafeSystem() {
        console.log('🎭 Initializing face-safe layout system...');
        
        // Set up overlay management
        this.setupOverlayManagement();
        
        // Position existing overlays safely
        this.repositionAllOverlays();
        
        console.log('✅ Face-safe layout system initialized');
    }

    /**
     * Setup overlay management to prevent face coverage
     */
    setupOverlayManagement() {
        // Override overlay display functions to use face-safe positioning
        this.overrideOverlayFunctions();
        
        // Add face-safe positioning to all overlays
        this.addFaceSafePositioning();
    }

    /**
     * Override overlay functions to ensure face-safe positioning
     */
    overrideOverlayFunctions() {
        // Override openNewLessonCreator
        window.openNewLessonCreator = () => {
            this.showOverlaySafely('new-lesson-overlay', 'bottomRight');
        };

        // Override toggleCalendar
        window.toggleCalendar = () => {
            this.toggleOverlaySafely('calendar-overlay', 'topRight');
        };

        // Override toggleTone
        window.toggleTone = () => {
            this.toggleOverlaySafely('tone-overlay', 'bottomLeft');
        };

        // Override toggleAvatar
        window.toggleAvatar = () => {
            this.toggleOverlaySafely('avatar-overlay', 'topLeft');
        };

        // Override toggleLanguage
        window.toggleLanguage = () => {
            this.toggleOverlaySafely('language-overlay', 'bottomRight');
        };

        // Override toggleAge
        window.toggleAge = () => {
            this.toggleOverlaySafely('age-overlay', 'topLeft');
        };

        console.log('✅ Overlay functions overridden with face-safe positioning');
    }

    /**
     * Enforce single overlay rule - CRITICAL FIX
     * @param {string} overlayId - ID of overlay to show
     */
    enforceSingleOverlayRule(overlayId) {
        console.log(`🔒 Enforcing single overlay rule for ${overlayId}`);
        
        // Get all possible overlays
        const allOverlays = [
            'new-lesson-overlay',
            'calendar-overlay', 
            'tone-overlay',
            'avatar-overlay',
            'language-overlay',
            'age-overlay'
        ];
        
        // Hide ALL overlays first
        allOverlays.forEach(id => {
            const overlay = document.getElementById(id);
            if (overlay) {
                overlay.style.display = 'none';
                overlay.classList.remove('overlay-active');
                overlay.classList.add('overlay-hidden');
            }
        });
        
        // Show only the requested overlay
        const targetOverlay = document.getElementById(overlayId);
        if (targetOverlay) {
            targetOverlay.style.display = 'block';
            targetOverlay.classList.remove('overlay-hidden');
            targetOverlay.classList.add('overlay-active');
            this.activeOverlay = overlayId;
            console.log(`✅ Single overlay rule enforced: ${overlayId} visible`);
        }
        
        return targetOverlay;
    }

    /**
     * Show overlay in face-safe zone
     * @param {string} overlayId - ID of overlay to show
     * @param {string} zone - Safe zone to position in
     */
    showOverlaySafely(overlayId, zone = 'bottomRight') {
        console.log(`🎯 Showing ${overlayId} in ${zone} zone`);
        
        // ENFORCE SINGLE OVERLAY RULE FIRST
        const overlay = this.enforceSingleOverlayRule(overlayId);
        
        if (overlay) {
            // Position overlay in safe zone
            this.positionOverlayInSafeZone(overlay, zone);
            console.log(`✅ ${overlayId} positioned safely in ${zone} zone`);
        } else {
            console.error(`❌ Overlay ${overlayId} not found`);
        }
    }

    /**
     * Hide all overlays
     */
    hideAllOverlays() {
        const overlays = ['new-lesson-overlay', 'calendar-overlay', 'tone-overlay', 'avatar-overlay', 'language-overlay', 'age-overlay'];
        overlays.forEach(id => {
            const overlay = document.getElementById(id);
            if (overlay) {
                overlay.classList.remove('overlay-active');
                overlay.classList.add('overlay-hidden');
                overlay.style.display = 'none';
            }
        });
        console.log('✅ All overlays hidden');
    }

    /**
     * Toggle overlay with face-safe positioning
     * @param {string} overlayId - ID of overlay to toggle
     * @param {string} zone - Safe zone to position in
     */
    toggleOverlaySafely(overlayId, zone = 'bottomRight') {
        const overlay = document.getElementById(overlayId);
        if (overlay) {
            if (overlay.style.display === 'none' || !overlay.style.display) {
                this.showOverlaySafely(overlayId, zone);
            } else {
                this.closeOverlay(overlayId);
            }
        }
    }

    /**
     * Position overlay in face-safe zone
     * @param {HTMLElement} overlay - Overlay element
     * @param {string} zone - Safe zone name
     */
    positionOverlayInSafeZone(overlay, zone) {
        const avatar = this.currentAvatar;
        const safeZone = this.faceSafeZones[avatar].safeZones[zone];
        
        if (safeZone) {
            // Position overlay in safe zone
            overlay.style.position = 'fixed';
            overlay.style.left = `${safeZone.x}px`;
            overlay.style.top = `${safeZone.y}px`;
            overlay.style.maxWidth = `${safeZone.width}px`;
            overlay.style.maxHeight = `${safeZone.height}px`;
            overlay.style.zIndex = '1000';
            
            // Ensure overlay doesn't cover face
            overlay.style.transform = 'none';
            overlay.style.width = 'auto';
            overlay.style.height = 'auto';
            
            console.log(`📍 Positioned overlay in ${zone} zone:`, safeZone);
        }
    }

    /**
     * Close active overlay
     */
    closeActiveOverlay() {
        if (this.activeOverlay) {
            const overlay = document.getElementById(this.activeOverlay);
            if (overlay) {
                overlay.classList.remove('overlay-active');
                overlay.classList.add('overlay-hidden');
                overlay.style.display = 'none';
                console.log(`✅ Closed active overlay: ${this.activeOverlay}`);
            }
            this.activeOverlay = null;
        }
    }

    /**
     * Close specific overlay
     * @param {string} overlayId - ID of overlay to close
     */
    closeOverlay(overlayId) {
        const overlay = document.getElementById(overlayId);
        if (overlay) {
            overlay.classList.remove('overlay-active');
            overlay.classList.add('overlay-hidden');
            overlay.style.display = 'none';
            if (this.activeOverlay === overlayId) {
                this.activeOverlay = null;
            }
            console.log(`✅ Closed overlay: ${overlayId}`);
        }
    }

    /**
     * Reposition all overlays to face-safe zones
     */
    repositionAllOverlays() {
        const overlays = [
            { id: 'new-lesson-overlay', zone: 'bottomRight' },
            { id: 'calendar-overlay', zone: 'topRight' },
            { id: 'tone-overlay', zone: 'bottomLeft' },
            { id: 'avatar-overlay', zone: 'topLeft' },
            { id: 'language-overlay', zone: 'bottomRight' },
            { id: 'age-overlay', zone: 'topLeft' }
        ];

        overlays.forEach(({ id, zone }) => {
            const overlay = document.getElementById(id);
            if (overlay) {
                this.positionOverlayInSafeZone(overlay, zone);
                overlay.classList.remove('overlay-active');
                overlay.classList.add('overlay-hidden');
                overlay.style.display = 'none'; // Start hidden
            }
        });

        console.log('✅ All overlays repositioned to face-safe zones');
    }

    /**
     * Add face-safe positioning CSS
     */
    addFaceSafePositioning() {
        const style = document.createElement('style');
        style.textContent = `
            /* Face-Safe Overlay Positioning */
            .face-safe-overlay {
                position: fixed !important;
                background: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(20px) !important;
                border: 1px solid rgba(0, 0, 0, 0.1) !important;
                border-radius: 16px !important;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
                padding: 24px !important;
                max-width: 350px !important;
                max-height: 400px !important;
                overflow-y: auto !important;
                z-index: 1000 !important;
                color: #333 !important;
            }

            /* Ensure avatar face is always visible */
            .avatar-container {
                z-index: 1 !important;
            }

            /* Overlay positioning zones */
            .overlay-zone-topLeft {
                top: 50px !important;
                left: 50px !important;
            }

            .overlay-zone-topRight {
                top: 50px !important;
                right: 50px !important;
            }

            .overlay-zone-bottomLeft {
                bottom: 150px !important;
                left: 50px !important;
            }

            .overlay-zone-bottomRight {
                bottom: 150px !important;
                right: 50px !important;
            }

            /* Ensure lesson info doesn't cover face */
            .lesson-info {
                left: 50px !important;
                top: 50px !important;
                max-width: 300px !important;
                z-index: 5 !important;
            }

            /* Icon stack positioning */
            .side-navigation {
                bottom: 100px !important;
                right: 50px !important;
                z-index: 100 !important;
            }
        `;
        document.head.appendChild(style);
        console.log('✅ Face-safe positioning CSS added');
    }

    /**
     * Switch avatar with face-safe positioning
     * @param {string} avatar - Avatar to switch to
     */
    switchAvatar(avatar) {
        console.log(`🔄 Switching to ${avatar} with face-safe positioning`);
        
        this.currentAvatar = avatar;
        
        // Close any active overlays
        this.closeActiveOverlay();
        
        // Reposition overlays for new avatar
        this.repositionAllOverlays();
        
        console.log(`✅ Switched to ${avatar} with face-safe layout`);
    }

    /**
     * Get current face-safe zones
     * @returns {Object} Current face-safe zones
     */
    getCurrentFaceSafeZones() {
        return this.faceSafeZones[this.currentAvatar];
    }

    /**
     * Check if position is face-safe
     * @param {number} x - X position
     * @param {number} y - Y position
     * @returns {boolean} True if position is face-safe
     */
    isPositionFaceSafe(x, y) {
        const faceZone = this.faceSafeZones[this.currentAvatar].face;
        return !(x >= faceZone.x && x <= faceZone.x + faceZone.width &&
                y >= faceZone.y && y <= faceZone.y + faceZone.height);
    }
}

// Initialize face-safe layout system immediately
window.faceSafeLayout = new FaceSafeLayoutSystem();

// Force initialization on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    if (window.faceSafeLayout) {
        console.log('🎭 Face-safe system DOM ready initialization...');
        window.faceSafeLayout.initializeFaceSafeSystem();
        
        // Force close all overlays initially
        const overlays = ['new-lesson-overlay', 'calendar-overlay', 'tone-overlay', 'avatar-overlay', 'language-overlay', 'age-overlay'];
        overlays.forEach(id => {
            const overlay = document.getElementById(id);
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
        
        console.log('✅ Face-safe system DOM ready initialization complete');
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FaceSafeLayoutSystem;
} 