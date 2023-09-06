import { WebResponseErrorDetails } from "../types";
import WebResponseStorage from "../storage/WebResponseStorage";

let counter = 0;

export default async function onErrorOccurred(details: WebResponseErrorDetails) {
  await WebResponseStorage.add(details.requestId, details);
  if (details.error.includes('BLOCKED_BY_CLIENT')) {
    chrome.action.setBadgeText({ text: '' + counter++ });
  }
}