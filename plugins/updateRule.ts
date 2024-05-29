import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import axios from 'axios';

const cleanDomain = (d) => {
  d = d.replace(/^(\|\|)|(\^.*)|(\$.*)/g, '')
  return d.trim();
};

function cleanup(data: string, types = ['^$third-party']) {
  return data.split('\n')
    .filter(v => !v.endsWith('.') && (v.startsWith('||') && types.some(k => v.includes(k))) && (!v.includes('/') && !v.includes('*')) && !/\d\.\d/g.test(v))
    .map(k => cleanDomain(k));
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

async function thirdparties() {
  const easyprivacy = await axios.get('https://cdn.jsdelivr.net/gh/uBlockOrigin/uAssetsCDN@main/thirdparties/easyprivacy.txt');
  const ublock = await axios.get('https://filters.adtidy.org/extension/ublock/filters/3.txt');
  const domainsTopN = await axios.get('https://raw.githubusercontent.com/cbuijs/hagezi/4f49cd222f21d49ab0a14339bae756c499ee183d/lists/popupads/domains.top-n');

  const domains_ads = await axios.get('https://raw.githubusercontent.com/NoGitHubForYou/yafp/c06d428cb2c637adc7115f5a4c92274e60398713/domains_ads');
  const Adguard = await axios.get('https://raw.githubusercontent.com/AdguardTeam/AdguardFilters/7b6ea94ddcfc0837e810ab7416f1e0452424aaea/SpywareFilter/sections/tracking_servers.txt');
  const Adguardtracker = await axios.get('https://raw.githubusercontent.com/hl2guide/AdGuard-Home-AIO-List/3a4e3af3d6cecb5a91dcd8206367d88e62fafc3c/tracker_list_adguard_home.txt');

  const oldRules = readFileSync(resolve('_filters', 'thirdParty', '_lite'), 'utf8').split('\n');
  const newRules = [...cleanup(easyprivacy.data), 
    ...cleanup(domainsTopN.data, ['^']), 
    ...cleanup(domains_ads.data, ['^']), ...cleanup(Adguardtracker.data, ['^']), ...cleanup(Adguard.data), ...cleanup(ublock.data), ...oldRules];
  writeFileSync(resolve('_filters', 'thirdParty', '1.txt'), removeDuplicates(newRules).join('\n'), 'utf8');
}

async function firstparties() {
  const badware = await axios.get('https://ublockorigin.github.io/uAssets/filters/badware.txt');
  const urlhaus = await axios.get('https://malware-filter.gitlab.io/urlhaus-filter/urlhaus-filter-ag-online.txt');

  const oldRules = readFileSync(resolve('_filters', 'firstParty', '_lite'), 'utf8').split('\n');
  const newRules = removeDuplicates([...cleanup(badware.data, ['^$doc', '^$all']), ...cleanup(urlhaus.data, ['^$doc', '^$all']), ...oldRules]).join('\n');
  writeFileSync(resolve('_filters', 'firstParty', '1.txt'), newRules, 'utf8');
}

async function firstpartiesTracking() {
  const resp = await axios.get('https://raw.githubusercontent.com/AdguardTeam/AdguardFilters/7b6ea94ddcfc0837e810ab7416f1e0452424aaea/SpywareFilter/sections/tracking_servers_firstparty.txt');
  const oldRules = readFileSync(resolve('_filters', 'firstParty_rd', '_lite'), 'utf8').split('\n');
  const newRules = removeDuplicates([...cleanup(resp.data, ['^']), ...oldRules]).join('\n');
  writeFileSync(resolve('_filters', 'firstParty_rd', '1.txt'), newRules, 'utf8');
}

export default async function updateRule() {
  thirdparties();
  firstparties();
  firstpartiesTracking();
}