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
import MiniMap, { MiniMapToggleButton } from './MiniMap';

const myDungeon = `
678...
5.9...
4.A...
3.BCDE
2....F
1....G
0....H
`;

const Menu = ({ phaserScene }) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);
  const [isMiniMapOpen, setIsMiniMapOpen] = useState(false);

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
            <MiniMapToggleButton onClick={() => setIsMiniMapOpen(true)} />
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

      {isMiniMapOpen && (
        <MiniMap
          dungeonStr={myDungeon}
          onClose={() => setIsMiniMapOpen(false)}
        />
      )}
    </>
  );
};

export default Menu;
