import * as Phaser from 'phaser';
import { EntityConfigType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { Room } from '../../../scenes/Room';
import { MoveToPlayer } from '../../../helpers/movement/MoveToPlayer';
import Enemy from '../Enemy';

const KEY = 'snake';

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
    hp: 2,
    initialHp: 10,
    maxHp: 10,
    speed: 0.1,
    attackRate: 1,
  },
};

class Snake extends Enemy {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/snake.png');
  }
  constructor(scene: Room, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStrategy = new MoveToPlayer(scene);
  }
}

export default Snake;
