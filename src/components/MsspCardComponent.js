// /src/components/MsspCardComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, TableBody, TableRow, TableCell, Table } from '@mui/material';
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

const MsspCardComponent = ({mssp, onClickMssp}) => {

    const [selectedMsspId, setSelectedMsspId] = useState(null);
    const [msps, setMsps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



/*
    const fetchMspForMssp = async (msspId) => {
        setSelectedMsspId(msspId); // Set the selected MSSP ID
        try {
            const { data, error } = await supabase
                .from('msp_mssp')
                .select(
                    `
                    msp!inner(msp_name),
                    mssp!inner(mssp_name)
                    `,
                )
                .eq('mssp.mssp_id', msspId);

            if (error) throw error;
            console.log(data);
                setMsps(data);

//            return data;
        } catch (error) {
            console.error('Error fetching MSPs:', error.message);
        }
    };*/

    const fetchMspForMssp = (mssp) => {
                setSelectedMsspId(mssp.mssp_id); // Set the selected MSSP ID
                onClickMssp(mssp);
    }


    return (
    <>
        <Card sx={{ backgroundColor: theme.palette.card.main, color: theme.palette.card.contrastText }}
              onClick={() => fetchMspForMssp(mssp)}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {mssp.mssp_name}
              </Typography>
            </CardContent>
        </Card>
    </>
    )
}


export default MsspCardComponent;

//        {selectedMsspId && <MspComponent msspId={selectedMsspId} />}

/*

{selectedMsspId &&
            (

                <Table>
                  <TableBody>
                    {msps.map((msp, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{msp.msp.msp_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )
            }*/
