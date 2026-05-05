const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'assets', 'config.json');

const apiUrl = process.env['API_URL'];
if (!apiUrl) {
  console.error('ERROR: API_URL environment variable is not set');
  process.exit(1);
}

const config = { apiUrl };

fs.writeFileSync(targetPath, JSON.stringify(config, null, 2) + '\n');
console.log(`Generated config.json → apiUrl: ${apiUrl}`);
