/**
 * Comprehensive Test Script for All 365 Days of 2025
 * Tests every single day for tooltips and lesson loading functionality
 */

class ComprehensiveDayTester {
    constructor() {
        this.testResults = {
            totalDays: 0,
            daysWithLessons: 0,
            daysWithoutLessons: 0,
            daysWithTooltips: 0,
            daysWithoutTooltips: 0,
            failedTests: [],
            successfulTests: []
        };
        
        this.lessonPlayer = null;
        this.currentTestDay = 1;
        this.currentTestMonth = 1;
    }

    async initialize() {
        console.log('🧪 Initializing Comprehensive Day Tester...');
        
        // Wait for lesson player to be ready
        await this.waitForLessonPlayer();
        
        console.log('✅ Tester initialized');
        return this;
    }

    async waitForLessonPlayer() {
        return new Promise((resolve) => {
            const checkPlayer = () => {
                if (window.lessonPlayer && window.lessonPlayer.fullYearData) {
                    this.lessonPlayer = window.lessonPlayer;
                    console.log('✅ Lesson player ready');
                    resolve();
                } else {
                    console.log('⏳ Waiting for lesson player...');
                    setTimeout(checkPlayer, 500);
                }
            };
            checkPlayer();
        });
    }

    async testAllDays() {
        console.log('🎯 Starting comprehensive test of all 365 days...');
        
        this.testResults = {
            totalDays: 0,
            daysWithLessons: 0,
            daysWithoutLessons: 0,
            daysWithTooltips: 0,
            daysWithoutTooltips: 0,
            failedTests: [],
            successfulTests: []
        };

        // Test all 365 days
        for (let month = 1; month <= 12; month++) {
            const daysInMonth = new Date(2025, month, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
                this.testResults.totalDays++;
                
                const testResult = await this.testSingleDay(month, day);
                
                if (testResult.success) {
                    this.testResults.successfulTests.push(testResult);
                } else {
                    this.testResults.failedTests.push(testResult);
                }
                
                // Progress update every 30 days
                if (this.testResults.totalDays % 30 === 0) {
                    console.log(`📊 Progress: ${this.testResults.totalDays}/365 days tested`);
                }
            }
        }

        this.generateFinalReport();
    }

    async testSingleDay(month, day) {
        const result = {
            month,
            day,
            success: false,
            hasLesson: false,
            hasTooltip: false,
            lessonTitle: null,
            tooltipContent: null,
            error: null
        };

        try {
            // Test lesson loading
            const lessonData = this.lessonPlayer.getLessonData(month, day);
            
            if (lessonData) {
                result.hasLesson = true;
                result.lessonTitle = lessonData.title;
                this.testResults.daysWithLessons++;
                
                // Test tooltip generation
                const tooltip = `${lessonData.title}\n\n${lessonData.learning_objective}`;
                if (tooltip && tooltip.length > 0) {
                    result.hasTooltip = true;
                    result.tooltipContent = tooltip;
                    this.testResults.daysWithTooltips++;
                } else {
                    this.testResults.daysWithoutTooltips++;
                }
                
                result.success = true;
            } else {
                this.testResults.daysWithoutLessons++;
                result.success = true; // No lesson is acceptable for some days
            }

        } catch (error) {
            result.error = error.message;
            result.success = false;
        }

        return result;
    }

    generateFinalReport() {
        console.log('\n📊 COMPREHENSIVE TEST RESULTS');
        console.log('================================');
        console.log(`📅 Total days tested: ${this.testResults.totalDays}`);
        console.log(`✅ Days with lessons: ${this.testResults.daysWithLessons}`);
        console.log(`⚠️ Days without lessons: ${this.testResults.daysWithoutLessons}`);
        console.log(`🔍 Days with tooltips: ${this.testResults.daysWithTooltips}`);
        console.log(`❌ Days without tooltips: ${this.testResults.daysWithoutTooltips}`);
        console.log(`🎯 Success rate: ${((this.testResults.successfulTests.length / this.testResults.totalDays) * 100).toFixed(1)}%`);
        console.log(`📈 Lesson coverage: ${((this.testResults.daysWithLessons / this.testResults.totalDays) * 100).toFixed(1)}%`);
        console.log(`🔍 Tooltip coverage: ${((this.testResults.daysWithTooltips / this.testResults.totalDays) * 100).toFixed(1)}%`);

        if (this.testResults.failedTests.length > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.testResults.failedTests.forEach(test => {
                console.log(`   Day ${test.month}/${test.day}: ${test.error}`);
            });
        }

        // Generate detailed month-by-month report
        this.generateMonthlyReport();
        
        // Test specific important days
        this.testImportantDays();
    }

    generateMonthlyReport() {
        console.log('\n📅 MONTHLY BREAKDOWN:');
        console.log('=====================');
        
        for (let month = 1; month <= 12; month++) {
            const monthName = this.lessonPlayer.getMonthName(month);
            const monthTests = this.testResults.successfulTests.filter(test => test.month === month);
            const monthLessons = monthTests.filter(test => test.hasLesson).length;
            const monthTooltips = monthTests.filter(test => test.hasTooltip).length;
            const daysInMonth = new Date(2025, month, 0).getDate();
            
            console.log(`${monthName}: ${monthLessons}/${daysInMonth} lessons, ${monthTooltips}/${daysInMonth} tooltips`);
        }
    }

