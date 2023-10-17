export default function onSettings(e: any) {
  e.preventDefault();

  const elements = e.target.elements;
  const fontSize = elements[0].value;
  const theme = elements[1].value;

  document.body.style.fontSize = fontSize + 'px';
  document.body.style.filter = 'invert(1)';

  let local :any= localStorage.getItem('settings');

  local = local ? JSON.parse(local) : {};

  localStorage.setItem('settings', JSON.stringify({ ...local, fontSize, theme }));
}