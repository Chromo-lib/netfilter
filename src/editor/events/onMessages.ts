import { snackbar, snackbarCode } from "../constants";
import webResponseList from "../dom/webResponseList";

export default function onMessages(request: any, _: any, sendResponse: any) {
  sendResponse('');

  const { message, details, rules } = request;

  if (message) {
    snackbar.classList.remove('d-none')
    snackbarCode.innerText = message?.replace(':webResponseErrorDetails', '');
  }

  if (details) {
    webResponseList(details)
    return true;
  }

  if (rules) {
    snackbar.classList.remove('d-none');
    snackbarCode.innerText = JSON.stringify(rules, null, 2);
    return true;
  }
}