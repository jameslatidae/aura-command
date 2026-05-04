import fs from 'fs';
import path from 'path';

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\\`/g, '`');
  fs.writeFileSync(file, content, 'utf8');
}

const dir = './src';
function walk(d) {
  fs.readdirSync(d).forEach(f => {
    let pf = path.join(d, f);
    if (fs.statSync(pf).isDirectory()) walk(pf);
    else if (pf.endsWith('.tsx') || pf.endsWith('.ts')) fixFile(pf);
  });
}
walk(dir);
console.log('Fixed backticks automatically.');
