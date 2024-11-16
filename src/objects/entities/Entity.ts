import Phaser from 'phaser';
import { PhaserMatterImage } from '../../types';
//import findOtherBody from '@/helpers/findOtherBody';
import { CC, CM } from '../../enums/CollisionCategories';
import { MovementStrategy } from '../../helpers/movement/MovementStrategy';

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  collideCallback?: Function;
  collisionCategory?: CC;
  collisionMask?: CM;
  craftpixOffset: {
    x: number;
    y: number;
  };
  stats: EntityStatsType;
};

export type EntityStatsType = {
  hp: number;
  maxHp: number;
  speed: number;
  attackRate: number;
};

const defaultConfig = {
  name: 'entity',
  spriteSheetKey: 'player',
  animations: [],
  facing: -1,
  scale: 1,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  collisionCategory: CC.default,
  collisionMask: CM.everything,
};

class Entity extends Phaser.GameObjects.Container {
  public scene: Phaser.Scene;
  public sensorData: Record<string, Set<number>>;
  public facing: number;
  public sprite: Phaser.GameObjects.Sprite;
  public gameObject: PhaserMatterImage;
  protected hitbox;
  protected movementStratagy: MovementStrategy;
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
      craftpixOffset,
      stats,
    } = { ...defaultConfig, ...config };

    this.scene = scene;
    this.name = name;
    this.scale = scale;
    this.craftpixOffset = craftpixOffset;
    this.facing = facing;
    this.sensorData = {
      bottom: new Set(),
    };
    this.stats = stats;
    this.keepUpright = true;

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
    const bottom = Bodies.rectangle(0, height / 2, width - 2, 15, {
      isSensor: true,
      label: 'bottom',
    });
    // sensor can only collide with ground staticbodies / bodies in default category
    bottom.collisionFilter.mask = CM.groundsensor;

    // bottom.onCollideCallback = (
    //   data: Phaser.Types.Physics.Matter.MatterCollisionData,
    // ) => this.sensorData.bottom.add(findOtherBody(bottom.id, data)?.id || 0);
    // bottom.onCollideEndCallback = (
    //   data: Phaser.Types.Physics.Matter.MatterCollisionData,
    // ) => this.sensorData.bottom.delete(findOtherBody(bottom.id, data)?.id || 0);
    const compoundBody = Body.create({
      parts: [this.hitbox, bottom],
    });

    this.hitbox.onCollideCallback = (
      data: Phaser.Types.Physics.Matter.MatterCollisionData,
    ) => {
      collideCallback?.(data, this);
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
    this.movementStratagy.move(this, time, delta);
    super.update(time, delta);
    this.flipXSprite(this.facing === -1);
    this.keepUpRight();
  }
}

export default Entity;
