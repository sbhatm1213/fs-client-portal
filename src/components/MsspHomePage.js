// /src/components/MsspHomePage.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Tooltip } from '@mui/material';
import { Box, Drawer, Breadcrumbs, Link, List, ListItem,ListItemText, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import { Query } from 'appwrite';
//import { supabase } from '../services/supabaseClient';
import { databases } from '../services/appwriteClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import theme from '../theme.js';
import MsspCountComponent from './MsspCountComponent.js'
import MspCountComponent from './MspCountComponent.js'
import ClientCountComponent from './ClientCountComponent.js'
import MsspComponent  from './MsspComponent.js'
import MspComponent  from './MspComponent.js'
//import LicensesTableComponent  from './LicensesTableComponent.js'


const MsspHomePage = () => {

  const { user, signOut } = useAuth();
  const { msspId } = useParams(); // Get the msspId from the route params

//  console.log(user);
//  const navigate = useNavigate();
//
//  const handleLogout = async () => {
//    await signOut();
//    navigate('/login');
//  };

//    const [userRole, setUserRole] = useState(true);
//    const [showAllMssp, setShowAllMssp] = useState(true);
    const [selectedMssp, setSelectedMssp] = useState(null);
    const [mspList, setMspList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

      const unsetSelectedMssp = () => {
        setSelectedMssp(null);
      };

      // Function to handle data from Mssp
      const handleMsspClick = (clickedMssp, mspIdList) => {
        console.log('handleMsspClick  >>  '+clickedMssp+ '  >>  ' + mspIdList);
        unsetSelectedMssp();
        setSelectedMssp(clickedMssp);
        setMspList(mspIdList);
      };

/*

    const getUserProfiles = async () => {
           try {
                databases.listDocuments(
                        '670c21eb00243be197b4', // DB-ID
                        '670d6bc800150c600b37', // user-profiles-collection-ID
                        [Query.equal('email', user.email)], // Using Query object for filtering
                        1
                        ).then(response => {
//                    console.log(response.documents[0].role); // Access documents here
                    setUserRole(response.documents[0].role);
                  })
                  .catch(error => {
                    console.error(error);
                  });

          } catch (error) {
                console.log(error);
                setError(error.message);
          } finally {
                setLoading(false);
          }

    }

    useEffect(() => {
        getUserProfiles();
    }, []);

*/



    const fetchMsspList = async () => {
            try {
//                const { data, error } = await supabase
//                    .rpc('get_mssp_product_count');
//                const { data, error } = await supabase
//                    .rpc('get_mssp_customer_stats');

                databases.listDocuments(
                        '670c21eb00243be197b4', // DB-ID
                        '670c2237000f55ccce02', // mssp-collection-ID
                        [Query.equal('$id', msspId)], // Using Query object for filtering
                        ).then(response => {
                    console.log(response.documents); // Access documents here
//                    setMsspList(response.documents);
                    setMspList(response.documents[0].msp);
                  })
                  .catch(error => {
                    console.error(error);
                  });

            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchMsspList();
    }, []);



  return (

  <Grid container direction="column" sx={{ minHeight: '100vh' }}>
      {/* AppBar at the top */}
      <Grid item xs={12}>
        <AppBar position="static"  sx={{ backgroundColor: theme.palette.card.main, color: theme.palette.card.contrastText }}>
          <Toolbar>
            <Typography variant="h6"  style={{ flexGrow: 1 }} >FS Client Portal</Typography>
            <Tooltip title={user.name} arrow>
            <IconButton color="inherit" onClick={() => console.log('Profile clicked')}>
                <AccountCircle />
          </IconButton>
          </Tooltip>
          </Toolbar>

        </AppBar>
      </Grid>

    <Grid container >
      {/* Left Sidebar */}
        <Grid item xs={1}>
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
          <MspCountComponent />
          <ClientCountComponent />
        </Box>

        <Box component="main" display="flex">
          <Grid item spacing={6} my={4}>
            <MspComponent msspId={selectedMssp} queryMsp={mspList} />
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

export default MsspHomePage;
