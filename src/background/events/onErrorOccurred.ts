import { WebResponseErrorDetails } from "../types";
import WebResponseErrorDetailsStorage from "../storage/WebResponseErrorDetailsStorage";

let counter = 0;

export default async function onErrorOccurred(details: WebResponseErrorDetails) {  
  if (details.error.includes('BLOCKED_BY_CLIENT')) {
    chrome.action.setBadgeText({ text: '' + counter++ });
    WebResponseErrorDetailsStorage.save({ ...details, url: details.url.split('?')[0] });
  }
}
