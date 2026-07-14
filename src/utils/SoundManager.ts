class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = true;
  private chordInterval: any = null;
  private isPlayingAmbient: boolean = false;
  private analyzer: AnalyserNode | null = null;
  private animationFrameId: number | null = null;
  public onUpdateFrequencies: ((freqs: number[]) => void) | null = null;

  constructor() {
    // Lazy initialize AudioContext on user interaction
  }

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    
    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime); // start muted
    
    // Analyzer for UI visualizer
    this.analyzer = this.ctx.createAnalyser();
    this.analyzer.fftSize = 32;
    this.masterGain.connect(this.analyzer);
    this.analyzer.connect(this.ctx.destination);

    // Ambient Loop Gain
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.ambientGain.connect(this.masterGain);
  }

  public toggleMute(): boolean {
    this.init();
    if (!this.ctx) return true;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    
    const targetGain = this.isMuted ? 0 : 0.8;
    this.masterGain!.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.25);

    if (!this.isMuted && !this.isPlayingAmbient) {
      this.startAmbient();
    }

    if (!this.isMuted) {
      this.startFrequencyPolling();
    } else {
      this.stopFrequencyPolling();
    }

    return this.isMuted;
  }

  public playHover() {
    this.init();
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    // Gentle high pitch sweep
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
    
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playClick() {
    this.init();
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
    
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.08);
  }

  private startAmbient() {
    if (this.isPlayingAmbient || !this.ctx) return;
    this.isPlayingAmbient = true;

    // Ambient chords: Ebmaj7 -> Fm7 -> Gm7 -> Abmaj7 (Warm spatial feeling)
    const chords = [
      [155.56, 196.00, 233.08, 293.66], // Eb3, G3, Bb3, D4
      [174.61, 207.65, 261.63, 311.13], // F3, Ab3, C4, Eb4
      [196.00, 233.08, 293.66, 349.23], // G3, Bb3, D4, F4
      [207.65, 261.63, 311.13, 392.00]  // Ab3, C4, Eb4, G4
    ];

    let currentChordIndex = 0;

    const playNextChord = () => {
      if (this.isMuted || !this.ctx || !this.ambientGain) return;
      const now = this.ctx.currentTime;
      const chord = chords[currentChordIndex];
      
      const chordGain = this.ctx.createGain();
      chordGain.gain.setValueAtTime(0, now);
      chordGain.gain.linearRampToValueAtTime(0.08, now + 2.5); // Slow attack
      chordGain.gain.setValueAtTime(0.08, now + 6.0);
      chordGain.gain.linearRampToValueAtTime(0, now + 9.0); // Smooth release
      chordGain.connect(this.ambientGain);

      // Lowpass filter to create a warm "space pad" sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);
      filter.frequency.exponentialRampToValueAtTime(550, now + 4.5);
      filter.frequency.exponentialRampToValueAtTime(350, now + 9.0);
      filter.connect(chordGain);

      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        // Dynamic pitch modulation (vibrato) for organic vibe
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.25 + Math.random() * 0.15, now);
        lfoGain.gain.setValueAtTime(1.2, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        
        osc.connect(filter);
        
        lfo.start(now);
        osc.start(now);
        
        lfo.stop(now + 9.1);
        osc.stop(now + 9.1);
      });

      currentChordIndex = (currentChordIndex + 1) % chords.length;
    };

    playNextChord();
    this.chordInterval = setInterval(playNextChord, 6500); // overlap for seamless transitions
  }

  private startFrequencyPolling() {
    if (!this.analyzer) return;
    const bufferLength = this.analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const poll = () => {
      if (this.isMuted || !this.analyzer) return;
      this.analyzer.getByteFrequencyData(dataArray);
      
      const values: number[] = [];
      // Grab 8 representative frequency bands for header visualizer
      const step = Math.floor(bufferLength / 8) || 1;
      for (let i = 0; i < 8; i++) {
        const val = dataArray[i * step] || 0;
        values.push(val / 255);
      }
      
      if (this.onUpdateFrequencies) {
        this.onUpdateFrequencies(values);
      }
      
      this.animationFrameId = requestAnimationFrame(poll);
    };

    poll();
  }

  private stopFrequencyPolling() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.onUpdateFrequencies) {
      this.onUpdateFrequencies([0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }

  public getMutedState() {
    return this.isMuted;
  }

  public destroy() {
    if (this.chordInterval) {
      clearInterval(this.chordInterval);
    }
    this.stopFrequencyPolling();
  }
}

export const sound = new SoundManager();
export default sound;
