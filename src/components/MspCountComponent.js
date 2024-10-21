// /src/components/MspCountComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, TableBody, TableRow, TableCell, Table } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//import { supabase } from '../services/supabaseClient';
import { Query } from 'appwrite';
import { databases } from '../services/appwriteClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';


const MspCountComponent = ({ userRole, mspList }) => {

    const [mspCount, setMspCount] = useState(null);
    const [selectedMspId, setSelectedMspId] = useState(null);
    const [msps, setMsps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalLicencesCount, setTotalLicencesCount] = useState(null);
    const [totalDevicesCount, setTotalDevicesCount] = useState(null);
    const databaseID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
    const mspCollectionID = process.env.REACT_APP_APPWRITE_MSP_COLLECTION_ID;


    useEffect(() => {

        const getCountMsps = async (userRole, mspList) => {
               try {
                    if (userRole === 'admin'){
                        databases.listDocuments(
                                databaseID,
                                mspCollectionID,
                                [],
                                0   // Limit 0, bcoz you need only count
                                ).then(response => {
                            setMspCount(response.total);
                          })
                          .catch(error => {
                            console.error(error);
                          });
                      } else if (userRole === 'mssp' && mspList != null){
                            setMspCount(mspList.length);
                            setTotalLicencesCount(mspList.reduce((sum, msp) => sum + msp.purchased_licenses, 0));
                            setTotalDevicesCount(mspList.reduce((sum, msp) => sum + msp.devices, 0));
                      }
              } catch (error) {
                    console.log(error);
                    setError(error.message);
              } finally {
                    setLoading(false);
              }

        }

            getCountMsps(userRole, mspList);
    }, [userRole, mspList]);


    return (<>
        <Box mt={1}  sx={{flex: 1}}>
        <Card sx={{ backgroundColor: theme.palette.card.main,
                    color: theme.palette.card.contrastText,
                    maxWidth: theme.palette.card.maxWidth }} >
            <CardContent>
              <Typography variant="h5">
                  {mspCount}
                </Typography>
              <Typography variant="body1">Total MSP(s)</Typography>
            </CardContent>
        </Card>
        </Box>
        <Box mt={1}  sx={{flex: 1}}>
        <Card sx={{ backgroundColor: theme.palette.card.main,
                    color: theme.palette.card.contrastText,
                    maxWidth: theme.palette.card.maxWidth }} >
            <CardContent>
              <Typography variant="h5">
                  {totalLicencesCount}
                </Typography>
              <Typography variant="body1">Total Licence(s)</Typography>
            </CardContent>
        </Card>
        </Box>
        <Box mt={1}  sx={{flex: 1}}>
        <Card sx={{ backgroundColor: theme.palette.card.main,
                    color: theme.palette.card.contrastText,
                    maxWidth: theme.palette.card.maxWidth }} >
            <CardContent>
              <Typography variant="h5">
                  {totalDevicesCount}
                </Typography>
              <Typography variant="body1">Total Devices(s)</Typography>
            </CardContent>
        </Card>
        </Box>
        </>
    )
}


export default MspCountComponent;
