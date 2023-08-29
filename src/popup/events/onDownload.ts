import { webResponseErrorDetailsUL } from "../constants"

export default function onDownload() {
  if (window.confirm('Do you really want to download logs?')) {
    const data = [...webResponseErrorDetailsUL.querySelectorAll('#url')].map(el => el.textContent?.trim());
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }))
    a.download = document.getElementById('initiator')!.textContent + "-netfilter.json";
    a.click();
    a.remove();
  }
}