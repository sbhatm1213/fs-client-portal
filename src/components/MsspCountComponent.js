// /src/components/MsspCountComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, TableBody, TableRow, TableCell, Table } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';


const MsspCountComponent = () => {

    const [msspCount, setMsspCount] = useState(null);
    const [selectedMsspId, setSelectedMsspId] = useState(null);
    const [msps, setMsps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCountMssps = async () => {
           try {
                const { data, error } = await supabase
                    .from('mssp')
                    .select('count', { count: 'exact' });

                if (error) {
                    console.log(error);
//                    throw error;
                }

                setMsspCount(data[0].count);
          } catch (error) {
                console.log(error);
                setError(error.message);
          } finally {
                setLoading(false);
          }

    }

    useEffect(() => {
        getCountMssps();
    }, []);


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

//    const fetchMspForMssp = (mssp) => {
//                setSelectedMsspId(mssp.mssp_id); // Set the selected MSSP ID
//                onClickMssp(mssp);
//                getCountMssps();
//
//    }


    return (
        <Box mt={4} sx={{flex: 1}}>

        <Card sx={{ backgroundColor: theme.palette.card.main,
                    color: theme.palette.card.contrastText,
                    maxWidth: theme.palette.card.maxWidth }} >
            <CardContent>
              <Typography variant="h4">
                  {msspCount}
                </Typography>
                <Typography variant="h6">
                  Total MSSP(s)
              </Typography>
              <Typography variant="body2"></Typography>

            </CardContent>
        </Card>
        </Box>
    )
}


export default MsspCountComponent;

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
