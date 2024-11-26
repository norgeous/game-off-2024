import { CC, CM } from '../../enums/CollisionCategories';
import Entity from '../entities/Entity';

export type ProjectilePhysicsConfig = {
  friction?: number;
  frictionAir?: number;
  ejectionForce: number;
};

export type ProjectileStats = {
  damage: number;
};

export type ProjectileConfigType = {
  key: string;
  assetName: string;
  scale: number;
  collisionCategory: CC;
  collisionMask: CM;
  chamferRadius: number;
  timeToLive: number;
  physicsConfig: ProjectilePhysicsConfig;
  stats: ProjectileStats;
  destroyOnHit?: boolean;
  onEntityHitCallBack?: (projectile: Projectile, entity: Entity) => void;
};

const defaultConfig: ProjectileConfigType = {
  key: 'projectile',
  assetName: 'projectile-asset',
  scale: 1,
  collisionCategory: CC.playerBullet,
  collisionMask: CM.playerBullet,
  chamferRadius: 1,
  physicsConfig: {
    ejectionForce: 1,
  },
  timeToLive: 1,
  stats: {
    damage: 1,
  },
  destroyOnHit: true,
  onEntityHitCallBack: (projectile, entity) => {
    entity.takeDamage(projectile.stats.damage);
  },
};

class Projectile extends Phaser.GameObjects.Container {
  protected startTime: number;
  protected gameObject: Phaser.Physics.Matter.Sprite;
  private timeToLive: number;
  public stats: ProjectileStats;

  static preload(scene: Phaser.Scene) {
    scene.load.image('whip', 'whip.png');
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: ProjectileConfigType,
  ) {
    super(scene, x, y);
    const {
      key,
      stats,
      chamferRadius,
      timeToLive,
      destroyOnHit,
      collisionCategory,
      collisionMask,
      onEntityHitCallBack,
    } = { ...defaultConfig, ...config };

    this.timeToLive = timeToLive;
    this.stats = stats;

    const enemies = scene.map.spawners.enemy.children.entries;
    if (!enemies[0]) return;

    // Add sprite
    this.gameObject = scene.matter.add
      .sprite(x, y, key, undefined, {
        collisionFilter: {
          category: collisionCategory,
          mask: collisionMask,
        },
        chamfer: { radius: chamferRadius },
        friction: config.physicsConfig.friction ?? 0,
        frictionAir: config.physicsConfig.frictionAir ?? 0,
      })
      .setScale(config.scale);

    this.startTime = window.performance.now();

    const forceVector = new Phaser.Math.Vector2({
      x: enemies[0].x - x,
      y: enemies[0].y - y,
    }).setLength(config.physicsConfig.ejectionForce);

    this.gameObject.setRotation(forceVector.angle());
    this.gameObject.applyForce(forceVector);
    this.gameObject.setOnCollide(
      (data: Phaser.Types.Physics.Matter.MatterCollisionData) => {
        if (data.bodyA?.collisionFilter.category === CC.enemy) {
          onEntityHitCallBack?.(this, data.bodyA.gameObject as Entity);
        }
        destroyOnHit ? this.gameObject.destroy() : null;
      },
    );
  }

  update(_time: number, _delta: number) {
    if (window.performance.now() - this.startTime > this.timeToLive) {
      this.gameObject.destroy();
      this.destroy();
    }
  }
}

export default Projectile;
