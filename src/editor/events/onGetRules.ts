export default function onGetRules(e: any) {
  e.preventDefault();
  const methodName = e.target.elements[0].value;
  chrome.runtime.sendMessage({ message: 'get:rules', methodName });
}