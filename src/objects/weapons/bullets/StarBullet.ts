import { CC, CM } from '../../../enums/CollisionCategories';
import Projectile, { ProjectileConfigType } from '../projectile';

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
  timeToLive: 5_000,
  physicsConfig: {
    ejectionForce: 0.05
  },
  onEntityHitCallBack: (projectile, entity) => {
    entity.takeDamage(projectile.stats.damage);
  }
}

class StarBullet extends Projectile {
  static preload(scene: Phaser.Scene) {
    scene.load.image('star', 'star.png');
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, projectileConfig);
  }

  update(_time: number, _delta: number) {
    super.update(_time, _delta);
  }
}

export default StarBullet;
