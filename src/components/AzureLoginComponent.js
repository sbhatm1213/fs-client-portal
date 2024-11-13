import React, { useState, useEffect } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID, // Ensure this is correct
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
    redirectUri: `${window.location.origin}/login`, // Ensure this matches your Azure portal setting
  },
};

const AzureLoginComponent = () => {
  const [msalInstance, setMsalInstance] = useState(null); // State to track MSAL initialization
  const [isInitialized, setIsInitialized] = useState(false); // State to track initialization completion

  // Initialize MSAL when the component is mounted
  useEffect(() => {
    try {
      const instance = new PublicClientApplication(msalConfig);
      setMsalInstance(instance); // Save the instance in state
      setIsInitialized(true); // Mark MSAL as initialized
    } catch (error) {
      console.error("MSAL Initialization Error: ", error);
    }
  }, []);

  const handleLogin = async () => {
    if (isInitialized && msalInstance) {
      try {
        console.log("Initiating loginRedirect...");
        // Start login process with redirect
        await msalInstance.loginRedirect({
          scopes: ["User.Read"], // Required scopes
        });
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      console.error("MSAL instance is not initialized.");
    }
  };

  // Handle the redirect response and parse the token
  useEffect(() => {
    const handleRedirectResponse = async () => {
      if (msalInstance && window.location.hash) {
        try {
          console.log("Checking for redirect response...");
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
            console.log("No login response found.");
          }
        } catch (error) {
          console.error("Error handling redirect response:", error);
        }
      }
    };

    // Call this only if MSAL instance is initialized and we have a hash in the URL
    if (isInitialized && window.location.hash) {
      handleRedirectResponse();
    }
  }, [isInitialized, msalInstance]);

  // Show a loading message if MSAL is still initializing
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleLogin}>Login with Azure</button>
    </div>
  );
};

export default AzureLoginComponent;
