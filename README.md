# R307 · Les commentaires des Ateliers du Bois

Exercice de la séance 1 du module R307. Le projet utilise Node.js, Express et PostgreSQL. L’API liste les articles des Ateliers du Bois. Le service des commentaires utilise le module `pg` pour lire et écrire dans PostgreSQL.

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

Le côté PostgreSQL est terminé. Le vérificateur affiche **14/31** à ce stade. Le score attendu après intégration des routes et du contrôleur des commentaires est **31/31**.

## Fichiers de référence

- [`CONTRAT.md`](CONTRAT.md) décrit les six routes et les signatures du service.
- [`sql/requetes.sql`](sql/requetes.sql) contient les six requêtes du TP et leurs résultats sur les données de départ.
- [`services/commentaires.service.js`](services/commentaires.service.js) contient l’accès aux commentaires via le pool PostgreSQL partagé.

**Jarod BOUJU** · Groupe B1
