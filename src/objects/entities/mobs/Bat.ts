import * as Phaser from 'phaser';
import Entity, { EntityConfigType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { TiledMapTest2 } from '../../../scenes/TiledMapTest2';
import { OscillatingMovement } from '../../../helpers/movement/OscillatingMovement';

const KEY = 'bat';

const entityConfig: EntityConfigType = {
  name: KEY,
  collisionCategory: CC.enemy,
  collisionMask: CM.enemy,
  spriteSheetKey: KEY,
  facing: -1,
  scale: 0.5,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  physicsConfig: {
    width: 100,
    height: 100,
  },
  animations: [],
  stats: {
    hp: 1,
    maxHp: 10,
    speed: 0.1,
    attackRate: 1,
  },
};

class Bat extends Entity {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/bat.png');
  }
  constructor(scene: TiledMapTest2, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStratagy = new OscillatingMovement(0.2, 1, scene);
  }
}

export default Bat;
