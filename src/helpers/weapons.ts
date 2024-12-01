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
    maxCooldownLength: 1000, // base rate of fire
    minCooldownLength: 500, // max upgraded rate of fire
  },
  'machine-gun': {
    Bullet: MachinegunBullet,
    maxCooldownLength: 200, // base rate of fire
    minCooldownLength: 100, // max upgraded rate of fire
  },
  whip: {
    Bullet: WhipBullet,
    maxCooldownLength: 600, // base rate of fire
    minCooldownLength: 400, // max upgraded rate of fire
  },
};

const weapons = (scene: Phaser.Scene, sceneInitParams: SceneInitParamsType) => {
  const groups = inventory.map((itemName) => {
    const { Bullet, maxCooldownLength, minCooldownLength } =
      itemName2Bullet[itemName];
    return {
      maxCooldownLength,
      minCooldownLength,
      cooldownFinishAt: 0,
      group: scene.add.group({
        maxSize: 100,
        classType: Bullet,
        runChildUpdate: true,
      }),
    };
  });

  return (x: number, y: number, time: number) => {
    groups.forEach(
      (
        { maxCooldownLength, minCooldownLength, cooldownFinishAt, group },
        index,
      ) => {
        if (time > cooldownFinishAt) {
          group.get(x, y);

          // reset cooldownFinish to some time in future
          const cooldownRange = maxCooldownLength - minCooldownLength;
          const multiplier = sceneInitParams.playerStats.attackRate - 1; // number between 0 and 1
          const cooldownLength = maxCooldownLength - cooldownRange * multiplier;
          groups[index].cooldownFinishAt = time + cooldownLength;
        }
      },
    );
  };
};

export default weapons;
