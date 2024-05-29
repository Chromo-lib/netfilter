let counter = 0;

export default async function onErrorOccurred(details: chrome.webRequest.WebResponseErrorDetails) {
  if (details.error && ['CONNECTION_REFUSED', 'BLOCKED_BY_CLIENT'].includes(details.error.replace('net::ERR_', ''))) {
    chrome.action.setBadgeText({ text: '' + counter++ });
    chrome.runtime.sendMessage({details})
  }
}
