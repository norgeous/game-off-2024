// DiamondPatternMovementStrategy.ts
import Entity from '../../objects/entities/Entity';
import { MovementStrategy } from './MovementStrategy';

export class DiagonalBounceMovement implements MovementStrategy {
  private possibleVelocities: { x: number; y: number }[];
  private currentVelocity: { x: number; y: number };
  private changeInterval: number;
  private timeSinceLastChange: number = 0;

  // Change direction after x amount of time or when we collide with an object.
  constructor(velocity: number, changeInterval: number, enemy: Entity) {
    this.changeInterval = changeInterval;

    // Define possible diagonal velocities
    this.possibleVelocities = [
      { x: velocity, y: -velocity }, // Up-right
      { x: velocity, y: velocity }, // Down-right
      { x: -velocity, y: velocity }, // Down-left
      { x: -velocity, y: -velocity }, // Up-left
    ];

    enemy.hitbox.onCollideCallback = () => {
      this.currentVelocity = this.getRandomVelocity();
    };

    this.currentVelocity = this.getRandomVelocity();
  }

  private getRandomVelocity(): { x: number; y: number } {
    return this.possibleVelocities[
      Phaser.Math.Between(0, this.possibleVelocities.length - 1)
    ];
  }

  move(enemy: Entity, _time: number, delta: number): void {
    enemy.x += this.currentVelocity.x * delta;
    enemy.y += this.currentVelocity.y * delta;

    this.timeSinceLastChange += delta;

    if (this.timeSinceLastChange >= this.changeInterval) {
      this.currentVelocity = this.getRandomVelocity();
      this.timeSinceLastChange = 0;
    }
  }
}
