// /src/components/MspCardComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';
import MspComponent  from './MspComponent.js'


const MspCardComponent = ({msp, onClickMsp}) => {

    const [selectedMspId, setSelectedMspId] = useState(null);


//    const fetchMspForMssp = async (msspId) => {
//        setSelectedMsspId(msspId); // Set the selected MSSP ID
//        try {
//            const { data, error } = await supabase
//                .from('msp_mssp')
//                .select(
//                    `
//                    msp!inner(msp_name),
//                    mssp!inner(mssp_name)
//                    `,
//                )
//                .eq('mssp.mssp_id', msspId);
//
//            if (error) throw error;
//            console.log(data);
//            return data;
//        } catch (error) {
//            console.error('Error fetching MSPs:', error.message);
//        }
//    };

    const fetchLicensesForMsp = (mspId) => {
                setSelectedMspId(mspId);
                onClickMsp(msp);
    }


    return (
        <Card sx={{ backgroundColor: theme.palette.card.main, color: theme.palette.card.contrastText }}
              onClick={() => fetchLicensesForMsp(msp.msp_id)}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {msp.msp_name}
              </Typography>
            </CardContent>
        </Card>
    )
}


export default MspCardComponent;
