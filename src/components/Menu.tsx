import { useState } from 'react';
import {
  FaGear,
  FaXmark,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa6';
import Container from './Container';
import Navigation from '../enums/Navigation';
import FullscreenToggle from './FullscreenToggle';
import MenuButton from './MenuButton';
import { SceneSelectorModal, SceneSelectorToggleButton } from './SceneSelector';
import isDev from '../helpers/isDev';

const Menu = ({ phaserScene }) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);

  const roomNavigation = (direction: Navigation) => {
    phaserScene?.scene.start('TiledMapTest', { roomId: 1 });
  };

  return (
    <>
      <Container>
        <MenuButton onClick={() => setSettingsIsOpen(!isSettingsOpen)}>
          {isSettingsOpen ? <FaXmark size={32} /> : <FaGear size={32} />}
        </MenuButton>
        {isSettingsOpen && (
          <>
            <FullscreenToggle />
            {isDev && (
              <>
                <SceneSelectorToggleButton
                  onClick={() => setIsSceneSelectorOpen(!isSceneSelectorOpen)}
                />
                <MenuButton onClick={() => roomNavigation(Navigation.UP)}>
                  <FaArrowUp size={32} />
                </MenuButton>
                <MenuButton onClick={() => roomNavigation(Navigation.DOWN)}>
                  <FaArrowDown size={32} />
                </MenuButton>
                <MenuButton onClick={() => roomNavigation(Navigation.LEFT)}>
                  <FaArrowLeft size={32} />
                </MenuButton>
                <MenuButton onClick={() => roomNavigation(Navigation.RIGHT)}>
                  <FaArrowRight size={32} />
                </MenuButton>
              </>
            )}
          </>
        )}
      </Container>

      {isSceneSelectorOpen && (
        <SceneSelectorModal
          phaserScene={phaserScene}
          onClose={() => setIsSceneSelectorOpen(false)}
        />
      )}
    </>
  );
};

export default Menu;
