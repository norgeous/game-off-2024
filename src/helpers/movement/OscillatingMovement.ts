import Entity from '../../objects/entities/Entity';
import { MovementStrategy } from './MovementStrategy';
import { TiledMapTest2 } from '../../scenes/TiledMapTest2';
import PathFinding from '../../objects/PathFinding';

export class OscillatingMovement implements MovementStrategy {
  private frequency: number;
  private amplitude: number;
  private scene: TiledMapTest2;
  private ySpeedFactor: number;
  pathFinding: PathFinding;

  constructor(
    frequency: number,
    amplitude: number,
    TiledMapTest2: TiledMapTest2,
    ySpeedFactor: number = 2,
  ) {
    this.frequency = frequency;
    this.amplitude = amplitude;
    this.ySpeedFactor = ySpeedFactor;
    this.scene = TiledMapTest2;
    this.pathFinding = new PathFinding();
  }

  move(entity: Entity, time: number, delta: number): void {

    this.pathFinding.createPath({ x: entity.x, y: entity.y }, { x: this.scene.player.x, y: this.scene.player.y}, true)
    const currentTarget = this.pathFinding.getNearestPoint(entity.x, entity.y);
    if (!currentTarget) return;
      
    const dx = currentTarget.x - entity.x;
    const dy = currentTarget.y - entity.y;
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
