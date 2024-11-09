import { useState } from 'react';
import {
  FaGear,
  FaXmark,
  FaExpand,
  FaCompress,
  FaImages,
} from 'react-icons/fa6';
import styled from 'styled-components';
import Container from './Container';
import Modal from './Modal';

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
`;

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

const FullscreenToggle = () => {
  const isFullscreen = false;
  return (
    <Button onClick={() => alert('!')}>
      {isFullscreen ? <FaExpand size={32} /> : <FaCompress size={32} />}
    </Button>
  );
};

const Menu = ({ phaserScene }) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);

  return (
    <>
      <Container>
        <Button onClick={() => setSettingsIsOpen(!isSettingsOpen)}>
          {isSettingsOpen ? <FaXmark size={32} /> : <FaGear size={32} />}
        </Button>
        {isSettingsOpen && (
          <>
            {/* {import.meta.env.PROD ? 'isProd' : 'isDev'} */}
            <FullscreenToggle />
            <Button
              onClick={() => setIsSceneSelectorOpen(!isSceneSelectorOpen)}
            >
              <FaImages size={32} />
            </Button>
          </>
        )}
      </Container>
      {isSceneSelectorOpen && (
        <>
          <SceneSelectorModal
            phaserScene={phaserScene}
            setIsOpen={setIsSceneSelectorOpen}
          />
        </>
      )}
    </>
  );
};

export default Menu;
