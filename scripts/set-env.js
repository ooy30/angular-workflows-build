const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');

const apiUrl = process.env['API_URL'];
if (!apiUrl) {
  console.error('ERROR: API_URL environment variable is not set');
  process.exit(1);
}

const content = `export const environment = {
  production: true,
  envName: 'production',
  apiUrl: '${apiUrl}',
};
`;

fs.writeFileSync(targetPath, content);
console.log(`Set API_URL = ${apiUrl} in ${targetPath}`);
