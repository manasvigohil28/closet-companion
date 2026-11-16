-- Phase 1 tables. Tags and other item fields are added in Phase 2.

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS items (
  id                   SERIAL PRIMARY KEY,
  user_id              INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  image_url            TEXT NOT NULL,
  cloudinary_public_id TEXT NOT NULL,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- The closet page always loads one user's items, newest first.
CREATE INDEX IF NOT EXISTS items_user_id_created_at_idx
  ON items (user_id, created_at DESC);
