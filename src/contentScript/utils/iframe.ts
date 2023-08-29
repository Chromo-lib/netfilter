export default function iframe() {
  const iframes: NodeList = document.querySelectorAll('iframe');

  if (iframes) {
    for (let el of iframes) {
      (el as HTMLIFrameElement).setAttribute('referrerpolicy', "origin-when-cross-origin")
    }
  }
}