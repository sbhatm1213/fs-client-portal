// src/services/AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
//import { supabase } from '../services/supabaseClient'; // Adjust the path as necessary
import { Account } from 'appwrite';
import { client } from './appwriteClient';

const AuthContext = createContext();
const account = new Account(client);


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
//  const redirectUrl = window.location.origin;
//  const redirectUrl = process.env.REACT_APP_REDIRECT_URI_AZURE;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);


  const signInWithGoogleAws = async () => {
          await account.createOAuth2Session('google',
                        'https://main.d3n19dnhhpdakz.amplifyapp.com',
                        'https://main.d3n19dnhhpdakz.amplifyapp.com');
  };

  const signInWithGoogleVercel = async () => {
          await account.createOAuth2Session('google',
                        'https://fs-client-portal.vercel.app',
                        'https://fs-client-portal.vercel.app');
  };

  const signInWithAzureAws = async () => {
          await account.createOAuth2Session('microsoft',
                        'https://main.d3n19dnhhpdakz.amplifyapp.com/v1/account/sessions/oauth2/callback/microsoft',
                        'https://main.d3n19dnhhpdakz.amplifyapp.com/v1/account/sessions/oauth2/callback/microsoft');
  };

  const signInWithAzureVercel = async () => {
          await account.createOAuth2Session('microsoft',
                        'https://fs-client-portal.vercel.app/v1/account/sessions/oauth2/callback/microsoft',
                        'https://fs-client-portal.vercel.app/v1/account/sessions/oauth2/callback/microsoft');
  };

  const signOut = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogleAws, signInWithGoogleVercel, signInWithAzureAws, signInWithAzureVercel, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
