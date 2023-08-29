import sendMessage from "../helpers/sendMessage";

export default async function onClear() {
  if (window.confirm('Do you really want to clear list')) sendMessage({ message: 'delete:webResponseErrorDetails' });
}