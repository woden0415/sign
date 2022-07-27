import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import style from './styles/mobile.module.css'

/**
 * 1. 提示横屏
 * 2. 设置canvas宽、高
 */
export default () => { 

  const [canvasWidth, setCanvasWidth] = useState(100);
  const [canvasHeight, setCanvasHeight] = useState(100);

  const [isHorizontal, setIsHorizontal] = useState(0) // 默认是正向竖屏
  const _bodyRef = React.createRef();
  useEffect(() => { 
    // 如果不是横屏，则弹窗提示
    if (window == undefined) return
    if ([0, 180].includes(window.orientation)) { 
      alert('请横屏展示')
    }
  })

  useEffect(() => { 
    const _screenWidth = screen.width
    const _screenHeight = screen.height;
    console.log('_bodyHeight :>> ', _screenHeight);
    const _headerHeight = document.querySelector('#m_body')?.clientHeight
    setCanvasWidth(_screenWidth-20)
    setCanvasHeight(_headerHeight-1)
    // 获取宽高，赋值给canvasWidth,canvasHeight
  },[])

  const reSignHandle = () => { alert('重签')}
  const submitHandle = () => { alert('提交')}

  return (
  <React.Fragment>
    <Head>
      <link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet" />
      </Head>
      <div className={ style.m_wrapper}>
        <header className={style.m_header_wrapper}>标题</header>
        <div id="m_body" className={style.m_body_wrapper}>
          <canvas id="canvas" className={style.body_canvas_wrapper} width={canvasWidth} height={ canvasHeight}></canvas>
        </div>
        <footer className={ style.m_footer_wrapper}>
          <button onClick={ reSignHandle}>重签</button>
          <button onClick={ submitHandle }>提交</button>
        </footer>
      </div>
    
  </React.Fragment>
);
}