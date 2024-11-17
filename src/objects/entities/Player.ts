import * as Phaser from 'phaser';
import Entity, { EntityConfigType } from './Entity';
import { CC, CM } from '../../enums/CollisionCategories';
import { TiledMapTest2 } from '../../scenes/TiledMapTest2';
import { OscillatingMovement } from '../../helpers/movement/OscillatingMovement';
import getPlayerStartPosition from '../../helpers/getPlayerStartPosition';
import { Direction } from '../../helpers/dungeonConfigParser';

const KEY = 'player';

const entityConfig: EntityConfigType = {
  name: KEY,
  collisionCategory: CC.player,
  collisionMask: CM.player,
  spriteSheetKey: KEY,
  facing: -1,
  scale: 1,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  physicsConfig: {
    width: 30,
    height: 100,
    chamfer: { radius: 15 },
  },
  animations: [],
  stats: {
    hp: 1,
    maxHp: 10,
    speed: 0.1,
    attackRate: 1,
  },
};

class Player extends Entity {
  static preload(scene: Phaser.Scene) {
    scene.load.image('player', 'assets/jones.png');
  }
  constructor(scene: TiledMapTest2, playerEnterFrom: Direction) {
    const { px, py } = getPlayerStartPosition(scene, playerEnterFrom);
    super(scene, px, py, entityConfig);
    this.movementStrategy = new OscillatingMovement(0.2, 1, scene);
  }
}

export default Player;
