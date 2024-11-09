import convertTiledPolygonToGameObject from '../../helpers/convertTiledPolygonToGameObject';
import Phaser from 'phaser';

type LayerConfigType = {
  tiledLayerName: string;
  depth: number;
};

type SpawnerConfigType = {
  tiledObjectName: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  classFactory: Function; // scene.add.group expects the classType to be Function
  maxSize: number;
  runChildUpdate: boolean;
  autoSpawn: boolean;
};

export type LevelConfigType = {
  key: string;
  tilesetPng: string;
  tiledMapJson: string;
  tileWidth?: number;
  tileHeight?: number;
  tileMargin?: number;
  tileSpacing?: number;
  layerConfig: LayerConfigType[];
  spawnerConfig: SpawnerConfigType[];
};

type LayersObjType = Record<string, Phaser.Tilemaps.TilemapLayer>;

type SpawnersObjType = Record<string, Phaser.GameObjects.Group>;

function createLevelConfig(config: LevelConfigType): LevelConfigType {
  return {
    ...config,
    tileWidth: config.tileWidth ?? 64,
    tileHeight: config.tileHeight ?? 64,
    tileMargin: config.tileMargin ?? 0,
    tileSpacing: config.tileSpacing ?? 0,
    spawnerConfig: [],
  };
}

class TiledMapBuilder {
  private level: Phaser.Tilemaps.Tilemap | undefined;
  private layers: LayersObjType = {};
  public spawners: SpawnersObjType = {};

  static preload(scene: Phaser.Scene, levelConfig: LevelConfigType) {
    const { key, tilesetPng, tiledMapJson, spawnerConfig } =
      createLevelConfig(levelConfig);

    scene.load.image('tileSheet', tilesetPng);
    scene.load.tilemapTiledJSON(key, tiledMapJson);
    for (let i = 0; i < spawnerConfig.length; i += 1) {
      const { classFactory } = spawnerConfig[i];
      // @ts-expect-error preload static bug - perhaps separate out the preload into new functions to not pollute strong typed classes
      classFactory.preload(scene);
    }
  }

  constructor(scene: Phaser.Scene, levelConfig: LevelConfigType) {
    const {
      key,
      tileWidth,
      tileHeight,
      tileMargin,
      tileSpacing,
      layerConfig,
      spawnerConfig,
    } = levelConfig;

    // load tiles
    this.level = scene.make.tilemap({ key });
    this.level.addTilesetImage(
      'tiles', // this has to match the name of the tilesheet in Tiled
      'tileSheet',
      tileWidth,
      tileHeight,
      tileMargin,
      tileSpacing,
    );

    // load image layers
    this.layers = layerConfig.reduce((acc, { tiledLayerName, depth }) => {
      const layer = this.level?.createLayer(tiledLayerName, 'tiles');
      if (!layer) return acc;
      layer.setDepth(depth);
      return { ...acc, [tiledLayerName]: layer };
    }, {});

    // load geometry layer
    const geometry = this.level.getObjectLayer('geometry')?.objects || [];
    geometry.reduce((acc, tiledObject) => {
      const { x, y, polygon } = tiledObject;
      if (!x || !y || !polygon) return acc;
      const newGeometry = convertTiledPolygonToGameObject(scene, {
        x,
        y,
        polygon,
      });
      if (!newGeometry) return acc;
      return [...acc, newGeometry];
    }, [] as Phaser.GameObjects.GameObject[]);

    // for each entry in the spawnerConfig, create a group
    const spawnersT = this.level.getObjectLayer('markers')?.objects || [];
    this.spawners = spawnerConfig.reduce(
      (
        acc,
        { tiledObjectName, classFactory, maxSize, runChildUpdate, autoSpawn },
      ) => {
        const group = scene.add.group({
          maxSize,
          classType: classFactory,
          runChildUpdate,
        });

        if (autoSpawn) {
          const locations = spawnersT.filter(
            ({ name }) => name === tiledObjectName,
          );

          for (let i = 0; i < locations.length; i += 1) {
            const { x, y } = locations[i];
            group.get(x, y);
          }
        }

        return {
          ...acc,
          [tiledObjectName]: group,
        };
      },
      {},
    );

    // set the world boundry same size as background
    const { x, y, width, height } = this.layers.tiledLayer;
    scene.matter.world.setBounds(x, y, width, height, 1024);
  }

  // update(time: number, delta: number) {}
}

export default TiledMapBuilder;
