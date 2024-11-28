import { EventBus, EventNames } from '../helpers/EventBus';
import { Scene } from 'phaser';
import { SceneInitParamsType } from '../helpers/dungeonConfigParser';
import createDoors from '../helpers/doors';
import Player from '../objects/entities/Player';
import { getCurrentRoomMusic } from '../helpers/getMusicConfig';
import audio from '../objects/Audio';
import { createRoom, preloadRoom } from '../rooms';
import PhaserNavMeshPlugin, { PhaserNavMesh } from 'phaser-navmesh/src';

export let navMesh: PhaserNavMesh;

export class TiledMapTest2 extends Scene {
  public sceneInitParams: SceneInitParamsType;
  public level: Phaser.Tilemaps.Tilemap | undefined;
  public spawners: { [k: string]: Phaser.GameObjects.Group };
  public player: Player;

  constructor() {
    super('TiledMapTest2');
  }

  init(sceneInitParams: SceneInitParamsType) {
    console.log(sceneInitParams);
    this.sceneInitParams = sceneInitParams;
  }

  preload() {
    const { roomType } = this.sceneInitParams;

    Player.preload(this);

    this.load.image('door', 'assets/door.png');

    // new preloader
    preloadRoom(this, roomType);
  }

  create() {
    const { roomType } = this.sceneInitParams;

    console.log('TiledMapTest2 scene got', this.sceneInitParams, this);

    // load tiled level
    const { level, spawners } = createRoom(this, roomType);
    this.level = level;
    this.spawners = spawners;

    // navmesh
    const navMeshLayer = this.level.getObjectLayer('navmesh');
    if (navMeshLayer !== null) {
      const plugin = new PhaserNavMeshPlugin(
        this,
        this.plugins,
        'navMeshPlugin',
      );
      navMesh = plugin.buildMeshFromTiled(
        'navmesh',
        this.level.getObjectLayer('navmesh'),
        100,
      );
    }

    // setup audio
    audio.playRoomMusic(getCurrentRoomMusic(this.sceneInitParams.roomType).key);
    audio.setMusicMute(this.sceneInitParams.isMusicMuted);

    // create player
    const { playerEnterFrom } = this.sceneInitParams;
    this.player = new Player(this, playerEnterFrom);

    // camera constraint
    this.cameras.main
      .setBounds(0, 0, level.widthInPixels, level.heightInPixels)
      .startFollow(this.player);

    createDoors(this); // must be called after player is created

    EventBus.emit(EventNames.READY, this);
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
  }
}
