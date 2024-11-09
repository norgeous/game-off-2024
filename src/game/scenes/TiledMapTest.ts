import { EventBus } from '../EventBus';
import Player from '../../objects/entities/Player';
import { Scene } from 'phaser';
import TiledMapBuilder, {
  LevelConfigType,
} from '../../objects/map/TiledMapBuilder';
import {
  CurrentRoomId,
  CurrentMapConfig,
  getNextRoomId,
} from '../../objects/map/MapLocation';
import mapJson from '../../objects/map/Maps.json';

const levelConfig: LevelConfigType = {
  key: 'tiles',
  tilesetPng: './tiled/tileset/tilesSheet.jpg',
  tiledMapJson: './tiled/maps/testing-level.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 10 }],
  spawnerConfig: [],
};

export class TiledMapTest extends Scene {
  public map: TiledMapBuilder | undefined;

  public player: Player;

  public sprite: Phaser.GameObjects.Sprite;

  constructor() {
    super('TiledMapTest');
  }

  preload() {
    TiledMapBuilder.preload(this, levelConfig);
  }

  create() {
    console.log(CurrentRoomId);

    this.map = new TiledMapBuilder(this, levelConfig);

    // spawn player
    this.sprite = this.add.sprite(150, 200, 'player');
    this.sprite.scale = 0.3;
    this.sprite.setDepth(100);

    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.tempCharMove();
  }

  tempCharMove() {
    const keys = this.input?.keyboard?.addKeys('W,A,S,D');

    let x = this.sprite.x;
    let y = this.sprite.y;
    const moveSpeed = 3;

    if (keys?.D.isDown) {
      x += moveSpeed;
    }
    if (keys?.A.isDown) {
      x -= moveSpeed;
    }
    if (keys?.W.isDown) {
      y -= moveSpeed;
    }
    if (keys?.S.isDown) {
      y += moveSpeed;
    }
    this.sprite.setPosition(x, y);
  }

  changeScene() {
    this.scene.start('GameOver');
  }
}
