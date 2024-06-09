import walkSync from "walk-sync";
import { basename, dirname, join } from "path";
import { mkdirSync, writeFileSync, readFileSync } from "fs";

const preprocess = (basename: string, content: string) => {
  content = content.trimStart();
  if (content.match(/\-\-\-\n(.|\n)*\n\-\-\-/g) !== null) {
    content = content.replace(
      /\-\-\-(\n(.|\n)*\n)\-\-\-/g,
      `---$1slug: '/${basename}'\n---\n`,
    );
  } else {
    content = `---\nslug: '/${basename}'\n---\n\n` + content;
  }
  content = content.replace(/^(#+)/gm, "#$1");
  return content;
};

const dest = "docs";
const src = "obsidian";
for (const file of walkSync(src, { globs: [`**/*.md`, `**/*.mdx`] })) {
  const content = readFileSync(join(src, file), { encoding: "utf-8" });
  const newContent = preprocess(basename(file, ".md"), content);
  const newFile = file.replace(/\d+ - /, "");
  mkdirSync(join(dest, dirname(newFile)), { recursive: true });
  writeFileSync(join(dest, newFile), newContent, { encoding: "utf-8" });
}
