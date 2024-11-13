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
  tilesetPng: './tiled/tileset/binding_of_isaac_tiles.jpg',
  tiledMapJson: './tiled/maps/room-0.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [],
};

const getPlayerStartPosition = (playerEnterFrom: Direction) =>
  ({
    start: { px: 500, py: 500 },
    north: { px: 500, py: 200 },
    south: { px: 500, py: 700 },
    east: { px: 700, py: 500 },
    west: { px: 200, py: 500 },
  })[playerEnterFrom];

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
    this.load.image('door', 'assets/issac-door.png');
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
    levelConfig.tiledMapJson = `./tiled/maps/room-${roomType}.json`;

    TiledMapBuilder.preload(this, levelConfig);
  }

  create() {
    console.log('TiledMapTest2 scene got', this.sceneInitParams);

    const { playerEnterFrom } = this.sceneInitParams;

    this.map = new TiledMapBuilder(this, levelConfig);

    const { px, py } = getPlayerStartPosition(playerEnterFrom);

    this.player = this.matter.add.sprite(px, py, 'jones');
    this.cameras.main.startFollow(this.player);

    createDoors(this); // must be called after player is created
    this.keys = createControls(this); // must be called after player is created

    EventBus.emit(EventNames.READY, this);
  }

  update() {
    if (this.keys) {
      const forceVector = keysToVector(this.keys, 0.0025);
      this.player.applyForce(forceVector);
    }
  }
}
