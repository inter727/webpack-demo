import '@babel/polyfill';
import './style.css'
import counter from "./counter";
import number from "./number";

var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

btn.onclick = function() {
  var dom = document.createElement('div');
  dom.innerHTML = 'item';
  document.body.appendChild(dom);
}

counter()
number()


const arr = [
  new Promise(() => {}),
  new Promise(() => {}),
  new Promise(() => {})
]

arr.map(item => {
  console.log(item);
})

// 额外的模块HMR配置
if(module.hot) {
  module.hot.accept('./number.js', () => {
    document.body.removeChild(document.getElementById('number'));
    number();
  })
}