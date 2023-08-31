import Split from 'split.js'
import { btnClear, btnReload, formAddRules, formBlockURL, formGetRules, formSearch, preRules, snackbar } from "./constants";
import onAddRules from './events/onAddRules';
import onBlockURL from './events/onBlockURL';
import onClear from "./events/onClear";
import onGetRules from './events/onGetRules';
import onMessages from "./events/onMessages";
import onRealod from "./events/onReload";
import onSearch from "./events/onSearch";
import onSnackbar from './events/onSnackbar';

chrome.runtime.sendMessage({ message: 'get:webResponseErrorDetails' });

preRules.innerHTML = JSON.stringify([
  {
    "id": 5000,
    "priority": 2,
    "action": {
      "type": "block"
    },
    "condition": {
      "requestDomains": ["ghost.io","chatlio.com","crisp.chat","vimkit.io","peer5.com"],
      "domainType": "thirdParty",
      "resourceTypes": ["script","image","object","xmlhttprequest","media","websocket","webtransport"]
    }
  }
], null, 2);

Split(['main', 'aside'], { sizes: [75, 25] });

formGetRules.addEventListener('submit', onGetRules);
formAddRules.addEventListener('submit', onAddRules);
formBlockURL.addEventListener('submit', onBlockURL);
formSearch.addEventListener('submit', onSearch);

snackbar.querySelector('button')!.addEventListener('click', onSnackbar)
btnReload.addEventListener('click', onRealod);
btnClear.addEventListener('click', onClear);

chrome.runtime.onMessage.addListener(onMessages);