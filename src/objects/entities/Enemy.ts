import { CC, CM } from "../../enums/CollisionCategories";
import { createBloodEffect } from "../../helpers/bloodParticleEffect";
import { MovementStrategy } from "../../helpers/movement/MovementStrategy";
import Entity, { EntityConfigType } from "./Entity";
import Player from "./Player";

class Enemy extends Entity {
  protected movementStrategy: MovementStrategy;
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: EntityConfigType,
  ) {
    super(scene, x, y, config);
    
    this.hitbox.onCollideCallback = (
      data: Phaser.Types.Physics.Matter.MatterCollisionData,
    ) => {

      if (data.bodyB.collisionFilter.category === CC.player) {
        console.log('asdasd');
        const player = data.bodyB.gameObject as Player;
        player.takeDamage(1);
      }
    };
  }
 
  death() {
    createBloodEffect(this.scene, this.x, this.y);
    this.healthText.destroy();
    this.destroy();
  }

  update(time?: number, delta?: number) {
    this.movementStrategy?.move(this, time, delta);
    super.update(time, delta);
  }
}

export default Enemy;