import { EventBus, EventNames } from '../EventBus';
import { Scene } from 'phaser';
import { SceneInitParamsType } from '../../helpers/dungeonConfigParser';
import TiledMapBuilder, {
  LevelConfigType,
} from '../../objects/map/TiledMapBuilder';
import { getRandomEnemy } from '../../helpers/getRandomEnemy';
import { createControls, keysToVector, keysType } from '../../helpers/controls';

const levelConfig: LevelConfigType = {
  key: 'Room',
  tilesetPng: './tiled/tileset/binding_of_isaac_tiles.jpg',
  tiledMapJson: './tiled/maps/room-0.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [
    {
      tiledObjectName: 'enemy',
      classFactory: getRandomEnemy(),
      maxSize: 10,
      runChildUpdate: true,
      autoSpawn: true,
    }
  ],
};

export class TiledMapTest2 extends Scene {
  private sceneInitParams: SceneInitParamsType;
  public map: TiledMapBuilder | undefined;
  private player: Phaser.Physics.Matter.Sprite;
  private keys: keysType | undefined;

  constructor() {
    super('TiledMapTest2');
  }
  
  preload() {
    TiledMapBuilder.preload(this, levelConfig);
  }

  init(sceneInitParams: SceneInitParamsType) {
    this.sceneInitParams = sceneInitParams;
  }

  create() {
    console.log('TiledMapTest2 scene got', this.sceneInitParams);

    this.map = new TiledMapBuilder(this, levelConfig);
    this.player = this.matter.add.sprite(500, 500, 'star');
    this.cameras.main.startFollow(this.player);

    if (!['?', '.'].includes(this.sceneInitParams?.adjacentRooms?.north)) {
      const doorNorth = this.matter.add.sprite(500, 100, 'star');
      this.player.setOnCollideWith(doorNorth, () =>
        EventBus.emit(EventNames.USE_DOOR, this, 'north'),
      );
    }

    if (!['?', '.'].includes(this.sceneInitParams?.adjacentRooms?.south)) {
      const doorSouth = this.matter.add.sprite(500, 800, 'star');
      this.player.setOnCollideWith(doorSouth, () =>
        EventBus.emit(EventNames.USE_DOOR, this, 'south'),
      );
    }

    if (!['?', '.'].includes(this.sceneInitParams?.adjacentRooms?.east)) {
      const doorEast = this.matter.add.sprite(800, 500, 'star');
      this.player.setOnCollideWith(doorEast, () =>
        EventBus.emit(EventNames.USE_DOOR, this, 'east'),
      );
    }

    if (!['?', '.'].includes(this.sceneInitParams?.adjacentRooms?.west)) {
      const doorWest = this.matter.add.sprite(100, 500, 'star');
      this.player.setOnCollideWith(doorWest, () =>
        EventBus.emit(EventNames.USE_DOOR, this, 'west'),
      );
    }

    this.keys = createControls(this);

    EventBus.emit(EventNames.READY, this);
  }

  update() {
    if (this.keys) {
      const forceVector = keysToVector(this.keys, 0.005);
      this.player.applyForce(forceVector);
    }
  }

  changeScene() {
    this.scene.start('GameOver');
  }
}
