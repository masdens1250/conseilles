import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Créer le client même si les variables ne sont pas encore définies
// Cela évite les erreurs de chargement initial
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

// Vérifier la configuration Supabase
export const isSupabaseConfigured = () => {
  console.log('Vérification de la configuration Supabase:', {
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey,
    isPlaceholder: supabaseUrl === 'https://placeholder.supabase.co'
  });
  return !!(supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'https://placeholder.supabase.co' && 
    supabaseAnonKey !== 'placeholder-key');
};

// Types pour l'authentification
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  specialization?: string;
  institution?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  specialization: string;
  institution: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}