import { CC, CM } from '../../../enums/CollisionCategories';
import Projectile, { ProjectileConfigType } from '../Projectile';

const projectileConfig: ProjectileConfigType = {
  key: 'whip',
  assetName: 'whip.png',
  scale: 2,
  stats: {
    damage: 1,
  },
  collisionCategory: CC.playerBullet,
  collisionMask: CM.playerBullet,
  chamferRadius: 15,
  timeToLive: 200,
  physicsConfig: {
    ejectionForce: 0.05,
  },
  onEntityHitCallBack: (projectile, entity) => {
    entity.takeDamage(projectile.stats.damage);
  },
};

class WhipBullet extends Projectile {
  static preload(scene: Phaser.Scene) {
    scene.load.image('whip', 'whip.png');
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, projectileConfig);
  }

  update(_time: number, _delta: number) {
    super.update(_time, _delta);
  }
}

export default WhipBullet;
