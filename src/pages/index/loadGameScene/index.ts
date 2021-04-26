import { GameObject } from '@eva/eva.js';
import { Render } from '@eva/plugin-renderer-render';
import { Img } from '@eva/plugin-renderer-img';
import { Transition, TransitionSystem } from '@eva/plugin-transition';
import { Text } from '@eva/plugin-renderer-text';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { Event, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { Sound } from '@eva/plugin-sound';
import { store, levelDatas } from '../store/GameDate';

const showGameScene = (bg: GameObject) => {
  store.level += 1;
  store.gridNodeList = [];
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
  for (let i = 0; i < len; ++i) {
    const indent = i % 2 ? 10 : 30; //  偶数行缩进
    for (let j = 0; j < len; ++j) {
      const w = (500 - 40 - (len - 1) * 10) / len; // 格子宽度
      const x = indent + j * (w + 10); // 每个格子渲染的位置
      const y = 300 + i * (w + 10);

      let gridColor = Math.random() > 0.5 ? 'whiteCircle' : 'orangeCircle';

      if (i === Math.floor(len / 2)) {
        gridColor = 'whiteCircle';
      }
      renderGird(bg, w, w, x, y, gridColor, i, j);
    }
  }

  createCat();

  renderLevelMsg(bg);
};

const renderLevelMsg = (background: GameObject) => {
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

  background.addChild(levelText);
};

const renderGird = (
  background: GameObject,
  width: number,
  height: number,
  x: number,
  y: number,
  gridColor: string,
  i: number,
  j: number
) => {
  const gameBg = new GameObject(`第[${i}][${j}]个`, {
    size: {
      width,
      height,
    },
    position: {
      x,
      y,
    },
    origin: {
      x: 0,
      y: 0,
    },
  });

  gameBg.addComponent(new Img({ resource: gridColor }));

  watchGridClick(gameBg, width, gridColor); // 监听格子点击事件
  background.addChild(gameBg);
  // if (typeof store.gridNodeList[i][j] === 'undefined') {
  //   store.gridNodeList.push([]);
  // }
  store.gridNodeList.push([]);
  store.gridNodeList[i][j] = { x, y, width, obj: gameBg }; // 将每个格子对应的位置信息保存到store中
};

const createCat = () => {
  const rowNum = levelDatas[store.level].row;
  const xPos = Math.floor(rowNum / 2);
  const position = store.gridNodeList[xPos][xPos];
  console.log('格子位置', position);
  const { width, obj } = position;
  store.catPosition = [xPos, xPos];
  const cat = new GameObject('cat', {
    size: {
      width: 0.8 * width,
      height: 1.2 * width,
    },
    position: {
      x: 0.1 * width,
      y: -(width / 2),
    },
  });
  const catFrame = cat.addComponent(
    new SpriteAnimation({
      resource: 'normalCat',
      speed: 100,
    })
  );

  catFrame.play();
  obj.addChild(cat);
};

const watchGridClick = (gridObj: GameObject, width: number, gridColor: string) => {
  const clickEvt = gridObj.addComponent(
    new Event({
      hitArea: {
        type: HIT_AREA_TYPE.Circle,
        style: {
          x: width / 2,
          y: width / 2,
          radius: width / 2,
        },
      },
    })
  );
  clickEvt.on('tap', (e) => {
    const { gameObject } = e;
    const { catPosition } = store;
    const isCatPos = gameObject._name === `第[${catPosition[0]}][${catPosition[1]}]个`;

    if (gridColor === 'whiteCircle' && !isCatPos) {
      gridObj.removeComponent(Img);
      gridObj.addComponent(new Img({ resource: 'orangeCircle' }));

      playerRun();
    } else {
      console.log('啊哦, 这个已经踩过了！');
    }
    console.log(e, gameObject._name);
  });
};

const playerRun = () => {
  playSound('clickSound');
  store.step += 1;
  store.catRunning = true;
  catRun();
};
const playSound = (type: string) => {
  const soundObj = new GameObject(`${type}sound`);
  const sound = soundObj.addComponent(
    new Sound({
      resource: type,
      loop: false,
      autoplay: true,
    })
  );

  sound.play();
};

const catRun = () => {};
export default showGameScene;
