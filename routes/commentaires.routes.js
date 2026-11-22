// Routes des commentaires, montées sous /api dans serveur.js.
const express = require('express');
const controleur = require('../controllers/commentaires.controller');

const router = express.Router();

router.get('/articles/:id/commentaires', controleur.lister);
router.get('/commentaires', controleur.parVisiteur);
router.get('/commentaires/:id', controleur.trouver);

module.exports = router;
