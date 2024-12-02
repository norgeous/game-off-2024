import Anubis from '../objects/entities/mobs/Anubis';
import Bat from '../objects/entities/mobs/Bat';
import Batman from '../objects/entities/mobs/Batman';
import Beetle from '../objects/entities/mobs/Beetle';
import Mummy from '../objects/entities/mobs/Mummy';
import Pharaoe from '../objects/entities/mobs/Pharaoe';
import PharaoeLarge from '../objects/entities/mobs/PharaoeLarge';
import Rat from '../objects/entities/mobs/Rat';
import Sandman from '../objects/entities/mobs/Sandman';
import Sarcophagus from '../objects/entities/mobs/Sarcophagus';
import Scorpion from '../objects/entities/mobs/Scorpion';
import Skeleton from '../objects/entities/mobs/Skeleton';
import Snake from '../objects/entities/mobs/Snake';
import Sphinx from '../objects/entities/mobs/Sphinx';
import Statue from '../objects/entities/mobs/Statue';

const enemies = [
  Anubis,
  Bat,
  Batman,
  Beetle,
  Mummy,
  Pharaoe,
  Rat,
  Sandman,
  Sarcophagus,
  Scorpion,
  Skeleton,
  Snake,
  Statue,
];

const bosses = [
  PharaoeLarge,
];

export const getRandomEnemy = () => {
  return enemies[Math.floor(Math.random() * enemies.length)];
};

export const getRandomBoss = () => {
  return bosses[Math.floor(Math.random() * bosses.length)];
};
