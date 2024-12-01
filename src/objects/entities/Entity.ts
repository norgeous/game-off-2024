import Phaser from 'phaser';
import { PhaserMatterImage } from '../../types';
import { CC, CM } from '../../enums/CollisionCategories';
import createSensors from '../../helpers/createSensors';
import isDev from '../../helpers/isDev';
import { spawnItemFromDropPool } from '../../helpers/itemFactory';
import { classFactoryType } from '../items';
import Gold from '../items/Gold';
import Heart from '../items/Heart';
import GoldLarge from '../items/GoldLarge';
import GoldMedium from '../items/GoldMedium';

type AnimationsConfigType = {
  animationKey: string;
  start: number;
  end: number;
  fps: number;
  repeat?: number | undefined;
};

export type ItemDropPoolType = {
  classFactory: classFactoryType | null;
  chance: number;
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
  isStatic: boolean;
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
  itemDropPool?: ItemDropPoolType[];
};

export type EntityStatsType = {
  hp: number;
  initialHp: number;
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
  isStatic: false,
  craftpixOffset: {
    x: 0,
    y: 0,
  },
  collisionCategory: CC.enemy,
  collisionMask: CM.enemy,
  physicsConfig: {
    width: 100,
    height: 100,
  },
  sensorConfig: [
    {
      label: 'inner',
      shape: 'circle',
      radius: 100,
      collisionCategory: CC.enemySensor,
      collisionSubMask: CM.playerDetector,
    },
  ],
  stats: {
    hp: 1,
    initialHp: 1,
    maxHp: 0,
    speed: 0,
    attackRate: 0,
  },
  itemDropPool: [
    {
      classFactory: null,
      chance: 60,
    },
    {
      classFactory: Heart,
      chance: 20,
    },
    {
      classFactory: Gold,
      chance: 15,
    },
    {
      classFactory: GoldMedium,
      chance: 10,
    },
    {
      classFactory: GoldLarge,
      chance: 5,
    },
  ],
};

class Entity extends Phaser.GameObjects.Container {
  public scene: Phaser.Scene;
  public sensorData: Record<string, Set<number>>;
  public facing: number;
  public debugText: Phaser.GameObjects.Text;
  public sprite: Phaser.GameObjects.Sprite;
  public gameObject: PhaserMatterImage;
  public hitbox;
  public stats: EntityStatsType;
  protected keepUpright: boolean;
  protected craftpixOffset: {
    x: number;
    y: number;
  };
  healthText: Phaser.GameObjects.Text;
  protected itemDropPool: ItemDropPoolType[] | undefined;

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
      isStatic,
      itemDropPool,
      collisionCategory,
      collisionMask,
      collideCallback,
      sensorConfig,
      craftpixOffset,
    } = { ...defaultConfig, ...config };

    this.stats = { ...config.stats };
    this.scene = scene;
    this.name = name;
    this.scale = scale;
    this.craftpixOffset = craftpixOffset;
    this.facing = facing;
    this.sensorData = {
      inner: new Set(),
    };
    this.itemDropPool = itemDropPool;
    this.keepUpright = true;

    // sprite
    this.sprite = this.scene.add
      .sprite(this.craftpixOffset.x, this.craftpixOffset.y, this.name)
      .setScale(scale);
    this.add(this.sprite);

    // debug text
    this.debugText = this.scene.add
      .text(0, 0, '', {
        font: '32px Arial',
        align: 'center',
        color: 'aqua',
      })
      .setOrigin(0.5);
    this.add(this.debugText);

    if (isDev) {
      this.healthText = this.scene.add
        .text(x, y - 120, 'HP: ' + this.stats.hp, {
          font: '32px Arial',
          align: 'center',
          color: 'white',
        })
        .setOrigin(0.5);
    }

    this.setDepth(100); // ??

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
    this.hitbox = Bodies.rectangle(0, 0, width, height, {
      ...otherPhysics,
      collisionFilter: {
        category: collisionCategory,
        mask: collisionMask,
        group: 0,
      },
    });

    const { sensorData } = createSensors(this.scene, sensorConfig);
    this.sensorData = sensorData;

    // compound body
    const compoundBody = Body.create({
      parts: [this.hitbox], //, ...sensorBodies],
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
    this.gameObject.setStatic(isStatic);
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

  flashSprite() {
    if (this.scene.tweens.isTweening(this.sprite)) return;
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0,
      duration: 100,
      yoyo: true,
      repeat: 1,
      onCompleteHandler: () => {
        this.sprite.alpha = 1;
      },
    });
  }

  takeDamage(amount: number) {
    if (this.stats.hp <= 0) return;
    this.stats.hp -= amount;
    this.flashSprite();
    if (this.stats.hp < 1) {
      this.stats.hp = 0;
      this.death();
    }
  }

  death() {
    if (isDev) {
      this.healthText.destroy();
    }
    if (this.itemDropPool) {
      spawnItemFromDropPool(this.itemDropPool, this.scene, this.x, this.y);
    }
    this.destroy();
  }

  update(time?: number, delta?: number) {
    super.update(time, delta);
    // this.debugText.text = String(this.stats.hp);
    this.flipXSprite(this.facing === -1);
    this.keepUpRight();
    this.remove(this);
    if (isDev) {
      this.healthText.setPosition(this.x, this.y - 100);
      this.healthText.setText('hp:' + this.stats.hp);
    }
  }
}

export default Entity;
