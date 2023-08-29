import BlockURL from "../helpers/BlockURL";
import onUpdateRules from "../events/onUpdateRules";
import sendMessage from "../helpers/sendMessage";

const declarativeNetRequest = chrome.declarativeNetRequest;
const getRules = ['getDynamicRules', 'getSessionRules', 'getEnabledRulesets'];

export default function handleRules({ message, url, nRules }: any) {
  if (message === 'addDynamicRules') {
    const isArr = Array.isArray(nRules);
    const removeRuleIds = isArr ? nRules.map((r: any) => r.id) : [nRules.id];
    const addRules = isArr ? nRules : [nRules];
    declarativeNetRequest.updateDynamicRules({ removeRuleIds, addRules }, onUpdateRules);
    return true;
  }

  if (message === 'addSessionRules') {
    const isArr = Array.isArray(nRules);
    const removeRuleIds = isArr ? nRules.map((r: any) => r.id) : [nRules.id];
    const addRules = isArr ? nRules : [nRules];
    declarativeNetRequest.updateSessionRules({ removeRuleIds, addRules }, onUpdateRules);
    return true;
  }

  if (message === 'block:website') {
    BlockURL.generateRules(url).then(rules => {
      declarativeNetRequest.updateDynamicRules({ addRules: rules, removeRuleIds: [1123, 1124] });
    });
    return true;
  }

  if (message === 'clear:domains') {
    BlockURL.clear();
    return true;
  }

  if (getRules.includes(message)) {
    const rules = chrome.declarativeNetRequest[message]();
    sendMessage({ rules });
    return true;
  }  
}