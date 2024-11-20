import { CC, CM } from '../../../enums/CollisionCategories';

const TTL = 5_000;
const EJECTION_FORCE = 0.05;

class StarBullet extends Phaser.GameObjects.Container {
  static preload(scene: Phaser.Scene) {
    scene.load.image('star', 'assets/star.png');
  }

  private startTime: number;
  private gameObject: Phaser.Physics.Matter.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.gameObject = scene.matter.add.sprite(x, y, 'star', undefined, {
      collisionFilter: {
        category: CC.playerBullet,
        mask: CM.playerBullet,
      },
      chamfer: { radius: 30 },
      friction: 0,
      frictionAir: 0,
    });
    this.startTime = window.performance.now();
    this.gameObject.setScale(0.5);

    const enemies = scene.map.spawners.enemy.children.entries;

    const forceVector = new Phaser.Math.Vector2({
      x: enemies[0].x - x,
      y: enemies[0].y - y,
    }).setLength(EJECTION_FORCE);

    this.gameObject.applyForce(forceVector);
    this.gameObject.setOnCollide(() => this.gameObject.destroy());
  }

  update(time: number, delta: number) {
    if (window.performance.now() - this.startTime > TTL) {
      this.gameObject.destroy();
      this.destroy();
    }
  }
}

export default StarBullet;
