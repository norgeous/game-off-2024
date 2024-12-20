import { CC, CM } from '../enums/CollisionCategories';
import findOtherBody from './findOtherBody';

interface ISensorOptions {
  label: string;
  shape: 'circle' | 'rectangle';
  radius: number;
  width?: number;
  height?: number;
  collisionCategory: CC;
  collisionSubMask: CM;
}

const createSensor = (
  scene: Phaser.Scene,
  { label, shape, radius, collisionCategory, collisionSubMask }: ISensorOptions,
) => {
  const sensorData = new Set<number>();

  const { bodies: Bodies } = scene.matter;

  const options: MatterJS.IBodyDefinition = {
    isSensor: true,
    label,
    density: 0,
    collisionFilter: {
      category: collisionCategory,
      mask: collisionSubMask,
      group: 0,
    },
    onCollideCallback: (
      data: Phaser.Types.Physics.Matter.MatterCollisionData,
    ) => {
      const other = findOtherBody(body.id, data);
      if (!other) return;

      if (
        (other?.collisionFilter.category & collisionSubMask) ===
        other?.collisionFilter.category
      ) {
        sensorData.add(other.id);
      }
    },
    onCollideEndCallback: (
      data: Phaser.Types.Physics.Matter.MatterCollisionData,
    ) => sensorData.delete(findOtherBody(body.id, data)?.id || 0),
  };

  const bodies = {
    circle: () => Bodies.circle(0, 0, radius, options),
    rectangle: () => Bodies.rectangle(0, 0, 100, radius, options),
  };

  const body = bodies[shape]();

  return {
    body,
    sensorData,
  };
};

const createSensors = (
  scene: Phaser.Scene,
  sensorConfig?: ISensorOptions[],
) => {
  if (!sensorConfig) {
    return {
      sensorBodies: [],
      sensorData: {},
    };
  }
  return sensorConfig.reduce(
    ({ sensorBodies, sensorData }, config) => {
      const { body, sensorData: d } = createSensor(scene, config);
      return {
        sensorBodies: [...sensorBodies, body],
        sensorData: { ...sensorData, [config.label]: d },
      };
    },
    {
      sensorBodies: [],
      sensorData: {},
    } as {
      sensorBodies: MatterJS.BodyType[];
      sensorData: {
        [key: string]: Set<number>;
      };
    },
  );
};

export default createSensors;
