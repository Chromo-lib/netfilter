import { messageEL } from "../constants";

export default function onBlockDomain(e: any) {
  e.preventDefault();
  const url = e.target.elements[0].value;
  chrome.runtime.sendMessage({ message: 'block:url', url }, response => {
    messageEL.textContent = response;
  });
}