import { EventBus, EventNames } from '../helpers/EventBus';
import { Scene } from 'phaser';
import { SceneInitParamsType } from '../helpers/dungeonConfigParser';
import createDoors from '../helpers/doors';
import Player from '../objects/entities/Player';
import { getCurrentRoomMusic } from '../helpers/getMusicConfig';
import audio from '../objects/Audio';
import { createRoom } from '../rooms';
import PhaserNavMeshPlugin, { PhaserNavMesh } from 'phaser-navmesh/src';
import getPlayerStartPosition from '../helpers/getPlayerStartPosition';

export let navMesh: PhaserNavMesh;

export class Room extends Scene {
  public sceneInitParams: SceneInitParamsType;
  public level: Phaser.Tilemaps.Tilemap | undefined;
  public doors: ReturnType<typeof createDoors>;
  public spawners: { [k: string]: Phaser.GameObjects.Group };
  public player: Player;

  constructor() {
    super('Room');
  }

  init(sceneInitParams: SceneInitParamsType) {
    this.sceneInitParams = sceneInitParams;
  }

  preload() {}

  create() {
    const { roomType, isRoomCleared } = this.sceneInitParams;

    console.log('Room scene got', this.sceneInitParams);

    // load tiled level
    const { level, spawners } = createRoom(this, roomType, isRoomCleared);
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
      navMesh = plugin.buildMeshFromTiled('navmesh', navMeshLayer, 100);
    }

    // setup audio
    audio.playRoomMusic(getCurrentRoomMusic(this.sceneInitParams.roomType).key);
    audio.setMusicMute(this.sceneInitParams.isMusicMuted);

    // create player
    const { playerEnterFrom } = this.sceneInitParams;
    this.player = new Player(this, playerEnterFrom);

    EventBus.on(EventNames.RESPAWN_PLAYER, () => {
      const { px, py } = getPlayerStartPosition(this, playerEnterFrom);
      this.player.setPosition(px, py);
    });

    // camera constraint
    this.cameras.main
      .setBounds(0, 0, level.widthInPixels, level.heightInPixels)
      .startFollow(this.player);

    this.doors = createDoors(this); // must be called after player is created

    EventBus.emit(EventNames.READY, this);
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);

    const enemyCount = this.spawners.enemy?.getLength() || 0;
    if (enemyCount === 0) this.doors?.open();
    else this.doors?.close();
  }
}
