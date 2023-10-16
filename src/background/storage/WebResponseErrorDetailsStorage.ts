import { WebResponseErrorDetails } from "../types";

type Store = { tabId: number, timeStamp: number, data: [] };

export default class WebResponseErrorDetailsStorage {

  private static memStore = {};

  static save(details: WebResponseErrorDetails): void {
    const store = this.memStore[details.tabId] as Store;

    if (store) {
      if (!store.data.some((d: WebResponseErrorDetails) => details.url === d.url && details.initiator === d.initiator)) {
        this.memStore[details.tabId].data.push(details);
      }
    }
    else {
      this.memStore[details.tabId] = { tabId: details.tabId, timeStamp: Date.now(), data: [details] }
    }
  }

  static findOne(tabId: number): WebResponseErrorDetails[] {
    return this.memStore[tabId]?.data
  }

  static findMany(): WebResponseErrorDetails[] {
    let result: WebResponseErrorDetails[] = [];
    Object.keys(this.memStore).map(key => {
      result = [...result, ...this.memStore[key].data]
    });
    return result
  }

  static deleteOne(tabId: number): WebResponseErrorDetails[] {
    if (Object.keys(this.memStore).length < 1) return [];

    const now = Date.now();

    for (const key in this.memStore) {
      const store = this.memStore[key] as Store;
      if (store.tabId === tabId || ((now - store.timeStamp) / 60000) > 5) delete this.memStore[key];
    }

    return this.findMany();
  }

  static clear(): WebResponseErrorDetails[] {
    this.memStore = {};
    return [];
  }
}