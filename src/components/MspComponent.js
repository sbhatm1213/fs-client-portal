// /src/components/MspComponent.js
import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, Chip } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
//import { supabase } from '../services/supabaseClient'
import { Query } from 'appwrite';
import { databases } from '../services/appwriteClient';
import { useAuth } from '../services/AuthProvider';
import theme from '../theme.js';
//import MspCardComponent from './MspCardComponent.js';


const mspColumns = [
  { field: 'name', headerName: 'MSP Name', width: 200 },
  { field: 'license_type', headerName: 'License Type', width: 200 },
  { field: 'devices', headerName: 'Devices', width: 200 },
  { field: 'purchased_licenses', headerName: 'Purchased License', width: 200 },
  {
    field: 'client',
    headerName: 'Client Count',
    width: 200,
    renderCell: (params) => (
      <Chip
        label={`${params.value.length} Client(s)`}
            sx={{
              backgroundColor: theme.palette.card.main,
              color: theme.palette.card.contrastText,
            }}
        variant="outlined"
        onClick={() => params.row.handleClientClick(params.row.id, params.value)}
      />
    ),
   },
   /*{
    field: 'client',
    headerName: '',
    width: 10,
    renderCell: (params) => (
        <DataGrid rows={params.value} />
    )
   }*/
];


const MspComponent = ({msspId, queryMsp}) => {

    const [mspRows, setMspRows] = useState([]);
    const [clientRows, setClientRows] = useState([]);
    const [openClientRow, setOpenClientRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


  const handleClientClick = async (clickedMspId, queryClient) => {
    // Toggle the nested grid for the clicked row
    console.log(clickedMspId);
    console.log(queryClient);
    setOpenClientRow(openClientRow === clickedMspId ? null : clickedMspId);
    const newClientRows = queryClient.map(client => ({
                id: client.$id, // Use document ID as the unique ID
                ...client,
            }));
        setClientRows(newClientRows);
  };

    const fetchMspForMssp = async (msspId, queryMsp) => {
//        setSelectedMsspId(msspId); // Set the selected MSSP ID
//        console.log(msspId);
//        console.log(queryMsp);
        const newMspRows = queryMsp.map(msp => ({
                id: msp.$id, // Use document ID as the unique ID
                ...msp,
                handleClientClick,
            }));
        setMspRows(newMspRows);
       }

    useEffect(() => {
        fetchMspForMssp(msspId, queryMsp);
    }, [msspId, queryMsp]);


    return (<ThemeProvider theme={theme}>
        <DataGrid
                rows={mspRows}
                columns={mspColumns}
                pageSize={10}
                getRowHeight={(params) => (openClientRow === params.id ? 300 : 70)} // Adjust height if row is expanded
                />

       </ThemeProvider>)
};

export default MspComponent;

