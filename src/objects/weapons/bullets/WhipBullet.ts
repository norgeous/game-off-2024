import { CC, CM } from '../../../enums/CollisionCategories';
import Projectile, { ProjectileConfigType } from '../Projectile';

const KEY = 'whip-bullet';

const projectileConfig: ProjectileConfigType = {
  key: KEY,
  assetName: 'whip-bullet.png',
  scale: 2,
  stats: {
    damage: 0.5,
  },
  collisionCategory: CC.playerBullet,
  collisionMask: CM.playerBullet,
  chamferRadius: 15,
  timeToLive: 200,
  physicsConfig: {
    ejectionForce: 0.06,
  },
  onEntityHitCallBack: (projectile, entity) => {
    entity.takeDamage(projectile.stats.damage);
  },
};

class WhipBullet extends Projectile {
  static preload(scene: Phaser.Scene) {
    scene.load.image(KEY, 'assets/items/weapons/bullets/whip-bullet.png');
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, projectileConfig);
  }

  update(time: number) {
    super.update(time);
  }
}

export default WhipBullet;
