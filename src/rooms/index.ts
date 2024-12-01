import convertTiledPolygonToGameObject from '../helpers/convertTiledPolygonToGameObject';
import roomConfigDOT from './room-config-.';
import roomConfigPERCENT from './room-config-PERCENT';
import roomConfig0 from './room-config-0';
import roomConfig1 from './room-config-1';
import roomConfig2 from './room-config-2';
import roomConfig3 from './room-config-3';
import roomConfig4 from './room-config-4';
import roomConfig5 from './room-config-5';
import roomConfig6 from './room-config-6';
import roomConfig7 from './room-config-7';
import roomConfig8 from './room-config-8';
import roomConfig9 from './room-config-9';
import roomConfiga from './room-config-a';
import roomConfigb from './room-config-b';
import roomConfigc from './room-config-c';
import roomConfigd from './room-config-d';
import roomConfige from './room-config-e';
import roomConfigf from './room-config-f';
import roomConfigg from './room-config-g';
import roomConfigh from './room-config-h';
import roomConfigi from './room-config-i';
import roomConfigj from './room-config-j';
import roomConfigw from './room-config-w';
import { inventory } from '../helpers/weapons';
import { Weapons } from '../enums/Weapons';

const roomConfigs = {
  '.': roomConfigDOT,
  '%': roomConfigPERCENT,
  '0': roomConfig0,
  '1': roomConfig1,
  '2': roomConfig2,
  '3': roomConfig3,
  '4': roomConfig4,
  '5': roomConfig5,
  '6': roomConfig6,
  '7': roomConfig7,
  '8': roomConfig8,
  '9': roomConfig9,
  a: roomConfiga,
  b: roomConfigb,
  c: roomConfigc,
  d: roomConfigd,
  e: roomConfige,
  f: roomConfigf,
  g: roomConfigg,
  h: roomConfigh,
  i: roomConfigi,
  j: roomConfigj,
  w: roomConfigw,

};

export const allRoomTypes = Object.keys(roomConfigs) as RoomType[];

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

export const createRoom = (
  scene: Phaser.Scene,
  roomType: RoomType,
  isRoomCleared: boolean,
  roomClearedCount: number,
) => {
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
    const { x, y, polygon, name } = tiledObject;
    if (!x || !y || !polygon) return acc;
    const newGeometry = convertTiledPolygonToGameObject(scene, {
      x,
      y,
      polygon,
    });
    if (name) {
      newGeometry?.setName(name);
    }
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
          if (tiledObjectName === 'enemy' && isRoomCleared || inventory.includes(tiledObjectName as Weapons)) {
            if (inventory)
            continue;
          }
          group.get(x, y);
        }
      }

      // scale the entity's stats based on clearedRoomCount
      group
        .getChildren()
        .forEach((item) => item.updateStats?.({ hp: roomClearedCount * 0.5 }));

      return {
        ...acc,
        [tiledObjectName]: group,
      };
    },
    {},
  );

  return { level, spawners };
};
