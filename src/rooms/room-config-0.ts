export default {
  music: '',
  tilemaps: [
    { key: '', png: '', roomJson: '' },
    { key: '', png: '', roomJson: '' },
  ],
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [
    {
      tiledObjectName: 'enemy',
      classFactory: getRandomEnemy(),
      maxSize: 10,
      runChildUpdate: true,
      autoSpawn: true,
    },
  ],
};
