/**
 * Generate All 366 Lessons for iLearnHow
 * Comprehensive lesson generation pipeline
 */

const fs = require('fs');
const path = require('path');

class LessonGenerator {
    constructor() {
        this.lessons = [];
        this.ageGroups = ['5-11', '12-17', '18+'];
        this.tones = ['grandmother', 'fun', 'neutral'];
        this.totalLessons = 366;
    }

    /**
     * Generate all 366 lessons with variants
     */
    async generateAllLessons() {
        console.log('🚀 Starting generation of all 366 lessons...');
        
        for (let day = 1; day <= this.totalLessons; day++) {
            console.log(`📚 Generating lesson ${day}/366...`);
            
            const lesson = await this.generateLesson(day);
            this.lessons.push(lesson);
            
            // Save individual lesson
            await this.saveLesson(day, lesson);
            
            // Progress indicator
            if (day % 50 === 0) {
                console.log(`✅ Generated ${day}/366 lessons`);
            }
        }
        
        // Save complete lesson set
        await this.saveAllLessons();
        
        console.log('🎉 All 366 lessons generated successfully!');
        return this.lessons;
    }

    /**
     * Generate a single lesson for a specific day
     */
    async generateLesson(day) {
        const lessonData = {
            day: day,
            title: this.generateLessonTitle(day),
            topic: this.generateLessonTopic(day),
            learningObjectives: this.generateLearningObjectives(day),
            content: {
                introduction: this.generateIntroduction(day),
                mainContent: this.generateMainContent(day),
                conclusion: this.generateConclusion(day),
                keyTakeaways: this.generateKeyTakeaways(day)
            },
            difficulty: this.calculateDifficulty(day),
            duration: this.calculateDuration(day),
            tags: this.generateTags(day),
            variants: {}
        };

        // Generate variants for each age group and tone
        for (const ageGroup of this.ageGroups) {
            for (const tone of this.tones) {
                const variant = await this.generateVariant(day, ageGroup, tone);
                lessonData.variants[`${ageGroup}-${tone}`] = variant;
            }
        }

        return lessonData;
    }

    /**
     * Generate lesson title based on day
     */
    generateLessonTitle(day) {
        const titles = [
            "The Science of Everyday Life",
            "Mathematics in Nature",
            "Understanding Our World",
            "The Power of Learning",
            "Exploring New Concepts",
            "Building Knowledge",
            "Discovering Patterns",
            "The Art of Problem Solving",
            "Connecting Ideas",
            "Growing Through Learning"
        ];
        
        return titles[day % titles.length];
    }

    /**
     * Generate lesson topic based on day
     */
    generateLessonTopic(day) {
        const topics = [
            "Applied Mathematics",
            "Scientific Discovery",
            "Critical Thinking",
            "Creative Problem Solving",
            "Data Analysis",
            "Pattern Recognition",
            "Logical Reasoning",
            "Innovation and Design",
            "Systems Thinking",
            "Adaptive Learning"
        ];
        
        return topics[day % topics.length];
    }

    /**
     * Generate learning objectives
     */
    generateLearningObjectives(day) {
        const objectives = [
            "Understand fundamental concepts",
            "Apply knowledge to real-world situations",
            "Develop critical thinking skills",
            "Enhance problem-solving abilities",
            "Build analytical reasoning",
            "Foster creative thinking",
            "Improve logical reasoning",
            "Strengthen decision-making skills",
            "Cultivate curiosity and wonder",
            "Develop lifelong learning habits"
        ];
        
        return objectives.slice(0, 3); // Return 3 objectives
    }

    /**
     * Generate lesson introduction
     */
    generateIntroduction(day) {
        const introductions = [
            "Welcome to today's learning adventure! We're going to explore something fascinating that connects to your everyday life.",
            "Get ready to discover how the world around us works in ways you might not have noticed before.",
            "Today we'll uncover the hidden patterns and principles that make our world so interesting and complex.",
            "Let's dive into a topic that will help you see the world with fresh eyes and new understanding.",
            "Prepare to be amazed as we explore concepts that are both simple and profound at the same time."
        ];
        
        return introductions[day % introductions.length];
    }

    /**
     * Generate main content
     */
    generateMainContent(day) {
        const contentSections = [
            "The core concept we're exploring today is fundamental to understanding how our world works. It appears in nature, technology, and even in our daily routines.",
            "This principle helps us make sense of complex situations by breaking them down into understandable parts. It's like having a special lens that helps us see patterns others might miss.",
            "Understanding this concept gives us a powerful tool for solving problems and making better decisions. It's applicable across many different areas of life and learning.",
            "The beauty of this topic is that it connects seemingly unrelated things in surprising ways. Once you see these connections, you'll start noticing them everywhere.",
            "This knowledge builds upon what you already know while opening doors to new discoveries and insights."
        ];
        
        return contentSections[day % contentSections.length];
    }

