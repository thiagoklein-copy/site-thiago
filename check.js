import fs from 'fs';

const path = 'src/pages/CasePage.jsx';
const code = fs.readFileSync(path, 'utf8');

const stack = [];
let line = 1;
let col = 0;
let inString = false;
let stringChar = null;
let inTemplate = false;

for (let i = 0; i < code.length; i++) {
  const ch = code[i];
  col++;

  // controle de linha
  if (ch === '\n') {
    line++;
    col = 0;
  }

  // ignorar dentro de string normal
  if (inString) {
    if (ch === stringChar && code[i - 1] !== '\\') {
      inString = false;
      stringChar = null;
    }
    continue;
  }

  // template literal
  if (inTemplate) {
    if (ch === '`' && code[i - 1] !== '\\') {
      inTemplate = false;
    }
    continue;
  }

  if (ch === '"' || ch === "'") {
    inString = true;
    stringChar = ch;
    continue;
  }

  if (ch === '`') {
    inTemplate = true;
    continue;
  }

  // empilha/ desempilha chaves/colchetes/parênteses
  if ('{[('.includes(ch)) {
    stack.push({ ch, line, col });
  } else if ('}])'.includes(ch)) {
    const open = stack.pop();
    if (!open) {
      console.log(`FECHAMENTO sem abertura na linha ${line}, coluna ${col} (${ch})`);
      process.exit(1);
    }
  }
}

if (stack.length > 0) {
  console.log('Aberturas sem fechamento:');
  for (const s of stack) {
    console.log(`- '${s.ch}' aberto na linha ${s.line}, coluna ${s.col}`);
  }
} else if (!inTemplate && !inString) {
  console.log('Parênteses/colchetes/chaves balanceados.');
} else {
  console.log('Script terminou ainda dentro de string/template literal.');
}