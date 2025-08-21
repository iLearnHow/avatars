/**
 * Complete ElevenLabs Integration for iLearnHow
 * Real voice synthesis for Kelly and Ken avatars
 * Browser-safe implementation with fallback mechanisms
 */

class ElevenLabsIntegration {
    constructor() {
        // Environment detection
        this.isBrowser = typeof window !== 'undefined';
        this.isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
        
        // API configuration
        this.apiKey = this.getApiKey();
        this.baseUrl = 'https://api.elevenlabs.io/v1';
        
        // Voice IDs for Kelly and Ken (actual voice IDs from ElevenLabs)
        this.voices = {
            kelly: 'wAdymQH5YucAkXwmrdL0', // Kelly voice ID
            ken: 'fwrgq8CiDS7IPcDlFxgd'     // Ken voice ID
        };
        
        this.voiceSettings = {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
        };
        
        // Fallback audio system
        this.fallbackAudio = this.createFallbackAudio();
        
        console.log(`🎵 ElevenLabs Integration initialized (${this.isBrowser ? 'Browser' : 'Node.js'} environment)`);
    }

    /**
     * Get API key from environment or localStorage
     */
    getApiKey() {
        if (this.isBrowser) {
            // Try to get from localStorage first
            const storedKey = localStorage.getItem('elevenlabs_api_key');
            if (storedKey) {
                return storedKey;
            }
            
            // Fallback to environment variable (if available)
            return process?.env?.ELEVENLABS_API_KEY || 'your-elevenlabs-api-key';
        } else {
            // Node.js environment
            return process.env.ELEVENLABS_API_KEY || 'your-elevenlabs-api-key';
        }
    }

    /**
     * Create fallback audio system for when API is not available
     */
    createFallbackAudio() {
        if (!this.isBrowser) {
            return null; // No fallback in Node.js
        }
        
        // Create a simple text-to-speech fallback using browser's built-in TTS
        return {
            speak: (text, avatar = 'kelly') => {
                return new Promise((resolve) => {
                    try {
                        const utterance = new SpeechSynthesisUtterance(text);
                        utterance.voice = this.getFallbackVoice(avatar);
                        utterance.rate = 0.9;
                        utterance.pitch = 1.0;
                        utterance.volume = 0.8;
                        
                        utterance.onend = () => {
                            console.log('✅ Fallback TTS completed');
                            resolve('fallback_audio_completed');
                        };
                        
                        utterance.onerror = (error) => {
                            console.warn('⚠️ Fallback TTS error:', error);
                            resolve('fallback_audio_error');
                        };
                        
                        speechSynthesis.speak(utterance);
                        
                    } catch (error) {
                        console.warn('⚠️ Fallback TTS not available:', error);
                        resolve('fallback_audio_unavailable');
                    }
                });
            },
            
            getFallbackVoice: (avatar) => {
                const voices = speechSynthesis.getVoices();
                if (avatar === 'kelly') {
                    // Try to find a female voice
                    return voices.find(voice => voice.name.includes('female') || voice.name.includes('woman')) || voices[0];
                } else {
                    // Try to find a male voice
                    return voices.find(voice => voice.name.includes('male') || voice.name.includes('man')) || voices[0];
                }
            }
        };
    }

