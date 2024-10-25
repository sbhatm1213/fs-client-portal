// login.js
import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { setAccessToken, getAccessToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Client, Account } from 'appwrite';
import { client, functions } from '../services/appwriteClient';
import { useAuth } from '../services/TestAuthProvider';


const TestLogin = () => {
  const navigate = useNavigate();

    const login_uri = window.location.origin;
  // Initialize the Appwrite client
//    const account = new Account(client);
//    const access_token = getAccessToken('access_token');


  useEffect(() => {
    console.log("heeeerrrreeeee");

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token'); // Adjust to match your POST response
    console.log(token);

    if (token) {
      sessionStorage.setItem('access_token', token);
      navigate('/dashboard');
    } else {
      console.error('No token received');
    }
  }, [navigate]);


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
        console.log(credentialResponse);
        const googleToken = credentialResponse.credential;

        try {
        console.log("heeerrrrreeeeee");
                const functionId = process.env.REACT_APP_GOOGLE_OAUTH_FUNC_ID;

          const result = await functions.createExecution(
                                '671a8f8100080058d95c',
                                { token: googleToken }
                         );


//            appwrite.functions.createExecution(functionId, JSON.stringify({ token: googleToken }))
//              .then(response => {
//                console.log('Function execution response:', response);
//              })
//              .catch(error => {
//                console.error('Error executing function:', error);
//              });

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
        />
      </div>
    </GoogleOAuthProvider>
  );
};



export default TestLogin;
