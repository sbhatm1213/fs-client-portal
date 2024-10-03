// /src/components/HomePage.js
import React, {useEffect} from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <Container>

    {user ? (
        <>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="h6" color="textSecondary">
          This is a random homepage built with Material-UI and React : {user.email}
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
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Feature One
              </Typography>
              <Typography color="textSecondary">
                Description of the first feature. Random text to illustrate a feature of the application.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Feature Two
              </Typography>
              <Typography color="textSecondary">
                Description of the second feature. More random text for the feature description.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Feature Three
              </Typography>
              <Typography color="textSecondary">
                Description of the third feature. Even more random text to showcase another feature.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Grid item xs={12} md={4}>
            <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
            </Button>
          </Grid>
      </Box>
      </>
    ) : (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Grid item xs={12} md={4}>
            <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Redirecting to login...
              </Typography>
            </CardContent>
            </Card>
          </Grid>
      </Box>
      )}
    </Container>
  );
};

export default HomePage;
