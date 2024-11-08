import { useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import Container from "./components/Container";
import Menu from "./components/Menu";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [phaserScene, setPhaserScene] = useState<Phaser.Scene | null>(null);


  // Event emitted from the PhaserGame component
  const onChangeScene = (scene: Phaser.Scene) => setPhaserScene(scene);

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} onChangeScene={onChangeScene} />
      <Container>
        <Menu phaserScene={phaserScene} />
      </Container>
    </div>
  );
}

export default App;
