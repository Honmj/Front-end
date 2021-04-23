import React, { useEffect, useState } from 'react';
import { Game, GameObject, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { Event, EventSystem } from '@eva/plugin-renderer-event';
import useLoadResource from '@/pages/loadResource';
import './index.less';

const Index = () => {
  const [hide, setHide] = useState('flex');
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const canvas = document.querySelector('#canvas');
    // const loading = document.querySelector('#loading');
    useLoadResource(canvas, setHide, setNumber);
  }, []);

  return (
    <>
      <div className="container">
        <div id="loading" style={{ display: hide }}>
          <div className="text_and_loading">
            <ul className="strip-loading">
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>
            <div className="text">{number}%</div>
          </div>
        </div>
        <canvas id="canvas" />
      </div>
    </>
  );
};
export default Index;
