import * as Phaser from 'phaser';
import { EntityConfigType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { Room } from '../../../scenes/Room';
import Enemy from '../Enemy';

const KEY = 'sphinx';

const entityConfig: EntityConfigType = {
  name: KEY,
  collisionCategory: CC.enemy,
  collisionMask: CM.enemy,
  spriteSheetKey: KEY,
  facing: -1,
  scale: 0.7,
  isStatic: true,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  physicsConfig: {
    width: 150,
    height: 180,
  },
  animations: [],
  stats: {
    hp: 50,
    initialHp: 50,
    maxHp: 10,
    speed: 0.0,
    attackRate: 1,
  },
};

class Sphinx extends Enemy {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/sphinx.png');
  }
  constructor(scene: Room, x: number, y: number) {
    super(scene, x, y, entityConfig);
  }
}

export default Sphinx;
