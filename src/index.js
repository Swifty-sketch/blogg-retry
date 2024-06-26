import React from 'react';
import ReactDOM from 'react-dom/client';

// Styling
import './index.css';
import './MakeBlogg.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthWrapper from './comp/AuthWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthWrapper>
      <App />
    </AuthWrapper>
  </React.StrictMode>,
);

reportWebVitals();
