import sendMessage from "../helpers/sendMessage";
import WebResponseErrorDetailsStorage from "../storage/WebResponseErrorDetailsStorage";
import filterRequestDetails from "../utils/filterRequestDetails";

export default function handleWebResponse({ message, tabId, url, filter }: any) {
  if (message === 'getOne:webResponseErrorDetails' && tabId) {
    sendMessage({ webResponseErrorDetails: WebResponseErrorDetailsStorage.findOne(tabId), url });
    return true;
  }

  if (message === 'deleteOne:webResponseErrorDetails') {
    sendMessage({ webResponseErrorDetails: WebResponseErrorDetailsStorage.deleteOne(tabId) });
    return true;
  }

  if (message === 'get:webResponseErrorDetails') {
    sendMessage({ webResponseErrorDetails: WebResponseErrorDetailsStorage.findMany() });
    return true;
  }

  if (message === 'search:webResponseErrorDetails') {
    const data = WebResponseErrorDetailsStorage.findMany();
    const result = filterRequestDetails(data, filter);
    sendMessage({ webResponseErrorDetails: result.length > 0 ? result : data });
    return true;
  }

  if (message === 'clear:webResponseErrorDetails') {
    sendMessage({ webResponseErrorDetails: WebResponseErrorDetailsStorage.clear() });
    return true;
  }
}