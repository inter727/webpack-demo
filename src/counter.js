export default function counter() {
  var dom = document.createElement('div');
  dom.setAttribute('id', 'counter');
  dom.innerHTML = 1;
  dom.onclick = function() {
    dom.innerHTML = parseInt(dom.innerHTML,10)+1;
  }
  document.body.appendChild(dom);
}
