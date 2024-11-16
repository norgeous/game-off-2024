import * as Phaser from 'phaser';
import Entity, { EntityConfigType } from '../Entity';
import GameScene from '@/scenes/GameScene';
import { CC, CM } from '../../../enums/CollisionCategories';
import { CircularMoveTowardPlayer } from '../../../helpers/movement/CircularMoveTowardPlayer';
import { TiledMapTest2 } from '../../../game/scenes/TiledMapTest2';

const KEY = 'snake';

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

class Snake extends Entity {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/snake.png');
  }
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStratagy = new CircularMoveTowardPlayer(
      scene as TiledMapTest2,
    );
  }
}

export default Snake;
