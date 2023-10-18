import { listWebResponseEL, modalSettings } from "../constants";

export default function onWebResponseAction(e: any) {
  const target = e.target;
  switch (target.dataset.id || target.parentElement.dataset.id || target.parentElement.dataset.icon || target.dataset.icon) {
    case 'clear':
      if (window.confirm('Do you really want to clear storage?')) {
        listWebResponseEL.innerHTML = '';
        chrome.runtime.sendMessage({ message: 'clear:webResponseErrorDetails' });
      }
      break;

    case 'copy':
      chrome.runtime.sendMessage({ message: 'copy:webResponseErrorDetails' });
      break;

    case 'download':
      chrome.runtime.sendMessage({ message: 'download:webResponseErrorDetails' });
      break;

    case 'reload':
      chrome.runtime.sendMessage({ message: 'get:webResponseErrorDetails' });
      break;

    case 'settings':
      modalSettings.classList.remove('d-none')
      break;

    default:
      break;
  }

}