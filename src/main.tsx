import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app';
import '@shared/styles/globals.scss';
import '@shared/config/configureMobX';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
