import { CC, CM } from '../enums/CollisionCategories';
import { TiledMapTest2 } from '../scenes/TiledMapTest2';

const createDoor = (
  scene: Phaser.Scene,
  name: string,
  x: number,
  y: number,
  a = 0,
) =>
  scene.matter.add
    .sprite(x, y, 'door', undefined, {
      isStatic: true,
      collisionFilter: {
        category: CC.door,
        mask: CM.door,
      },
    })
    .setAngle(a)
    .setName(name);

const createDoors = (scene: TiledMapTest2) => {
  if (!scene.map) return;

  const { width: w, height: h } = scene.map;

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.north)) {
    createDoor(scene, 'door-north', w * 0.5, 70, 0);
  }

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.south)) {
    createDoor(scene, 'door-south', w * 0.5, h - 70, 180);
  }

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.east)) {
    createDoor(scene, 'door-east', w - 80, h * 0.5, 90);
  }

  if (!['%', '.'].includes(scene.sceneInitParams?.adjacentRooms?.west)) {
    createDoor(scene, 'door-west', 80, h * 0.5, 270);
  }
};

export default createDoors;
