// /src/components/HomePage.js
import React, {useEffect} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import MsspComponent  from './MsspComponent.js'


const theme = createTheme({
    palette: {
        card: {
            main: '#11609f',
            contrastText: '#eff8f9',
        },
    },
});


const HomePage = () => {

//  const { user, signOut } = useAuth();
//  const navigate = useNavigate();

//  const handleLogout = async () => {
//    await signOut();
//    navigate('/login');
//  };

  return (
    <Container>
      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.card.main, color: theme.palette.card.contrastText }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
          Welcome to Your Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

        <>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Loggined in as : user.email
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary">
            Primary Action
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary">
            Secondary Action
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} my={4}>
        <MsspComponent />
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Grid item xs={12} md={4}>
            <Button variant="contained" color="primary">
                Logout
            </Button>
          </Grid>
      </Box>
      </>


    </Container>
  );
};

export default HomePage;
