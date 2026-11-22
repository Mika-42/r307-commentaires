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
INSERT INTO commentaires (article_id, nom, texte, cree_le) VALUES
  (1, 'Claire', 'Et pour le robinier, vous conseillez quoi ?', '2026-09-03T08:12:00.000Z'),
  (1, 'Paul', 'Ma table en pin a tenu deux hivers, pas trois.', '2026-09-04T16:40:00.000Z'),
  (1, 'Nadia', 'Article clair, merci.', '2026-09-10T06:05:00.000Z'),
  (2, 'Hugo', 'Le noyer est magnifique. Combien de temps pour le séchage ?', '2026-09-17T10:30:00.000Z'),
  (2, 'Inès', 'Des photos de la pose seraient les bienvenues.', '2026-09-20T19:15:00.000Z'),
  (4, 'Lucie', 'J''ai une chaise à faire refaire, vous prenez les commandes ?', '2026-10-09T07:00:00.000Z'),
  (5, 'Claire', 'Aucune vis visible : comment sont fixés les caissons ?', '2026-10-16T12:22:00.000Z'),
  (5, 'Karim', 'Superbe travail.', '2026-10-18T17:47:00.000Z');
