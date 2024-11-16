import { Scene } from 'phaser';
import { EventBus, EventNames } from '../helpers/EventBus';

export class Win extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  winText: Phaser.GameObjects.Text;

  constructor() {
    super('Win');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff00ff);

    this.background = this.add.image(width * 0.5, height * 0.5, 'background');
    this.background.setAlpha(0.5);

    this.winText = this.add
      .text(width * 0.5, height * 0.5, 'Winner', {
        fontFamily: 'Arial Black',
        fontSize: 64,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100);

    EventBus.emit(EventNames.READY, this);
  }

  changeScene() {
    this.scene.start('MainMenu');
  }
}
