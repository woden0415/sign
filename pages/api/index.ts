import axios from "axios"
import { SignDto } from "src/modules/sign/dto/Sign.dto"

export const hostConfig = {
  development: 'http://localhost:3000',
  production: 'https://woden0415.zeabur.app',
}

const _env = (() => { 
  return global?.location?.href?.includes('localhost')? 'development' : 'production'
})()
  
export const host = hostConfig[_env]
// 根据id获取签字信息
export const apiPostSignFindOne = async (params: {id: number}) => (await axios.post(`${host}/sign/find/one`, params)).data

// 根据id和content更新签字信息
export const apiPostSignUpdate = async (params: SignDto) => (await axios.post(`${host}/sign/update`, params)).data

// 根据id和content插入签字信息
export const apiPostSignInsert = async () => (await axios.post(`${host}/sign/insert`)).data

// 移动端链接
export const _mobileUrl = `${host}/mobile?timestamp=${Date.now()}` 
