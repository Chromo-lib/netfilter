import copy from "../utils/copy";
import webResponseList from "../utils/webResponseList";

export default function onMessages(request: any, _: any, sendResponse: any) {
  sendResponse('popup');
  
  if (request.webResponseErrorDetails) {
    webResponseList(request);
    return true;
  }

  if (request.message === 'copy:webResponseErrorDetails') {
    copy(request.webResponseErrorDetails);
    return true;
  }
}