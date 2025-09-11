const genBtn = document.getElementById('gen');
const copyBtn = document.getElementById('copy');
const numInput = document.getElementById('num');
const codeDiv = document.getElementById('code');
const notify = document.getElementById('notify');

// Replace with your backend URL after deploy
let BACKEND_URL = "https://TON-BACKEND-URL.onrender.com"; // <-- replace me

function showNotify(text){ notify.hidden = false; notify.textContent = text; }
function hideNotify(){ notify.hidden = true; }

genBtn.addEventListener('click', async () => {
  const num = numInput.value.trim();
  if(!num){ codeDiv.innerHTML = '<span style="color:#ef4444;font-size:16px">Entrez un numéro valide</span>'; return; }

  showNotify('Ton code arrive…');
  codeDiv.textContent = '';

  try {
    const res = await fetch(BACKEND_URL + "/pair", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: num })
    });
    const data = await res.json();
    hideNotify();

    if(res.ok && data.pairingCode){
      codeDiv.textContent = data.pairingCode;
    } else {
      codeDiv.innerHTML = '<span style="color:#ef4444;font-size:16px">Erreur: ' + (data.error || 'Impossible de générer') + '</span>';
    }
  } catch (err){
    hideNotify();
    codeDiv.innerHTML = '<span style="color:#ef4444;font-size:16px">Erreur de connexion</span>';
    console.error(err);
  }
});

copyBtn.addEventListener('click', () => {
  const code = codeDiv.textContent.trim();
  if(!code) return;
  navigator.clipboard.writeText(code).then(()=>{
    alert('✅ Code copié');
  }).catch(()=>{
    alert('❌ Impossible de copier');
  });
});
