import { DomainType, ResourceType, RuleActionType } from "./constants";

const rules: chrome.declarativeNetRequest.Rule[] = [
  {
    id: 52,
    priority: 1,
    action: {
      type: RuleActionType.BLOCK
    },
    condition: {
      regexFilter: '.*youtube.*\/(ad_break|pcs|pagead|ads|log_event|ptracking|adunit|qoe).*',
      domainType: DomainType.FIRST_PARTY,
      resourceTypes: [
        ResourceType.PING,
        ResourceType.SCRIPT,
        ResourceType.XMLHTTPREQUEST,
        ResourceType.CSP_REPORT,
        ResourceType.OTHER
      ]
    }
  }
];

export default rules
