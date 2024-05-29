import webResponseList from "../dom/webResponseList";
import getWebResponseDetailsData from "../utils/getWebResponseDetailsData";

const parentEL = document.getElementById('list-webResponse-filter')!;

export default function onSearch(e: any) {
  e.preventDefault();
  const url = e.target.elements[0].value;
  const errname = e.target.elements[1].value;
  if (url.length < 1 && errname === 'ALL') { parentEL.classList.add('d-none'); return; }

  let data = getWebResponseDetailsData();

  parentEL.classList.remove('d-none')
  parentEL.innerHTML = '';

  if (errname !== 'ALL') data = data.filter(v => v.error.includes(errname));

  data.filter(v => v.url.includes(url)).forEach(d => {
    webResponseList(d, parentEL);
  });
}