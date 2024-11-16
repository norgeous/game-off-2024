import styled from 'styled-components';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import startGame from './phaserConfig';
import { EventBus } from './EventBus';

const HTML_CANVAS_ID = 'game-container';

const GameContainer = styled.div.attrs({
  id: HTML_CANVAS_ID,
})`
  width: 100%;
  height: 100lvmin;
  max-height: 100lvmin;
  canvas {
    display: block;
    width: 100%;
    height: 100%;
    /* image-rendering: pixelated; */
    object-fit: contain;
  }
`;

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  onChangeScene?: (scene_instance: Phaser.Scene) => void;
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
  function PhaserGame({ onChangeScene }, ref) {
    const game = useRef<Phaser.Game | null>(null!);

    useLayoutEffect(() => {
      if (game.current === null) {
        game.current = startGame(HTML_CANVAS_ID);

        if (typeof ref === 'function') {
          ref({ game: game.current, scene: null });
        } else if (ref) {
          ref.current = { game: game.current, scene: null };
        }
      }

      return () => {
        if (game.current) {
          game.current.destroy(true);
          if (game.current !== null) {
            game.current = null;
          }
        }
      };
    }, [ref]);

    useEffect(() => {
      EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
        if (onChangeScene && typeof onChangeScene === 'function') {
          onChangeScene(scene_instance);
        }

        if (typeof ref === 'function') {
          ref({ game: game.current, scene: scene_instance });
        } else if (ref) {
          ref.current = { game: game.current, scene: scene_instance };
        }
      });
      return () => {
        EventBus.removeListener('current-scene-ready');
      };
    }, [onChangeScene, ref]);

    return <GameContainer />;
  },
);
