// /src/components/ClientCountComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, TableBody, TableRow, TableCell, Table } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';


const ClientCountComponent = () => {

    const [clientCount, setClientCount] = useState(null);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCountClients = async () => {
           try {
                const { data, error } = await supabase
                    .from('client')
                    .select('count', { count: 'exact' });

                if (error) {
                    console.log(error);
//                    throw error;
                }

                setClientCount(data[0].count);
          } catch (error) {
                console.log(error);
                setError(error.message);
          } finally {
                setLoading(false);
          }

    }

    useEffect(() => {
        getCountClients();
    }, []);


    return (
        <Box mt={4}  sx={{flex: 1}}>

        <Card sx={{ backgroundColor: theme.palette.card.main,
                    color: theme.palette.card.contrastText,
                    maxWidth: theme.palette.card.maxWidth }} >
            <CardContent>
              <Typography variant="h4">
                  {clientCount}
                </Typography>
                <Typography variant="h6">
                  Total Client(s)
              </Typography>
              <Typography variant="body2"></Typography>

            </CardContent>
        </Card>
        </Box>
    )
}


export default ClientCountComponent;
