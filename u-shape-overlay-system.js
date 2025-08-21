/**
 * U-SHAPE OVERLAY SYSTEM - iOS Style Liquid Glass
 * Coordinates all overlays in a sophisticated 3-column layout
 * 
 * Layout:
 * - Column 1 (Left): Complete fill - Control overlays
 * - Column 2 (Center): Bottom 1/3 only - Content overlays  
 * - Column 3 (Right): Complete fill - Variant overlays
 */

class UShapeOverlaySystem {
    constructor() {
        this.activeOverlays = new Map();
        this.overlayZones = {
            'left-top': { column: 'left', row: 'top', maxOverlays: 3 },
            'left-center': { column: 'left', row: 'center', maxOverlays: 2 },
            'left-bottom': { column: 'left', row: 'bottom', maxOverlays: 3 },
            'center-bottom': { column: 'center', row: 'bottom', maxOverlays: 2 },
            'right-top': { column: 'right', row: 'top', maxOverlays: 3 },
            'right-center': { column: 'right', row: 'center', maxOverlays: 2 },
            'right-bottom': { column: 'right', row: 'bottom', maxOverlays: 3 }
        };
        this.faceSafeZone = { x: 0.25, y: 0.25, width: 0.5, height: 0.5 };
        this.init();
    }

    init() {
        this.createUShapeStructure();
        this.setupEventListeners();
        this.initializeOverlayCategories();
        this.addStyles();
        console.log('✅ U-Shape Overlay System initialized');
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* U-SHAPE OVERLAY SYSTEM - iOS Style Liquid Glass */
            
            /* U-Shape Layout Container */
            .u-shape-overlay-system {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 1000;
                pointer-events: none;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-template-rows: 1fr 1fr 1fr;
            }

            /* Column 1 - Left Side (Complete Fill) */
            .u-column-left {
                grid-column: 1;
                grid-row: 1 / 4;
                pointer-events: auto;
                position: relative;
            }

            /* Column 2 - Center (Bottom 1/3 Only) */
            .u-column-center {
                grid-column: 2;
                grid-row: 3 / 4;
                pointer-events: auto;
                position: relative;
            }

            /* Column 3 - Right Side (Complete Fill) */
            .u-column-right {
                grid-column: 3;
                grid-row: 1 / 4;
                pointer-events: auto;
                position: relative;
            }

            /* iOS Style Liquid Glass Overlays */
            .liquid-glass-overlay {
                position: absolute;
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                box-shadow: 
                    0 8px 32px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.6);
                padding: 24px;
                margin: 16px;
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                opacity: 0;
                transform: translateY(20px) scale(0.95);
                pointer-events: auto;
                max-width: 400px;
                min-width: 280px;
            }

            .liquid-glass-overlay.active {
                opacity: 1;
                transform: translateY(0) scale(1);
            }

