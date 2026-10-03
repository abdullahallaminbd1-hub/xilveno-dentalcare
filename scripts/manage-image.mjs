import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const configPath = resolve(root, 'wrangler.jsonc');
const reference = JSON.parse(readFileSync(resolve(root, 'src/content/reference.json'), 'utf8'));
const allowedSlots = new Set([
  'home_hero',
  'home_about',
  'about_main',
  'about_reception',
  'about_treatment',
  'about_waiting',
  'contact_map',
  ...reference.items.map((item) => `${item.team ? 'team' : 'service'}_${item.slug}`),
]);
const contentTypes = new Map([
  ['.jpg', { type: 'image/jpeg', signature: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff }],
  ['.jpeg', { type: 'image/jpeg', signature: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff }],
  ['.png', { type: 'image/png', signature: (bytes) => bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) }],
  ['.webp', { type: 'image/webp', signature: (bytes) => bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP' }],
]);

const args = process.argv.slice(2);
const local = args.includes('--local');
const [operation, slot, ...fileParts] = args.filter((argument) => argument !== '--local');
const target = local ? '--local' : '--remote';

if (!['set', 'remove'].includes(operation) || !allowedSlots.has(slot) || (operation === 'set' && fileParts.length !== 1) || (operation === 'remove' && fileParts.length !== 0)) {
  console.error('Usage: node scripts/manage-image.mjs set <known-slot> <image.jpg|png|webp> [--local]');
  console.error('       node scripts/manage-image.mjs remove <known-slot> [--local]');
  process.exit(2);
}

const wrangler = (...args) => execFileSync(process.execPath, [resolve(root, 'node_modules/wrangler/bin/wrangler.js'), ...args], {
  cwd: root,
  stdio: 'inherit',
});
const objectKey = `images/${slot}`;

if (operation === 'set') {
  const filePath = resolve(fileParts[0]);
  const format = contentTypes.get(extname(filePath).toLowerCase());
  if (!format) {
    throw new Error('Unsupported image format. Use JPEG, PNG, or WebP.');
  }

  const details = statSync(filePath);
  if (!details.isFile() || details.size === 0) {
    throw new Error('The selected image must be a non-empty file.');
  }

  const bytes = readFileSync(filePath);
  if (!format.signature(bytes)) {
    throw new Error('The image contents do not match the file extension.');
  }

  wrangler('r2', 'object', 'put', `xilveno-dentalcare-media/${objectKey}`, target, '--file', filePath, '--content-type', format.type);
  const sql = `INSERT INTO image_slots (slot, object_key, content_type, updated_at) VALUES ('${slot}', '${objectKey}', '${format.type}', CURRENT_TIMESTAMP) ON CONFLICT(slot) DO UPDATE SET object_key = excluded.object_key, content_type = excluded.content_type, updated_at = CURRENT_TIMESTAMP`;
  wrangler('d1', 'execute', 'xilveno-dentalcare-db', target, '--command', sql);
  console.log(`Set ${slot} to ${objectKey} (${format.type}).`);
} else {
  const sql = `DELETE FROM image_slots WHERE slot = '${slot}'`;
  wrangler('d1', 'execute', 'xilveno-dentalcare-db', target, '--command', sql);
  wrangler('r2', 'object', 'delete', `xilveno-dentalcare-media/${objectKey}`, target);
  console.log(`Removed ${slot}; the public page will use its original fallback artwork.`);
}
