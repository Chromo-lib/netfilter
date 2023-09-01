import sendMessage from "../helpers/sendMessage";

export default async function onStartup() {
  sendMessage({ message: 'getOne:webResponseErrorDetails' });
  
}