// /src/components/HomePage.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, Drawer, Breadcrumbs, Link, List, ListItem,ListItemText } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';
import MsspCountComponent from './MsspCountComponent.js'
import MspCountComponent from './MspCountComponent.js'
import ClientCountComponent from './ClientCountComponent.js'
import MsspComponent  from './MsspComponent.js'
import MspComponent  from './MspComponent.js'
import LicensesTableComponent  from './LicensesTableComponent.js'


const HomePage = () => {

//  const { user, signOut } = useAuth();
//  const navigate = useNavigate();

//  const handleLogout = async () => {
//    await signOut();
//    navigate('/login');
//  };

    const [mssp, setMssp] = useState(null);
    const [msp, setMsp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const unsetMssp = () => {
    setMssp(null);
  };

  // Function to handle data from Msp
  const handleMspClick = (clickedMsp) => {
    console.log('HEYYYYYYYY');
    console.log(clickedMsp);
    setMsp(clickedMsp);
  };

  const unsetMsp = () => {
    setMsp(null);
  };


  return (

  <Grid container direction="column" sx={{ minHeight: '100vh' }}>
      {/* AppBar at the top */}
      <Grid item xs={12}>
        <AppBar position="static"  sx={{ backgroundColor: theme.palette.card.main, color: theme.palette.card.contrastText }}>
          <Toolbar>
            <Typography variant="h6">FS Client Portal</Typography>
          </Toolbar>
        </AppBar>
      </Grid>

    <Grid container style={{ marginTop: '64px' }}>
      {/* Left Sidebar */}
        <Grid item xs={2}>
          <List>
            {['', '', ''].map((text) => (
              <ListItem  key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Grid>

      {/* Main content area */}
      <Grid item xs={10} sx={{ flexGrow: 1, p: 2 }}>
        <Box component="main" display="flex">
          <MsspCountComponent />
          <MspCountComponent />
          <ClientCountComponent />
        </Box>

    <Box component="main" >
      <Grid item spacing={6} my={4}>
      {
        !mssp &&
        <MsspComponent />
      }
      {
        mssp && mssp.mssp_id && !msp &&
        <MspComponent msspId={mssp.mssp_id} onClickMsp={handleMspClick} />
      }
      {
        mssp && mssp.mssp_id && msp && msp.msp_id &&
        <div>
        {JSON.stringify(msp)}
        <LicensesTableComponent />
        </div>
      }
      </Grid>

        </Box>
      </Grid>
      </Grid>

      {/* Footer */}
      <Grid item xs={12} >
        <Typography variant="body2" align="center">
          FS Client Portal © 2024
        </Typography>
      </Grid>
    </Grid>

  );
};

export default HomePage;

/*

 <Grid container  spacing={4} my={10}>
    <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={unsetMssp}>
          MSSP
        </Link>
        {
            mssp && mssp.mssp_id &&
            <Link
              underline="hover"
              color="inherit"
            >
              {mssp.mssp_name}
            </Link>
        }
        {
            msp && msp.msp_id &&
            <Link
              underline="hover"
              color="inherit"
            >
              {msp.msp_name}
            </Link>
        }
      </Breadcrumbs>
      </Grid>
*/
