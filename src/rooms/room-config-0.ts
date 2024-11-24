export default {
  music: [
    { key: 'arab', file: './assets/audio/music/arab-and-muslim-190765.mp3' },
    {
      key: 'gypsy',
      file: './assets/audio/music/gypsy-animated-music-252548.mp3',
    },
    {
      key: 'punch',
      file: './assets/audio/music/punch-deck-brazilian-street-fight(chosic.com).mp3',
    },
  ],
  tiled: {
    tiledMapJson: './tiled/maps/rooms/room-0.json',
    images: [
      {
        key: 'tiles1',
        file: './assets/levels/ai-egypt-1.png',
      },
      {
        key: 'extra',
        file: './assets/levels/ai-egypt-2.png',
      },
    ],
    layerConfig: [
      { tiledLayerName: 'tiledLayer', tileKeys: ['tiles1'], depth: 0 },
    ],
    spawnerConfig: [],
  },
};
