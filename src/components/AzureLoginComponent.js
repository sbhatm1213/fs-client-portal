import React from "react";
import { Button, Box, Grid } from '@mui/material';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import axios from "axios";
import { SiMicrosoftazure } from 'react-icons/si';
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

  const handleLogin = async () => {
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


      // Redirect to the dashboard after successful login
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

    return (
<Box
      onClick={() => handleLogin()}
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
        cursor: 'pointer',
        transition: 'all 0.3s ease', // Smooth transition for hover effect
        fontFamily: '"Google Sans", Arial, sans-serif',
        fontSize: '14px',
        letterSpacing: '0.25px',
        '&:hover': {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Hover effect for depth
          backgroundColor: '#f1f3f4', // Subtle background change on hover
        },
        '&:active': {
          backgroundColor: '#e0e0e0', // Darker background on click
        },
      }}
    >
    <Grid container >
    <Grid item xs={1}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"
        alt="Azure logo"
        style={{     height: '18px',
    marginRight: '8px',
    minWidth: '18px',
    width: '18px' }} // Adjust margin as needed
      />
      </Grid>
      <Grid item xs={11}>
      <span>Sign in with Azure</span>
      </Grid>
      </Grid>
    </Box>
        );
};

const AzureLoginComponent = () => (
  <MsalProvider instance={msalInstance}>
    <AzureLoginButton />
  </MsalProvider>
);

export default AzureLoginComponent;

//  return <button onClick={handleLogin}>Login with Azure</button>;

/*

<Button
          variant="contained"
          fullWidth
          startIcon={<SiMicrosoftazure />}
          onClick={() => handleLogin()}
          sx={{
            textTransform: "none",
            fontWeight: "medium",
            backgroundColor: `${theme.palette.card.contrastText}`,
            color: `${theme.palette.card.main}`,
            '&:hover': {
                boxShadow: 14
            }
          }}
        >
          Sign in with Azure
        </Button>

*/