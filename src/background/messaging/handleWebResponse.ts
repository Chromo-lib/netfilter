import WebResponseStorage from "../storage/WebResponseStorage";
import sendMessage from "../helpers/sendMessage";
import filterwebResponseErrorDetails from "../utils/filterwebResponseErrorDetails";

export default function handleWebResponse({ message, tabId, url, filter }: any, sendResponse: any) {
  if (message === 'get:webResponseErrorDetails' && (tabId || url)) {
    WebResponseStorage.findOne(tabId, url).then(webResponseErrorDetails => {
      sendMessage({ webResponseErrorDetails, url });
    });
    return true;
  }

  if (message === 'get:webResponseErrorDetails') {
    WebResponseStorage.findMany().then(details => {
      let webResponseErrorDetails = url && url.length > 0
        ? details.filter((v: any) => (v.initiator || v.originUrl).includes(url))
        : details;

      if (filter) {
        webResponseErrorDetails = filterwebResponseErrorDetails(webResponseErrorDetails, filter);
      }

      sendMessage({ webResponseErrorDetails, url: url });
    });

    return true;
  }

  if (message === 'delete:webResponseErrorDetails') {
    WebResponseStorage.deleteOne(+tabId, url).then(() => {
      sendMessage({ webResponseErrorDetails: [] });
    });
    return true;
  }

  if (message === 'clear:webResponseErrorDetails') {
    WebResponseStorage.deleteMany().then(() => {
      sendMessage({ webResponseErrorDetails: [] });
    });
    return true;
  }
}