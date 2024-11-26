import * as Phaser from 'phaser';
import { EntityConfigType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { TiledMapTest2 } from '../../../scenes/TiledMapTest2';
import Enemy from '../Enemy';
import { MoveToPlayer } from '../../../helpers/movement/MoveToPlayer';

const KEY = 'rat';

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
    width: 100,
    height: 100,
  },
  animations: [],
  stats: {
    hp: 20,
    maxHp: 20,
    speed: 0.08,
    attackRate: 1,
  },
};

class Rat extends Enemy {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/rat.png');
  }
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStrategy = new MoveToPlayer(scene as TiledMapTest2);
  }
}

export default Rat;
