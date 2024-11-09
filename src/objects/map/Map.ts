import { Scene } from 'phaser';
import Direction from '../../enums/Direction';

const BASE_MAP_PATH = './tiled/maps/room-';

export let mapIndex: number;
export let CurrentRoomId: number = 0;
export let CurrentRoomIndex: number;
export let MapData: Array<number>;
export let StartingRoomData: Array<number>;

export const setNextRoomId = (direction: Direction) => {
  const NewRoomIndex = CurrentRoomIndex + direction;
  if (NewRoomIndex >= 0 && NewRoomIndex < MapData.length) {
    CurrentRoomIndex = NewRoomIndex;
  }
  CurrentRoomId = MapData[CurrentRoomIndex];
};

const setStartingRoomId = () => {
  CurrentRoomId =
    StartingRoomData[Phaser.Math.Between(0, StartingRoomData.length - 1)];
  CurrentRoomIndex = MapData.indexOf(CurrentRoomId);
};

export const loadRandomMapData = (scene: Scene) => {
  const data = scene.cache.json.get('mapData');
  mapIndex = Phaser.Math.Between(0, data.maps.length - 1);
  MapData = data.maps[mapIndex].mapData;
  StartingRoomData = data.maps[mapIndex].startingRoomIds;
  setStartingRoomId();
};

export const buildRoomJsonPath = () => {
  return BASE_MAP_PATH + CurrentRoomId + '.json';
};

export default CurrentRoomId;
