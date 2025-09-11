const API_URL = "https://raizelxmd-xd-baileys3.onrender.com";

document.getElementById("generate").addEventListener("click", async () => {
  const number = document.getElementById("number").value.trim();
  const result = document.getElementById("result");

  if (!number) {
    result.textContent = "⚠️ Veuillez entrer un numéro";
    result.style.color = "orange";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/pair`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number })
    });

    const data = await res.json();

    if (data.pairingCode) {
      result.textContent = `✅ Code: ${data.pairingCode}`;
      result.style.color = "limegreen";

      // bouton copier
      document.getElementById("copy").onclick = () => {
        navigator.clipboard.writeText(data.pairingCode);
        alert("Code copié !");
      };
    } else {
      result.textContent = `❌ Erreur: ${data.error || "Impossible de générer"}`;
      result.style.color = "red";
    }
  } catch (err) {
    result.textContent = "🚨 Erreur de connexion au serveur";
    result.style.color = "red";
  }
});
