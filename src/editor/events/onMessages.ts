import webResponseList from "../dom/webResponseList";

export default function onMessages(request: any, _: any, sendResponse: any) {
  sendResponse('');
  if (request.webResponseErrorDetails) webResponseList(request.webResponseErrorDetails);

  return true;
}