import StarBullet from '../objects/weapons/bullets/StarBullet';

const weapons = (scene: Phaser.Scene) => {
  const group = scene.add.group({
    maxSize: 10,
    classType: StarBullet,
    runChildUpdate: false,
  });

  return (x: number, y: number) => {
    group.get(x, y);
  };
};

export default weapons;
