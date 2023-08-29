export function replaceWord({ from, to }) {
  return {
    name: 'replace-word',

    transform(src, id) {
      //  console.log( id); path + filename

      let code = src.replace(new RegExp(`${from}\\.`, 'g'), to + '.');

      if (to === 'browser') {
        code = code.replace(/chrome\.action|browser.action/g, 'browser.browserAction');
      }

      return {
        code,
        map: null // provide source map if available
      }
    }
  }
}