    /**
     * Generate conclusion
     */
    generateConclusion(day) {
        const conclusions = [
            "As we wrap up today's lesson, remember that learning is a journey, not a destination. Every new concept you understand opens up new possibilities.",
            "Take a moment to reflect on how this knowledge might apply to your own life and experiences. The best learning happens when we make personal connections.",
            "Keep your curiosity alive! The questions you have today might lead to amazing discoveries tomorrow.",
            "Learning is most powerful when we share it with others. Consider how you might explain today's concepts to a friend or family member.",
            "Remember that understanding comes with practice and patience. Give yourself time to fully absorb and apply what you've learned."
        ];
        
        return conclusions[day % conclusions.length];
    }

    /**
     * Generate key takeaways
     */
    generateKeyTakeaways(day) {
        const takeaways = [
            "Core concepts are building blocks for deeper understanding",
            "Real-world applications make learning meaningful",
            "Patterns exist everywhere if we know how to look",
            "Problem-solving skills improve with practice",
            "Curiosity drives discovery and innovation"
        ];
        
        return takeaways.slice(0, 3); // Return 3 key takeaways
    }

    /**
     * Calculate difficulty based on day
     */
    calculateDifficulty(day) {
        // Difficulty increases gradually over the year
        const baseDifficulty = Math.floor(day / 30) + 1;
        return Math.min(baseDifficulty, 5); // Scale of 1-5
    }

    /**
     * Calculate duration based on content
     */
    calculateDuration(day) {
        // Duration varies between 5-15 minutes
        const baseDuration = 5 + (day % 10);
        return baseDuration;
    }

    /**
     * Generate tags for the lesson
     */
    generateTags(day) {
        const allTags = [
            "mathematics", "science", "critical-thinking", "problem-solving",
            "real-world", "practical", "analytical", "creative", "logical",
            "patterns", "systems", "innovation", "discovery", "learning"
        ];
        
        // Select 3-5 tags based on day
        const numTags = 3 + (day % 3);
        const selectedTags = [];
        
        for (let i = 0; i < numTags; i++) {
            const tagIndex = (day + i) % allTags.length;
            selectedTags.push(allTags[tagIndex]);
        }
        
        return selectedTags;
    }

    /**
     * Generate variant for specific age group and tone
     */
    async generateVariant(day, ageGroup, tone) {
        // Create a simple lesson structure for variant generation
        const baseLesson = {
            day: day,
            content: {
                introduction: this.generateIntroduction(day),
                mainContent: this.generateMainContent(day),
                conclusion: this.generateConclusion(day),
                keyTakeaways: this.generateKeyTakeaways(day)
            },
            duration: this.calculateDuration(day)
        };
        
        return {
            ageGroup: ageGroup,
            tone: tone,
            content: this.adaptContentForAgeAndTone(baseLesson, ageGroup, tone),
            audioScript: this.generateAudioScript(baseLesson, ageGroup, tone),
            duration: this.calculateVariantDuration(baseLesson, ageGroup),
            complexity: this.calculateComplexity(ageGroup)
        };
    }

    /**
     * Adapt content for specific age group and tone
     */
    adaptContentForAgeAndTone(lesson, ageGroup, tone) {
        let adaptedContent = { ...lesson.content };
        
        // Age-specific adaptations
        switch (ageGroup) {
            case '5-11':
                adaptedContent = this.adaptForYoungChildren(adaptedContent);
                break;
            case '12-17':
                adaptedContent = this.adaptForTeenagers(adaptedContent);
                break;
            case '18+':
                adaptedContent = this.adaptForAdults(adaptedContent);
                break;
        }
        
        // Tone-specific adaptations
        switch (tone) {
            case 'grandmother':
                adaptedContent = this.adaptForGrandmotherTone(adaptedContent);
                break;
            case 'fun':
                adaptedContent = this.adaptForFunTone(adaptedContent);
                break;
            case 'neutral':
                // Keep as is
                break;
        }
        
        return adaptedContent;
    }

    /**
     * Adapt content for young children (5-11)
     */
    adaptForYoungChildren(content) {
        return {
            introduction: `Hey there, little explorer! ${content.introduction}`,
            mainContent: `Let's make this super fun! ${content.mainContent}`,
            conclusion: `Great job learning today! ${content.conclusion}`,
            keyTakeaways: content.keyTakeaways.map(takeaway => 
                `Remember: ${takeaway.toLowerCase()}`
            )
        };
    }

    /**
     * Adapt content for teenagers (12-17)
     */
    adaptForTeenagers(content) {
        return {
            introduction: `Check this out! ${content.introduction}`,
            mainContent: `Here's the deal: ${content.mainContent}`,
            conclusion: `Pretty cool, right? ${content.conclusion}`,
            keyTakeaways: content.keyTakeaways
        };
    }

