import Phaser from 'phaser';

type AudioConfigType = {
  key: string;
  filePath: string;
  loop: boolean;
  volume?: number;
  soundConfig?: Phaser.Types.Sound.SoundConfig;
  isMusic?: boolean;
};

class Audio {
  private audio: Record<
    string,
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound
  > = {};

  static instance: Audio;

  private audioConfig: Record<string, AudioConfigType> = {};

  static preload(scene: Phaser.Scene, configs: AudioConfigType[]) {
    for (let i = 0; i < configs.length; i += 1) {
      const config: AudioConfigType = configs[i];
      scene.load.audio(config.key, config.filePath);
    }
  }

  static getInstance(scene: Phaser.Scene, configs: AudioConfigType[] = []) {
    if (!Audio.instance) {
      Audio.instance = new Audio(scene, configs);
    }
    return Audio.instance;
  }

  constructor(scene: Phaser.Scene, configs: AudioConfigType[]) {
    this.addToConfig(scene, configs);
  }

  setSFXMute(mute: boolean) {
    Object.entries(this.audioConfig).forEach(([key, config]) => {
      if (!config.isMusic || config.isMusic === undefined) {
        this.audio[key].setMute(mute);
      }
    });
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

  setMusicMute(mute: boolean) {
    Object.entries(this.audioConfig).forEach(([key, config]) => {
      if (config.isMusic) {
        this.audio[key].setMute(mute);
      }
    });
  }

  playAudio(key: string) {
    if (!!this.audio[key] && !!this.audioConfig[key]) {
      this.audio[key].loop = this.audioConfig[key].loop;
      this.audio[key].play();
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

export default Audio;
