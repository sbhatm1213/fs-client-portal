// src/components/UserSettings.js
import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Divider, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import theme from '../theme.js';
import moment from 'moment';


const UserManagementComponent = ({ userData, userProfile, msspInfo, mspInfo }) => {

    const registeredDate = userData.registration;
    const formattedRegisteredDate = moment(registeredDate).format("MMMM DD, YYYY hh:mm A");

    const lastActiveDate = userData.accessedAt;
    const formattedLastActiveDate = moment(lastActiveDate).format("MMMM DD, YYYY hh:mm A");


  return (
    <Box display="flex" mt={4}>
      <Card sx={{ width: 400, padding: 3 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar sx={{ bgcolor:  theme.palette.card.main }}>
            <ManageAccountsIcon fontSize="large" />
          </Avatar>
        </Box>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            {userData.name}
          </Typography>
          <Divider variant="middle" />
          <Box mt={2}>
            <Grid container spacing={2} justifyContent="center">
            <Typography variant="body2" align="center" color="textSecondary">
              <strong>Email:</strong> {userData.email}
            </Typography>
            <br/>
                    {
                      userProfile && userProfile.role === 'mssp' &&
                      <>
                        <Typography variant="body2" align="center" color="textSecondary">
                          <strong>MSSP Name:</strong> {msspInfo}
                        </Typography>
                        <br/>
                        </>
                    }
                    {
                      userProfile && userProfile.role === 'msp' &&
                      <>
                        <Typography variant="body2" align="center" color="textSecondary">
                          <strong>MSP Name:</strong> {mspInfo}
                        </Typography>
                        <br/>
                        </>
                    }
            <Typography variant="body2" align="center" color="textSecondary">
              <strong>Joined:</strong> {formattedRegisteredDate}
            </Typography>
            <br/>
            <Typography variant="body2" align="center" color="textSecondary">
              <strong>Last Activity:</strong> {formattedLastActiveDate}
            </Typography>
            <br/>
          </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserManagementComponent;
