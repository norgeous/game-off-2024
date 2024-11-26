import * as Phaser from 'phaser';
import { EntityConfigType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { TiledMapTest2 } from '../../../scenes/TiledMapTest2';
import { OscillatingMovement } from '../../../helpers/movement/OscillatingMovement';
import Enemy from '../Enemy';

const KEY = 'pharaoe_large';

const entityConfig: EntityConfigType = {
  name: KEY,
  collisionCategory: CC.enemy,
  collisionMask: CM.enemy,
  spriteSheetKey: KEY,
  facing: -1,
  scale: 0.4,
  isStatic: true,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  physicsConfig: {
    width: 100,
    height: 150,
  },
  animations: [],
  stats: {
    hp: 10,
    maxHp: 10,
    speed: 0.1,
    attackRate: 1,
  },
};

class PharaoeLarge extends Enemy {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/pharaoe_large.png');
  }
  constructor(scene: TiledMapTest2, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStrategy = new OscillatingMovement(0.2, 1, scene);
  }
}

export default PharaoeLarge;
