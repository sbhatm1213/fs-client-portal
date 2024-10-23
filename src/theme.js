// src/theme.js
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
//    typography: {
//        fontFamily: [
//          'Quicksand',
//          'sans-serif',
//        ].join(','),
//      },
    palette: {
        card: {
            main: '#11609f',
            contrastText: '#eff8f9',
            maxWidth: 220
        },
    },
});

export default theme;
