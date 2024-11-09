import { useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { MainMenu } from "./game/scenes/MainMenu";
import Button from "./components/Button";
import Container from "./components/Container";
import Navigation from "./enums/Navigation";

function App() {
  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [phaserScene, setPhaserScene] = useState<Phaser.Scene | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const changeScene = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;

      if (scene) {
        scene.changeScene();
      }
    }
  };

  const moveSprite = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;

      if (scene && scene.scene.key === "MainMenu") {
        // Get the update logo position
        scene.moveLogo(({ x, y }) => {
          setSpritePosition({ x, y });
        });
      }
    }
  };

  const addSprite = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene;

      if (scene) {
        // Add more stars
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);

        //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
        const star = scene.add.sprite(x, y, "star");

        //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
        //  You could, of course, do this from within the Phaser Scene code, but this is just an example
        //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
        scene.add.tween({
          targets: star,
          duration: 500 + Math.random() * 1000,
          alpha: 0,
          yoyo: true,
          repeat: -1,
        });
      }
    }
  };

  const roomNavigation = (direction: Navigation) => {
    phaserScene?.scene.start("TiledMapTest", {roomId: 1});
  }
  // Event emitted from the PhaserGame component
  const onChangeScene = (scene: Phaser.Scene) => setPhaserScene(scene);

  const sceneKey = phaserScene?.scene.key;

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} onChangeScene={onChangeScene} />
      <Container>
        scene: {sceneKey}
        <Button onClick={changeScene}>Change Scene</Button>
        <Button onClick={() => phaserScene?.scene.start("Win")}>Win</Button>
        <Button onClick={() => phaserScene?.scene.start("TiledMapTest")}>Tiled Test</Button>
        <Button disabled={sceneKey !== "MainMenu"} onClick={moveSprite}>
          Toggle Movement
        </Button>
        <div>
          Sprite Position:
          <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>
        <Button onClick={addSprite}>Add New Sprite</Button>
          Debug Map Navigation
          <Button onClick={() => roomNavigation(Navigation.UP)}>Room Up</Button>
          <Button onClick={() => roomNavigation(Navigation.DOWN)}>Room Down</Button>
          <Button onClick={() => roomNavigation(Navigation.LEFT)}>Room Left</Button>
          <Button onClick={() => roomNavigation(Navigation.RIGHT)}>Room Right</Button>
      </Container>
    </div>
  );
}

export default App;
