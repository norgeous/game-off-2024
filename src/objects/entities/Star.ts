import * as Phaser from 'phaser';
import Entity, { EntityConfigType } from './Entity';
import GameScene from '@/scenes/GameScene';
import { CC, CM } from '../../enums/CollisionCategories';

const KEY = 'star';

const entityConfig: EntityConfigType = {
  name: KEY,
  collisionCategory: CC.enemy,
  collisionMask: CM.enemy,
  spriteSheetKey: KEY,
  facing: -1,
  scale: 1,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  physicsConfig: {
    width: 49,
    height: 41,
  },
  animations: [],
};

class Star extends Entity {
  static preload(scene: Phaser.Scene) {
    scene.load.image('star', 'assets/star.png');
  }
  constructor(
    scene: GameScene,
    x: number,
    y: number,
    customProperties: Record<string, any>,
  ) {
    super(scene, x, y, entityConfig, customProperties);
    this.sprite.setDepth(100);
    //this.scene = scene;
    //this.playAnimation('idle');
  }

  update() {}
}

export default Star;
