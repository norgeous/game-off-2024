import { EventBus, EventNames } from '../game/EventBus';
import { TiledMapTest2 } from '../game/scenes/TiledMapTest2';

const createDoors = (scene: TiledMapTest2) => {
  // console.log(scene);
  const { width, height } = scene.map.layers.tiledLayer.defaultPipeline;
  console.log({ width, height });

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.north)) {
    const doorNorth = scene.matter.add.sprite(
      width * 0.5,
      height * 0.1,
      'door',
      '0',
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
      width * 0.5,
      height * 0.9,
      'door',
      '0',
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
      width * 0.935,
      height * 0.5,
      'door',
      '0',
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
      width * 0.065,
      height * 0.5,
      'door',
      '0',
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
