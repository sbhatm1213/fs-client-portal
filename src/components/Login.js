
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Divider,
  Chip
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { SiMicrosoftazure } from 'react-icons/si';
import { useAuth } from '../services/AuthProvider';
import theme from '../theme.js';


const Login = () => {
//  const history = useHistory(); // Initialize history object
  const navigate = useNavigate(); // Initialize navigate object

//  const { signInWithGoogle } = useAuth();
  const { user, signInWithGoogle, signInWithAzure, signOut } = useAuth();

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const handleAzureLogin = async () => {
    await signInWithAzure();
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        padding: 0 // Remove padding to prevent whitespace
      }}
    >
      {/* Centered Box for Login Buttons */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 400, // Limit the width of the box
          textAlign: 'center', // Center text inside the box
          padding: 4,
          backgroundColor: `${theme.palette.card.main}`, // Optional: background color for the page
          borderRadius: 2, // Rounded corners
          boxShadow: 1, // Add shadow for a subtle effect
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: "bold", color: `${theme.palette.card.contrastText}` }}>
          FS Client Portal
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2, color: `${theme.palette.card.contrastText}` }}>
          Get started by signing in with your preferred method:
        </Typography>
        <Divider sx={{ marginBottom: 2, backgroundColor: `${theme.palette.card.contrastText}` }} />

        <Button
          variant="contained"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={() => handleGoogleLogin()}
          sx={{
            textTransform: "none",
            fontWeight: "medium",
            backgroundColor: `${theme.palette.card.contrastText}`,
            color: `${theme.palette.card.main}`,
            marginBottom: 2,
            '&:hover': {
                boxShadow: 14
            }
          }}
        >
          Login with Google
        </Button>

        <Button
          variant="contained"
          fullWidth
          startIcon={<SiMicrosoftazure />}
          onClick={() => handleAzureLogin()}
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
          Login with Azure
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

/*
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
import theme from '../theme.js';


const Login = () => {
//  const history = useHistory(); // Initialize history object
  const navigate = useNavigate(); // Initialize navigate object

//  const { signInWithGoogle } = useAuth();
  const { user, signInWithGoogle, signInWithAzure, signOut } = useAuth();

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const handleAzureLogin = async () => {
    await signInWithAzure();
  };

  return (

    <Container maxWidth="xs" sx={{ mt: 10 }}>

      <Grid item xs={10} sx={{ flexGrow: 1, p: 2, backgroundColor: `${theme.palette.card.main}` }}>
       <Typography variant="h5" component="h1" align="center">
        Welcome Back
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 16 }}>
        FS Client Portal
      </Typography>

            <Button
              variant="contained"
              fullWidth
              onClick={() => handleGoogleLogin()}
              sx={{
                backgroundColor: `${theme.palette.card.contrastText}`,
                color: 'green',
                borderRadius: '8px',
                textTransform: 'none',
                padding: '10px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: `0px 4px 15px ${theme.palette.card.main}`,
                },
              }}
              startIcon={<GoogleIcon />} // Add Google icon
            >
              Login with Google
            </Button>
            <Grid container />
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleAzureLogin()}
              sx={{
                backgroundColor: `${theme.palette.card.contrastText}`,
                color: 'black',
                borderRadius: '8px',
                textTransform: 'none',
                padding: '10px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: `0px 4px 15px ${theme.palette.card.main}`,
                },
              }}
              startIcon={<SiMicrosoftazure />} // Add Azure icon
            >
              Login with Azure
            </Button>
        </Grid>

    <Box sx={{ mt: 10 }}>
      <Grid item xs={12} >
        <Typography variant="body2" align="center">
          FS Client Portal © 2024
        </Typography>
      </Grid>
    </Box>
    </Container>
  );
};

//export default Login;

*/
