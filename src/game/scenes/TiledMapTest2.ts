import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import TiledMapBuilder, {
  LevelConfigType,
} from '../../objects/map/TiledMapBuilder';

const levelConfig: LevelConfigType = {
  key: 'Room',
  tilesetPng: './tiled/tileset/binding_of_isaac_tiles.jpg',
  tiledMapJson: './tiled/maps/test.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [],
};

export class TiledMapTest2 extends Scene {
  public map: TiledMapBuilder | undefined;

  constructor() {
    super('TiledMapTest2');
  }

  preload() {
    TiledMapBuilder.preload(this, levelConfig);
    this.load.image('star', 'assets/star.png');
  }

  create() {
    this.map = new TiledMapBuilder(this, levelConfig);

    const star = this.matter.add.sprite(500, 500, 'star');
    this.cameras.main.startFollow(star);
    this.matter.add.mouseSpring({ length: 1, stiffness: 0.6 });

    EventBus.emit('current-scene-ready', this);
  }

  changeScene() {
    this.scene.start('GameOver');
  }
}
