/*
  # Création de la table des profils utilisateurs

  1. Nouvelles Tables
    - `user_profiles`
      - `id` (uuid, clé primaire, référence auth.users)
      - `email` (text, unique)
      - `name` (text, nom complet)
      - `specialization` (text, spécialisation professionnelle)
      - `institution` (text, établissement)
      - `bio` (text, biographie optionnelle)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Sécurité
    - Activer RLS sur la table `user_profiles`
    - Politique pour permettre aux utilisateurs de lire leur propre profil
    - Politique pour permettre aux utilisateurs de mettre à jour leur propre profil
    - Politique pour permettre à tous les utilisateurs authentifiés de lire les profils publics
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  specialization text NOT NULL,
  institution text NOT NULL,
  bio text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Politique pour lire son propre profil
CREATE POLICY "Les utilisateurs peuvent lire leur propre profil"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Politique pour mettre à jour son propre profil
CREATE POLICY "Les utilisateurs peuvent mettre à jour leur propre profil"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Politique pour lire les profils publics (pour les autres membres du forum)
CREATE POLICY "Les utilisateurs authentifiés peuvent lire les profils publics"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique pour insérer un nouveau profil lors de l'inscription
CREATE POLICY "Les utilisateurs peuvent créer leur profil"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();