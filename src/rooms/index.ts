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

  const level = scene.make.tilemap({ key }); // load the tiles from the Tiled json
  const {
    tiled: { images, layerConfig },
  } = getRoomConfig(roomType);

  // add the tileset images into the level
  images.forEach(({ key }) => level.addTilesetImage(key, key));

  // build layers
  layerConfig.map(({ tiledLayerName, tileKey, depth }) =>
    level.createLayer(tiledLayerName, tileKey)?.setDepth(depth),
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

  return { level };
};
