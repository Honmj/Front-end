import { LOAD_EVENT, resource, RESOURCE_TYPE } from '@eva/eva.js';
import loadStartScene from '../index/loadStartBg';

const useLoadResource = (canvas, setHide, setNumber) => {
  resource.addResource([
    {
      name: 'image1',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/bg.jpg',
        },
      },
      preload: true,
    },
    {
      name: 'image2',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/cat_start_bg.png',
        },
      },
      preload: true,
    },
    {
      name: 'image3',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/btn_start.png',
        },
      },
      preload: true,
    },
    {
      name: 'image4',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/btn_replay.png',
        },
      },
      preload: true,
    },
    {
      name: 'image5',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/btn_back.png',
        },
      },
      preload: true,
    },
    {
      name: 'image4',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/btn_next.png',
        },
      },
      preload: true,
    },
    {
      name: 'nomalcat',
      type: RESOURCE_TYPE.SPRITE_ANIMATION,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/cat_normal.png',
        },
        json: {
          type: 'json',
          url: '../../../public/resource/assets/img/cat_normal.json',
        },
      },
      preload: false,
    },
    {
      name: 'loseStatus',
      type: RESOURCE_TYPE.SPRITE_ANIMATION,
      src: {
        json: {
          type: 'json',
          url: '../../../public/resource/assets/img/cat_loser.json',
        },
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/cat_loser.png',
        },
      },
      preload: true,
    },
    {
      name: 'whiteCircle',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/grid_white.png',
        },
      },
      preload: true,
    },
    {
      name: 'orangeCircle',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/grid_yellow.png',
        },
      },
      preload: false,
    },
    {
      name: 'mask',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'jpg',
          url: '../../../public/resource/assets/img/mask.jpg',
        },
      },
      preload: false,
    },
  ]);

  resource.preload();
  resource.on(LOAD_EVENT.START, (e) => {
    console.log('加载中');
  });
  resource.on(LOAD_EVENT.PROGRESS, (e) => {
    setNumber(e.progress * 100);
    // console.log('progress', e);
  });
  resource.on(LOAD_EVENT.COMPLETE, () => {
    setHide('none');
    console.log('加载完成');
    loadStartScene(canvas);
  }); // 加载完成
};
export default useLoadResource;
