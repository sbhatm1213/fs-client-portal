// authprovider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Client, Account } from 'appwrite';
import { client } from './appwriteClient';

const AuthContext = createContext();
const account = new Account(client);


export const TestAuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a valid Appwrite session exists
    const checkSession = async () => {
      try {
        const session = await account.get();
        setIsAuthenticated(true);
        setUser(session);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkSession();
  }, []);

//  if (!isAuthenticated) {
//    return <Navigate to="/login" />;
//  }

    const logout = async () => {
    try {
      await account.deleteSession('current'); // Logs out the user
      setUser(null); // Clear user state
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

//  return children;
      return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children} {/* Ensure children render only when loading is complete */}
    </AuthContext.Provider>
  );

};

//export default TestAuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
