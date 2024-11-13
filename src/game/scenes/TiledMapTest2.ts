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
  spawnerConfig: [],
};

const createDoors = (scene: TiledMapTest2) => {
  if (!['?', '.'].includes(scene.sceneInitParams?.adjacentRooms?.north)) {
    const doorNorth = scene.matter.add.sprite(500, 100, 'door', '0', {
      isStatic: true,
    });
    scene.player.setOnCollideWith(doorNorth, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'north'),
    );
  }

  if (!['?', '.'].includes(scene.sceneInitParams?.adjacentRooms?.south)) {
    const doorSouth = scene.matter.add.sprite(500, 800, 'door', '0', {
      isStatic: true,
    });
    doorSouth.setAngle(180);
    scene.player.setOnCollideWith(doorSouth, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'south'),
    );
  }

  if (!['?', '.'].includes(scene.sceneInitParams?.adjacentRooms?.east)) {
    const doorEast = scene.matter.add.sprite(800, 500, 'door', '0', {
      isStatic: true,
    });
    doorEast.setAngle(90);
    scene.player.setOnCollideWith(doorEast, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'east'),
    );
  }

  if (!['?', '.'].includes(scene.sceneInitParams?.adjacentRooms?.west)) {
    const doorWest = scene.matter.add.sprite(100, 500, 'door', '0', {
      isStatic: true,
    });
    doorWest.setAngle(270);
    scene.player.setOnCollideWith(doorWest, () =>
      EventBus.emit(EventNames.USE_DOOR, scene, 'west'),
    );
  }
};


export class TiledMapTest2 extends Scene {
  public sceneInitParams: SceneInitParamsType;
  public map: TiledMapBuilder | undefined;
  public player: Phaser.Physics.Matter.Sprite;
  public keys: keysType | undefined;

  constructor() {
    super('TiledMapTest2');
  }

  preload() {
    levelConfig.spawnerConfig = [
      {
        tiledObjectName: 'enemy',
        classFactory: getRandomEnemy(),
        maxSize: 10,
        runChildUpdate: true,
        autoSpawn: true,
      },
    ];
    TiledMapBuilder.preload(this, levelConfig);
    this.load.image('door', 'assets/issac-door.png');
    this.load.image('star', 'assets/star.png');
  }

  init(sceneInitParams: SceneInitParamsType) {
    this.sceneInitParams = sceneInitParams;
  }

  create() {
    console.log('TiledMapTest2 scene got', this.sceneInitParams);

    this.map = new TiledMapBuilder(this, levelConfig);
    this.player = this.matter.add.sprite(500, 500, 'star');
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

  changeScene() {
    this.scene.start('GameOver');
  }
}
