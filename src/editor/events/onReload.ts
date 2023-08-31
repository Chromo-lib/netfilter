export default function onRealod() {
  chrome.runtime.sendMessage({ message: 'get:webResponseErrorDetails' });
}