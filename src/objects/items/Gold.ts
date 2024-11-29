import { CC, CM } from "../../enums/CollisionCategories";
import Item, { ItemConfigType } from "./Item";

const KEY = 'gold';

const config: ItemConfigType = {
  key: KEY,
  scale: 0.2,
  collisionCategory: CC.item,
  collisionMask: CM.item,
};

class Gold extends Item {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, config);
  }
  
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/items/'+KEY+'.png');
  }

}

export default Gold;
