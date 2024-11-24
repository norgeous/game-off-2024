import { TiledMapTest2 } from '../scenes/TiledMapTest2';
import { Direction } from './dungeonConfigParser';

const getPlayerStartPosition = (
  scene: TiledMapTest2,
  playerEnterFrom: Direction,
) => {
  if (!scene.level) return { px: 0, py: 0 };

  const { widthInPixels: w, heightInPixels: h } = scene.level;

  const positions = {
    start: { px: w * 0.5, py: h * 0.5 },
    north: { px: w * 0.5, py: 175 },
    south: { px: w * 0.5, py: h - 175 },
    east: { px: w - 175, py: h * 0.5 },
    west: { px: 175, py: h * 0.5 },
  };

  return positions[playerEnterFrom];
};

export default getPlayerStartPosition;
