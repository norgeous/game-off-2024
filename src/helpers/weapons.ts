import StarBullet from '../objects/weapons/bullets/StarBullet';

const inventory = ['star-gun', 'star-gun'];

const itemName2Bullet = {
  'star-gun': {
    Bullet: StarBullet,
    cooldownLength: 1000, // milliseconds between shots
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
