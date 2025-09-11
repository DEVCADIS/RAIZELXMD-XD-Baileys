# Mon Pair Site

Un petit site statique de démonstration, inspiré de **de raizel**, prêt à déployer gratuitement sur Render, Vercel ou Netlify.

## 📂 Structure du projet

```
/pair_site
  /assets
    logo.png        # Ton logo (remplace ce fichier)
  index.html        # Page principale
  style.css         # Styles
  script.js         # Logique front-end
```

## 🚀 Déploiement

### 1. Render (gratuit)
1. Crée un compte sur [Render](https://render.com).
2. Crée un nouveau **Static Site**.
3. Connecte ton dépôt GitHub (ou upload ce projet).
4. Paramètres :
   - **Build Command** : *(laisser vide)*
   - **Publish Directory** : `.`
5. Clique sur *Create Static Site* → Render va te donner une URL.

### 2. Vercel
1. Crée un compte sur [Vercel](https://vercel.com).
2. Clique **New Project**, importe ton repo GitHub.
3. Aucun build nécessaire (site statique).
4. Déploie et récupère ton URL.

### 3. Netlify
1. Va sur [Netlify](https://netlify.com).
2. *Add new site* → *Deploy manually*.
3. Upload directement le zip.

## 🎨 Personnalisation

- Remplace `assets/logo.png` par ton logo.
- Change les couleurs dans `style.css` (`:root`).
- Modifie la fonction `generatePair()` dans `script.js` pour ajuster la logique.

## ✨ Fonctionnement

- L’utilisateur écrit un texte dans la zone de saisie.
- Le bouton **Générer** produit une "paire" simple (hash du texte).
- Tu peux modifier la logique pour ton besoin (API, algorithme différent, etc.).

---

© 2025 — Projet démo par *toi*. Tu peux l’adapter librement !
