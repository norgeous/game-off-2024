import { EventBus, EventNames } from '../EventBus';
import { Scene } from 'phaser';
import {
  Direction,
  SceneInitParamsType,
} from '../../helpers/dungeonConfigParser';
import TiledMapBuilder, {
  LevelConfigType,
} from '../../objects/map/TiledMapBuilder';
import { getRandomEnemy } from '../../helpers/getRandomEnemy';
import { createControls, keysToVector, keysType } from '../../helpers/controls';
import createDoors from '../../helpers/doors';

const levelConfig: LevelConfigType = {
  key: 'Room',
  // tilesetPng: './tiled/tileset/binding_of_isaac_tiles.jpg',
  tilesetPng: './tiled/tileset/ai-egypt-1.png',
  tiledMapJson: './tiled/maps/rooms/room-0.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [],
};

const getPlayerStartPosition = (
  scene: Phaser.Scene,
  playerEnterFrom: Direction,
) => {
  const { width, height } = scene.map.layers.tiledLayer.defaultPipeline;
  return {
    start: { px: width * 0.5, py: height * 0.5 },
    north: { px: width * 0.5, py: height * 0.28 },
    south: { px: width * 0.5, py: height * 0.72 },
    east: { px: width * 0.85, py: height * 0.5 },
    west: { px: width * 0.15, py: height * 0.5 },
  }[playerEnterFrom];
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

    // const { roomType } = this.sceneInitParams;
    const roomType = 0;

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

    this.player = this.matter.add.sprite(px, py, 'jones');
    // this.cameras.main.startFollow(this.player);

    createDoors(this); // must be called after player is created
    this.keys = createControls(this); // must be called after player is created

    EventBus.emit(EventNames.READY, this);
  }

  update() {
    if (this.keys) {
      const forceVector = keysToVector(this.keys, 0.001);
      this.player.applyForce(forceVector);
    }
  }
}
