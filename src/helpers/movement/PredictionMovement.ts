import { Room } from '../../scenes/Room';
import Entity from '../../objects/entities/Entity';
import { MovementStrategy } from './MovementStrategy';
import PathFinding from '../../objects/PathFinding';

export class PredictionMovement implements MovementStrategy {
  private map: Room;
  pathFinding: PathFinding;

  constructor(map: Room) {
    this.map = map;
    this.pathFinding = new PathFinding();
  }

  move(entity: Entity, _time: number, _delta: number): void {
    const predictedX =
      this.map.player.x + this.map.player.getVelocity().x * 100;
    const predictedY =
      this.map.player.y + this.map.player.getVelocity().y * 100;

    this.pathFinding.createPath(
      { x: entity.x, y: entity.y },
      { x: predictedX, y: predictedY },
      true,
    );
    const currentTarget = this.pathFinding.getNearestPoint(entity.x, entity.y);
    if (!currentTarget) return;

    const angle = Phaser.Math.Angle.Between(
      entity.x,
      entity.y,
      currentTarget.x,
      currentTarget.y,
    );
    entity.x += Math.cos(angle) * 10 * entity.stats.speed;
    entity.y += Math.sin(angle) * 10 * entity.stats.speed;
  }
}
