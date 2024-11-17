import { FaMusic } from 'react-icons/fa6';
import { FaVolumeMute } from 'react-icons/fa';
import { MuteMusicContext } from '../contexts/MuteMusicContext';

const MuteMusicToggle = () => {
  const { isMute, toggleMute } = MuteMusicContext(); 

  return (
    <div onClick={toggleMute} style={{ cursor: 'pointer' }}>
      {isMute ? <FaVolumeMute size={30} /> : <FaMusic size={30} />}
    </div>
  );
};

export default MuteMusicToggle;