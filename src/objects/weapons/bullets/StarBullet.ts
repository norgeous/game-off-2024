import { CC, CM } from '../../../enums/CollisionCategories';

class StarBullet {
  static preload(scene: Phaser.Scene) {
    scene.load.image('star', 'assets/star.png');
  }

  private startTime: number;
  private gameObject: Phaser.Physics.Matter.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.gameObject = scene.matter.add
      .sprite(x, y, 'star', undefined, {
        collisionFilter: {
          category: CC.playerBullet,
          mask: CM.playerBullet,
        },
      })
      .setAngularVelocity(100);
    this.startTime = window.performance.now();
  }

  update(time: number, delta: number) {
    console.log(this.gameObject, this.startTime, window.performance.now());
  }
}

export default StarBullet;
