import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
execFileSync('npm', ['run', 'check'], { cwd: root, stdio: 'inherit' });
execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit' });
const { version } = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const staging = mkdtempSync(path.join(tmpdir(), 'urbanview-'));
const name = `urbanview-${version}`;
const target = path.join(staging, name);
const output = path.join(root, 'releases', `${name}.tar.gz`);
try {
  mkdirSync(target);
  // Explicit source allowlist: never include Git history, secrets, caches, or local drafts.
  for (const entry of ['app', 'components', 'content', 'public', 'scripts', 'README.md', 'ASSETS.md', '.gitignore', 'package.json', 'package-lock.json', 'tsconfig.json', 'next.config.ts', 'vite.config.ts', 'eslint.config.mjs']) {
    cpSync(path.join(root, entry), path.join(target, entry), { recursive: true, filter: (file) => path.basename(file) !== '.DS_Store' });
  }
  // A reusable template must not inherit the source site's registration.
  mkdirSync(path.join(target, '.openai'));
  writeFileSync(path.join(target, '.openai/hosting.json'), JSON.stringify({ d1: null, r2: null }, null, 2) + '\n');
  if (existsSync(path.join(root, 'LICENSE'))) cpSync(path.join(root, 'LICENSE'), path.join(target, 'LICENSE'));
  mkdirSync(path.dirname(output), { recursive: true });
  execFileSync('tar', ['-czf', output, '-C', staging, name], { env: { ...process.env, COPYFILE_DISABLE: '1' } });
  console.log(`Template source archive: ${output}`);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
