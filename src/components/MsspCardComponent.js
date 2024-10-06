// /src/components/MsspCardComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
    palette: {
        card: {
            main: '#11609f',
            contrastText: '#eff8f9',
        },
    },
});

const MsspCardComponent = ({mssp}) => {

    const fetchMspForMssp = async (msspId) => {
        console.log(msspId);
        try {
            const { data, error } = await supabase
                .from('msp')
                .select('msp_name, msp_mssp(mssp_id), mssp(mssp_name)')
                .eq('mssp.mssp_id', msspId);

            if (error) throw error;
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching MSPs:', error.message);
        }
    };


    return (
        <Card sx={{ backgroundColor: theme.palette.card.main, color: theme.palette.card.contrastText }}
              onClick={() => fetchMspForMssp(mssp.mssp_id)}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {mssp.mssp_name}
              </Typography>
            </CardContent>
        </Card>
    )
}


export default MsspCardComponent;
