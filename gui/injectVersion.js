const fs = require('fs');

const TITLE = 'Markets';
const INDEX_FILE = './build/index.html';
const PACK_FILE = './package.json';

function getTitle(title) {
  return `<title>${title}</title>`;
}

function getVersion() {
  const pack = fs.readFileSync(PACK_FILE, 'utf8');
  const data = JSON.parse(pack);
  return data.version;
}

function injectVersion(version) {
  const index = fs.readFileSync(INDEX_FILE, 'utf8');
  const newTitle = getTitle(`${TITLE}-v${version}`);
  const left = index.split('<title>')[0];
  const right = index.split('</title>')[1];
  const newIndex = `${left}${newTitle}${right}`;
  fs.writeFile(INDEX_FILE, newIndex, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Inject version ${version} success`);
    }
  });
}

injectVersion(getVersion());
