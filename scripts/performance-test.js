/**
 * Performance Testing Script
 * Validates synthesis performance and system benchmarks
 * @version 1.0.0
 * @author iLearnHow
 */

const fs = require('fs');
const path = require('path');

class PerformanceTester {
    constructor() {
        this.results = [];
        this.thresholds = {
            synthesis: 200, // ms
            initialLoad: 3000, // ms
            cacheHit: 10, // ms
            parameterChange: 50 // ms
        };
        this.testCases = [];
    }

    /**
     * Run performance tests
     */
    async runTests() {
        try {
            console.log('🚀 Starting performance tests...');
            
            // Generate test cases
            this.generateTestCases();
            
            // Run synthesis performance tests
            await this.testSynthesisPerformance();
            
            // Run load testing
            await this.testLoadPerformance();
            
            // Run cache performance tests
            await this.testCachePerformance();
            
            // Generate performance report
            await this.generateReport();
            
            console.log('✅ Performance tests completed successfully!');
            
        } catch (error) {
            console.error('❌ Performance tests failed:', error.message);
            process.exit(1);
        }
    }

    /**
     * Generate test cases for all 366 lessons
     */
    generateTestCases() {
        console.log('📋 Generating test cases...');
        
        const ages = [8, 12, 18, 25, 35, 45, 55, 65];
        const tones = ['grandmother', 'fun', 'neutral'];
        
        // Generate comprehensive test cases
        for (let day = 1; day <= 366; day++) {
            for (const age of ages) {
                for (const tone of tones) {
                    this.testCases.push({
                        day,
                        age,
                        tone,
                        type: 'synthesis'
                    });
                }
            }
        }
        
        // Add load testing cases
        for (let i = 0; i < 100; i++) {
            this.testCases.push({
                day: Math.floor(Math.random() * 366) + 1,
                age: ages[Math.floor(Math.random() * ages.length)],
                tone: tones[Math.floor(Math.random() * tones.length)],
                type: 'load'
            });
        }
        
        console.log(`  Generated ${this.testCases.length} test cases`);
    }

