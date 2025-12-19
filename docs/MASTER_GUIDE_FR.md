# Workshop React : Architecture, Auth & Déploiement 🎓

**Durée :** 3 Heures  
**Niveau :** Licence 3  
**Objectif :** Préparer l'examen en maîtrisant l'architecture React moderne, l'authentification et le déploiement.

---

## Sommaire

1.  [Routage & Navigation Avancée](#1-routage--navigation-avance)
2.  [La Gestion d'État Globale (Context API)](#2-la-gestion-dtat-globale-context-api)
3.  [Communication API & Architecture Service](#3-communication-api--architecture-service)
4.  [Sécurité & JWT](#4-scurit--jwt-json-web-token)
5.  [Hooks Avancés (useEffect, useRef)](#5-react-hooks-avancs)
6.  [Déploiement CI/CD](#6-dploiement-cicd-production)

---

## 1. Routage & Navigation Avancée 🧭

### Concept Clé : Single Page Application (SPA)

Dans un site web classique ("Multi-Page Application"), chaque clic sur un lien demande une nouvelle page au serveur. Le navigateur recharge tout : HTML, CSS, Scripts. C'est lent et l'écran "flash".

Dans une SPA React, **on ne charge le site qu'une seule fois**. Ensuite, c'est React qui intercepte les clics sur les liens et change uniquement le contenu principal de l'écran. C'est instantané et fluide, comme une application mobile native.

### Arborescence des Routes

L'architecture de routes est la colonne vertébrale de votre application. Nous utilisons des **routes imbriquées** (Nested Routes) pour créer des mises en pages (Layouts) partagées.

![Arborescence des Routes](./images/diagram_routing_tree_1766103607453.png)

### Outils Principaux (`react-router-dom`)

1.  **`<Routes>` & `<Route>`** : La table de routage.
2.  **`<Outlet>`** : L'emplacement où s'affiche le composant enfant dans un layout parent.
3.  **`useNavigate()`** : Hook pour changer de page via le code (ex: après succès d'un formulaire).
4.  **`useParams()`** : Récupérer les variables de l'URL.

### Exemple : Routes Imbriquées
```tsx
// App.tsx
<Routes>
  <Route path="/" element={<Login />} />
  
  {/* Layout Admin protège toutes les routes enfants */}
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />     {/* /admin */}
    <Route path="projects" element={<Projects />} /> {/* /admin/projects */}
    <Route path="projects/:id" element={<ProjectDetail />} /> {/* /admin/projects/123 */}
  </Route>
</Routes>
```

### 🧠 Quiz Routage (10 Questions)

1.  **Quel package standard utilise-t-on pour le routage React ?**
    - A) `react-route`
    - B) `react-router-dom`
    - C) `next.js`
2.  **À quoi sert `<Outlet />` ?**
    - A) Afficher un pied de page
    - B) Afficher le contenu de la route enfant active
    - C) Sortir de l'application
3.  **Comment définir un paramètre dynamique (ex: id) ?**
    - A) `/user/{id}`
    - B) `/user/:id`
    - C) `/user/$id`
4.  **Quel Hook permet de récupérer cet ID ?**
    - A) `useId()`
    - B) `useRouteMatch()`
    - C) `useParams()`
5.  **Quelle est la différence entre `<Link>` et `<a>` ?**
    - A) Aucune
    - B) `Link` empêche le rechargement de la page (SPA)
    - C) `Link` est plus rapide à écrire
6.  **Comment rediriger l'utilisateur si la route n'existe pas (404) ?**
    - A) `<Route path="*" element={<NotFound />} />`
    - B) `<Route path="404" ... />`
    - C) On ne peut pas
7.  **Que fait `useNavigate(-1)` ?**
    - A) Va à la page d'accueil
    - B) Retourne à la page précédente (Historique)
    - C) Erreur
8.  **Dans `<Route path="admin" element={<Layout />} >`, le chemin des enfants est... ?**
    - A) Absolu (doit commencer par /)
    - B) Relatif à "admin"
9.  **Peut-on avoir plusieurs `<Routes>` dans l'app ?**
    - A) Oui
    - B) Non, un seul autorisé
10. **Laquelle est une redirection automatique ?**
    - A) `<Redirect />`
    - B) `<Navigate to="..." />`
    - C) `<Go to="..." />`

*(Réponses : 1B, 2B, 3B, 4C, 5B, 6A, 7B, 8B, 9A, 10B)*

