import RulesManager from "../helpers/RulesManager";

export default function handleRules({ message, ruleType, url, rules, methodName }: any, sendResponse: any) {
  sendResponse('');

  if (message === 'add:rules') {
    RulesManager.add({ rules, ruleType });
    chrome.runtime.sendMessage({ message:'add:rules' });
  }

  if (message === 'remove:rules') {
    RulesManager.remove({ rules, ruleType });
    chrome.runtime.sendMessage({ message:'remove:rules' });
  }

  if (message === 'block:url') {
    RulesManager.generate(url).then(rule => {
      sendResponse(rule);
      RulesManager.add({ rules: [rule], ruleType: 'dynamic' });
    });
  }

  if (message === 'get:rules' && ['getDynamicRules', 'getSessionRules', 'getEnabledRulesets'].includes(methodName)) {
    RulesManager.findMany(methodName).then(rules => {
      chrome.runtime.sendMessage({ rules });
    });
  }
  return true;
}