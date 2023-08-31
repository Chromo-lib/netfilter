export default function webResponseList(webResponseErrorDetails: chrome.webRequest.WebResponseErrorDetails[]) {

  const ul = document.getElementById('list-webResponse')!;
  ul.innerHTML = '';

  webResponseErrorDetails.reverse().forEach(r => {
    const timeStamp = new Date(r.timeStamp).toISOString().slice(0, 19);

    ul.innerHTML += `<li class="border-bottom fadein">
      <div class="d-flex align-center mb-1">
        <span class="${'tag ' + r.type}">${r.type}</span>
        <h3 class="m-0 ml-1 truncate">${r.url}</h3>
      </div>
      <div class="d-flex justify-between align-center gray">
        <div>
          <span class="mr-3">${r.initiator}</span>
          <span class="mr-3">${r.method}</span>
          <span class="mr-3">${r.ip || ''}</span>
          <span class="mr-3">${timeStamp}</span>
        </div>
        <span>${r.error}</span>
      </div>
    </li>`;
  });
}