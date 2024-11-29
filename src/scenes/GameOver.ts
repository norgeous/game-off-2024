import { EventBus, EventNames } from '../helpers/EventBus';

export class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('gameover', 'assets/title-cards/gameover.jpg');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(0x000000);

    this.add.image(width * 0.5, height * 0.5, 'gameover');

    const goMainMenu = () => this.scene.start('MainMenu');
    this.input.on('pointerdown', goMainMenu);
    this.input.keyboard?.addKey('space').on('down', goMainMenu);

    EventBus.emit(EventNames.READY, this);
  }
}
