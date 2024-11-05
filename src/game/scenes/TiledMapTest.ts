import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import TiledMapBuilder, { LevelConfigType } from '../../objects/map/TiledMapBuilder';

const levelConfig: LevelConfigType = {
    key: 'level2',
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
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        TiledMapBuilder.preload(this, levelConfig);
        
        // this.load.image("background", "assets/bg.png");
    }
    
    create() {
        EventBus.emit("current-scene-ready", this);

        this.map = new TiledMapBuilder(this, levelConfig);

    }  

    changeScene() {
        this.scene.start("GameOver");
    }
}