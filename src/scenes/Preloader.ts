import { Scene } from 'phaser';
import { musicConfig } from '../helpers/getMusicConfig';
import audio, { Audio } from '../objects/Audio';
import WhipBullet from '../objects/weapons/bullets/WhipBullet';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    const { width, height } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(0x00ffff);

    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(width * 0.5, height * 0.5, 'background');

    //  A simple progress bar. This is the outline of the bar.
    this.add
      .rectangle(width * 0.5, height * 0.5, 468, 32)
      .setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(
      width * 0.5 - 230,
      height * 0.5,
      4,
      28,
      0xffffff,
    );

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets');
    this.load.image('logo', 'logo.png');
    this.load.image('star', 'star.png');
    Audio.preload(this, musicConfig);
    WhipBullet.preload(this);
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    this.scene.start('MainMenu');
    audio.addToConfig(this, musicConfig);
  }
}
