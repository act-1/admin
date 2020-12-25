import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import { config } from './firebase';

import { ConfigProvider } from 'antd';
import heIL from 'antd/lib/locale/he_IL';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={config}>
      <ConfigProvider locale={heIL} direction="rtl">
        <Router>
          <App />
        </Router>
      </ConfigProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
