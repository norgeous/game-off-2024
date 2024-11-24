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
import { createRoom, preloadRoom } from '../rooms';

const levelConfig: LevelConfigType = {
  key: 'Room',
  tilesetPng: './tiled/tileset/ai-egypt-1.png',
  tiledMapJson: './tiled/maps/rooms/room-0.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [],
};

export class TiledMapTest2 extends Scene {
  public sceneInitParams: SceneInitParamsType;
  // public map: TiledMapBuilder | undefined;
  public level: Phaser.Tilemaps.Tilemap | undefined;
  public player: Player;

  constructor() {
    super('TiledMapTest2');
  }

  init(sceneInitParams: SceneInitParamsType) {
    console.log(sceneInitParams);
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

    // new preloader
    preloadRoom(this, roomType);
  }

  create() {
    const { roomType } = this.sceneInitParams;

    console.log('TiledMapTest2 scene got', this.sceneInitParams, this);

    const { level, spawners } = createRoom(this, roomType);
    this.level = level;

    audio.playRoomMusic(getCurrentRoomMusic(this.sceneInitParams.roomType).key);
    audio.setMusicMute(this.sceneInitParams.isMusicMuted);

    const { playerEnterFrom } = this.sceneInitParams;
    this.player = new Player(this, playerEnterFrom);
    console.log(this.player.x);

    // camera constraint
    this.cameras.main
      .setBounds(0, 0, level.widthInPixels, level.heightInPixels)
      .startFollow(this.player);

    createDoors(this); // must be called after player is created

    EventBus.emit(EventNames.READY, this);
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
  }
}
