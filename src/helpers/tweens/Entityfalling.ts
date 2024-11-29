import Entity from '../../objects/entities/Entity';

export const entityFalling = (
  scene: Phaser.Scene,
  entity: Entity,
  onCompleteCallback: Function,
) => {
  entity.gameObject.setStatic(true);
  entity.scene.tweens.add({
    targets: entity.gameObject,
    scaleX: 0.1,
    scaleY: 0.1,
    alpha: 0,
    ease: 'Linear',
    duration: 1000,
    onComplete: () => {
      onCompleteCallback();
      entity.gameObject.setStatic(false);
      entity.gameObject.alpha = 1;
      entity.gameObject.scaleX = 1;
      entity.gameObject.scaleY = 1;
    },
  });
};
