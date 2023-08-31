import Split from 'split.js'
import { btnClear, btnReload, formAddRules, formBlockDomain, formSearch, preRules } from "./constants";
import onAddRules from './events/onAddRules';
import onBlockDomain from './events/onBlockDomain';
import onClear from "./events/onClear";
import onMessages from "./events/onMessages";
import onRealod from "./events/onReload";
import onSearch from "./events/onSearch";

chrome.runtime.sendMessage({ message: 'get:webResponseErrorDetails' });

preRules.innerHTML = JSON.stringify([
  {
    "id": 61,
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

formAddRules.addEventListener('submit', onAddRules);
formBlockDomain.addEventListener('submit', onBlockDomain);
formSearch.addEventListener('submit', onSearch);

btnReload.addEventListener('click', onRealod);
btnClear.addEventListener('click', onClear);

chrome.runtime.onMessage.addListener(onMessages);