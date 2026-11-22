// Routes des commentaires, montées sous /api dans serveur.js.
const express = require('express');
const controleur = require('../controllers/commentaires.controller');
const verifierJeton = require('../middlewares/jeton');

const router = express.Router();

router.get('/articles/:id/commentaires', controleur.lister);
router.get('/commentaires', controleur.parVisiteur);
router.get('/commentaires/:id', controleur.trouver);

// Dans serveur.js, ce routeur précède celui des articles pour garder le POST public.
router.post('/articles/:id/commentaires', controleur.creer);

// Le jeton est vérifié avant d'appeler le contrôleur sur les deux routes d'administration.
router.patch('/commentaires/:id', verifierJeton, controleur.modifier);
router.delete('/commentaires/:id', verifierJeton, controleur.supprimer);

module.exports = router;
