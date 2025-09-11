import express from "express";
import { makeWASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/pair", async (req, res) => {
  const { number } = req.body;
  if (!number) return res.status(400).json({ error: "Numéro requis" });

  try {
    const { state, saveCreds } = await useMultiFileAuthState("session");
    const sock = makeWASocket({ auth: state });

    const code = await sock.requestPairingCode(number);
    res.json({ pairingCode: code });
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ error: "Impossible de générer un code" });
  }
});

app.listen(3000, () => console.log("✅ API Baileys démarrée sur le port 3000"));
