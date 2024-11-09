// Collision Categories
// outline the categories (or types of things) that can be found in the game
export enum CC {
  default = 0b00000000000000000000000000000001, // 1 (the default category, for things without collisionCategory override, such as ground)

  player = 0b00000000000000000000000000000010, // 2
  enemy = 0b00000000000000000000000000000100, // 4
  item = 0b00000000000000000000000000001000, // 8
  door = 0b00000000000000000000000000010000, // 16
  layer32 = 0b10000000000000000000000000000000, // 2147483648 (32 max layer, max 32 types of things in the game)
}

// Collision Masks
// define which categories that a type of entity can collide with
// more info: https://blog.ourcade.co/posts/2020/phaser-3-matter-physics-collision-filter/
// combine categories with pipe (|) character
/* eslint-disable no-bitwise */
export enum CM {
  everything = -1, // collides with everything (default)
  nothing = 0,

  player = CC.default | CC.player | CC.enemy | CC.item,
  enemy = CC.default | CC.player, // enemies collide with ground and player, but not each other or items
  item = CC.default | CC.player | CC.item, // items collide with ground, player and other items, but not enemies

  groundsensor = CC.default, // only collide with ground staticbody (or anything in default category)
}

// [!] at time of writing CM is not used anywhere (yet)

export const bodyToCC = (body: MatterJS.BodyType) =>
  CC[body.gameObject?.body?.collisionFilter?.category];
