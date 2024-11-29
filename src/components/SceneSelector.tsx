import { FaImages } from 'react-icons/fa6';
import Modal from './Modal';
import MenuButton from './MenuButton';

const sceneNames = ['Boot', 'Preloader', 'MainMenu', 'Room', 'GameOver', 'Win'];

interface ISceneSelectorToggleButton {
  onClick: () => void;
}

const SceneSelectorToggleButton = ({ onClick }: ISceneSelectorToggleButton) => (
  <MenuButton onClick={onClick}>
    <FaImages size={30} />
  </MenuButton>
);

interface ISceneSelectorModal {
  phaserScene: Phaser.Scene;
  onClose: () => void;
}

const SceneSelectorModal = ({ phaserScene, onClose }: ISceneSelectorModal) => (
  <Modal onClose={onClose}>
    <h1 style={{ margin: 0 }}>Scene Selector</h1>
    <div>
      current: <b>{phaserScene?.scene.key}</b>
    </div>
    {sceneNames.map((sceneName) => (
      <button
        key={sceneName}
        onClick={() => {
          phaserScene?.scene.start(sceneName);
          onClose();
        }}
      >
        {sceneName}
      </button>
    ))}
  </Modal>
);

export { SceneSelectorToggleButton, SceneSelectorModal };