---

## 2. La Gestion d'État Globale (Context API) 🧠

### Qu'est-ce que l'État Global ?

Dans React, les données ("state") coulent unidirectionnellement, du parent vers l'enfant via les `props`. C'est simple et prévisible.

Cependant, quand une donnée est nécessaire à la fois dans la barre de navigation (Header), le tableau de bord (Dashboard) et le profil utilisateur (Profile), il faut la faire passer de parent en enfant, même si les composants intermédiaires n'en n'ont pas besoin. C'est ce qu'on appelle le **Prop Drilling** (Forage de props).

### Le Problème : Prop Drilling

![Prop Drilling vs Context](./images/diagram_prop_drilling_context_1766103628738.png)

*Le composant Main et Dashboard n'ont pas besoin de `user`, mais doivent le transporter.*

### La Solution : Context

Le Contexte agit comme une téléportation de données. (Voir schéma ci-dessus, partie droite).

### Implémentation en 3 Étapes

1.  **Créer** : `const AuthContext = createContext(null);`
2.  **Fournir** : Envelopper l'app avec `<AuthContext.Provider value={user}> ... </AuthContext.Provider>`
3.  **Consommer** : `const user = useContext(AuthContext);`

**Bonne pratique :** Créer un Hook personnalisé `useAuth()` pour sécuriser l'accès (vérifier si le contexte existe).

### 🧠 Quiz Context (10 Questions)

1.  **Quel problème résout principalement le Context ?**
    - A) La performance
    - B) Le Prop Drilling (passage d'héritage profond)
    - C) Le routage
2.  **Quelle méthode crée le contexte ?**
    - A) `React.createContext()`
    - B) `new Context()`
    - C) `useContext()`
3.  **Quel composant "diffuse" la donnée ?**
    - A) Le Consumer
    - B) Le Provider
    - C) Le Dispatcher
4.  **Si je change la valeur du Provider, que se passe-t-il ?**
    - A) Rien
    - B) Tous les consommateurs se re-rendent (mettent à jour)
    - C) L'application reload
5.  **Peut-on avoir plusieurs Contextes ?**
    - A) Non, un seul global
    - B) Oui (Auth, Theme, Language...)
6.  **Que retourne `useContext(MyContext)` ?**
    - A) La prop `value` passée au Provider le plus proche
    - B) L'objet Contexte entier
    - C) Undefined
7.  **Pourquoi faire un Hook `useAuth` ?**
    - A) Pour ne pas importer `useContext` et `AuthContext` partout
    - B) Pour ajouter une validation (Throw error si hors provider)
    - C) Les deux
8.  **Context remplace-t-il Redux/Zustand ?**
    - A) Oui, totalement
    - B) Non, Context est pour les états globaux simples, Redux pour les états complexes et fréquents
9.  **La valeur par défaut du Context sert quand... ?**
    - A) Le Provider est présent
    - B) On essaie de consommer le contexte SANS Provider parent
10. **Peut-on passer des fonctions dans le Context ?**
    - A) Oui (ex: login(), logout())
    - B) Non, que des objets JSON

*(Réponses : 1B, 2A, 3B, 4B, 5B, 6A, 7C, 8B, 9B, 10A)*

---

## 3. Communication API & Architecture Service 📡



Une application frontend moderne n'est qu'une coquille vide sans données. Elle doit dialoguer en permanence avec un Backend via une API REST.

La pire erreur des débutants est d'écrire les appels réseaux (`fetch`) directement dans les composants visuels.

**Pourquoi ?**
1.  **Duplication** : Si l'URL de l'API change, vous devez modifier 50 fichiers.
2.  **Maintenance** : La logique métier est mélangée à la logique d'affichage.
3.  **Gestion des Tokens** : Il est très difficile d'ajouter le token d'authentification partout manuellement.

### Architecture Recommandée : Le Service Layer

Nous allons créer une couche intermédiaire, le **Service Layer**, qui isole toute la communication avec le serveur.

```
src/
├── services/           # Logique API pure
│   ├── api.ts          # Client HTTP générique (intercepteurs, token)
│   ├── auth.service.ts # Login, Register
│   └── project.service.ts # GET/POST projects
```

### Le Wrapper API (`api.ts`)
Il doit gérer automatiquement :
1.  **URL de base** (localhost vs production).
2.  **Headers** (`Authorization: Bearer ...`).
3.  **Erreurs** (Redirection login si 401).

