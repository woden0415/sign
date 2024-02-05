import axios from "axios"
import { SignDto } from "src/modules/sign/dto/Sign.dto"
// 根据id获取签字信息
export const apiPostSignFindOne = async (params: {id: number}) => (await axios.post('http://localhost:3000/sign/find/one', params)).data

// 根据id和content更新签字信息
export const apiPostSignUpdate = async (params: SignDto) => (await axios.post('http://localhost:3000/sign/update', params)).data

// 根据id和content插入签字信息
export const apiPostSignInsert = async () => (await axios.post('http://localhost:3000/sign/insert')).data

// 移动端链接
export const _mobileUrl = 'http://localhost:3000/mobile?timestamp=' + Date.now()
