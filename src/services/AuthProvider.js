// src/services/AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
//import { supabase } from '../services/supabaseClient'; // Adjust the path as necessary
//import { Account } from 'appwrite';
//import { client } from './appwriteClient';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();
//const account = new Account(client);


export const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const redirectUrl = window.location.origin + '/dashboard';

  useEffect(() => {
    const checkUser = async () => {

        // Fetch auth data from Flask
        fetch('http://127.0.0.1:5000/auth/check', {
            credentials: 'include',  // Ensures cookies are sent with the request
        })
        .then(response => response.json())
        .then(data => {
            if (data.logged_in) {
                setUser(data);  // Set auth data if logged in
            } else {
                setUser(null);  // Clear auth data if not logged in
            }
        })
        .catch(error => console.error("Error fetching auth status:", error));
    };

    checkUser();
  }, []);


/*
  const signInWithGoogle = async () => {
    window.location.href = "http://127.0.0.1:5000/login";  // URL to Flask Google OAuth login route
    fetch("http://127.0.0.1:5000/login",
            { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data.redirect_url) {
           const redirect_to = window.location.origin + data.redirect_url;
           navigate(redirect_to);
        }
      })
      .catch(error => console.error("Authorization error:", error));
  };
*/


  const signInWithAzure = async () => {
//          await account.createOAuth2Session('microsoft', redirectUrl, redirectUrl);
//          try {
//               await account.createOAuth2Session('microsoft',
//               'https://localhost:3000/',
//               'https://localhost:3000/',
//               ['openid', 'profile', 'email']);
//            } catch (error) {
//                console.error('OAuth Session Error:', error);
//            }
  };

  const signOut = async () => {
//    await account.deleteSession('current');
//    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithAzure, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