    /**
     * Adapt content for adults (18+)
     */
    adaptForAdults(content) {
        return {
            introduction: `Welcome to today's learning session. ${content.introduction}`,
            mainContent: `Let's examine this concept: ${content.mainContent}`,
            conclusion: `To summarize our discussion: ${content.conclusion}`,
            keyTakeaways: content.keyTakeaways
        };
    }

    /**
     * Adapt for grandmother tone
     */
    adaptForGrandmotherTone(content) {
        return {
            introduction: `Oh, my dear one, ${content.introduction.toLowerCase()}`,
            mainContent: `You see, sweetheart, ${content.mainContent.toLowerCase()}`,
            conclusion: `And just between you and me, ${content.conclusion.toLowerCase()}`,
            keyTakeaways: content.keyTakeaways
        };
    }

    /**
     * Adapt for fun tone
     */
    adaptForFunTone(content) {
        return {
            introduction: `Get ready for some awesome learning! ${content.introduction}`,
            mainContent: `Here's the exciting part: ${content.mainContent}`,
            conclusion: `How cool is that? ${content.conclusion}`,
            keyTakeaways: content.keyTakeaways
        };
    }

    /**
     * Generate audio script for variant
     */
    generateAudioScript(lesson, ageGroup, tone) {
        const content = this.adaptContentForAgeAndTone(lesson, ageGroup, tone);
        
        return [
            {
                section: "introduction",
                text: content.introduction,
                timing: 0
            },
            {
                section: "main-content",
                text: content.mainContent,
                timing: 30
            },
            {
                section: "conclusion",
                text: content.conclusion,
                timing: 120
            }
        ];
    }

    /**
     * Calculate variant duration
     */
    calculateVariantDuration(lesson, ageGroup) {
        const baseDuration = lesson.duration;
        
        switch (ageGroup) {
            case '5-11':
                return Math.max(3, baseDuration - 2); // Shorter for young children
            case '12-17':
                return baseDuration;
            case '18+':
                return baseDuration + 2; // Longer for adults
            default:
                return baseDuration;
        }
    }

    /**
     * Calculate complexity for age group
     */
    calculateComplexity(ageGroup) {
        switch (ageGroup) {
            case '5-11':
                return 'simple';
            case '12-17':
                return 'moderate';
            case '18+':
                return 'advanced';
            default:
                return 'moderate';
        }
    }

    /**
     * Save individual lesson
     */
    async saveLesson(day, lesson) {
        const lessonDir = path.join(__dirname, 'dist', 'assets', 'data', 'lessons');
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(lessonDir)) {
            fs.mkdirSync(lessonDir, { recursive: true });
        }
        
        const filename = `lesson_${day.toString().padStart(3, '0')}.json`;
        const filepath = path.join(lessonDir, filename);
        
        fs.writeFileSync(filepath, JSON.stringify(lesson, null, 2));
        console.log(`💾 Saved lesson ${day} to ${filename}`);
    }

    /**
     * Save all lessons
     */
    async saveAllLessons() {
        const allLessonsPath = path.join(__dirname, 'dist', 'assets', 'data', 'all-lessons.json');
        
        fs.writeFileSync(allLessonsPath, JSON.stringify(this.lessons, null, 2));
        console.log(`💾 Saved all ${this.lessons.length} lessons to all-lessons.json`);
    }

    /**
     * Generate lesson statistics
     */
    generateStatistics() {
        const stats = {
            totalLessons: this.lessons.length,
            ageGroups: this.ageGroups,
            tones: this.tones,
            totalVariants: this.lessons.length * this.ageGroups.length * this.tones.length,
            averageDuration: this.lessons.reduce((sum, lesson) => sum + lesson.duration, 0) / this.lessons.length,
            difficultyDistribution: this.calculateDifficultyDistribution(),
            topicDistribution: this.calculateTopicDistribution()
        };
        
        return stats;
    }

    /**
     * Calculate difficulty distribution
     */
    calculateDifficultyDistribution() {
        const distribution = {};
        this.lessons.forEach(lesson => {
            const difficulty = lesson.difficulty;
            distribution[difficulty] = (distribution[difficulty] || 0) + 1;
        });
        return distribution;
    }

    /**
     * Calculate topic distribution
     */
    calculateTopicDistribution() {
        const distribution = {};
        this.lessons.forEach(lesson => {
            const topic = lesson.topic;
            distribution[topic] = (distribution[topic] || 0) + 1;
        });
        return distribution;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LessonGenerator };
}

// Run generation if called directly
if (require.main === module) {
    const generator = new LessonGenerator();
    
    generator.generateAllLessons()
        .then(lessons => {
            const stats = generator.generateStatistics();
            console.log('📊 Generation Statistics:', stats);
            console.log('🎉 Lesson generation completed successfully!');
        })
        .catch(error => {
            console.error('❌ Lesson generation failed:', error);
            process.exit(1);
        });
} 