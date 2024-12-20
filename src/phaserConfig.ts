import { AUTO, Game } from 'phaser';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';
import { Room } from './scenes/Room';
import { GameOver } from './scenes/GameOver';
import { Win } from './scenes/Win';
import { Shop } from './scenes/Shop';

import isDev from './helpers/isDev';

const VIEWPORT_SIZE = 80;

const debug = {
  showBody: true,
  showStaticBody: true,
};

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 16 * VIEWPORT_SIZE,
  height: 9 * VIEWPORT_SIZE,
  parent: 'game-container',
  backgroundColor: '#000000',
  physics: {
    default: 'matter',
    matter: {
      // enableSleeping: true,
      ...(isDev && { debug }),
      gravity: { x: 0, y: 0 },
    },
  },
  fps: {
    min: 60,
    limit: 60,
  },
  // input: { activePointers: 2 },
  scene: [Boot, Preloader, MainMenu, Room, GameOver, Win, Shop],
};

const startGame = (parent: string) => new Game({ ...config, parent });

export default startGame;
