import { listWebResponseEL, snackbar, snackbarCode } from "../constants";
import webResponseList from "../dom/webResponseList";
import copy from "../utils/copy";
import download from "../utils/download";

export default function onMessages(request: any, _: any, sendResponse: any) {
  sendResponse('');

  const { message, webResponseErrorDetails, rules } = request;

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
    Object.keys(webResponseErrorDetails).forEach(resp => {
      webResponseErrorDetails[resp].forEach(w => webResponseList(w))
    });

    return true;
  }

  if (rules) {
    snackbar.classList.remove('d-none');
    snackbarCode.innerText = JSON.stringify(rules, null, 2);
    return true;
  }

  if (message) {
    snackbar.classList.remove('d-none')
    snackbarCode.innerText = message;
    return true;
  }
}