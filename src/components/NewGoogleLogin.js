import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginComponent  from './GoogleLoginComponent.js'
import theme from '../theme.js';


const NewGoogleLogin = ({ onGoogleLogin, onAzureLogin }) => (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLoginComponent />
    </GoogleOAuthProvider>);

export default NewGoogleLogin;
