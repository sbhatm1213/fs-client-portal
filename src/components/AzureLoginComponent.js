import React, { useEffect } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
    redirectUri: `${window.location.origin}/dashboard`, // Ensure this is correctly set in Azure portal too
  },
};

// Create MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

const AzureLoginComponent = () => {
  const handleLogin = async () => {
    try {
      console.log("Initiating loginRedirect...");
      // Start login process
      await msalInstance.loginRedirect({
        scopes: ["User.Read"], // Your required scopes
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Handling redirect response after page reload
  useEffect(() => {
    const handleRedirectResponse = async () => {
      try {
        const response = await msalInstance.handleRedirectPromise();
        if (response) {
          console.log("Login successful:", response);

          const azureToken = response.idToken;

          // Send the Azure token to your backend
          const azureLoginUrl = window.location.origin + "/api/azure-login";
          const res = await axios.post(azureLoginUrl, { token: azureToken });
          console.log("User Created or Fetched:", res.data);

          // Store user data
          sessionStorage.setItem("user", JSON.stringify(res.data.user));

          // Redirect to the dashboard
          window.location.href = "/dashboard";
        } else {
          console.log("No response found.");
        }
      } catch (error) {
        console.error("Error during redirect handling:", error);
      }
    };

    if (window.location.hash) {
      handleRedirectResponse();
    }
  }, []); // Only run once on component mount

  return <button onClick={handleLogin}>Login with Azure</button>;
};

export default AzureLoginComponent;
