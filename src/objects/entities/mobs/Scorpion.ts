import * as Phaser from 'phaser';
import Entity, { EntityConfigType } from '../Entity';
import GameScene from '@/scenes/GameScene';
import { CC, CM } from '../../../enums/CollisionCategories';

const KEY = 'scorpion';

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
  animations: [
  ],
};

class Scorpion extends Entity {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/mobs/scorpion.png');
  }
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, entityConfig);
  }
}

export default Scorpion;