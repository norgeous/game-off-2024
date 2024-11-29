import { ItemDropPoolType } from '../objects/entities/Entity';

const getRandomItemFromPool = (
  itemDropPool: ItemDropPoolType[],
): ItemDropPoolType | null => {
  const totalChance = itemDropPool.reduce(
    (total: number, item: ItemDropPoolType) => total + item.chance,
    0,
  );
  const randomChance = Phaser.Math.Between(0, totalChance);
  let currentChance = 0;

  for (let i = 0; i < itemDropPool.length; i++) {
    currentChance += itemDropPool[i].chance;
    if (randomChance < currentChance) {
      return itemDropPool[i];
    }
  }
  return null;
};

export const spawnItemFromDropPool = (
  itemDropPool: ItemDropPoolType[],
  scene: Phaser.Scene,
  x: number,
  y: number,
) => {
  const item = getRandomItemFromPool(itemDropPool);
  if (item?.classFactory) {
    const group = scene.add.group({
      classType: item.classFactory,
      runChildUpdate: true,
    });
    group.get(x, y);
  }
};
