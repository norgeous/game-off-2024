import { useState } from 'react';
import { FaGear, FaGithub, FaBomb, FaXmark } from 'react-icons/fa6';
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
import PlayerDebug, { PlayerDebugToggleButton } from './PlayerDebug';
import MuteMusicToggle from './MuteMusicToggle';
import ShopButtons from './ShopButtons';
import { EventBus, EventNames } from '../helpers/EventBus';

interface IMenu {
  phaserScene: Phaser.Scene;
}

const Menu = ({ phaserScene }: IMenu) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);
  const [isMiniMapOpen, setIsMiniMapOpen] = useState(false);
  const [isPlayerDebugOpen, setIsPlayerDebugOpen] = useState(false);

  return (
    <>
      <CornerMenu $corner={Corner.TL}>
        <Coins phaserScene={phaserScene} />
        <Health />
      </CornerMenu>
      <CornerMenu $corner={Corner.TR}>
        <MenuButton onClick={() => setSettingsIsOpen(!isSettingsOpen)}>
          {isSettingsOpen ? <FaXmark size={30} /> : <FaGear size={30} />}
        </MenuButton>
        {isSettingsOpen && (
          <>
            <FullscreenToggle />

            <MuteMusicToggle phaserScene={phaserScene} />

            <MenuButton
              as="a"
              href="https://github.com/norgeous/game-off-2024"
              target="_blank"
            >
              <FaGithub size={30} />
            </MenuButton>
            {isDev && (
              <>
                <SceneSelectorToggleButton
                  onClick={() => setIsSceneSelectorOpen(!isSceneSelectorOpen)}
                />
                <DungeonStateDebugToggleButton
                  onClick={() => setIsMiniMapOpen(true)}
                />
                <PlayerDebugToggleButton
                  onClick={() => setIsPlayerDebugOpen(true)}
                />
                <MenuButton
                  onClick={() =>
                    [...phaserScene.spawners.enemy.getChildren()].forEach(
                      (enemy) => {
                        enemy.death();
                      },
                    )
                  }
                >
                  <FaBomb size={30} />
                </MenuButton>
              </>
            )}
          </>
        )}
      </CornerMenu>
      {phaserScene.scene.key === 'Room' && (
        <CornerMenu $corner={Corner.BR}>
          <MiniMap />
        </CornerMenu>
      )}
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
      {isPlayerDebugOpen && (
        <PlayerDebug
          phaserScene={phaserScene}
          onClose={() => setIsPlayerDebugOpen(false)}
        />
      )}

      {phaserScene.scene.key === 'MainMenu' && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            paddingBottom: 160,
          }}
        >
          <button
            style={{
              fontSize: 30,
              padding: 12,
            }}
            onClick={() => EventBus.emit(EventNames.START, phaserScene)}
          >
            Start Game
          </button>
          <button
            style={{
              fontSize: 30,
              padding: 12,
            }}
            onClick={() => phaserScene.scene.start('Shop')}
          >
            Power Up!
          </button>
        </div>
      )}

      {phaserScene.scene.key === 'Shop' && (
        <ShopButtons
          phaserScene={phaserScene}
          onClose={() => phaserScene.scene.start('MainMenu')}
        />
      )}
    </>
  );
};

export default Menu;
