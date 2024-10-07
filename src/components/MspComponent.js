// /src/components/MspComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import theme from '../theme.js';
import MspCardComponent from './MspCardComponent.js';


const MspComponent = ({msspId}) => {

    const [msps, setMsps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMspForMssp = async (msspId) => {
//        setSelectedMsspId(msspId); // Set the selected MSSP ID
        console.log(msspId);
        try {
            const { data, error } = await supabase
                .rpc('fetch_data_by_mssp_id', {'p_mssp_id': msspId})

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
    <Table>
              <TableHead>
                <TableRow >
                  <TableCell> MSP Name </TableCell>
                  <TableCell> Client Name </TableCell>
                  <TableCell> Product Name </TableCell>
                  <TableCell> License Key </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {msps.map((msp) => (
                  <TableRow key={msp.license_key}>
                    <TableCell>{msp.msp_name}</TableCell>
                    <TableCell>{msp.client_name}</TableCell>
                    <TableCell>{msp.product_name}</TableCell>
                    <TableCell>{msp.license_key}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>


       </ThemeProvider>)
};

export default MspComponent;

/*
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
*/