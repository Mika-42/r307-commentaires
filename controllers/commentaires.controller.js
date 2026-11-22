// Le contrôleur traduit les requêtes HTTP en appels au service des commentaires.
// next transmet les erreurs au gestionnaire commun qui produit la réponse JSON.
const service = require('../services/commentaires.service');
const ErreurHttp = require('../utils/erreur-http');

// trim sert à repérer les valeurs blanches. Le service reçoit la chaîne d'origine.
const texteRenseigne = (valeur) => typeof valeur === 'string' && valeur.trim().length > 0;

// GET /api/articles/:id/commentaires
function lister(req, res, next) {
  // Express fournit l'identifiant sous forme de chaîne. Le service valide ensuite l'entier.
  const articleId = Number(req.params.id);
  return service.lister(articleId)
    .then((commentaires) => res.json(commentaires))
    .catch(next);
}

// GET /api/commentaires?nom=Claire
function parVisiteur(req, res, next) {
  // Un paramètre répété arrive sous forme de tableau. La recherche attend un seul nom.
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

// POST /api/articles/:id/commentaires
function creer(req, res, next) {
  const articleId = Number(req.params.id);
  const { nom, texte } = req.body || {};
  if (!texteRenseigne(nom) || !texteRenseigne(texte)) {
    return next(new ErreurHttp(400, 'CHAMP_MANQUANT', 'Les champs nom et texte sont obligatoires.'));
  }
  return service.creer(articleId, { nom, texte })
    .then((commentaire) => res.status(201).json(commentaire))
    .catch(next);
}

// PATCH /api/commentaires/:id
function modifier(req, res, next) {
  const id = Number(req.params.id);
  // Le contrat limite cette modification au texte du commentaire.
  const { texte } = req.body || {};
  if (!texteRenseigne(texte)) {
    return next(new ErreurHttp(400, 'TEXTE_MANQUANT', 'Le champ texte est obligatoire.'));
  }
  return service.modifier(id, { texte })
    .then((commentaire) => res.json(commentaire))
    .catch(next);
}

// DELETE /api/commentaires/:id
function supprimer(req, res, next) {
  const id = Number(req.params.id);
  return service.supprimer(id)
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = { lister, parVisiteur, trouver, creer, modifier, supprimer };
