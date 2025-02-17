export class AudioService {
  private static instance: AudioService;
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private audioContext: AudioContext;
  private audioBuffers: Map<string, AudioBuffer> = new Map();

  private constructor() {
    this.audioContext = new AudioContext();
    // We'll load sounds differently now
    this.loadSound('timerEnd', '/sounds/chime.mp3');
    this.loadSound('ping', '/sounds/ping.mp3');
  }

  private async loadSound(soundName: string, url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.audioBuffers.set(soundName, audioBuffer);
    } catch (error) {
      console.error(`Failed to load sound ${soundName}:`, error);
    }
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  public play(soundName: string, cents: number = 0): void {
    const buffer = this.audioBuffers.get(soundName);
    if (buffer) {
      // Create audio source
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      
      // Calculate detune value (100 cents = 1 semitone)
      // Convert pitch multiplier to cents
  
      
      // console.log("[AudioService] pitch received. cents:", cents);
      
      source.detune.value = cents;
      
      // Connect to output and play
      source.connect(this.audioContext.destination);
      source.start(0);
    } else {
      console.warn(`Sound ${soundName} not found or still loading`);
    }
  }

  public preloadSounds(): void {
    // The sounds are already being loaded in the constructor
    // We can add a method to check if all sounds are loaded if needed
  }

  // Optional: Method to ensure audio context is running (needed for some browsers)
  public async resume(): Promise<void> {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
} 