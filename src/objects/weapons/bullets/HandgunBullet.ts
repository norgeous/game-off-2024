import { CC, CM } from '../../../enums/CollisionCategories';
import Projectile, { ProjectileConfigType } from '../Projectile';

// 1 shot every 1000ms at 1dmg
// 1/(1000/1000) = 1DPS
const projectileConfig: ProjectileConfigType = {
  key: 'handgun-bullet',
  assetName: 'handgun-bullet.png',
  scale: 0.2,
  stats: {
    damage: 1,
  },
  collisionCategory: CC.playerBullet,
  collisionMask: CM.playerBullet,
  chamferRadius: 15,
  timeToLive: 1400,
  physicsConfig: {
    ejectionForce: 0.01,
  },
  onEntityHitCallBack: (projectile, entity) => {
    entity.takeDamage(projectile.stats.damage);
  },
};

class HandgunBullet extends Projectile {
  static preload(scene: Phaser.Scene) {
    scene.load.image('handgun-bullet', 'assets/items/weapons/bullets/handgun-bullet.png');
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, projectileConfig);
  }

  update(time: number) {
    super.update(time);
  }
}

export default HandgunBullet;
