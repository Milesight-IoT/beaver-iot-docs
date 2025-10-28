const srcFile = './open-api/beaver.openapi.json';
const i18nFile = './open-api/openapi.i18n.json';

const fs = require('fs');
const openAPIData = JSON.parse(fs.readFileSync(srcFile));
const i18nData = JSON.parse(fs.readFileSync(i18nFile));

function findLastLetterStartIndex(str) {
  let regex = /[a-zA-Z ]+/g;
  let match;
  let lastMatch = null;

  while ((match = regex.exec(str)) !== null) {
    lastMatch = match;
  }

  return lastMatch ? lastMatch.index : -1;
}

function internationalize(lang = 'en') {
  const langApiData = JSON.parse(JSON.stringify(openAPIData));
  const paths = Object.keys(langApiData.paths);
  for (const urlPath of paths) {
    const pathInfo = langApiData.paths[urlPath];
    const methods = Object.keys(pathInfo);
    for (const method of methods) {
      const methodInfo = pathInfo[method];
      const {
        summary
      } = methodInfo;
      const nameIndex = findLastLetterStartIndex(summary);
      const enName = summary.substring(nameIndex);
      methodInfo.summary = i18nData[lang][enName];
      methodInfo.operationId = enName;
      if (!methodInfo.summary) {
        throw Error(`Cannot find i18n data for [${enName}]`);
      }
    }
  }

  fs.writeFileSync(`./open-api/beaver.openapi.${lang}.json`, JSON.stringify(langApiData, null, 2));
}

internationalize('en');
internationalize('zh-Hans');
