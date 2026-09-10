import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = readFileSync(path.join(root, 'content/site.ts'), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const data = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const { site, portraits, portraitOrder, featuredProjects, organizations, photoStories, publications, contactLinks } = data;
assert(site.title && site.description && site.language, 'Site metadata is required.');
assert(portraitOrder.length > 0, 'At least one portrait is required.');
for (const id of portraitOrder) assert(portraits[id], `Unknown portrait: ${id}`);
for (const [name, items, key] of [['projects', featuredProjects, 'no'], ['timeline', organizations, 'id'], ['albums', photoStories, 'id'], ['publications', publications, 'id'], ['contacts', contactLinks, 'label']]) {
  assert.equal(new Set(items.map((item) => item[key])).size, items.length, `Duplicate ${name} keys.`);
}
for (const album of photoStories) {
  assert(album.photos.length > 0, `Album ${album.id} needs a cover photo.`);
  assert(['violet', 'red', 'blue', 'orange'].includes(album.color), `Unsupported album color: ${album.color}`);
}
for (const paper of publications) {
  assert(paper.preview || paper.href, `Published paper ${paper.id} needs a public record.`);
  assert(paper.title && paper.abstract, `Paper ${paper.id} needs a title and abstract.`);
}
let assets = 0;
function inspect(value, key = '') {
  if (Array.isArray(value)) return value.forEach((item) => inspect(item, key));
  if (value && typeof value === 'object') return Object.entries(value).forEach(([field, item]) => inspect(item, field));
  if (typeof value !== 'string') return;
  if (['src', 'image', 'logo', 'href', 'contactHref'].includes(key)) {
    if (value.startsWith('/')) {
      assert(!value.startsWith('//') && !value.split('/').includes('..'), `Invalid local path: ${value}`);
      assert(existsSync(path.join(root, 'public', value)), `Missing local asset: ${value}`);
      assets++;
    } else {
      assert(['https:', 'mailto:'].includes(new URL(value).protocol), `Unsupported URL: ${value}`);
    }
  }
}
inspect(data);
console.log(`Content OK: ${featuredProjects.length} projects, ${organizations.length} timeline entries, ${publications.length} papers, ${photoStories.length} albums; ${assets} local asset references verified.`);