    /**
     * Generate audio for lesson content
     */
    async generateAudio(text, avatar = 'kelly') {
        try {
            console.log(`🎵 Generating audio for ${avatar}...`);
            
            // Check if we're in a browser environment
            if (!this.isBrowser) {
                console.warn('⚠️ Audio generation not available in Node.js environment');
                return this.generatePlaceholderAudio(text, avatar);
            }
            
            // Check if API key is valid
            if (this.apiKey === 'your-elevenlabs-api-key') {
                console.warn('⚠️ Using fallback audio (no valid API key)');
                return this.fallbackAudio?.speak(text, avatar) || this.generatePlaceholderAudio(text, avatar);
            }
            
            const voiceId = this.voices[avatar];
            if (!voiceId) {
                throw new Error(`Voice ID not found for avatar: ${avatar}`);
            }

            const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': this.apiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: 'eleven_monolingual_v1',
                    voice_settings: this.voiceSettings
                })
            });

            if (!response.ok) {
                const error = await response.text();
                console.warn(`⚠️ ElevenLabs API error: ${response.status} - ${error}`);
                console.warn('⚠️ Falling back to browser TTS');
                return this.fallbackAudio?.speak(text, avatar) || this.generatePlaceholderAudio(text, avatar);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            
            console.log(`✅ Audio generated successfully for ${avatar}`);
            return audioUrl;
            
        } catch (error) {
            console.error('❌ ElevenLabs audio generation failed:', error);
            console.warn('⚠️ Using fallback audio system');
            return this.fallbackAudio?.speak(text, avatar) || this.generatePlaceholderAudio(text, avatar);
        }
    }

    /**
     * Generate placeholder audio when no audio system is available
     */
    generatePlaceholderAudio(text, avatar) {
        console.log(`🎵 Generating placeholder audio for ${avatar}: "${text.substring(0, 50)}..."`);
        
        return new Promise((resolve) => {
            // Create a simple beep sound as placeholder
            if (this.isBrowser) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
                
                setTimeout(() => {
                    resolve('placeholder_audio_completed');
                }, 500);
            } else {
                // Node.js environment - just return success
                setTimeout(() => {
                    resolve('placeholder_audio_completed');
                }, 100);
            }
        });
    }

    /**
     * Generate audio with streaming for better performance
     */
    async generateStreamingAudio(text, avatar = 'kelly', onChunk) {
        try {
            console.log(`🎵 Generating streaming audio for ${avatar}...`);
            
            // Check if we're in a browser environment
            if (!this.isBrowser) {
                console.warn('⚠️ Streaming audio not available in Node.js environment');
                return this.generatePlaceholderAudio(text, avatar);
            }
            
            // Check if API key is valid
            if (this.apiKey === 'your-elevenlabs-api-key') {
                console.warn('⚠️ Using fallback audio (no valid API key)');
                return this.fallbackAudio?.speak(text, avatar) || this.generatePlaceholderAudio(text, avatar);
            }
            
            const voiceId = this.voices[avatar];
            if (!voiceId) {
                throw new Error(`Voice ID not found for avatar: ${avatar}`);
            }

            const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}/stream`, {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': this.apiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: 'eleven_monolingual_v1',
                    voice_settings: this.voiceSettings,
                    output_format: 'mp3_44100_128'
                })
            });

            if (!response.ok) {
                const error = await response.text();
                console.warn(`⚠️ ElevenLabs streaming API error: ${response.status} - ${error}`);
                console.warn('⚠️ Falling back to browser TTS');
                return this.fallbackAudio?.speak(text, avatar) || this.generatePlaceholderAudio(text, avatar);
            }

            const reader = response.body.getReader();
            const chunks = [];

            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                chunks.push(value);
                
                if (onChunk) {
                    onChunk(value);
                }
            }

            const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            
            console.log(`✅ Streaming audio generated successfully for ${avatar}`);
            return audioUrl;
            
        } catch (error) {
            console.error('❌ ElevenLabs streaming audio generation failed:', error);
            console.warn('⚠️ Using fallback audio system');
            return this.fallbackAudio?.speak(text, avatar) || this.generatePlaceholderAudio(text, avatar);
        }
    }

    /**
     * Get available voices from ElevenLabs
     */
    async getVoices() {
        try {
            if (!this.isBrowser) {
                console.warn('⚠️ Voice listing not available in Node.js environment');
                return this.voices;
            }
            
            const response = await fetch(`${this.baseUrl}/voices`, {
                headers: {
                    'xi-api-key': this.apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch voices: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Available voices:', data.voices);
            return data.voices;
            
        } catch (error) {
            console.error('❌ Failed to get voices:', error);
            return this.voices;
        }
    }

    /**
     * Test voice synthesis
     */
    async testVoiceSynthesis(avatar = 'kelly') {
        try {
            console.log(`🧪 Testing voice synthesis for ${avatar}...`);
            
            const testText = `Hello! I'm ${avatar === 'kelly' ? 'Kelly' : 'Ken'}, and this is a test of the voice synthesis system.`;
            
            const result = await this.generateAudio(testText, avatar);
            
            console.log(`✅ Voice synthesis test completed for ${avatar}`);
            return result;
            
        } catch (error) {
            console.error(`❌ Voice synthesis test failed for ${avatar}:`, error);
            throw error;
        }
    }

    /**
     * Generate audio for complete lesson
     */
    async generateLessonAudio(lesson, avatar = 'kelly') {
        try {
            console.log(`🎵 Generating lesson audio for ${avatar}...`);
            
            const formattedLesson = this.formatLessonForAudio(lesson);
            const audioUrl = await this.generateAudio(formattedLesson, avatar);
            
            console.log(`✅ Lesson audio generated successfully for ${avatar}`);
            return audioUrl;
            
        } catch (error) {
            console.error(`❌ Lesson audio generation failed for ${avatar}:`, error);
            throw error;
        }
    }

    /**
     * Format lesson content for audio generation
     */
    formatLessonForAudio(lesson) {
        let formattedText = '';
        
        if (lesson.voiceOver) {
            formattedText += lesson.voiceOver + ' ';
        }
        
        if (lesson.onScreen) {
            formattedText += lesson.onScreen + ' ';
        }
        
        if (lesson.lessonLogic) {
            formattedText += lesson.lessonLogic + ' ';
        }
        
        if (lesson.questions && lesson.questions.length > 0) {
            formattedText += 'Now for some questions. ';
            lesson.questions.forEach((question, index) => {
                formattedText += `Question ${index + 1}: ${question.question} `;
                if (question.optionA) formattedText += `Option A: ${question.optionA} `;
                if (question.optionB) formattedText += `Option B: ${question.optionB} `;
            });
        }
        
        if (lesson.fortune) {
            formattedText += `And here's your daily fortune: ${lesson.fortune}`;
        }
        
        return formattedText.trim();
    }

    /**
     * Get audio duration (placeholder implementation)
     */
    async getAudioDuration(audioUrl) {
        if (!this.isBrowser) {
            return 30; // Default duration for Node.js
        }
        
        return new Promise((resolve) => {
            const audio = new Audio(audioUrl);
            audio.addEventListener('loadedmetadata', () => {
                resolve(audio.duration);
            });
            audio.addEventListener('error', () => {
                resolve(30); // Default duration on error
            });
        });
    }

    /**
     * Clean up audio URL to prevent memory leaks
     */
    cleanupAudioUrl(audioUrl) {
        if (this.isBrowser && audioUrl && audioUrl.startsWith('blob:')) {
            URL.revokeObjectURL(audioUrl);
            console.log('✅ Audio URL cleaned up');
        }
    }

    /**
     * Set API key (for browser environment)
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        if (this.isBrowser) {
            localStorage.setItem('elevenlabs_api_key', apiKey);
        }
        console.log('✅ API key updated');
    }

    /**
     * Get system status
     */
    getSystemStatus() {
        return {
            environment: this.isBrowser ? 'browser' : 'nodejs',
            apiKeyConfigured: this.apiKey !== 'your-elevenlabs-api-key',
            fallbackAvailable: this.fallbackAudio !== null,
            voices: Object.keys(this.voices)
        };
    }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ElevenLabsIntegration;
} else if (typeof window !== 'undefined') {
    window.ElevenLabsIntegration = ElevenLabsIntegration;
} 
} 
