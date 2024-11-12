import { useState } from 'react';
import { FaGear, FaXmark } from 'react-icons/fa6';
import Container from './Container';
import FullscreenToggle from './FullscreenToggle';
import MenuButton from './MenuButton';
import { SceneSelectorModal, SceneSelectorToggleButton } from './SceneSelector';
import isDev from '../helpers/isDev';
import MiniMap from './MiniMap';
import DungeonStateDebug, {
  DungeonStateDebugToggleButton,
} from './DungeonStateDebug';

interface IMenu {
  phaserScene: Phaser.Scene;
}

const Menu = ({ phaserScene }: IMenu) => {
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
                <DungeonStateDebugToggleButton
                  onClick={() => setIsMiniMapOpen(true)}
                />
              </>
            )}
          </>
        )}
      </Container>

      <Container style={{top:'auto',bottom:0}}>

      <MiniMap />
      </Container>

      {isSceneSelectorOpen && (
        <SceneSelectorModal
          phaserScene={phaserScene}
          onClose={() => setIsSceneSelectorOpen(false)}
        />
      )}

      {isMiniMapOpen && (
        <DungeonStateDebug
          phaserScene={phaserScene}
          onClose={() => setIsMiniMapOpen(false)}
        />
      )}
    </>
  );
};

export default Menu;
