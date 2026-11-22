// Le contrôleur traduit les requêtes HTTP en appels au service des commentaires.
const service = require('../services/commentaires.service');
const ErreurHttp = require('../utils/erreur-http');

const texteRenseigne = (valeur) => typeof valeur === 'string' && valeur.trim().length > 0;

// GET /api/articles/:id/commentaires
function lister(req, res, next) {
  const articleId = Number(req.params.id);
  return service.lister(articleId)
    .then((commentaires) => res.json(commentaires))
    .catch(next);
}

// GET /api/commentaires?nom=Claire
function parVisiteur(req, res, next) {
  const { nom } = req.query;
  if (!texteRenseigne(nom)) {
    return next(new ErreurHttp(400, 'NOM_MANQUANT', 'Indiquez le nom du visiteur.'));
  }
  return service.parVisiteur(nom)
    .then((commentaires) => res.json(commentaires))
    .catch(next);
}

// GET /api/commentaires/:id
function trouver(req, res, next) {
  const id = Number(req.params.id);
  return service.trouver(id)
    .then((commentaire) => res.json(commentaire))
    .catch(next);
}

module.exports = { lister, parVisiteur, trouver };
