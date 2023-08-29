import { webResponseErrorDetailsUL } from "../constants";
import { WebResponseErrorDetails } from "../types";
import getDomainFromUrl from "./getDomainFromUrl";

export default function setWebResponseErrorDetailsUL({ webResponseErrorDetails, url }: { webResponseErrorDetails: WebResponseErrorDetails[], url: string }) {
  if (webResponseErrorDetails && Array.isArray(webResponseErrorDetails)) {

    webResponseErrorDetailsUL.innerHTML = '';

    if (url) {
      document.getElementById('initiator')!.textContent = url.replace(/https?:\/\//g, '');
      document.getElementById('details-len')!.textContent = 'B ' + (webResponseErrorDetails.length || 0);
    }

    webResponseErrorDetails.reverse().forEach(detail => {
      const error = detail.error?.replace('net::ERR_', '').slice(0, 1) || 'B';
      const bgColorError = error === 'B' ? 'red' : error === 'F' ? 'black-red' : 'dark-red';

      webResponseErrorDetailsUL.innerHTML += `<li class="bg-dark border-bottom fadein" id="d-${detail.requestId}"> 
          <div class="w-100 d-flex align-center justify-between">
            <div class="d-flex align-center mb-1 truncate">
              <span class="ml-0 mr-1 badge rounded bg-black p-5 bg-${bgColorError}" title="${detail.error}">${error}</span>
              <h4 class="d-block m-0 ml-1 red truncate" title="${detail.host}">${getDomainFromUrl(detail.host)}</h4> 
            </div>
  
            <div class="gray small uppercase">
              <span title="Method">${detail.method}</span>
              <span>|</span>
              <span title="Type">${detail.type}</span>
            </div>
          </div>
              
          <div class="d-flex gray small" id="url">
            <p class="m-0 gray truncate w-100" title="${detail.url}">${detail.url.replace(/https?:\/\//g, '')}</p>
          </div>
          
      </li>`;
    });
  }
}
