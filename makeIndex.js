import { writeFile } from 'fs/promises';
import SaxonJS from 'saxon-js/SaxonJS2N.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const index = [];

async function getList() {
  const zettel = await fetch(
    'https://v0.api.niklas-luhmann-archiv.de/ZK/1/auszug/01?page=1'
  );
  const list = await zettel.json();
  return list.results;
}

async function getText(id) {
  const response = await fetch(
    `https://v0.api.niklas-luhmann-archiv.de/ZK/zettel/${id}/xml`
  );
  const data = await response.text();
  return data;
}

async function main() {
  const all = await getList();
  for (let zk of all) {
    let result = await getText(zk.ekin);

    const resource = await SaxonJS.getResource({
      text: result,
      type: 'xml',
    });
    const text = SaxonJS.XPath.evaluate(
      'string-join(//body//text()[not(parent::fw)][not(parent::ref)][not(parent::orig)][not(parent::abbr)], " ") => replace(":", "") => normalize-space()',
      resource,
      {
        xpathDefaultNamespace: 'http://www.tei-c.org/ns/1.0',
      }
    );

    index.push({ id: zk.ekin, text: text });
  }
  const saveIndex = await writeFile(
    path.join(__dirname, '/static/json/index.json'),
    JSON.stringify(index),
    'utf-8'
  );
}

main();
