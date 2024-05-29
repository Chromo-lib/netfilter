import handleRules from "../messaging/handleRules";

export default function onMessages(request: any, _: any, sendResponse: any) {
  sendResponse('Service worker');  
  handleRules(request, sendResponse);
  return true;
}