```tsx
// services/project.service.ts
import { request } from './api';

export const ProjectService = {
    getAll: () => request('/projects'),
    create: (data) => request('/projects', { method: 'POST', json: data })
};
```

### 🧠 Quiz API (10 Questions)

1.  **Pourquoi séparer l'API dans un dossier `services` ?**
    - A) C'est obligatoire
    - B) Pour réutiliser le code et séparer les responsabilités (Separation of Concerns)
2.  **Quel outil natif JS permet de faire des requêtes ?**
    - A) Axios
    - B) Fetch API
    - C) Ajax
3.  **Que manque-t-il à `fetch` par défaut (vs Axios) ?**
    - A) Les Promesses
    - B) Le jet d'erreur automatique sur 4xx/5xx et le JSON stringify automatique
4.  **Si l'API est sur un autre port, quel problème risque-t-on ?**
    - A) CORS (Cross-Origin Resource Sharing)
    - B) DDOS
    - C) 404
5.  **Comment utilise-t-on une variable d'environnement pour l'URL API (Vite) ?**
    - A) `process.env.API_URL`
    - B) `import.meta.env.VITE_API_URL`
    - C) `const url = "http://..."`
6.  **Que signifie asynchrone (async/await) ?**
    - A) Le code s'exécute en parallèle
    - B) Le code attend la réponse avant de continuer la ligne suivante
7.  **Quel verbe HTTP pour une suppression ?**
    - A) REMOVE
    - B) DELETE
    - C) POST
8.  **Quel verbe pour une mise à jour partielle ?**
    - A) PUT
    - B) PATCH
    - C) CHANGE
9.  **Dans quel Hook React fait-on généralement les appels API de chargement ?**
    - A) `useState`
    - B) `useEffect`
    - C) `useMemo`
10. **Comment typer le retour de l'API avec TypeScript ?**
    - A) `request<MyType>(...)`
    - B) On ne peut pas
    - C) `const data: string = ...`

*(Réponses : 1B, 2B, 3B, 4A, 5B, 6B, 7B, 8B, 9B, 10A)*

---

## 4. Sécurité & JWT (JSON Web Token) 🔐



L'authentification est le pilier de la sécurité. Contrairement aux anciens sites web qui utilisaient des "Sessions" stockées sur la mémoire vive du serveur, les applications modernes sont **Stateless** (Sans état).

Cela signifie que le serveur ne garde AUCUNE trace de vous après vous avoir répondu. Pour chaque nouvelle requête (ex: "Donne-moi mes projets"), vous devez repréver votre identité.

C'est là qu'intervient le **JWT (JSON Web Token)**. C'est un badge numérique infalsifiable que le serveur vous donne lors du Login, et que vous devez présenter à chaque appel.

### Flux d'Authentification

1.  L'utilisateur envoie ses identifiants.
2.  Le serveur vérifie et génère un Token signé cryptographiquement.
3.  Le client (React) stocke ce token (ex: LocalStorage).
4.  Pour chaque requête future, React attache le token dans le Header HTTP.

![Flux d'Authentification](./images/diagram_auth_flow_1766103647344.png)

### Anatomie du JWT

Exemple réel : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

1.  **Header (Rouge)** : `{"alg": "HS256", "typ": "JWT"}`
2.  **Payload (Violet)** : `{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}` (Lisible par tous !)
3.  **Signature (Bleu)** : `HMACSHA256(...)` (Garanti l'intégrité).

**Attention :** Ne jamais mettre de mot de passe dans le Payload !

### 🧠 Quiz Sécurité (10 Questions)

1.  **Que signifie JWT ?**
    - A) Java Web Token
    - B) JSON Web Token
    - C) Javascript Web Token
2.  **Où le client stocke-t-il le token le plus souvent ?**
    - A) Dans le code
    - B) LocalStorage ou Cookie
    - C) Dans la base de données
3.  **Le serveur stocke-t-il la session ?**
    - A) Oui
    - B) Non (Stateless)
4.  **Si je modifie le payload du token manuellement... ?**
    - A) Je deviens admin
    - B) La signature ne correspond plus, le serveur rejette le token
5.  **Quel header HTTP envoie le token ?**
    - A) Authorization
    - B) Authentication
    - C) Token
6.  **Le préfixe standard du token est... ?**
    - A) Token
    - B) Bearer
    - C) Basic
