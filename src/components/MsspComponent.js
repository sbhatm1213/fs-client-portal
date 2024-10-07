// /src/components/MsspComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, Collapse } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import theme from '../theme.js';
import MspComponent from './MspComponent.js';


const MsspComponent = () => {

    const [mssps, setMssps] = useState([]);
    const [selectedMssp, setSelectedMssp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);


    const fetchMssps = async () => {
            try {
                const { data, error } = await supabase
                    .rpc('count_msp_and_clients');

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


      const handleMspFromMssp = (clickedMssp) => {
        console.log(clickedMssp);
        setSelectedMssp(clickedMssp);
      };


    return (<ThemeProvider theme={theme}>


        <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>MSSP Name</TableCell>
                    <TableCell>MSP Count</TableCell>
                    <TableCell>Client Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

            {mssps.map((mssp) => (<>
                        <TableRow key={mssp.mssp_id} >
                          <TableCell>
                          <IconButton aria-label="expand row" size="small" onClick={() => handleMspFromMssp(mssp.mssp_id)}>
                            <KeyboardArrowDown />
                          </IconButton>
                          </TableCell>
                          <TableCell>{mssp.mssp_name}</TableCell>
                          <TableCell>{mssp.msp_count}</TableCell>
                          <TableCell>{mssp.client_count}</TableCell>
                        </TableRow>
                        {
                            selectedMssp &&
                          <TableRow>
                            <TableCell colSpan={2}>
                              <Collapse>
                                <MspComponent msspId={selectedMssp} />
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        }
                  </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

       </ThemeProvider>)
};

export default MsspComponent;

/*

{mssps.map(mssp => (
            <Grid item xs={12} md={4} key={mssp.mssp_id}>
            <MsspCardComponent
                mssp={mssp}
                onClickMssp={onClickMssp}
                />
            </Grid>
        ))}*/
