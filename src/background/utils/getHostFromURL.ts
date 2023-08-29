export default function getHostFromURL(url?: string) {
  return url && !/^(chrome|firefox|edge|addon)/g.test(url) ? new URL(url).hostname : url
}