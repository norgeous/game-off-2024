import { CC, CM } from '../../../enums/CollisionCategories';

const TTL = 1_000;

class StarBullet extends Phaser.GameObjects.Container {
  static preload(scene: Phaser.Scene) {
    scene.load.image('star', 'assets/star.png');
  }

  private startTime: number;
  private gameObject: Phaser.Physics.Matter.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.gameObject = scene.matter.add
      .sprite(x, y, 'star', undefined, {
        collisionFilter: {
          category: CC.playerBullet,
          mask: CM.playerBullet,
        },
      })
      .setAngularVelocity(1);
    this.startTime = window.performance.now();
    this.gameObject.setScale(0.5);

    const enemies = scene.map.spawners.enemy.children.entries;

    const forceVector = new Phaser.Math.Vector2({
      x: (enemies[0].x - x) * 0.0005,
      y: (enemies[0].y - y) * 0.0005,
    });

    this.gameObject.applyForce(forceVector);
  }

  update(time: number, delta: number) {
    if (window.performance.now() - this.startTime > TTL) {
      this.gameObject.destroy();
      this.destroy();
    }
  }
}

export default StarBullet;
