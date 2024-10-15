import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Suppress specific warning messages
const suppressWarnings = () => {
  const originalConsoleError = console.error;

  console.error = (...args) => {
    if (/Warning: Encountered two children with the same key/.test(args[0])) {
      return; // Ignore this specific warning
    }
    else if(/Warning: Each child in a list should have a unique "key" prop/.test(args[0])){
      return;
    }
    originalConsoleError.apply(console, args); // Call the original console.error
  };
};

// Call suppressWarnings before rendering
suppressWarnings();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
