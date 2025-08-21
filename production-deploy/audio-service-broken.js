/**
 * AudioService: single TTS/audio pipeline using RailwayTTS
 */
(function(){
  class AudioService {
    constructor(audioElement, railwayTTS){
      this.audioEl = audioElement || new Audio();
      this.railway = railwayTTS || null;
      this._bindAnalyserSync();
      this._bindGestureUnlock();
    }
    setProvider(railwayTTS){ this.railway = railwayTTS; }
    async playText(text, speaker){
      const sp = (String(speaker||'kelly').toLowerCase()==='ken') ? 'ken' : 'kelly';
      if (!this.railway) throw new Error('Railway TTS not available');
      const res = await this.railway.generateSpeech(String(text||''), sp, true);
      if (!res || !res.audioUrl) throw new Error('No audioUrl from TTS');
      this.audioEl.src = res.audioUrl;
      await this.audioEl.play();
      return res;
    }
    _bindAnalyserSync(){
      try {
        // Keep external analyser bound to this element
        const el = this.audioEl; if (!el) return;
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        const src = ctx.createMediaElementSource(el);
        const analyser = ctx.createAnalyser(); analyser.fftSize = 1024;
        src.connect(analyser); // not connecting to destination to avoid double audio
        window.__audioAnalyser = { ctx, analyser, data:new Uint8Array(analyser.frequencyBinCount), time:new Uint8Array(analyser.fftSize), __boundEl: el };
        // Resume on gesture
        const resume = ()=>{ try { ctx.resume(); } catch{} window.removeEventListener('click', resume); window.removeEventListener('keydown', resume); window.removeEventListener('touchstart', resume); };
        window.addEventListener('click', resume, { once:true });
        window.addEventListener('keydown', resume, { once:true });
        window.addEventListener('touchstart', resume, { once:true });
      } catch {}
    }
    _bindGestureUnlock(){
      try {
        const el = this.audioEl; if (!el) return;
        const unlock = ()=>{ try { el.play().catch(()=>{}); el.pause(); } catch{} window.removeEventListener('click', unlock); window.removeEventListener('touchstart', unlock); };
        window.addEventListener('click', unlock, { once:true });
        window.addEventListener('touchstart', unlock, { once:true });
      } catch {}
    }
  }
  window.AudioService = AudioService;
})();


