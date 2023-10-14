import { WebResponseErrorDetails } from "../types";

export default class ResponseStorage {

  static store: any = {};

  static async save(details: WebResponseErrorDetails) {
    if (!this.store[details.tabId]) this.store[details.tabId] = [details]
    else {
      if (!this.store[details.tabId].some((d: WebResponseErrorDetails) => details.url.includes(d.url)))
        this.store[details.tabId] = [...this.store[details.tabId], details]
    }

    await chrome.storage.local.set({ [`tab-${Date.now()}-${details.tabId}`]: JSON.stringify(this.store[details.tabId]) });
  }

  static async findOne(tabId: number) {
    const diskStore = await this.findMany();

    for (const key in diskStore) {
      if (+key.replace('tab-', '') === tabId) {
        return typeof diskStore[key] === "string" ? JSON.parse(diskStore[key]) : diskStore[key]
      }
    }
  }

  static async findMany() {
    const storage = await chrome.storage.local.get(null)
    const responses: any = {};

    Object.keys(storage).forEach(key => {
      if (/^tab/.test(key)) {
        responses[key] = JSON.parse(storage[key]);
      }
    });

    return responses
  }

  static async deleteOne(tabId: number) {
    const now = Date.now();
    const diskStore = await this.findMany();

    for (const key in diskStore) {
      const timeStamp = +key.split('-')[1];

      if (+key.replace('tab-', '') === tabId || ((now - timeStamp) / 60000) > 60) {
        chrome.storage.local.remove(key);
        return;
      }
    }

    delete this.store[tabId];
    return [];
  }

  static async clear() {
    const storage = await chrome.storage.local.get(null);

    for (const key in storage) {
      if (/^tab/.test(key)) {
        chrome.storage.local.remove(key);
      }
    }

    this.store = [];
    return [];
  }
}