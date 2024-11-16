import Entity from '../../objects/entities/Entity';
import { MovementStrategy } from './MovementStrategy';

const changeDirectionTimeMin: number = 100; // Time in milliseconds
const changeDirectionTimeMax: number = 1000; // Time in milliseconds

export class RandomLinearMovement implements MovementStrategy {
  private directionX: number;
  private directionY: number;
  private changeDirectionTime: number;
  private lastDirectionChange: number;

  constructor() {
    this.changeDirection();
    this.setRandomDuration();
    this.lastDirectionChange = 0;
  }

  setRandomDuration() {
    this.changeDirectionTime =
      Math.random() * (changeDirectionTimeMax - changeDirectionTimeMin) +
      changeDirectionTimeMin;
  }
  move(entity: Entity, time: number, delta: number): void {
    this.lastDirectionChange += delta;

    if (this.lastDirectionChange >= this.changeDirectionTime) {
      this.changeDirection();
      this.lastDirectionChange = 0;
    }

    entity.x += entity.stats.speed * this.directionX * delta;
    entity.y += entity.stats.speed * this.directionY * delta;
  }

  changeDirection(): void {
    const directions = [
      { x: 1, y: 0 }, // Right
      { x: -1, y: 0 }, // Left
      { x: 0, y: 1 }, // Down
      { x: 0, y: -1 }, // Up
      { x: 1, y: 1 }, // Bottom-right
      { x: -1, y: 1 }, // Bottom-left
      { x: 1, y: -1 }, // Top-right
      { x: -1, y: -1 }, // Top-left
    ];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    this.directionX = randomDirection.x;
    this.directionY = randomDirection.y;
    this.setRandomDuration();
  }
}
