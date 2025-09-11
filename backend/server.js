// server.js
import express from "express";
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// ✅ Sert automatiquement tout le frontend
app.use(express.static("frontend"));

// Page test backend
app.get("/", (req, res) => {
  res.send("✅ Backend Baileys en ligne. Utilise POST /pair pour générer un code.");
});

// ✅ Endpoint pour générer le Pair Code
app.post("/pair", async (req, res) => {
  const { number } = req.body;
  if (!number) return res.status(400).json({ error: "Numéro requis !" });

  try {
    const { state, saveCreds } = await useMultiFileAuthState("sessions");
    const sock = makeWASocket({ auth: state });

    const pairingCode = await sock.requestPairingCode(number);

    try { sock.end(); } catch {}

    return res.json({ pairingCode });
  } catch (err) {
    console.error("Erreur génération code:", err);
    res.status(500).json({ error: "Impossible de générer le code" });
  }
});

// Lancer serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
