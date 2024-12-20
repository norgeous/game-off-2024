import { CC, CM } from '../../enums/CollisionCategories';
import { EventBus, EventNames } from '../../helpers/EventBus';
import Player from '../entities/Player';

export type ItemConfigType = {
  key: string;
  scale: number;
  collisionCategory: CC;
  collisionMask: CM;
  onPickUpCallBack?: (item: Item, entity: Player) => void;
  onPickUpAnimation?: (item: Item) => void;
  matterConfig?: Phaser.Types.Physics.Matter.MatterBodyConfig;
};

const defaultConfig: ItemConfigType = {
  key: 'item',
  scale: 1,
  collisionCategory: CC.playerBullet,
  collisionMask: CM.playerBullet,
  onPickUpAnimation(item) {
    item.scene.tweens.add({
      targets: item.gameObject,
      x: item.x,
      y: item.y,
      scaleX: 0.5,
      scaleY: 0.5,
      alpha: 0,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        if (item.tween !== undefined) item.tween.stop();
        item.gameObject.destroy();
      },
    });
  },
};

class Item extends Phaser.GameObjects.Container {
  gameObject: Phaser.Physics.Matter.Sprite;
  destroyOnPickUp: boolean;
  sprite: Phaser.GameObjects.Sprite;
  public tween: Phaser.Tweens.Tween;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: ItemConfigType,
  ) {
    super(scene, x, y);
    const {
      collisionCategory,
      collisionMask,
      key,
      scale,
      onPickUpAnimation,
      onPickUpCallBack,
      matterConfig,
    } = { ...defaultConfig, ...config };

    // Add sprite
    this.gameObject = scene.matter.add
      .sprite(x, y, key, undefined, {
        ...matterConfig,
        collisionFilter: {
          category: collisionCategory,
          mask: collisionMask,
        },
      })
      .setScale(scale)
      .setStatic(true);

    this.gameObject.setOnCollide(
      (data: Phaser.Types.Physics.Matter.MatterCollisionData) => {
        if (data.bodyB?.collisionFilter.category === CC.player) {
          onPickUpCallBack?.(this, data.bodyB.gameObject as Player);
          scene.matter.world.remove(this.gameObject);
          onPickUpAnimation?.(this);
          EventBus.emit(EventNames.COLLECT_ITEM, scene, key);
        }
        if (data.bodyA?.collisionFilter.category === CC.player) {
          onPickUpCallBack?.(this, data.bodyA.gameObject as Player);
          scene.matter.world.remove(this.gameObject);
          onPickUpAnimation?.(this);
          EventBus.emit(EventNames.COLLECT_ITEM, scene, key);
        }
      },
    );
  }

  update(_time: number, _delta: number) {}
}

export default Item;
