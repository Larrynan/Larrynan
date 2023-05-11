import axios from 'axios'
import QS from 'qs'
import { Message, Loading } from 'element-ui'
import store from '../store'
import router from '../router'
// 请求loading
let loading
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '正在加载中...',
    background: 'rgba(0,0,0,0.5)'
  })
}
function closeLoading () {
  loading.close()
}
// 环境切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://zuultest.srpqa.top/'
  // 测试运行环境
} else if (process.env.NODE_ENV === 'test') {
  axios.defaults.baseURL = 'http://zuultest.srpqa.top/'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://zuulprod.srpqa.top/'
}
// 超时
axios.defaults.timeout = 30000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers.Authorization = token)
    startLoading()
    return config
  },
  error => {
    closeLoading()
    return Promise.error(error)
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    closeLoading()
    // 如果返回的状态码为200，说明接口请求成功
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况
  // 需与后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行操作，错误提示等等，以下为假设错误码
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          closeLoading()
          router.replace({
            path: '/login',
            // 将跳转的路由path作为参数，登录成功后跳转到该路由
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:
          Message({
            showClose: true,
            message: '登录过期，请重新登录！',
            type: 'error'
          })
          // 清除token
          store.commit('del_token')
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
          // 404请求不存在
        case 404:
          Message({
            showClose: true,
            message: '请求不存在',
            type: 'error'
          })
          break
          // 其他错误，抛出错误提示
        default:
          Message({
            showClose: true,
            message: error.response.data.message,
            type: 'error'
          })
      }
      return Promise.reject(error.response)
    }
  }
)

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
export default axios
