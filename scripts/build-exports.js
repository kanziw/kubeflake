import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { build } from 'esbuild';

const rootDir = path.join(import.meta.dirname, '..');
const srcDir = path.join(rootDir, '');
const distDir = path.join(rootDir, '');

await fs.mkdir(distDir, { recursive: true });

const src = (name) => path.join(srcDir, name);
const modules = ['kubeflake.ts', 'kubeflake-cli.ts'];

/**
 * @param {string} content
 */
function rewriteCjsEntries(content) {
  return content.replace(/(require\("(?<id>.*)\.js"\))/g, (_match, _group1, id) => {
    return `require("${id}.cjs")`;
  });
}

{
  const entryPoints = modules.map(src);
  await build({
    entryPoints,
    outdir: distDir,
    outExtension: { '.js': '.js' },
    format: 'esm',
    treeShaking: true,
    write: true,
  });
  const { outputFiles: cjsOutputFiles = [] } = await build({
    entryPoints,
    outdir: distDir,
    outExtension: { '.js': '.cjs' },
    format: 'cjs',
    treeShaking: true,
    write: false,
  });
  for (const file of cjsOutputFiles) {
    await fs.writeFile(file.path, rewriteCjsEntries(file.text), 'utf8');
  }
}
