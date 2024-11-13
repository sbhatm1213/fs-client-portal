import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import axios from "axios";

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

      // Redirect to the dashboard after successful login
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return <button onClick={handleLogin}>Login with Azure</button>;
};

const AzureLoginComponent = () => (
  <MsalProvider instance={msalInstance}>
    <AzureLoginButton />
  </MsalProvider>
);

export default AzureLoginComponent;
