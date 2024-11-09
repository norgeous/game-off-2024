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

type keysType = { [keyCodes: string]: Phaser.Input.Keyboard.Key };

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
    this.cameras.main.startFollow(this.player);
    this.keys = this.input.keyboard?.addKeys('W,A,S,D') as keysType;

    EventBus.emit('current-scene-ready', this);
  }

  update() {
    // this.player.setVelocity(0);

    if (this.keys?.A.isDown) {
      this.player.setVelocityX(-3);
    } else if (this.keys?.D.isDown) {
      this.player.setVelocityX(3);
    }

    if (this.keys?.W.isDown) {
      this.player.setVelocityY(-3);
    } else if (this.keys?.S.isDown) {
      this.player.setVelocityY(3);
    }
  }

  changeScene() {
    this.scene.start('GameOver');
  }
}
