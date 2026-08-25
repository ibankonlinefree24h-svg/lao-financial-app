import fs from 'fs';
import path from 'path';

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('.toLocaleString()')) {
      console.log(`${path.basename(filePath)} L${i+1}: ${line.trim()}`);
    }
  });
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walkDir(full);
    else if (f.endsWith('.jsx') || f.endsWith('.js')) checkFile(full);
  }
}

walkDir('F:/app/src');
