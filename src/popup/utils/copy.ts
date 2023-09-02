import { webResponseErrorDetailsUL } from "../constants";

export default function copy() {
  try {
    const data = [...webResponseErrorDetailsUL.querySelectorAll('#url')].map(el => el.textContent?.trim());
    navigator.clipboard.writeText(JSON.stringify(data));
  } catch (error) {
    chrome.runtime.sendMessage({ message: error })
  }
}