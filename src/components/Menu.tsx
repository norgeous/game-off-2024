import { useState } from 'react';
import { FaGear, FaXmark } from 'react-icons/fa6';
import Container from './Container';
import FullscreenToggle from './FullscreenToggle';
import MenuButton from './MenuButton';
import { SceneSelectorModal, SceneSelectorToggleButton } from './SceneSelector';

const Menu = ({ phaserScene }) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);

  return (
    <>
      <Container>
        <MenuButton onClick={() => setSettingsIsOpen(!isSettingsOpen)}>
          {isSettingsOpen ? <FaXmark size={32} /> : <FaGear size={32} />}
        </MenuButton>
        {isSettingsOpen && (
          <>
            {/* {import.meta.env.PROD ? 'isProd' : 'isDev'} */}
            <FullscreenToggle />
            <SceneSelectorToggleButton
              onClick={() => setIsSceneSelectorOpen(!isSceneSelectorOpen)}
            />
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
