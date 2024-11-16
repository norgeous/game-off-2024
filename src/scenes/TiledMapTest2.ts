import { EventBus, EventNames } from '../helpers/EventBus';
import { Scene } from 'phaser';
import { SceneInitParamsType } from '../helpers/dungeonConfigParser';
import TiledMapBuilder, {
  LevelConfigType,
} from '../objects/map/TiledMapBuilder';
import { getRandomEnemy } from '../helpers/getRandomEnemy';
import { createControls, keysToVector, keysType } from '../helpers/controls';
import createDoors from '../helpers/doors';
import { CC, CM } from '../enums/CollisionCategories';
import getPlayerStartPosition from '../helpers/getPlayerStartPosition';

const levelConfig: LevelConfigType = {
  key: 'Room',
  // tilesetPng: './tiled/tileset/binding_of_isaac_tiles.jpg',
  tilesetPng: './tiled/tileset/ai-egypt-1.png',
  tiledMapJson: './tiled/maps/rooms/room-0.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [],
};

export const getTiledDimensions = (map: TiledMapBuilder) => {
  const { bottom, right } = map.level?.layers[0].data
    .flat()
    .findLast(({ index }) => index !== -1) || { bottom: 0, right: 0 };
  return {
    actualWidthInPixels: right,
    actualHeightInPixels: bottom,
  };
};

export class TiledMapTest2 extends Scene {
  public sceneInitParams: SceneInitParamsType;
  public map: TiledMapBuilder | undefined;
  public player: Phaser.Physics.Matter.Sprite;
  public keys: keysType | undefined;

  constructor() {
    super('TiledMapTest2');
  }

  init(sceneInitParams: SceneInitParamsType) {
    this.sceneInitParams = sceneInitParams;
  }

  preload() {
    this.load.image('door', 'assets/isaac-door.png');
    this.load.image('jones', 'assets/jones.png');

    const { roomType } = this.sceneInitParams;

    levelConfig.spawnerConfig = [
      {
        tiledObjectName: 'enemy',
        classFactory: getRandomEnemy(),
        maxSize: 10,
        runChildUpdate: true,
        autoSpawn: true,
      },
    ];
    levelConfig.key = `room-${roomType}`;
    levelConfig.tiledMapJson = `./tiled/rooms/room-${roomType}.json`;

    TiledMapBuilder.preload(this, levelConfig);
  }

  create() {
    console.log('TiledMapTest2 scene got', this.sceneInitParams);
    const { playerEnterFrom } = this.sceneInitParams;
    this.map = new TiledMapBuilder(this, levelConfig);
    const { px, py } = getPlayerStartPosition(this, playerEnterFrom);
    this.player = this.matter.add.sprite(px, py, 'jones', undefined, {
      collisionFilter: {
        category: CC.player,
        mask: CM.player,
      },
    });

    const { actualWidthInPixels, actualHeightInPixels } = getTiledDimensions(
      this.map,
    );

    if (
      actualWidthInPixels > this.sys.canvas.width ||
      actualHeightInPixels > this.sys.canvas.height
    ) {
      this.cameras.main.setBounds(
        0,
        0,
        actualWidthInPixels,
        actualHeightInPixels,
      );
      this.cameras.main.startFollow(this.player);
    }

    createDoors(this); // must be called after player is created
    this.keys = createControls(this); // must be called after player is created

    EventBus.emit(EventNames.READY, this);
  }

  update() {
    if (this.keys) {
      const forceVector = keysToVector(this.keys, 0.0015);
      this.player.applyForce(forceVector);

      if (this.keys.SPACE.isDown) {
        this.matter.add
          .sprite(this.player.x, this.player.y, 'star', undefined, {
            collisionFilter: {
              category: CC.playerBullet,
              mask: CM.playerBullet,
            },
          })
          .setAngularVelocity(100);
      }
    }
  }
}