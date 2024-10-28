// src/components/UserSettings.js
import React, {useEffect, useState} from 'react';
import { Box, Card, CardContent, Typography, Avatar, Divider, Grid, Chip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Query } from 'appwrite';
import theme from '../theme.js';
import moment from 'moment';
import { databases } from '../services/appwriteClient';


const UserManagementComponent = ({ userData, userProfile, msspId, msspName, msspUserInfo, mspInfo }) => {

    const [formattedRegisteredDate, setFormattedRegisteredDate] = useState([]);
    const [formattedLastActiveDate, setFormattedLastActiveDate] = useState([]);
    const databaseID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
    const userProfCollectionID = process.env.REACT_APP_APPWRITE_USERPROF_COLLECTION_ID;
    const msspCollectionID = process.env.REACT_APP_APPWRITE_MSSP_COLLECTION_ID;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const registeredDate = userData.registration;
        setFormattedRegisteredDate(moment(registeredDate).format("MMMM DD, YYYY hh:mm A"));

        const lastActiveDate = userData.accessedAt;
        setFormattedLastActiveDate(moment(lastActiveDate).format("MMMM DD, YYYY hh:mm A"));
    }, []);
/*

    const getMsspUsers = async (msspId) => {
        try {
                databases.listDocuments(
                        databaseID,
                        userProfCollectionID,
                        [Query.equal('mssp_id', msspId)], // Using Query object for filtering
                        1
                        ).then(response => {
                        let usersOfMssp = response.documents[0];
//                    console.log(loggedInUserRole); // Access documents here
                    setMsspUserList(usersOfMssp);
                  })
                  .catch(error => {
                    console.error(error);
                  });
          } catch (error) {
                console.log(error);
                setError(error.message);
          }
    }
*/

/*
  useEffect(() => {
    const fetchUsers = async (id) => {
          try {
                    databases.listDocuments(
                            databaseID,
                            userProfCollectionID,
                            [Query.equal('mssp_id', id)]
                      ).then(response => {

                            let usersOfMssp = response;
    //                    console.log(loggedInUserRole); // Access documents here
                        setMsspUserList(usersOfMssp);
              })
              }catch (err) {
                setError(err);
              } finally {
                setLoading(false);
              }
        }
      if(msspId){
            fetchUsers(msspId);
        } else{
            setLoading(false);
        }
  }, [msspId]);
*/

  return (
    <Box display="flex" mt={4}>
      <Card sx={{ maxWidth: 800, padding: 1 }}>
        <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: theme.palette.card.main, mr: 2 }}>
            <ManageAccountsIcon fontSize="medium" />
          </Avatar>
          <Typography variant="h6" >
            {userData.name}
          </Typography>
        </Box>
          <Box mt={2} display="flex" >
                <Grid container justifyContent="left" xs={3}>
                    <Grid item xs={12} mt={2}>
                    <Typography variant="body2"  color="textSecondary">
                      <strong>Email:</strong>
                    </Typography>
                    </Grid>
                    <Grid item xs={12}  mt={2}>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Joined:</strong>
                    </Typography>
                    </Grid>
                    <Grid item xs={12}  mt={2}>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Last Activity:</strong>
                    </Typography>
                    </Grid>

                            {
                              userProfile && userProfile === 'mssp' &&
                              <>
                              <Grid item xs={12} mt={3}>
                                <Typography variant="body2" color="textSecondary">
                                  <strong>MSSP ID:</strong>
                                </Typography>
                                </Grid>
                              <Grid item xs={12} mt={3}>
                                <Typography variant="body2" color="textSecondary">
                                  <strong>MSSP Name:</strong>
                                </Typography>
                                </Grid>
                              <Grid item xs={12} mt={3}>
                                <Typography variant="body2" color="textSecondary">
                                  <strong>MSSP Users:</strong>
                                </Typography>
                                </Grid>
                              <Grid item xs={12} mt={3}>
                                <Typography variant="body2" color="textSecondary">
                                  <strong>MSP Users:</strong>
                                </Typography>
                                </Grid>
                                </>
                            }
                            {
                              userProfile && userProfile === 'msp' &&
                              <Grid item xs={12} mt={2}>
                                <Typography variant="body2" color="textSecondary">
                                  <strong>MSP Name:</strong>
                                </Typography>
                                </Grid>
                            }
                </Grid>
                  <Grid container justifyContent="left" xs={6}>
                    <Grid item xs={12}  mt={2}>
                    <Typography variant="body2" color="textSecondary">
                      {userData.email}
                    </Typography>
                    </Grid>
                    <Grid item xs={12}  mt={2}>
                    <Typography variant="body2" color="textSecondary">
                      {formattedRegisteredDate}
                    </Typography>
                    </Grid>
                    <Grid item xs={12}  mt={2}>
                    <Typography variant="body2" color="textSecondary">
                      {formattedLastActiveDate}
                    </Typography>
                    </Grid>

                            {
                              userProfile && userProfile === 'mssp' &&
                              <>
                              <Grid item xs={12}  mt={3}>
                                <Typography variant="body2" color="textSecondary">
                                  {msspId}
                                </Typography>
                                </Grid>
                              <Grid item xs={12}  mt={3}>
                                <Typography variant="body2" color="textSecondary">
                                  {msspName}
                                </Typography>
                                </Grid>
                              <Grid item xs={12}  mt={3} display='flex' >
                                    {msspUserInfo.map((msspUser) => (
                                          <Chip key={msspUser.$id} label={msspUser.email} variant="outlined" />
                                      ))}
                                </Grid>
                              <Grid item xs={12}  mt={3}>
                                      <Chip label='INVITE MSP'
                                       sx={{
                                          backgroundColor: theme.palette.card.main,
                                          color: theme.palette.card.contrastText,
                                          width: '100px',
                                          textAlign: 'center'
                                        }}
                                        variant="outlined"
                                       />
                                </Grid>

                                </>
                            }
                            {
                              userProfile && userProfile === 'msp' &&
                              <Grid item xs={12}  mt={2}>
                                <Typography variant="body2" color="textSecondary">
                                  {mspInfo}
                                </Typography>
                                </Grid>
                            }
                  </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserManagementComponent;



/*


{msspUserInfo.map((msspUser) => (
                                    <Grid item key={msspUser.$id} xs={6} sm={4} md={3}>
                                      <Chip label={msspUser.email} variant="outlined" />
                                    </Grid>
                                  ))}
*/
