import { useState } from 'react';
import { FaCog, FaImages } from 'react-icons/fa';
import Container from './Container';

const sceneNames = ['MainMenu', 'Game', 'GameOver', 'Win', 'TiledMapTest'];
const SceneSelector = ({ phaserScene }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}><FaImages /></button>
      {isOpen && (
        <Container style={{ top:'100%' }}>
          {phaserScene?.scene.key}
          {sceneNames.map(sceneName => (
            <button
              onClick={() => phaserScene?.scene.start(sceneName)}
            >
              {sceneName}
            </button>
          ))}
        </Container>
      )}
    </>
  )
};

const Menu = ({ phaserScene }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}><FaCog /></button>

      {isOpen && (
        <>
          {import.meta.env.PROD ? 'isProd':'isNotProd'}
          <SceneSelector phaserScene={phaserScene}/>
        </>
      )}
    </>
  );
};

export default Menu;
