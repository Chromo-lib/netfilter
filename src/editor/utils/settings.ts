export default function settings() {
  let local: any = localStorage.getItem('settings');
  local = local ? JSON.parse(local) : { fontSize: '14px', theme: 'dark' };

  return {
    load() {
      document.body.style.fontSize = local.fontSize + 'px';
      document.body.style.filter = local.theme === 'dark' ? '' : 'invert(1)';

      (document.getElementById('fontSize') as HTMLInputElement)!.value = local.fontSize;
      (document.getElementById('theme') as HTMLSelectElement)!.value = local.theme;
    },

    set({ fontSize, theme }) {
      document.body.style.fontSize = fontSize + 'px';
      document.body.style.filter = theme === 'dark' ? '' : 'invert(1)';
      localStorage.setItem('settings', JSON.stringify({ fontSize, theme }));
    }
  }
}