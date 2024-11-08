import { useState } from 'react';
import { FaCog, FaImages } from 'react-icons/fa';
import Container from "./Container";
import Modal from "./Modal";

const sceneNames = ['MainMenu', 'Game', 'GameOver', 'Win', 'TiledMapTest'];

const SceneSelector = ({ phaserScene, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          {phaserScene?.scene.key}
          {sceneNames.map(sceneName => (
            <button
              onClick={() => {
                phaserScene?.scene.start(sceneName);
                setIsOpen(false);
              }}
            >
              {sceneName}
            </button>
          ))}
        </Modal>
      )}
    </>
  );
};

const Menu = ({ phaserScene }) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);

  return (
    <>
      <Container>
        <button onClick={() => setSettingsIsOpen(!isSettingsOpen)}><FaCog /></button>
        {isSettingsOpen && (
          <>
            {/* {import.meta.env.PROD ? 'isProd' : 'isDev'} */}
            <button onClick={() => setIsSceneSelectorOpen(!isSceneSelectorOpen)}><FaImages /></button>
          </>
        )}
      </Container>
      {isSceneSelectorOpen && (
        <>
          <SceneSelector phaserScene={phaserScene} isOpen={isSceneSelectorOpen} setIsOpen={setIsSceneSelectorOpen} />
        </>
      )}
    </>
  );
};

export default Menu;
