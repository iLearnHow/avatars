/**
 * DNA Parser for iLearn
 * Parses actual curriculum and DNA files to understand the real structure
 */

class DNAParser {
    constructor() {
        this.curriculumData = {};
        this.dnaData = {};
        this.parsedStructure = {};
    }

    /**
     * Load all curriculum files
     */
    async loadCurriculumFiles() {
        console.log('📚 Loading curriculum files...');
        
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];

        for (const month of months) {
            try {
                const response = await fetch(`/assets/data/curriculum/${month}_curriculum.json`);
                if (response.ok) {
                    this.curriculumData[month] = await response.json();
                    console.log(`✅ Loaded ${month} curriculum`);
                }
            } catch (error) {
                console.warn(`⚠️ Could not load ${month} curriculum:`, error);
            }
        }

        console.log(`📊 Loaded ${Object.keys(this.curriculumData).length} curriculum files`);
        return this.curriculumData;
    }

    /**
     * Load DNA structure files
     */
    async loadDNAFiles() {
        console.log('🧬 Loading DNA files...');
        
        try {
            const response = await fetch('/assets/data/the-sun-dna.json');
            if (response.ok) {
                this.dnaData = await response.json();
                console.log('✅ Loaded DNA structure');
            }
        } catch (error) {
            console.warn('⚠️ Could not load DNA file:', error);
        }

        return this.dnaData;
    }

    /**
     * Parse DNA structure into usable format
     */
    parseDNAStructure() {
        console.log('🔍 Parsing DNA structure...');
        
        if (!this.dnaData.age_expressions) {
            console.error('❌ No DNA data available');
            return null;
        }

        this.parsedStructure = {
            ageGroups: this.parseAgeGroups(),
            tonePatterns: this.parseTonePatterns(),
            questionStructure: this.parseQuestionStructure(),
            fortuneElements: this.parseFortuneElements()
        };

        console.log('✅ DNA structure parsed');
        return this.parsedStructure;
    }

    /**
     * Parse age groups from DNA
     */
    parseAgeGroups() {
        const ageGroups = {};
        
        for (const [key, data] of Object.entries(this.dnaData.age_expressions)) {
            ageGroups[key] = {
                name: data.concept_name,
                metaphor: data.core_metaphor,
                complexity: data.complexity_level,
                attention: data.attention_span,
                focus: data.cognitive_focus,
                vocabulary: data.vocabulary || [],
                examples: data.examples || [],
                abstractConcepts: data.abstract_concepts || {}
            };
        }

        return ageGroups;
    }

    /**
     * Parse tone patterns from DNA
     */
    parseTonePatterns() {
        const tones = {};
        
        for (const [key, data] of Object.entries(this.dnaData.tone_delivery)) {
            tones[key] = {
                name: data.voice_character,
                emotional: data.emotional_temperature,
                patterns: data.language_patterns,
                metaphor: data.metaphor_style,
                question: data.question_approach,
                validation: data.validation_style
            };
        }

        return tones;
    }

    /**
     * Parse question structure from DNA
     */
    parseQuestionStructure() {
        const questions = {};
        
        for (const [key, data] of Object.entries(this.dnaData.core_lesson_structure)) {
            questions[key] = {
                concept: data.concept_focus,
                principle: data.universal_principle,
                target: data.cognitive_target,
                choices: data.choice_architecture,
                teaching: data.teaching_moments
            };
        }

        return questions;
    }

    /**
     * Parse fortune elements from DNA
     */
    parseFortuneElements() {
        return this.dnaData.daily_fortune_elements || {};
    }

    /**
     * Get lesson topic for a specific day
     */
    getLessonTopic(day) {
        // Find which month this day belongs to
        const monthMap = {
            1: 'january', 32: 'february', 60: 'march', 91: 'april',
            121: 'may', 152: 'june', 182: 'july', 213: 'august',
            244: 'september', 274: 'october', 305: 'november', 335: 'december'
        };

        let month = 'january';
        for (const [startDay, monthName] of Object.entries(monthMap)) {
            if (day >= parseInt(startDay)) {
                month = monthName;
            }
        }

        const curriculum = this.curriculumData[month];
        if (!curriculum || !curriculum.lessons) {
            return { title: 'Unknown Topic', topic: 'General' };
        }

        const lesson = curriculum.lessons.find(l => l.day === day);
        if (!lesson) {
            return { title: 'Unknown Topic', topic: 'General' };
        }

        return {
            title: lesson.title,
            topic: lesson.topic,
            learningObjectives: lesson.learningObjectives,
            content: lesson.content
        };
    }

    /**
     * Get all available lesson topics
     */
    getAllLessonTopics() {
        const topics = [];
        
        for (const [month, curriculum] of Object.entries(this.curriculumData)) {
            if (curriculum.lessons) {
                for (const lesson of curriculum.lessons) {
                    topics.push({
                        day: lesson.day,
                        month: month,
                        title: lesson.title,
                        topic: lesson.topic
                    });
                }
            }
        }

        return topics.sort((a, b) => a.day - b.day);
    }

    /**
     * Validate DNA structure completeness
     */
    validateDNAStructure() {
        const required = ['age_expressions', 'tone_delivery', 'core_lesson_structure'];
        const missing = required.filter(key => !this.dnaData[key]);
        
        if (missing.length > 0) {
            console.error('❌ Missing DNA structure elements:', missing);
            return false;
        }

        console.log('✅ DNA structure validation passed');
        return true;
    }

    /**
     * Get summary of parsed structure
     */
    getStructureSummary() {
        return {
            ageGroups: Object.keys(this.parsedStructure.ageGroups || {}).length,
            tones: Object.keys(this.parsedStructure.tonePatterns || {}).length,
            questions: Object.keys(this.parsedStructure.questionStructure || {}).length,
            curriculumFiles: Object.keys(this.curriculumData).length,
            totalLessons: this.getAllLessonTopics().length
        };
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.DNAParser = DNAParser;
}
if (typeof module !== 'undefined') {
    module.exports = { DNAParser };
} 