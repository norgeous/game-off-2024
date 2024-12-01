import Gold from './Gold';
import GoldLarge from './GoldLarge';
import GoldMedium from './GoldMedium';
import Heart from './Heart';

const allItems = [Gold, GoldMedium, GoldLarge, Heart] as const;

export type classFactoryType = (typeof allItems)[number];

export default allItems;
