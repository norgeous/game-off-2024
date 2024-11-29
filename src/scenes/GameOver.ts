import { EventBus, EventNames } from '../helpers/EventBus';

export class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  static preload(scene: Phaser.Scene) {
    scene.load.audio('sfx-game-over', 'assets/audio/game-over-arcade-6435.mp3');
    scene.load.image('gameover', 'assets/title-cards/gameover.jpg');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(0x000000);

    this.add.image(width * 0.5, height * 0.5, 'gameover');

    this.sound.play('sfx-game-over');

    const goMainMenu = () => this.scene.start('MainMenu');
    this.input.on('pointerup', goMainMenu);
    this.input.keyboard?.addKey('space').on('up', goMainMenu);

    EventBus.emit(EventNames.READY, this);
  }
}
