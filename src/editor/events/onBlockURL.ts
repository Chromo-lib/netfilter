import { snackbar, snackbarCode } from "../constants";

export default function onBlockURL(e: any) {
  e.preventDefault();
  try {
    const url = e.target.elements[0].value.replace(/http(s)?:\/\//g, '');
    chrome.runtime.sendMessage({ message: 'block:url', url });
    e.target.reset();
  } catch (error) {
    snackbar.classList.remove('d-none')
    snackbarCode.innerText = error.message;
  }
}