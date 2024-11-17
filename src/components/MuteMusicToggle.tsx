import { useState } from 'react';
import { FaMusic } from 'react-icons/fa6';
import { FaVolumeMute } from 'react-icons/fa';

interface IMuteMusicToggle {
  phaserScene: Phaser.Scene;
}

const MuteMusicToggle = ({ phaserScene }: IMuteMusicToggle) => {
  const [isMute, setIsMute] = useState(false);

  return (
    <div
      onClick={() => {
        phaserScene.sound.setMute(!isMute);
        setIsMute(!isMute);
      }}
      style={{ cursor: 'pointer' }}
    >
      {isMute ? <FaVolumeMute size={30} /> : <FaMusic size={30} />}
    </div>
  );
};

export default MuteMusicToggle;
