import { TiledMapTest2 } from '../../scenes/TiledMapTest2';
import Entity from '../../objects/entities/Entity';
import { MovementStrategy } from './MovementStrategy';
import PathFinding from '../../objects/PathFinding';

export class PredictionMovement implements MovementStrategy {
  private map: TiledMapTest2;
  pathFinding: PathFinding;

  constructor(map: TiledMapTest2) {
    this.map = map;
    this.pathFinding = new PathFinding();
  }

  move(entity: Entity, _time: number, _delta: number): void {
    let predictedX = this.map.player.x + this.map.player.getVelocity().x * 100;
    let predictedY = this.map.player.y + this.map.player.getVelocity().y * 100;

    this.pathFinding.createPath({ x: entity.x, y: entity.y }, { x: predictedX, y: predictedY}, true)
    const currentTarget = this.pathFinding.getNearestPoint(entity.x, entity.y);

    let angle = Phaser.Math.Angle.Between(entity.x, entity.y, currentTarget.x, currentTarget.y);
    entity.x += Math.cos(angle) / 0.9;
    entity.y += Math.sin(angle) / 0.9;
  }
}
