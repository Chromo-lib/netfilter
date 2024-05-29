function onOpenEditor() {
  chrome.windows.create({ url: "editor.html", top: 0, left:1000, width:700, type: 'popup' });
}

function onReload() {
  chrome.runtime.reload();
}

document.getElementById('btn-open-editor')?.addEventListener('click', onOpenEditor)
document.getElementById('btn-reload')?.addEventListener('click', onReload)