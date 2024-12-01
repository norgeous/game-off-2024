import * as Phaser from 'phaser';
import Entity, { EntityConfigType } from './Entity';
import { CC, CM } from '../../enums/CollisionCategories';
import { Room } from '../../scenes/Room';
import getPlayerStartPosition from '../../helpers/getPlayerStartPosition';
import { SceneInitParamsType } from '../../helpers/dungeonConfigParser';
import { createControls, keysToVector, keysType } from '../../helpers/controls';
import { EventBus, EventNames } from '../../helpers/EventBus';
import weapons, { addWeapon, clearInventory } from '../../helpers/weapons';
import { entityFalling } from '../../helpers/tweens/Entityfalling';
import { Weapons } from '../../enums/Weapons';

const KEY = 'player';

export const defaultPlayerStats = {
  hp: 5,
  initialHp: 5,
  maxHp: 10,
  speed: 1,
  attackRate: 1,
};

const entityConfig: EntityConfigType = {
  name: KEY,
  collisionCategory: CC.player,
  collisionMask: CM.player,
  spriteSheetKey: KEY,
  facing: -1,
  scale: 1,
  isStatic: false,
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
  stats: defaultPlayerStats,
  sensorConfig: [
    {
      label: 'inner',
      shape: 'circle',
      radius: 75,
      collisionCategory: CC.playerSensor,
      collisionSubMask: CM.enemyDetector,
    },
  ],
  collideCallback: (scene, otherBodyName, data) => {
    const bodies = [data.bodyA, data.bodyB];
    const player = bodies.filter(
      (bodies) => bodies?.collisionFilter.category === CC.player,
    )[0].gameObject as Player;

    if (otherBodyName === 'hole') {
      entityFalling(scene, player, () => {
        EventBus.emit(EventNames.RESPAWN_PLAYER);
      });
    }

    // when colliding with something that damages the player
    if (
      [
        'hole',
        'anubis',
        'bat',
        'batman',
        'beetle',
        'mummy',
        'pharaoe',
        'pharaoe_large',
        'rat',
        'sandman',
        'sarcophagus',
        'scorpion',
        'skeleton',
        'snake',
        'sphinx',
        'statue',
      ].includes(otherBodyName)
    ) {
      const amount = 1;

      // update player.stats
      player.takeDamage(amount);
    }

    // console.log('player collide with', otherBodyName, data);

    const enemyCount = scene.spawners?.enemy?.getLength();

    if (enemyCount) return;

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
  private sceneInitParams: SceneInitParamsType;
  public invulnerableUntil = 0;
  public keys: keysType | undefined;
  public weapons: (x: number, y: number, time: number) => void;

  static preload(scene: Phaser.Scene) {
    scene.load.image('player', 'assets/jones.png');
  }

  constructor(scene: Room, sceneInitParams: SceneInitParamsType) {
    const { playerEnterFrom, playerStats } = sceneInitParams;
    const { px, py } = getPlayerStartPosition(scene, playerEnterFrom);
    entityConfig.stats = playerStats;
    super(scene, px, py, entityConfig);

    this.sceneInitParams = sceneInitParams;
    this.keys = createControls(scene);
    this.weapons = weapons(scene, sceneInitParams);
    this.gameObject.setFriction(0);
    this.gameObject.setFrictionAir(0.08);
  }

  takeDamage(amount: number) {
    // if invulnerable, then do nothing
    if (this.invulnerableUntil > this.scene.time.now) return;

    // set invulnerability until future time
    this.invulnerableUntil = this.scene.time.now + 1000;

    // update react player stats state
    EventBus.emit(EventNames.UPDATE_PLAYER_STATS, {
      hp: this.stats.hp - amount,
    });

    super.takeDamage(amount);
  }

  public addWeapon(weapon: Weapons) {
    addWeapon(weapon);
    this.weapons = weapons(this.scene, this.sceneInitParams);
  }

  death() {
    clearInventory();
    this.scene.matter.pause();
    this.scene.sound.stopAll();
    setTimeout(() => {
      this.scene.scene.start('GameOver');
    }, 999);
  }

  update(time: number, delta: number) {
    super.update(time, delta);

    if (this.keys) {
      const forceVector = keysToVector(
        this.keys,
        0.00015 * this.stats.speed * delta,
      );
      this.gameObject.applyForce(forceVector);
    }

    this.weapons(this.x, this.y, time);
  }
}

export default Player;
