export default function onSearch(e: any) {
  e.preventDefault();
  const url = e.target.elements[0].value;
  const errname = e.target.elements[1].value;

  chrome.runtime.sendMessage({
    message: 'get:webResponseErrorDetails',
    filter: {
      url,
      errname,
      type:null
    }
  });
}