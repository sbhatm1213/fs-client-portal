// /src/components/LicensesTableComponent.js
import React, {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//import { supabase } from '../services/supabaseClient';
import { databases } from '../services/appwriteClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import theme from '../theme.js';


const LicensesTableComponent = ({mspId, onClickMsp}) => {

    const [licenses, setLicenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLicensesForMsp = async (mspId) => {
        try {
/*
            const { data, error } = await supabase
                  .from('license')
                  .select(`
                    license_id,
                    license_key,
                    client:client_license!inner(client_id, client_name),
                    msp:msp_client!inner(msp_id, msp_name)
                  `)
                .eq('msp.msp_id', mspId);
*/

                const { response, error } = await databases.listDocuments(
                        '670c21eb00243be197b4', // DB-ID
                        'license')

            console.log(mspId);
//            const { data, error } = await supabase
//              .rpc('fetch_licenses_for_msp', { p_msp_id: mspId }); // Pass msp_id here


            if (error) throw error;
            console.log(response);
//            return data;
            setLicenses(response);
        } catch (error) {
            console.error('Error fetching Licenses:', error.message);
        }
    };

    useEffect(() => {
        fetchLicensesForMsp(mspId);
    }, [mspId]);


    return (
    <>
    {JSON.stringify(licenses)}
    <ThemeProvider theme={theme}>
          <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>License Key</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell>MSP Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

{licenses.map((license) => (
                    license.client.map((client) => (
                      license.msp.map((msp) => (
                        <TableRow key={license.license_id}>
                          <TableCell>{license.license_key}</TableCell>
                          <TableCell>{client.client_name}</TableCell>
                          <TableCell>{msp.msp_name}</TableCell>
                        </TableRow>
                      ))
                    ))
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
       </ThemeProvider>

       </>
       )
};

export default LicensesTableComponent;


/*

<TableRow>
                    <TableCell/>
                    <TableCell/>
                    <TableCell/>
                    </TableRow>

*/