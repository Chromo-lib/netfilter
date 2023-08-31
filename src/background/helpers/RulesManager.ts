import { declarativeNetRequest, RuleActionType } from "../constants";
import onUpdateRules from "../events/onUpdateRules";

export default class RulesManager {

  static async add({ rules, ruleType }: { rules: chrome.declarativeNetRequest.Rule[], ruleType: string }) {
    const removeRuleIds =  rules.map((r: any) => r.id);
    declarativeNetRequest[ruleType === 'dynamic' ? 'updateDynamicRules' : 'updateSessionRules']({ removeRuleIds, addRules:rules }, onUpdateRules);
    return true;
  }

  static async generate(url: string) {
    const rules = await this.findMany('getDynamicRules') as chrome.declarativeNetRequest.Rule[];
    const rulesID = rules.map(r => r.id);
    const id = rulesID.length > 0 ? rulesID[rulesID.length - 1] - 1 : 5000;

    return {
      id,
      action: {
        type: RuleActionType.BLOCK
      },
      condition: {
        urlFilter: `||${url}^`,
        isUrlFilterCaseSensitive: false
      }
    };
  }

  static async findMany(methodName: string): Promise<chrome.declarativeNetRequest.Rule[] | string[]> {
    return await chrome.declarativeNetRequest[methodName]();
  }
}