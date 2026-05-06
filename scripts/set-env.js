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

const enc = (s) => Buffer.from(s).toString('base64');

const filePath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');

const content = `export const environment = {
  production: '${enc('true')}',
  envName: '${enc(target)}',
  apiUrl: '${enc(apiUrl)}',
};
`;

fs.writeFileSync(filePath, content);
console.log(`[set-env] (${target}) environment.ts → encoded values written`);
