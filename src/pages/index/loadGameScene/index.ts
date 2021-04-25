import { GameObject } from '@eva/eva.js';
import { Render } from '@eva/plugin-renderer-render';
import { Img } from '@eva/plugin-renderer-img';
import { Transition, TransitionSystem } from '@eva/plugin-transition';
import { Text } from '@eva/plugin-renderer-text';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { store, levelDatas } from '../store/GameDate';

const showGameScene = (bg: GameObject, e) => {
  store.level += 1;

  // const maskImg = new GameObject('maskImg', {
  //   size: { width: 500, height: 800 },
  //   origin: { x: 0, y: 0 },
  // });
  // maskImg.addComponent(new Img({ resource: 'mask' }));
  // const render = maskImg.addComponent(
  //   new Render({
  //     alpha: 0.8,
  //   })
  // );
  // const animation = maskImg.addComponent(new Transition());
  // animation.group = {
  //   idle: [
  //     {
  //       name: 'alpha',
  //       component: render,
  //       values: [
  //         {
  //           time: 0,
  //           value: 1,
  //           tween: 'ease-in',
  //         },
  //         {
  //           time: 1000,
  //           value: 0,
  //           tween: 'ease-in',
  //         },
  //         {
  //           time: 2000,
  //           value: 1,
  //         },
  //       ],
  //     },
  //   ],
  // };
  // animation.play('idle', Infinity);
  const len = levelDatas[store.level].row;
  for (let i = 0; i < len; i++) {
    const indent = i % 2 ? 10 : 30;
    for (let j = 0; j < len; j++) {
      const w = (500 - 40 - (len - 1) * 10) / len;
      const x = indent + j * (w + 10);
      const y = 300 + i * (w + 10);

      let gridColor = Math.random() > 0.5 ? 'whiteCircle' : 'orangeCircle';

      if (i === Math.floor(len / 2)) {
        gridColor = 'whiteCircle';
      }
      renderGird(bg, w, w, x, y, gridColor);
    }
  }
  const levelText = new GameObject('text', {
    position: {
      x: 0,
      y: 0,
    },
  });
  levelText.addComponent(
    new Text({
      text: `第${store.level}关`,
      style: {
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#b35d9e', '#84c35f', '#ebe44f'], // gradient
        fillGradientType: 1,
        fillGradientStops: [0.1, 0.4],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 400,
        breakWords: true,
      },
    })
  );

  bg.addChild(levelText);
};

const renderGird = (bg, width, height, x, y, gridColor) => {
  const gameBg = new GameObject(gridColor, {
    size: {
      width,
      height,
    },
    position: {
      x,
      y,
    },
  });

  gameBg.addComponent(new Img({ resource: gridColor }));
  bg.addChild(gameBg);

  // if(color === 'white'){

  // }
};

const createCat = (width, height, grid) => {
  const cat = new GameObject('cat', {
    size: {
      width: 200,
      height: 300,
    },
  });
  const catFrame = cat.addComponent(
    new SpriteAnimation({
      resource: 'normalStatus',
      speed: 300,
    })
  );
  catFrame.play();
  grid.addChild(cat);
};
const showCat = () => {};

export default showGameScene;
