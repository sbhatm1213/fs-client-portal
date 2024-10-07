// /src/components/HomePage.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, Breadcrumbs, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import MsspComponent  from './MsspComponent.js'
import MspComponent  from './MspComponent.js'
import LicensesTableComponent  from './LicensesTableComponent.js'


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

    const [mssp, setMssp] = useState(null);
    const [msp, setMsp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  // Function to handle data from Mssp
  const handleMspFromMssp = (clickedMssp) => {
    setMssp(clickedMssp);
  };

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
    <Container>

      <AppBar position="fixed" sx={{ backgroundColor: theme.palette.card.main, color: theme.palette.card.contrastText }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            FS Client Portal
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

      <Grid container spacing={4} my={4}>
      {
        !mssp &&
        <MsspComponent onClickMssp={handleMspFromMssp} />
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


      </>


    </Container>
  );
};

export default HomePage;