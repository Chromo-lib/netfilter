export default function download(data: []) {
  const a = document.createElement("a")
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }))
  a.download = new Date().toISOString() + "-netfilter.json";
  a.click();
  a.remove();
}