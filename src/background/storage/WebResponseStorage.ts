import { WebResponseErrorDetails } from "../types";
import millisecondsToHours from "../utils/millisecondsToHours";

export default class WebResponseStorage {

  private static splitOnSixthSlash(inputString: string) {
    const parts = inputString.split('/');
    return parts.length >= 6 ? parts.slice(0, 6).join('/') : inputString;
  }

  static async add(requestId: string, details: WebResponseErrorDetails | any): Promise<string | null> {
    const data = await this.findMany();
    const url = details.type === 'xmlhttprequest'
      ? this.splitOnSixthSlash(details.url)
      : details.url.split('?')[0];

    if (!data.some(d => d.url === url && d.initiator === details.initiator)) {
      await chrome.storage.local.set({ [requestId]: JSON.stringify({ ...details, url }) });
      return details.url;
    }

    return null;
  }

  static async findOne(tabId: string, initiator?: string) {
    return (await this.findMany()).filter(d => d
      && d.error.includes('BLOCKED')
      && (+d.tabId === +tabId || d.initiator?.includes(initiator || '*/*$)=(-è_op$*/--$')));
  }

  static async findMany(): Promise<WebResponseErrorDetails[]> {
    const items = await chrome.storage.local.get(null);
    let result: WebResponseErrorDetails[] = [];
    if (items) Object.keys(items).forEach(key => {
      const item: WebResponseErrorDetails = typeof items[key] === 'string' ? JSON.parse(items[key]) : items[key];
      if (/^\d+/g.test(key) && !key.includes('rules')) {
        if (result.some(d => d.url === item.url && d.initiator === item.initiator)) chrome.storage.local.remove(item.requestId);
        else result.push(item);
      }
    });
    return result
  }

  static async deleteMany(tabId: number, initiator?: string | undefined): Promise<[]> {
    const timeInMilliseconds = new Date().getTime();

    (await this.findMany()).forEach(async (d) => {
      if (d.tabId === tabId || (initiator && d.initiator?.includes(initiator)) || millisecondsToHours(timeInMilliseconds - d.timeStamp) >= 2) {
        await chrome.storage.local.remove(d.requestId);
      }
    });

    return [];
  }

  static async clear(): Promise<WebResponseErrorDetails[]> {
    (await this.findMany()).forEach(async (d) => {
      if (d.requestId) await chrome.storage.local.remove(d.requestId);
    });

    return [];
  }
}