import { CC, CM } from '../enums/CollisionCategories';
import { TiledMapTest2 } from '../scenes/TiledMapTest2';

export const preloadDoor = (scene: Phaser.Scene) => {
  scene.load.spritesheet('doors', 'assets/doors.png', {
    frameWidth: 163,
    frameHeight: 110,
  });
  scene.load.audio('sfx-door-open', 'assets/audio/whoosh-motion-243505.mp3');
  scene.load.audio('sfx-door-close', 'assets/audio/door-close-79921.mp3');
};

const createDoor = (
  scene: Phaser.Scene,
  name: string,
  x: number,
  y: number,
  a = 0,
) =>
  scene.matter.add
    .sprite(x, y, 'doors', 1, {
      isStatic: true,
      collisionFilter: {
        category: CC.door,
        mask: CM.door,
      },
    })
    .setAngle(a)
    .setName(name);

const createDoors = (scene: TiledMapTest2) => {
  if (!scene.level) return;

  const { widthInPixels: w, heightInPixels: h } = scene.level;
  const { adjacentRooms } = scene.sceneInitParams;

  const hasN = !['%', '.'].includes(adjacentRooms?.north);
  const hasS = !['%', '.'].includes(adjacentRooms?.south);
  const hasE = !['%', '.'].includes(adjacentRooms?.east);
  const hasW = !['%', '.'].includes(adjacentRooms?.west);

  const sprites = [
    ...(hasN ? [createDoor(scene, 'door-north', w * 0.5, 85, 0)] : []),
    ...(hasS ? [createDoor(scene, 'door-south', w * 0.5, h - 85, 180)] : []),
    ...(hasE ? [createDoor(scene, 'door-east', w - 85, h * 0.5, 90)] : []),
    ...(hasW ? [createDoor(scene, 'door-west', 85, h * 0.5, 270)] : []),
  ];

  const openSfx = scene.sound.add('sfx-door-open', {
    detune: Math.floor(Math.random() * (600 - -600 + 1) + -600),
    volume: 0.5,
  });

  const closeSfx = scene.sound.add('sfx-door-close', {
    detune: Math.floor(Math.random() * (600 - -600 + 1) + -600),
    volume: 0.5,
  });

  const open = () => {
    if (Number(sprites[0].frame.name) === 0) {
      sprites.forEach((sprite) => sprite.setFrame(1));
      openSfx.play();
    }
  };

  const close = () => {
    if (Number(sprites[0].frame.name) === 1) {
      sprites.forEach((sprite) => sprite.setFrame(0));
      closeSfx.play();
    }
  };

  return { sprites, open, close };
};

export default createDoors;
