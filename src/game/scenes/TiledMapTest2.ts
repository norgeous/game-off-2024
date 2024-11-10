import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import TiledMapBuilder, {
  LevelConfigType,
} from '../../objects/map/TiledMapBuilder';

const levelConfig: LevelConfigType = {
  key: 'Room',
  tilesetPng: './tiled/tileset/binding_of_isaac_tiles.jpg',
  tiledMapJson: './tiled/maps/room-1.json',
  layerConfig: [{ tiledLayerName: 'tiledLayer', depth: 0 }],
  spawnerConfig: [],
};

type keysType = { [keyCodes: string]: Phaser.Input.Keyboard.Key };

const keysToVector = (keys: keysType, power:number) => {
  const vector = { x: 0, y:0 };

  if (keys?.A.isDown) vector.x += -power;
  if (keys?.D.isDown) vector.x += power;
  if (keys?.W.isDown) vector.y += -power;
  if (keys?.S.isDown) vector.y += power;

  const forceVector = new Phaser.Math.Vector2(vector);

  return forceVector;
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

    this.keys = this.input.keyboard?.addKeys('W,A,S,D') as keysType;

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
