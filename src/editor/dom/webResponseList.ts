import { listWebResponseEL, logInfoEl } from "../constants";

export default function webResponseList(details: chrome.webRequest.WebResponseErrorDetails, parentEL = listWebResponseEL) {
  if (!details || !details.url) return;

  const time = new Date(details.timeStamp).toISOString().slice(0, 19);

  parentEL.innerHTML += `<li class="border-top fadein">

      <textarea name="details" hidden rows="4" cols="5">${JSON.stringify(details)}</textarea>

      <div class="d-flex align-center mb-1">
        <span class="${'tag ' + details.type}">${details.type}</span>
        <span class="m-0 ml-1 bold truncate">${details.url}</span>
      </div>
      <div class="d-flex justify-between align-center">
        <div class="d-flex gap-3">
          <small>${details.initiator}</small>
          <small>${details.method}</small>
          <small>${details.ip || ''}</small>
          <small>${time}</small>
        </div>
        <small>${details.error}</small>
      </div>
    </li>`;

    logInfoEl.innerHTML = `<div>
      <small class="tag">${parentEL.children.length}°items</small>
      <small class="tag">${new Date().toDateString()}</small>
      <small class="tag">${new Date().toLocaleTimeString()}</small>
    </div>
    
    <div>
      <small>Netfilter ${chrome.runtime.getManifest().version}</small>
    </div>`;
}