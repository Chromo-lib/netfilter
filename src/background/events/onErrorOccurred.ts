import { WebResponseErrorDetails } from "../types";
import ResponseStorage from "../storage/ResponseStorage";

let counter = 0;

export default async function onErrorOccurred(details: WebResponseErrorDetails) {
  if (details.error.includes('BLOCKED_BY_CLIENT')) {
    chrome.action.setBadgeText({ text: '' + counter++ });
    ResponseStorage.save({ ...details, url: details.url.split('?')[0] });
  }
}
