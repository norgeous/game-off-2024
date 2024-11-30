import { CC, CM } from '../../enums/CollisionCategories';
import { Weapons } from '../../enums/Weapons';
import Item, { ItemConfigType } from '../items/Item';

const KEY = 'whip';

// dps = 0.5/0.6 = 0.83
const config: ItemConfigType = {
  key: KEY,
  scale: 0.2,
  collisionCategory: CC.item,
  collisionMask: CM.item,
  onPickUpCallBack: (_item, player) => {
    player.addWeapon(Weapons.Whip);
  },
};

class Whip extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, config);
  }
  
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/items/weapons/' + KEY + '.png');
  }
}

export default Whip;
