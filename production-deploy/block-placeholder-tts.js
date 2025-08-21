/**
 * Block placeholder TTS - Prevents macOS voices from speaking placeholder text
 * This must load BEFORE any TTS systems initialize
 */

(function() {
    console.log('🛡️ Initializing placeholder TTS blocker...');
    
    // List of placeholder texts that should NEVER be spoken
    const BLOCKED_PHRASES = [
        'lesson orientation',
        'Lesson orientation',
        'LESSON ORIENTATION',
        'vitamin cue',
        'Vitamin cue',
        'timing habit',
        'Timing habit',
        'cloudy/indoor fixes',
        'Cloudy/indoor fixes',
        'close + plan',
        'Close + plan',
        'script_text',
        'placeholder',
        'test audio'
    ];
    
    // Helper to check if text is a blocked placeholder
    function isBlockedText(text) {
        if (!text) return true; // Block empty text
        const normalized = String(text).trim().toLowerCase();
        return BLOCKED_PHRASES.some(blocked => 
            normalized === blocked.toLowerCase() ||
            normalized.includes('placeholder') ||
            normalized.includes('script_text')
        );
    }
    
    // Override any speak functions
    const originalSpeak = window.speak;
    if (originalSpeak) {
        window.speak = function(text, ...args) {
            if (isBlockedText(text)) {
                console.log('🚫 Blocked placeholder TTS:', text);
                return Promise.resolve();
            }
            return originalSpeak.apply(this, [text, ...args]);
        };
    }
    
    // Monitor for TTS system creation
    Object.defineProperty(window, 'tts', {
        get() {
            return this._tts;
        },
        set(value) {
            console.log('🎯 TTS system detected, applying placeholder filter...');
            this._tts = value;
            
            // Wrap generateAudio if it exists
            if (value && value.generateAudio) {
                const originalGenerateAudio = value.generateAudio.bind(value);
                value.generateAudio = async function(text, ...args) {
                    if (isBlockedText(text)) {
                        console.log('🚫 Blocked placeholder in generateAudio:', text);
                        // Return silence
                        return new Blob([new ArrayBuffer(44100)], { type: 'audio/wav' });
                    }
                    return originalGenerateAudio(text, ...args);
                };
            }
            
            // Wrap speak if it exists
            if (value && value.speak) {
                const originalSpeak = value.speak.bind(value);
                value.speak = async function(text, ...args) {
                    if (isBlockedText(text)) {
                        console.log('🚫 Blocked placeholder in speak:', text);
                        return Promise.resolve();
                    }
                    return originalSpeak(text, ...args);
                };
            }
        },
        configurable: true
    });
    
    // Also intercept speechSynthesis API
    if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
        const OriginalUtterance = window.SpeechSynthesisUtterance;
        window.SpeechSynthesisUtterance = function(text) {
            if (isBlockedText(text)) {
                console.log('🚫 Blocked placeholder in SpeechSynthesisUtterance:', text);
                // Return utterance with empty text
                return new OriginalUtterance('');
            }
            return new OriginalUtterance(text);
        };
        window.SpeechSynthesisUtterance.prototype = OriginalUtterance.prototype;
    }
    
    // Intercept any speak method on lesson player
    const checkLessonPlayer = setInterval(() => {
        if (window.lessonPlayer && window.lessonPlayer.speak) {
            const originalPlayerSpeak = window.lessonPlayer.speak.bind(window.lessonPlayer);
            window.lessonPlayer.speak = async function(text, ...args) {
                if (isBlockedText(text)) {
                    console.log('🚫 Blocked placeholder in lessonPlayer.speak:', text);
                    return Promise.resolve();
                }
                return originalPlayerSpeak(text, ...args);
            };
            clearInterval(checkLessonPlayer);
            console.log('✅ Lesson player speak method wrapped');
        }
    }, 100);
    
    // Stop checking after 10 seconds
    setTimeout(() => clearInterval(checkLessonPlayer), 10000);
    
    console.log('✅ Placeholder TTS blocker ready');
})();
