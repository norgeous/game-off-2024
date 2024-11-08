import { useState } from 'react';
import { FaCog, FaImages } from 'react-icons/fa';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}><FaCog /></button>
      {isOpen && (
        <>
          <button><FaImages /></button>
        </>
      )}
    </>
  );
};

export default Menu;
