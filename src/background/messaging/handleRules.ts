import RulesManager from "../helpers/RulesManager";

export default function handleRules({ message, ruleType, url, rules, methodName, ruleActionType }: any, sendResponse: any) {
  sendResponse('');

  if (message === 'add:rules') {
    RulesManager.add({ rules, ruleType });
    chrome.runtime.sendMessage({ message: 'add:rules' });
  }

  if (message === 'remove:rules') {
    RulesManager.remove({ rules, ruleType });
    chrome.runtime.sendMessage({ message: 'Rules are removed successfully.' });
  }

  if (message === 'block:url') {
    RulesManager.generate(url, ruleActionType).then(rule => {
      sendResponse(rule ? url + ': is inserted successfully in blacklist' : 'URL is already blocked');
      if (rule) RulesManager.add({ rules: [rule], ruleType: 'dynamic' });
    });
  }

  if (message === 'get:rules' && ['getDynamicRules', 'getSessionRules', 'getEnabledRulesets'].includes(methodName)) {
    RulesManager.findMany(methodName).then(rules => {
      chrome.runtime.sendMessage({ rules });
    });
  }
  return true;
}