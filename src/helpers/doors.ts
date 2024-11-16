import { EventBus, EventNames } from '../game/EventBus';
import {
  getTiledDimensions,
  TiledMapTest2,
} from '../game/scenes/TiledMapTest2';

const createDoors = (scene: TiledMapTest2) => {
  const { actualWidthInPixels, actualHeightInPixels } = getTiledDimensions(
    scene.map,
  );

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.north)) {
    const doorNorth = scene.matter.add.sprite(
      actualWidthInPixels * 0.5,
      actualHeightInPixels * 0.1,
      'door',
      undefined,
      {
        isStatic: true,
      },
    );
    scene.player.setOnCollideWith(doorNorth, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'north'),
    );
  }

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.south)) {
    const doorSouth = scene.matter.add.sprite(
      actualWidthInPixels * 0.5,
      actualHeightInPixels * 0.9,
      'door',
      undefined,
      {
        isStatic: true,
      },
    );
    doorSouth.setAngle(180);
    scene.player.setOnCollideWith(doorSouth, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'south'),
    );
  }

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.east)) {
    const doorEast = scene.matter.add.sprite(
      actualWidthInPixels - 80,
      actualHeightInPixels * 0.5,
      'door',
      undefined,
      {
        isStatic: true,
      },
    );
    doorEast.setAngle(90);
    scene.player.setOnCollideWith(doorEast, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'east'),
    );
  }

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.west)) {
    const doorWest = scene.matter.add.sprite(
      80,
      actualHeightInPixels * 0.5,
      'door',
      undefined,
      {
        isStatic: true,
      },
    );
    doorWest.setAngle(270);
    scene.player.setOnCollideWith(doorWest, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'west'),
    );
  }
};

export default createDoors;
