// GoogleLoginComponent.js
import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import theme from '../theme.js';


const GoogleLoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSuccess = async (response) => {
    setIsLoading(true); // Start loading
    try {
      console.log("Login Success:", response);
      const googleToken = response.credential;

      // Send the Google token to the backend to create or fetch the user
      const host_origin = window.location.origin;
      let google_login_url = host_origin + "/api/google-login";
      if (host_origin.includes("localhost")) {
        google_login_url = "http://127.0.0.1:5000/api/google-login";
      }

      const res = await axios.post(google_login_url, {
        token: googleToken,
      });
      console.log("User Created or Fetched:", res.data);

      // Store user data in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      sessionStorage.setItem("jwt_token", res.data.jwt_token);
      setIsLoading(false); // Stop loading

      // Redirect to the dashboard after successful login
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during user creation:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <>
      {/* Full-page loading overlay */}
      <Backdrop
        open={isLoading}
        sx={{
          backgroundColor: '#ffffff', // White background for loading state
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          sx={{
            color: theme.palette.card.main, // Blue spinner for consistency with Google
          }}
        />
      </Backdrop>

      {/* Google Login Button */}
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          theme="outline"
          size="large"
          text="signin_with"
          disabled={isLoading}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginComponent;
