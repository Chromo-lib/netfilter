import { listWebResponseEL, logInfoEl } from "../constants";

export default function webResponseList(details: chrome.webRequest.WebResponseErrorDetails) {
  if (!details || !details.url) return;

  const timeStamp = new Date(details.timeStamp).toISOString().slice(0, 19);

  listWebResponseEL.innerHTML += `<li class="border-top fadein">

      <div class="d-flex align-center mb-1">
        <span class="${'tag ' + details.type}">${details.type}</span>
        <h3 class="m-0 ml-1 truncate">${details.url}</h3>
      </div>
      <div class="d-flex justify-between align-center">
        <div class="d-flex gap-3">
          <small>${details.initiator}</small>
          <small>${details.method}</small>
          <small>${details.ip || ''}</small>
          <small>${timeStamp}</small>
        </div>
        <small>${details.error}</small>
      </div>
    </li>`;

    logInfoEl.innerHTML = `<small class="tag">${listWebResponseEL.children.length}°items</small>
    <small class="tag">${new Date().toDateString()}</small>
    <small class="tag">${new Date().toLocaleTimeString()}</small>`;
}