import * as Phaser from 'phaser';
import { EntityConfigType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { Room } from '../../../scenes/Room';
import Enemy from '../Enemy';
import { MoveToPlayer } from '../../../helpers/movement/MoveToPlayer';

const KEY = 'anubis';

const entityConfig: EntityConfigType = {
  name: KEY,
  collisionCategory: CC.enemy,
  collisionMask: CM.enemy,
  spriteSheetKey: KEY,
  facing: -1,
  scale: 0.6,
  isStatic: false,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  physicsConfig: {
    width: 90,
    height: 140,
  },
  animations: [],
  stats: {
    hp: 20,
    initialHp: 20,
    maxHp: 10,
    speed: 0.05,
    attackRate: 1,
  },
};

class Anubis extends Enemy {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/anubis.png');
  }
  constructor(scene: Room, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStrategy = new MoveToPlayer(scene);
  }
}

export default Anubis;
