export function getEL(cls: string) { return document.querySelector<HTMLElement>(cls); }

export function getAttr(el: HTMLElement, attr: string): string { 
  if(el) return el.getAttribute(attr); 
  return '0';
}

export function hideEL(cls: string) {
  const el = getEL(cls)
  if (el) el.style.setProperty('display', 'none', 'important')
}

export function showEL(cls: string) {
  const el = getEL(cls)
  if (el) el.style.setProperty('display', 'block', 'important')
}

export function invokeClick(cls: string) {
  const el = getEL(cls)
  if (el) {
    el.click();
    return true;
  }
  return false;
}