import { EventBus, EventNames } from '../helpers/EventBus';

export class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(0x000000);

    this.add.image(width * 0.5, height * 0.5, 'title');

    const startDungeon = () => EventBus.emit(EventNames.START, this);
    this.input.keyboard?.addKey('space').on('up', startDungeon);

    EventBus.emit(EventNames.READY, this);
  }
}
