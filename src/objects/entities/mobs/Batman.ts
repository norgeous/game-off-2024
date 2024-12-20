import * as Phaser from 'phaser';
import { EntityConfigType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { Room } from '../../../scenes/Room';
import { OscillatingMovement } from '../../../helpers/movement/OscillatingMovement';
import Enemy from '../Enemy';

const KEY = 'batman';

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
    initialHp: 20,
    maxHp: 10,
    speed: 0.08,
    attackRate: 1,
  },
};

class Batman extends Enemy {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/batman.png');
  }
  constructor(scene: Room, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStrategy = new OscillatingMovement(0.2, 1, scene);
  }
}

export default Batman;
