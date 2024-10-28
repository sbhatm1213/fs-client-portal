// /src/components/ClientCountComponent.js
import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Box, TableBody, TableRow, TableCell, Table } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//import { supabase } from '../services/supabaseClient';
import { databases } from '../services/appwriteClient';
import { useAuth } from '../services/AuthProvider';
import { useNavigate } from 'react-router-dom';
import theme from '../theme.js';


const SentinelOneProductCard = () => {

    return (
        <Box mt={1} ml={3}>
        <Card elevation={4} sx={{
                    maxWidth: theme.palette.card.maxWidth }} >
            <CardContent>
              <Typography variant="h5"  component="div" mb={1} >
                  SentinelOne
                </Typography>
              <Typography variant="caption" mt={4} >
                    Gain valuable insights into your customers' endpoint security through SentinelOne's
                    comprehensive data. Our platform offers real-time visibility into threat detection,
                    security coverage, and usage metrics, enabling streamlined management and enhanced protection
                    for all your managed services.
              </Typography>
            </CardContent>
        </Card>
        </Box>
    )
}


export default SentinelOneProductCard;
