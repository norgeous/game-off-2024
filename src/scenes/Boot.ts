import { Scene } from 'phaser';
import Audio from '../objects/Audio';
import { musicConfig } from '../helpers/getSoundConfig';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/bg.png');
    Audio.preload(this, [musicConfig]);
  }

  create() {
    this.scene.start('Preloader');

    Audio.getInstance(this, [musicConfig]);
    Audio.instance.playAudio(musicConfig.key);
  }
}
