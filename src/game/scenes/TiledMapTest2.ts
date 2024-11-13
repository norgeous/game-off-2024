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
  const { width, height } = scene.map.layers.tiledLayer;
  return {
    start: { px: width * 0.5, py: height * 0.5 },
    north: { px: width * 0.5, py: height * 0.25 },
    south: { px: width * 0.5, py: height * 0.75 },
    east: { px: width * 0.88, py: height * 0.5 },
    west: { px: width * 0.12, py: height * 0.5 },
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
    const roomType = Math.random()>.5?'0':'g';

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
    const { width, height } = this.map.layers.tiledLayer;
    const { px, py } = getPlayerStartPosition(this, playerEnterFrom);
    this.player = this.matter.add.sprite(px, py, 'jones');

    console.log(this.map, {width,height}, this.map.layers.tiledLayer.width);
    if (width > 1280 || height > 768) {
      this.cameras.main.setBounds(0, 0, width, height);
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
    }
  }
}