            .liquid-glass-overlay:hover {
                transform: translateY(-2px) scale(1.02);
                box-shadow: 
                    0 12px 40px rgba(0, 0, 0, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            /* Overlay Content Styling */
            .liquid-glass-overlay h3 {
                color: #1d1d1f;
                margin-bottom: 16px;
                font-size: 18px;
                font-weight: 600;
                letter-spacing: -0.01em;
            }

            .liquid-glass-overlay p {
                color: #6e6e73;
                margin-bottom: 16px;
                font-size: 14px;
                line-height: 1.5;
            }

            .liquid-glass-overlay input,
            .liquid-glass-overlay select,
            .liquid-glass-overlay button {
                background: rgba(255, 255, 255, 0.9);
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 12px;
                padding: 12px 16px;
                font-size: 14px;
                color: #1d1d1f;
                transition: all 0.2s ease;
                width: 100%;
                margin-bottom: 8px;
            }

            .liquid-glass-overlay button {
                background: #007AFF;
                color: white;
                border: none;
                cursor: pointer;
                font-weight: 500;
            }

            .liquid-glass-overlay button:hover {
                background: #0056CC;
                transform: translateY(-1px);
            }

            /* U-Shape Zone Positioning */
            .u-zone-left-top {
                top: 20px;
                left: 20px;
            }

            .u-zone-left-center {
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
            }

            .u-zone-left-bottom {
                bottom: 20px;
                left: 20px;
            }

            .u-zone-center-bottom {
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
            }

            .u-zone-right-top {
                top: 20px;
                right: 20px;
            }

            .u-zone-right-center {
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
            }

            .u-zone-right-bottom {
                bottom: 20px;
                right: 20px;
            }

            /* Overlay Categories */
            .overlay-category-controls {
                border-left: 3px solid #007AFF;
            }

            .overlay-category-content {
                border-left: 3px solid #34C759;
            }

            .overlay-category-variants {
                border-left: 3px solid #FF9500;
            }

            .overlay-category-help {
                border-left: 3px solid #AF52DE;
            }

            /* Overlay Stacking and Coordination */
            .overlay-stack {
                position: relative;
                z-index: 1001;
            }

            .overlay-stack .liquid-glass-overlay {
                margin-bottom: 8px;
            }

            /* Face-Safe Zone Protection */
            .face-safe-zone {
                position: absolute;
                top: 25%;
                left: 25%;
                width: 50%;
                height: 50%;
                pointer-events: none;
                z-index: 999;
            }

            /* Overlay Animation System */
            @keyframes overlaySlideIn {
                from {
                    opacity: 0;
                    transform: translateY(30px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            @keyframes overlaySlideOut {
                from {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateY(-30px) scale(0.9);
                }
            }

            .overlay-slide-in {
                animation: overlaySlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            .overlay-slide-out {
                animation: overlaySlideOut 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            /* Responsive U-Shape Layout */
            @media (max-width: 768px) {
                .u-shape-overlay-system {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto auto;
                }
                
                .u-column-left,
                .u-column-center,
                .u-column-right {
                    grid-column: 1;
                }
                
                .u-column-left {
                    grid-row: 1;
                }
                
                .u-column-center {
                    grid-row: 2;
                }
                
                .u-column-right {
                    grid-row: 3;
                }
            }

            /* Overlay Coordination System */
            .overlay-coordinator {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 999;
                pointer-events: none;
            }

            .overlay-coordinator .coordination-indicator {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                pointer-events: auto;
            }
        `;
        document.head.appendChild(style);
    }

    createUShapeStructure() {
        const uShapeSystem = document.createElement('div');
        uShapeSystem.className = 'u-shape-overlay-system';
        uShapeSystem.innerHTML = `
            <div class="u-column-left">
                <div class="overlay-stack" id="left-stack"></div>
            </div>
            <div class="u-column-center">
                <div class="overlay-stack" id="center-stack"></div>
            </div>
            <div class="u-column-right">
                <div class="overlay-stack" id="right-stack"></div>
            </div>
            <div class="face-safe-zone"></div>
        `;
        document.body.appendChild(uShapeSystem);
    }

    setupEventListeners() {
        // Global overlay coordination
        document.addEventListener('overlay-request', (e) => {
            this.handleOverlayRequest(e.detail);
        });

        // Window resize handling
        window.addEventListener('resize', () => {
            this.repositionOverlays();
        });
    }

    initializeOverlayCategories() {
        // Control overlays (left side)
        this.createOverlayCategory('controls', 'left', [
            { id: 'speaker-controls', title: '🔊 Audio Controls', zone: 'left-top' },
            { id: 'lesson-controls', title: '📚 Lesson Controls', zone: 'left-center' },
            { id: 'navigation-controls', title: '🧭 Navigation', zone: 'left-bottom' }
        ]);

        // Content overlays (center bottom)
        this.createOverlayCategory('content', 'center', [
            { id: 'lesson-content', title: '📖 Lesson Content', zone: 'center-bottom' },
            { id: 'progress-tracker', title: '📊 Progress', zone: 'center-bottom' }
        ]);

        // Variant overlays (right side)
        this.createOverlayCategory('variants', 'right', [
            { id: 'tone-variants', title: '🎭 Tone Options', zone: 'right-top' },
            { id: 'language-variants', title: '🌍 Language', zone: 'right-center' },
            { id: 'avatar-variants', title: '👤 Avatar', zone: 'right-bottom' }
        ]);

        // Help overlays (distributed)
        this.createOverlayCategory('help', 'distributed', [
            { id: 'help-overlay', title: '❓ Help', zone: 'right-top' },
            { id: 'about-overlay', title: 'ℹ️ About', zone: 'left-top' }
        ]);
    }

    createOverlayCategory(category, column, overlays) {
        overlays.forEach(overlay => {
            this.createLiquidGlassOverlay(overlay.id, overlay.title, overlay.zone, category);
        });
    }

    createLiquidGlassOverlay(id, title, zone, category) {
        const overlay = document.createElement('div');
        overlay.className = `liquid-glass-overlay overlay-category-${category}`;
        overlay.id = id;
        overlay.innerHTML = `
            <h3>${title}</h3>
            <div class="overlay-content" id="${id}-content">
                <!-- Dynamic content will be loaded here -->
            </div>
            <div class="overlay-controls">
                <button class="overlay-minimize" onclick="uShapeSystem.minimizeOverlay('${id}')">−</button>
                <button class="overlay-close" onclick="uShapeSystem.closeOverlay('${id}')">×</button>
            </div>
        `;

        // Position in appropriate zone
        const zoneElement = this.getZoneElement(zone);
        if (zoneElement) {
            zoneElement.appendChild(overlay);
            this.activeOverlays.set(id, { overlay, zone, category });
        }
    }

    getZoneElement(zone) {
        const zoneMap = {
            'left-top': document.querySelector('#left-stack'),
            'left-center': document.querySelector('#left-stack'),
            'left-bottom': document.querySelector('#left-stack'),
            'center-bottom': document.querySelector('#center-stack'),
            'right-top': document.querySelector('#right-stack'),
            'right-center': document.querySelector('#right-stack'),
            'right-bottom': document.querySelector('#right-stack')
        };
        return zoneMap[zone];
    }

    openOverlay(id, content = null) {
        const overlayData = this.activeOverlays.get(id);
        if (!overlayData) return;

        const overlay = overlayData.overlay;
        overlay.classList.add('active', 'overlay-slide-in');

        if (content) {
            const contentElement = overlay.querySelector('.overlay-content');
            if (contentElement) {
                contentElement.innerHTML = content;
            }
        }

        this.updateCoordinationIndicator();
        console.log(`✅ Overlay opened: ${id}`);
    }

    closeOverlay(id) {
        const overlayData = this.activeOverlays.get(id);
        if (!overlayData) return;

        const overlay = overlayData.overlay;
        overlay.classList.add('overlay-slide-out');
        
        setTimeout(() => {
            overlay.classList.remove('active', 'overlay-slide-in', 'overlay-slide-out');
        }, 300);

        this.updateCoordinationIndicator();
        console.log(`✅ Overlay closed: ${id}`);
    }

    minimizeOverlay(id) {
        const overlayData = this.activeOverlays.get(id);
        if (!overlayData) return;

        const overlay = overlayData.overlay;
        overlay.classList.toggle('minimized');
        console.log(`✅ Overlay minimized: ${id}`);
    }

    handleOverlayRequest(detail) {
        const { type, id, content, action } = detail;
        
        switch (action) {
            case 'open':
                this.openOverlay(id, content);
                break;
            case 'close':
                this.closeOverlay(id);
                break;
            case 'minimize':
                this.minimizeOverlay(id);
                break;
        }
    }

    repositionOverlays() {
        // Reposition all active overlays based on new screen size
        this.activeOverlays.forEach((data, id) => {
            const overlay = data.overlay;
            // Ensure overlays stay within bounds
            this.ensureOverlayInBounds(overlay);
        });
    }

    ensureOverlayInBounds(overlay) {
        const rect = overlay.getBoundingClientRect();
        const viewport = { width: window.innerWidth, height: window.innerHeight };
        
        if (rect.right > viewport.width) {
            overlay.style.right = '20px';
            overlay.style.left = 'auto';
        }
        
        if (rect.bottom > viewport.height) {
            overlay.style.bottom = '20px';
            overlay.style.top = 'auto';
        }
    }

    updateCoordinationIndicator() {
        const activeCount = Array.from(this.activeOverlays.values())
            .filter(data => data.overlay.classList.contains('active')).length;
        
        let indicator = document.querySelector('.coordination-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'coordination-indicator';
            document.body.appendChild(indicator);
        }
        
        indicator.textContent = `Overlays: ${activeCount} active`;
    }

    // Public API for external systems
    getActiveOverlays() {
        return Array.from(this.activeOverlays.keys())
            .filter(id => this.activeOverlays.get(id).overlay.classList.contains('active'));
    }

    getOverlayContent(id) {
        const overlayData = this.activeOverlays.get(id);
        return overlayData ? overlayData.overlay.querySelector('.overlay-content').innerHTML : null;
    }

    setOverlayContent(id, content) {
        const overlayData = this.activeOverlays.get(id);
        if (overlayData) {
            const contentElement = overlayData.overlay.querySelector('.overlay-content');
            if (contentElement) {
                contentElement.innerHTML = content;
            }
        }
    }

    // Demo functionality
    demo() {
        // Demo content overlays
        this.setOverlayContent('lesson-content', `
            <div style="padding: 16px;">
                <h4>📚 Today's Lesson</h4>
                <p>Welcome to your personalized learning experience! Today we'll explore fascinating topics together.</p>
                <button onclick="uShapeSystem.openOverlay('lesson-content')" style="background: #007AFF; color: white; border: none; padding: 8px 16px; border-radius: 8px; margin-top: 8px;">Start Lesson</button>
            </div>
        `);
        
        // Demo variant overlays
        this.setOverlayContent('tone-variants', `
            <div style="padding: 16px;">
                <h4>🎭 Choose Your Tone</h4>
                <button onclick="setTone('neutral')" style="background: #007AFF; color: white; border: none; padding: 8px 16px; border-radius: 8px; margin: 4px;">Neutral</button>
                <button onclick="setTone('fun')" style="background: #34C759; color: white; border: none; padding: 8px 16px; border-radius: 8px; margin: 4px;">Fun</button>
                <button onclick="setTone('grandmother')" style="background: #FF9500; color: white; border: none; padding: 8px 16px; border-radius: 8px; margin: 4px;">Grandmother</button>
            </div>
        `);
        
        // Demo control overlays
        this.setOverlayContent('speaker-controls', `
            <div style="padding: 16px;">
                <h4>🔊 Audio Controls</h4>
                <button onclick="togglePlay()" style="background: #007AFF; color: white; border: none; padding: 8px 16px; border-radius: 8px; margin: 4px;">Play/Pause</button>
                <button onclick="adjustVolume(0.1)" style="background: #34C759; color: white; border: none; padding: 8px 16px; border-radius: 8px; margin: 4px;">Volume +</button>
                <button onclick="adjustVolume(-0.1)" style="background: #FF3B30; color: white; border: none; padding: 8px 16px; border-radius: 8px; margin: 4px;">Volume -</button>
            </div>
        `);
        
        // Open some demo overlays
        setTimeout(() => {
            this.openOverlay('lesson-content');
        }, 500);
        
        setTimeout(() => {
            this.openOverlay('tone-variants');
        }, 1000);
        
        setTimeout(() => {
            this.openOverlay('speaker-controls');
        }, 1500);
    }
}

// Global functions for integration
function setTone(tone) {
    console.log(`🎭 Tone set to: ${tone}`);
    // Integrate with existing tone system
    if (window.variantSystem) {
        window.variantSystem.setTone(tone);
    }
}

function adjustVolume(delta) {
    console.log(`🔊 Volume adjusted by: ${delta}`);
    // Integrate with existing audio system
    if (window.audioIntegration) {
        window.audioIntegration.adjustVolume(delta);
    }
}

function togglePlay() {
    console.log(`▶️ Play/Pause toggled`);
    // Integrate with existing audio system
    if (window.audioIntegration) {
        window.audioIntegration.togglePlay();
    }
}

// Initialize when DOM is ready
let uShapeSystem;

document.addEventListener('DOMContentLoaded', function() {
    uShapeSystem = new UShapeOverlaySystem();
    
    // Demo the system after a short delay
    setTimeout(() => {
        uShapeSystem.demo();
    }, 1000);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UShapeOverlaySystem;
} 