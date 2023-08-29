import onUpdateRules from "./events/onUpdateRules";
import rules from "./rules";
import BlockURL from "./helpers/BlockURL";
import onErrorOccurred from "./events/onErrorOccurred";
import onMessages from "./events/onMessages";
// import onTabUpdated from "./events/onTabUpdated";
import onTabRemoved from "./events/onTabRemoved";
import onAlarm from "./events/onAlarm";

async function onStartup() {
  console.log('**--onStartup--**');
  const brules: any = await BlockURL.generateRules();
  
  chrome.alarms.create({ periodInMinutes: 0.3 });
  chrome.webRequest.onErrorOccurred.addListener(onErrorOccurred, { urls: ["<all_urls>"] }, []);
  // declarativeNetRequest.updateSessionRules(options, onUpdateRules);
  chrome.declarativeNetRequest.updateDynamicRules({ addRules: [...rules, ...brules], removeRuleIds: [52, 53, 54] }, onUpdateRules);
  chrome.tabs.onRemoved.addListener(onTabRemoved);
  // chrome.tabs.onUpdated.addListener(onTabUpdated);
  chrome.alarms.onAlarm.addListener(onAlarm);
  chrome.runtime.onMessage.addListener(onMessages);
}

chrome.runtime.onStartup.addListener(onStartup);
chrome.runtime.onInstalled.addListener(onStartup);
chrome.runtime.setUninstallURL('https://haikel-fazzani.deno.dev');