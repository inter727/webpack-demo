// import _ from 'lodash'
import '@babel/polyfill'
import './style.css'
import { add } from './main'

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