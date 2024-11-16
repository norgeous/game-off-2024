export type keysType = {
  [keyCodes: string]: Phaser.Input.Keyboard.Key | { isDown: boolean };
};

const DEADZONE = 30;

export const createControls = (scene: Phaser.Scene) => {
  const mouseKeys = {
    W: { isDown: false },
    A: { isDown: false },
    S: { isDown: false },
    D: { isDown: false },
    UP: { isDown: false },
    DOWN: { isDown: false },
    LEFT: { isDown: false },
    RIGHT: { isDown: false },
    SPACE: { isDown: false },
  };

  scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    // if the primary button on the second pointer is down
    if (pointer.manager.pointers[2].buttons === 1) {
      mouseKeys.SPACE.isDown = true;
    }
  });

  scene.input.on('pointerup', () => {
    mouseKeys.W.isDown = false;
    mouseKeys.A.isDown = false;
    mouseKeys.S.isDown = false;
    mouseKeys.D.isDown = false;
    mouseKeys.SPACE.isDown = false;
  });

  scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
    if (pointer.buttons === 1) {
      const {
        downX,
        downY,
        position: { x, y },
      } = pointer;
      const dx = x - downX;
      const dy = y - downY;
      mouseKeys.W.isDown = dy < -DEADZONE;
      mouseKeys.A.isDown = dx < -DEADZONE;
      mouseKeys.S.isDown = dy > DEADZONE;
      mouseKeys.D.isDown = dx > DEADZONE;
    }
  });

  if (scene.sys.game.device.os.desktop)
    return scene.input.keyboard?.addKeys(
      'W,A,S,D,UP,DOWN,LEFT,RIGHT,SPACE',
    ) as keysType;
  else return mouseKeys;
};

export const keysToVector = (keys: keysType | undefined, power: number) => {
  const vector = { x: 0, y: 0 };

  if (keys?.A.isDown || keys?.LEFT.isDown) vector.x += -power;
  if (keys?.D.isDown || keys?.RIGHT.isDown) vector.x += power;
  if (keys?.W.isDown || keys?.UP.isDown) vector.y += -power;
  if (keys?.S.isDown || keys?.DOWN.isDown) vector.y += power;

  const forceVector = new Phaser.Math.Vector2(vector);

  return forceVector;
};
