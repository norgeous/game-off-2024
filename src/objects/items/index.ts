import Gold from './Gold';
import Heart from './Heart';

const allItems = [Gold, Heart] as const;

export type classFactoryType = (typeof allItems)[number];

export default allItems;
