// /src/components/HomePage.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Tooltip, Divider, Collapse } from '@mui/material';
import { Box, Drawer, Breadcrumbs, Link, List, ListItem, ListItemText, IconButton, ListItemButton, ListItemIcon } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AccountCircle, Security, Dashboard, Token, DatasetLinked, ExpandMore } from '@mui/icons-material';
import { Query } from 'appwrite';
//import { supabase } from '../services/supabaseClient';
import { databases } from '../services/appwriteClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';
import MsspCountComponent from './MsspCountComponent.js'
import MspCountComponent from './MspCountComponent.js'
import ClientCountComponent from './ClientCountComponent.js'
import MsspComponent  from './MsspComponent.js'
import PaginatedMspTable  from './PaginatedMspTable.js'
import MspComponent  from './MspComponent.js'
import ProfileIconComponent  from './ProfileIconComponent.js'
import HeimdalProductCard  from './HeimdalProductCard.js'


const HomePage = () => {

  const { user, signOut } = useAuth();
//  console.log(user);
//  const navigate = useNavigate();
//
//  const handleLogout = async () => {
//    await signOut();
//    navigate('/login');
//  };

    const [userRole, setUserRole] = useState('');
    const [showAllMssp, setShowAllMssp] = useState(true);
    const [selectedMssp, setSelectedMssp] = useState(null);
    const [selectedMsspName, setSelectedMsspName] = useState(null);
    const [mspList, setMspList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const databaseID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
    const userProfCollectionID = process.env.REACT_APP_APPWRITE_USERPROF_COLLECTION_ID;
    const msspCollectionID = process.env.REACT_APP_APPWRITE_MSSP_COLLECTION_ID;

      const [selectedNavKey, setSelectedNavKey] = useState('heimdal_nav');

      const handleListItemClick = (navkey) => {
        setSelectedNavKey(navkey);
      };


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


    const getUserProfiles = async () => {
           try {
                databases.listDocuments(
                        databaseID,
                        userProfCollectionID,
                        [Query.equal('email', user.email)], // Using Query object for filtering
                        1
                        ).then(response => {
                        let loggedInUserRole = response.documents[0].role;
//                    console.log(loggedInUserRole); // Access documents here
                    setUserRole(loggedInUserRole);
                    if (loggedInUserRole === 'mssp'){
//                        console.log(response.documents[0].mssp_id); // Access documents here

                        let msspQueryId = response.documents[0].mssp_id;
                            if (msspQueryId){
                                    databases.listDocuments(
                                        databaseID,
                                        msspCollectionID,
                                        [Query.equal('$id', msspQueryId)],
                                        1
                                        ).then(msspresponse => {
//                                    console.log(msspresponse.documents); // Access documents here
                                    setSelectedMssp(msspQueryId);
                                    setSelectedMsspName(msspresponse.documents[0].name);
                                    setMspList(msspresponse.documents[0].msp);
                                  })
                                  .catch(error => {
                                    console.error(error);
                                  });
                                  }
                    }
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


  const renderContent = () => {
    switch (selectedNavKey) {
      case 'product_nav':
        return <HeimdalProductCard />;
      case 'heimdal_nav':
        return (
            <>
        <Box component="main" display="flex">
          <MspCountComponent userRole={userRole} mspList={mspList}  />
          <ClientCountComponent userRole={userRole} mspList={mspList}  />
        </Box>
      {
        userRole === 'admin' &&

        <Box component="main" display="flex">
          <Grid item spacing={6} my={4}>
          {
            showAllMssp &&
            <MsspComponent onClickMssp={handleMsspClick} />
          }
          </Grid>
          <Grid item spacing={6} my={4}>
          {
            selectedMssp &&
            <MspComponent msspId={selectedMssp} queryMsp={mspList} />
          }
          </Grid>
        </Box>
        }

      {
        userRole === 'mssp' &&

            <Box component="main" display="flex">
              <Grid item spacing={6} my={4}>
            {
                selectedMssp &&
                <PaginatedMspTable msspId={selectedMssp} mspRows={mspList} />
            }
              </Grid>
            </Box>
      }
            </>
        );
      default:
        return <HeimdalProductCard />;
    }
  };


  return (
        <ThemeProvider theme={theme}>

  <Grid  direction="column" sx={{ minHeight: '60vh' }}>
      {/* AppBar at the top */}
        <AppBar  position="sticky" style={{ top: 0, zIndex: 1100, backgroundColor: theme.palette.card.main, color: theme.palette.card.contrastText }}>
          <Toolbar>
            <Typography variant="h6"  style={{ flexGrow: 1, fontWeight: 'bold', fontSize: '0.95rem' }} >FS Client Portal</Typography>
            <Tooltip title={user.name} arrow>
                 <ProfileIconComponent userInfo={user} msspInfo={selectedMsspName} signOut={signOut} />
          </Tooltip>
          </Toolbar>
        </AppBar>

      {/* Everything below Top Appbar */}

    <Grid container >
      {/* Left Sidebar */}
        <Grid item xs={2} >
          <Box sx={{ width: '100%' }} >
              <List component="nav" >
                <ListItemButton >
                  <ListItemIcon>
                    <Dashboard  fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText secondary='Overview' secondaryTypographyProps={{ sx: { fontWeight: 'bold' } }} />
                </ListItemButton>
                <ListItemButton  key='product_nav'
                                 onClick={() => handleListItemClick('product_nav')}
                                 selected={selectedNavKey === 'product_nav'} >
                  <ListItemIcon>
                    <Token fontSize="medium"  />
                  </ListItemIcon>
                  <ListItemText secondary='Products' secondaryTypographyProps={{ sx: { fontWeight: 'bold' } }} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <DatasetLinked  fontSize="medium"  />
                  </ListItemIcon>
                  <ListItemText secondary='Integrations'  secondaryTypographyProps={{ sx: { fontWeight: 'bold' } }} />
                </ListItemButton>
                <Collapse in="true" timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} key='heimdal_nav'
                                      onClick={() => handleListItemClick('heimdal_nav')}
                                      selected={selectedNavKey === 'heimdal_nav'} >
                        <ListItemIcon>
                          <Security fontSize="small" />
                        </ListItemIcon>
                        <ListItemText secondary="Heimdal" secondaryTypographyProps={{ sx: { fontWeight: 'bold' } }} />
                      </ListItemButton>
                    </List>
                </Collapse>
              </List>
          </Box>
        </Grid>

      {/* Main content area */}
      <Grid item xs={10} sx={{ flexGrow: 1, p: 2 }}>
        {renderContent()}
      </Grid>
    </Grid>

    </Grid>

    </ThemeProvider>
  );
};

export default HomePage;



//           <MsspCountComponent userRole={userRole} msspId={selectedMssp} />

//                <MspComponent msspId={selectedMssp} queryMsp={mspList} />


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


            <IconButton color="inherit" onClick={() => console.log('Profile clicked')}>
                <AccountCircle />
            </IconButton>

        //footer
      <Grid item xs={12} >
        <Typography variant="body2" align="center">
          FS Client Portal © 2024
        </Typography>
      </Grid>

*/
