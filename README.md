# R307 · Les commentaires des Ateliers du Bois

Exercice de la séance 1 du module R307. L’API des Ateliers du Bois permet de consulter les articles et leurs commentaires, et de publier un commentaire. La modification et la suppression des commentaires demandent le jeton d’administration. Le projet utilise Node.js, Express et PostgreSQL via le module `pg`.

## Démarrage local

Prérequis : Node.js 24 avec npm et un serveur PostgreSQL en cours d’exécution.

1. Créez une base de développement nommée `ateliers`. Dans cette base, exécutez [`db/ateliers.sql`](db/ateliers.sql), puis [`sql/commentaires.sql`](sql/commentaires.sql). Ces scripts recréent les tables concernées et chargent six articles et huit commentaires.
2. Copiez [`.env.exemple`](.env.exemple) vers `.env`. Adaptez les variables `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD` et `PGDATABASE` à votre installation. Gardez `.env` sur votre machine.
3. Depuis la racine du dépôt, installez les dépendances et démarrez le serveur.

   ```bash
   npm install
   npm start
   ```

## Vérification

Le serveur écoute sur le port 3000 par défaut. Dans un second terminal, vérifiez que l’API renvoie les six articles, puis lancez le vérificateur du TP.

```bash
curl -fsS http://localhost:3000/api/articles
npm run verifier
```

Avec les données de départ, le vérificateur doit afficher **31/31**. Exécutez-le sur une base de développement, car il crée et supprime des données de test.

## Fichiers de référence

- [`CONTRAT.md`](CONTRAT.md) décrit les six routes et les signatures du service.
- [`sql/requetes.sql`](sql/requetes.sql) contient les six requêtes du TP et leurs résultats sur les données de départ.
- [`services/commentaires.service.js`](services/commentaires.service.js) contient l’accès aux commentaires via le pool PostgreSQL partagé.
