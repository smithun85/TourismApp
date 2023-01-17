import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  AuthContext  from './Context/AuthContext';
import TourContext from './Context/TourContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContext>
    <TourContext>
      <App />
    </TourContext>
  </AuthContext>
);

