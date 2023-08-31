import { declarativeNetRequest, ResourceType, RuleActionType } from "../constants";

export default class RulesManager {

  private static async lastID(): Promise<number> {
    const rules = await this.findMany('getDynamicRules') as chrome.declarativeNetRequest.Rule[];
    const rulesID = rules.map(r => r.id);
    return rulesID.length > 0 ? rulesID[rulesID.length - 1] - 1 : 5000;
  }

  static async add({ rules, ruleType }: { rules: chrome.declarativeNetRequest.Rule[], ruleType: string }) {
    const lastid = await this.lastID();
    const addRules = rules.map((r, i) => (r.id = lastid - i, r));    
    const removeRuleIds = addRules.map((r: any) => r.id);
    declarativeNetRequest[ruleType === 'dynamic' ? 'updateDynamicRules' : 'updateSessionRules']({ removeRuleIds, addRules });
    return true;
  }  

  static async generate(url: string) {
    const id = await this.lastID();
    return {
      id,
      action: {
        type: RuleActionType.BLOCK
      },
      condition: {
        urlFilter: `||${url}^`,
        isUrlFilterCaseSensitive: false,
        resourceTypes: [
          ResourceType.MAIN_FRAME,
          // ResourceType.SCRIPT,
          // ResourceType.XMLHTTPREQUEST,
          // ResourceType.CSP_REPORT,
          // ResourceType.OTHER
        ]
      }
    }
  }

  static async remove({ rules, ruleType }: { rules: chrome.declarativeNetRequest.Rule[], ruleType: string }) {
    const removeRuleIds = rules.map((r: any) => r.id);
    declarativeNetRequest[ruleType === 'dynamic' ? 'updateDynamicRules' : 'updateSessionRules']({ removeRuleIds });
    return true;
  }

  static async findMany(methodName: string): Promise<chrome.declarativeNetRequest.Rule[] | string[]> {
    return await chrome.declarativeNetRequest[methodName]();
  }
}