    /**
     * Test synthesis performance
     */
    async testSynthesisPerformance() {
        console.log('⚡ Testing synthesis performance...');
        
        const synthesisTests = this.testCases.filter(tc => tc.type === 'synthesis');
        const sampleSize = Math.min(100, synthesisTests.length); // Test sample for speed
        const sampleTests = this.getRandomSample(synthesisTests, sampleSize);
        
        let passed = 0;
        let failed = 0;
        let totalTime = 0;
        
        for (const testCase of sampleTests) {
            const startTime = performance.now();
            
            try {
                // Simulate synthesis (in real implementation, this would call the actual engine)
                await this.simulateSynthesis(testCase);
                
                const duration = performance.now() - startTime;
                totalTime += duration;
                
                const result = {
                    ...testCase,
                    duration,
                    passed: duration <= this.thresholds.synthesis,
                    timestamp: new Date().toISOString()
                };
                
                this.results.push(result);
                
                if (result.passed) {
                    passed++;
                } else {
                    failed++;
                }
                
                // Progress indicator
                if ((passed + failed) % 10 === 0) {
                    process.stdout.write('.');
                }
                
            } catch (error) {
                const result = {
                    ...testCase,
                    duration: null,
                    passed: false,
                    error: error.message,
                    timestamp: new Date().toISOString()
                };
                
                this.results.push(result);
                failed++;
            }
        }
        
        console.log('\n📊 Synthesis Performance Results:');
        console.log(`  Tests run: ${passed + failed}`);
        console.log(`  Passed: ${passed}`);
        console.log(`  Failed: ${failed}`);
        console.log(`  Success rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
        console.log(`  Average time: ${(totalTime / (passed + failed)).toFixed(2)}ms`);
        console.log(`  Threshold: ${this.thresholds.synthesis}ms`);
    }

    /**
     * Test load performance
     */
    async testLoadPerformance() {
        console.log('🔄 Testing load performance...');
        
        const loadTests = this.testCases.filter(tc => tc.type === 'load');
        const concurrentTests = 10;
        
        for (let i = 0; i < loadTests.length; i += concurrentTests) {
            const batch = loadTests.slice(i, i + concurrentTests);
            const startTime = performance.now();
            
            const promises = batch.map(testCase => this.simulateSynthesis(testCase));
            await Promise.all(promises);
            
            const duration = performance.now() - startTime;
            const avgTime = duration / batch.length;
            
            const result = {
                type: 'load',
                batchSize: batch.length,
                totalTime: duration,
                averageTime: avgTime,
                passed: avgTime <= this.thresholds.synthesis,
                timestamp: new Date().toISOString()
            };
            
            this.results.push(result);
            
            if (i % 50 === 0) {
                console.log(`  Batch ${Math.floor(i / concurrentTests) + 1}: ${avgTime.toFixed(2)}ms avg`);
            }
        }
    }

    /**
     * Test cache performance
     */
    async testCachePerformance() {
        console.log('💾 Testing cache performance...');
        
        const cacheTests = [];
        const testParams = { day: 1, age: 25, tone: 'neutral' };
        
        // First call (cache miss)
        const firstStart = performance.now();
        await this.simulateSynthesis(testParams);
        const firstDuration = performance.now() - firstStart;
        
        // Second call (cache hit)
        const secondStart = performance.now();
        await this.simulateSynthesis(testParams);
        const secondDuration = performance.now() - secondStart;
        
        const result = {
            type: 'cache',
            cacheMiss: firstDuration,
            cacheHit: secondDuration,
            improvement: firstDuration - secondDuration,
            passed: secondDuration <= this.thresholds.cacheHit,
            timestamp: new Date().toISOString()
        };
        
        this.results.push(result);
        
        console.log(`  Cache miss: ${firstDuration.toFixed(2)}ms`);
        console.log(`  Cache hit: ${secondDuration.toFixed(2)}ms`);
        console.log(`  Improvement: ${result.improvement.toFixed(2)}ms`);
        console.log(`  Threshold: ${this.thresholds.cacheHit}ms`);
    }

    /**
     * Simulate synthesis (placeholder for actual engine)
     */
    async simulateSynthesis(params) {
        // Simulate processing time based on parameters
        const baseTime = 50; // Base synthesis time
        const ageFactor = Math.abs(params.age - 25) * 0.5; // Age complexity factor
        const toneFactor = params.tone === 'neutral' ? 0 : 10; // Tone complexity factor
        const dayFactor = (params.day % 30) * 0.2; // Day complexity factor
        
        const totalTime = baseTime + ageFactor + toneFactor + dayFactor;
        
        // Add some randomness to simulate real-world conditions
        const randomFactor = Math.random() * 20 - 10; // ±10ms randomness
        
        await new Promise(resolve => setTimeout(resolve, totalTime + randomFactor));
        
        return {
            title: `Lesson ${params.day}`,
            content: `This is a simulated lesson for day ${params.day}, age ${params.age}, tone ${params.tone}`,
            metadata: params
        };
    }

    /**
     * Get random sample from array
     */
    getRandomSample(array, size) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, size);
    }

    /**
     * Generate performance report
     */
    async generateReport() {
        console.log('📄 Generating performance report...');
        
        const synthesisResults = this.results.filter(r => r.type === 'synthesis');
        const loadResults = this.results.filter(r => r.type === 'load');
        const cacheResults = this.results.filter(r => r.type === 'cache');
        
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTests: this.results.length,
                synthesisTests: synthesisResults.length,
                loadTests: loadResults.length,
                cacheTests: cacheResults.length
            },
            synthesis: {
                passed: synthesisResults.filter(r => r.passed).length,
                failed: synthesisResults.filter(r => !r.passed).length,
                averageTime: this.calculateAverage(synthesisResults.map(r => r.duration)),
                maxTime: Math.max(...synthesisResults.map(r => r.duration || 0)),
                minTime: Math.min(...synthesisResults.map(r => r.duration || 0)),
                threshold: this.thresholds.synthesis
            },
            load: {
                averageTime: this.calculateAverage(loadResults.map(r => r.averageTime)),
                maxTime: Math.max(...loadResults.map(r => r.averageTime || 0)),
                minTime: Math.min(...loadResults.map(r => r.averageTime || 0))
            },
            cache: cacheResults.length > 0 ? {
                cacheMiss: cacheResults[0].cacheMiss,
                cacheHit: cacheResults[0].cacheHit,
                improvement: cacheResults[0].improvement,
                threshold: this.thresholds.cacheHit
            } : null,
            thresholds: this.thresholds,
            recommendations: this.generateRecommendations()
        };
        
        // Save report
        const reportPath = path.join(__dirname, '../dist/performance-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        // Display summary
        console.log('\n📊 Performance Test Summary:');
        console.log(`  Synthesis tests: ${report.synthesis.passed}/${report.synthesis.passed + report.synthesis.failed} passed`);
        console.log(`  Average synthesis time: ${report.synthesis.averageTime.toFixed(2)}ms`);
        console.log(`  Load test average: ${report.load.averageTime.toFixed(2)}ms`);
        if (report.cache) {
            console.log(`  Cache hit time: ${report.cache.cacheHit.toFixed(2)}ms`);
        }
        console.log(`  Report saved to: ${reportPath}`);
        
        // Check if performance meets requirements
        const synthesisPassed = report.synthesis.averageTime <= this.thresholds.synthesis;
        const cachePassed = !report.cache || report.cache.cacheHit <= this.thresholds.cacheHit;
        
        if (!synthesisPassed || !cachePassed) {
            console.log('\n⚠️  Performance requirements not met!');
            if (!synthesisPassed) {
                console.log(`  Synthesis time (${report.synthesis.averageTime.toFixed(2)}ms) exceeds threshold (${this.thresholds.synthesis}ms)`);
            }
            if (!cachePassed) {
                console.log(`  Cache hit time (${report.cache.cacheHit.toFixed(2)}ms) exceeds threshold (${this.thresholds.cacheHit}ms)`);
            }
            process.exit(1);
        } else {
            console.log('\n✅ All performance requirements met!');
        }
    }

    /**
     * Calculate average of numbers
     */
    calculateAverage(numbers) {
        const validNumbers = numbers.filter(n => n !== null && n !== undefined);
        return validNumbers.length > 0 ? validNumbers.reduce((a, b) => a + b, 0) / validNumbers.length : 0;
    }

    /**
     * Generate performance recommendations
     */
    generateRecommendations() {
        const recommendations = [];
        
        const synthesisResults = this.results.filter(r => r.type === 'synthesis');
        const averageTime = this.calculateAverage(synthesisResults.map(r => r.duration));
        
        if (averageTime > this.thresholds.synthesis * 0.8) {
            recommendations.push({
                type: 'warning',
                message: 'Synthesis performance is approaching the threshold. Consider optimization.',
                action: 'Review synthesis engine performance and caching strategies'
            });
        }
        
        const slowTests = synthesisResults.filter(r => r.duration > this.thresholds.synthesis);
        if (slowTests.length > 0) {
            recommendations.push({
                type: 'critical',
                message: `${slowTests.length} tests exceeded the performance threshold.`,
                action: 'Investigate and optimize slow synthesis cases'
            });
        }
        
        if (recommendations.length === 0) {
            recommendations.push({
                type: 'success',
                message: 'Performance is within acceptable limits.',
                action: 'Continue monitoring performance metrics'
            });
        }
        
        return recommendations;
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new PerformanceTester();
    tester.runTests();
}

module.exports = PerformanceTester; 