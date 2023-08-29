import { getEL } from "./utils/dom";
import ytRemoveAds from "./utils/ytRemoveAds";

const yt = ['m.youtube.com', 'www.youtube.com', 'music.youtube.com'];
const options = { childList: true, subtree: true };
//const options = { attributes: true, attributeFilter: ['role', 'hidden'] };
// || getEL('ytd-browse')

let id: any = null;
let observer: any = null;
let counter = 0;

if (yt.includes(location.hostname)) {
  id = setInterval(() => {
    counter++;

    if (counter > 200) clearInterval(id);

    if (getEL('ytd-app')) {
      if (observer) observer.disconnect();

      clearInterval(id);

      ytRemoveAds();

      observer = new MutationObserver(ytRemoveAds);
      observer.observe(getEL('ytd-app'), options);
    }
  }, 500);
}