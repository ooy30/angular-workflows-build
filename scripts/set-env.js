const fs = require('fs');
const path = require('path');

const target = process.argv[2]; // 'staging' | 'production'
if (!['staging', 'production'].includes(target)) {
  console.error('Usage: node scripts/set-env.js <staging|production>');
  process.exit(1);
}

const apiUrl = process.env['API_URL'];
if (!apiUrl) {
  console.error('ERROR: API_URL environment variable is not set');
  process.exit(1);
}

// staging และ production ทั้งคู่ใช้ production: true (optimize เหมือนกัน)
const fileName = target === 'production' ? 'environment.ts' : `environment.${target}.ts`;
const filePath = path.join(__dirname, '..', 'src', 'environments', fileName);

const content = `export const environment = {
  production: true,
  envName: '${target}',
  apiUrl: '${apiUrl}',
};
`;

fs.writeFileSync(filePath, content);
console.log(`[set-env] ${fileName} → apiUrl: ${apiUrl}`);
