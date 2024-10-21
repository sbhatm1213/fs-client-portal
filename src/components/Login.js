// /src/components/Login.js
import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
//import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { SiMicrosoftazure } from 'react-icons/si';

const Login = () => {
//  const history = useHistory(); // Initialize history object
  const navigate = useNavigate(); // Initialize navigate object

//  const { signInWithGoogle } = useAuth();
  const { user, signInWithGoogle, signInWithAzure, signOut } = useAuth();

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const handleAzureLoginAws = async () => {
    await signInWithAzureAws();
  };

  const handleAzureLoginVercel = async () => {
    await signInWithAzureVercel();
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Welcome Back
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Please log in using one of the following options:
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleGoogleLogin()}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                padding: '10px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
                },
              }}
              startIcon={<GoogleIcon />} // Add Google icon
            >
              Login with Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary" // Use a suitable color
              fullWidth
              onClick={() => handleAzureLoginAws()} // Adjust according to your Azure setup
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                padding: '10px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
                },
              }}
              startIcon={<SiMicrosoftazure />} // Add Azure icon
            >
              Login with Azure AWS
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary" // Use a suitable color
              fullWidth
              onClick={() => handleAzureLoginVercel()} // Adjust according to your Azure setup
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                padding: '10px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
                },
              }}
              startIcon={<SiMicrosoftazure />} // Add Azure icon
            >
              Login with Azure Vercel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
