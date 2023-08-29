export default function sendMessage(message: any) {
  chrome.runtime.sendMessage(message).catch(console.log);
}
