import { GameObjects, Scene } from 'phaser';
import { EventBus, EventNames } from '../helpers/EventBus';

export class MainMenu extends Scene {
  logo: GameObjects.Image;
  title: GameObjects.Text;
  logoTween: Phaser.Tweens.Tween | null;

  constructor() {
    super('MainMenu');
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('title', 'assets/title.jpg');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(0x00ffff);

    this.add.image(width * 0.5, height * 0.5, 'title');

    this.title = this.add
      .text(width * 0.5, height * 0.8, 'Main Menu', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(100);

    this.input.on('pointerdown', () => EventBus.emit(EventNames.START, this));

    EventBus.emit(EventNames.READY, this);
  }
}
