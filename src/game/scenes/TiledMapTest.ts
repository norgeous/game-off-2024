import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import TiledMapBuilder, { LevelConfigType } from '../../objects/map/TiledMapBuilder';

const levelConfig: LevelConfigType = {
    key: 'Room',
    tilesetPng: './tiled/tileset/binding_of_isaac_tiles.jpg',
    tiledMapJson: './tiled/maps/test.json',
    layerConfig: [
      { tiledLayerName: 'tiledLayer', depth: 10 },
    ],
    spawnerConfig: [],
};

export class TiledMapTest extends Scene {
    public map: TiledMapBuilder | undefined;

    constructor() {
        super('TiledMapTest');
    }

    static externalPreload(scene: Phaser.Scene) {
      // this.preload(scene);
      TiledMapBuilder.preload(scene, levelConfig);
    }

    preload() {
        TiledMapBuilder.preload(this, levelConfig);
    }

    create() {
        this.map = new TiledMapBuilder(this, levelConfig);
        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
