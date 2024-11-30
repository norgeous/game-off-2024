import { CC, CM } from '../../../enums/CollisionCategories';
import Projectile, { ProjectileConfigType } from '../Projectile';

const projectileConfig: ProjectileConfigType = {
  key: 'star',
  assetName: 'star.png',
  scale: 0.5,
  stats: {
    damage: 1,
  },
  collisionCategory: CC.playerBullet,
  collisionMask: CM.playerBullet,
  chamferRadius: 15,
  timeToLive: 400,
  physicsConfig: {
    ejectionForce: 0.05,
  },
  onEntityHitCallBack: (projectile, entity) => {
    entity.takeDamage(projectile.stats.damage);
  },
};

class StarBullet extends Projectile {
  static preload(scene: Phaser.Scene) {
    scene.load.image('star', 'star.png');
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, projectileConfig);
  }

  update(time: number) {
    super.update(time);
  }
}

export default StarBullet;
