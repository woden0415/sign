import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

import Head from 'next/head';
import { EnumSignStatus, Sign } from 'src/modules/sign/Sign.entity';
import { _mobileUrl, apiPostSignFindOne, apiPostSignInsert, apiPostSignUpdate } from "pages/api";

/**
 * 1. 展示二维码
 * 2. 展示倒计时2min
 * 3. 倒计时结束后，红色字体提示，并且覆盖住二维码
 */
export default () => {
  const [url, setUrl] = useState('')
  const [signContent, setSignContent] = useState<string>() // 图片内容base64
  const [sign, setSign] = useState<Sign>()
  const [signStatus, setSignStatus] = useState<EnumSignStatus>()

  // 生成签字二维码
  const createQrCode = async () => {
    const resp = await apiPostSignInsert()
    const signData: Sign = resp
    setSign(signData)
    setUrl(`${_mobileUrl}&signId=${signData?.id}`)
    setSignStatus(EnumSignStatus.initial)
  }

  // 取消
  const cancelSignHandle =async () => { 
    try {
      const params = {id:sign.id, status: EnumSignStatus.cancel}
      await apiPostSignUpdate(params)
      alert('取消签字成功')
      setSignStatus(EnumSignStatus.cancel)
    } catch (error) {
      console.error(error);
    }
  }

  // 重新获取签字
  const getSignHandle =async () => { 
    try {
      const params = {id: sign.id}
      const resp: Sign = await apiPostSignFindOne(params)
      setSign(resp)
      setSignContent(resp.content)
      setSignStatus(EnumSignStatus.done)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <React.Fragment>
      <Head>
        <link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet" />
      </Head>
      <input type="button" onClick={createQrCode} disabled={[EnumSignStatus.initial].includes(signStatus)} value="生成签字二维码" /><br />
      <input type="button" onClick={cancelSignHandle} disabled={!!sign?.id} value="取消签字（模拟异常场景" /><br />
      <input type="button" onClick={getSignHandle} disabled={EnumSignStatus.done ===signStatus} value='重新获取签字' /><br />
      <p>生成后，请用手机浏览器或者微信扫描</p>
      <br />
      <div>当前签字状态{signStatus}</div>
      { EnumSignStatus.initial === signStatus ? <> <QRCodeCanvas value={url} /> <div>链接是： {url}</div> </> : null }
      { signContent?<img src={signContent} />:null}
    </React.Fragment>
  )
};