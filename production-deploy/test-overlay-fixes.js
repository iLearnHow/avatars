/**
 * Test Suite for Overlay Fixes
 * Verifies single overlay rule, face-safe positioning, and CSS enforcement
 */

class OverlayTestSuite {
    constructor() {
        this.testResults = [];
        this.currentTest = 0;
    }

    /**
     * Run all tests
     */
    async runAllTests() {
        console.log('🧪 Starting Overlay Fix Test Suite...');
        
        await this.testSingleOverlayRule();
        await this.testFaceSafePositioning();
        await this.testCSSEnforcement();
        await this.testDOMInitialization();
        
        this.printResults();
    }

    /**
     * Test Case 1: Single Overlay Rule Enforcement
     */
    async testSingleOverlayRule() {
        console.log('\n📋 Test 1: Single Overlay Rule Enforcement');
        
        const results = [];
        
        // Test 1.1: Click ➕ icon - should show only one overlay
        try {
            const newLessonOverlay = document.getElementById('new-lesson-overlay');
            if (newLessonOverlay) {
                // Simulate clicking ➕ icon
                window.openNewLessonCreator();
                await this.wait(100);
                
                const isVisible = newLessonOverlay.style.display !== 'none';
                const otherOverlaysHidden = this.checkOtherOverlaysHidden('new-lesson-overlay');
                
                results.push({
                    test: '1.1 - ➕ icon shows only one overlay',
                    passed: isVisible && otherOverlaysHidden,
                    details: `New lesson overlay visible: ${isVisible}, Others hidden: ${otherOverlaysHidden}`
                });
            }
        } catch (error) {
            results.push({
                test: '1.1 - ➕ icon shows only one overlay',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        // Test 1.2: Click 📅 icon - should close ➕ and show only calendar
        try {
            const calendarOverlay = document.getElementById('calendar-overlay');
            if (calendarOverlay) {
                // Simulate clicking 📅 icon
                window.toggleCalendar();
                await this.wait(100);
                
                const calendarVisible = calendarOverlay.style.display !== 'none';
                const newLessonHidden = document.getElementById('new-lesson-overlay').style.display === 'none';
                const otherOverlaysHidden = this.checkOtherOverlaysHidden('calendar-overlay');
                
                results.push({
                    test: '1.2 - 📅 icon closes ➕ and shows only calendar',
                    passed: calendarVisible && newLessonHidden && otherOverlaysHidden,
                    details: `Calendar visible: ${calendarVisible}, New lesson hidden: ${newLessonHidden}, Others hidden: ${otherOverlaysHidden}`
                });
            }
        } catch (error) {
            results.push({
                test: '1.2 - 📅 icon closes ➕ and shows only calendar',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        // Test 1.3: Click 😊 icon - should close calendar and show only tone
        try {
            const toneOverlay = document.getElementById('tone-overlay');
            if (toneOverlay) {
                // Simulate clicking 😊 icon
                window.toggleTone();
                await this.wait(100);
                
                const toneVisible = toneOverlay.style.display !== 'none';
                const calendarHidden = document.getElementById('calendar-overlay').style.display === 'none';
                const otherOverlaysHidden = this.checkOtherOverlaysHidden('tone-overlay');
                
                results.push({
                    test: '1.3 - 😊 icon closes calendar and shows only tone',
                    passed: toneVisible && calendarHidden && otherOverlaysHidden,
                    details: `Tone visible: ${toneVisible}, Calendar hidden: ${calendarHidden}, Others hidden: ${otherOverlaysHidden}`
                });
            }
        } catch (error) {
            results.push({
                test: '1.3 - 😊 icon closes calendar and shows only tone',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        this.testResults.push({
            testCase: 'Single Overlay Rule Enforcement',
            results: results,
            passed: results.every(r => r.passed)
        });
    }

    /**
     * Test Case 2: Face-Safe Positioning
     */
    async testFaceSafePositioning() {
        console.log('\n🎭 Test 2: Face-Safe Positioning');
        
        const results = [];
        
        // Test 2.1: Verify Kelly's face is always visible
        try {
            const avatarContainer = document.getElementById('avatar-container');
            if (avatarContainer) {
                const hasKellyClass = avatarContainer.classList.contains('kelly-active');
                const isVisible = avatarContainer.style.display !== 'none';
                
                results.push({
                    test: '2.1 - Kelly\'s face always visible',
                    passed: hasKellyClass && isVisible,
                    details: `Kelly class: ${hasKellyClass}, Visible: ${isVisible}`
                });
            }
        } catch (error) {
            results.push({
                test: '2.1 - Kelly\'s face always visible',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        // Test 2.2: Verify overlays don't cover face
        try {
            const overlays = ['new-lesson-overlay', 'calendar-overlay', 'tone-overlay', 'avatar-overlay', 'language-overlay', 'age-overlay'];
            let allInSafeZones = true;
            
            overlays.forEach(overlayId => {
                const overlay = document.getElementById(overlayId);
                if (overlay) {
                    const position = overlay.style.position;
                    const zIndex = parseInt(overlay.style.zIndex) || 0;
                    const isInSafeZone = position === 'fixed' && zIndex >= 1000;
                    allInSafeZones = allInSafeZones && isInSafeZone;
                }
            });
            
            results.push({
                test: '2.2 - All overlays in safe zones',
                passed: allInSafeZones,
                details: `All overlays positioned safely: ${allInSafeZones}`
            });
        } catch (error) {
            results.push({
                test: '2.2 - All overlays in safe zones',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        // Test 2.3: Verify lesson info doesn't cover face
        try {
            const lessonInfo = document.querySelector('.lesson-info');
            if (lessonInfo) {
                const left = parseInt(lessonInfo.style.left) || 0;
                const top = parseInt(lessonInfo.style.top) || 0;
                const isInSafeZone = left <= 100 && top <= 100;
                
                results.push({
                    test: '2.3 - Lesson info doesn\'t cover face',
                    passed: isInSafeZone,
                    details: `Lesson info position: left=${left}, top=${top}, Safe: ${isInSafeZone}`
                });
            }
        } catch (error) {
            results.push({
                test: '2.3 - Lesson info doesn\'t cover face',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        this.testResults.push({
            testCase: 'Face-Safe Positioning',
            results: results,
            passed: results.every(r => r.passed)
        });
    }

    /**
     * Test Case 3: CSS Enforcement
     */
    async testCSSEnforcement() {
        console.log('\n🎨 Test 3: CSS Enforcement');
        
        const results = [];
        
        // Test 3.1: Verify all overlays start hidden
        try {
            const overlays = ['new-lesson-overlay', 'calendar-overlay', 'tone-overlay', 'avatar-overlay', 'language-overlay', 'age-overlay'];
            let allHidden = true;
            
            overlays.forEach(overlayId => {
                const overlay = document.getElementById(overlayId);
                if (overlay) {
                    const isHidden = overlay.style.display === 'none' || overlay.classList.contains('overlay-hidden');
                    allHidden = allHidden && isHidden;
                }
            });
            
            results.push({
                test: '3.1 - All overlays start hidden',
                passed: allHidden,
                details: `All overlays hidden: ${allHidden}`
            });
        } catch (error) {
            results.push({
                test: '3.1 - All overlays start hidden',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        // Test 3.2: Verify CSS classes applied
        try {
            const overlays = ['new-lesson-overlay', 'calendar-overlay', 'tone-overlay', 'avatar-overlay', 'language-overlay', 'age-overlay'];
            let allClassesApplied = true;
            
            overlays.forEach(overlayId => {
                const overlay = document.getElementById(overlayId);
                if (overlay) {
                    const hasOverlayClass = overlay.classList.contains('new-lesson-overlay') || 
                                          overlay.classList.contains('calendar-overlay') ||
                                          overlay.classList.contains('tone-overlay') ||
                                          overlay.classList.contains('avatar-overlay') ||
                                          overlay.classList.contains('language-overlay') ||
                                          overlay.classList.contains('age-overlay');
                    allClassesApplied = allClassesApplied && hasOverlayClass;
                }
            });
            
            results.push({
                test: '3.2 - CSS classes properly applied',
                passed: allClassesApplied,
                details: `All CSS classes applied: ${allClassesApplied}`
            });
        } catch (error) {
            results.push({
                test: '3.2 - CSS classes properly applied',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        this.testResults.push({
            testCase: 'CSS Enforcement',
            results: results,
            passed: results.every(r => r.passed)
        });
    }

    /**
     * Test Case 4: DOM Ready Initialization
     */
    async testDOMInitialization() {
        console.log('\n🚀 Test 4: DOM Ready Initialization');
        
        const results = [];
        
        // Test 4.1: Verify face-safe system loads
        try {
            const faceSafeSystem = window.faceSafeLayout;
            const isLoaded = faceSafeSystem && typeof faceSafeSystem.initializeFaceSafeSystem === 'function';
            
            results.push({
                test: '4.1 - Face-safe system loads',
                passed: isLoaded,
                details: `Face-safe system loaded: ${isLoaded}`
            });
        } catch (error) {
            results.push({
                test: '4.1 - Face-safe system loads',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        // Test 4.2: Verify avatar system initialized
        try {
            const avatarContainer = document.getElementById('avatar-container');
            const isInitialized = avatarContainer && avatarContainer.classList.contains('kelly-active');
            
            results.push({
                test: '4.2 - Avatar system initialized',
                passed: isInitialized,
                details: `Avatar system initialized: ${isInitialized}`
            });
        } catch (error) {
            results.push({
                test: '4.2 - Avatar system initialized',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        // Test 4.3: Verify audio system initialized
        try {
            const audioControls = document.querySelector('.audio-controls');
            const isInitialized = audioControls && audioControls.children.length > 0;
            
            results.push({
                test: '4.3 - Audio system initialized',
                passed: isInitialized,
                details: `Audio system initialized: ${isInitialized}`
            });
        } catch (error) {
            results.push({
                test: '4.3 - Audio system initialized',
                passed: false,
                details: `Error: ${error.message}`
            });
        }

        this.testResults.push({
            testCase: 'DOM Ready Initialization',
            results: results,
            passed: results.every(r => r.passed)
        });
    }

    /**
     * Check if other overlays are hidden
     */
    checkOtherOverlaysHidden(excludeId) {
        const overlays = ['new-lesson-overlay', 'calendar-overlay', 'tone-overlay', 'avatar-overlay', 'language-overlay', 'age-overlay'];
        return overlays.filter(id => id !== excludeId).every(id => {
            const overlay = document.getElementById(id);
            return overlay && (overlay.style.display === 'none' || overlay.classList.contains('overlay-hidden'));
        });
    }

    /**
     * Wait for specified milliseconds
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Print test results
     */
    printResults() {
        console.log('\n📊 TEST RESULTS SUMMARY');
        console.log('========================');
        
        let totalTests = 0;
        let passedTests = 0;
        
        this.testResults.forEach(testCase => {
            console.log(`\n${testCase.testCase}:`);
            testCase.results.forEach(result => {
                const status = result.passed ? '✅ PASS' : '❌ FAIL';
                console.log(`  ${status} - ${result.test}`);
                if (!result.passed) {
                    console.log(`    Details: ${result.details}`);
                }
                totalTests++;
                if (result.passed) passedTests++;
            });
            console.log(`  ${testCase.passed ? '✅' : '❌'} Overall: ${testCase.passed ? 'PASSED' : 'FAILED'}`);
        });
        
        console.log(`\n📈 FINAL RESULTS: ${passedTests}/${totalTests} tests passed`);
        
        if (passedTests === totalTests) {
            console.log('🎉 ALL TESTS PASSED! System ready for deployment.');
        } else {
            console.log('⚠️ Some tests failed. Please review and fix issues.');
        }
    }
}

// Initialize and run tests when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const testSuite = new OverlayTestSuite();
        testSuite.runAllTests();
    }, 2000); // Wait for system to initialize
});

// Export for manual testing
window.OverlayTestSuite = OverlayTestSuite; 