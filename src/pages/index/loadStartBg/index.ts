import { Game, GameObject } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { Transition, TransitionSystem } from '@eva/plugin-transition';
import { EvaXSystem, EvaX } from '@eva/plugin-evax';
import { TextSystem } from '@eva/plugin-renderer-text';
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { SoundSystem } from '@eva/plugin-sound';
import showGameScene from '../loadGameScene';
import { store } from '../store/GameDate';

const loadStartScene = (canvas: HTMLCanvasElement) => {
  // 创建渲染系统
  const renderSystem = new RendererSystem({
    canvas, // 可选，自动生成 canvas 挂在 game.canvas 上
    width: 500,
    height: 800,
    transparent: true,
    resolution: window.devicePixelRatio, // 可选, 如果是2倍图设计 可以除以2
    preventScroll: true, // 阻止页面滚动
    renderType: 0, // 0:自动判断，1: WebGL，2:Canvas
  });

  // 创建游戏对象
  const game = new Game({
    frameRate: 60, // 可选，游戏帧率，默认60
    autoStart: true, // 可选，自动开始
    systems: [
      renderSystem,
      new ImgSystem(),
      new EventSystem(),
      new TransitionSystem(),
      new EvaXSystem({ store }),
      new TextSystem(),
      new SpriteAnimationSystem(),
      new SoundSystem(),
    ],
  });

  createStartBg(game);
};
export const createStartBg = (game: Game) => {
  store.game = game;
  const evaxManager = new GameObject('evaxManager');
  evaxManager.addComponent(
    new EvaX({
      events: {
        'store.level': (store, oldStore) => {
          // console.log('数据改变', store, oldStore);
        },
      },
    })
  );
  //  游戏对象1
  const background = new GameObject('gameObj1', {
    size: {
      width: 500,
      height: 800,
    },
  });
  background.addComponent(new Img({ resource: 'background' }));

  const catImg = new GameObject('catImg', {
    size: {
      width: 200,
      height: 300,
    },
    position: {
      x: 170,
      y: 300,
    },
  });
  catImg.addComponent(new Img({ resource: 'catBackground' }));
  const btnImg = new GameObject('btnImg', {
    size: {
      width: 200,
      height: 80,
    },
    position: {
      x: 160,
      y: 650,
    },
  });
  btnImg.addComponent(new Img({ resource: 'btnStart' }));
  const btnAnimation = btnImg.addComponent(new Transition());
  btnAnimation.group = {
    move: [
      {
        name: 'scale.x',
        component: btnImg.transform,
        values: [
          {
            time: 0,
            value: 1,
            tween: 'ease-out',
          },
          {
            time: 400,
            value: 1.2,
            tween: 'ease-in',
          },
          {
            time: 800,
            value: 1,
          },
        ],
      },
      {
        name: 'scale.y',
        component: btnImg.transform,
        values: [
          {
            time: 0,
            value: 1,
            tween: 'ease-out',
          },
          {
            time: 400,
            value: 1.2,
            tween: 'ease-in',
          },
          {
            time: 800,
            value: 1,
          },
        ],
      },
    ],
  };
  btnAnimation.play('move', Infinity);
  const startEvt = btnImg.addComponent(
    new Event({
      // 使用这个属性设置交互事件可以触发的区域，骨骼动画有所变差，可以临时在当前游戏对象下添加一个同类型同属性的Graphic查看具体点击位置。
      hitArea: {
        type: HIT_AREA_TYPE.Rect,
        style: {
          x: 0,
          y: 0,
          width: 200,
          height: 80,
        },
      },
    })
  );

  background.addChild(catImg);
  background.addChild(btnImg);
  game.scene.addChild(background); // 把游戏对象放入场景，这样画布上就可以显示这张图片了
  game.scene.addChild(evaxManager);

  startEvt.on('tap', () => {
    background.removeChild(catImg);
    background.removeChild(btnImg);
    showGameScene(background);
  });
  return startEvt;
};

export default loadStartScene;
