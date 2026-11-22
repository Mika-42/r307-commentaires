// TYPE 4 · MIDDLEWARE DE NIVEAU ROUTEUR : router.use(verifierJeton)
// Le routeur des articles l'utilise partout. Celui des commentaires l'applique
// aux deux routes d'administration. Une ecriture protegee demande l'en-tete :
//    Authorization: Bearer <jeton>
// Le jeton vient du fichier .env, jamais du code.

const ErreurHttp = require('../utils/erreur-http');

const LECTURE = ['GET', 'HEAD'];

function verifierJeton(req, res, next) {
  if (LECTURE.includes(req.method)) return next();

  const [type, jeton] = (req.get('Authorization') || '').split(' ');
  if (type !== 'Bearer' || !jeton || jeton !== process.env.JETON_ADMIN) {
    return next(new ErreurHttp(401, 'NON_AUTHENTIFIE', 'Écrire demande : Authorization: Bearer <jeton>.'));
  }
  next();
}

module.exports = verifierJeton;
