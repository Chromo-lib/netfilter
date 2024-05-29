import { listWebResponseEL } from "../constants";

export default function getWebResponseDetailsData() {
  return [...listWebResponseEL.querySelectorAll('textarea')].map((v: any) => JSON.parse(v.value)) as chrome.webRequest.WebResponseErrorDetails[];
}