import { useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import Button from "./components/Button";
import Container from "./components/Container";
import Navigation from "./enums/Navigation";
import Menu from "./components/Menu";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [phaserScene, setPhaserScene] = useState<Phaser.Scene | null>(null);

  // Event emitted from the PhaserGame component
  const onChangeScene = (scene: Phaser.Scene) => setPhaserScene(scene);

  return (
    <div id="app">
      <Menu phaserScene={phaserScene} />
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