7.  **Si le token expire (401), que doit faire le Front ?**
    - A) Déconnecter l'utilisateur
    - B) Rien
    - C) Rafraîchir la page
8.  **Peut-on lire le contenu du token coté client ?**
    - A) Oui (base64 decode)
    - B) Non, c'est crypté
9.  **A quoi sert le Refresh Token ?**
    - A) A obtenir un nouveau token d'accès sans se reloguer
    - B) A rafraichir la page
10. **HTTPS est-il obligatoire pour transmettre le token ?**
    - A) Non
    - B) Oui, sinon n'importe qui peut l'intercepter (Man In The Middle)

*(Réponses : 1B, 2B, 3B, 4B, 5A, 6B, 7A, 8A, 9A, 10B)*

---

## 5. React Hooks Avancés 🎣



Avant les Hooks (2019), React utilisait des classes complexes pour gérer le cycle de vie (`componentDidMount`, etc.). Les Hooks ont simplifié cela en permettant d'utiliser l'état et le cycle de vie dans de simples fonctions.

### `useEffect` : Synchronisation et Effets de bord

Ne pensez pas à `useEffect` comme "quand le composant charge".
Pensez-y comme : **"Synchronise ce composant avec un système extérieur"**.

Exemples de systèmes extérieurs :
- Une API (fetch datas)
- Le titre du document (document.title)
- Un timer (setInterval)
- Un abonnement WebSocket

Il remplace à lui seul `componentDidMount`, `componentDidUpdate`, et `componentWillUnmount`.

### `useEffect` : Le cycle de vie

Il remplace `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`.

1.  **Montage** : `useEffect(() => { ... }, [])`
2.  **Mise à jour** : `useEffect(() => { ... }, [prop])`
3.  **Démontage** : `useEffect(() => { return () => ... }, [])`

### `useRef` : La persistance silencieuse

### `useRef` : La persistance silencieuse

`useRef` est une "boîte" qui permet de stocker une valeur qui persiste pendant toute la durée de vie du composant, mais **dont la modification ne déclenche pas de re-render**.

Dans notre projet (`src/pages/admin/AdminProjectDetails.tsx`), nous utilisons `useRef` pour deux cas précis :

![Comparaison useState vs useRef](./images/diagram_usestate_vs_useref_1766105462366.png)

#### Cas 1 : Compteur de rendus (Persistance sans Re-render)

Nous voulons savoir combien de fois le composant s'est affiché (pour le débogage), sans que l'incrémentation de ce compteur ne crée elle-même une boucle infini de re-renders.

```tsx
// src/pages/admin/AdminProjectDetails.tsx

const renderCount = useRef(0); // Initialisation

useEffect(() => {
    renderCount.current = renderCount.current + 1;
    // On change la valeur, mais REACT NE RE-DESSINE PAS LE COMPOSANT
    console.log(`Composant rendu ${renderCount.current} fois`);
});
```

**Pourquoi pas `useState` ?**
Si on faisait `setCount(count + 1)` dans un `useEffect`, cela déclencherait un rendu... qui déclencherait `useEffect`... qui déclencherait un rendu... **Boucle Infinie !** 💥

#### Cas 2 : Accès direct au DOM (Focus Input)

Parfois, nous avons besoin de prendre le contrôle manuel d'un élément HTML, par exemple pour mettre le curseur dans un champ de texte dès que la page charge.

```tsx
// src/pages/admin/AdminProjectDetails.tsx

const titleInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
    // Si le projet est chargé, on met le focus dans l'input
    if (project && titleInputRef.current) {
        titleInputRef.current.focus(); 
    }
}, [project]);

return (
    <input
        ref={titleInputRef} // On lie l'élément HTML à notre variable React
        defaultValue={project.title}
    />
);
```

#### Résumé
| Hook | Déclenche un Re-render ? | Usage Principal |
| :--- | :--- | :--- |
| **`useState`** | ✅ OUI | Données affichées à l'écran (Texte, Listes...) |
| **`useRef`** | ❌ NON | Valeurs techniques (Timers, Logs) ou accès DOM |

### 🧠 Quiz Hooks (10 Questions)

1.  **Qu'est-ce qu'un Hook ?**
    - A) Une fonction qui commence par `use`
    - B) Une classe
    - C) Un composant
2.  **Laquelle est une règle des Hooks ?**
    - A) Ne pas utiliser dans des boucles ou conditions
    - B) Utiliser uniquement dans les Class Components
