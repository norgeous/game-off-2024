import { useState } from 'react';
import { FaGear, FaXmark, FaImages } from 'react-icons/fa6';
import Container from './Container';
import Modal from './Modal';
import FullscreenToggle from './FullscreenToggle';
import MenuButton from './MenuButton';

const sceneNames = [
  'Boot',
  'Preloader',
  'MainMenu',
  'Game',
  'GameOver',
  'Win',
  'TiledMapTest',
];

const SceneSelectorModal = ({ phaserScene, setIsOpen }) => (
  <Modal onClose={() => setIsOpen(false)}>
    <h1 style={{ margin: 0 }}>Scene Selector</h1>
    <div>
      current: <b>{phaserScene?.scene.key}</b>
    </div>
    {sceneNames.map((sceneName) => (
      <button
        key={sceneName}
        onClick={() => {
          phaserScene?.scene.start(sceneName);
          setIsOpen(false);
        }}
      >
        {sceneName}
      </button>
    ))}
  </Modal>
);

const Menu = ({ phaserScene }) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);

  return (
    <>
      <Container>
        <MenuButton onClick={() => setSettingsIsOpen(!isSettingsOpen)}>
          {isSettingsOpen ? <FaXmark size={32} /> : <FaGear size={32} />}
        </MenuButton>
        {isSettingsOpen && (
          <>
            {/* {import.meta.env.PROD ? 'isProd' : 'isDev'} */}
            <FullscreenToggle />
            <MenuButton
              onClick={() => setIsSceneSelectorOpen(!isSceneSelectorOpen)}
            >
              <FaImages size={32} />
            </MenuButton>
          </>
        )}
      </Container>

      {isSceneSelectorOpen && (
        <SceneSelectorModal
          phaserScene={phaserScene}
          setIsOpen={setIsSceneSelectorOpen}
        />
      )}
    </>
  );
};

export default Menu;
