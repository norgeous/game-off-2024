import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Win extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  winText: Phaser.GameObjects.Text;

  constructor() {
    super("Win");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff00ff);

    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.5);

    this.winText = this.add
      .text(512, 384, "Winner", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);

    EventBus.emit("current-scene-ready", this);
  }

  changeScene() {
    this.scene.start("MainMenu");
  }
}
