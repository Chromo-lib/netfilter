import { btnClear, btnReload, formSearch } from "./constants";
import onClear from "./events/onClear";
import onMessages from "./events/onMessages";
import onRealod from "./events/onReload";
import onSearch from "./events/onSearch";

chrome.runtime.sendMessage({ message: 'get:webResponseErrorDetails' });

formSearch.addEventListener('submit', onSearch);
btnReload.addEventListener('click', onRealod);
btnClear.addEventListener('click', onClear);
chrome.runtime.onMessage.addListener(onMessages);