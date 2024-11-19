import Phaser from 'phaser';

export type AudioConfigType = {
  key: string;
  filePath: string;
  loop: boolean;
  roomType: string;
  volume?: number;
  soundConfig?: Phaser.Types.Sound.SoundConfig;
  isMusic?: boolean;
};

let currentMusic: string;

export class Audio {
  private audio: Record<
    string,
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound
  > = {};

  private audioConfig: Record<string, AudioConfigType> = {};

  static preload(scene: Phaser.Scene, configs: AudioConfigType[]) {
    for (let i = 0; i < configs.length; i += 1) {
      const config: AudioConfigType = configs[i];
      scene.load.audio(config.key, config.filePath);
    }
  }

  addToConfig(scene: Phaser.Scene, configs: AudioConfigType[]) {
    for (let i = 0; i < configs.length; i += 1) {
      const config: AudioConfigType = configs[i];
      this.audioConfig[config.key] = config;
      this.audio[config.key] = scene.sound.add(
        config.key,
        config.soundConfig ?? {},
      );
    }
  }

  setSFXMute(mute: boolean) {
    Object.entries(this.audioConfig).forEach(([key, config]) => {
      if (!config.isMusic || config.isMusic === undefined) {
        this.audio[key].setMute(mute);
      }
    });
  }

  setMusicMute(mute: boolean) {
    Object.entries(this.audioConfig).forEach(([key, config]) => {
      if (config.isMusic) {
        this.audio[key].setMute(mute);
      }
    });
  }

  stopMusic() {
    Object.entries(this.audioConfig).forEach(([key, config]) => {
      if (config.isMusic) {
        this.audio[key].stop();
      }
    });
  }

  playAudio(key: string) {
    if (this.audio[key] && this.audioConfig[key]) {
      this.audio[key].loop = this.audioConfig[key].loop;
      this.audio[key].play();
    }
  }

  playRoomMusic(key: string, reload: boolean = false) {
    if (currentMusic != key || reload) {
      currentMusic = key;
      this.stopMusic();
      this.playAudio(key);
    }
  }

  playOneShot(scene: Phaser.Scene, config: AudioConfigType) {
    this.addToConfig(scene, [config]);
    this.playAudio(config.key);
  }

  stopAudio(key: string) {
    this.audio[key]?.stop();
  }
}

const audio = new Audio();
export default audio;
