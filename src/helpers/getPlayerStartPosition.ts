import { getTiledDimensions, TiledMapTest2 } from '../scenes/TiledMapTest2';
import { Direction } from './dungeonConfigParser';

const getPlayerStartPosition = (
  scene: TiledMapTest2,
  playerEnterFrom: Direction,
) => {
  // if (!scene.map) return;

  const { actualWidthInPixels: w, actualHeightInPixels: h } =
    getTiledDimensions(scene.map);

  const positions = {
    start: { px: w * 0.5, py: h * 0.5 },
    north: { px: w * 0.5, py: h * 0.25 },
    south: { px: w * 0.5, py: h * 0.75 },
    east: { px: w * 0.88, py: h * 0.5 },
    west: { px: w * 0.12, py: h * 0.5 },
  };

  return positions[playerEnterFrom];
};

export default getPlayerStartPosition;
