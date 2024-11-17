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
import Player from '../objects/entities/Player';

const levelConfig: LevelConfigType = {
  key: 'Room',
  // tilesetPng: './tiled/tileset/binding_of_isaac_tiles.jpg',
  tilesetPng: './tiled/tileset/ai-egypt-1.png',
  tiledMapJson: './tiled/maps/rooms/room-0.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [],
};

export class TiledMapTest2 extends Scene {
  public sceneInitParams: SceneInitParamsType;
  public map: TiledMapBuilder | undefined;
  public player: Player;
  public keys: keysType | undefined;

  constructor() {
    super('TiledMapTest2');
  }

  init(sceneInitParams: SceneInitParamsType) {
    this.sceneInitParams = sceneInitParams;
  }

  preload() {
    this.load.image('door', 'assets/isaac-door.png');

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
    Player.preload(this);
  }

  create() {
    console.log('TiledMapTest2 scene got', this.sceneInitParams);
    const { playerEnterFrom } = this.sceneInitParams;
    this.map = new TiledMapBuilder(this, levelConfig);

    this.player = new Player(this, playerEnterFrom);

    // camera
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
    this.cameras.main.startFollow(this.player);

    createDoors(this); // must be called after player is created
    this.keys = createControls(this); // must be called after player is created

    EventBus.emit(EventNames.READY, this);
  }

  update(_time: number, delta: number) {
    if (this.keys) {
      const forceVector = keysToVector(this.keys, 0.001 * delta);
      this.player.gameObject.applyForce(forceVector);

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
