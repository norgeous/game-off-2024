import StarBullet from '../objects/weapons/bullets/StarBullet';

const COOLDOWN = 300;

const inventory = ['star-gun', 'star-gun'];

const itemName2Bullet = {
  'star-gun': StarBullet,
};

const weapons = (scene: Phaser.Scene) => {
  const groups = inventory.map((itemName) => ({
    cooldownFinish: 0,
    group: scene.add.group({
      maxSize: 100,
      classType: itemName2Bullet[itemName],
      runChildUpdate: true,
    }),
  }));

  return (x: number, y: number, time: number) => {
    groups.forEach(({ cooldownFinish, group }, index) => {
      if (time > cooldownFinish) {
        group.get(x, y);
        groups[index].cooldownFinish = time + COOLDOWN;
      }
    });
  };
};

export default weapons;
