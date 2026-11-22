-- =============================================================================
-- PARTIE A · Questions 1 et 2 · La table des commentaires
-- A executer dans la base ateliers, APRES db/ateliers.sql.
-- =============================================================================

-- Le script doit pouvoir etre relance : on commence par effacer la table.
DROP TABLE IF EXISTS commentaires;

-- QUESTION 1 · Creer la table commentaires.
CREATE TABLE commentaires (
  id         INT         GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  article_id INT         NOT NULL,
  nom        TEXT        NOT NULL,
  texte      TEXT        NOT NULL,
  cree_le    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT commentaires_article_fk
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE,
  CONSTRAINT commentaires_texte_non_vide CHECK (texte <> '')
);

-- QUESTION 2 · Inserer les huit commentaires de data/commentaires.initial.json.
-- Ne donnez PAS les id : la base les attribue. Les dates sont en UTC (le Z final).



