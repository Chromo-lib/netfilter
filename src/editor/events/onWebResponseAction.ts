import { listWebResponseEL } from "../constants";

export default function onWebResponseAction(e: any) {
  const target = e.target;
  switch (target.dataset.id || target.parentElement.dataset.id || target.parentElement.dataset.icon || target.dataset.icon) {
    case 'clear':
      if (window.confirm('Do you really want to clear storage?')) {
        listWebResponseEL.innerHTML = '';
      }      
      break;

    case 'copy':
      console.log('');
      
      break;

    case 'download':
      console.log('');
      
      break;

    default:
      break;
  }

}