// import _ from 'lodash'
import '@babel/polyfill'
import 'css/style'
import 'css/style1'
import { add } from '../js/main'
import { UI } from '../js/jquery.ui'

UI()

add(1, 4)
// console.log(_.join(['Dell','Lee'], ' '))

document.addEventListener('click', () => {
  getComponent().then(ele => {
    document.getElementById('root').append(ele)
  })
})

async function getComponent() {
  //括号内魔法注释，含义是告诉 Webpack 异步模块的名字为 lodash
  const {default: _} = await import(/* webpackPrefetch: true */'lodash')
  let div = document.createElement('div')
  div.innerHTML = _.join([1, 2], 3)
  return div
}

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then((register) => {
    console.log('注册成功');
  }).catch(error => {
    console.log('注册失败');
  })
}

axios.get('/react/api/header.json').then(res => {
  let {data, status} = res;
  console.log(data);
})

console.log('Webpack is good!');