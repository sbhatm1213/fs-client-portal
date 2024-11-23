// src/components/UserManagementComponent.js
import React, {useEffect, useState} from 'react';
import { Box, Card, CardContent, Typography, Avatar, Divider, Grid, Chip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import theme from '../theme.js';
import moment from 'moment';


const UserManagementComponent = ({ userData, userProfile, msspId, msspName, msspUserInfo, mspInfo }) => {

    const [formattedRegisteredDate, setFormattedRegisteredDate] = useState([]);
    const [formattedLastActiveDate, setFormattedLastActiveDate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const registeredDate = userData.registration;
        setFormattedRegisteredDate(moment(registeredDate).format("MMMM DD, YYYY hh:mm A"));

//        const lastActiveDate = userData.accessedAt;
//        setFormattedLastActiveDate(moment(lastActiveDate).format("MMMM DD, YYYY hh:mm A"));
    }, []);


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

                            {
                              userProfile && userProfile === 'mssp' &&
                              <>

                              <Grid item xs={12} mt={2}>
                                <Typography variant="body2" color="textSecondary">
                                  <strong>MSSP Name:</strong>
                                </Typography>
                                </Grid>
                                { msspUserInfo &&
                              <Grid item xs={12} mt={3}>
                                <Typography variant="body2" color="textSecondary">
                                  <strong>MSSP Users:</strong>
                                </Typography>
                                </Grid>
                                }
                              <Grid item xs={12} mt={3}  style={{ display: 'none' }} >
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


                            {
                              userProfile && userProfile === 'mssp' &&
                              <>

                              <Grid item xs={12}  mt={2}>
                                <Typography variant="body2" color="textSecondary">
                                  {msspName}
                                </Typography>
                                </Grid>
                                { msspUserInfo &&
                              <Grid item xs={12}  mt={3} display='flex' >
                                    {msspUserInfo.map((msspUser) => (
                                          <Chip key={msspUser.$id} label={msspUser.email} variant="outlined" />
                                      ))}
                                </Grid>
                                }
                              <Grid item xs={12}  mt={3} style={{ display: 'none' }} >
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
