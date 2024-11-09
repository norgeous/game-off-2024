import { useState } from 'react';
import { FaGear, FaXmark, FaImages } from 'react-icons/fa6';
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

const SceneSelector = ({ phaserScene, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
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
        <Button onClick={() => setSettingsIsOpen(!isSettingsOpen)}>
          {isSettingsOpen ? <FaXmark size={32} /> : <FaGear size={32} />}
        </Button>
        {isSettingsOpen && (
          <>
            {/* {import.meta.env.PROD ? 'isProd' : 'isDev'} */}
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
          <SceneSelector
            phaserScene={phaserScene}
            isOpen={isSceneSelectorOpen}
            setIsOpen={setIsSceneSelectorOpen}
          />
        </>
      )}
    </>
  );
};

export default Menu;
