// src/services/AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { supabase } from '../services/supabaseClient'; // Adjust the path as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);


  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      console.error('Login error:', error.message);
    }
  };

  const signInWithAzure = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'azure' });
    if (error) {
      console.error('Login error:', error.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithAzure, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
