import Phaser from 'phaser';
import { PhaserMatterImage } from '../../types';
import { CC, CM } from '../../enums/CollisionCategories';
import { MovementStrategy } from '../../helpers/movement/MovementStrategy';
import createSensor from '../../helpers/createSensor';

type AnimationsConfigType = {
  animationKey: string;
  start: number;
  end: number;
  fps: number;
  repeat?: number | undefined;
};

export type EntityConfigType = {
  name: string;
  spriteSheetKey: string;
  animations: AnimationsConfigType[];
  physicsConfig: MatterJS.IChamferableBodyDefinition & {
    width: number;
    height: number;
  };
  facing: number;
  scale: number;
  collideCallback?: (
    scene: Phaser.Scene,
    otherBodyName: string,
    data: Phaser.Types.Physics.Matter.MatterCollisionData,
  ) => void;
  collisionCategory: CC;
  collisionMask: CM;
  craftpixOffset: {
    x: number;
    y: number;
  };
  stats: EntityStatsType;
  sensorConfig?: {
    label: 'inner';
    shape: 'circle';
    radius: number;
    collisionCategory: CC;
    collisionSubMask: CM;
  }[];
};

export type EntityStatsType = {
  hp: number;
  maxHp: number;
  speed: number;
  attackRate: number;
};

const defaultConfig: EntityConfigType = {
  name: 'entity',
  spriteSheetKey: 'player',
  animations: [],
  facing: -1,
  scale: 1,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  collisionCategory: CC.enemySensor,
  collisionMask: CM.playerDetector,
  physicsConfig: {
    width: 100,
    height: 100,
  },
  sensorConfig: [
    {
      label: 'inner',
      shape: 'circle',
      radius: 100,
      collisionCategory: CC.enemy,
      collisionSubMask: CM.playerDetector,
    },
  ],
  stats: {
    hp: 0,
    maxHp: 0,
    speed: 0,
    attackRate: 0,
  },
};

class Entity extends Phaser.GameObjects.Container {
  public scene: Phaser.Scene;
  public sensorData: Record<string, Set<number>>;
  public facing: number;
  public debugText: Phaser.GameObjects.Text;
  public sprite: Phaser.GameObjects.Sprite;
  public gameObject: PhaserMatterImage;
  public hitbox;
  protected movementStrategy: MovementStrategy;
  public stats: EntityStatsType;
  protected keepUpright: boolean;

  protected craftpixOffset: {
    x: number;
    y: number;
  };

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: EntityConfigType,
  ) {
    super(scene, x, y);

    const {
      name,
      spriteSheetKey,
      animations,
      physicsConfig,
      facing,
      scale,
      collisionCategory,
      collisionMask,
      collideCallback,
      sensorConfig,
      craftpixOffset,
      stats,
    } = { ...defaultConfig, ...config };

    this.scene = scene;
    this.name = name;
    this.scale = scale;
    this.craftpixOffset = craftpixOffset;
    this.facing = facing;
    this.sensorData = {
      inner: new Set(),
    };
    this.stats = stats;
    this.keepUpright = true;

    // debug text
    this.debugText = this.scene.add
      .text(0, 0 - 120, '', {
        font: '32px Arial',
        align: 'center',
        color: 'white',
      })
      .setOrigin(0.5);
    this.add(this.debugText);

    // sprite
    this.sprite = this.scene.add
      .sprite(this.craftpixOffset.x, this.craftpixOffset.y, this.name)
      .setScale(scale);
    this.add(this.sprite);

    // animations
    animations.forEach(({ animationKey, start, end, fps, repeat = -1 }) => {
      this.scene.anims.create({
        key: this.getKey(animationKey),
        frameRate: fps,
        frames: this.sprite.anims.generateFrameNumbers(spriteSheetKey, {
          start,
          end,
        }),
        repeat,
      });
    });
    this.playAnimation('idle');

    // container
    this.gameObject = this.scene.matter.add.gameObject(
      this,
    ) as PhaserMatterImage;
    this.scene.add.existing(this);

    const { bodies: Bodies, body: Body } = scene.matter;
    const { width, height, ...otherPhysics } = physicsConfig;
    this.hitbox = Bodies.rectangle(0, 0, width, height, otherPhysics);

    // sensors
    const { body: inner, sensorData } = createSensor(this.scene, {
      label: 'inner',
      shape: 'circle',
      radius: sensorConfig?.[0].radius || 100,
      collisionCategory: sensorConfig?.[0].collisionCategory || CC.enemySensor,
      collisionSubMask: sensorConfig?.[0].collisionSubMask || CM.playerDetector,
    });
    this.sensorData.inner = sensorData;

    // compound body
    const compoundBody = Body.create({
      parts: [this.hitbox, inner],
    });
    this.hitbox.onCollideCallback = (
      data: Phaser.Types.Physics.Matter.MatterCollisionData,
    ) => {
      const names = [
        data.bodyA.gameObject?.name || data.bodyA.label,
        data.bodyB.gameObject?.name || data.bodyB.label,
      ];
      const otherBodyName = names.filter((name) => name !== this.name)[0];
      collideCallback?.(this.scene, otherBodyName, data);
    };
    this.gameObject.setExistingBody(compoundBody);
    this.gameObject.setCollisionCategory(collisionCategory);
    this.gameObject.setCollidesWith(collisionMask);
    this.gameObject.setPosition(x, y);
    this.sprite.setScale(this.scale);
  }

  updateStats(newStats: Partial<EntityStatsType>) {
    this.stats = { ...this.stats, ...newStats };
  }

  getKey(key: string) {
    return `${this.name}_${key}`;
  }

  playAnimation(key: string, ignoreIfPlaying = true) {
    return this.sprite.play(this.getKey(key), ignoreIfPlaying);
  }

  flipXSprite(shouldFlip: boolean) {
    this.sprite.flipX = shouldFlip;
    if (shouldFlip) {
      this.sprite.x = -this.craftpixOffset.x;
    } else {
      this.sprite.x = this.craftpixOffset.x;
    }
  }

  keepUpRight() {
    if (this.keepUpright) {
      this.rotation = 0;
    }
  }

  update(time?: number, delta?: number) {
    this.debugText.text = [...this.sensorData.inner].join(',');
    // this.movementStrategy?.move(this, time, delta);
    super.update(time, delta);
    this.flipXSprite(this.facing === -1);
    this.keepUpRight();
  }
}

export default Entity;
