import { CC, CM } from '../../enums/CollisionCategories';
import Item, { ItemConfigType } from './Item';

const KEY = 'heart';

const config: ItemConfigType = {
  key: KEY,
  scale: 1,
  collisionCategory: CC.item,
  collisionMask: CM.item,
  onPickUpCallBack: (_item, player) => {
    player.updateStats({ hp: player.stats.hp + 1 });
  },
};

class Heart extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, config);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/items/' + KEY + '.png');
  }
}

export default Heart;
