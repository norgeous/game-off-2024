import { createBloodEffect } from '../../helpers/bloodParticleEffect';
import { MovementStrategy } from '../../helpers/movement/MovementStrategy';
import Entity, { EntityConfigType } from './Entity';

class Enemy extends Entity {
  protected movementStrategy: MovementStrategy;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: EntityConfigType,
  ) {
    super(scene, x, y, config);
  }

  death() {
    createBloodEffect(this.scene, this.x, this.y);
    super.death();
  }

  update(time?: number, delta?: number) {
    this.movementStrategy?.move(this, time, delta);
    super.update(time, delta);
  }
}

export default Enemy;
