/**
 * Railway TTS Integration - Ready to use once Railway is deployed
 * This replaces the dummy/local TTS with real Piper voices
 */

class RailwayTTS {
    constructor(railwayUrl) {
        this.baseUrl = railwayUrl || 'https://your-app.up.railway.app';
        this.cache = new Map();
    }

    /**
     * Generate speech from text using Railway Piper TTS
     * @param {string} text - Text to convert to speech
     * @param {string} speaker - 'ken' or 'kelly'
     * @param {boolean} includePhonemes - Include phoneme data for avatar sync
     * @returns {Promise<Object>} Audio data and metadata
     */
    async generateSpeech(text, speaker = 'kelly', includePhonemes = true) {
        // Check cache first
        const cacheKey = `${speaker}-${text}`;
        if (this.cache.has(cacheKey)) {
            console.log('🎯 Using cached audio');
            return this.cache.get(cacheKey);
        }

        try {
            console.log(`🎤 Generating speech with Railway TTS: ${speaker}`);
            
            const response = await fetch(`${this.baseUrl}/api/tts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    speaker,
                    include_phonemes: includePhonemes
                })
            });

            if (!response.ok) {
                throw new Error(`TTS request failed: ${response.status}`);
            }

            const data = await response.json();
            
            // Convert base64 to audio blob
            const audioBlob = this.base64ToBlob(data.audio, 'audio/wav');
            const audioUrl = URL.createObjectURL(audioBlob);
            
            const result = {
                audioUrl,
                audioBlob,
                duration: data.duration,
                phonemes: data.phonemes || [],
                speaker: data.speaker,
                text: data.text
            };

            // Cache the result
            this.cache.set(cacheKey, result);
            
            return result;
        } catch (error) {
            console.error('❌ Railway TTS Error:', error);
            throw error;
        }
    }

    /**
     * Generate audio for an entire lesson
     * @param {Object} lessonData - Lesson content object
     * @param {string} speaker - Voice to use
     * @returns {Promise<Object>} All audio URLs for the lesson
     */
    async generateLessonAudio(lessonData, speaker = 'kelly') {
        console.log(`🎓 Generating full lesson audio with ${speaker}`);
        
        const audioData = {
            intro: null,
            slides: [],
            questions: [],
            feedback: []
        };

        try {
            // Generate intro audio
            if (lessonData.intro) {
                const introAudio = await this.generateSpeech(lessonData.intro, speaker);
                audioData.intro = introAudio;
            }

            // Generate slide audio
            if (lessonData.slides) {
                for (const slide of lessonData.slides) {
                    const slideAudio = await this.generateSpeech(slide.content, speaker);
                    audioData.slides.push(slideAudio);
                }
            }

            // Generate question audio
            if (lessonData.questions) {
                for (const question of lessonData.questions) {
                    const questionAudio = await this.generateSpeech(question.text, speaker);
                    audioData.questions.push({
                        question: questionAudio,
                        answers: []
                    });

                    // Generate answer audio
                    for (const answer of question.answers) {
                        const answerAudio = await this.generateSpeech(answer.text, speaker);
                        audioData.questions[audioData.questions.length - 1].answers.push(answerAudio);
                    }
                }
            }

            console.log('✅ Lesson audio generation complete');
            return audioData;
        } catch (error) {
            console.error('❌ Lesson audio generation failed:', error);
            throw error;
        }
    }

    /**
     * Helper to convert base64 to blob
     */
    base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }

    /**
     * Test the TTS connection
     */
    async testConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            const data = await response.json();
            console.log('✅ Railway TTS Connected:', data);
            return true;
        } catch (error) {
            console.error('❌ Railway TTS Connection Failed:', error);
            return false;
        }
    }

    /**
     * Clear the cache
     */
    clearCache() {
        this.cache.clear();
        console.log('🧹 TTS cache cleared');
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RailwayTTS;
}

// Example usage (uncomment when Railway URL is ready):
/*
const tts = new RailwayTTS('https://your-app.up.railway.app');

// Test connection
await tts.testConnection();

// Generate single audio
const audio = await tts.generateSpeech('Hello, I am Kelly!', 'kelly');
console.log('Audio URL:', audio.audioUrl);
console.log('Duration:', audio.duration);
console.log('Phonemes:', audio.phonemes);

// Generate full lesson
const lessonData = {
    intro: "Welcome to today's lesson about the sun!",
    slides: [
        { content: "The sun is a star at the center of our solar system." },
        { content: "It provides light and heat to Earth." }
    ],
    questions: [
        {
            text: "What is the sun?",
            answers: [
                { text: "A planet", correct: false },
                { text: "A star", correct: true },
                { text: "A moon", correct: false }
            ]
        }
    ]
};

const lessonAudio = await tts.generateLessonAudio(lessonData, 'ken');
*/
