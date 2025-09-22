# Argent-Bank

Application de banque en ligne, avec interface utilisateur (Frontend) et serveur API (Backend).  

---

## 🌐 Aperçu

Ce projet vise à fournir une interface de type banque en ligne, sur laquelle les utilisateurs peuvent se connecter, visualiser leurs comptes, faire des transactions, etc. Le frontend (site web) interagit avec un backend RESTful.

---

## 📂 Structure du projet

Argent-Bank/
├── Frontend/ # Interface utilisateur
│ ├── src/ # Code source (JS, SCSS, HTML)
│ ├── public/ # Fichiers publics (index.html, ressources statiques)
│ ├── package.json # Dépendances frontend
│ └── …
├── Backend/ # API serveur
│ ├── controllers/ # Logique métier des routes
│ ├── routes/ # Définition des endpoints
│ ├── models/ # Schémas des données / interfaces
│ ├── middleware/ # Middlewares (auth, errors, etc.)
│ ├── swagger.yaml # Documentation de l’API (OpenAPI)
│ ├── package.json # Dépendances du backend
│ └── …
├── README.md # Ce fichier
├── .gitignore
└── …


---

## 🛠️ Technologies utilisées

- **Frontend** :  
  - JavaScript (ES6+)  
  - SCSS pour les styles  
  - HTML5  
- **Backend** :  
  - Node.js  
  - Express.js  
  - Documentation API via **Swagger** (fichier `swagger.yaml`)  
- **Autres** :  
  - Git / GitHub pour versioning  
  - Possiblement configuration d’environnement (variables pour port, clé secrète, etc.)

---

## 🚀 Installation & exécution

Voici comment lancer le projet en local : frontend + backend.

### 1. Cloner le dépôt

```bash
git clone https://github.com/SandrinePham/Argent-Bank.git
cd Argent-Bank

### 2. Backend
cd Backend
npm install
# configurer les variables d’environnement si nécessaire, ex : PORT, SECRET, DB_URL
npm start

### 3. Frontend
cd Frontend
npm install
npm run dev

