/**
 * Audio Generation Integration for iLearn
 * Handles voice synthesis with ElevenLabs and future PiperTTS integration
 */

class AudioGenerationIntegration {
    constructor() {
        this.elevenLabsAPI = {
            baseURL: 'https://api.elevenlabs.io/v1/text-to-speech',
            voices: {
                kelly: 'wAdymQH5YucAkXwmrdL0', // Kelly voice ID
                ken: 'fwrgq8CiDS7IPcDlFxgd'   // Ken voice ID
            },
            apiKey: null
        };
        this.piperTTS = {
            enabled: false,
            voices: {
                kelly: null,
                ken: null
            }
        };
        this.audioCache = {};
        this.generationStats = {
            totalAudioFiles: 0,
            successfulGenerations: 0,
            failedGenerations: 0,
            totalCost: 0,
            totalDuration: 0
        };
    }

    /**
     * Initialize audio generation
     */
    async initialize(elevenLabsApiKey = null) {
        console.log('🎵 Initializing Audio Generation Integration...');
        
        if (elevenLabsApiKey) {
            this.elevenLabsAPI.apiKey = elevenLabsApiKey;
            console.log('✅ ElevenLabs API initialized');
        }
        
        // Future: Initialize PiperTTS when available
        if (this.piperTTS.enabled) {
            await this.initializePiperTTS();
        }
        
        console.log('✅ Audio Generation Integration initialized');
        return true;
    }

    /**
     * Generate audio for lesson content
     */
    async generateLessonAudio(lessonContent, voice = 'ken', tone = 'neutral') {
        console.log(`🎤 Generating audio for lesson with voice: ${voice}, tone: ${tone}`);
        
        try {
            const audioSegments = [];
            
            // Generate audio for each content segment
            const segments = [
                { name: 'introduction', text: lessonContent.introduction },
                { name: 'mainContent', text: lessonContent.mainContent },
                { name: 'examples', text: lessonContent.examples },
                { name: 'reflection', text: lessonContent.reflection },
                { name: 'conclusion', text: lessonContent.conclusion }
            ];
            
            for (const segment of segments) {
                if (segment.text && segment.text.trim()) {
                    const audio = await this.generateAudioSegment(segment.text, voice, tone, segment.name);
                    if (audio) {
                        audioSegments.push({
                            name: segment.name,
                            text: segment.text,
                            audio: audio
                        });
                    }
                }
            }
            
            // Generate fortune audio
            if (lessonContent.fortune) {
                const fortuneAudio = await this.generateAudioSegment(lessonContent.fortune, voice, 'inspirational', 'fortune');
                if (fortuneAudio) {
                    audioSegments.push({
                        name: 'fortune',
                        text: lessonContent.fortune,
                        audio: fortuneAudio
                    });
                }
            }
            
            this.generationStats.totalAudioFiles += audioSegments.length;
            this.generationStats.successfulGenerations += audioSegments.length;
            
            console.log(`✅ Generated ${audioSegments.length} audio segments`);
            return audioSegments;
            
        } catch (error) {
            console.error('❌ Failed to generate lesson audio:', error);
            this.generationStats.failedGenerations++;
            throw error;
        }
    }

    /**
     * Generate audio for a single text segment
     */
    async generateAudioSegment(text, voice, tone, segmentName) {
        const cacheKey = `${voice}_${tone}_${segmentName}_${this.hashText(text)}`;
        
        // Check cache first
        if (this.audioCache[cacheKey]) {
            console.log(`📂 Using cached audio for ${segmentName}`);
            return this.audioCache[cacheKey];
        }
        
        try {
            let audioData;
            
            // Use ElevenLabs for now (prototype)
            if (this.elevenLabsAPI.apiKey) {
                audioData = await this.generateElevenLabsAudio(text, voice, tone);
            } else {
                // Fallback to placeholder audio
                audioData = this.createPlaceholderAudio(text, voice, tone);
            }
            
            // Cache the result
            this.audioCache[cacheKey] = audioData;
            
            return audioData;
            
        } catch (error) {
            console.error(`❌ Failed to generate audio for ${segmentName}:`, error);
            return null;
        }
    }

