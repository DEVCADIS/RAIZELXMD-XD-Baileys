document.getElementById('year').textContent = new Date().getFullYear();

const input = document.getElementById('input');
const output = document.getElementById('output');
const make = document.getElementById('make');
const clear = document.getElementById('clear');

make.addEventListener('click', () => {
  const txt = input.value.trim();
  if(!txt){ output.textContent = 'Rien à générer.'; return; }

  // Exemple simple : "pairing"
  const result = generatePair(txt);
  output.textContent = result;
});

clear.addEventListener('click', () => {
  input.value = '';
  output.textContent = '';
});

function generatePair(s) {
  const hash = Array.from(s).reduce((h,c)=> (h*31 + c.charCodeAt(0))>>>0, 7).toString(36);
  return `input: ${s}\npair: ${hash}\nnote: personnalisé par toi`;
}