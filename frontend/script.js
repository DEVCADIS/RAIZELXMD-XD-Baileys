const form = document.querySelector("form");
const input = document.querySelector("input");
const result = document.querySelector("#result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const number = input.value;

  try {
    const res = await fetch("https://raizelxmd-xd-baileys4.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number }),
    });

    const data = await res.json();
    if (data.pairingCode) {
      result.innerHTML = `✅ Code: <b>${data.pairingCode}</b>`;
    } else {
      result.innerHTML = "❌ Erreur : " + (data.error || "Impossible de générer le code");
    }
  } catch (err) {
    result.innerHTML = "🚨 Erreur de connexion au serveur";
  }
});
