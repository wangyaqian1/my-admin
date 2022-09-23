import Axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken, removeToken } from '@/utils/auth'

const service = Axios.create({
  baseURL: 'https://mock.mengxuegu.com/mock/6323e6bfb4c53348ed2bc5f0/example',
  timeout: '',
})
//所有请求发送前都携带token
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      console.log(getToken())
      config.headers['X-token'] = getToken()
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use((res) => {
  const { message, code } = res.data
  console.log(`res--${JSON.stringify(res)}`)
  //token失效
  if (message.includes('登录失败') && code === 401) {
    removeToken()
    router.push('/login')
    //清空登录信息
  }
  return res
})
export default service
