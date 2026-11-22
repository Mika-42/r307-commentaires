// Routes des commentaires, montées sous /api dans serveur.js.
const express = require('express');
const controleur = require('../controllers/commentaires.controller');
const verifierJeton = require('../middlewares/jeton');

const router = express.Router();

router.get('/articles/:id/commentaires', controleur.lister);
router.get('/commentaires', controleur.parVisiteur);
router.get('/commentaires/:id', controleur.trouver);

// La création est ouverte aux visiteurs. La modification et la suppression sont réservées à l’administration.
router.post('/articles/:id/commentaires', controleur.creer);
router.patch('/commentaires/:id', verifierJeton, controleur.modifier);
router.delete('/commentaires/:id', verifierJeton, controleur.supprimer);

module.exports = router;
