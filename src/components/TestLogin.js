// login.js
import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { setAccessToken, getAccessToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Client, Account, Functions } from 'appwrite';
import { client } from '../services/appwriteClient';
import { useAuth } from '../services/TestAuthProvider';

const functions = new Functions(client);

const TestLogin = () => {
  const navigate = useNavigate();

  // Initialize the Appwrite client
//    const account = new Account(client);
//    const access_token = getAccessToken('access_token');


//  useEffect(() => {
//    const checkSession = async (access_token) => {
////        console.log(access_token);
//        if (access_token){
//            navigate('/dashboard');
//        }
//    };
//
//    checkSession(access_token);
//  }, [access_token]);


//    const createSession = async (accessToken) => {
//      try {
//        const session = await account.createOAuth2Session('google', accessToken, 'http://localhost:3000');
//        console.log('Session created:', session);
//        // Redirect to dashboard or handle post-login logic here
//        navigate('/dashboard');
//      } catch (error) {
//        console.error('Failed to create session:', error);
//      }
//    };


  const handleSuccess = async (credentialResponse) => {
        const googleToken = credentialResponse.credential;

        try {
                const functionId = process.env.REACT_APP_GOOGLE_OAUTH_FUNC_ID; // Accessing the function ID
            console.log(functionId);
          const result = await functions.createExecution(
                                functionId,
                                JSON.stringify({ token: googleToken })
                         );

          if (result.response.success) {
            window.location.href = '/dashboard';
          } else {
            console.error('Session creation failed:', result.response.error);
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
  };

  const handleError = () => {
    console.log('Google Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId="512472495668-hql16qpfhgkk4hft906rjb5m65rn720d.apps.googleusercontent.com" >
      <div>
        <h2>Login</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          scope="openid profile email"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default TestLogin;
