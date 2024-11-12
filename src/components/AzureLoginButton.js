import { PublicClientApplication } from "@azure/msal-browser";
//import theme from '../theme.js';


const msalConfig = {
  auth: {
    clientId: "YOUR_AZURE_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
    redirectUri: "YOUR_REDIRECT_URI",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

const AzureLoginButton = ({ onLoginSuccess }) => {
  const handleLogin = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup();
      onLoginSuccess(loginResponse.account);
    } catch (error) {
      console.error("Azure Login Failed", error);
    }
  };

  return <button onClick={handleLogin}>Login with Azure</button>;
};

export default AzureLoginButton;