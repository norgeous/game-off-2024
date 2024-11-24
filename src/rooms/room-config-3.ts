import { getRandomEnemy } from '../helpers/getRandomEnemy';

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
    tiledMapJson: './tiled/maps/rooms/room-3.json',
    images: [
      {
        key: 'tiles2',
        file: './assets/levels/ai-egypt-2.png',
      },
      {
        key: 'items',
        file: './assets/items.png',
      },
    ],
    layerConfig: [
      { tiledLayerName: 'tiledLayer', tileKeys: ['tiles2', 'items'], depth: 0 },
    ],
    spawnerConfig: [
      {
        tiledObjectName: 'enemy',
        classFactory: getRandomEnemy(),
        maxSize: 10,
        runChildUpdate: true,
        autoSpawn: true,
      },
    ],
  },
};
