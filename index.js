import avatar from './avatar.jpg'
import style from './index.css'
import createAvatar from './createAvatar'

createAvatar()

var root = document.getElementById('root')
var img = new Image()
img.src = avatar
img.classList.add(style['avatar'])

root.appendChild(img)