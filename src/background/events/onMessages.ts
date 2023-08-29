import handleRules from "../messaging/handleRules";
import handleWebResponse from "../messaging/handleWebResponse";

export default function onMessages(request: any, _: any, sendResponse: any) {
  console.log('Service worker');
  sendResponse('Service worker');  
  handleWebResponse(request);
  handleRules(request);
  return true;
}