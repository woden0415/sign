import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

import Head from 'next/head';
import axios from 'axios';

export default () => {
  const createQrCode = async () => {
    const _mobileUrl = 'http://localhost:3000/mobile?1=1'
    const signId = axios.post('http://localhost:3000/sign/insert')
    const _url = `${_mobileUrl}&id=${signId}`
    setUrl(_url)
    setShow(true)
  }
  const [url, setUrl] = useState('https://google.com')
  const [isShow, setShow] = useState(false)
  return (
    <React.Fragment>
      <Head>
        <link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet" />
      </Head>
      <button onClick={createQrCode}>生成签字条码</button>
      <p>生成后，请用手机浏览器或者微信扫描</p>
      <br />
      {isShow ? <QRCodeCanvas value={ url } /> : null}
    </React.Fragment>
  )
};