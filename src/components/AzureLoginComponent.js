import React, { useEffect } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import axios from "axios";

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: `${process.env.REACT_APP_AZURE_CLIENT_ID}`,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
    redirectUri: `${window.location.origin}/dashboard`, // Ensure this is correctly set in Azure portal too
  },
};

// MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

const AzureLoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      // Initiate login with redirect flow
      instance.loginRedirect({
        scopes: ["User.Read"], // The required scopes for your application
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return <button onClick={handleLogin}>Login with Azure</button>;
};

const AzureLoginComponent = () => {
  const { instance } = useMsal();

  useEffect(() => {
    // Handle the redirect after login
    const handleRedirectResponse = async () => {
      try {
        const response = await instance.handleRedirectPromise(); // This will process the response after redirect
        if (response) {
          console.log("Login successful:", response);

          const azureToken = response.idToken;

          // Send the Azure token to the Flask backend to create or fetch the user
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
        }
      } catch (error) {
        console.error("Error handling redirect response:", error);
      }
    };

    // Only handle the redirect response if the page was loaded with the redirect
    if (window.location.hash) {
      handleRedirectResponse();
    }
  }, [instance]);

  return (
    <MsalProvider instance={msalInstance}>
      <AzureLoginButton />
    </MsalProvider>
  );
};

export default AzureLoginComponent;
