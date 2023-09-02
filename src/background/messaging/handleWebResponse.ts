import WebResponseStorage from "../storage/WebResponseStorage";
import sendMessage from "../helpers/sendMessage";
import filterwebResponseErrorDetails from "../utils/filterwebResponseErrorDetails";

export default function handleWebResponse({ message, tabId, url, filter }: any) {
  if (message === 'getOne:webResponseErrorDetails' && (tabId || url)) {
    WebResponseStorage.findOne(tabId, url).then(webResponseErrorDetails => {
      sendMessage({ webResponseErrorDetails, url });
    });
    return true;
  }

  if (message === 'get:webResponseErrorDetails' || message === 'download:webResponseErrorDetails' || message === 'copy:webResponseErrorDetails') {
    WebResponseStorage.findMany().then(details => {
      let webResponseErrorDetails = url && url.length > 0
        ? details.filter((v: any) => (v.initiator || v.originUrl).includes(url))
        : details;

      if (filter) {
        webResponseErrorDetails = filterwebResponseErrorDetails(webResponseErrorDetails, filter);
      }

      sendMessage({ message, webResponseErrorDetails, url });
    });

    return true;
  }

  if (message === 'delete:webResponseErrorDetails') {
    WebResponseStorage.deleteMany(+tabId, url).then((webResponseErrorDetails) => {
      sendMessage({ webResponseErrorDetails });
    });
    return true;
  }

  if (message === 'clear:webResponseErrorDetails') {
    WebResponseStorage.clear().then((webResponseErrorDetails) => {
      sendMessage({ webResponseErrorDetails });
    });
    return true;
  }
}