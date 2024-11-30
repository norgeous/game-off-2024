import { EventBus, EventNames } from '../helpers/EventBus';

export class Shop extends Phaser.Scene {
  constructor() {
    super('Shop');
  }

  static preload(scene: Phaser.Scene) {
    scene.load.audio('sfx-shop', 'assets/audio/shop-door.mp3');
    scene.load.image('shop', 'assets/title-cards/shop.jpg');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(0x000000);

    this.add.image(width * 0.5, height * 0.5, 'shop');

    this.sound.play('sfx-shop');

    EventBus.emit(EventNames.READY, this);
  }
}
