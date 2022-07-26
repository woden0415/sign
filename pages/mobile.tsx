import Head from 'next/head';
import React, { useEffect, useState } from 'react';


/**
 * 1. 提示横屏
 * 2. 设置canvas宽、高
 */
export default () => { 

  const [canvasWidth, setCanvasWidth] = useState(100);
  const [canvasHeight, setCanvasHeight] = useState(100);

  useEffect(() => { 
    // 如果不是横屏，则弹窗提示
  })

  useEffect(() => { 
    // 获取宽高，赋值给canvasWidth,canvasHeight
  })

  return (
  <React.Fragment>
    <Head>
      <link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet" />
    </Head>
    <canvas width={canvasWidth} height={ canvasHeight}></canvas>
    <div></div>
  </React.Fragment>
);
}