import onErrorOccurred from "./events/onErrorOccurred";
import onMessages from "./events/onMessages";
// import onTabUpdated from "./events/onTabUpdated";
import onTabRemoved from "./events/onTabRemoved";
import onAlarm from "./events/onAlarm";

async function onStartup() {
  console.log('**--onStartup--**');
  
  chrome.alarms.create({ periodInMinutes: 0.29 });
  chrome.webRequest.onErrorOccurred.addListener(onErrorOccurred, { urls: ["<all_urls>"] }, []);

  chrome.tabs.onRemoved.addListener(onTabRemoved);
  // chrome.tabs.onUpdated.addListener(onTabUpdated);
  chrome.alarms.onAlarm.addListener(onAlarm);
  chrome.runtime.onMessage.addListener(onMessages);
}

async function onDisabled() {
  chrome.webRequest.onErrorOccurred.removeListener(onErrorOccurred);
  chrome.tabs.onRemoved.removeListener(onTabRemoved);
  // chrome.tabs.onUpdated.addListener(onTabUpdated);
  chrome.alarms.onAlarm.removeListener(onAlarm);
  chrome.runtime.onMessage.removeListener(onMessages);
}

chrome.management.onDisabled.addListener(onDisabled);
chrome.management.onEnabled.addListener(onStartup);
chrome.runtime.onStartup.addListener(onStartup);
chrome.runtime.onInstalled.addListener(onStartup);
chrome.runtime.setUninstallURL('https://haikel-fazzani.deno.dev');