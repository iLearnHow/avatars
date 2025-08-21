/**
 * AudioService: Fixed version that properly plays audio
 * The original version connected to analyser but not to speakers!
 */
(function(){
  class AudioService {
    constructor(audioElement, railwayTTS){
      this.audioEl = audioElement || new Audio();
      this.railway = railwayTTS || null;
      this.ctx = null;
      this.analyser = null;
      this.source = null;
      this._initAudioContext();
      this._bindGestureUnlock();
    }
    
    setProvider(railwayTTS){ 
      this.railway = railwayTTS; 
    }
    
    async playText(text, speaker){
      const sp = (String(speaker||'kelly').toLowerCase()==='ken') ? 'ken' : 'kelly';
      if (!this.railway) throw new Error('Railway TTS not available');
      
      const res = await this.railway.generateSpeech(String(text||''), sp, true);
      if (!res || !res.audioUrl) throw new Error('No audioUrl from TTS');
      
      // Set audio source
      this.audioEl.src = res.audioUrl;
      this.audioEl.volume = 1.0; // Ensure volume is up
      
      // Resume audio context if suspended (browser autoplay policy)
      if (this.ctx && this.ctx.state === 'suspended') {
        try {
          await this.ctx.resume();
          console.log('AudioContext resumed');
        } catch (e) {
          console.warn('Could not resume AudioContext:', e);
        }
      }
      
      // Play the audio
      try {
        await this.audioEl.play();
        console.log(`Playing ${speaker} voice, duration: ${res.duration}s`);
      } catch (e) {
        console.error('Audio playback error:', e);
        throw e;
      }
      
      return res;
    }
    
    _initAudioContext(){
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) {
          console.warn('Web Audio API not supported');
          return;
        }
        
        // Create audio context
        this.ctx = new AudioCtx();
        
        // We'll create the source node when audio plays
        // This avoids the double-audio issue while still allowing playback
        
        // Set up analyser for visualizations (optional)
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 1024;
        
        // Make analyser data available globally for visualizations
        window.__audioAnalyser = { 
          ctx: this.ctx, 
          analyser: this.analyser, 
          data: new Uint8Array(this.analyser.frequencyBinCount), 
          time: new Uint8Array(this.analyser.fftSize)
        };
        
        // Connect audio element to Web Audio when it plays
        this.audioEl.addEventListener('play', () => {
          if (!this.source && this.ctx) {
            try {
              // Create source from audio element
              this.source = this.ctx.createMediaElementSource(this.audioEl);
              
              // Connect: source -> analyser -> destination (speakers)
              this.source.connect(this.analyser);
              this.analyser.connect(this.ctx.destination); // THIS WAS MISSING!
              
              console.log('Audio connected: source -> analyser -> speakers');
            } catch (e) {
              // Source may already exist, that's ok
              console.log('Audio source already connected');
            }
          }
        });
        
      } catch (e) {
        console.warn('AudioContext setup error:', e);
      }
    }
    
    _bindGestureUnlock(){
      try {
        const el = this.audioEl;
        if (!el) return;
        
        // Unlock audio on user gesture (required by browsers)
        const unlock = async () => {
          try {
            // Unlock audio element
            await el.play().catch(()=>{});
            el.pause();
            
            // Resume audio context
            if (this.ctx && this.ctx.state === 'suspended') {
              await this.ctx.resume();
            }
            
            console.log('Audio unlocked via user gesture');
          } catch(e) {
            console.warn('Audio unlock error:', e);
          }
          
          // Remove listeners
          window.removeEventListener('click', unlock);
          window.removeEventListener('touchstart', unlock);
          window.removeEventListener('keydown', unlock);
        };
        
        // Add listeners for first user interaction
        window.addEventListener('click', unlock, { once: true });
        window.addEventListener('touchstart', unlock, { once: true });
        window.addEventListener('keydown', unlock, { once: true });
        
      } catch (e) {
        console.warn('Gesture unlock setup error:', e);
      }
    }
  }
  
  window.AudioService = AudioService;
})();
