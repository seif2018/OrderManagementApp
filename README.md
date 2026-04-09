## 📦 Order Management App – Gestion de commandes clients

![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?logo=.net)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)
![Axios](https://img.shields.io/badge/Axios-1.6-5A29E4)


> Application fullstack de démonstration pour la gestion de commandes clients. API REST .NET 8, frontend React (Vite), stockage mémoire, validation métier et interface responsive.

---

## ✨ Aperçu des fonctionnalités

| Module | Fonctionnalités |
|--------|----------------|
| 📋 **Commandes** | CRUD complet (création, lecture, mise à jour du statut, suppression) |
| ✅ **Validation** | Nom client non vide, montant > 0, statut autorisé (Pending, Completed, Cancelled) |
| 🧠 **Hooks React** | `useState`, `useEffect`, `useCallback`, `useMemo` (compteur de commandes en attente) |
| 🔔 **Feedback** | Gestion d’erreurs avec alertes Bootstrap |
| 📡 **API documentée** | Swagger / OpenAPI intégré |
| 💾 **Stockage** | In-memory thread-safe (ConcurrentDictionary) |

---

## 🧱 Architecture


┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                    │
│          Components (OrderForm, OrderTable)             │
│                     Axios + Proxy Vite                  │
└─────────────────────────────────────────────────────────┘
                            │ HTTP (REST)
┌─────────────────────────────────────────────────────────┐
│                   Backend (ASP.NET Core)                │
│         OrdersController (GET, POST, PUT, DELETE)       │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                   Repository Pattern                     │
│       IOrderRepository / InMemoryOrderRepository        │
└─────────────────────────────────────────────────────────┘

---

## 🛠️ Technologies

### Backend
Backend
.NET	8.0
ASP.NET Core Web API	8.0
Swagger	6.5.0

### Frontend
React	18.2
Vite	5.0
Axios	1.6
Bootstrap	5.3

### Stockage
Mémoire vive (ConcurrentDictionary) – aucun SGBD requis.

---

## 🚀 Installation & Exécution

### Prérequis
- [.NET 8 SDK](https://dotnet.microsoft.com/)
- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/) (optionnel)

1️⃣ Cloner le dépôt

git clone https://github.com/votre-compte/OrderManagementApp.git
cd OrderManagementApp

2️⃣ Lancer l’API
bash
cd src/API
dotnet run
L’API est disponible sur https://localhost:5000 – Swagger

 Lancer le frontend
Ouvrez un nouveau terminal :

bash
cd frontend
npm install
npm run dev

L’application Angular tourne sur http://localhost:5173

---

## 📖 Utilisation

Créez une commande via le formulaire.

Changez le statut avec les boutons Terminée / Annuler.

Supprimez une commande (confirmation demandée).

Le tableau se met à jour automatiquement.

Étape	Action
1️⃣	Créer une commande : saisir un nom client, un montant (>0) et choisir un statut initial (Pending par défaut).
2️⃣	Modifier le statut : cliquer sur "Terminée" (Completed) ou "Annuler" (Cancelled).
3️⃣	Supprimer : cliquer sur "Supprimer" et confirmer.
4️⃣	Visualiser : tableau des commandes avec badge coloré et compteur des commandes en attente.


---

## 📂 Structure du projet (abrégée)


OrderManagementApp/
├── backend/
│   ├── Controllers/OrdersController.cs
│   ├── Models/Order.cs
│   ├── Repositories/IOrderRepository.cs
│   ├── Data/InMemoryOrderRepository.cs
│   ├── Program.cs
│   └── appsettings.json
└── frontend/
    ├── src/
    │   ├── api/ordersApi.js
    │   ├── components/
    │   │   ├── OrderForm.jsx
    │   │   └── OrderTable.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json

---

## 🔌 Endpoints API principaux

Méthode	URL	Description	Corps (exemple)
GET	/api/orders	Récupérer toutes les commandes	–
POST	/api/orders	Créer une commande	{ "clientName": "Dupont", "amount": 150.00, "status": "Pending" }
PUT	/api/orders/{id}	Modifier le statut	{ "status": "Completed" }
DELETE	/api/orders/{id}	Supprimer une commande	–
Les statuts valides : Pending, Completed, Cancelled.


---

## 🧪 Tests & Qualité


Swagger : testez tous les endpoints depuis l’interface.

Logs : console de l’API (information sur les requêtes).

Validations : backend (BadRequest) + frontend (messages d’erreur utilisateur).

Gestion d’erreurs : try/catch avec affichage d’alertes Bootstrap.

---

## 📌 Règles métier clés

✅ Le nom du client ne peut pas être vide.

✅ Le montant doit être strictement supérieur à 0.

✅ Le statut doit être l’une des trois valeurs autorisées.

✅ Une commande ne peut pas passer deux fois au même statut (l’interface adapte les boutons).

---

## 🔮 Améliorations possibles


Persistance avec SQL Server / PostgreSQL

Authentification JWT

Pagination et filtres (par statut, par client)

Tests unitaires (xUnit + React Testing Library)

Dockerisation (docker-compose)

---

## 📄 Licence

MIT © 2026 – Projet de démonstration
Développé dans le cadre d’un exercice technique – Fullstack .NET + React.

---

##👥 Auteurs

**Seifeddine Trabelsi**  
Email : seifeddin.trabelsi@gmail.com


