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

  if (['get:webResponseErrorDetails', 'copy:webResponseErrorDetails', 'download:webResponseErrorDetails'].includes(message)) {
    sendMessage({ webResponseErrorDetails: WebResponseErrorDetailsStorage.findMany(), message });
    return true;
  }

  if (message === 'search:webResponseErrorDetails') {
    const data = WebResponseErrorDetailsStorage.findMany();
    sendMessage({ webResponseErrorDetails: filterRequestDetails(data, filter), message });
    return true;
  }

  if (message === 'clear:webResponseErrorDetails') {
    sendMessage({ webResponseErrorDetails: WebResponseErrorDetailsStorage.clear(), message });
    return true;
  }
}