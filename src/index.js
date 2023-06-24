import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import { PostProvider } from './contexts/PostContext';

// Call make Server


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <AuthProvider>
      <PostProvider>
      <UserProvider>
          <App />
        </UserProvider>
        </PostProvider>
    </AuthProvider>
    
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
