# Pairing App (Backend + Frontend)

Ce projet contient deux parties séparées :
- `backend/` — Node.js + Baileys (Web Service) qui génère le vrai pairing code WhatsApp.
- `frontend/` — Site statique (HTML/CSS/JS) qui affiche le code en grand.

## Pré-requis (local)
- Node.js v18+ recommandé.
- Installer dépendances et lancer le backend :
```bash
cd backend
npm install
npm start
```
Le serveur écoute sur `http://localhost:3000` par défaut.

## Utilisation (local)
1. Lance le backend (`npm start`). Assure-toi que le dossier `session/` est accessible (Baileys y stocke les credentials).
2. Ouvre `frontend/index.html` dans ton navigateur (ou héberge le dossier `frontend` localement).
3. Dans `frontend/script.js` remplace `BACKEND_URL` par l'URL de ton backend (ex: `http://localhost:3000`).
4. Entre un numéro (ex: `+237699777530`) et clique **Générer**. Le code pairing réel sera retourné et affiché en grand.

## Déploiement sur Render
1. Crée **2 services** sur Render:
   - **Web Service** (Node) → déploie le dossier `backend/`. Select Node environment, `npm start` comme command.
   - **Static Site** → déploie le dossier `frontend/`.
2. Dans `frontend/script.js` remplace `BACKEND_URL` par l'URL publique de ton Web Service Render.
3. Déploie et teste.

## Sécurité & production
- **IMPORTANT**: Dans ce modèle, on crée un socket Baileys à la demande. En production, il est préférable de **réutiliser** un socket persistant et stocker les credentials (useMultiFileAuthState) afin d'éviter création excessive de connexions.
- Protéger l'endpoint `/pair` (auth, rate-limit) pour éviter abus.
- Vérifier les logs Render pour problèmes liés à Baileys (versions, permissions).

---
© 2025 — Pairing App (généré automatiquement)
