export default async function onStartup() {
  chrome.runtime.sendMessage({ message: 'get:webResponseErrorDetails' });
}