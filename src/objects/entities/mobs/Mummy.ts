import * as Phaser from 'phaser';
import { EntityConfigType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { TiledMapTest2 } from '../../../scenes/TiledMapTest2';
import { OscillatingMovement } from '../../../helpers/movement/OscillatingMovement';
import Enemy from '../Enemy';
import { MoveToPlayer } from '../../../helpers/movement/MoveToPlayer';

const KEY = 'mummy';

const entityConfig: EntityConfigType = {
  name: KEY,
  collisionCategory: CC.enemy,
  collisionMask: CM.enemy,
  spriteSheetKey: KEY,
  facing: -1,
  scale: 0.5,
  isStatic: false,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  physicsConfig: {
    width: 50,
    height: 115,
  },
  animations: [],
  stats: {
    hp: 10,
    maxHp: 10,
    speed: 0.05,
    attackRate: 1,
  },
};

class Mummy extends Enemy {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/mummy.png');
  }
  constructor(scene: TiledMapTest2, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStrategy = new MoveToPlayer(scene);
  }
}

export default Mummy;
