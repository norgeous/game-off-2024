import { CC, CM } from '../../enums/CollisionCategories';
import { EventBus, EventNames } from '../../helpers/EventBus';
import Item, { ItemConfigType } from './Item';

const KEY = 'end-game-item';

const config: ItemConfigType = {
  key: KEY,
  scale: 0.2,
  collisionCategory: CC.item,
  collisionMask: CM.item,
  onPickUpCallBack: (item, _player) => {
    item.tween.stop();
    EventBus.emit(EventNames.COMPLETE_DUNGEON);
  },
};

class EndGameItem extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, config);

    this.tween = this.scene.tweens.add({
      targets: this.gameObject,
      y: y - 20,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/' + KEY + '.png');
  }
}

export default EndGameItem;
