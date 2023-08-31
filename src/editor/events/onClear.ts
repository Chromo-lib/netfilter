export default function onClear() {
  if (window.confirm('Do you really want to clear storage?')) chrome.runtime.sendMessage({ message: 'clear:webResponseErrorDetails' });
}