// login.js
import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { setAccessToken, getAccessToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Client, Account, Functions } from 'appwrite';
import { client } from '../services/appwriteClient';
import { useAuth } from '../services/TestAuthProvider';

const functions = new Functions(client);

const TestLogin = () => {
  const navigate = useNavigate();

    const login_uri = window.location.origin;
  // Initialize the Appwrite client
//    const account = new Account(client);
//    const access_token = getAccessToken('access_token');


  useEffect(() => {
        console.log(login_uri);
  }, []);


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
/*

  return (
    <GoogleOAuthProvider clientId="512472495668-hql16qpfhgkk4hft906rjb5m65rn720d.apps.googleusercontent.com" >
      <div>
        <h2>Login</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          scope="openid profile email"
          login_uri={login_uri}
          ux_mode="redirect"
        />
      </div>
    </GoogleOAuthProvider>
  );
*/

  return (
    <div>
      <h1>Login with Google</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleSuccess}
        onFailure={handleError}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );

};

export default TestLogin;
