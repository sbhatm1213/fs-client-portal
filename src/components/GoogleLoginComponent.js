import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function GoogleLoginComponent() {
  const handleLoginSuccess = async (response) => {
    console.log("Login Success:", response);
    const googleToken = response.credential;

    // Send the Google token to the Flask backend to create a user
    try {
      const host_origin = window.location.origin;

        let google_login_url = host_origin + "/api/google-login";
        if (host_origin.includes("localhost")){
                google_login_url = "http://127.0.0.1:5000/api/google-login"
        }

      const res = await axios.post(google_login_url, {
        token: googleToken,
      });
      console.log("User Created or Fetched:", res.data);

      // Store user data in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to the dashboard or wherever after successful login
      window.location.href = "/dashboard";  // or handle the redirect however you like
    } catch (error) {
      console.error("Error during user creation:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
}

export default GoogleLoginComponent;
