const SPEED_MIN = 100;
const SPEED_MAX = 200;
const ANGLE_MIN = 0;
const ANGLE_MAX = 360;
const LIFESPAN_MIN = 300;
const LIFESPAN_MAX = 800;
const GRAVITY_Y = 300;
const GRAVITY_X = 0;
const SCALE_START = 0.5;
const SCALE_END = 0;
const QUANTITY = 20;
const STOP_AFTER = 20;

export const createBloodEffect = (
  scene: Phaser.Scene,
  x: number,
  y: number,
) => {
  const bloodGraphics = scene.add.graphics();
  bloodGraphics.fillStyle(0xff0000);
  for (let i = 0; i < 5; i++) {
    const radius = Phaser.Math.Between(5, 15);
    const x = Phaser.Math.Between(-10, 10);
    const y = Phaser.Math.Between(-10, 10);
    bloodGraphics.fillCircle(100 + x, 100 + y, radius);
  }
  bloodGraphics.generateTexture('blood', 100, 100);
  bloodGraphics.alpha = 0; // Texture is drawn to the screen before being used in the particle effect.

  return scene.add.particles(x, y, 'blood', {
    speed: { min: SPEED_MIN, max: SPEED_MAX },
    angle: { min: ANGLE_MIN, max: ANGLE_MAX },
    lifespan: { min: LIFESPAN_MIN, max: LIFESPAN_MAX },
    gravityY: GRAVITY_Y,
    gravityX: GRAVITY_X,
    scale: { start: SCALE_START, end: SCALE_END },
    quantity: QUANTITY,
    stopAfter: STOP_AFTER,
  });
};
