// DiamondPatternMovementStrategy.ts
import { MovementStrategy } from './MovementStrategy';

export class DiagonalBounceMovement implements MovementStrategy {
  private possibleVelocities: { x: number; y: number }[];
  private currentVelocity: { x: number; y: number };
  private changeInterval: number;
  private timeSinceLastChange: number = 0;

  constructor(velocity: number, changeInterval: number) {
    this.changeInterval = changeInterval;

    // Define possible diagonal velocities
    this.possibleVelocities = [
      { x: velocity, y: -velocity }, // Up-right
      { x: velocity, y: velocity }, // Down-right
      { x: -velocity, y: velocity }, // Down-left
      { x: -velocity, y: -velocity }, // Up-left
    ];

    // Pick an initial random velocity
    this.currentVelocity = this.getRandomVelocity();
  }

  private getRandomVelocity(): { x: number; y: number } {
    // Randomly select a new velocity from the possible velocities
    return this.possibleVelocities[
      Phaser.Math.Between(0, this.possibleVelocities.length - 1)
    ];
  }

  move(enemy: Phaser.GameObjects.Container, time: number, delta: number): void {
    // Update enemy position based on the current random velocity
    enemy.x += this.currentVelocity.x * delta;
    enemy.y += this.currentVelocity.y * delta;

    // Update the timer for direction change
    this.timeSinceLastChange += delta;

    // Check if it's time to change direction
    if (this.timeSinceLastChange >= this.changeInterval) {
      // Select a new random velocity
      this.currentVelocity = this.getRandomVelocity();
      this.timeSinceLastChange = 0; // Reset timer
    }
  }
}
