const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

function removeDuplicates(arr) {
  return arr.filter((item, index) => {
    item = item.replace(/(\?|\/)$/g, '');
    return arr.indexOf(item) === index
  });
}

const DATA_FILTERS_PATH = resolve(process.cwd(), '_filters');
const rules = [];

const onReadDir = directoryName => {

  const dirFiles = readdirSync(resolve(DATA_FILTERS_PATH, directoryName))
    .filter(file => file !== 'rule.json' && file !== 'exclude.txt');

  const rule = require(resolve(DATA_FILTERS_PATH, directoryName, 'rule.json'), 'utf8');

  dirFiles.forEach(fileName => {

    const fileLines = readFileSync(resolve(DATA_FILTERS_PATH, directoryName, fileName), 'utf8')
      .split(/\n/g)
      .map(line => line.replace(/(?!\|\|)(?<=.*)(?:\^.*)/g, '').replace(/\|\||@@/g, '').trim())
      .filter(l => l && !l.startsWith('#') && !l.includes('^$all'));

    const domainList = removeDuplicates(fileLines);

    if (/regexFilter/gi.test(directoryName)) {

      const excludedRequestDomains = readFileSync(resolve(DATA_FILTERS_PATH, directoryName, 'exclude.txt'), 'utf8')
        .split(/\n/g)
        .filter(line => line && line.trim());

      const sliceNum = 3;
      let sliceEnd = sliceNum;

      for (let i = 0; i < domainList.length - 1; i += sliceNum) {
        rules.push({
          ...rule,
          condition: {
            ...rule.condition,
            regexFilter: domainList.slice(i, sliceEnd).join('|'),
            excludedRequestDomains,
            excludedInitiatorDomains: excludedRequestDomains
          }
        });

        sliceEnd += sliceNum;
      }
    }
    if (directoryName.includes('urlFilter')) {
      for (let i = 0; i < domainList.length - 1; i++) {
        rules.push({ ...rule, condition: { ...rule.condition, urlFilter: "||" + domainList[i] + "^", } });
      }
    }
    if (!/regexFilter|urlFilter/gi.test(directoryName)) {
      const domain = rule.condition.requestDomains ? 'requestDomains' : 'initiatorDomains';
      const ruleDefinition = { ...rule, condition: { ...rule.condition, [domain]: domainList } };
      rules.push(ruleDefinition);
    }

    console.log('> Clean filter ', directoryName);

    writeFileSync(
      resolve(process.cwd(), '_filters', directoryName, fileName),
      domainList.sort((a, b) => a.localeCompare(b)).join('\n')
    );
  })
}

export function combineRules() {
  return {
    name: 'combine-rules',
    async buildEnd() {

      readdirSync(DATA_FILTERS_PATH).forEach(onReadDir);

      console.log('\nNumber of rules = ', rules.length);

      writeFileSync(
        resolve(process.cwd(), 'dist', 'ruleset_1.json'),
        JSON.stringify(rules.map((rule, i) => (rule.id = i + 1, rule)))
      );

    }
  };
}
