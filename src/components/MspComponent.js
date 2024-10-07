// /src/components/MspComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import MspCardComponent from './MspCardComponent.js';


const theme = createTheme({
    palette: {
        card: {
            main: '#11609f',
            contrastText: '#eff8f9',
        },
    },
});


const MspComponent = ({msspId, onClickMsp}) => {

    const [msps, setMsps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMspForMssp = async (msspId) => {
//        setSelectedMsspId(msspId); // Set the selected MSSP ID
        try {
            const { data, error } = await supabase
                .from('msp_mssp')
                .select(
                    `
                    msp!inner(msp_id, msp_name),
                    mssp!inner(mssp_name)
                    `,
                )
                .eq('mssp.mssp_id', msspId);

            if (error) throw error;
            console.log(data);
//            return data;
            setMsps(data);
        } catch (error) {
            console.error('Error fetching MSPs:', error.message);
        }
    };

    useEffect(() => {
        fetchMspForMssp(msspId);
    }, [msspId]);


    return (<ThemeProvider theme={theme}>
        {

            msps.map(msp => (
            <Grid item xs={12} md={4} key={msp.msp.msp_id}>
                <MspCardComponent
                msp={msp.msp}
                onClickMsp={onClickMsp}
                />
            </Grid>
            ))
        }
       </ThemeProvider>)
};

export default MspComponent;