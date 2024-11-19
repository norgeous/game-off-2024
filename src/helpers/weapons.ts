import StarBullet from '../objects/weapons/bullets/StarBullet';

const weapons = (scene: Phaser.Scene) => {
  const group = scene.add.group({
    maxSize: 1,
    classType: StarBullet,
    runChildUpdate: true,
  });

  return (x: number, y: number) => {
    group.get(x, y);
  };
};

export default weapons;
