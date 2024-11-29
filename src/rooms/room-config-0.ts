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
    tiledMapJson: './tiled/rooms/room-0.json',
    images: [
      {
        key: 'floor2',
        file: './assets/levels/floor2.png',
      },
      {
        key: 'walls2',
        file: './assets/levels/walls2.png',
      },
      // {
      //   key: 'obsticles',
      //   file: './assets/obsticles/pots-and-rocks.png',
      // },
    ],
    layerConfig: [
      { tiledLayerName: 'floor', depth: 0 },
      { tiledLayerName: 'walls', depth: 0 },
      //{ tiledLayerName: 'obsticles', depth: 2 },
    ],
    spawnerConfig: [],
  },
};
