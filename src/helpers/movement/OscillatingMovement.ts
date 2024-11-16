import Entity from '../../objects/entities/Entity';
import { MovementStrategy } from './MovementStrategy';
import { TiledMapTest2 } from '../../scenes/TiledMapTest2';

export class OscillatingMovement implements MovementStrategy {
  private frequency: number;
  private amplitude: number;
  private map: TiledMapTest2;
  private ySpeedFactor: number;

  constructor(
    frequency: number,
    amplitude: number,
    TiledMapTest2: TiledMapTest2,
    ySpeedFactor: number = 2,
  ) {
    this.frequency = frequency;
    this.amplitude = amplitude;
    this.ySpeedFactor = ySpeedFactor;
    this.map = TiledMapTest2;
  }

  move(entity: Entity, time: number, delta: number): void {
    const dx = this.map.player.x - entity.x;
    const dy = this.map.player.y - entity.y;
    const angle = Math.atan2(dy, dx);

    const xMovement = Math.cos(angle) * entity.stats.speed * delta;
    const yMovement = Math.sin(angle) * entity.stats.speed * delta;

    const zigzagOffsetX =
      Math.sin((time * this.frequency) / (10 * this.ySpeedFactor)) *
      this.amplitude *
      Math.cos(angle + Math.PI / 2);
    const zigzagOffsetY =
      Math.sin((time * this.frequency) / (10 * this.ySpeedFactor)) *
      this.amplitude *
      Math.sin(angle + Math.PI / 2);

    entity.x += xMovement + zigzagOffsetX;
    entity.y += yMovement + zigzagOffsetY;
  }
}
