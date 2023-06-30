import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import { PostProvider } from './contexts/PostContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Call make Server


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

    <ThemeProvider>
    
    <AuthProvider>
      <PostProvider>
      <UserProvider>
          <App />
        </UserProvider>
        </PostProvider>
    </AuthProvider>
    </ThemeProvider>
    
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
