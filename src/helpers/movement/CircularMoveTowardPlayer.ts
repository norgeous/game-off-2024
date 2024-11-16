import { TiledMapTest2 } from '../../scenes/TiledMapTest2';
import Entity from '../../objects/entities/Entity';
import { MovementStrategy } from './MovementStrategy';

const circlingSpeedMultiplier: number = 0.1;
const radius: number = 1;
const moveSpeedMultiplier: number = 10;
const circleDurationMin: number = 1000;
const circleDurationMax: number = 5000;

export class CircularMoveTowardPlayer implements MovementStrategy {
  private angle: number = 0;
  private targetX: number = 0;
  private targetY: number = 0;
  private moveTowards: boolean = false;
  private circleDuration: number;
  private elapsedTime: number = 0;
  private map: TiledMapTest2;

  constructor(map: TiledMapTest2) {
    this.map = map;
    this.setRandomCirclingDuration();
  }

  setRandomCirclingDuration() {
    this.circleDuration =
      Math.random() * (circleDurationMax - circleDurationMin) +
      circleDurationMin;
  }

  move(entity: Entity, _time: number, delta: number): void {
    if (this.moveTowards) {
      const dx = this.targetX - entity.x;
      const dy = this.targetY - entity.y;

      const angle = Math.atan2(dy, dx);

      const moveX =
        Math.cos(angle) * entity.stats.speed * moveSpeedMultiplier * delta;
      const moveY =
        Math.sin(angle) * entity.stats.speed * moveSpeedMultiplier * delta;

      entity.x += moveX;
      entity.y += moveY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < entity.stats.speed * delta * moveSpeedMultiplier) {
        this.moveTowards = false;

        this.angle = Math.atan2(
          entity.y - this.map.player.y,
          entity.x - this.map.player.x,
        );
        this.elapsedTime = 0;
      }
    } else {
      this.angle +=
        (entity.stats.speed * circlingSpeedMultiplier * delta) / radius;
      const offsetX = Math.cos(this.angle) * radius;
      const offsetY = Math.sin(this.angle) * radius;
      entity.x += offsetX;
      entity.y += offsetY;

      this.elapsedTime += delta;

      if (this.elapsedTime >= this.circleDuration) {
        this.targetX = this.map.player.x;
        this.targetY = this.map.player.y;
        this.moveTowards = true;
        this.setRandomCirclingDuration();
      }
    }
  }
}
