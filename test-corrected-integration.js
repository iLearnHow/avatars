/**
 * Test Corrected Variant System Integration
 * Verifies that the corrected variant generator works with index.html
 */

const { CorrectedVariantGeneratorV2 } = require('./corrected-variant-generator-v2.js');
const { getLessonDataForDay } = require('./complete-curriculum.js');

class CorrectedIntegrationTest {
    constructor() {
        this.generator = new CorrectedVariantGeneratorV2();
        this.testResults = [];
    }

    async runAllTests() {
        console.log('🧪 Testing Corrected Variant System Integration');
        console.log('=' .repeat(60));
        
        this.testGeneratorInitialization();
        this.testVariantGeneration();
        this.testFormatLogic();
        this.testFeedbackSystem();
        this.testContentStructure();
        this.generateIntegrationReport();
    }

    testGeneratorInitialization() {
        console.log('\n📋 Test 1: Generator Initialization');
        try {
            const generator = new CorrectedVariantGeneratorV2();
            const lessonData = generator.lessonTopic;
            
            if (generator && lessonData) {
                console.log('✅ Generator initialized successfully');
                console.log(`📚 Lesson Topic: ${lessonData.title}`);
                this.testResults.push({ test: 'Generator Initialization', status: 'PASS' });
            } else {
                throw new Error('Generator not properly initialized');
            }
        } catch (error) {
            console.error('❌ Generator initialization failed:', error.message);
            this.testResults.push({ test: 'Generator Initialization', status: 'FAIL', error: error.message });
        }
    }

    testVariantGeneration() {
        console.log('\n📋 Test 2: Variant Generation');
        try {
            const variants3x3x3x3 = this.generator.generate3x3x3x3Variants();
            const variants3x2x2x2 = this.generator.generate3x2x2x2Variants();
            
            if (variants3x3x3x3.length === 81 && variants3x2x2x2.length === 24) {
                console.log('✅ Variant generation successful');
                console.log(`📊 3x3x3x3 variants: ${variants3x3x3x3.length}`);
                console.log(`📊 3x2x2x2 variants: ${variants3x2x2x2.length}`);
                this.testResults.push({ test: 'Variant Generation', status: 'PASS' });
            } else {
                throw new Error(`Expected 81 and 24 variants, got ${variants3x3x3x3.length} and ${variants3x2x2x2.length}`);
            }
        } catch (error) {
            console.error('❌ Variant generation failed:', error.message);
            this.testResults.push({ test: 'Variant Generation', status: 'FAIL', error: error.message });
        }
    }

    testFormatLogic() {
        console.log('\n📋 Test 3: Format Logic');
        try {
            const sampleVariant = this.generator.create3x3x3x3Variant(
                'question_1', 'choice_A', 'correct', 'wisdom', 'grandmother'
            );
            
            if (sampleVariant.format === '3x3x3x3' && 
                sampleVariant.feedbackPath === 'correct' && 
                sampleVariant.fortuneElement === 'wisdom') {
                console.log('✅ Format logic correct');
                console.log(`📋 Format: ${sampleVariant.format}`);
                console.log(`💬 Feedback Path: ${sampleVariant.feedbackPath}`);
                console.log(`🔮 Fortune Element: ${sampleVariant.fortuneElement}`);
                this.testResults.push({ test: 'Format Logic', status: 'PASS' });
            } else {
                throw new Error('Format logic incorrect');
            }
        } catch (error) {
            console.error('❌ Format logic failed:', error.message);
            this.testResults.push({ test: 'Format Logic', status: 'FAIL', error: error.message });
        }
    }

    testFeedbackSystem() {
        console.log('\n📋 Test 4: Feedback System');
        try {
            const feedbackSystem = this.generator.feedbackSystem;
            
            if (feedbackSystem.correct && 
                feedbackSystem.incorrect_A && 
                feedbackSystem.incorrect_B && 
                feedbackSystem.incorrect) {
                console.log('✅ Feedback system complete');
                console.log(`💬 Correct feedback: ${feedbackSystem.correct.pattern ? 'Available' : 'Missing'}`);
                console.log(`💬 Incorrect A feedback: ${feedbackSystem.incorrect_A.pattern ? 'Available' : 'Missing'}`);
                console.log(`💬 Incorrect B feedback: ${feedbackSystem.incorrect_B.pattern ? 'Available' : 'Missing'}`);
                console.log(`💬 Generic incorrect feedback: ${feedbackSystem.incorrect.pattern ? 'Available' : 'Missing'}`);
                this.testResults.push({ test: 'Feedback System', status: 'PASS' });
            } else {
                throw new Error('Feedback system incomplete');
            }
        } catch (error) {
            console.error('❌ Feedback system failed:', error.message);
            this.testResults.push({ test: 'Feedback System', status: 'FAIL', error: error.message });
        }
    }

    testContentStructure() {
        console.log('\n📋 Test 5: Content Structure');
        try {
            const sampleVariant = this.generator.create3x3x3x3Variant(
                'question_1', 'choice_A', 'correct', 'wisdom', 'grandmother'
            );
            
            const content = sampleVariant.content;
            
            if (content.opening && 
                content.question && 
                content.answerChoices && 
                content.feedback && 
                content.fortune) {
                console.log('✅ Content structure complete');
                console.log(`📝 Opening: ${content.opening.substring(0, 50)}...`);
                console.log(`❓ Question: ${content.question.question.substring(0, 50)}...`);
                console.log(`💬 Feedback: ${content.feedback.message.substring(0, 50)}...`);
                console.log(`🔮 Fortune: ${content.fortune.message.substring(0, 50)}...`);
                this.testResults.push({ test: 'Content Structure', status: 'PASS' });
            } else {
                throw new Error('Content structure incomplete');
            }
        } catch (error) {
            console.error('❌ Content structure failed:', error.message);
            this.testResults.push({ test: 'Content Structure', status: 'FAIL', error: error.message });
        }
    }

    generateIntegrationReport() {
        console.log('\n📊 Integration Test Report');
        console.log('=' .repeat(40));
        
        const passed = this.testResults.filter(r => r.status === 'PASS').length;
        const failed = this.testResults.filter(r => r.status === 'FAIL').length;
        const total = this.testResults.length;
        
        console.log(`✅ Passed: ${passed}/${total}`);
        console.log(`❌ Failed: ${failed}/${total}`);
        console.log(`📈 Success Rate: ${((passed/total)*100).toFixed(1)}%`);
        
        if (failed > 0) {
            console.log('\n❌ Failed Tests:');
            this.testResults.filter(r => r.status === 'FAIL').forEach(test => {
                console.log(`  • ${test.test}: ${test.error}`);
            });
        }
        
        if (passed === total) {
            console.log('\n🎉 All tests passed! Corrected variant system is ready for integration.');
        } else {
            console.log('\n⚠️ Some tests failed. Please review the errors above.');
        }
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    const test = new CorrectedIntegrationTest();
    test.runAllTests();
}

module.exports = { CorrectedIntegrationTest }; 