import { EventBus, EventNames } from '../helpers/EventBus';
import { Scene } from 'phaser';
import { SceneInitParamsType } from '../helpers/dungeonConfigParser';
import TiledMapBuilder, {
  LevelConfigType,
} from '../objects/map/TiledMapBuilder';
import { getRandomEnemy } from '../helpers/getRandomEnemy';
import createDoors from '../helpers/doors';
import Player from '../objects/entities/Player';
import { getCurrentRoomMusic } from '../helpers/getMusicConfig';
import audio from '../objects/Audio';

const levelConfig: LevelConfigType = {
  key: 'Room',
  tilesetPng: './tiled/tileset/ai-egypt-1.png',
  tiledMapJson: './tiled/maps/rooms/room-0.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [],
};

export class TiledMapTest2 extends Scene {
  public sceneInitParams: SceneInitParamsType;
  public map: TiledMapBuilder | undefined;
  public player: Player;

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
    console.log('TiledMapTest2 scene got', this.sceneInitParams, this);

    audio.playRoomMusic(getCurrentRoomMusic(this.sceneInitParams.roomType).key);

    const { playerEnterFrom } = this.sceneInitParams;
    this.map = new TiledMapBuilder(this, levelConfig);
    this.player = new Player(this, playerEnterFrom);
    this.cameras.main
      .setBounds(0, 0, this.map.width, this.map.height)
      .startFollow(this.player);

    createDoors(this); // must be called after player is created

    EventBus.emit(EventNames.READY, this);
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
  }
}
