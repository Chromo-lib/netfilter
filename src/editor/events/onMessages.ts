import { listWebResponseEL, snackbar, snackbarCode } from "../constants";
import webResponseList from "../dom/webResponseList";
import copy from "../utils/copy";
import download from "../utils/download";

export default function onMessages(request: any, _: any, sendResponse: any) {
  sendResponse('');

  const { message, webResponseErrorDetails, rules } = request;

  snackbar.classList.remove('d-none')
  snackbarCode.innerText = message?.replace(':webResponseErrorDetails','');

  if (message === 'download:webResponseErrorDetails') {
    download(webResponseErrorDetails);
    return true;
  }

  if (message === 'copy:webResponseErrorDetails') {
    copy(webResponseErrorDetails);
    return true;
  }

  if (webResponseErrorDetails) {
    listWebResponseEL.innerHTML = '';
    webResponseErrorDetails.forEach(webResponseList);
    return true;
  }

  if (rules) {
    snackbar.classList.remove('d-none');
    snackbarCode.innerText = JSON.stringify(rules, null, 2);
    return true;
  }
}