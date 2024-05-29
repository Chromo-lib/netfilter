export default function copy(data: any) {
  try {
    navigator.clipboard.writeText(JSON.stringify(data));
  } catch (error) {
    chrome.runtime.sendMessage({ message: error })
  }
}