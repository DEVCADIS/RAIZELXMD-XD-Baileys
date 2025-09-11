import express from "express";
import bodyParser from "body-parser";
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";

const app = express();
app.use(bodyParser.json());

// ✅ Vérification rapide que le backend fonctionne
app.get("/", (req, res) => {
  res.send("✅ Backend Baileys OK. Utilise POST /pair avec ton numéro.");
});

// ✅ Route pour générer un Pair Code
app.post("/pair", async (req, res) => {
  const { number } = req.body;
  if (!number) return res.status(400).json({ error: "Numéro requis !" });

  try {
    const { state, saveCreds } = await useMultiFileAuthState("sessions");
    const sock = makeWASocket({ auth: state });

    // 🔑 Générer le code de pairage WhatsApp
    const pairingCode = await sock.requestPairingCode(number);

    // Fermer proprement la connexion
    try { sock.end(); } catch (e) { console.error("Erreur fermeture socket", e); }

    return res.json({ pairingCode });
  } catch (err) {
    console.error("Erreur génération code:", err);
    return res.status(500).json({ error: "Impossible de générer le code" });
  }
});

// ✅ Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
