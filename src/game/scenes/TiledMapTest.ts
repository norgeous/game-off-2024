import { EventBus } from "../EventBus";
import { Scene } from "phaser";
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

// Tileset from https://www.deviantart.com/wanyo/art/Binding-of-Isaac-Rebirth-Tiles-610590075
  
export class TiledMapTest extends Scene {
    public map: TiledMapBuilder | undefined;

    constructor() {
        super("TiledMapTest");
    }
    
    preload() {
        TiledMapBuilder.preload(this, levelConfig);
    }
    
    create() {
        this.map = new TiledMapBuilder(this, levelConfig);
        EventBus.emit("current-scene-ready", this);
    }  

    changeScene() {
        this.scene.start("GameOver");
    }
}