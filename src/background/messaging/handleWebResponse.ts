import sendMessage from "../helpers/sendMessage";
import ResponseStorage from "../storage/ResponseStorage";
import filterRequestDetails from "../utils/filterRequestDetails";

export default function handleWebResponse({ message, tabId, url, filter }: any) {
  if (message === 'getOne:webResponseErrorDetails' && tabId) {
    sendMessage({ webResponseErrorDetails: ResponseStorage.findOne(tabId), url });
    return true;
  }

  if (message === 'deleteOne:webResponseErrorDetails') {
    sendMessage({ webResponseErrorDetails: ResponseStorage.deleteOne(tabId) });
    return true;
  }

  if (message === 'get:webResponseErrorDetails') {
    sendMessage({ webResponseErrorDetails: ResponseStorage.findMany() });
    return true;
  }

  if (message === 'search:webResponseErrorDetails') {
    const data = ResponseStorage.findMany();
    const result = filterRequestDetails(data, filter);
    sendMessage({ webResponseErrorDetails: result.length > 0 ? result : data });
    return true;
  }

  if (message === 'clear:webResponseErrorDetails') {
    sendMessage({ webResponseErrorDetails: ResponseStorage.clear() });
    return true;
  }
}