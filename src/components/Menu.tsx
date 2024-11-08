import { useState } from 'react';
import { FaCog, FaImages } from 'react-icons/fa';

const sceneNames = ['MainMenu', 'Game', 'GameOver', 'Win', 'TiledMapTest'];
const SceneSelector = ({ phaserScene }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Current scene: {phaserScene?.scene.key} <FaImages /></button>
      {isOpen && (
        <>
          {sceneNames.map(sceneName => (
            <button
              onClick={() => phaserScene?.scene.start(sceneName)}
            >
              {sceneName}
            </button>
          ))}
        </>
      )}
    </>
  )
};

const Menu = ({ phaserScene }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      {import.meta.env.PROD ? 'isProd':'isNotProd'}
      <button onClick={() => setIsOpen(!isOpen)}>Settings <FaCog /></button>
      {isOpen && (
        <>
          <SceneSelector phaserScene={phaserScene}/>
        </>
      )}
    </>
  );
};

export default Menu;
