import { TiledMapTest2 } from '../../scenes/TiledMapTest2';
import Entity from '../../objects/entities/Entity';
import { MovementStrategy } from './MovementStrategy';
import TiledMapBuilder from '../../objects/map/TiledMapBuilder';

const moveSpeedMultiplier: number = 2;

export class MoveToPlayer implements MovementStrategy {
  private scene: TiledMapTest2;
  private map: TiledMapBuilder | undefined;
  private currentTarget; 

  private targetX: number = 0;
  private targetY: number = 0;

  constructor(scene: TiledMapTest2) {
    this.scene = scene;
    this.map = scene.map;
  }

  move(entity: Entity, _time: number, delta: number): void {
    if (!this.scene.navMesh) {
      return;
    }
    const path = this.scene.navMesh.findPath({ x: entity.x, y: entity.y }, { x:  this.scene.player.x, y:  this.scene.player.y});

    // console.log(this.map?.navMesh);
    // console.log(path);
  
    // Visualize an individual path
    this.scene.navMesh.enableDebug(); // Creates a Phaser.Graphics overlay on top of the screen
    this.scene.navMesh.debugDrawClear(); // Clears the overlay
    // Visualize the underlying navmesh
    this.scene.navMesh.debugDrawPath(path, 0xffd900);
    
    if (path === null) return;
    if (path && path.length > 0) this.currentTarget = path.shift();
    
    if (this.currentTarget) {
      // Check if we have reached the current target (within a fudge factor)
      const { x, y } = this.currentTarget;
      const distance = Phaser.Math.Distance.Between(this.currentTarget.x, this.currentTarget.y, x, y);

      if (distance < 5) {
        // If there is path left, grab the next point. Otherwise, null the target.
        if (path.length > 0) this.currentTarget = path.shift();
        else this.currentTarget = null;
      }

      if (this.currentTarget) { 

        const dx = this.currentTarget.x - entity.x;
        const dy = this.currentTarget.y - entity.y;

        const angle = Math.atan2(dy, dx);

        const moveX =
        Math.cos(angle) * entity.stats.speed * moveSpeedMultiplier * delta;
        const moveY =
        Math.sin(angle) * entity.stats.speed * moveSpeedMultiplier * delta;

        entity.x += moveX;
        entity.y += moveY;
      }
    } 
  }
}
