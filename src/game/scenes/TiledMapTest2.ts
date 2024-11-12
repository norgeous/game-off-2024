import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import TiledMapBuilder, {
  LevelConfigType,
} from '../../objects/map/TiledMapBuilder';
import { createControls, keysToVector, keysType } from '../../helpers/controls';

const levelConfig: LevelConfigType = {
  key: 'Room',
  tilesetPng: './tiled/tileset/binding_of_isaac_tiles.jpg',
  tiledMapJson: './tiled/maps/room-0.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [],
};

export class TiledMapTest2 extends Scene {
  public map: TiledMapBuilder | undefined;
  private player: Phaser.Physics.Matter.Sprite;
  private keys: keysType | undefined;

  constructor() {
    super('TiledMapTest2');
  }

  preload() {
    TiledMapBuilder.preload(this, levelConfig);
    this.load.image('star', 'assets/star.png');
  }

  create() {
    this.map = new TiledMapBuilder(this, levelConfig);
    this.player = this.matter.add.sprite(500, 500, 'star');
    this.door = this.matter.add.sprite(500, 100, 'star');
    this.cameras.main.startFollow(this.player);
    this.keys = createControls(this);

    this.matter.world.on('collisionstart', () => {
      EventBus.emit('use-door', this, 'north');
    });

    EventBus.emit('current-scene-ready', this);
  }

  update() {
    // this.player.setVelocity(0);

    if (this.keys) {
      const forceVector = keysToVector(this.keys, 0.005);
      this.player.applyForce(forceVector);
    }
  }

  changeScene() {
    this.scene.start('GameOver');
  }
}
