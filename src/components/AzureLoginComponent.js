import React, { useState } from "react";
import { Box, Grid, Backdrop, CircularProgress } from '@mui/material';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import axios from "axios";
import theme from '../theme.js';


// MSAL configuration
const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,  // Ensure this is correct
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
    redirectUri: `${window.location.origin}/login`,  // Use /login for the redirect
  },
};

// MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

const AzureLoginButton = () => {
  const { instance } = useMsal();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true); // Start loading
    try {
      console.log("Initiating loginPopup...");
      // Initiate login with popup flow
      const loginResponse = await instance.loginPopup({
        scopes: ["User.Read"], // The required scopes for your application
      });
      console.log("Login Successful:", loginResponse);

      const azureToken = loginResponse.idToken;

      // Send the Azure token to the backend to create or fetch the user
      const host_origin = window.location.origin;
      let azure_login_url = host_origin + "/api/azure-login";
      if (host_origin.includes("localhost")) {
        azure_login_url = "http://127.0.0.1:5000/api/azure-login";
      }

      const res = await axios.post(azure_login_url, {
        token: azureToken,
      });
      console.log("User Created or Fetched:", res.data);

      // Store user data in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      sessionStorage.setItem('jwt_token', res.data.jwt_token);
      setIsLoading(false); // Stop loading

      // Redirect to the dashboard after successful login
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
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
            color: theme.palette.card.main, // Blue spinner for consistency
          }}
        />
      </Backdrop>

      {/* Login Button */}
      <Box
        onClick={() => !isLoading && handleLogin()}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '100%',
          backgroundColor: '#fff',
          border: '1px solid #dadce0',
          color: '#3c4043',
          fontWeight: 'medium',
          borderRadius: '4px', // Make the edges rounded like a button
          padding: '8px 16px', // Add padding for button-like spacing
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1,
          transition: 'all 0.3s ease', // Smooth transition for hover effect
          fontFamily: '"Google Sans", Arial, sans-serif',
          fontSize: '14px',
          letterSpacing: '0.25px',
          '&:hover': {
            boxShadow: !isLoading && '0 4px 6px rgba(0, 0, 0, 0.1)', // Hover effect for depth
            backgroundColor: !isLoading && '#f1f3f4', // Subtle background change on hover
          },
          '&:active': {
            backgroundColor: !isLoading && '#e0e0e0', // Darker background on click
          },
        }}
      >
        <Grid container>
          <Grid item xs={1}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"
              alt="Azure logo"
              style={{
                height: '18px',
                marginRight: '8px',
                minWidth: '18px',
                width: '18px',
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <span>Sign in with Azure</span>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const AzureLoginComponent = () => (
  <MsalProvider instance={msalInstance}>
    <AzureLoginButton />
  </MsalProvider>
);

export default AzureLoginComponent;
