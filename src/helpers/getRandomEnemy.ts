import Bat from '../objects/entities/mobs/Bat';
import Scorpion from '../objects/entities/mobs/Scorpion';
import Snake from '../objects/entities/mobs/Snake';

const enemies = [Scorpion];

export const getRandomEnemy = () => {
  //  We can spawn enemies based off dataForScene var.
  return enemies[Math.floor(Math.random() * enemies.length)];
};
