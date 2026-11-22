// Le point d'entree. Il assemble, il ne traite rien.
// L'ordre des app.use est l'ordre que suit chaque requete, de haut en bas.
//
// Dans la base ateliers, executer db/ateliers.sql, puis sql/commentaires.sql.
// Configurer .env pour la connexion et le jeton d'administration, puis lancer npm start.

const express = require('express');
const cors = require('cors');
const journal = require('./middlewares/journal');
const { routeInconnue, gestionnaireErreurs } = require('./middlewares/erreurs');
const routesArticles = require('./routes/articles.routes');
const routesCommentaires = require('./routes/commentaires.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(journal);                                    // TYPE 1 · niveau application
app.use(cors({ origin: 'http://localhost:5173' }));  // TYPE 3 · tiers (npm install cors)
app.use(express.json());                             // TYPE 2 · integre a Express

// Les commentaires AVANT les articles : le routeur des articles fait router.use(verifierJeton)
// et bloquerait sinon POST /api/articles/:id/commentaires, qui est public.
app.use('/api', routesCommentaires);                 // les commentaires
app.use('/api/articles', routesArticles);            // le routeur (TYPE 4 a l'interieur)

app.use(routeInconnue);                              // TYPE 5 · gestion des erreurs,
app.use(gestionnaireErreurs);                        //          toujours en dernier

app.listen(PORT, () => {
  console.log(`Articles des Ateliers du Bois sur http://localhost:${PORT}/api/articles`);
});
