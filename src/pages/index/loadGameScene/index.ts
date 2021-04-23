import { GameObject } from '@eva/eva.js';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { store } from '../store/GameDate';

const showGameScene = (bg: GameObject, e) => {
  const gameBg = new GameObject('whiteGrid', {
    size: {
      width: 80,
      height: 80,
    },
    position: {
      x: 200,
      y: 300,
    },
  });
  gameBg.addComponent(new Img({ resource: 'whiteCircle' }));
  bg.addChild(gameBg);

  console.log(e);
};

export default showGameScene;
