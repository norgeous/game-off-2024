import { getRandomEnemy } from '../helpers/getRandomEnemy';
import Scroll from '../objects/items/Scroll';

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
    tiledMapJson: './tiled/rooms/room-1.json',
    images: [
      {
        key: 'floor2',
        file: './assets/levels/floor2.png',
      },
      {
        key: 'walls4',
        file: './assets/levels/walls4.png',
      },
      {
        key: 'obsticles',
        file: './assets/obsticles/pots-and-rocks.png',
      },
    ],
    layerConfig: [
      { tiledLayerName: 'floor', depth: 0 },
      { tiledLayerName: 'walls', depth: 0 },
      { tiledLayerName: 'obsticles-background', depth: 0 },
      { tiledLayerName: 'obsticles-midground', depth: 0 },
      { tiledLayerName: 'obsticles-foreground', depth: 0 },
    ],
    spawnerConfig: [
      {
        tiledObjectName: 'enemy',
        classFactory: getRandomEnemy(),
        maxSize: 10,
        runChildUpdate: true,
        autoSpawn: true,
      },
      {
        tiledObjectName: 'scroll',
        classFactory: Scroll,
        maxSize: 10,
        runChildUpdate: true,
        autoSpawn: true,
      },
    ],
  },
};
