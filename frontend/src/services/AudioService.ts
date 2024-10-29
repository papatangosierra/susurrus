export class AudioService {
  private static instance: AudioService;
  private audioElements: Map<string, HTMLAudioElement> = new Map();

  private constructor() {
    // Initialize audio elements
    this.audioElements.set('timerEnd', new Audio('/sounds/chime.mp3')); // Adjust path as needed
    // Add more sounds as needed:
    // this.audioElements.set('timerStart', new Audio('/sounds/start.mp3'));
    // this.audioElements.set('userJoined', new Audio('/sounds/join.mp3'));
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  public play(soundName: string): void {
    const audio = this.audioElements.get(soundName);
    if (audio) {
      audio.currentTime = 0; // Reset to start
      audio.play().catch(error => {
        console.warn(`Failed to play sound ${soundName}:`, error);
      });
    } else {
      console.warn(`Sound ${soundName} not found`);
    }
  }

  public preloadSounds(): void {
    this.audioElements.forEach(audio => {
      audio.load();
    });
  }
} 