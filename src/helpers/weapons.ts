import { Weapons } from '../enums/Weapons';
import HandgunBullet from '../objects/weapons/bullets/HandgunBullet';
import MachinegunBullet from '../objects/weapons/bullets/MachinegunBullet';
import WhipBullet from '../objects/weapons/bullets/WhipBullet';
import { SceneInitParamsType } from './dungeonConfigParser';

export const inventory: Weapons[] = [];

export const addWeapon = (weapon: Weapons) => {
  inventory.push(weapon);
};

const itemName2Bullet = {
  'hand-gun': {
    Bullet: HandgunBullet,
    cooldownLength: 1000, // milliseconds between shots
  },
  'machine-gun': {
    Bullet: MachinegunBullet,
    cooldownLength: 200, // milliseconds between shots
  },
  whip: {
    Bullet: WhipBullet,
    cooldownLength: 600, // milliseconds between shots
  },
};

const weapons = (scene: Phaser.Scene, sceneInitParams: SceneInitParamsType) => {
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

        // reset cooldownFinish to some time in future
        groups[index].cooldownFinishAt =
          time +
          (cooldownLength - sceneInitParams.playerStats.attackRate * 100);
      }
    });
  };
};

export default weapons;
