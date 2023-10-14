import { webResponseAction, btnShowSearchBar, formSearch } from "./constants";
import onMessages from "./events/onMessages";
import onSearch from "./events/onSearch";
import onToggleSearchBar from "./events/onToggleSearchBar";
import onWebResponseAction from "./events/onWebResponseAction";
import sendMessage from "./helpers/sendMessage";

document.addEventListener('DOMContentLoaded', () => {
  sendMessage({ message: 'getOne:webResponseErrorDetails' });

  btnShowSearchBar.addEventListener('click', onToggleSearchBar);
  formSearch.querySelector('#btn-close-search')?.addEventListener('click', onToggleSearchBar);
  formSearch.querySelector('input')?.addEventListener('change', onSearch);
  webResponseAction.addEventListener('click', onWebResponseAction);
  chrome.runtime.onMessage.addListener(onMessages);
});