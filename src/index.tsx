import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import heIL from 'antd/lib/locale/he_IL';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={heIL} direction="rtl">
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
