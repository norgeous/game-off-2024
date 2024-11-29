import * as Phaser from 'phaser';
import { EntityConfigType, ItemDropPoolType } from '../Entity';
import { CC, CM } from '../../../enums/CollisionCategories';
import { Room } from '../../../scenes/Room';
import { OscillatingMovement } from '../../../helpers/movement/OscillatingMovement';
import Enemy from '../Enemy';
import Heart from '../../items/Heart';
import Gold from '../../items/Gold';

const KEY = 'bat';

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
    hp: 1,
    maxHp: 10,
    speed: 0.1,
    attackRate: 1,
  },
  itemDropPool: [
    {
      classFactory: null,
      chance: 70
    },
    {
      classFactory: Gold,
      chance: 15
    },
    {
      classFactory: Heart,
      chance: 15
    },
  ]
};

class Bat extends Enemy {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/bat.png');
    // Loading all items from the item pool as Preload is called once per class and I want each instance of bat to spawn a random item.
    entityConfig.itemDropPool?.forEach((item) => {
      item.classFactory?.preload(scene);
    }) 
  }
  constructor(scene: Room, x: number, y: number) {
    super(scene, x, y, entityConfig);
    this.movementStrategy = new OscillatingMovement(0.2, 1, scene);
  }
}

export default Bat;
