import { useState } from 'react';
import { FaMusic } from 'react-icons/fa6';
import { FaVolumeMute } from 'react-icons/fa';
import MenuButton from './MenuButton';

interface IMuteMusicToggle {
  phaserScene: Phaser.Scene;
}

const MuteMusicToggle = ({ phaserScene }: IMuteMusicToggle) => {
  const [isMute, setIsMute] = useState(false);

  return (
    <MenuButton
      onClick={() => {
        phaserScene.sound.setMute(!isMute);
        setIsMute(!isMute);
      }}
      style={{ cursor: 'pointer' }}
    >
      {isMute ? <FaVolumeMute size={30} /> : <FaMusic size={30} />}
    </MenuButton>
  );
};

export default MuteMusicToggle;
