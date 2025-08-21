/**
 * Face-Safe Positioning Algorithm
 * Ensures UI elements never cover Ken/Kelly avatar faces
 * Calculates safe zones based on avatar expression and mood
 * Provides dynamic positioning for all overlays
 */

class FaceSafePositioning {
  constructor() {
    this.avatarExpressions = {
      // Kelly expressions
      kelly_neutral: { faceZone: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 } },
      kelly_happy: { faceZone: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 } },
      kelly_excited: { faceZone: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 } },
      kelly_thoughtful: { faceZone: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 } },
      kelly_celebratory: { faceZone: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 } },
      
      // Ken expressions
      ken_neutral: { faceZone: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 } },
      ken_happy: { faceZone: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 } },
      ken_excited: { faceZone: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 } },
      ken_thoughtful: { faceZone: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 } },
      ken_celebratory: { faceZone: { x: 0.3, y: 0.2, width: 0.4, height: 0.3 } }
    };

    this.safeZones = {
      topLeft: { x: 0, y: 0, width: 0.25, height: 0.25 },
      topRight: { x: 0.75, y: 0, width: 0.25, height: 0.25 },
      bottomLeft: { x: 0, y: 0.75, width: 0.25, height: 0.25 },
      bottomRight: { x: 0.75, y: 0.75, width: 0.25, height: 0.25 },
      centerTop: { x: 0.25, y: 0, width: 0.5, height: 0.2 },
      centerBottom: { x: 0.25, y: 0.8, width: 0.5, height: 0.2 }
    };
  }

  /**
   * Calculate safe zones based on avatar expression and screen size
   * @param {string} avatarExpression - Current avatar expression (e.g., 'kelly_happy')
   * @param {Object} screenSize - Screen dimensions { width, height }
   * @returns {Object} Safe anchor points for UI elements
   */
  calculateSafeZones(avatarExpression, screenSize) {
    const faceZone = this.getFaceZone(avatarExpression);
    const safeZones = this.calculateAvailableZones(faceZone, screenSize);
    
    return {
      faceZone,
      safeZones,
      recommendedPositions: this.getRecommendedPositions(safeZones, screenSize)
    };
  }

  /**
   * Get face zone for specific avatar expression
   * @param {string} avatarExpression - Avatar expression
   * @returns {Object} Face zone coordinates
   */
  getFaceZone(avatarExpression) {
    const expression = this.avatarExpressions[avatarExpression];
    if (!expression) {
      // Default to neutral if expression not found
      return this.avatarExpressions.kelly_neutral.faceZone;
    }
    return expression.faceZone;
  }

  /**
   * Calculate available zones that don't overlap with face
   * @param {Object} faceZone - Face zone coordinates
   * @param {Object} screenSize - Screen dimensions
   * @returns {Object} Available safe zones
   */
  calculateAvailableZones(faceZone, screenSize) {
    const availableZones = {};

    // Check each predefined safe zone against face zone
    for (const [zoneName, zone] of Object.entries(this.safeZones)) {
      if (!this.zonesOverlap(zone, faceZone)) {
        availableZones[zoneName] = zone;
      }
    }

    // If no predefined zones are available, calculate dynamic zones
    if (Object.keys(availableZones).length === 0) {
      availableZones.dynamic = this.calculateDynamicZones(faceZone, screenSize);
    }

    return availableZones;
  }

  /**
   * Check if two zones overlap
   * @param {Object} zone1 - First zone
   * @param {Object} zone2 - Second zone
   * @returns {boolean} True if zones overlap
   */
  zonesOverlap(zone1, zone2) {
    return !(zone1.x + zone1.width <= zone2.x ||
             zone2.x + zone2.width <= zone1.x ||
             zone1.y + zone1.height <= zone2.y ||
             zone2.y + zone2.height <= zone1.y);
  }

  /**
   * Calculate dynamic zones when predefined zones are unavailable
   * @param {Object} faceZone - Face zone coordinates
   * @param {Object} screenSize - Screen dimensions
   * @returns {Object} Dynamic safe zones
   */
  calculateDynamicZones(faceZone, screenSize) {
    const zones = {};

    // Left side zone
    if (faceZone.x > 0.1) {
      zones.left = {
        x: 0,
        y: 0,
        width: faceZone.x - 0.05,
        height: 1
      };
    }

    // Right side zone
    if (faceZone.x + faceZone.width < 0.9) {
      zones.right = {
        x: faceZone.x + faceZone.width + 0.05,
        y: 0,
        width: 1 - (faceZone.x + faceZone.width + 0.05),
        height: 1
      };
    }

    // Top zone
    if (faceZone.y > 0.1) {
      zones.top = {
        x: 0,
        y: 0,
        width: 1,
        height: faceZone.y - 0.05
      };
    }

    // Bottom zone
    if (faceZone.y + faceZone.height < 0.9) {
      zones.bottom = {
        x: 0,
        y: faceZone.y + faceZone.height + 0.05,
        width: 1,
        height: 1 - (faceZone.y + faceZone.height + 0.05)
      };
    }

    return zones;
  }

  /**
   * Get recommended positions for different UI elements
   * @param {Object} safeZones - Available safe zones
   * @param {Object} screenSize - Screen dimensions
   * @returns {Object} Recommended positions for UI elements
   */
  getRecommendedPositions(safeZones, screenSize) {
    const positions = {};

    // Bottom-right stack (hamburger menu and icons)
    if (safeZones.bottomRight) {
      positions.bottomRightStack = {
        x: safeZones.bottomRight.x + safeZones.bottomRight.width * 0.8,
        y: safeZones.bottomRight.y + safeZones.bottomRight.height * 0.8,
        anchor: 'bottom-right'
      };
    }

    // Audio controls (draggable panel)
    if (safeZones.topRight) {
      positions.audioControls = {
        x: safeZones.topRight.x + safeZones.topRight.width * 0.5,
        y: safeZones.topRight.y + safeZones.topRight.height * 0.5,
        anchor: 'top-right'
      };
    }

    // Lesson content overlay
    if (safeZones.centerTop) {
      positions.lessonContent = {
        x: safeZones.centerTop.x + safeZones.centerTop.width * 0.5,
        y: safeZones.centerTop.y + safeZones.centerTop.height * 0.5,
        anchor: 'center-top'
      };
    }

    // Calendar overlay
    if (safeZones.topLeft) {
      positions.calendar = {
        x: safeZones.topLeft.x + safeZones.topLeft.width * 0.5,
        y: safeZones.topLeft.y + safeZones.topLeft.height * 0.5,
        anchor: 'top-left'
      };
    }

    return positions;
  }

  /**
   * Position UI element in safe zone
   * @param {HTMLElement} element - UI element to position
   * @param {Object} safeZones - Available safe zones
   * @param {string} preferredZone - Preferred zone name
   * @param {Object} screenSize - Screen dimensions
   */
  positionElementInSafeZone(element, safeZones, preferredZone, screenSize) {
    const recommendedPositions = this.getRecommendedPositions(safeZones, screenSize);
    
    let position;
    
    // Try preferred zone first
    if (recommendedPositions[preferredZone]) {
      position = recommendedPositions[preferredZone];
    } else {
      // Fall back to first available position
      const availablePositions = Object.values(recommendedPositions);
      if (availablePositions.length > 0) {
        position = availablePositions[0];
      } else {
        // Emergency fallback to bottom-right
        position = {
          x: screenSize.width * 0.8,
          y: screenSize.height * 0.8,
          anchor: 'bottom-right'
        };
      }
    }

    // Apply position to element
    this.applyPosition(element, position, screenSize);
  }

  /**
   * Apply position to UI element
   * @param {HTMLElement} element - UI element
   * @param {Object} position - Position data
   * @param {Object} screenSize - Screen dimensions
   */
  applyPosition(element, position, screenSize) {
    const { x, y, anchor } = position;
    
    // Convert relative coordinates to absolute pixels
    const absoluteX = x * screenSize.width;
    const absoluteY = y * screenSize.height;

    // Set element position based on anchor
    switch (anchor) {
      case 'bottom-right':
        element.style.right = `${screenSize.width - absoluteX}px`;
        element.style.bottom = `${screenSize.height - absoluteY}px`;
        element.style.left = 'auto';
        element.style.top = 'auto';
        break;
      case 'top-right':
        element.style.right = `${screenSize.width - absoluteX}px`;
        element.style.top = `${absoluteY}px`;
        element.style.left = 'auto';
        element.style.bottom = 'auto';
        break;
      case 'top-left':
        element.style.left = `${absoluteX}px`;
        element.style.top = `${absoluteY}px`;
        element.style.right = 'auto';
        element.style.bottom = 'auto';
        break;
      case 'center-top':
        element.style.left = `${absoluteX}px`;
        element.style.top = `${absoluteY}px`;
        element.style.transform = 'translateX(-50%)';
        break;
      default:
        element.style.left = `${absoluteX}px`;
        element.style.top = `${absoluteY}px`;
    }
  }

  /**
   * Update avatar expression and recalculate safe zones
   * @param {string} newExpression - New avatar expression
   * @param {Object} screenSize - Screen dimensions
   * @returns {Object} Updated safe zones
   */
  updateAvatarExpression(newExpression, screenSize) {
    const safeZones = this.calculateSafeZones(newExpression, screenSize);
    
    // Notify UI components of safe zone changes
    this.notifySafeZoneChange(safeZones);
    
    return safeZones;
  }

  /**
   * Notify UI components of safe zone changes
   * @param {Object} safeZones - Updated safe zones
   */
  notifySafeZoneChange(safeZones) {
    // Dispatch custom event for UI components to listen to
    const event = new CustomEvent('safeZoneChange', {
      detail: { safeZones }
    });
    window.dispatchEvent(event);
  }

  /**
   * Get current screen size
   * @returns {Object} Screen dimensions
   */
  getScreenSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  /**
   * Validate that element is positioned safely
   * @param {HTMLElement} element - UI element to validate
   * @param {Object} faceZone - Current face zone
   * @returns {boolean} True if element is safely positioned
   */
  validateSafePosition(element, faceZone) {
    const elementRect = element.getBoundingClientRect();
    const screenSize = this.getScreenSize();
    
    // Convert face zone to pixel coordinates
    const faceZonePixels = {
      x: faceZone.x * screenSize.width,
      y: faceZone.y * screenSize.height,
      width: faceZone.width * screenSize.width,
      height: faceZone.height * screenSize.height
    };

    // Check if element overlaps with face zone
    return !this.zonesOverlap(
      {
        x: elementRect.left,
        y: elementRect.top,
        width: elementRect.width,
        height: elementRect.height
      },
      faceZonePixels
    );
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FaceSafePositioning;
} else {
  // Browser environment
  window.FaceSafePositioning = FaceSafePositioning;
} 