// Service des commentaires : mêmes fonctions que la version JSON, avec le pool partagé.
// Les valeurs fournies par les visiteurs sont transmises à pg dans le tableau des paramètres.
const pool = require('../db/pool');
const ErreurHttp = require('../utils/erreur-http');
const articles = require('./articles.service');

const articleIntrouvable = (id) =>
  new ErreurHttp(404, 'ARTICLE_INTROUVABLE', `L'article ${id} n'existe pas.`);
const commentaireIntrouvable = (id) =>
  new ErreurHttp(404, 'COMMENTAIRE_INTROUVABLE', `Le commentaire ${id} n'existe pas.`);

// Les identifiants sont des entiers positifs dans la plage du type INT de PostgreSQL.
const idValide = (id) => Number.isInteger(id) && id >= 1 && id <= 2_147_483_647;

// pg renvoie un objet Date pour TIMESTAMPTZ. Le contrat attend une chaîne UTC.
const avecDateIso = (ligne) => ({ ...ligne, cree_le: ligne.cree_le.toISOString() });

async function lister(articleId) {
  if (!idValide(articleId)) throw articleIntrouvable(articleId);
  // Vérifier l'article permet de distinguer une liste vide d'un article introuvable.
  await articles.trouver(articleId);
  // L'identifiant départage les commentaires qui ont la même date.
  const { rows } = await pool.query(
    `SELECT id, article_id, nom, texte, cree_le
     FROM commentaires WHERE article_id = $1
     ORDER BY cree_le ASC, id ASC`,
    [articleId],
  );
  return rows.map(avecDateIso);
}

async function trouver(id) {
  if (!idValide(id)) throw commentaireIntrouvable(id);
  const { rows } = await pool.query(
    'SELECT id, article_id, nom, texte, cree_le FROM commentaires WHERE id = $1',
    [id],
  );
  if (!rows[0]) throw commentaireIntrouvable(id);
  return avecDateIso(rows[0]);
}

async function parVisiteur(nom) {
  const { rows } = await pool.query(
    `SELECT c.id, c.article_id, c.nom, c.texte, c.cree_le, a.titre
     FROM commentaires AS c JOIN articles AS a ON a.id = c.article_id
     WHERE c.nom = $1
     ORDER BY c.cree_le DESC, c.id DESC`,
    [nom],
  );
  return rows.map(avecDateIso);
}

async function creer(articleId, { nom, texte }) {
  if (!idValide(articleId)) throw articleIntrouvable(articleId);
  try {
    // RETURNING récupère la ligne créée, avec l'identifiant et la date attribués par PostgreSQL.
    const { rows } = await pool.query(
      `INSERT INTO commentaires (article_id, nom, texte) VALUES ($1, $2, $3)
       RETURNING id, article_id, nom, texte, cree_le`,
      [articleId, nom, texte],
    );
    return avecDateIso(rows[0]);
  } catch (err) {
    // La clé étrangère vérifie l'article au moment de l'INSERT.
    if (err.code === '23503' && err.constraint === 'commentaires_article_fk') {
      throw articleIntrouvable(articleId);
    }
    throw err;
  }
}

async function modifier(id, { texte }) {
  if (!idValide(id)) throw commentaireIntrouvable(id);
  const { rows } = await pool.query(
    `UPDATE commentaires SET texte = $2 WHERE id = $1
     RETURNING id, article_id, nom, texte, cree_le`,
    [id, texte],
  );
  if (!rows[0]) throw commentaireIntrouvable(id);
  return avecDateIso(rows[0]);
}

async function supprimer(id) {
  if (!idValide(id)) throw commentaireIntrouvable(id);
  const { rowCount } = await pool.query('DELETE FROM commentaires WHERE id = $1', [id]);
  if (rowCount === 0) throw commentaireIntrouvable(id);
}

module.exports = { lister, trouver, parVisiteur, creer, modifier, supprimer };
