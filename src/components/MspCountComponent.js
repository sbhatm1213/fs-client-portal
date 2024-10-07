// /src/components/MspCountComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, TableBody, TableRow, TableCell, Table } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';


const MspCountComponent = () => {

    const [mspCount, setMspCount] = useState(null);
    const [selectedMspId, setSelectedMspId] = useState(null);
    const [msps, setMsps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCountMsps = async () => {
           try {
                const { data, error } = await supabase
                    .from('msp')
                    .select('count', { count: 'exact' });

                if (error) {
                    console.log(error);
//                    throw error;
                }

                setMspCount(data[0].count);
          } catch (error) {
                console.log(error);
                setError(error.message);
          } finally {
                setLoading(false);
          }

    }

    useEffect(() => {
        getCountMsps();
    }, []);


    return (
        <Box mt={4}  sx={{flex: 1}}>

        <Card sx={{ backgroundColor: theme.palette.card.main,
                    color: theme.palette.card.contrastText,
                    maxWidth: theme.palette.card.maxWidth }} >
            <CardContent>
              <Typography variant="h4">
                  {mspCount}
                </Typography>
                <Typography variant="h6">
                  Total MSP(s)
              </Typography>
              <Typography variant="body2"></Typography>

            </CardContent>
        </Card>
        </Box>
    )
}


export default MspCountComponent;
