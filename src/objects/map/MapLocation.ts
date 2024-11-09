import { Scene } from "phaser";

const NUMBER_OF_MAPS: number = 2;

export let CurrentRoomId: number = 1;
export let CurrentMapConfig: Array<number>;

export const getNextRoomId = () => {
  CurrentRoomId += 1;
};

export const loadRandomMapData = (scene: Scene) => {
  const data = scene.cache.json.get("mapData");
  const randomId = Phaser.Math.Between(0, NUMBER_OF_MAPS - 1);
  CurrentMapConfig = data.maps[randomId].mapData;
};

export const setRandomStartingRoom = (scene: Scene) => {
  if (!CurrentMapConfig) loadRandomMapData(scene);
  CurrentRoomId = Phaser.Math.Between(0, CurrentMapConfig.length);
};

export default CurrentRoomId;
