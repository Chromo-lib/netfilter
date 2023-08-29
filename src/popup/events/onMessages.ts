import setWebResponseErrorDetailsUL from "../utils/setWebResponseErrorDetailsUL";

export default function onMessages(request: any, _: any, sendResponse: any) {
  sendResponse('popup');
  if(request.webResponseErrorDetails) setWebResponseErrorDetailsUL(request);
  return true;
}