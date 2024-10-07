// /src/components/MsspComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import MsspCardComponent from './MsspCardComponent.js';


const theme = createTheme({
    palette: {
        card: {
            main: '#11609f',
            contrastText: '#eff8f9',
        },
    },
});


const MsspComponent = ({onClickMssp}) => {

    const [mssps, setMssps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMssps = async () => {
            try {
                const { data, error } = await supabase
                    .from('mssp')
                    .select('*');

                if (error) {
                    console.log(error);
//                    throw error;
                }

                setMssps(data);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchMssps();
    }, []);


    return (<ThemeProvider theme={theme}>
        {mssps.map(mssp => (
            <Grid item xs={12} md={4} key={mssp.mssp_id}>
                <MsspCardComponent
                mssp={mssp}
                onClickMssp={onClickMssp}
                />
            </Grid>
        ))}
       </ThemeProvider>)
};

export default MsspComponent;
