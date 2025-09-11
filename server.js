import express from "express"
import { makeWASocket, useMultiFileAuthState } from "@whiskeysockets/baileys"
import fs from "fs"
import path from "path"

const app = express()
app.use(express.json())

// Sert le frontend
app.use(express.static("frontend"))

let sock = null

// === Route pour générer le Pairing Code ===
app.post("/pair", async (req, res) => {
  const { number } = req.body
  if (!number) return res.status(400).json({ error: "Numéro manquant" })

  try {
    const { state, saveCreds } = await useMultiFileAuthState("./sessions")

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
    })

    // Génére le code
    const pairingCode = await sock.requestPairingCode(number)

    // Sauvegarde creds si mis à jour
    sock.ev.on("creds.update", saveCreds)

    // Quand la connexion s’ouvre
    sock.ev.on("connection.update", (update) => {
      const { connection } = update
      if (connection === "open") {
        console.log("✅ WhatsApp lié avec succès !")

        // Génère un token unique
        const token = "RAIZEL-" + Math.random().toString(36).substring(2, 12)

        // Sauvegarde le token
        fs.writeFileSync("./sessions/token.txt", token)

        // Envoie le token dans ton propre WhatsApp
        sock.sendMessage(sock.user.id, { text: `✅ Ton token de session : ${token}` })
      }
    })

    return res.json({ pairingCode })
  } catch (err) {
    console.error("Erreur génération code:", err)
    return res.status(500).json({ error: "Impossible de générer le code" })
  }
})

// === Lancer serveur ===
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("🚀 Serveur en ligne sur port " + PORT))