    /**
     * Generate audio using ElevenLabs API
     */
    async generateElevenLabsAudio(text, voice, tone) {
        if (!this.elevenLabsAPI.apiKey) {
            throw new Error('ElevenLabs API key not configured');
        }
        
        const voiceId = this.elevenLabsAPI.voices[voice];
        if (!voiceId) {
            throw new Error(`Voice ${voice} not found`);
        }
        
        // Adjust voice settings based on tone
        const voiceSettings = this.getVoiceSettingsForTone(tone);
        
        const requestBody = {
            text: text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: voiceSettings
        };
        
        try {
            const response = await fetch(`${this.elevenLabsAPI.baseURL}/${voiceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': this.elevenLabsAPI.apiKey
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`ElevenLabs API error: ${errorData.detail || response.statusText}`);
            }
            
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Estimate duration (rough calculation)
            const estimatedDuration = this.estimateAudioDuration(text);
            
            return {
                url: audioUrl,
                duration: estimatedDuration,
                format: 'mp3',
                source: 'elevenlabs',
                voice: voice,
                tone: tone,
                text: text
            };
            
        } catch (error) {
            console.error('❌ ElevenLabs API error:', error);
            throw error;
        }
    }

    /**
     * Get voice settings based on tone
     */
    getVoiceSettingsForTone(tone) {
        const baseSettings = {
            stability: 0.5,
            similarity_boost: 0.75
        };
        
        switch (tone) {
            case 'grandmother':
                return {
                    ...baseSettings,
                    stability: 0.7,
                    similarity_boost: 0.8
                };
            case 'fun':
                return {
                    ...baseSettings,
                    stability: 0.4,
                    similarity_boost: 0.6
                };
            case 'neutral':
            default:
                return baseSettings;
        }
    }

    /**
     * Create placeholder audio (for testing without API)
     */
    createPlaceholderAudio(text, voice, tone) {
        // Create a simple audio placeholder using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Generate a simple tone based on voice and tone
        const frequency = voice === 'ken' ? 120 : 200; // Lower for Ken, higher for Kelly
        const duration = this.estimateAudioDuration(text);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
        
        return {
            url: null, // No URL for placeholder
            duration: duration,
            format: 'placeholder',
            source: 'placeholder',
            voice: voice,
            tone: tone,
            text: text,
            placeholder: true
        };
    }

    /**
     * Estimate audio duration based on text length
     */
    estimateAudioDuration(text) {
        // Rough estimate: 150 words per minute
        const words = text.split(' ').length;
        const minutes = words / 150;
        return Math.max(1, Math.round(minutes * 60)); // Minimum 1 second
    }

    /**
     * Hash text for cache key
     */
    hashText(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(36);
    }

    /**
     * Initialize PiperTTS (future implementation)
     */
    async initializePiperTTS() {
        console.log('🔮 PiperTTS initialization (future feature)');
        // This will be implemented when PiperTTS is available
        this.piperTTS.enabled = true;
    }

    /**
     * Generate audio with PiperTTS (future implementation)
     */
    async generatePiperTTSAudio(text, voice, tone) {
        if (!this.piperTTS.enabled) {
            throw new Error('PiperTTS not enabled');
        }
        
        // Future implementation
        console.log('🔮 PiperTTS audio generation (future feature)');
        return null;
    }

    /**
     * Get audio generation statistics
     */
    getGenerationStats() {
        return {
            ...this.generationStats,
            cacheSize: Object.keys(this.audioCache).length,
            averageDuration: this.generationStats.totalAudioFiles > 0 ? 
                this.generationStats.totalDuration / this.generationStats.totalAudioFiles : 0
        };
    }

    /**
     * Clear audio cache
     */
    clearAudioCache() {
        // Revoke object URLs to free memory
        Object.values(this.audioCache).forEach(audio => {
            if (audio.url && audio.url.startsWith('blob:')) {
                URL.revokeObjectURL(audio.url);
            }
        });
        
        this.audioCache = {};
        console.log('🗑️ Cleared audio cache');
    }

    /**
     * Get available voices
     */
    getAvailableVoices() {
        return Object.keys(this.elevenLabsAPI.voices);
    }

    /**
     * Get available tones
     */
    getAvailableTones() {
        return ['grandmother', 'fun', 'neutral'];
    }

    /**
     * Test audio generation
     */
    async testAudioGeneration() {
        console.log('🧪 Testing audio generation...');
        
        const testText = "Hello! This is a test of the audio generation system.";
        const testVoice = 'ken';
        const testTone = 'neutral';
        
        try {
            const audio = await this.generateAudioSegment(testText, testVoice, testTone, 'test');
            console.log('✅ Audio generation test successful:', audio);
            return audio;
        } catch (error) {
            console.error('❌ Audio generation test failed:', error);
            throw error;
        }
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.AudioGenerationIntegration = AudioGenerationIntegration;
}
if (typeof module !== 'undefined') {
    module.exports = { AudioGenerationIntegration };
} 