import { getRandomEnemy } from '../helpers/getRandomEnemy';
import Bat from '../objects/entities/mobs/Bat';

export default {
  music: [
    { key: 'arab', file: './audio/music/arab-and-muslim-190765.mp3' },
    { key: 'gypsy', file: './audio/music/gypsy-animated-music-252548.mp3' },
    {
      key: 'punch',
      file: './audio/music/punch-deck-brazilian-street-fight(chosic.com).mp3',
    },
  ],
  tiled: {
    tiledMapJson: './tiled/rooms/room-3.json',
    images: [
      {
        key: 'floor1',
        file: './assets/levels/floor1.png',
      },
      {
        key: 'walls7',
        file: './assets/levels/walls7.png',
      },
      {
        key: 'items',
        file: './assets/items.png',
      },
    ],
    layerConfig: [
      { tiledLayerName: 'floor', depth: 0 },
      { tiledLayerName: 'walls', depth: 0 },
      { tiledLayerName: 'obsticles', depth: 0 },
    ],
    spawnerConfig: [
      {
        tiledObjectName: 'enemy',
        classFactory: Bat,
        maxSize: 10,
        runChildUpdate: true,
        autoSpawn: true,
      },
    ],
  },
};
