import sendMessage from "../helpers/sendMessage";
import WebResponseStorage from "../storage/WebResponseStorage";

export default async function onTabRemoved(tabId: number) {
  const webResponseErrorDetails = await WebResponseStorage.deleteOne(tabId);
  sendMessage({ webResponseErrorDetails });
}