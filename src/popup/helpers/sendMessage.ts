export default async function sendMessage(message: any) {
  const tabs = await chrome.tabs.query({ active: true });
  const activeTab = tabs[0];
  if (!activeTab || !activeTab.url || !activeTab.id || /^(chrome|edge|firefox|addon)/g.test(activeTab.url)) return;
  chrome.runtime.sendMessage({ ...message, url: new URL(activeTab.url).host, tabId: activeTab.id }).catch(console.log);
}