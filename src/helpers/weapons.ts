import Bullet from '../objects/weapons/bullets/Bullet';
import WhipBullet from '../objects/weapons/bullets/WhipBullet';

const inventory = ['star-gun', 'whip'];

const itemName2Bullet = {
  'star-gun': {
    Bullet: Bullet,
    cooldownLength: 1000, // milliseconds between shots
  },
  whip: {
    Bullet: WhipBullet,
    cooldownLength: 600, // milliseconds between shots
  },
};

const weapons = (scene: Phaser.Scene) => {
  const groups = inventory.map((itemName) => {
    const { Bullet, cooldownLength } = itemName2Bullet[itemName];
    return {
      cooldownLength,
      cooldownFinishAt: 0,
      group: scene.add.group({
        maxSize: 100,
        classType: Bullet,
        runChildUpdate: true,
      }),
    };
  });

  return (x: number, y: number, time: number) => {
    groups.forEach(({ cooldownLength, cooldownFinishAt, group }, index) => {
      if (time > cooldownFinishAt) {
        group.get(x, y);
        groups[index].cooldownFinishAt = time + cooldownLength; // reset cooldownFinish to some time in future
      }
    });
  };
};

export default weapons;
