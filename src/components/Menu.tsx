import { useState } from 'react';
import { FaGear, FaGithub, FaXmark } from 'react-icons/fa6';
import CornerMenu, { Corner } from './CornerMenu';
import FullscreenToggle from './FullscreenToggle';
import MenuButton from './MenuButton';
import { SceneSelectorModal, SceneSelectorToggleButton } from './SceneSelector';
import isDev from '../helpers/isDev';
import MiniMap from './MiniMap';
import DungeonStateDebug, {
  DungeonStateDebugToggleButton,
} from './DungeonStateDebug';
import Health from './Health';
import Coins from './Coins';

interface IMenu {
  phaserScene: Phaser.Scene;
}

const Menu = ({ phaserScene }: IMenu) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);
  const [isMiniMapOpen, setIsMiniMapOpen] = useState(false);

  return (
    <>
      <CornerMenu $corner={Corner.TL}>
        <Health />
      </CornerMenu>

      <CornerMenu $corner={Corner.TR}>
        <MenuButton onClick={() => setSettingsIsOpen(!isSettingsOpen)}>
          {isSettingsOpen ? <FaXmark size={32} /> : <FaGear size={32} />}
        </MenuButton>
        {isSettingsOpen && (
          <>
            <FullscreenToggle />
            <MenuButton
              as="a"
              href="https://github.com/norgeous/game-off-2024"
              target="_blank"
            >
              <FaGithub size={32} />
            </MenuButton>
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
      </CornerMenu>

      <CornerMenu $corner={Corner.BL}>
        <Coins />
      </CornerMenu>

      <CornerMenu $corner={Corner.BR}>
        <MiniMap />
      </CornerMenu>

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
