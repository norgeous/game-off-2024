import { TiledMapTest2 } from '../../scenes/TiledMapTest2';
import Entity from '../../objects/entities/Entity';
import { MovementStrategy } from './MovementStrategy';
import PathFinding from '../../objects/PathFinding';

const moveSpeedMultiplier: number = 2;

export class MoveToPlayer implements MovementStrategy {
  private scene: TiledMapTest2;
  pathFinding: PathFinding;

  constructor(scene: TiledMapTest2) {
    this.scene = scene;
    this.pathFinding = new PathFinding();
  }
  
  move(entity: Entity, _time: number, delta: number): void {
    this.pathFinding.createPath({ x: entity.x, y: entity.y }, { x: this.scene.player.x, y: this.scene.player.y}, true)
    const currentTarget = this.pathFinding.getNearestPoint(entity.x, entity.y);
    
    if (currentTarget) { 
      const dx = currentTarget.x - entity.x;
      const dy = currentTarget.y - entity.y;

      const angle = Math.atan2(dy, dx);

      const moveX = Math.cos(angle) * entity.stats.speed * moveSpeedMultiplier * delta;
      const moveY = Math.sin(angle) * entity.stats.speed * moveSpeedMultiplier * delta;

      entity.x += moveX;
      entity.y += moveY;
    }
  }
}
