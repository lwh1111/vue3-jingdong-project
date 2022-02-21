import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000
})

export const get = (url, params = {}) => { // 接收传入的参数
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data) // 成功的话把response带出去，只带response里的data内容
    }, err => {
      reject(err) // 失败的话把err带出去
    })
  })
}

// 封装一个post方法，帮助发送post请求
export const post = (url, data = {}) => { // 接收传入的参数
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/Json'
      }
    }).then((response) => {
      resolve(response.data) // 成功的话把response带出去，只带response里的data内容
    }, err => {
      reject(err) // 失败的话把err带出去
    })
  })
}

// 封装一个 patch 方法，帮助发送 patch 请求
export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.patch(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
