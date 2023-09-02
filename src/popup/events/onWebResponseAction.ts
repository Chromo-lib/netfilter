import sendMessage from "../helpers/sendMessage";
import download from "../utils/download";
import copy from "../utils/copy";
import onStartup from "./onStartup";

export default function onWebResponseAction(e: any) {
  const target = e.target;
  switch (target.dataset.id || target.parentElement.dataset.id || target.parentElement.dataset.icon || target.dataset.icon) {
    case 'clear':
      if (window.confirm('Do you really want to clear storage?')) sendMessage({ message: 'delete:webResponseErrorDetails' });
      break;

    case 'reload':
      onStartup()
      break;

    case 'copy':
      copy()
      break;

    case 'download':
      download()
      break;

    case 'open-editor':
      chrome.windows.create({ url: "editor.html", height: 300, top: 300, type: 'popup' });
      break;

    default:
      break;
  }

}