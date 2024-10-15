// /src/components/MsspCountComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, TableBody, TableRow, TableCell, Table } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//import { supabase } from '../services/supabaseClient';
import { databases } from '../services/appwriteClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';


const MsspCountComponent = ({ userRole }) => {

    const [msspCount, setMsspCount] = useState(null);
    const [selectedMsspId, setSelectedMsspId] = useState(null);
    const [msps, setMsps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const databaseID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
    const msspCollectionID = process.env.REACT_APP_APPWRITE_MSSP_COLLECTION_ID;

    const getCountMssps = async () => {
           try {

                  databases.listDocuments(
                        databaseID,
                        msspCollectionID,
                        [],
                        0   // Limit 0, bcoz you need only count
                        ).then(response => {
                    setMsspCount(response.total);
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

    }

    useEffect(() => {
        if (userRole === 'admin'){
            getCountMssps();
        }
    }, []);


    if (userRole === 'admin') {

        return (

            <Box mt={1} sx={{flex: 1}}>

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

    } else {
        return         <Box mt={1} sx={{flex: 1}}></Box>
    }
}


export default MsspCountComponent;

//        {selectedMsspId && <MspComponent msspId={selectedMsspId} />}
