/*
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
  const redirectUrl = window.location.origin + '/dashboard';

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


  const signInWithGoogle = async () => {
          await account.createOAuth2Session('google', redirectUrl, redirectUrl);
  };

  const signInWithAzure = async () => {
//          await account.createOAuth2Session('microsoft', redirectUrl, redirectUrl);
          try {
               await account.createOAuth2Session('microsoft',
               'https://localhost:3000/',
               'https://localhost:3000/',
               ['openid', 'profile', 'email']);
            } catch (error) {
                console.error('OAuth Session Error:', error);
            }
  };

  const signOut = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithAzure, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
*/

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


// Create Context for Authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from sessionStorage when app is initialized
  useEffect(() => {

          // Set Authorization header for Axios
          const setAuthHeader = () => {
            const token = getAuthToken();
            if (token) {
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
              delete axios.defaults.headers.common['Authorization']; // Remove header if no token
            }
          };

    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setAuthHeader(); // Set the JWT token in Axios default headers if available
    }
  }, []);

  // Function to get the token from sessionStorage
  const getAuthToken = () => {
    return sessionStorage.getItem('jwt_token'); // Retrieve token from sessionStorage
  };

  const login = (userData) => {
//    console.log(userData);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("jwt_token");
    delete axios.defaults.headers.common['Authorization']; // Remove Authorization header
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};

