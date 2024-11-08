import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameOverText: Phaser.GameObjects.Text;

  constructor() {
    super('GameOver');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000);

    this.background = this.add.image(width * 0.5, height * 0.5, 'background');
    this.background.setAlpha(0.5);

    this.gameOverText = this.add
      .text(width * 0.5, height * 0.5, 'Game Over', {
        fontFamily: 'Arial Black',
        fontSize: 64,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100);

    EventBus.emit('current-scene-ready', this);
  }

  changeScene() {
    this.scene.start('MainMenu');
  }
}