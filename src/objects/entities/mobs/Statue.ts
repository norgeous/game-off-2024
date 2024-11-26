import * as Phaser from 'phaser';
import { EntityConfigType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { TiledMapTest2 } from '../../../scenes/TiledMapTest2';
import { OscillatingMovement } from '../../../helpers/movement/OscillatingMovement';
import Enemy from '../Enemy';
import { MoveToPlayer } from '../../../helpers/movement/MoveToPlayer';
import { RandomLinearMovement } from '../../../helpers/movement/RandomLinearMovement';

const KEY = 'statue';

const entityConfig: EntityConfigType = {
  name: KEY,
  collisionCategory: CC.enemy,
  collisionMask: CM.enemy,
  spriteSheetKey: KEY,
  facing: -1,
  scale: 0.6,
  isStatic: true,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  physicsConfig: {
    width: 80,
    height: 160,
  },
  animations: [],
  stats: {
    hp: 100,
    maxHp: 10,
    speed: 0,
    attackRate: 1,
  },
};

class Statue extends Enemy {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/statue.png');
  }
  constructor(scene: TiledMapTest2, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStrategy = new MoveToPlayer(scene);
  }
}

export default Statue;
