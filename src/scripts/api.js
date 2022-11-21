const fs = require('fs');

require('dotenv').config({
  path: `.env`,
});

const preprocess = (content) => {
  // content = content.replaceAll(/---\n.+---\n+/gs, '')
  const body = content.replaceAll(/^(#+)/gm, '#$1');
  return body;
}

for (const dirname of fs.readdirSync('docs')) {
  const dst = `docs/${dirname}`;
  if (fs.lstatSync(dst).isDirectory()) {
    fs.rmSync(`docs/${dirname}`, { recursive: true });
  }
}

for (const dirname of fs.readdirSync(process.env.VAULT)) {
  const src = `${process.env.VAULT}${dirname}`;
  if (!dirname.startsWith('.') && (dirname !== '模板' && dirname !== '附件') && fs.lstatSync(src).isDirectory()) {
    const basename = dirname.split('-')[1].trim();
    const dst = `docs/${basename}`;
    fs.mkdirSync(dst)
    for (const filename of fs.readdirSync(src)) {
      const content = fs.readFileSync(`${src}/${filename}`, 'utf-8');
      fs.writeFileSync(`${dst}/${filename}`, preprocess(content));
    }
  }
}
