import { WebResponseErrorDetails } from "../types";
import WebResponseErrorDetailsStorage from "../storage/WebResponseErrorDetailsStorage";

let counter = 0;

export default async function onErrorOccurred(details: WebResponseErrorDetails) {
  console.log(details.url);
  
  if (details.error && ['CONNECTION_REFUSED', 'BLOCKED_BY_CLIENT'].includes(details.error.replace('net::ERR_', ''))) {
    chrome.action.setBadgeText({ text: '' + counter++ });
    WebResponseErrorDetailsStorage.save({ ...details, url: details.url.split('?')[0] });
  }
}
