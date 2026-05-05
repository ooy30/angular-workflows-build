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

// เขียนตรงไปที่ environment.ts เสมอ แล้วให้ ng build --configuration production ใช้ไฟล์นี้
const filePath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');

const content = `export const environment = {
  production: true,
  envName: '${target}',
  apiUrl: '${apiUrl}',
};
`;

fs.writeFileSync(filePath, content);
console.log(`[set-env] environment.ts → envName: ${target}, apiUrl: ${apiUrl}`);
