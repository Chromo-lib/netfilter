import { btnDownload, btnOpenEditor, btnShowSearchBar, formSearch } from "./constants";
import onClear from "./events/onClear";
import onMessages from "./events/onMessages";
import onOpenEditor from "./events/onOpenEditor";
import onStartup from "./events/onStartup";
import onDownload from "./events/onDownload";
import onSearch from "./events/onSearch";
import onToggleSearchBar from "./events/onToggleSearchBar";

onStartup();

document.getElementById('btn-update-webResponseErrorDetails')?.addEventListener('click', onStartup);
document.getElementById('btn-clear-webResponseErrorDetails')?.addEventListener('click', onClear);

btnShowSearchBar.addEventListener('click', onToggleSearchBar);
formSearch.querySelector('#btn-close-search')?.addEventListener('click', onToggleSearchBar);
formSearch.querySelector('input')?.addEventListener('change', onSearch);
btnDownload.addEventListener('click', onDownload);
btnOpenEditor.addEventListener('click', onOpenEditor);
chrome.runtime.onMessage.addListener(onMessages);