import sendMessage from "../helpers/sendMessage";
import WebResponseErrorDetailsStorage from "../storage/WebResponseErrorDetailsStorage";

export default function onTabRemoved(tabId: number) {
  sendMessage({ webResponseErrorDetails: WebResponseErrorDetailsStorage.deleteOne(tabId) });
}