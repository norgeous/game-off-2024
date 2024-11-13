import { Scene } from 'phaser';

const BASE_MAP_PATH = './tiled/maps/room-';

export let mapIndex: number;
export let currentRoomId: number = 0;
export let currentRoomIndex: number;
export let mapData: Array<number>;
export let startingRoomData: Array<number>;

export const setCurrentRoomId = (id: number) => {
  currentRoomId = id;
};

const setStartingRoomId = () => {
  currentRoomId =
    startingRoomData[Phaser.Math.Between(0, startingRoomData.length - 1)];
  currentRoomIndex = mapData.indexOf(currentRoomId);
};

export const loadRandomMapData = (scene: Scene) => {
  const data = scene.cache.json.get('mapData');
  mapIndex = Phaser.Math.Between(0, data.maps.length - 1);
  mapData = data.maps[mapIndex].mapData;
  startingRoomData = data.maps[mapIndex].startingRoomIds;
  setStartingRoomId();
};

export const buildRoomJsonPath = () => {
  return BASE_MAP_PATH + currentRoomId + '.json';
};
