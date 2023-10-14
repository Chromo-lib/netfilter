import { listWebResponseEL } from "../constants";

export default function webResponseList(details: chrome.webRequest.WebResponseErrorDetails) {
  if (details && details.url) {
    const timeStamp = new Date(details.timeStamp).toISOString().slice(0, 19);

    listWebResponseEL.innerHTML += `<li class="border-bottom fadein" data-tabid="${details.tabId}">
      <div class="d-flex align-center mb-1">
        <span class="${'tag ' + details.type}">${details.type}</span>
        <h3 class="m-0 ml-1 truncate">${details.url}</h3>
      </div>
      <div class="d-flex justify-between align-center">
        <div>
          <small class="mr-3">${details.initiator}</small>
          <small class="mr-3">${details.method}</small>
          <small class="mr-3">${details.ip || ''}</small>
          <small class="mr-3">${timeStamp}</small>
        </div>
        <small>${details.error}</small>
      </div>
    </li>`;

    document.querySelector('h2')!.textContent = 'Logs: ' + listWebResponseEL.children.length;
  }
}