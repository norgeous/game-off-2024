import { CC, CM } from '../enums/CollisionCategories';
import findOtherBody from './findOtherBody';

interface ISensorOptions {
  label: string;
  shape: 'circle' | 'rectangle';
  radius: number;
  width?: number;
  height?: number;
  collisionCategory: CC;
  collisionMask: CM;
}

const createSensor = (
  scene: Phaser.Scene,
  { label, shape, radius, collisionCategory, collisionMask }: ISensorOptions,
) => {
  const sensorData = new Set<number>();

  const { bodies: Bodies } = scene.matter;

  const options: MatterJS.IBodyDefinition = {
    isSensor: true,
    label,
    collisionFilter: {
      category: collisionCategory,
      mask: collisionMask,
      group: 0,
    },
    onCollideCallback: (
      data: Phaser.Types.Physics.Matter.MatterCollisionData,
    ) => sensorData.add(findOtherBody(body.id, data)?.id || 0),
    onCollideEndCallback: (
      data: Phaser.Types.Physics.Matter.MatterCollisionData,
    ) => sensorData.delete(findOtherBody(body.id, data)?.id || 0),
  };

  const bodies = {
    circle: () => Bodies.circle(0, 0, radius, options),
    rectangle: () => Bodies.rectangle(0, 0, 100, radius, options),
  };

  const body = bodies[shape]();
  console.log(body);

  return {
    body,
    sensorData,
  };
};

export default createSensor;
