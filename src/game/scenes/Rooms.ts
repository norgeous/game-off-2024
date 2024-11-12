import { Scene } from 'phaser';
import { EventBus, EventNames } from '../EventBus';
// import Player from '../../objects/entities/Player';
import { SceneInitParamsType } from '../../helpers/dungeonConfigParser';
import TiledMapBuilder, {
  LevelConfigType,
} from '../../objects/map/TiledMapBuilder';
import {
  buildRoomJsonPath,
  currentRoomId,
  setCurrentRoomId,
} from '../../objects/map/Map';

const levelConfig: LevelConfigType = {
  key: 'room',
  tilesetPng: './tiled/tileset/binding_of_isaac_tiles.jpg',
  tiledMapJson: './tiled/maps/room-2.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 10 }],
  spawnerConfig: [],
};

export class Rooms extends Scene {
  public map: TiledMapBuilder | undefined;

  // public player: Player;

  public sprite: Phaser.GameObjects.Sprite;

  public levelConfig: LevelConfigType;

  constructor() {
    super('Rooms');
  }

  init(dataForScene: SceneInitParamsType) {
    console.log('rooms scene got', dataForScene);
    setCurrentRoomId(dataForScene.roomType);
  }

  preload() {
    levelConfig.key = 'room-' + currentRoomId;
    levelConfig.tiledMapJson = buildRoomJsonPath();
    TiledMapBuilder.preload(this, levelConfig);
  }

  create() {
    this.map = new TiledMapBuilder(this, levelConfig);
    EventBus.emit(EventNames.READY, this);
  }

  update() {}

  changeScene() {
    this.scene.start('GameOver');
  }
}
