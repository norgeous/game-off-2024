import { useContext } from 'react';
import { FaMusic } from 'react-icons/fa6';
import { FaVolumeMute } from 'react-icons/fa';
import MenuButton from './MenuButton';
import SettingsContext from '../contexts/SettingsContext';

interface IMuteMusicToggle {
  phaserScene: Phaser.Scene;
}

const MuteMusicToggle = ({ phaserScene }: IMuteMusicToggle) => {
  const { isMusicMuted, setIsMusicMuted } = useContext(SettingsContext);

  return (
    <MenuButton
      onClick={() => {
        phaserScene.sound.setMute(!isMusicMuted);
        setIsMusicMuted(!isMusicMuted);
      }}
    >
      {isMusicMuted ? <FaVolumeMute size={30} /> : <FaMusic size={30} />}
    </MenuButton>
  );
};

export default MuteMusicToggle;
