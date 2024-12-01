import { Events } from 'phaser';

export enum EventNames {
  READY = 'current-scene-ready',
  RESPAWN_PLAYER = 'respawn-player',
  START = 'start-dungeon',
  USE_DOOR = 'use-door',
  UPDATE_PLAYER_STATS = 'update-player-stats',
  COLLECT_ITEM = 'collect-item',
  COMPLETE_DUNGEON = 'complete-dungeon'
}

// Used to emit events between React components and Phaser scenes
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Events.EventEmitter
export const EventBus = new Events.EventEmitter();
