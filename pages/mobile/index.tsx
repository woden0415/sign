import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import style from './styles/mobile.module.css'
import SmoothSignature from "smooth-signature";
import { useRef } from 'react';
import { apiPostSignFindOne, apiPostSignUpdate } from "pages/api";
import { EnumSignStatus, Sign } from "src/modules/sign/Sign.entity";
import { SignDto } from "src/modules/sign/dto/Sign.dto";

/**
 * 1. 提示横屏
 * 2. 设置canvas宽、高
 */
export default () => { 

  const [canvasWidth, setCanvasWidth] = useState(100);
  const [canvasHeight, setCanvasHeight] = useState(100);
  const [signatureInstance, setSignatureInstance] = useState<SmoothSignature>()
  const [signId, setSignId] = useState<number>()
  const [signStatus, setSignStatus] = useState<EnumSignStatus>(EnumSignStatus.initial)
  const refCanvas = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => { 
    // 如果不是横屏，则弹窗提示
    if (window == undefined) return
    if ([0, 180].includes(window.orientation)) { 
      alert('请横屏展示')
    }
  })

  // 第一次进来，初始化canvas
  useEffect(() => { 
    initCanvas()
    initSignId()
  }, [])

  // 获取宽高，赋值给canvasWidth,canvasHeight
  const setSize = () => { 
    const _screenWidth = screen.width
    const _headerHeight = document.querySelector('#m_body')?.clientHeight
    setCanvasWidth(_screenWidth-20)
    setCanvasHeight(_headerHeight-1)
  }

  // 获取signId，并获取签名信息
  const initSignId = () => { 
    const params = new URLSearchParams(window.location.search)
    const signId = params.get('signId')
    getSignInfo(parseInt(signId,10))
  }

  // 初始化signature实例
  useEffect(() => { 
    const _options = {
      width: canvasWidth,
      height: canvasHeight,
      minWidth: 4,
      maxWidth: 12,
      bgColor: '#f6f6f6'
    }
    setSignatureInstance(new SmoothSignature(refCanvas.current, _options))
  }, [canvasWidth, canvasHeight])

  // 获取签名信息
  const getSignInfo = async (signId:number) => { 
    const resp: Sign = await apiPostSignFindOne({ id: signId })
    setSignId(resp.id)
    setSignStatus(resp.status)
  }

  const initCanvas = () => { 
    setSize()
  } 

  const reSignHandle = () => { signatureInstance.clear() }
  const submitHandle = async () => { 
    try {
      const _text = signatureInstance.toDataURL('image/jpeg')
      const params: SignDto = {
        id: signId,
        content: _text,
        status: EnumSignStatus.initial
      }
  
      const resp:SignDto = await apiPostSignUpdate(params)
      if (resp.status === EnumSignStatus.cancel) { 
        alert('签名已取消')
        return
      }
      if (resp.content && resp.status === EnumSignStatus.done) { 
        alert('签字成功，请到浏览器端获取查看')
        return
      }

      console.log(resp)
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <React.Fragment>
      <Head>
        <link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet" />
      </Head>
      <div className={ style.m_wrapper}>
        <header className={style.m_header_wrapper}>标题</header>
        <div id="m_body" className={style.m_body_wrapper}>
          <canvas id="canvas" ref={refCanvas} className={style.body_canvas_wrapper} width={canvasWidth} height={ canvasHeight}></canvas>
        </div>
        <footer className={ style.m_footer_wrapper}>
          <button onClick={ reSignHandle}>重签</button>
          <button onClick={ submitHandle }>提交</button>
        </footer>
      </div>
    </React.Fragment>
  );
}