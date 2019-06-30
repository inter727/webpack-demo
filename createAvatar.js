import avatar from './avatar.jpg';
export default function CreateAvatar() {
  var img = new Image();
  img.src = avatar;
  img.classList.add('avatar');

  var root = document.getElementById('root');
  root.appendChild(img);
}
