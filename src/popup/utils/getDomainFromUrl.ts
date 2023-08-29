
// static.test.example.com => example.com
// example.uk.co =>  example.uk.co
//  www.example.uk =>  example.uk.

export default function getDomainFromUrl(url: string | null | undefined) {
  if (!url) return '';
  if (/^(chrome|firefox|edge|addon)/g.test(url)) return url;

  if (!url.startsWith('http')) url = ('https://' + url);

  const urlObject = new URL(url);
  const hostnameParts = urlObject.hostname.split(".");
  let tldIndex = Math.max(hostnameParts.length - 2, 0);

  // Handle special case for subdomains like 'xx.fbcdn.net'
  if (hostnameParts[tldIndex].length <= 3 && hostnameParts.length >= 3) {
    tldIndex--;
  }

  return hostnameParts.slice(tldIndex).join(".");
}