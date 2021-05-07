import { GameObject } from '@eva/eva.js';
import { Img } from '@eva/plugin-renderer-img';
import { Text } from '@eva/plugin-renderer-text';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { Event, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { Sound } from '@eva/plugin-sound';
import { store, levelDatas, nodeList } from '../store/GameDate';
import { search, Point } from './catRunSearch';
import { createStartBg } from '../loadStartBg';

const showGameScene = (bg: GameObject) => {
  storeInit();
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

  initCat();

  renderLevelMsg(bg);
};
const storeInit = () => {
  store.catRunning = false;
  store.step = 0;
  store.gridNodeList = [];
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
  const gameBg = new GameObject(`[${i}][${j}]`, {
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

  watchGridClick(background, gameBg, width, gridColor); // 监听格子点击事件
  background.addChild(gameBg);
  // if (typeof store.gridNodeList[i][j] === 'undefined') {
  //   store.gridNodeList.push([]);
  // }

  store.gridNodeList.push([]);
  store.gridNodeList[i][j] = {
    x,
    y,
    width,
    gridObj: gameBg,
    row: i,
    col: j,
    canRun: gridColor === 'whiteCircle',
  }; // 将每个格子对应的位置信息保存到store中
};
const initCat = () => {
  const rowNum = levelDatas[store.level].row;
  const xPos = Math.floor(rowNum / 2);
  const position = store.gridNodeList[xPos][xPos];
  store.catPosition = [xPos, xPos];
  createCat('normalCat', position);
};
const createCat = (type: string, position: nodeList) => {
  const { width, gridObj } = position;
  const cat = new GameObject(`${type}cat`, {
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
      resource: type,
      speed: 100,
    })
  );
  const [x, y] = store.catPosition;
  store.gridNodeList[x][y] = { ...store.gridNodeList[x][y], catObj: cat };
  catFrame.play();
  gridObj.addChild(cat);
};

const watchGridClick = (
  background: GameObject,
  gridObj: GameObject,
  width: number,
  gridColor: string
) => {
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
    const isCatPos = gameObject._name === `[${catPosition[0]}][${catPosition[1]}]`;
    const resource = gameObject._componentCache.Img.resource;
    if (gridColor === 'whiteCircle' && !isCatPos && resource !== 'orangeCircle') {
      gridObj.removeComponent(Img);
      gridObj.addComponent(new Img({ resource: 'orangeCircle' }));

      const x = gameObject.name[1];
      const y = gameObject.name[4];
      const preObj = store.gridNodeList[x][y];
      store.gridNodeList[x][y] = { ...preObj, canRun: false };
      console.log('看看store', store);
      if (store.catRunning) {
        return;
      }
      playerRun(background);
    } else {
      playSuccess(background);
      console.log('啊哦, 这个已经踩过了！');
    }
    // console.log(e, gameObject._name);
  });
};

const playerRun = (background: GameObject) => {
  console.log('玩家走步');
  playSound('clickSound');
  store.step += 1;
  store.catRunning = true;
  catRun(background);
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

const catRun = (background: GameObject) => {
  const result = search(background);
  console.log('走后的结果', result);
  if (!result.hasPath) {
    // 切换状态
    changeCatStatus();
  }
  const nextStep = result.nextStep;
  // 下一步和当前所在位置一样，说明无路可走，玩家赢
  if (
    !nextStep ||
    (nextStep && nextStep.x === store.catPosition[0] && nextStep.y === store.catPosition[1])
  ) {
    // 玩家胜利
    console.log('你赢拉！');
    playSuccess(background);
    return;
  }
  // catmove(nextStep)
  // 猫到达边界，猫赢
  if (
    (nextStep && nextStep.x * nextStep.y === 0) ||
    nextStep.x === levelDatas[store.level].row - 1 ||
    nextStep.y === levelDatas[store.level].col - 1
  ) {
    // 猫赢
    playerFailed(background);
    console.log('猫赢拉！');
    return;
  }
  catMove(nextStep);
  store.catRunning = false;
};

const catMove = (nextStep: Point) => {
  const {
    catPosition: [x, y],
    gridNodeList,
  } = store;
  // console.log('猫的位置', `${x}${y}`);
  const { gridObj: prePos, catObj } = gridNodeList[x][y];
  const { gridObj: newPos } = gridNodeList[nextStep.x][nextStep.y];
  prePos.removeChild(catObj);
  newPos.addChild(catObj);
  store.catPosition = [nextStep.x, nextStep.y];
  store.gridNodeList[nextStep.x][nextStep.y] = { ...gridNodeList[nextStep.x][nextStep.y], catObj };
};
const modalBtnCreate = (
  firstName: string,
  firstResource: string,
  firstEmitFunc: Function,
  modalObj: GameObject,
  background: GameObject
) => {
  const firstBtn = new GameObject(firstName, {
    size: {
      width: 150,
      height: 80,
    },
    position: {
      x: 30,
      y: 160,
    },
  });
  firstBtn.addComponent(new Img({ resource: firstResource }));
  const firstBtnEvt = firstBtn.addComponent(new Event());
  firstBtnEvt.on('tap', () => {
    firstEmitFunc(background);
  });
  modalObj.addChild(firstBtn);
};
const playerFailed = (background: GameObject) => {
  playSound('failSound');
  const failModal = new GameObject('failModal', {
    size: {
      width: 400,
      height: 300,
    },
    position: {
      x: 50,
      y: 250,
    },
  });
  failModal.addComponent(new Img({ resource: 'failTip' }));
  background.addChild(failModal);
  const backBtn = new GameObject('backImg', {
    size: {
      width: 150,
      height: 80,
    },
    position: {
      x: 30,
      y: 160,
    },
  });
  backBtn.addComponent(new Img({ resource: 'btnBack' }));
  const backEvt = backBtn.addComponent(new Event());
  backEvt.on('tap', () => {
    returnFirstPage(background);
  });
  failModal.addChild(backBtn);

  const retry = new GameObject('retryImg', {
    size: {
      width: 150,
      height: 80,
    },
    position: {
      x: 220,
      y: 160,
    },
  });
  retry.addComponent(new Img({ resource: 'btnReplay' }));
  failModal.addChild(retry);
  const retryEvt = retry.addComponent(new Event());
  retryEvt.on('tap', () => {
    tryAgain(background);
  });
};

const tryAgain = (background: GameObject) => {
  background.remove();

  const startEvt = createStartBg(store.game);
  startEvt.emit('tap');
};
const returnFirstPage = (background: GameObject) => {
  background.destroy();

  createStartBg(store.game);
};

const playSuccess = (background: GameObject) => {
  playSound('successSound');
  const successModal = new GameObject('successModal', {
    size: {
      width: 400,
      height: 300,
    },
    position: {
      x: 50,
      y: 250,
    },
  });
  successModal.addComponent(new Img({ resource: 'successTip' }));
  background.addChild(successModal);
  modalBtnCreate('nextImg', 'btnNext', nextLevel, successModal, background);
};
const nextLevel = (background: GameObject) => {
  store.level += 1;
  tryAgain(background);
};
export const changeCatStatus = () => {
  const [x, y] = store.catPosition;
  const position = store.gridNodeList[x][y];
  const { gridObj, catObj } = position;
  gridObj.removeChild(catObj);
  createCat('loseStatus', position);
};

export default showGameScene;
