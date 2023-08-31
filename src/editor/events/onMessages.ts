import { snackbar, snackbarCode } from "../constants";
import webResponseList from "../dom/webResponseList";

export default function onMessages(request: any, _: any, sendResponse: any) {
  sendResponse('');
  if (request.webResponseErrorDetails) webResponseList(request.webResponseErrorDetails);

  if (request.rules){
    snackbar.classList.remove('d-none'); 
    snackbarCode.innerText = JSON.stringify(request.rules, null, 2);
  }
  if (request.message) {
    snackbar.classList.remove('d-none')
    snackbarCode.innerText = request.message;
  }

  return true;
}