export default function onBlockURL(e: any) {
  e.preventDefault();
  const url = e.target.elements[0].value.replace(/http(s)?:\/\//g,'');
  chrome.runtime.sendMessage({ message: 'block:url', url });
  e.target.reset();
}