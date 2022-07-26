import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

import Head from 'next/head';
import axios from 'axios';
import { Sign } from 'src/modules/sign/Sign.entity';

/**
 * 1. 展示二维码
 * 2. 展示倒计时2min
 * 3. 倒计时结束后，红色字体提示，并且覆盖住二维码
 */
export default () => {
  const [url, setUrl] = useState('')
  const [_createTime, setCreateTime] = useState(null)
  const [isShow, setShow] = useState(false)
  
  const createQrCode = async () => {
    const _mobileUrl = 'http://localhost:3000/mobile?1=1'
    const resp = await axios.post('http://localhost:3000/sign/insert')
    const signData: Sign = resp.data
    setUrl(`${_mobileUrl}&id=${signData.id}`)
    setShow(true)
    setCreateTime(new Date(signData.createdTime).getTime())
  }

  // @todo 添加倒计时功能
  // const initialTime = 120*1000 - (new Date().getTime() - _createTime)
  // const [needShowTime, setNeedShowTime] = useState(initialTime)
  // 执行倒计时
  // useEffect(() => {
  //   const timer1 = setInterval(() => {
  //     if (needShowTime - new Date().getTime() - _createTime >= 0) {
  //       setNeedShowTime(needShowTime - 1)
  //     } else {
  //       clearInterval(timer1)
  //     }
  //   }, 1000)
  // });

  return (
    <React.Fragment>
      <Head>
        <link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet" />
      </Head>
      <button onClick={createQrCode}>生成签字条码</button>
      <p>生成后，请用手机浏览器或者微信扫描</p>
      <br />
      {isShow ? <QRCodeCanvas value={url} /> : null}
      {isShow ? <div>{url}</div> : null}
    </React.Fragment>
  )
};