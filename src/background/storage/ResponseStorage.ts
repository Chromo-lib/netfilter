import { WebResponseErrorDetails } from "../types";

export default class ResponseStorage {

  static store: any = {};

  static save(details: WebResponseErrorDetails) {
    const key = `tab-${Date.now()}-${details.tabId}`;
    const foundedKey = this.findKey(details.tabId);

    if (!foundedKey) this.store[key] = [details]
    else {
      if (!this.store[foundedKey].some((d: WebResponseErrorDetails) => details.url === d.url && details.initiator === d.initiator))
        this.store[foundedKey] = [...this.store[foundedKey], details]
    }
  }

  static findKey(tabId: number) {
    for (const key in this.store) {
      const tab_id = +key.split('-')[2];
      if (tab_id === tabId) return key;
    }
    return null
  }

  static findOne(tabId: number) {
    for (const key in this.store) {
      const tab_id = +key.split('-')[2];
      if (tab_id === tabId) return this.store[key];
    }
    return []
  }

  static findMany(): WebResponseErrorDetails[] {
    let result: WebResponseErrorDetails[] = [];

    for (const key in this.store) {
      const data = this.store[key].map((v: WebResponseErrorDetails) => v);
      result = [...result, ...data];
    }
 
    return result
  }

  static deleteOne(tabId: number) {
    const now = Date.now();

    for (const key in this.store) {
      const [_, timeStamp, tab_id] = key.split('-');
      if (+tab_id === tabId || ((now - +timeStamp) / 60000) > 5) delete this.store[`tab-${timeStamp}-${tabId}`];
    }

    return this.findMany();
  }

  static clear() {
    this.store = {};
    return [];
  }
}