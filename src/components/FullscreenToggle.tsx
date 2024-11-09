import { useEffect, useState } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa6';
import screenfull from 'screenfull';
import MenuButton from './MenuButton';

const FullscreenToggle = () => {
  const [isFull, setIsFull] = useState(screenfull.isFullscreen);

  useEffect(() => {
    screenfull.on('change', () => setIsFull(screenfull.isFullscreen));
  }, []);

  const toggle = () => {
    if (screenfull.isFullscreen) {
      screenfull.exit();
    } else {
      screenfull.request();
    }
  };

  if (!screenfull.isEnabled) return null;

  return (
    <MenuButton onClick={toggle}>
      {isFull ? <FaCompress size={32} /> : <FaExpand size={32} />}
    </MenuButton>
  );
};

export default FullscreenToggle;
