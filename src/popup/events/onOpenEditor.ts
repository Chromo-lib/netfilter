export default function onOpenEditor() {
  chrome.windows.create({ url: "editor.html", height: 300, top: 300, type: 'popup' });
}