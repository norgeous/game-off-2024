import * as Phaser from 'phaser';
import Entity, { EntityConfigType } from './Entity';
import { CC, CM } from '../../enums/CollisionCategories';
import { TiledMapTest2 } from '../../scenes/TiledMapTest2';
import getPlayerStartPosition from '../../helpers/getPlayerStartPosition';
import { Direction } from '../../helpers/dungeonConfigParser';
import { createControls, keysToVector, keysType } from '../../helpers/controls';
import { EventBus, EventNames } from '../../helpers/EventBus';
import weapons from '../../helpers/weapons';

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
    label: KEY,
  },
  animations: [],
  stats: {
    hp: 1,
    maxHp: 10,
    speed: 0.1,
    attackRate: 1,
  },
  sensorConfig: [
    {
      label: 'inner',
      shape: 'circle',
      radius: 75,
      collisionCategory: CC.playerSensor,
      collisionSubMask: CM.enemyDetector,
    },
  ],
  collideCallback: (scene, otherBodyName) => {
    console.log('Player collided with', otherBodyName, performance.now());

    if (otherBodyName === 'door-north') {
      EventBus.emit(EventNames.USE_DOOR, scene, 'north');
    }

    if (otherBodyName === 'door-south') {
      EventBus.emit(EventNames.USE_DOOR, scene, 'south');
    }

    if (otherBodyName === 'door-east') {
      EventBus.emit(EventNames.USE_DOOR, scene, 'east');
    }

    if (otherBodyName === 'door-west') {
      EventBus.emit(EventNames.USE_DOOR, scene, 'west');
    }
  },
};

class Player extends Entity {
  public keys: keysType | undefined;
  public weapons: (x: number, y: number, time: number) => void;

  static preload(scene: Phaser.Scene) {
    scene.load.image('player', 'assets/jones.png');
  }
  constructor(scene: TiledMapTest2, playerEnterFrom: Direction) {
    const { px, py } = getPlayerStartPosition(scene, playerEnterFrom);
    super(scene, px, py, entityConfig);

    this.keys = createControls(scene);
    this.weapons = weapons(scene);
  }
  update(time: number, delta: number) {
    super.update(time, delta);
    if (this.keys) {
      const forceVector = keysToVector(this.keys, 0.0001 * delta);
      this.gameObject.applyForce(forceVector);
    }

    if (this.keys?.SPACE.isDown) {
      this.weapons(this.x, this.y, time);
    }
  }
}

export default Player;