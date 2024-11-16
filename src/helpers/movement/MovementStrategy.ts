import Entity from '../../objects/entities/Entity';

export interface MovementStrategy {
  move(entity: Entity, time?: number, delta?: number): void;
}
