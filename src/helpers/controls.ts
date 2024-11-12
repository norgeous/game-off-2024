export type keysType = { [keyCodes: string]: Phaser.Input.Keyboard.Key };

export const createControls = (scene: Phaser.Scene) =>
  scene.input.keyboard?.addKeys('W,A,S,D') as keysType;

export const keysToVector = (keys: keysType | undefined, power: number) => {
  const vector = { x: 0, y: 0 };

  if (keys?.A.isDown) vector.x += -power;
  if (keys?.D.isDown) vector.x += power;
  if (keys?.W.isDown) vector.y += -power;
  if (keys?.S.isDown) vector.y += power;

  const forceVector = new Phaser.Math.Vector2(vector);

  return forceVector;
};
