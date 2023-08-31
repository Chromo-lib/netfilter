import { btnClear, btnReload } from "./constants";
import onClear from "./events/onClear";
import onMessages from "./events/onMessages";
import onRealod from "./events/onReload";

chrome.runtime.sendMessage({ message: 'get:webResponseErrorDetails' });

btnReload.addEventListener('click', onRealod);
btnClear.addEventListener('click', onClear);
chrome.runtime.onMessage.addListener(onMessages);