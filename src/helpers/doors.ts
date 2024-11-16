import { CC, CM } from '../enums/CollisionCategories';
import { EventBus, EventNames } from '../EventBus';
import { getTiledDimensions, TiledMapTest2 } from '../scenes/TiledMapTest2';

const createDoor = (scene: Phaser.Scene, x: number, y: number, a = 0) =>
  scene.matter.add
    .sprite(x, y, 'door', undefined, {
      isStatic: true,
      collisionFilter: {
        category: CC.door,
        mask: CM.door,
      },
    })
    .setAngle(a);

const createDoors = (scene: TiledMapTest2) => {
  const { actualWidthInPixels: w, actualHeightInPixels: h } =
    getTiledDimensions(scene.map);

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.north)) {
    const doorNorth = createDoor(scene, w * 0.5, 70, 0);
    scene.player.setOnCollideWith(doorNorth, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'north'),
    );
  }

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.south)) {
    const doorSouth = createDoor(scene, w * 0.5, h - 70, 180);
    scene.player.setOnCollideWith(doorSouth, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'south'),
    );
  }

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.east)) {
    const doorEast = createDoor(scene, w - 80, h * 0.5, 90);
    scene.player.setOnCollideWith(doorEast, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'east'),
    );
  }

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.west)) {
    const doorWest = createDoor(scene, 80, h * 0.5, 270);
    scene.player.setOnCollideWith(doorWest, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'west'),
    );
  }
};

export default createDoors;
