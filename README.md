# Sudo Studio

## Structure du projet

### Frontend
- **Dossier** : `frontend`
- **Fichiers principaux** :
  - `package.json` : Dépendances et scripts pour React.
  - `vite.config.js` : Configuration de Vite.
  - `public/index.html` : Point d'entrée HTML.
  - `src/main.jsx` : Point d'entrée React.
  - `src/App.jsx` : Composant principal.
  - `src/editor/EditorWrapper.jsx` : Wrapper pour l'éditeur Monaco.
  - `src/terminal/TerminalWrapper.jsx` : Wrapper pour le terminal Xterm.

### Backend
- **Dossier** : `backend`
- **Fichiers principaux** :
  - `package.json` : Dépendances et scripts pour Express.
  - `server.js` : Serveur principal.
  - `services/moneyfusion.js` : Service pour les paiements.
  - `services/filesystem.js` : Service pour la gestion des fichiers.
  - `ai/papito-core.js` : Module d'analyse AI.
  - `config/firebase.js` : Initialisation de Firebase Admin SDK.

### Electron
- **Dossier** : `electron`
- **Fichiers principaux** :
  - `package.json` : Dépendances et scripts pour Electron.
  - `main.js` : Processus principal Electron.
  - `preload.js` : API exposée au renderer.

## Instructions pour exécuter

### Prérequis
- Node.js installé.
- Installer les dépendances globales :
  ```bash
  npm install -g concurrently
  ```

### Étapes
1. **Installer les dépendances** :
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   cd ../electron && npm install
   ```

2. **Démarrer le projet** :
   Utilisez `concurrently` pour exécuter les trois parties :
   ```bash
   concurrently "npm run dev --prefix frontend" "npm run dev --prefix backend" "npm start --prefix electron"
   ```

3. **Accéder à l'application** :
   - Frontend : [http://localhost:5173](http://localhost:5173)
   - Backend : [http://localhost:3000](http://localhost:3000)
   - Electron : Application de bureau ouverte automatiquement.

## Limitations
- Assurez-vous que le fichier Firebase Admin SDK JSON est correctement configuré dans `backend/config/firebase.js`.
- Les services MoneyFusion et AI nécessitent une configuration supplémentaire pour les API externes.
