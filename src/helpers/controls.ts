export type keysType = { [keyCodes: string]: Phaser.Input.Keyboard.Key };

const DEADZONE = 30;

export const createControls = (scene: Phaser.Scene) => {
  const mouseKeys = {
    W: { isDown: false },
    A: { isDown: false },
    S: { isDown: false },
    D: { isDown: false },
  };
  scene.input.on('pointerup', (d) => {
    mouseKeys.W.isDown = false;
    mouseKeys.A.isDown = false;
    mouseKeys.S.isDown = false;
    mouseKeys.D.isDown = false;
  });
  scene.input.on('pointermove', (d) => {
    if (d.buttons === 1) {
      const {
        downX,
        downY,
        position: { x, y },
      } = d;
      const dx = x - downX;
      const dy = y - downY;
      mouseKeys.W.isDown = dy < -DEADZONE;
      mouseKeys.A.isDown = dx < -DEADZONE;
      mouseKeys.S.isDown = dy > DEADZONE;
      mouseKeys.D.isDown = dx > DEADZONE;
    }
  });

  if(scene.sys.game.device.os.desktop) return scene.input.keyboard?.addKeys('W,A,S,D') as keysType;
  else return mouseKeys;
};

export const keysToVector = (keys: keysType | undefined, power: number) => {
  const vector = { x: 0, y: 0 };

  if (keys?.A.isDown) vector.x += -power;
  if (keys?.D.isDown) vector.x += power;
  if (keys?.W.isDown) vector.y += -power;
  if (keys?.S.isDown) vector.y += power;

  const forceVector = new Phaser.Math.Vector2(vector);

  return forceVector;
};
