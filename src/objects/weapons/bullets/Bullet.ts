import { CC, CM } from '../../../enums/CollisionCategories';
import Projectile, { ProjectileConfigType } from '../Projectile';

const projectileConfig: ProjectileConfigType = {
  key: 'bullet',
  assetName: 'bullet.png',
  scale: 0.2,
  stats: {
    damage: 1,
  },
  collisionCategory: CC.playerBullet,
  collisionMask: CM.playerBullet,
  chamferRadius: 15,
  timeToLive: 400,
  physicsConfig: {
    ejectionForce: 0.01,
  },
  onEntityHitCallBack: (projectile, entity) => {
    entity.takeDamage(projectile.stats.damage);
  },
};

class Bullet extends Projectile {
  static preload(scene: Phaser.Scene) {
    scene.load.image('bullet', 'assets/bullet.png');
  }
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, projectileConfig);
  }

  update(time: number) {
    super.update(time);
  }
}

export default Bullet;