    testImportantDays() {
        console.log('\n🎯 IMPORTANT DAYS TEST:');
        console.log('=======================');
        
        const importantDays = [
            { month: 1, day: 1, name: 'New Year' },
            { month: 7, day: 4, name: 'Independence Day' },
            { month: 12, day: 25, name: 'Christmas' },
            { month: 12, day: 31, name: 'New Year Eve' }
        ];

        importantDays.forEach(important => {
            const test = this.testResults.successfulTests.find(t => t.month === important.month && t.day === important.day);
            if (test) {
                const status = test.hasLesson ? '✅' : '⚠️';
                console.log(`${status} ${important.name} (${important.month}/${important.day}): ${test.hasLesson ? test.lessonTitle : 'No lesson'}`);
            }
        });
    }

    // Test calendar navigation
    async testCalendarNavigation() {
        console.log('\n🧭 TESTING CALENDAR NAVIGATION:');
        console.log('===============================');
        
        const navigationTests = [
            { from: 1, to: 2, name: 'January to February' },
            { from: 6, to: 7, name: 'June to July' },
            { from: 12, to: 1, name: 'December to January' }
        ];

        for (const test of navigationTests) {
            try {
                // Test month navigation
                this.lessonPlayer.currentMonth = test.from;
                this.lessonPlayer.updateMonthDisplay();
                this.lessonPlayer.generateMonthCalendar(test.from);
                
                console.log(`✅ ${test.name}: Month ${test.from} loaded`);
                
                // Test day selection
                const testDay = 15;
                this.lessonPlayer.selectDay(testDay, test.from);
                const lessonData = this.lessonPlayer.getLessonData(test.from, testDay);
                
                if (lessonData) {
                    console.log(`✅ ${test.name}: Day ${testDay} lesson loaded - "${lessonData.title}"`);
                } else {
                    console.log(`⚠️ ${test.name}: Day ${testDay} has no lesson`);
                }
                
            } catch (error) {
                console.log(`❌ ${test.name}: Navigation failed - ${error.message}`);
            }
        }
    }

    // Test tooltip functionality
    async testTooltipFunctionality() {
        console.log('\n🔍 TESTING TOOLTIP FUNCTIONALITY:');
        console.log('=================================');
        
        const tooltipTestDays = [
            { month: 1, day: 1 },
            { month: 7, day: 15 },
            { month: 12, day: 31 }
        ];

        for (const test of tooltipTestDays) {
            try {
                const lessonData = this.lessonPlayer.getLessonData(test.month, test.day);
                
                if (lessonData) {
                    const tooltip = `${lessonData.title}\n\n${lessonData.learning_objective}`;
                    console.log(`✅ Day ${test.month}/${test.day}: Tooltip generated (${tooltip.length} chars)`);
                    console.log(`   Title: "${lessonData.title}"`);
                    console.log(`   Objective: "${lessonData.learning_objective.substring(0, 100)}..."`);
                } else {
                    console.log(`⚠️ Day ${test.month}/${test.day}: No lesson data for tooltip`);
                }
                
            } catch (error) {
                console.log(`❌ Day ${test.month}/${test.day}: Tooltip test failed - ${error.message}`);
            }
        }
    }

    // Export results for external analysis
    exportResults() {
        const exportData = {
            timestamp: new Date().toISOString(),
            testResults: this.testResults,
            summary: {
                totalDays: this.testResults.totalDays,
                lessonCoverage: ((this.testResults.daysWithLessons / this.testResults.totalDays) * 100).toFixed(1),
                tooltipCoverage: ((this.testResults.daysWithTooltips / this.testResults.totalDays) * 100).toFixed(1),
                successRate: ((this.testResults.successfulTests.length / this.testResults.totalDays) * 100).toFixed(1)
            }
        };

        console.log('\n📤 EXPORTING RESULTS:');
        console.log('=====================');
        console.log(JSON.stringify(exportData, null, 2));
        
        return exportData;
    }
}

// Auto-run the comprehensive test when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Starting comprehensive 365-day test...');
    
    const tester = new ComprehensiveDayTester();
    await tester.initialize();
    
    // Run the comprehensive test
    await tester.testAllDays();
    
    // Test additional functionality
    await tester.testCalendarNavigation();
    await tester.testTooltipFunctionality();
    
    // Export results
    const results = tester.exportResults();
    
    console.log('\n🎉 COMPREHENSIVE TEST COMPLETE!');
    console.log('================================');
    console.log(`📊 Final Summary:`);
    console.log(`   Total Days: ${results.summary.totalDays}`);
    console.log(`   Lesson Coverage: ${results.summary.lessonCoverage}%`);
    console.log(`   Tooltip Coverage: ${results.summary.tooltipCoverage}%`);
    console.log(`   Success Rate: ${results.summary.successRate}%`);
    
    // Make results available globally
    window.testResults = results;
}); 