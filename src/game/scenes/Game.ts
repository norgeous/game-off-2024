import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameText: Phaser.GameObjects.Text;

  constructor() {
    super('Game');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(width * 0.5, height * 0.5, 'background');
    this.background.setAlpha(0.5);

    this.gameText = this.add
      .text(
        width * 0.5,
        height * 0.5,
        'Make something fun!\nand share it with us:\nsupport@phaser.io',
        {
          fontFamily: 'Arial Black',
          fontSize: 38,
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 8,
          align: 'center',
        },
      )
      .setOrigin(0.5)
      .setDepth(100);

    EventBus.emit('current-scene-ready', this);
  }

  changeScene() {
    this.scene.start('GameOver');
  }
}
