import webResponseList from "../dom/webResponseList";

export default function onMessages(request: any, _: any, sendResponse: any) {
  sendResponse('');
  if(request.rules){
    document.getElementById('display-rules')!.innerHTML = JSON.stringify(request.rules, null, 2);
  }
  
  if (request.webResponseErrorDetails) webResponseList(request.webResponseErrorDetails);

  return true;
}