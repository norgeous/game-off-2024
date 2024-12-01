import { EventBus, EventNames } from '../helpers/EventBus';

export class Shop extends Phaser.Scene {
  constructor() {
    super('Shop');
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('shop', 'assets/title-cards/shop.jpg');

    scene.load.audio('sfx-shop-door', 'assets/audio/shop/shop-door.mp3');
    scene.load.audio(
      'what-ya-buying',
      'assets/audio/shop/what-are-you-buying.mp3',
    );
    scene.load.audio(
      'cash-reg',
      'assets/audio/shop/cash-register-fake-88639.mp3',
    );
    scene.load.audio('no-gold', 'assets/audio/shop/no-gold.mp3');
    scene.load.audio('maxed', 'assets/audio/shop/maxed.mp3');
    scene.load.audio('see-ya', 'assets/audio/shop/see-ya.mp3');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(0x000000);

    this.add.image(width * 0.5, height * 0.5, 'shop');

    this.sound.play('what-ya-buying');
    this.sound.play('sfx-shop-door');

    EventBus.emit(EventNames.READY, this);
  }
}
