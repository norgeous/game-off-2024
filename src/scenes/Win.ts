import { Scene } from 'phaser';
import { EventBus, EventNames } from '../helpers/EventBus';

export class Win extends Scene {
  constructor() {
    super('Win');
  }
  static preload(scene: Phaser.Scene) {
    scene.load.audio('end-music', 'assets/audio/music/mofo-jones.mp3');
    scene.load.image('win', 'assets/title-cards/win.jpg');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(0x000000);

    this.add.image(width * 0.5, height * 0.5, 'win');
    this.sound.play('end-music');
    const goMainMenu = () => {
      this.scene.start('MainMenu');
      this.sound.stopAll();
    };
    this.input.on('pointerup', goMainMenu);
    this.input.keyboard?.addKey('space').on('up', goMainMenu);

    EventBus.emit(EventNames.READY, this);
  }
}
