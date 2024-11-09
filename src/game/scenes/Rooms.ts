import { EventBus } from '../EventBus';
// import Player from '../../objects/entities/Player';
import { Scene } from 'phaser';
import TiledMapBuilder, {
  LevelConfigType,
} from '../../objects/map/TiledMapBuilder';
import {
  buildRoomJsonPath,
  setNextRoomId,
  CurrentRoomId,
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

  init(data) {
    console.log('Rooms scene got', data);
    if (data.roomType) {
      setNextRoomId(data.roomType);
    }
  }

  preload() {
    console.log('rooms preload');
    levelConfig.key = 'room-' + CurrentRoomId;
    levelConfig.tiledMapJson = buildRoomJsonPath();
    TiledMapBuilder.preload(this, levelConfig);
  }

  create() {
    this.map = new TiledMapBuilder(this, levelConfig);
    EventBus.emit('current-scene-ready', this);
  }

  update() {}

  changeScene() {
    this.scene.start('GameOver');
  }
}
