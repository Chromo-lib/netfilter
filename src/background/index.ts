import onErrorOccurred from "./events/onErrorOccurred";
import onMessages from "./events/onMessages";
import onAlarm from "./events/onAlarm";

async function onStartup() {
  console.log('**--onStartup--**');
  
  chrome.alarms.create({ periodInMinutes: 0.25 });
  chrome.webRequest.onErrorOccurred.addListener(onErrorOccurred, { urls: ["<all_urls>"] }, []);
  chrome.alarms.onAlarm.addListener(onAlarm);
  chrome.runtime.onMessage.addListener(onMessages);
}

chrome.runtime.onStartup.addListener(onStartup);
chrome.runtime.onInstalled.addListener(onStartup);
chrome.runtime.setUninstallURL('https://haikel-fazzani.deno.dev');