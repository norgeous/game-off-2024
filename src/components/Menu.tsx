import { useState } from 'react';
import { FaGear, FaXmark } from 'react-icons/fa6';
import Container from './Container';
import FullscreenToggle from './FullscreenToggle';
import MenuButton from './MenuButton';
import { SceneSelectorModal, SceneSelectorToggleButton } from './SceneSelector';
import isDev from '../helpers/isDev';
import MiniMap, { MiniMapToggleButton } from './MiniMap';

const myDungeon = `
678......
5.9......
4.1......
3.2345...
2....6...
1....7...
0....89ab
`;

const Menu = ({ phaserScene }) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);
  const [isMiniMapOpen, setIsMiniMapOpen] = useState(false);

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
                <MiniMapToggleButton onClick={() => setIsMiniMapOpen(true)} />
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
          phaserScene={phaserScene}
          dungeonStr={myDungeon}
          onClose={() => setIsMiniMapOpen(false)}
        />
      )}
    </>
  );
};

export default Menu;
