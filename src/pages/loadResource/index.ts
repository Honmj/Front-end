import { LOAD_EVENT, resource, RESOURCE_TYPE } from '@eva/eva.js';
import React from 'react';
import loadStartScene from '../index/loadStartBg';

type setState<T> = React.Dispatch<React.SetStateAction<T>>;
const useLoadResource = (
  canvas: HTMLCanvasElement,
  setHide: setState<string>,
  setNumber: setState<number>
) => {
  resource.addResource([
    {
      name: 'background',
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
      name: 'catBackground',
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
      name: 'btnStart',
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
      name: 'btnReplay',
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
      name: 'btnBack',
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
      name: 'btnNext',
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
      name: 'normalCat',
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
          url: '../../../public/resource/assets/img/cat_lose.json',
        },
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/cat_lose.png',
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
    {
      name: 'successTip',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/end_tip_success.png',
        },
      },
      preload: false,
    },
    {
      name: 'failTip',
      type: RESOURCE_TYPE.IMAGE,
      src: {
        image: {
          type: 'png',
          url: '../../../public/resource/assets/img/end_tip_fail.png',
        },
      },
      preload: false,
    },
    {
      name: 'clickSound',
      type: RESOURCE_TYPE.AUDIO,
      src: {
        audio: {
          type: 'audio',
          url: '../../../public/resource/assets/audio/go.mp3',
        },
      },
      preload: true,
    },
    {
      name: 'successSound',
      src: {
        audio: {
          type: 'audio',
          url: '../../../public/resource/assets/audio/success.mp3',
        },
      },
      preload: true,
    },
    {
      name: 'failSound',
      src: {
        audio: {
          type: 'audio',
          url: '../../../public/resource/assets/audio/fail.mp3',
        },
      },
      preload: true,
    },
  ]);

  resource.preload();
  resource.on(LOAD_EVENT.START, (e) => {});
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
