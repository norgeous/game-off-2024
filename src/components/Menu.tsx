import { useState } from "react";
import { FaImages } from "react-icons/fa";
import {
  FaGear,
  FaXmark,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa6";
import styled from "styled-components";
import Container from "./Container";
import Modal from "./Modal";
import Navigation from "../enums/Navigation";

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
`;

const sceneNames = ["MainMenu", "Game", "GameOver", "Win", "TiledMapTest"];

const SceneSelector = ({ phaserScene, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h1 style={{ margin: 0 }}>Scene Selector</h1>
          <div>
            current: <b>{phaserScene?.scene.key}</b>
          </div>
          {sceneNames.map((sceneName) => (
            <button
              onClick={() => {
                phaserScene?.scene.start(sceneName);
                setIsOpen(false);
              }}
            >
              {sceneName}
            </button>
          ))}
        </Modal>
      )}
    </>
  );
};

const Menu = ({ phaserScene }) => {
  const [isSettingsOpen, setSettingsIsOpen] = useState(false);
  const [isSceneSelectorOpen, setIsSceneSelectorOpen] = useState(false);

  const roomNavigation = (direction: Navigation) => {
    phaserScene?.scene.start("TiledMapTest", { roomId: 1 });
  };

  return (
    <>
      <Container>
        <Button onClick={() => setSettingsIsOpen(!isSettingsOpen)}>
          {isSettingsOpen ? <FaXmark size={32} /> : <FaGear size={32} />}
        </Button>
        {isSettingsOpen && (
          <>
            {/* {import.meta.env.PROD ? 'isProd' : 'isDev'} */}
            <Button
              onClick={() => setIsSceneSelectorOpen(!isSceneSelectorOpen)}
            >
              <FaImages size={32} />
            </Button>
            <Button onClick={() => roomNavigation(Navigation.UP)}>
              <FaArrowUp size={32} />
            </Button>
            <Button onClick={() => roomNavigation(Navigation.DOWN)}>
              <FaArrowDown size={32} />
            </Button>
            <Button onClick={() => roomNavigation(Navigation.LEFT)}>
              <FaArrowLeft size={32} />
            </Button>
            <Button onClick={() => roomNavigation(Navigation.RIGHT)}>
              <FaArrowRight size={32} />
            </Button>
          </>
        )}
      </Container>
      {isSceneSelectorOpen && (
        <>
          <SceneSelector
            phaserScene={phaserScene}
            isOpen={isSceneSelectorOpen}
            setIsOpen={setIsSceneSelectorOpen}
          />
        </>
      )}
    </>
  );
};

export default Menu;