3.  **`useEffect(() => x, [])` s'exécute... ?**
    - A) À chaque rendu
    - B) Une seule fois (Montage)
    - C) Jamais
4.  **`useEffect(() => x)` (sans tableau) s'exécute... ?**
    - A) Une seule fois
    - B) À chaque rendu
5.  **`useRef` déclenche-t-il un re-render ?**
    - A) Oui
    - B) Non
6.  **Comment accèder à la valeur actuelle d'une ref ?**
    - A) `ref.value`
    - B) `ref.current`
    - C) `ref.now`
7.  **Pour nettoyer un abonnement (Event Listener) dans useEffect, on utilise... ?**
    - A) `return function`
    - B) `delete function`
    - C) `clear()`
8.  **Peut-on créer ses propres Hooks ?**
    - A) Oui (Custom Hooks)
    - B) Non
9.  **Dans quel ordre s'exécutent les Hooks ?**
    - A) Aléatoire
    - B) Toujours le même ordre à chaque rendu (c'est pourquoi pas de if/for)
10. **`const [state, setState] = useState(0)` : `setState` est-il synchrone ?**
    - A) Oui
    - B) Non, React planifie la mise à jour

*(Réponses : 1A, 2A, 3B, 4B, 5B, 6B, 7A, 8A, 9B, 10B)*

---

## 6. Déploiement CI/CD (Production) 🚀



"Ça marche sur ma machine" n'est pas une excuse valable. Le but ultime du développement est la mise en production.

Traditionnellement, déployer était long et risqué (copier des fichiers via FTP). Aujourd'hui, nous utilisons le **CI/CD (Continuous Integration / Continuous Deployment)**.

L'idée est d'automatiser le processus :
1.  Vous sauvegardez votre code sur GitHub.
2.  GitHub prévient Vercel.
3.  Vercel télécharge votre code, installe les dépendances, construit le site optimisé, et le met en ligne.
4.  Tout cela en moins de 2 minutes, sans action humaine.

### Notre Pipeline (Stack Technique)



![Pipeline DEploiement CI/CD](./images/diagram_cicd_pipeline_1766103664258.png)

### Configuration Requise
1.  **.env.local** (Dev) : `VITE_API_URL=http://localhost...`
2.  **Vercel Env Vars** (Prod) : `VITE_API_URL=https://mon-backend-render.com`

**CI/CD (Continuous Integration / Continuous Deployment)** :
À chaque fois que vous "poussez" (Push) sur la branche `main`, Vercel détecte le changement, reconstruit le projet (npm run build) et le met en ligne.

### 🧠 Quiz Déploiement (10 Questions)

1.  **Que signifie CI/CD ?**
    - A) Code In / Code Down
    - B) Continuous Integration / Continuous Deployment
2.  **Pourquoi ne pas commiter le dossier `node_modules` ?**
    - A) C'est trop lourd et générable via `package.json`
    - B) C'est illégal
3.  **Quel fichier contrôle les fichiers ignorés par Git ?**
    - A) `.gitremove`
    - B) `.gitignore`
    - C) `ignore.txt`
4.  **Si mon site marche en local mais pas en ligne, c'est souvent... ?**
    - A) Une variable d'environnement manquante
    - B) Vercel est en panne
5.  **Quelle commande Vercel exécute-t-il pour construire le site ?**
    - A) `npm run start`
    - B) `npm run build`
    - C) `npm run dev`
6.  **Où se trouve le résultat du build ?**
    - A) Dossier `src`
    - B) Dossier `dist` (ou build)
    - C) Dossier `public`
7.  **Qu'est-ce qu'une variable d'environnement ?**
    - A) Une variable globale JS
    - B) Une configuration secrète ou spécifique à l'environnement (Dev/Prod)
8.  **Comment mettre à jour le site en ligne ?**
    - A) Envoyer un mail à Vercel
    - B) `git push origin main`
    - C) Upload FTP
9.  **Notre backend sur Render est-il statique ou dynamique ?**
    - A) Statique (HTML)
    - B) Dynamique (API Node.js)
10. **Si j'ai une erreur CORS en ligne... ?**
    - A) C'est que le Backend n'autorise pas le domaine du Frontend (Vercel)
    - B) C'est que j'ai mal codé le Frontend

*(Réponses : 1B, 2A, 3B, 4A, 5B, 6B, 7B, 8B, 9B, 10A)*
