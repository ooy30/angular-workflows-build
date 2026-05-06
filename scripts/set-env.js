const fs = require('fs');
const path = require('path');

const target = process.argv[2];
if (!['staging', 'production'].includes(target)) {
  console.error('Usage: node scripts/set-env.js <staging|production>');
  process.exit(1);
}

const apiUrl = process.env['API_URL'];
if (!apiUrl) {
  console.error('ERROR: API_URL environment variable is not set');
  process.exit(1);
}

const KEY = 'k1y!';

function xor(str, key) {
  return Array.from(str)
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length)))
    .join('');
}

const enc = (s) =>
  Buffer.from(xor(s, KEY)).toString('base64').split('').reverse().join('');

const filePath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');

const content = `const K = '${KEY}';
const d = (s: string) => {
  const b = atob(s.split('').reverse().join(''));
  return [...b]
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ K.charCodeAt(i % K.length)))
    .join('');
};

export const environment = {
  production: d('${enc('true')}') === 'true',
  envName: d('${enc(target)}'),
  apiUrl: d('${enc(apiUrl)}'),
};
`;

fs.writeFileSync(filePath, content);
console.log(`[set-env] (${target}) environment.ts → encoded values written`);
