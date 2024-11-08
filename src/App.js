// /src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider, useAuth } from './services/AuthProvider'; // Adjust the path as necessary
import Login from './components/Login';
import HomePage from './components/HomePage';
import theme from './theme.js';


/*
function App() {
  return (
          <Router>

                <AuthProvider>
                      <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<HomePage />} />
                      </Routes>
                </AuthProvider>
            </Router>

  );
}*/


//function App() {
//    return <HomePage />
//}


const AppContent = () => {
  const { user } = useAuth(); // Get user from Auth context

  return (
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<HomePage />} />

  );
};

const App = () => {
  return (
    <AuthProvider>
        <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;

/*

<Routes>
      {*/
/* Route for login *//*
}
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />

      {*/
/* Route for main app/dashboard *//*
}
      <Route path="/dashboard" element={user ? <HomePage /> : <Navigate to="/login" />} />

      {*/
/* Redirect to login for all other paths if not logged in *//*
}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />

    </Routes>*/
