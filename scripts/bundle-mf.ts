import { readdir, writeFile, cp, stat } from 'node:fs/promises';

const mfName = process.argv[2];
if (!mfName) {
  console.error('Usage: node scripts/bundle-mf.ts <mf-name>');
  process.exit(1);
}

const hasBrowser = await stat(`dist/mf/${mfName}-entry/browser/`).then(() => true).catch(() => false);
const dir = hasBrowser ? `dist/mf/${mfName}-entry/browser` : `dist/mf/${mfName}-entry`;

// Create index.js entry point
const fileList = (await readdir(dir)).filter(f => f.endsWith('.js'));
const predefinedFiles = ['runtime.js', 'polyfills.js', 'scripts.js', 'main.js'];
const content = predefinedFiles
  .filter(pf => fileList.includes(pf))
  .map(pf => `import './${pf}';`)
  .join('\n');

await writeFile(`${dir}/index.js`, content);

// Copy to host public folder
await cp(dir, `projects/host/public/elements/${mfName}`, { recursive: true });

console.log(`✔ Bundled ${mfName} → projects/host/public/elements/${mfName}`);
