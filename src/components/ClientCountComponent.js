// /src/components/ClientCountComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, TableBody, TableRow, TableCell, Table } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//import { supabase } from '../services/supabaseClient';
import { databases } from '../services/appwriteClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';


const ClientCountComponent = ({ userRole, mspList }) => {

    const [clientCount, setClientCount] = useState(null);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const databaseID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
    const clientCollectionID = process.env.REACT_APP_APPWRITE_CLIENT_COLLECTION_ID;


    useEffect(() => {

        const getCountClients = async (userRole, mspList) => {
               try {
                    if (userRole === 'admin'){
                        databases.listDocuments(
                                databaseID,
                                clientCollectionID,
                                [],
                                0  // Limit 0, bcoz you need only count
                                ).then(response => {
                            setClientCount(response.total);
                          })
                          .catch(error => {
                            console.error(error);
                          });
                    } else if (userRole === 'mssp' && mspList != null) {
                        let count = 0;
                        mspList.forEach((msp) => {
                            count += msp.client_ids.length;
                        });
                        setClientCount(count);
                    }
              } catch (error) {
                    console.log(error);
                    setError(error.message);
              } finally {
                    setLoading(false);
              }
        }

            getCountClients(userRole, mspList);
    }, [userRole, mspList]);


    return (
        <Box mt={1}  sx={{flex: 1}}>
        <Card sx={{ backgroundColor: theme.palette.card.main,
                    color: theme.palette.card.contrastText,
                    maxWidth: theme.palette.card.maxWidth }} >
            <CardContent>
              <Typography variant="h5">
                  {clientCount}
                </Typography>
              <Typography variant="body1">Total Client(s)</Typography>
            </CardContent>
        </Card>
        </Box>
    )
}


export default ClientCountComponent;
