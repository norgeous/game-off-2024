import { EventBus, EventNames } from '../helpers/EventBus';

export class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(0x000000);

    this.add.image(width * 0.5, height * 0.5, 'title');

    this.add
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

    const startDungeon = () => EventBus.emit(EventNames.START, this);
    this.input.on('pointerdown', startDungeon);
    this.input.keyboard?.addKey('space').on('down', startDungeon);

    EventBus.emit(EventNames.READY, this);
  }
}
