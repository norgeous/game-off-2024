import convertTiledPolygonToGameObject from '../helpers/convertTiledPolygonToGameObject';
import roomConfig0 from './room-config-0';
import roomConfig3 from './room-config-3';

const roomConfigs = {
  '0': roomConfig0,
  '3': roomConfig3,
};

export type RoomType = keyof typeof roomConfigs;

export const getRoomConfig = (roomType: RoomType) => roomConfigs[roomType];

export const preloadRoom = (scene: Phaser.Scene, roomType: RoomType) => {
  const key = `room-${roomType}`;
  const {
    music,
    tiled: { tiledMapJson, images, spawnerConfig },
  } = getRoomConfig(roomType);

  // enqueue the tiled json file to loader
  scene.load.tilemapTiledJSON(key, tiledMapJson);

  // load tile sheet pngs
  images.forEach(({ key, file }) => scene.load.image(key, file));

  // load music files
  music.forEach(({ key, file }) => scene.load.audio(key, file));

  // load the enemies (images and sound)
  spawnerConfig.forEach(({ classFactory }) => classFactory.preload(scene));
};

export const createRoom = (scene: Phaser.Scene, roomType: RoomType) => {
  const key = `room-${roomType}`;
  const {
    tiled: { images, layerConfig, spawnerConfig },
  } = getRoomConfig(roomType);

  // load the tiles from the Tiled json
  const level = scene.make.tilemap({ key });

  // add the tileset images into the level
  images.forEach(({ key }) => level.addTilesetImage(key, key));

  // build layers from layerConfig
  layerConfig.map(({ tiledLayerName, depth }) =>
    level
      .createLayer(
        tiledLayerName,
        images.map(({ key }) => key),
      )
      ?.setDepth(depth),
  );

  // set the world boundry same size as Tiled map
  scene.matter.world.setBounds(
    0,
    0,
    level.widthInPixels,
    level.heightInPixels,
    2 ** 10,
  );
  (scene.matter.world.walls.top as MatterJS.BodyType).label =
    'boundry-wall-north';
  (scene.matter.world.walls.bottom as MatterJS.BodyType).label =
    'boundry-wall-south';
  (scene.matter.world.walls.left as MatterJS.BodyType).label =
    'boundry-wall-west';
  (scene.matter.world.walls.right as MatterJS.BodyType).label =
    'boundry-wall-east';

  // setup polygons
  const geometry = level?.getObjectLayer('geometry')?.objects || [];
  geometry.reduce((acc, tiledObject) => {
    const { x, y, polygon } = tiledObject;
    console.log({ x, y, polygon });
    if (!x || !y || !polygon) return acc;
    const newGeometry = convertTiledPolygonToGameObject(scene, {
      x,
      y,
      polygon,
    });
    if (!newGeometry) return acc;
    return [...acc, newGeometry];
  }, [] as Phaser.GameObjects.GameObject[]);

  // setup spawners
  const markers = level.getObjectLayer('markers')?.objects || [];
  const spawners = spawnerConfig.reduce(
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
        const locations = markers.filter(
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

  return { level, spawners };
};
