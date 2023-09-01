export default function copy(data: []) {
  try {
    navigator.clipboard.writeText(JSON.stringify(data));
  } catch (error) {
    chrome.runtime.sendMessage({ message: error })
  }
}