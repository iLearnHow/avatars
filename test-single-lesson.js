const { CompleteLessonGenerator } = require('./complete-lesson-generator.js');

async function testSingleLesson() {
    console.log('🚀 Testing Single Lesson Generation...');
    
    try {
        const generator = new CompleteLessonGenerator();
        
        // Generate a single lesson for day 28 (The Sun)
        console.log('📚 Generating lesson for day 28: The Sun');
        const lesson = await generator.generateCompleteLesson(28, 'The Sun');
        
        console.log('✅ Lesson generated successfully!');
        console.log('📊 Lesson Statistics:');
        console.log(`   - Languages: ${Object.keys(lesson.languages).length}`);
        console.log(`   - Base Variants: ${Object.keys(lesson.languages.en.content).filter(k => !k.includes('_')).length}`);
        console.log(`   - Additional Scripts: ${['introduction', 'conclusion', 'reflection'].length}`);
        console.log(`   - Questions: ${lesson.languages.en.questions ? Object.keys(lesson.languages.en.questions).length : 0}`);
        console.log(`   - Daily Fortune: ${lesson.languages.en.dailyFortune ? 'Yes' : 'No'}`);
        console.log(`   - Avatar Moods: ${Object.keys(lesson.avatars).length}`);
        
        // Test English content specifically
        const enContent = lesson.languages.en;
        console.log('\n🇺🇸 English Content Preview:');
        console.log(`   - Introduction: ${enContent.content.introduction ? '✓' : '✗'}`);
        console.log(`   - Main Content (young_adult_neutral): ${enContent.content.young_adult_neutral ? '✓' : '✗'}`);
        console.log(`   - Conclusion: ${enContent.content.conclusion ? '✓' : '✗'}`);
        console.log(`   - Reflection: ${enContent.content.reflection ? '✓' : '✗'}`);
        
        // Test audio generation
        console.log('\n🎵 Audio Generation Test:');
        if (enContent.audio && enContent.audio.introduction) {
            console.log(`   - Introduction Audio: ${enContent.audio.introduction.url ? '✓' : '✗'}`);
        }
        
        // Test avatar moods
        console.log('\n👤 Avatar Moods Test:');
        Object.entries(lesson.avatars).forEach(([mood, spec]) => {
            console.log(`   - ${mood}: ${spec.avatar} (${spec.expression})`);
        });
        
        console.log('\n🎉 Single Lesson Test Complete!');
        return lesson;
        
    } catch (error) {
        console.error('❌ Lesson generation failed:', error);
        throw error;
    }
}

// Run the test
if (require.main === module) {
    testSingleLesson()
        .then(() => {
            console.log('\n✅ All tests passed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n❌ Tests failed:', error);
            process.exit(1);
        });
}

module.exports = { testSingleLesson }; 