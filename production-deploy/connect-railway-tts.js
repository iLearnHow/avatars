/**
 * Quick script to connect your frontend to Railway TTS
 * Run this after you get your Railway domain
 */

// STEP 1: Update this with your Railway URL (after clicking Generate Domain)
const RAILWAY_TTS_URL = 'https://mynextlesson-synthesis-production.up.railway.app'; // ✅ LIVE!

// STEP 2: Test the connection
async function testRailwayTTS() {
    console.log('🧪 Testing Railway TTS connection...');
    
    try {
        // Test health endpoint
        const healthResponse = await fetch(`${RAILWAY_TTS_URL}/health`);
        const health = await healthResponse.json();
        console.log('✅ TTS Server Status:', health);
        
        // Test actual TTS generation
        const ttsResponse = await fetch(`${RAILWAY_TTS_URL}/api/tts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: "Hello! Railway TTS is working perfectly!",
                speaker: "kelly",
                include_phonemes: true
            })
        });
        
        const ttsData = await ttsResponse.json();
        console.log('✅ TTS Response:', {
            duration: ttsData.duration,
            phonemeCount: ttsData.phonemes?.length,
            audioSize: ttsData.audio?.length
        });
        
        // Play the audio
        const audio = new Audio(`data:audio/wav;base64,${ttsData.audio}`);
        audio.play();
        console.log('🔊 Playing test audio...');
        
        return true;
    } catch (error) {
        console.error('❌ TTS Connection Error:', error);
        return false;
    }
}

// STEP 3: Update your existing TTS integration
function updateTTSIntegration() {
    // Update local-tts-integration.js or wherever your TTS config is
    if (window.LocalTTSSystem) {
        window.LocalTTSSystem.prototype.baseUrl = RAILWAY_TTS_URL;
        console.log('✅ Updated LocalTTSSystem to use Railway');
    }
    
    // Or create new global TTS instance
    window.railwayTTS = {
        url: RAILWAY_TTS_URL,
        async speak(text, voice = 'kelly') {
            const response = await fetch(`${RAILWAY_TTS_URL}/api/tts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, speaker: voice })
            });
            const data = await response.json();
            const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
            await audio.play();
            return data;
        }
    };
    
    console.log('✅ Railway TTS integration ready!');
}

// Run tests when page loads
if (typeof window !== 'undefined') {
    window.addEventListener('load', async () => {
        const success = await testRailwayTTS();
        if (success) {
            updateTTSIntegration();
        }
    });
}

// Export for Node.js testing
if (typeof module !== 'undefined') {
    module.exports = { testRailwayTTS, RAILWAY_TTS_URL };
}
