import { WebResponseErrorDetails } from "../types";
import WebResponseStorage from "../storage/WebResponseStorage";

let counter = 0;

export default async function onErrorOccurred(details: WebResponseErrorDetails) {
  await WebResponseStorage.add(details.requestId, { ...details, url: details.url.split('?')[0], host: new URL(details.url).host });
  if (details.error.includes('BLOCKED_BY_CLIENT')) {
    chrome.action.setBadgeText({ text: '' + counter++ });
  }
}