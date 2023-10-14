import sendMessage from "../helpers/sendMessage";
import ResponseStorage from "../storage/ResponseStorage";

export default function handleWebResponse({ message, tabId, url }: any) {
  if (message === 'getOne:webResponseErrorDetails' && tabId) {
    ResponseStorage.findOne(tabId).then(webResponseErrorDetails => {
      sendMessage({ webResponseErrorDetails, url });
    });
    return true;
  }

  if (message === 'deleteOne:webResponseErrorDetails') {
    ResponseStorage.deleteOne(tabId).then((webResponseErrorDetails) => {
      sendMessage({ webResponseErrorDetails });
    });
    return true;
  }

  if (message === 'get:webResponseErrorDetails') {
    ResponseStorage.findMany().then(webResponseErrorDetails => {
      sendMessage({ webResponseErrorDetails });
    });
    return true;
  }

  if (message === 'clear:webResponseErrorDetails') {
    ResponseStorage.clear().then((webResponseErrorDetails) => {
      sendMessage({ webResponseErrorDetails });
    });
    return true;
  }
}