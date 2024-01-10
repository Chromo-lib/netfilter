import { getAttr, getEL, hideEL, invokeClick } from "./dom";

let videoObserver = null;
let videoEL = null;

function doProcess() {
  invokeClick('.ytp-ad-skip-button');
  invokeClick('.ytp-ad-skip-button-modern');
  invokeClick('.ytp-ad-overlay-close-button');

  hideEL('.ytp-ad-text-overlay');
  hideEL('.ytp-ad-preview-slot');

  if (videoEL && getEL('.ad-showing')) videoEL.currentTime = isNaN(videoEL.duration) ? 0 : videoEL.duration;
}

export default function ytRemoveAds() {
  let id = setInterval(() => {
    if (location.pathname !== "/watch") {
      if (videoObserver) videoObserver.disconnect();
      clearInterval(id);
      return;
    }

    if (videoObserver) videoObserver.disconnect();

    videoEL = getEL('.video-stream.html5-main-video');
    const progress = getEL('yt-page-navigation-progress');
    const isP = +getAttr(progress, 'aria-valuenow') >= 90 || +getAttr(progress, 'aria-valuemax') >= 90;

    if (videoEL && isP) {
      doProcess();
      clearInterval(id);
      videoObserver = new MutationObserver(doProcess);
      videoObserver.observe(videoEL, { attributes: true, attributeFilter: ['src'] });
    }
  }, 200)
}
