import { snackbar, snackbarCode } from "../constants";

export default function onBlockURL(e: any) {
  e.preventDefault();
  try {
    const url = e.target.elements[0].value.replace(/http(s)?:\/\//g, '');
    const ruleActionType = e.target.elements[1].value;

    if (window.confirm(`'Do you really want to ${ruleActionType} ?  ${url}`)) {
      chrome.runtime.sendMessage({ message: 'block:url', url, ruleActionType });
      e.target.reset();
    }
  } catch (error) {
    snackbar.classList.remove('d-none')
    snackbarCode.innerText = error.message;
  }
}