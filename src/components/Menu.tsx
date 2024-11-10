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
import FullscreenToggle from './FullscreenToggle';
import MenuButton from './MenuButton';
import { SceneSelectorModal, SceneSelectorToggleButton } from './SceneSelector';
import isDev from '../helpers/isDev';
import Direction from '../enums/Direction';

interface IMenu {
  phaserScene: Phaser.Scene;
}

const Menu = ({ phaserScene }: IMenu) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);

  const roomNavigation = (direction: Direction) => {
    phaserScene?.scene.start('Rooms', direction);
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
                <MenuButton onClick={() => roomNavigation(Direction.UP)}>
                  <FaArrowUp size={32} />
                </MenuButton>
                <MenuButton onClick={() => roomNavigation(Direction.DOWN)}>
                  <FaArrowDown size={32} />
                </MenuButton>
                <MenuButton onClick={() => roomNavigation(Direction.LEFT)}>
                  <FaArrowLeft size={32} />
                </MenuButton>
                <MenuButton onClick={() => roomNavigation(Direction.RIGHT)}>
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
