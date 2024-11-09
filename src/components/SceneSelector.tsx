import { FaImages } from 'react-icons/fa6';
import Modal from './Modal';
import MenuButton from './MenuButton';

const sceneNames = [
  'Boot',
  'Preloader',
  'MainMenu',
  'Game',
  'GameOver',
  'Win',
  'Rooms',
];

const SceneSelectorModal = ({ phaserScene, onClose }) => (
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

const SceneSelectorToggleButton = ({ onClick }) => (
  <MenuButton onClick={onClick}>
    <FaImages size={32} />
  </MenuButton>
);

export { SceneSelectorToggleButton, SceneSelectorModal };
