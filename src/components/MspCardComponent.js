// /src/components/MsspCardComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import MspComponent  from './MspComponent.js'



const theme = createTheme({
    palette: {
        card: {
            main: '#11609f',
            contrastText: '#eff8f9',
        },
    },
});

const MspCardComponent = ({msp}) => {

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

    const fetchMspForMsp = (mspId) => {
                setSelectedMspId(msspId); // Set the selected MSSP ID

    }


    return (
        <Card sx={{ backgroundColor: theme.palette.card.main, color: theme.palette.card.contrastText }}
              onClick={() => fetchMspForMsp(msp.msp_id)}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {msp.msp_name}
              </Typography>
            </CardContent>
            {selectedMspId && <MspComponent mspId={selectedMspId} />}

        </Card>
    )
}


export default MspCardComponent;
