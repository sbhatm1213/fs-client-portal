// /src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './services/AuthProvider'; // Adjust the path as necessary
import Login from './components/Login';
import HomePage from './components/HomePage';

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
}

export default App;
