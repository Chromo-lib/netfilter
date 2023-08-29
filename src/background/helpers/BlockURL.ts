const declarativeNetRequest = chrome.declarativeNetRequest;
const RuleActionType = declarativeNetRequest.RuleActionType;
const ResourceType = declarativeNetRequest.ResourceType;
const DomainType = declarativeNetRequest.DomainType;

export default class BlockURL {
  static async generateRules(url?: string) {

    const domains = await this.saveDomain(url);

    if (domains.length < 1) return [];

    const rule = {
      id: 1123,
      priority: 1,
      action: { type: RuleActionType.BLOCK },
      condition: {
        initiatorDomains: domains,
        domainType: DomainType.FIRST_PARTY,
        resourceTypes: [
          ResourceType.MAIN_FRAME,
          ResourceType.SUB_FRAME,
          ResourceType.WEBSOCKET,
          ResourceType.OBJECT,
          ResourceType.XMLHTTPREQUEST,
          ResourceType.SCRIPT,
          ResourceType.PING,
          ResourceType.IMAGE,
          ResourceType.MEDIA,
          ResourceType.CSP_REPORT,
          ResourceType.OTHER
        ]
      }
    }

    const rule2 = {
      id: 1124,
      priority: 1,
      action: { type: RuleActionType.BLOCK },
      condition: {
        requestDomains: domains,
        domainType: DomainType.THIRD_PARTY,
        resourceTypes: [ResourceType.XMLHTTPREQUEST, ResourceType.SCRIPT, ResourceType.WEBSOCKET]
      }
    }

    return [rule, rule2];
  }

  static async saveDomain(url?: string): Promise<string[]> {
    const nd: string[] = await this.getDomains();

    try {
      if (url) {
        const domains = nd.some((u: string) => u === url) ? nd : [...nd, url];

        return new Promise((resolve) => {
          chrome.storage.sync.set({ domains }, () => {
            resolve(domains)
          });
        });
      }
      else throw new Error('');
    } catch (error) {
      return new Promise((resolve) => { resolve(nd); })
    }
  }

  static async getDomains(): Promise<string[]> {
    return new Promise((resolve) => {
      chrome.storage.sync.get('domains', (store) => {
        resolve(store && store.domains ? store.domains : []);
      });
    })
  }

  static async clear() {
    await chrome.storage.sync.remove('domains');
  }
}