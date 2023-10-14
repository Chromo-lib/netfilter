import { webResponseErrorDetailsUL } from "../constants";
import sendMessage from "../helpers/sendMessage";

export default async function onSearch(e: any) {
  const query = e.target.value.trim();

  [...webResponseErrorDetailsUL.querySelectorAll('#url')].forEach(el => {
    if (!el.textContent?.trim().includes(query)) {
      webResponseErrorDetailsUL.removeChild(el.parentNode!);      
    }
    else return el.id
  });

  if (query.length < 1) sendMessage({ message: 'getOne:webResponseErrorDetails' });
}