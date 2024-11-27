import { Scene } from 'phaser';
import { EventBus, EventNames } from '../helpers/EventBus';

export class Win extends Scene {
  constructor() {
    super('Win');
  }
  static preload(scene: Phaser.Scene) {
    scene.load.image('win', 'assets/win.jpg');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(0x000000);

    this.add.image(width * 0.5, height * 0.5, 'win');

    const goMainMenu = () => this.scene.start('MainMenu');
    this.input.on('pointerdown', goMainMenu);
    this.input.keyboard?.addKey('space').on('down', goMainMenu);

    EventBus.emit(EventNames.READY, this);
  }
}
