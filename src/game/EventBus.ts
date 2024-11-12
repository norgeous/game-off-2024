import { Events } from 'phaser';

export enum EventNames {
  READY = 'current-scene-ready',
  USE_DOOR = 'use-door',
}

// Used to emit events between React components and Phaser scenes
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Events.EventEmitter
export const EventBus = new Events.EventEmitter();
