import Split from 'split.js'
import { formAddRules, formBlockAllowDomain, formGetRules, formSearch, formSettings, preRules, snackbar, webResponseAction } from "./constants";
import onAddRules from './events/onAddRules';
import onBlockURL from './events/onBlockURL';
import onGetRules from './events/onGetRules';
import onMessages from "./events/onMessages";
import onSearch from "./events/onSearch";
import onSnackbar from './events/onSnackbar';
import onWebResponseAction from './events/onWebResponseAction';
import onSettings from './events/onSettings';

preRules.innerHTML = JSON.stringify([
  {
    "id": 5000,
    "priority": 2,
    "action": {
      "type": "block"
    },
    "condition": {
      "requestDomains": ["ghost.io", "chatlio.com", "crisp.chat", "vimkit.io", "peer5.com"],
      "domainType": "thirdParty",
      "resourceTypes": ["script", "image", "object", "xmlhttprequest", "media", "websocket", "webtransport"]
    }
  }
], null, 2);


document.querySelectorAll('[data-icon]').forEach((el:any) => {
  console.log(el);
  el.style.background = `url(${el.dataset.icon}) center no-repeat`
})

window.addEventListener('DOMContentLoaded', () => {
  Split(['main', 'aside'], { sizes: [75, 25] });

  chrome.runtime.sendMessage({ message: 'get:webResponseErrorDetails' });

  formGetRules.addEventListener('submit', onGetRules);
  formAddRules.addEventListener('submit', onAddRules);
  formBlockAllowDomain.addEventListener('submit', onBlockURL);
  formSearch.addEventListener('submit', onSearch);
  formSettings.addEventListener('submit', onSettings)

  webResponseAction.addEventListener('click', onWebResponseAction);
  snackbar.querySelector('button')!.addEventListener('click', onSnackbar);
  chrome.runtime.onMessage.addListener(onMessages);
});