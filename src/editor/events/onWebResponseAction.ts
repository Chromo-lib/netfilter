import { listWebResponseEL, modalSettings } from "../constants";
import getWebResponseDetailsData from "../utils/getWebResponseDetailsData";
import copy from '../utils/copy'
import download from '../utils/download'

export default function onWebResponseAction(e: any) {
  const target = e.target;
  switch (target.dataset.id || target.parentElement.dataset.id || target.parentElement.dataset.icon || target.dataset.icon) {
    case 'clear':
      listWebResponseEL.innerHTML = '';
      break;

    case 'copy':
      copy(getWebResponseDetailsData())
      break;

    case 'download':
      download(getWebResponseDetailsData())
      break;

    case 'settings':
      modalSettings.classList.remove('d-none')
      break;

    default:
      break;
  }

}