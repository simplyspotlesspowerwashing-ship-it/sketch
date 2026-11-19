-- One row per pack, week, card and answer: how many mayors chose it.
CREATE TABLE IF NOT EXISTS votes (
  pack TEXT NOT NULL,
  week TEXT NOT NULL,
  card TEXT NOT NULL,
  dir  TEXT NOT NULL CHECK (dir IN ('left', 'right')),
  n    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (pack, week, card, dir)
);
