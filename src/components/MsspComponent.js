// /src/components/MsspComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, Collapse } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { List, ListItemButton, ListItemText, ListItemIcon, Divider, Chip } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//import { supabase } from '../services/supabaseClient';
import { databases } from '../services/appwriteClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowUp, Security } from '@mui/icons-material';
import theme from '../theme.js';
//import MspComponent from './MspComponent.js';


const MsspComponent = ({ onClickMssp }) => {

    const [msspList, setMsspList] = useState([]);
    const [selectedMssp, setSelectedMssp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const databaseID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
    const msspCollectionID = process.env.REACT_APP_APPWRITE_MSSP_COLLECTION_ID;

    useEffect(() => {

        const fetchMsspList = async () => {
                try {

                    databases.listDocuments(
                            databaseID,
                            msspCollectionID,
                            ).then(response => {
                        setMsspList(response.documents);
                      })
                      .catch(error => {
                        console.error(error);
                      });

                } catch (error) {
                    console.log(error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };


        fetchMsspList();
    }, []);


      const handleMspFromMssp = (clickedMssp, mspList) => {
//        console.log(clickedMssp);
        setSelectedMssp(clickedMssp);
        onClickMssp(clickedMssp, mspList);
      };


    return (<ThemeProvider theme={theme}>
    <Box sx={{ width: '100%', maxWidth: 360,  }}>
    {msspList.map((mssp) => (<>
      <List component="nav" key={mssp.$id}>
        <ListItemButton
          selected={selectedMssp === mssp.$id}
          onClick={(event) =>  handleMspFromMssp(mssp.$id, mssp.msp)}
        >
          <ListItemIcon>
            <Security />
          </ListItemIcon>
          <ListItemText primary={mssp.name} />
          <Chip
            label={`${mssp.msp.length} MSP(s)`}
            sx={{
              backgroundColor: theme.palette.card.main,
              color: theme.palette.card.contrastText,
            }}
          />
        </ListItemButton>

      </List>
      <Divider />
      </>
    )
    )}
      </Box>

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


/*


        <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow key='header'>
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
                            selectedMssp && selectedMssp == mssp.mssp_id ? (
                          <TableRow>
                            <TableCell colSpan={2}>
                                <MspComponent msspId={selectedMssp} />
                            </TableCell>
                          </TableRow>
                          ) : null
                        }
                  </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

*/