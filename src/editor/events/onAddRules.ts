import { preRules, snackbar, snackbarCode } from "../constants";

export default function onAddRules(e: any) {
  e.preventDefault();
  try {
    const ruleType = e.target.elements[0].value;
    const action = e.target.elements[1].value;
    if (window.confirm(`Do you really want to ${action} these rules? `)) {
      chrome.runtime.sendMessage({
        message: action + ':rules',
        ruleType,
        rules: JSON.parse(preRules.innerText)
      });
    }
  } catch (error) {
    snackbar.classList.remove('d-none')
    snackbarCode.innerText = error.message;
  }
}