import { useState, useEffect } from 'react';
import { supabase, AuthUser, isSupabaseConfigured, UserProfile } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Ne vérifier la session que si Supabase est configuré
    if (!isSupabaseConfigured()) {
      setInitialLoading(false);
      return;
    }

    let mounted = true;
    
    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          if (session?.user) {
            await loadUserProfile(session.user);
          } else {
            setUser(null);
            setInitialLoading(false);
          }
        }
      }
    );

    // Vérifier la session actuelle de manière asynchrone
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        if (session?.user) {
          loadUserProfile(session.user);
        } else {
          setInitialLoading(false);
        }
      }
    }).catch(error => {
      console.error('Erreur lors de la vérification de session:', error);
      if (mounted) {
        setInitialLoading(false);
      }
    });
    
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (authUser: User) => {
    try {
      console.log('Chargement du profil pour:', authUser.id);
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      console.log('Profil chargé:', profile);
      
      setUser({
        id: authUser.id,
        email: authUser.email || '',
        name: profile?.name || '',
        specialization: profile?.specialization || '',
        institution: profile?.institution || ''
      });
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      setUser({
        id: authUser.id,
        email: authUser.email || '',
        name: '',
        specialization: '',
        institution: ''
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, profileData: {
    name: string;
    specialization: string;
    institution: string;
  }) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) throw error;

      if (data.user) {
        // Créer le profil utilisateur
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            name: profileData.name,
            specialization: profileData.specialization,
            institution: profileData.institution
          });

        if (profileError) {
          console.error('Erreur lors de la création du profil:', profileError);
        }
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('Utilisateur non connecté');

    const { error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) throw error;

    // Mettre à jour l'état local
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return {
    user,
    loading,
    initialLoading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };
};