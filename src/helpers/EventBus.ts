import { Events } from 'phaser';

export enum EventNames {
  READY = 'current-scene-ready',
  RESPAWN_PLAYER = 'respawn-player',
  START = 'start-dungeon',
  USE_DOOR = 'use-door',
  ADJUST_PLAYER_HEALTH = 'adjust-player-health',
  COLLECT_ITEM = 'collect-item',
}

// Used to emit events between React components and Phaser scenes
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Events.EventEmitter
export const EventBus = new Events.EventEmitter();
