const fs = require('fs');
const walkSync = require('walk-sync');
const { config } = require('dotenv');
const { basename } = require('path');

config({ path: `.env` });

const preprocess = (/** @type {string} */ basename, /** @type {string} */ content) => {
  content = content.trimStart();
  if (content.match(/\-\-\-\n(.|\n)*\n\-\-\-/g) !== null) {
    content = content.replace(/\-\-\-(\n(.|\n)*\n)\-\-\-/g, `---$1slug: '/${basename}'\n---`);
  } else {
    content = `---\nslug: '/${basename}'\n---\n` + content;
  }
  content = content.replaceAll(/^(#+)/gm, '#$1');
  return content;
}

fs.rmSync(`docs`, { recursive: true, force: true });
fs.mkdirSync(`docs`);
for (const fileOrFolder of fs.readdirSync(process.env.VAULT)) {
  if (!fileOrFolder.startsWith('.')) {
    fs.cpSync(`${process.env.VAULT}/${fileOrFolder}`, `docs/${fileOrFolder.split('-').slice(-1).join('').trim()}`, { recursive: true });
  }
}

for (const file of walkSync(`docs`, { globs: [`**/*.md`, `**/*.mdx`]})) {
  const content = fs.readFileSync(`docs/${file}`, { encoding: 'utf-8' });
  fs.writeFileSync(`docs/${file}`, preprocess(basename(file, '.md'), content), { encoding: 'utf-8' });
}
