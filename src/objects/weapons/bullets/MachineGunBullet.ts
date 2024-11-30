import { CC, CM } from '../../../enums/CollisionCategories';
import Projectile, { ProjectileConfigType } from '../Projectile';

// 1 shot every 200ms at 0.3dmg
// 0.3/(200ms/1000ms) = 1.5DPS
const projectileConfig: ProjectileConfigType = {
  key: 'machinegun-bullet',
  assetName: 'machinegun-bullet.png',
  scale: 0.1,
  stats: {
    damage: 0.5,
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

class MachinegunBullet extends Projectile {
  static preload(scene: Phaser.Scene) {
    scene.load.image('machinegun-bullet', 'assets/items/weapons/bullets/machinegun-bullet.png');
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, projectileConfig);
  }
  
  update(time: number) {
    super.update(time);
  }
}

export default MachinegunBullet;
