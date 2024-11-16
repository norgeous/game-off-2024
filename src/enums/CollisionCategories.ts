// Collision Categories
// outline the categories (or types of things) that can be found in the game
export enum CC {
  default = 0b00000000000000000000000000000001, // 1 (the default category, for things without collisionCategory override, such as ground)

  player = 0b00000000000000000000000000000010, // 2
  playerBullet = 0b00000000000000000000000000000100, // 4

  enemy = 0b00000000000000000000000000001000, // 8
  enemyBullet = 0b00000000000000000000000000010000, // 16

  item = 0b00000000000000000000000000100000, // 32

  door = 0b00000000000000000000000001000000, // 64

  sensor = 0b00000000000000000000000010000000, // 128

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

  player = CC.default | CC.player | CC.enemy | CC.item | CC.door,
  playerBullet = CC.default | CC.enemy | CC.enemyBullet, // player bullets can only hit walls and enemies

  enemy = CC.default | CC.player | CC.playerBullet, // enemies collide with ground, player and player bullets, but not each other or items
  enemyBullet = CC.default | CC.player | CC.playerBullet, // enemy bullets collide with ground, player and player bullets, but not each other or items

  item = CC.default | CC.player | CC.item, // items collide with ground, player and other items, but not enemies

  door = CC.player, // doors can only collide with the player

  groundsensor = CC.default, // only collide with ground staticbody (or anything in default category)

  playerDetector = CC.player,
  enemyDetector = CC.enemy,
}

export const bodyToCC = (body: MatterJS.BodyType) =>
  CC[(body.gameObject?.body as MatterJS.BodyType)?.collisionFilter?.category];
