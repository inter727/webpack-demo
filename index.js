import avatar from './avatar.jpg'
import './index.css'

var root = document.getElementById('root')
var img = new Image()
img.src = avatar
img.classList.add('avatar')

root.appendChild(img)