import { webResponseAction, btnShowSearchBar, formSearch } from "./constants";
import onMessages from "./events/onMessages";
import onStartup from "./events/onStartup";
import onSearch from "./events/onSearch";
import onToggleSearchBar from "./events/onToggleSearchBar";
import onWebResponseAction from "./events/onWebResponseAction";

onStartup();

// chrome.storage.local.clear();

btnShowSearchBar.addEventListener('click', onToggleSearchBar);
formSearch.querySelector('#btn-close-search')?.addEventListener('click', onToggleSearchBar);
formSearch.querySelector('input')?.addEventListener('change', onSearch);
webResponseAction.addEventListener('click', onWebResponseAction);
chrome.runtime.onMessage.addListener(onMessages);