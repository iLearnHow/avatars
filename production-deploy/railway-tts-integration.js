/**
 * Railway TTS Integration - mirrored into production-deploy for Pages
 */
class RailwayTTS {
    constructor(railwayUrl) {
        this.baseUrl = railwayUrl || 'https://your-app.up.railway.app';
        this.cache = new Map();
    }
    async generateSpeech(text, speaker = 'kelly', includePhonemes = true) {
        const cacheKey = `${speaker}-${text}`;
        if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);
        const response = await fetch(`${this.baseUrl}/api/tts`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, speaker, include_phonemes: includePhonemes })
        });
        if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);
        const data = await response.json();
        const audioBlob = (function base64ToBlob(base64, mimeType){
            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: mimeType });
        })(data.audio, 'audio/wav');
        const audioUrl = URL.createObjectURL(audioBlob);
        const result = { audioUrl, audioBlob, duration: data.duration, phonemes: data.phonemes || [], speaker: data.speaker, text: data.text };
        this.cache.set(cacheKey, result);
        return result;
    }
    async testConnection(){
        const res = await fetch(`${this.baseUrl}/health`);
        if (!res.ok) throw new Error('Health check failed');
        return true;
    }
    clearCache(){ this.cache.clear(); }
}
window.RailwayTTS = RailwayTTS;


