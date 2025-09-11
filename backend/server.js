import express from "express";
import cors from "cors";
import { makeWASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";

const app = express();
app.use(express.json());
app.use(cors());

// Simple health check
app.get("/", (req, res) => {
  res.send("✅ Backend Baileys OK. Use POST /pair with JSON { number: "+237699..." }");
});

/**
 * POST /pair
 * Body: { number: "+237699777530" }
 *
 * This endpoint will create a transient Baileys socket and request a pairing code
 * for the provided number. In production you should persist auth state and reuse
 * the socket instead of creating a new one for every request.
 */
app.post("/pair", async (req, res) => {
  const { number } = req.body;
  if (!number) return res.status(400).json({ error: "Numéro requis" });

  try {
    // useMultiFileAuthState stores auth in ./session by default
    const { state, saveCreds } = await useMultiFileAuthState("session");
    const sock = makeWASocket({ auth: state });

    // requestPairingCode returns the pairing code for the number
    const pairingCode = await sock.requestPairingCode(number);

    // close the socket properly after obtaining the code
    try { sock.end(); } catch (e) { console.error("close socket:", e); }

    return res.json({ pairingCode });
  } catch (err) {
    console.error("Erreur /pair:", err);
    return res.status(500).json({ error: "Impossible de générer le code pairing", details: err.message || err.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Baileys backend listening on port ${PORT}`));
