import * as Phaser from 'phaser';
import { EntityConfigType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { TiledMapTest2 } from '../../../scenes/TiledMapTest2';
import { PredictionMovement } from '../../../helpers/movement/PredictionMovement';
import Enemy from '../Enemy';

const KEY = 'skeleton';

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
    width: 60,
    height: 110,
  },
  animations: [],
  stats: {
    hp: 20,
    maxHp: 20,
    speed: 0.08,
    attackRate: 1,
  },
};

class Skeleton extends Enemy {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/skeleton.png');
  }
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStrategy = new PredictionMovement(scene as TiledMapTest2);
  }
}

export default Skeleton;
