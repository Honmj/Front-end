import React, { useEffect, useState } from 'react';
import useLoadResource from '@/pages/loadResource';
import './index.less';

const Index = () => {
  const [hide, setHide] = useState('flex');
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
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
