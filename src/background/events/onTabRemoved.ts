import sendMessage from "../helpers/sendMessage";
import ResponseStorage from "../storage/ResponseStorage";

export default async function onTabRemoved(tabId: number) {
  const webResponseErrorDetails = await ResponseStorage.deleteOne(tabId);
  sendMessage({ webResponseErrorDetails });
}